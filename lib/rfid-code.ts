export type CodeBlock = {
  label: string;
  language: string;
  code: string;
  note?: string;
};

export const stepCodeBlocks: Record<string, CodeBlock[]> = {
  "pi-vorbereiten": [
    {
      label: "Systemstand prüfen",
      language: "bash",
      code: `cat /etc/os-release
hostname
pinout`,
      note: "Notiere OS-Version und Hostname. `pinout` zeigt dir die Belegung des 40-Pin-Headers direkt auf dem Pi.",
    },
  ],
  gpio: [
    {
      label: "Erster kontrollierter GPIO-Ausgang",
      language: "python",
      code: `from gpiozero import LED
from time import sleep

led = LED(17)  # BCM GPIO17, physischer Pin 11

while True:
    led.on()
    sleep(1)
    led.off()
    sleep(1)`,
      note: "Die LED liegt mit Vorwiderstand zwischen GPIO17 und GND. Miss HIGH und LOW gegen GND.",
    },
  ],
  "mfrc522-anschliessen": [
    {
      label: "SPI in Raspberry Pi OS aktivieren",
      language: "bash",
      code: `sudo raspi-config
# Interface Options → SPI → Enable
sudo reboot

# Nach dem Neustart prüfen:
ls -l /dev/spidev0.*`,
      note: "Der Linux-Geräteknoten zeigt dir, dass SPI0 vom Betriebssystem bereitgestellt wird.",
    },
    {
      label: "Verdrahtung Raspberry Pi 4 → RC522",
      language: "text",
      code: `RC522        Raspberry Pi 4
3.3V   →    3V3
GND    →    GND
SCK    →    GPIO11 / Pin 23
MOSI   →    GPIO10 / Pin 19
MISO   →    GPIO9  / Pin 21
SDA/SS →    GPIO8  / Pin 24 (CE0)
RST    →    GPIO23 / Pin 16
IRQ    →    nicht verbunden`,
      note: "Pi vor dem Verdrahten vollständig ausschalten. Das RC522-Modul in diesem Aufbau mit 3,3 V versorgen.",
    },
  ],
  "spi-register": [
    {
      label: "Ein Byte in Binär und Hex lesen",
      language: "python",
      code: `value = 0b10010010

print(value)          # 146
print(hex(value))     # 0x92
print(f"{value:08b}") # 10010010`,
      note: "Hex ist keine andere Information, sondern eine kompaktere Darstellung desselben Bitmusters.",
    },
  ],
  "uid-lesen": [
    {
      label: "Python-Umgebung für den Reader",
      language: "bash",
      code: `python3 -m venv --system-site-packages .venv
source .venv/bin/activate
python -m pip install spidev mfrc522`,
      note: "Eine virtuelle Umgebung hält Projektabhängigkeiten getrennt. `--system-site-packages` erlaubt Zugriff auf systemseitige Raspberry-Pi-Pakete.",
    },
    {
      label: "Erste UID lesen",
      language: "python",
      code: `import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522

reader = SimpleMFRC522()

try:
    print("Tag auflegen …")
    uid, text = reader.read()
    print("UID:", uid)
finally:
    GPIO.cleanup()`,
      note: "Zunächst nur lesen und protokollieren. Noch keine Musik starten – so bleibt die RFID-Schicht isoliert testbar.",
    },
  ],
  "uid-zuordnung": [
    {
      label: "UID und Medienaktion entkoppeln",
      language: "python",
      code: `media_by_uid = {
    123456789: {"kind": "album", "value": "spotify:album:..."},
    987654321: {"kind": "track", "value": "spotify:track:..."},
}

def resolve_media(uid: int):
    return media_by_uid.get(uid)

selection = resolve_media(123456789)
print(selection)`,
      note: "Ersetze die Beispiel-UIDs erst nach deinen eigenen Messungen. Der Reader kennt keine Alben – die Bedeutung entsteht hier.",
    },
  ],
  "audio-spotify": [
    {
      label: "Spotify-Abhängigkeit isoliert installieren",
      language: "bash",
      code: `source .venv/bin/activate
python -m pip install spotipy

# Secrets lokal als Umgebungsvariablen setzen,
# nicht in Git committen:
export SPOTIPY_CLIENT_ID="..."
export SPOTIPY_CLIENT_SECRET="..."
export SPOTIPY_REDIRECT_URI="http://127.0.0.1:8080/callback"
export SPOTIFY_DEVICE_ID="..."`,
      note: "Redirect-URI und App-Konfiguration müssen zu den jeweils aktuellen Spotify-Developer-Vorgaben passen.",
    },
    {
      label: "Player-Adapter separat testen",
      language: "python",
      code: `import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth

scope = "user-read-playback-state user-modify-playback-state"
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))

device_id = os.environ["SPOTIFY_DEVICE_ID"]

sp.start_playback(
    device_id=device_id,
    context_uri="spotify:album:...",
)`,
      note: "Teste diesen Schritt ohne RFID. Spotify-Playback-Steuerung über die Web API setzt aktuell Premium voraus.",
    },
  ],
  integration: [
    {
      label: "Subsysteme über klare Funktionen koppeln",
      language: "python",
      code: `def read_uid(reader) -> int:
    uid, _ = reader.read()
    return uid

def resolve_media(uid: int):
    return media_by_uid.get(uid)

def handle_scan(uid: int):
    selection = resolve_media(uid)
    if selection is None:
        print(f"Unbekannte UID: {uid}")
        return
    player.play(selection)

while True:
    uid = read_uid(reader)
    print(f"Tag erkannt: {uid}")
    handle_scan(uid)`,
      note: "`reader`, `media_by_uid` und `player` werden bewusst als getrennte Subsysteme behandelt. Fehler sollen geloggt und nicht mit einem pauschalen `except: pass` verschluckt werden.",
    },
  ],
};

export type LearningPrompt = {
  quickCheck?: { question: string; answer: string };
  thinkDeeper?: string[];
  connections?: { title: string; text: string }[];
  transfer?: string[];
};

export const conceptLearning: Record<string, LearningPrompt> = {
  "embedded-system": {
    quickCheck: { question: "Welcher Teil der Jukebox entscheidet, welches Album zu einer UID gehört?", answer: "Die Anwendungssoftware auf dem Raspberry Pi. Tag und Reader liefern Identifikation; die Bedeutung UID → Album entsteht erst im Software-Mapping." },
    thinkDeeper: ["Zerlege die Jukebox in Eingabe, Kommunikation, Verarbeitung, Entscheidung und Ausgabe. Welche konkrete Information überschreitet jeweils die Systemgrenze?", "Wenn die UID korrekt erscheint, aber keine Musik startet: Welche Subsysteme kannst du bereits ausschließen?"],
    connections: [
      { title: "Thermostat", text: "Temperatursensor → Messwert → Regellogik → Heizung. Andere Hardware, dieselbe Systemdenkweise." },
      { title: "Drohne", text: "IMU → Flugcontroller → Regelalgorithmus → Motorsteller. Komplexer, aber wieder als gekoppelte Subsysteme analysierbar." },
    ],
  },
  electricity: {
    quickCheck: { question: "Warum schützt ein Serienwiderstand eine LED?", answer: "Er begrenzt den Strom. Näherungsweise gilt I = (UQuelle − ULED) / R." },
    thinkDeeper: ["Warum ist GND ein Bezugspotenzial und kein Ort, an dem Strom verschwindet?", "Was ändert sich bei 33 Ω statt 330 Ω? Begründe qualitativ und rechnerisch."],
    connections: [{ title: "Motorsteuerung", text: "Auch Motoren brauchen Versorgung und kontrollierten Strom – nur in deutlich höheren Leistungsbereichen." }, { title: "Sensorik", text: "Auch Sensorsignale sind Spannungen relativ zu einem gemeinsamen Bezugspotenzial." }],
  },
  "embedded-linux": {
    quickCheck: { question: "Liegt das Betriebssystem des ausgeschalteten Raspberry Pi im RAM?", answer: "Nein. Es liegt dauerhaft auf dem Massenspeicher, typischerweise der microSD-Karte. Beim Booten werden benötigte Teile in den RAM geladen." },
    thinkDeeper: ["Welche Aufgaben übernimmt Linux zwischen Python und Hardware – und welche davon müsstest du bei einem Bare-Metal-Mikrocontroller selbst lösen?", "Ein alter Laptop soll die Jukebox übernehmen: Welche Pi-Funktionen besitzt er bereits, welche fehlen und wie könntest du GPIO/SPI ergänzen?", "Wie weit könnte ein Android-Smartphone dieselbe Rolle übernehmen? Trenne Rechenleistung, Betriebssystem, Netzwerk, Audio und direkten Hardwarezugriff."],
    connections: [
      { title: "Alter Laptop", text: "CPU, RAM, Speicher, Linux, Netzwerk und Audio sind vorhanden. Ein frei zugänglicher 3,3-V-GPIO-/SPI-Header fehlt typischerweise; USB-Mikrocontroller oder USB-SPI-Adapter können diese Lücke schließen." },
      { title: "Smartphone", text: "SoC, RAM, Speicher, Netzwerk, Audio, Kamera und Sensoren sind vorhanden. Android schränkt direkten Hardwarezugriff stärker ein; externe Elektronik wird eher über USB-OTG, Bluetooth oder Netzwerk angebunden." },
      { title: "Mikrocontroller", text: "ESP32 oder Arduino bieten unmittelbaren GPIO-Zugriff, aber kein vollwertiges Linux. Dadurch verschiebt sich die Softwarearchitektur." },
    ],
  },
  gpio: {
    quickCheck: { question: "Ist GPIO-HIGH nur eine abstrakte 1?", answer: "Logisch ja, physikalisch ist es ein realer Spannungsbereich um 3,3 V relativ zu GND. Die Strombelastbarkeit bleibt begrenzt." },
    thinkDeeper: ["Erkläre den vollständigen Weg von einer Python-Anweisung bis zum messbaren Spannungspegel am Pin.", "Warum kann ein GPIO eine LED, aber keinen Motor oder passiven Lautsprecher direkt treiben?"],
    connections: [{ title: "Leistungstreiber", text: "Transistoren, MOSFETs und Motortreiber trennen das kleine GPIO-Steuersignal von der eigentlichen Leistungsversorgung." }],
  },
  spi: {
    quickCheck: { question: "Wozu dient Chip Select bei SPI?", answer: "Er aktiviert gezielt das Peripheriegerät, mit dem der Controller gerade kommuniziert." },
    thinkDeeper: ["Beschreibe einen Registerzugriff so, dass SCLK, MOSI, MISO und CS jeweils eine konkrete Rolle haben.", "Warum reicht die Kenntnis von SPI allein nicht aus, um den MFRC522 sinnvoll anzusprechen?"],
    connections: [{ title: "Displays & SD-Karten", text: "Der Transportmechanismus kann derselbe sein; die Bedeutung der Bytes wird jeweils vom konkreten Geräteprotokoll festgelegt." }, { title: "Drohnen-Sensorik", text: "IMUs werden häufig über SPI oder I²C angebunden – das Kommunikationskonzept taucht später wieder auf." }],
  },
  "data-representation": {
    quickCheck: { question: "Welches Bitmuster entspricht 0x92?", answer: "1001 0010. Jede Hex-Ziffer repräsentiert vier Bits." },
    thinkDeeper: ["Warum ist ein Registerwert ohne Datenblatt semantisch fast bedeutungslos?", "Wie würdest du aus einem Byte einzelne Statusbits isolieren und interpretieren?"],
    connections: [{ title: "Sensorregister", text: "Gyroskope, Beschleunigungssensoren und ADCs präsentieren Messwerte und Status ebenfalls als adressierbare Bytes." }],
  },
  rfid: {
    quickCheck: { question: "Woher erhält ein passiver RFID-Tag seine Energie?", answer: "Aus dem elektromagnetischen Nahfeld des Readers; die Kopplung induziert Energie in der Tag-Antenne." },
    thinkDeeper: ["Warum ist Reader↔Tag-Kommunikation nicht einfach WLAN in klein?", "Erkläre getrennt, wie Energie zum Tag gelangt und wie Information zurück zum Reader kommt."],
    connections: [{ title: "NFC", text: "NFC arbeitet ebenfalls bei 13,56 MHz und nutzt verwandte Nahfeldprinzipien." }, { title: "Induktive Kopplung", text: "Das Grundprinzip zeitlich veränderlicher magnetischer Felder begegnet dir auch bei Transformatoren und drahtloser Energieübertragung." }],
  },
  uid: {
    quickCheck: { question: "Enthält die UID bereits die Information, welches Album gespielt werden soll?", answer: "Nein. Die UID ist nur eine Kennung; die Software ordnet ihr erst eine Medienaktion zu." },
    thinkDeeper: ["Warum ist eine UID ein brauchbarer Schlüssel für die Jukebox, aber nicht automatisch ein sicherer Identitätsnachweis?", "Warum sollten Rohbytes, formatierte UID und Medien-Mapping getrennte Ebenen bleiben?"],
    connections: [{ title: "Datenbankschlüssel", text: "Eine ID verweist auf Bedeutung, ohne den zugehörigen Datensatz selbst zu enthalten." }],
  },
  "software-events": {
    quickCheck: { question: "Warum sollte Reader-Code nicht direkt Spotify-Code enthalten?", answer: "Erfassung, Zuordnung und Aktion sind getrennte Verantwortlichkeiten. Das macht das System testbarer und austauschbarer." },
    thinkDeeper: ["Entwirf den Ereignisfluss für bekannte UID, unbekannte UID, wiederholten Scan und fehlgeschlagene Medienaktion.", "Welche Zustände verhindern ein unwartbares if/else-Geflecht?"],
    connections: [{ title: "Smart Home & Robotik", text: "Sensorereignis → Regel → Aktion ist dieselbe Grundstruktur wie bei Bewegung → Bedingung → Licht oder Sensor → Zustand → Motoraktion." }],
  },
  "audio-network": {
    quickCheck: { question: "Transportiert eine Web API zwangsläufig den eigentlichen Audiostrom?", answer: "Nein. Eine API kann nur Befehle und Zustände transportieren; der Audio-Stream kann an anderer Stelle entstehen." },
    thinkDeeper: ["Trenne lokale Audioausgabe, Netzwerksteuerung und entfernten Musikdienst. Wo können jeweils Fehler entstehen?", "Wie würdest du die Jukebox so umbauen, dass sie vollständig ohne Internet funktioniert?"],
    connections: [{ title: "Local-first Dienste", text: "Dasselbe Prinzip lässt sich auf einen lokalen Medienserver und später auf ein cloud-optionales Heimnetz übertragen." }],
  },
  integration: {
    quickCheck: { question: "Warum ist 'alles anschließen und dann testen' eine schlechte Debugging-Strategie?", answer: "Weil mehrere Fehlerquellen gleichzeitig aktiv sind. Isolierte Tests mit klaren Sollzuständen verkleinern den Suchraum." },
    thinkDeeper: ["Definiere für Versorgung, SPI, RFID, Mapping und Audio jeweils einen isolierten Test mit eindeutigem Sollzustand.", "Welche Informationen braucht eine andere Person, um deinen Prototyp reproduzierbar nachzubauen?"],
    connections: [{ title: "Engineering allgemein", text: "Modularisierung, Schnittstellentests und reproduzierbare Fehlerbilder gelten genauso bei Drohnen, Robotern, Messgeräten und Servern." }],
  },
};

export const componentLearning: Record<string, LearningPrompt> = {
  "raspberry-pi-4": {
    quickCheck: { question: "Ist der Raspberry Pi funktional näher an einem Arduino oder an einem kleinen Linux-PC?", answer: "An einem kleinen Linux-PC: SoC, RAM, Speicher, Betriebssystem, Prozesse und Netzwerk – plus gut zugänglicher GPIO-Header." },
    thinkDeeper: ["Nimm einen alten Laptop gedanklich auseinander: Welche Funktionsblöcke des Raspberry Pi findest du auf seinem Mainboard wieder und welche Pi-Eigenschaft fehlt?", "Wie würdest du einen alten Laptop so erweitern, dass er die RFID-Jukebox trotz fehlendem GPIO-Header übernimmt?", "Wie weit könnte ein altes Android-Smartphone dieselbe Rolle übernehmen und wo wäre externe Hardware nötig?"],
    connections: [
      { title: "Laptop als Pi-Ersatz", text: "Rechnen, Linux, Netzwerk, Speicher und Audio sind schon vorhanden. Externe I/O-Hardware kann fehlende GPIO-/SPI-Funktionen ergänzen." },
      { title: "Smartphone als Rechenknoten", text: "Rechnen, Netzwerk, Audio, Kamera und Sensoren sind vorhanden; externe Elektronik bindest du eher über USB-OTG, Bluetooth oder Netzwerk an." },
      { title: "Router / Mini-PC", text: "Viele Geräte sind im Kern ebenfalls kleine Linux-Rechner. Entscheidend sind Betriebssystem und verfügbare Schnittstellen, nicht die Gehäuseform." },
    ],
  },
  "breadboard-led": {
    quickCheck: { question: "Was musst du vor dem Einschalten mindestens prüfen?", answer: "Stromweg, LED-Polarität und passende Strombegrenzung." },
    thinkDeeper: ["Warum ist die LED-Schaltung ein Modell für spätere Hardwaretests und nicht nur eine Anfängerübung?"],
    connections: [{ title: "Prototyping", text: "Reversible, messbare Zwischenstufen sind auch bei Sensor-, Motor- und Kommunikationsschaltungen zentral." }],
  },
  mfrc522: {
    quickCheck: { question: "Welche Aufgabe erledigt der MFRC522 – und welche ausdrücklich nicht?", answer: "Er übernimmt RFID-nahe Signalverarbeitung und stellt Register bereit. Er entscheidet nicht über das Album." },
    thinkDeeper: ["Verfolge eine Kartenannäherung vom elektromagnetischen Feld bis zu einem Registerwert, den der Pi lesen kann.", "Warum verbindet diese Component Physik, digitale Kommunikation und Registerprogrammierung?"],
    connections: [{ title: "Sensor-ICs", text: "Wie viele Sensorchips kapselt der MFRC522 komplexe Physik und präsentiert dem Host Ergebnisse über Register." }],
  },
  "rfid-tag": {
    quickCheck: { question: "Ist die Musikdatei auf dem RFID-Tag gespeichert?", answer: "Nein. Der Tag liefert Identifikation; die Medienzuordnung liegt in der Anwendung." },
    thinkDeeper: ["Welche Eigenschaften des Tags sind physikalisch, welche protokollarisch und welche Bedeutung entsteht erst durch unsere Software?"],
  },
  multimeter: {
    quickCheck: { question: "Warum misst man Spannung parallel, Widerstand aber nur spannungsfrei?", answer: "Spannung ist eine Potentialdifferenz zwischen zwei Punkten. Bei der Widerstandsmessung speist das Multimeter selbst einen Messstrom ein; Fremdspannung verfälscht die Messung und kann schaden." },
    thinkDeeper: ["Welche Messung würdest du zuerst machen, wenn der MFRC522 gar nicht reagiert – und warum noch vor jeder Codeänderung?"],
  },
  "audio-output": {
    quickCheck: { question: "Warum gehört ein passiver Lautsprecher nicht direkt an einen GPIO?", answer: "GPIO ist ein Logikausgang mit geringer Leistung; ein passiver Lautsprecher benötigt eine geeignete Verstärkerstufe." },
    thinkDeeper: ["Trenne digitales Medium, D/A-Wandlung, Line-Level, Verstärkung und Lautsprecher. Welche Stufen übernimmt deine Stereoanlage?"],
  },
  "spotify-service": {
    quickCheck: { question: "Warum behandeln wir Spotify als austauschbare Schicht?", answer: "Damit RFID, Mapping und lokale Medienlogik unabhängig vom Cloud-Dienst verstanden und getestet werden können." },
    thinkDeeper: ["Wie muss die Architektur aussehen, damit Spotify durch lokale Dateien oder einen eigenen Medienserver ersetzt werden kann, ohne Reader- und UID-Logik neu zu schreiben?"],
    connections: [{ title: "Local-first", text: "Externe Dienste werden zur optionalen Erweiterung statt zur Voraussetzung der Grundfunktion." }],
  },
};

export const stepLearning: Record<string, LearningPrompt> = {
  "system-verstehen": { thinkDeeper: ["Erkläre den vollständigen Informationsfluss ohne die Wörter 'irgendwie' oder nur 'Signal'. Benenne an jeder Grenze konkret, was übertragen wird."] },
  "pi-vorbereiten": { thinkDeeper: ["Vergleiche Raspberry Pi, alten Laptop, Smartphone und Mikrocontroller anhand von CPU, RAM, Speicher, Betriebssystem, GPIO, Echtzeitverhalten und Energiebedarf."] },
  "led-grundlagen": { thinkDeeper: ["Leite aus Messwerten und Modellrechnung ab, welche Annahmen der vereinfachten LED-Rechnung realistisch und welche nur Näherungen sind."] },
  gpio: { thinkDeeper: ["Erkläre kausal, warum eine Softwareänderung die Blinkfrequenz verändert, ohne den elektrischen HIGH-Pegel selbst zu verändern."] },
  "mfrc522-anschliessen": { thinkDeeper: ["Begründe jede einzelne Verbindung zwischen Pi und MFRC522 funktional. Welche konkrete Funktion fällt aus, wenn du eine Leitung entfernst?"] },
  "spi-register": { thinkDeeper: ["Erkläre einen Registerzugriff gleichzeitig auf drei Ebenen: Leitungssignale, Bytes und Bedeutung laut Datenblatt."] },
  "rfid-physik": { thinkDeeper: ["Erkläre, warum Abstand und Orientierung die Kopplung beeinflussen, ohne dich nur auf 'schwächeres Signal' zu berufen."] },
  "uid-lesen": { thinkDeeper: ["Trenne Rohdaten, Darstellung und anwendungsseitige Identität. Welche Fehler entstehen, wenn diese Ebenen vermischt werden?"] },
  "uid-zuordnung": { thinkDeeper: ["Entwirf das Mapping so, dass RFID später durch NFC oder Barcode ersetzt werden könnte, ohne die Medienlogik grundlegend umzubauen."] },
  "audio-spotify": { thinkDeeper: ["Erkläre, welche Teile der Jukebox offline weiterarbeiten und welche bei Internet- oder Dienstausfall betroffen sind."] },
  integration: {
    thinkDeeper: ["Erkläre das fertige System vollständig von Energieversorgung über RFID und SPI bis zur Medienausgabe. Eine andere Person soll daraus ein belastbares mentales Modell gewinnen können."],
    transfer: [
      "Ersetze den Raspberry Pi gedanklich durch einen alten Laptop. Welche Funktionen bleiben identisch, welche Schnittstellen fehlen und welche zusätzliche Hardware würdest du einsetzen?",
      "Ersetze den Raspberry Pi gedanklich durch ein Android-Smartphone. Welche Aufgaben kann es selbst übernehmen und wie würdest du den MFRC522 oder einen alternativen Identifikationsweg anbinden?",
      "Übertrage die Systemlogik auf einen Thermostat: Was entspricht Eingabe, Verarbeitung, Entscheidung und Ausgabe? Wo bricht die Analogie sinnvollerweise zusammen?",
      "Übertrage das Prinzip auf Robot Car oder Drohne. Welche bereits gelernten Concepts bleiben erhalten und welche neuen Concepts werden zwingend benötigt?",
    ],
  },
};
