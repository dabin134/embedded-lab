export type SourceLink = {
  title: string;
  url: string;
  note?: string;
};

export type Concept = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  level: "Basis" | "Aufbau" | "Vertiefung";
  accent: string;
  usedIn: string[];
  question: string;
  mentalModel: string;
  principles: string[];
  transfer: string[];
  prerequisites: string[];
  sources: SourceLink[];
};

export type Component = {
  id: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  concepts: string[];
  function: string;
  interfaces: string[];
  electrical: string[];
  projectUse: string;
  cautions: string[];
  sources: SourceLink[];
};

export type ProjectStep = {
  id: string;
  number: number;
  title: string;
  phase: string;
  summary: string;
  concepts: string[];
  components: string[];
  duration: string;
  outcome: string;
  deliverable: string;
};

export type StepLesson = {
  question: string;
  explanation: string;
  theory: string[];
  preparation: string[];
  procedure: string[];
  predict: string;
  observe: string[];
  reflect: string[];
  troubleshooting: string[];
  check: string[];
  sources: SourceLink[];
};

const raspberryDocs: SourceLink = {
  title: "Raspberry Pi Documentation · GPIO and 40-pin header",
  url: "https://www.raspberrypi.com/documentation/computers/raspberry-pi.html#gpio-and-the-40-pin-header",
  note: "GPIO-Pegel, Pin-Funktionen und SPI0-Belegung.",
};

const raspberryStart: SourceLink = {
  title: "Raspberry Pi Documentation · Getting started",
  url: "https://www.raspberrypi.com/documentation/computers/getting-started.html",
  note: "Raspberry Pi OS, Boot-Medium und Erstkonfiguration.",
};

const mfrcDatasheet: SourceLink = {
  title: "NXP · MFRC522 data sheet",
  url: "https://www.nxp.com/docs/en/data-sheet/MFRC522.pdf",
  note: "Primärquelle zu 13,56 MHz, ISO/IEC 14443 A, Registern und Schnittstellen.",
};

const spotifyPlayback: SourceLink = {
  title: "Spotify for Developers · Start/Resume Playback",
  url: "https://developer.spotify.com/documentation/web-api/reference/start-a-users-playback",
  note: "Aktuelle Web-API-Referenz; Playback-Steuerung setzt Spotify Premium voraus.",
};

const originalBuild: SourceLink = {
  title: "talaexe · A Modern Day Record Player",
  url: "https://talaexe.com/moderndayrecordplayer/",
  note: "Das Referenzprojekt, das wir technisch nachvollziehen und didaktisch vertiefen.",
};

export const concepts: Concept[] = [
  {
    id: "embedded-system",
    title: "Embedded System & Systemgrenzen",
    eyebrow: "Systemdenken",
    summary: "Ein reales Gerät in Eingabe, Verarbeitung, Kommunikation und Ausgabe zerlegen – und seine Systemgrenze bewusst wählen.",
    level: "Basis",
    accent: "01",
    usedIn: ["rfid-music-player"],
    question: "Welche Aufgabe gehört zum Reader, welche zum Raspberry Pi und welche zum Audiosystem?",
    mentalModel: "Ein Embedded System ist kein einzelner Chip. Es ist eine Kette spezialisierter Subsysteme, die Energie und Information austauschen. Der Projektfortschritt wird verständlich, sobald jeder Pfeil im Datenfluss benannt werden kann.",
    principles: [
      "Eingabe, Verarbeitung und Ausgabe sind unterschiedliche Verantwortlichkeiten.",
      "Eine Schnittstelle beschreibt, was zwischen zwei Subsystemen ausgetauscht wird.",
      "Ein Fehler lässt sich leichter finden, wenn die Systemgrenzen explizit sind.",
      "Der Raspberry Pi ist ein Single-Board-Computer mit Embedded Linux, kein klassischer Mikrocontroller.",
    ],
    transfer: ["Wetterstation", "Roboter", "Datenlogger", "Smart-Home-Knoten"],
    prerequisites: [],
    sources: [raspberryDocs],
  },
  {
    id: "electricity",
    title: "Spannung, Strom, Widerstand & GND",
    eyebrow: "Elektrische Grundlagen",
    summary: "Potenzialdifferenz, Ladungsfluss und Strombegrenzung so verstehen, dass eine reale Schaltung sicher dimensioniert werden kann.",
    level: "Basis",
    accent: "02",
    usedIn: ["rfid-music-player"],
    question: "Warum reicht es nicht, eine LED einfach zwischen 3,3 V und GND zu stecken?",
    mentalModel: "Spannung beschreibt eine Potenzialdifferenz; Strom beschreibt Ladungsfluss. Bauteile legen gemeinsam fest, welcher Strom fließt. GND ist das gemeinsame Bezugspotenzial, nicht ein magischer Ort, an dem Strom verschwindet.",
    principles: [
      "Ohmsches Gesetz: U = R · I.",
      "LEDs besitzen eine Flussspannung und brauchen eine Strombegrenzung.",
      "Spannungen werden zwischen zwei Punkten gemessen.",
      "Ein gemeinsames Bezugspotenzial ist für digitale Signale ebenso wichtig wie die Datenleitung selbst.",
    ],
    transfer: ["Jede Sensorbeschaltung", "Transistorstufen", "Versorgung und Pegelwandler"],
    prerequisites: [],
    sources: [raspberryDocs],
  },
  {
    id: "embedded-linux",
    title: "Raspberry Pi & Embedded Linux",
    eyebrow: "Rechnerarchitektur",
    summary: "Verstehen, was Betriebssystem, Prozess, Dateisystem und Hardwaretreiber zwischen Python-Code und GPIO tatsächlich leisten.",
    level: "Basis",
    accent: "03",
    usedIn: ["rfid-music-player"],
    question: "Warum kann ein Python-Programm auf einem Raspberry Pi Hardware ansprechen, obwohl Linux dazwischenliegt?",
    mentalModel: "Dein Programm läuft als Prozess unter Linux. Treiber und Kernel stellen Hardware-Schnittstellen bereit; Bibliotheken machen diese Schnittstellen bequem zugänglich. Der Pi verbindet damit klassische Computerwelt und Embedded Hardware.",
    principles: [
      "Bootloader → Kernel → Dienste → Benutzerprozess sind unterschiedliche Ebenen.",
      "Hardwarezugriff erfolgt kontrolliert über Treiber und Betriebssystem-Schnittstellen.",
      "SPI muss auf dem System aktiviert sein, bevor ein Benutzerprogramm den Bus nutzen kann.",
      "Ein reproduzierbarer Aufbau dokumentiert Betriebssystem, Abhängigkeiten und Konfiguration.",
    ],
    transfer: ["Edge Computing", "Home Automation", "Linux-basierte Messgeräte"],
    prerequisites: ["embedded-system"],
    sources: [raspberryStart, raspberryDocs],
  },
  {
    id: "gpio",
    title: "GPIO & digitale Logikpegel",
    eyebrow: "Hardware ↔ Software",
    summary: "Pins als Ein- oder Ausgang konfigurieren und HIGH/LOW als reale elektrische Pegel statt als abstrakte Boolesche Werte begreifen.",
    level: "Basis",
    accent: "04",
    usedIn: ["rfid-music-player"],
    question: "Wie wird eine Zeile Python-Code zu 3,3 V an einem Pin?",
    mentalModel: "GPIO ist die kontrollierte Grenze zwischen Softwarezustand und elektrischer Welt. Ein Ausgang treibt einen Pegel, ein Eingang bewertet einen Pegel – immer relativ zu GND.",
    principles: [
      "Raspberry-Pi-GPIO arbeitet mit 3,3-V-Logik.",
      "HIGH und LOW sind Spannungsbereiche, keine idealen mathematischen Zustände.",
      "Pin-Nummer, BCM-GPIO-Nummer und physische Headerposition dürfen nicht verwechselt werden.",
      "Ein GPIO ist keine Leistungsquelle; Lasten müssen zur zulässigen Belastung passen.",
    ],
    transfer: ["Taster", "Relais-Treiber", "Status-LED", "Interrupt-Eingänge"],
    prerequisites: ["electricity", "embedded-linux"],
    sources: [raspberryDocs],
  },
  {
    id: "spi",
    title: "SPI",
    eyebrow: "Digitale Kommunikation",
    summary: "Clock, MOSI, MISO und Chip Select als synchronen seriellen Datenaustausch verstehen und auf reale Pins abbilden.",
    level: "Aufbau",
    accent: "05",
    usedIn: ["rfid-music-player"],
    question: "Wie können zwei Chips zuverlässig Byte für Byte miteinander sprechen?",
    mentalModel: "SPI liefert einen gemeinsamen Takt und getrennte Datenrichtungen. Der Controller wählt ein Peripheriegerät aus; mit jeder Taktperiode werden Bits verschoben. Was die Bits bedeuten, bestimmt das Protokoll des angeschlossenen ICs.",
    principles: [
      "SCLK liefert den Zeitrahmen.",
      "MOSI transportiert Daten Controller → Peripheral, MISO in Gegenrichtung.",
      "CE/CS wählt das angesprochene Peripheriegerät.",
      "SPI beschreibt die Übertragung; das Datenblatt beschreibt die Bedeutung der Bytes.",
    ],
    transfer: ["SD-Karten", "Displays", "ADCs", "Funkmodule"],
    prerequisites: ["gpio", "data-representation"],
    sources: [raspberryDocs, mfrcDatasheet],
  },
  {
    id: "data-representation",
    title: "Bits, Bytes, Hex & Register",
    eyebrow: "Digitale Repräsentation",
    summary: "Binäre Zustände zu Bytes gruppieren, Hexadezimalzahlen lesen und Register als kleine Hardware-Konfigurationsspeicher verstehen.",
    level: "Aufbau",
    accent: "06",
    usedIn: ["rfid-music-player"],
    question: "Wie wird aus acht Spannungszuständen ein Registerwert wie 0x92?",
    mentalModel: "Ein Bit ist ein logischer Zustand, acht Bits bilden typischerweise ein Byte. Hexadezimalnotation ist eine kompakte Schreibweise für Bitmuster. Register sind adressierbare Speicherstellen in einem IC, über die Status gelesen und Verhalten konfiguriert wird.",
    principles: [
      "1 Hex-Ziffer entspricht 4 Bits.",
      "Register besitzen Adressen und definierte Bitfelder.",
      "Lesen und Schreiben sind getrennte Operationen.",
      "Ein Datenblatt ist die semantische Landkarte der Register.",
    ],
    transfer: ["Mikrocontroller-Register", "Sensorregister", "Netzwerkprotokolle"],
    prerequisites: ["gpio"],
    sources: [mfrcDatasheet],
  },
  {
    id: "rfid",
    title: "RFID, Induktion & Load Modulation",
    eyebrow: "Felder & Funk",
    summary: "Verstehen, wie ein 13,56-MHz-Reader einen passiven Tag mit Energie versorgt und dessen Antwort im Nahfeld erkennt.",
    level: "Vertiefung",
    accent: "07",
    usedIn: ["rfid-music-player"],
    question: "Wie kann eine Karte ohne Batterie antworten?",
    mentalModel: "Reader- und Tag-Antenne koppeln magnetisch im Nahfeld. Das zeitlich veränderliche Feld induziert Energie im Tag. Der Tag antwortet nicht wie ein kräftiger Funksender, sondern verändert seine elektrische Last; der Reader erkennt diese Modulation.",
    principles: [
      "Der MFRC522 arbeitet bei 13,56 MHz.",
      "Die Kopplung hängt von Abstand, Orientierung und Antennengeometrie ab.",
      "Energieübertragung und Datenübertragung sind funktional zu unterscheiden.",
      "ISO/IEC 14443 A strukturiert die kontaktlose Kommunikation des hier verwendeten Reader-Typs.",
    ],
    transfer: ["NFC", "Zutrittskarten", "kontaktlose Identifikation"],
    prerequisites: ["electricity", "data-representation"],
    sources: [mfrcDatasheet],
  },
  {
    id: "uid",
    title: "UID & Datenmodell",
    eyebrow: "Identität & Software",
    summary: "Gelesene UID-Bytes konsistent darstellen und als Anwendungs-Schlüssel verwenden, ohne sie mit sicherer Authentifizierung zu verwechseln.",
    level: "Aufbau",
    accent: "08",
    usedIn: ["rfid-music-player"],
    question: "Wie wird aus einer Kartenantwort eine stabile Zuordnung zu einem Album?",
    mentalModel: "Die UID ist zunächst nur gelesene Information. Das Anwendungsmodell ordnet dieser Information eine Bedeutung zu. Die Karte enthält also nicht das Album; deine Software entscheidet, welches Album zu einer UID gehört.",
    principles: [
      "Rohbytes und formatierte Zeichenkette sind verschiedene Ebenen.",
      "Die Zuordnung UID → Medienaktion gehört in eine eigene Datenstruktur.",
      "Unbekannte UIDs brauchen einen definierten Zustand.",
      "Eine UID allein ist kein belastbarer Sicherheitsnachweis und sollte hier nur zur Medienauswahl dienen.",
    ],
    transfer: ["Inventar-Tags", "Objektzuordnung", "Event Routing"],
    prerequisites: ["data-representation", "rfid"],
    sources: [mfrcDatasheet],
  },
  {
    id: "software-events",
    title: "Events, Mapping & Zustände",
    eyebrow: "Embedded Software",
    summary: "Hardwareereignisse in klar getrennte Softwarezustände übersetzen und Identifikation, Entscheidung und Aktion entkoppeln.",
    level: "Aufbau",
    accent: "09",
    usedIn: ["rfid-music-player"],
    question: "Wie verhindert man, dass RFID-, Spotify- und Fehlerlogik zu einem einzigen unwartbaren if/else-Block werden?",
    mentalModel: "Ein Scan erzeugt ein Event. Dieses wird validiert, einer Aktion zugeordnet und erst danach ausgeführt. Zustände und Verantwortlichkeiten machen das System testbar.",
    principles: [
      "Reader, Mapping und Player sollten getrennte Verantwortlichkeiten besitzen.",
      "Unbekannte Karte, erneuter Scan und API-Fehler sind explizite Systemfälle.",
      "Konfiguration und geheime Zugangsdaten gehören nicht hart in den Anwendungscode.",
      "Logs machen unsichtbare Zustandswechsel beobachtbar.",
    ],
    transfer: ["Sensor-Events", "Zustandsautomaten", "Home Automation"],
    prerequisites: ["uid", "embedded-linux"],
    sources: [],
  },
  {
    id: "audio-network",
    title: "Audio, Netzwerk & APIs",
    eyebrow: "Ausgabe & Dienste",
    summary: "Lokale Audiowiedergabe als kontrollierbare Baseline verstehen und anschließend einen Netzwerkdienst wie Spotify sauber integrieren.",
    level: "Aufbau",
    accent: "10",
    usedIn: ["rfid-music-player"],
    question: "Welche Teile der Wiedergabe passieren lokal – und welche in einem entfernten Dienst?",
    mentalModel: "Das Projekt trennt Audioausgabe von Musiksteuerung. Zuerst muss der Pi zuverlässig Ton ausgeben. Erst danach kommt Netzwerksteuerung dazu. So bleibt bei Fehlern klar, ob Audio, Netzwerk, Authentifizierung oder Mapping betroffen ist.",
    principles: [
      "Lokale Wiedergabe ist der einfachste isolierte Test der Audiokette.",
      "Eine Web API transportiert Befehle und Zustände – nicht zwangsläufig die Audiodaten selbst.",
      "OAuth trennt Benutzerzustimmung von Zugangsdaten im Code.",
      "Spotify Playback-Steuerung über die Web API setzt aktuell Premium voraus und unterliegt Plattformregeln.",
    ],
    transfer: ["REST APIs", "Internetradio", "lokale Medienserver", "IoT-Dienste"],
    prerequisites: ["software-events", "embedded-linux"],
    sources: [spotifyPlayback],
  },
  {
    id: "integration",
    title: "Systemintegration & Debugging",
    eyebrow: "Engineering",
    summary: "Subsysteme einzeln verifizieren, anschließend integrieren und Fehler anhand der Systemgrenzen reproduzierbar eingrenzen.",
    level: "Vertiefung",
    accent: "11",
    usedIn: ["rfid-music-player"],
    question: "Wie wird aus mehreren funktionierenden Teilversuchen ein robustes Gerät?",
    mentalModel: "Integration ist kein letzter großer Sprung. Sie ist eine Folge kontrollierter Schnittstellentests: Energie → GPIO → SPI → RFID → Mapping → Player. Jede Stufe besitzt einen beobachtbaren Sollzustand.",
    principles: [
      "Ein Subsystem wird isoliert getestet, bevor es Teil einer Fehlerkette wird.",
      "Kaltstart, unbekannte Karte und Netzwerkfehler gehören zum normalen Testplan.",
      "Logs, Messwerte und reproduzierbare Schritte ersetzen Raten.",
      "Ein Prototyp wird zum Gerät, wenn Startzustand, Verkabelung und Fehlerverhalten dokumentiert sind.",
    ],
    transfer: ["Alle folgenden Embedded-Projekte"],
    prerequisites: ["embedded-system", "software-events", "audio-network"],
    sources: [raspberryDocs],
  },
];

export const components: Component[] = [
  {
    id: "raspberry-pi-4",
    title: "Raspberry Pi 4 Model B",
    category: "Single-Board Computer",
    summary: "Das zentrale Rechensystem: Linux, Python, SPI, Netzwerk und Mediensteuerung laufen auf einer Platine zusammen.",
    role: "Host / Controller",
    concepts: ["embedded-system", "embedded-linux", "gpio", "spi", "audio-network", "integration"],
    function: "Der Raspberry Pi liest den MFRC522 über SPI, führt die Zuordnungslogik aus und steuert die Musikwiedergabe. Er ist dabei ein vollständiger Linux-Rechner und nicht nur ein einzelner Mikrocontroller.",
    interfaces: ["40-Pin-GPIO-Header", "SPI0", "USB", "WLAN/Ethernet", "3,5-mm-Audio/HDMI bzw. optional USB-DAC"],
    electrical: ["GPIO-Logik: 3,3 V", "3,3-V- und 5-V-Versorgungspins am Header", "Gemeinsame Masse mit angeschlossenen Modulen erforderlich"],
    projectUse: "In Projekt 001 ist der Pi die Plattform, an der wir sowohl klassische Elektronik als auch Embedded Linux lernen. Später kann dasselbe Peripheriegerät an einen Mikrocontroller wandern, um die Unterschiede sichtbar zu machen.",
    cautions: ["Keine 5-V-Signale direkt auf normale GPIO-Eingänge geben.", "Leistungslasten nicht direkt über GPIO treiben.", "BCM-Nummerierung und physische Pin-Nummerierung nicht verwechseln."],
    sources: [raspberryStart, raspberryDocs],
  },
  {
    id: "breadboard-led",
    title: "Breadboard, LED & Vorwiderstand",
    category: "Grundschaltung",
    summary: "Die kleinste überprüfbare Schaltung des Projekts macht Stromweg, Polarität und GPIO-Pegel sichtbar.",
    role: "Lern- und Testschaltung",
    concepts: ["electricity", "gpio"],
    function: "Das Breadboard stellt lösbare elektrische Verbindungen her. Die LED wandelt elektrischen Strom in Licht um; der Serienwiderstand begrenzt den Strom auf einen sicheren Wert.",
    interfaces: ["GPIO-Ausgang", "3,3 V", "GND", "Multimeter-Messpunkte"],
    electrical: ["LED ist polarisiert", "Vorwiderstand liegt in Serie", "Strom wird aus Versorgung, Flussspannung und Widerstand abgeschätzt"],
    projectUse: "Bevor ein komplexer Reader angeschlossen wird, lernen wir an einer sichtbaren Last, wie Software, Pin und realer Stromkreis zusammenhängen.",
    cautions: ["LED nicht ohne Strombegrenzung betreiben.", "Vor dem Umstecken Versorgung abschalten.", "Kurzschlüsse zwischen 3,3 V und GND vermeiden."],
    sources: [raspberryDocs],
  },
  {
    id: "mfrc522",
    title: "MFRC522 / RC522-Modul",
    category: "13,56-MHz-RFID-Frontend",
    summary: "Erzeugt das kontaktlose Feld, dekodiert kompatible Tag-Antworten und stellt dem Raspberry Pi Register über eine digitale Schnittstelle bereit.",
    role: "RFID Reader / Interface",
    concepts: ["spi", "data-representation", "rfid", "uid"],
    function: "Der MFRC522 übernimmt die HF-nahe Arbeit: Transmitter, Empfänger, Demodulation, Framing und Fehlerprüfung für ISO/IEC 14443 A/MIFARE/NTAG-kompatible Kommunikation. Der Pi steuert den IC und liest Ergebnisse über Register.",
    interfaces: ["SCK", "MOSI", "MISO", "SDA/SS als Chip Select im SPI-Aufbau", "RST", "IRQ optional"],
    electrical: ["Versorgung im verwendeten Breakout-Aufbau: 3,3 V", "Kontaktlose Arbeitsfrequenz: 13,56 MHz", "Kurze, saubere SPI-Leitungen erleichtern einen stabilen Aufbau"],
    projectUse: "Das Modul ist bewusst mehr als eine Black Box: Wir verwenden es zuerst über eine Bibliothek, verfolgen danach aber SPI und Register bis zur Chip-Ebene zurück.",
    cautions: ["Modul nicht versehentlich an 5 V betreiben.", "Die Board-Beschriftung SDA ist im SPI-Modus funktional SS/CS.", "IRQ wird in unserem ersten Aufbau nicht benötigt."],
    sources: [mfrcDatasheet, originalBuild],
  },
  {
    id: "rfid-tag",
    title: "13,56-MHz-RFID-Tag",
    category: "Passiver Transponder",
    summary: "Antenne und Chip bilden einen batterielosen Transponder, dessen Kennung vom Reader kontaktlos erfasst werden kann.",
    role: "Physische Identität",
    concepts: ["rfid", "uid"],
    function: "Der Tag gewinnt Energie aus dem Feld des Readers und antwortet durch Modulation seiner Last. Im Projekt verwenden wir seine UID als Schlüssel für ein Album oder einen Track.",
    interfaces: ["Kontaktlose magnetische Nahfeldkopplung", "ISO/IEC 14443 A / MIFARE- oder NTAG-kompatibler Tag passend zum Reader"],
    electrical: ["Keine eigene Batterie", "Kopplung hängt von Abstand und Orientierung ab"],
    projectUse: "Jede Albumkarte erhält einen Tag. Die Medieninformation liegt nicht physisch als Musik auf dem Tag; die Zuordnung entsteht in unserer Software.",
    cautions: ["Metall unmittelbar hinter dem Tag kann die Kopplung deutlich verschlechtern.", "UID nicht als Sicherheitsmerkmal für Zutrittskontrolle missverstehen."],
    sources: [mfrcDatasheet],
  },
  {
    id: "multimeter",
    title: "Digitalmultimeter",
    category: "Messgerät",
    summary: "Macht Versorgung, Pegel, Widerstände und Durchgang überprüfbar und ersetzt Vermutungen durch Messwerte.",
    role: "Beobachtung / Debugging",
    concepts: ["electricity", "gpio", "integration"],
    function: "Mit Spannungs- und Widerstandsmessung prüfen wir zuerst einfache Stromkreise und später Versorgung sowie Leitungsverbindungen der Subsysteme.",
    interfaces: ["COM-Messleitung", "V/Ω-Eingang", "Messspitzen"],
    electrical: ["Spannung parallel messen", "Widerstand nur an spannungsfreier Schaltung messen", "Strommessung erfordert eine andere Verschaltung als Spannungsmessung"],
    projectUse: "Bei jedem Hardwarefehler ist die erste Frage nicht 'welcher Code ist falsch?', sondern ob Versorgung und Bezugspotenzial tatsächlich stimmen.",
    cautions: ["Widerstandsmessung niemals an aktiv versorgter Schaltung.", "Messbereich und Buchsenbelegung vor Strommessungen prüfen."],
    sources: [],
  },
  {
    id: "audio-output",
    title: "Audioausgabe & Stereoanlage",
    category: "Ausgabesystem",
    summary: "Wandelt den vom Pi bereitgestellten Audiostrom über einen geeigneten Ausgang und Verstärker in hörbaren Schall.",
    role: "Aktor / Medienausgabe",
    concepts: ["audio-network", "integration"],
    function: "Für das Lernprojekt behandeln wir den vorhandenen Verstärker beziehungsweise aktive Lautsprecher als eigenes Subsystem. Zuerst testen wir die Audioausgabe isoliert, erst dann koppeln wir sie an RFID-Ereignisse.",
    interfaces: ["3,5-mm-Ausgang oder USB-Audio-DAC", "AUX/Line-In der Stereoanlage", "alternativ HDMI-Audio"],
    electrical: ["Line-Level-Signal ist nicht für passive Lautsprecher ohne Verstärker gedacht", "Gemeinsame Audioverbindung nur über geeignete Ein-/Ausgänge herstellen"],
    projectUse: "Das Subsystem liefert das sicht- beziehungsweise hörbare Endergebnis des gesamten Datenflusses: UID → Entscheidung → Wiedergabe.",
    cautions: ["Passive Lautsprecher nicht direkt an GPIO anschließen.", "Lautstärke beim ersten Test niedrig beginnen."],
    sources: [],
  },
  {
    id: "spotify-service",
    title: "Spotify Web API / Connect",
    category: "Netzwerkdienst",
    summary: "Optionale Online-Schicht des Referenzprojekts: Der Pi ordnet RFID-Ereignisse Spotify-Kontexten zu und stößt Wiedergabe an.",
    role: "Mediensteuerung",
    concepts: ["software-events", "audio-network", "integration"],
    function: "Die Web API nimmt authentifizierte Steuerbefehle entgegen. Das eigentliche Abspielgerät wird als Spotify-Gerät angesprochen; unser Code verwaltet die Zuordnung von UIDs zu Track- oder Album-Kontexten.",
    interfaces: ["HTTPS / Web API", "OAuth 2.0", "Spotify-Geräte-ID", "Track-/Album-Kontext"],
    electrical: ["Keine direkte elektrische Schnittstelle – dies ist bewusst ein Software-/Netzwerkbaustein"],
    projectUse: "Die Spotify-Integration kommt erst nach einem funktionierenden lokalen RFID- und Audio-Pfad. Damit bleibt sie austauschbar und blockiert das Verständnis der Hardware nicht.",
    cautions: ["Client Secret nicht in ein öffentliches Repository committen.", "Playback-Steuerung über die Spotify Web API setzt aktuell Premium voraus.", "Plattformregeln und APIs können sich ändern; lokale Wiedergabe bleibt die stabile Baseline."],
    sources: [spotifyPlayback, originalBuild],
  },
];

export const rfidSteps: ProjectStep[] = [
  {
    id: "system-verstehen",
    number: 1,
    title: "System verstehen",
    phase: "Orientieren",
    summary: "Zerlege die Jukebox in Tag, Reader, Raspberry Pi, Software und Audio – und benenne für jeden Übergang die transportierte Information.",
    concepts: ["embedded-system"],
    components: ["raspberry-pi-4", "mfrc522", "rfid-tag", "audio-output"],
    duration: "30 min",
    outcome: "Du kannst den Weg von der RFID-Karte bis zur Musik ohne Black-Box-Begriffe erklären.",
    deliverable: "Ein beschriftetes Blockdiagramm mit Energie- und Informationsfluss.",
  },
  {
    id: "pi-vorbereiten",
    number: 2,
    title: "Raspberry Pi vorbereiten",
    phase: "Plattform",
    summary: "Richte Raspberry Pi OS ein, lerne Terminal und Dateisystem kennen und prüfe den 40-Pin-Header, bevor Hardware angeschlossen wird.",
    concepts: ["embedded-linux", "embedded-system"],
    components: ["raspberry-pi-4"],
    duration: "45–60 min",
    outcome: "Der Pi bootet reproduzierbar, ist erreichbar und du kannst seine Hardware-Schnittstellen identifizieren.",
    deliverable: "Ein dokumentierter Systemstand mit OS, Hostname und Pinout-Referenz.",
  },
  {
    id: "led-grundlagen",
    number: 3,
    title: "Elektrische Grundlagen & LED",
    phase: "Fundament",
    summary: "Baue einen sicheren LED-Stromkreis, berechne den Vorwiderstand und vergleiche Erwartung mit Messwerten.",
    concepts: ["electricity"],
    components: ["breadboard-led", "multimeter", "raspberry-pi-4"],
    duration: "45 min",
    outcome: "Eine LED leuchtet kontrolliert und du kannst Stromweg, Spannung und Widerstand begründen.",
    deliverable: "Schaltbild plus Messnotiz mit berechnetem und beobachtetem Wert.",
  },
  {
    id: "gpio",
    number: 4,
    title: "GPIO kontrollieren",
    phase: "Steuern",
    summary: "Schalte die LED aus Python, miss HIGH und LOW und lerne, wie Linux, Bibliothek und Pinzustand zusammenspielen.",
    concepts: ["gpio", "embedded-linux"],
    components: ["raspberry-pi-4", "breadboard-led", "multimeter"],
    duration: "40 min",
    outcome: "Du kannst Softwarezustand und elektrischen Pegel miteinander verknüpfen.",
    deliverable: "Ein kleines Blinkprogramm plus gemessene HIGH-/LOW-Pegel.",
  },
  {
    id: "mfrc522-anschliessen",
    number: 5,
    title: "MFRC522 anschließen",
    phase: "Verbinden",
    summary: "Verdrahte 3,3 V, GND, Reset und SPI0 funktional – nicht durch blindes Kopieren einer Pin-Tabelle.",
    concepts: ["spi", "gpio", "electricity"],
    components: ["raspberry-pi-4", "mfrc522", "multimeter"],
    duration: "35 min",
    outcome: "Reader und Pi sind elektrisch sauber verbunden und SPI ist im Betriebssystem aktiviert.",
    deliverable: "Verdrahtungsplan mit BCM-, Header- und RC522-Pinbezeichnungen.",
  },
  {
    id: "spi-register",
    number: 6,
    title: "SPI, Bits & Register",
    phase: "Kommunizieren",
    summary: "Verstehe den Bus unterhalb der Python-Bibliothek: Takt, Datenrichtungen, Chip Select, Byte-Darstellung und Registerzugriffe.",
    concepts: ["spi", "data-representation"],
    components: ["raspberry-pi-4", "mfrc522"],
    duration: "60 min",
    outcome: "Du kannst erklären, was bei einem Registerzugriff auf den SPI-Leitungen passiert.",
    deliverable: "Ein annotierter SPI-Transfer vom Registeradressbyte bis zum Antwortbyte.",
  },
  {
    id: "rfid-physik",
    number: 7,
    title: "RFID-Physik untersuchen",
    phase: "Felder",
    summary: "Verbinde Faradays Induktion mit einem realen 13,56-MHz-System und untersuche Abstand sowie Orientierung des Tags.",
    concepts: ["rfid", "electricity"],
    components: ["mfrc522", "rfid-tag"],
    duration: "50 min",
    outcome: "Du kannst erklären, warum ein passiver Tag ohne Batterie versorgt wird und wie seine Antwort zurückkommt.",
    deliverable: "Mess-/Beobachtungsreihe zu Abstand und Orientierung mit physikalischer Begründung.",
  },
  {
    id: "uid-lesen",
    number: 8,
    title: "UID lesen & darstellen",
    phase: "Daten",
    summary: "Lies Tags wiederholt ein, beobachte Rohbytes und definiere eine konsistente Darstellung für die spätere Zuordnung.",
    concepts: ["uid", "data-representation", "rfid"],
    components: ["raspberry-pi-4", "mfrc522", "rfid-tag"],
    duration: "45 min",
    outcome: "Mehrere Tags werden stabil unterschieden und ihre IDs nachvollziehbar protokolliert.",
    deliverable: "Eine kleine UID-Tabelle mit mindestens drei getesteten Tags.",
  },
  {
    id: "uid-zuordnung",
    number: 9,
    title: "UID → Musikaktion modellieren",
    phase: "Software",
    summary: "Trenne Reader, Datenmodell und Aktion. Eine UID wird über eine zentrale Mapping-Struktur einem Album oder Track zugeordnet.",
    concepts: ["uid", "software-events"],
    components: ["raspberry-pi-4", "rfid-tag"],
    duration: "45 min",
    outcome: "Mehrere Tags lösen unterschiedliche, zunächst harmlose Testaktionen aus.",
    deliverable: "Ein testbares Python-Mapping mit definiertem Verhalten für unbekannte Karten.",
  },
  {
    id: "audio-spotify",
    number: 10,
    title: "Audio & Spotify integrieren",
    phase: "Ausgabe",
    summary: "Verifiziere zuerst lokale Audioausgabe und ergänze danach optional die Spotify-Steuerung des Referenzprojekts.",
    concepts: ["audio-network", "software-events"],
    components: ["raspberry-pi-4", "audio-output", "spotify-service"],
    duration: "60–90 min",
    outcome: "Der Pi kann unabhängig vom RFID-Reader reproduzierbar eine definierte Medienaktion ausführen.",
    deliverable: "Ein isolierter Player-Test: lokal oder über Spotify, mit dokumentierter Fehlerbehandlung.",
  },
  {
    id: "integration",
    number: 11,
    title: "System integrieren & zum Gerät machen",
    phase: "Engineering",
    summary: "Verbinde Scan, Mapping und Wiedergabe, definiere Start- und Fehlerzustände und teste den Aufbau mehrfach vom Kaltstart aus.",
    concepts: ["integration", "software-events", "audio-network"],
    components: ["raspberry-pi-4", "mfrc522", "rfid-tag", "audio-output", "spotify-service"],
    duration: "90+ min",
    outcome: "Eine dokumentierte RFID-Jukebox startet reproduzierbar und reagiert kontrolliert auf bekannte und unbekannte Karten.",
    deliverable: "Fertiger Prototyp, Systemdiagramm, Pinout, Konfiguration und kurzer Testbericht.",
  },
];

export const stepLessons: Record<string, StepLesson> = {
  "system-verstehen": {
    question: "Welche Information wandert vom Auflegen einer Karte bis zum Start eines Albums durch das System?",
    explanation: "Wir beginnen absichtlich nicht mit Kabeln. Das Referenzgerät besteht aus mehreren Schichten: Der MFRC522 erzeugt ein 13,56-MHz-Feld und gewinnt aus der Tag-Kommunikation digitale Daten. Der Raspberry Pi liest diese Daten über SPI, interpretiert die UID und entscheidet anhand einer Zuordnung, welche Medienaktion ausgeführt wird. Erst danach kommt Audio beziehungsweise Spotify ins Spiel. Dieses Blockmodell wird später unsere Debugging-Landkarte.",
    theory: [
      "Physikalische Ebene: elektromagnetische Kopplung zwischen Reader und Tag.",
      "Digitale Schnittstelle: MFRC522 ↔ Raspberry Pi über SPI.",
      "Anwendungsebene: UID → Mapping → Medienaktion.",
      "Ausgabeebene: lokales Audio oder ein Netzwerkdienst steuert die Wiedergabe.",
      "Energiefluss und Informationsfluss sind nicht dasselbe und werden getrennt eingezeichnet.",
    ],
    preparation: ["Lege Raspberry Pi, RC522, einen RFID-Tag und deine spätere Audioausgabe sichtbar nebeneinander.", "Öffne eine Notizseite für dein erstes Systemdiagramm."],
    procedure: ["Zeichne fünf Kästen: RFID-Tag → MFRC522 → Raspberry Pi → Player/Spotify → Stereoanlage.", "Beschrifte jeden Pfeil mit einer konkreten Größe oder Datenart statt nur mit 'Signal'.", "Markiere zusätzlich, wo elektrische Energie eingespeist wird."],
    predict: "Welcher Teil des Systems weiß tatsächlich, dass eine bestimmte UID zu einem bestimmten Album gehört? Schreibe deine Antwort auf, bevor du weiterlesen oder Code ansiehst.",
    observe: ["Der RFID-Tag enthält im Grundaufbau nicht die Musikdatei.", "Der Reader entscheidet nicht, welches Album gespielt wird.", "Die Bedeutung der UID entsteht erst in deiner Software."],
    reflect: ["Welche zwei Subsysteme könntest du unabhängig voneinander testen?", "An welcher Stelle würdest du suchen, wenn die UID korrekt erscheint, aber keine Musik startet?"],
    troubleshooting: ["Wenn du einen Pfeil nur mit 'Signal' beschriften kannst, ist genau dort ein späteres Lernziel.", "Wenn Hardware und Software in einem Kasten landen, trenne sie weiter auf."],
    check: ["Ich kann Eingabe, Verarbeitung, Entscheidung und Ausgabe unterscheiden.", "Ich kann Energiefluss und Informationsfluss getrennt beschreiben.", "Ich kann erklären, wo die Zuordnung UID → Album gespeichert ist."],
    sources: [originalBuild, mfrcDatasheet],
  },
  "pi-vorbereiten": {
    question: "Was macht den Raspberry Pi zum Embedded-Linux-System und nicht einfach zu einem 'großen Arduino'?",
    explanation: "Der Raspberry Pi 4 ist ein vollständiger Rechner mit Prozessor, RAM, Massenspeicher und Linux. Unser Python-Code läuft als Prozess auf dem Betriebssystem. Der Kernel und seine Treiber stellen unter anderem GPIO und SPI bereit. Diese zusätzliche Schicht ist leistungsfähig, bedeutet aber auch: Hardwarefunktion, Betriebssystemkonfiguration und Anwendungscode müssen getrennt gedacht werden.",
    theory: [
      "Boot-Medium und Raspberry Pi OS bilden die Softwarebasis.",
      "Das Linux-Dateisystem speichert Programm, Konfiguration und Logs.",
      "GPIO/SPI werden durch den SoC bereitgestellt und über Linux zugänglich gemacht.",
      "SPI0 liegt beim Pi 4 auf GPIO10/MOSI, GPIO9/MISO, GPIO11/SCLK und GPIO8/CE0.",
    ],
    preparation: ["Raspberry Pi 4, passendes Netzteil und microSD-Karte bereitlegen.", "Raspberry Pi OS mit dem offiziellen Imager auf die Karte schreiben.", "Wenn möglich Hostname, Benutzer und WLAN bereits im Imager konfigurieren."],
    procedure: ["Pi booten und im Terminal `cat /etc/os-release` ausführen.", "Mit `hostname` den Rechnernamen prüfen.", "Mit `pinout` die GPIO-Belegung anzeigen.", "Noch keine RC522-Leitungen stecken: Zuerst Pin-Nummerierung und Systemzustand dokumentieren."],
    predict: "Was würde sich an deinem Python-Code ändern, wenn derselbe Reader später an einem Mikrocontroller statt an Linux hängt?",
    observe: ["Physische Header-Pinnummern und BCM-GPIO-Nummern sind zwei verschiedene Namensräume.", "Der Pi ist nach dem Boot bereits ein Mehrprozess-System, bevor dein eigenes Programm startet."],
    reflect: ["Welche Aufgabe übernimmt Linux, die bei einem Bare-Metal-Mikrocontroller dein eigener Code übernehmen müsste?", "Welche Konfigurationsdaten brauchst du, damit jemand deinen Aufbau später reproduzieren kann?"],
    troubleshooting: ["Bei unklarem Pinout zuerst `pinout` verwenden statt Bilder aus zufälligen Tutorials.", "Bei Problemen nach OS-Updates erst Systemzustand dokumentieren, nicht sofort Hardware umstecken."],
    check: ["Ich kann SBC und Mikrocontroller unterscheiden.", "Ich kann BCM- und physische Pin-Nummerierung auseinanderhalten.", "Ich kann erklären, warum SPI eine Betriebssystem- und eine Hardwareseite hat."],
    sources: [raspberryStart, raspberryDocs],
  },
  "led-grundlagen": {
    question: "Warum ist eine LED-Schaltung bereits ein vollständiges kleines Engineering-Problem?",
    explanation: "Die LED ist unser kontrollierter Einstieg in reale Elektronik. Sie besitzt eine Polarität und eine nichtlineare Kennlinie. Ohne Serienwiderstand kann der Strom zu groß werden. Deshalb berechnen wir vor dem Aufbau eine plausible Größenordnung und messen danach nach. Das gleiche Muster – vorhersagen, aufbauen, messen, erklären – gilt später für jedes komplexere Subsystem.",
    theory: [
      "Ohmsches Gesetz: I = U / R.",
      "Für die LED-Schätzung verwenden wir I ≈ (UQuelle − ULED) / R.",
      "GND ist unser gemeinsames Bezugspotenzial.",
      "Spannung wird parallel zu einem Bauteil gemessen; Widerstand an spannungsfreier Schaltung.",
    ],
    preparation: ["Breadboard, LED, 330-Ω-Widerstand, Jumper und Multimeter bereitlegen.", "Pi ausschalten, bevor du die Schaltung steckst."],
    procedure: ["Baue 3,3 V → 330 Ω → LED → GND.", "Prüfe LED-Polarität und Verbindungen im spannungsfreien Zustand.", "Schalte ein und miss Spannung über LED sowie über Widerstand.", "Berechne aus der Widerstandsspannung den Strom und vergleiche mit deiner Vorhersage."],
    predict: "Nimm für eine rote LED grob 2,0 V Flussspannung an. Welchen Strom erwartest du bei 3,3 V und 330 Ω?",
    observe: ["Die Versorgungsspannung verteilt sich auf LED und Widerstand.", "Der reale Messwert weicht etwas von der groben Modellrechnung ab.", "Eine falsche LED-Orientierung verhindert den erwarteten Stromfluss."],
    reflect: ["Welche Modellannahme verursacht die größte Unsicherheit in deiner Vorhersage?", "Warum wäre ein kleinerer Widerstand nicht automatisch 'besser', obwohl die LED heller würde?"],
    troubleshooting: ["LED dunkel: Polarität, Breadboard-Reihen und GND-Verbindung prüfen.", "Unplausible Spannung: Messgerät wirklich auf DC-Spannung und richtige Buchsen prüfen.", "Pi meldet Unterspannung oder wird instabil: sofort abschalten und Kurzschluss suchen."],
    check: ["Ich kann den Stromweg vollständig zeigen.", "Ich kann den Vorwiderstand begründen.", "Ich kann Messwert und Modellrechnung plausibel vergleichen."],
    sources: [raspberryDocs],
  },
  "gpio": {
    question: "Wie wird ein Softwarezustand zu einem messbaren Spannungszustand?",
    explanation: "Ein GPIO-Ausgang koppelt einen logischen Zustand an die Ausgangsstufe des SoC. Auf dem Raspberry Pi bedeutet HIGH am normalen GPIO ungefähr 3,3 V und LOW ungefähr 0 V. Python setzt diesen Zustand nicht direkt 'magisch'; Bibliothek, Betriebssystem und Hardwaretreiber bilden gemeinsam den Pfad zur Peripherie.",
    theory: [
      "Output und Input sind Pin-Modi; HIGH und LOW sind Zustände beziehungsweise Pegel.",
      "GPIO-Ausgänge sind für Logik und kleine Lasten gedacht, nicht für Motoren oder Lautsprecher.",
      "BCM-Nummern bezeichnen GPIO-Signale, nicht die fortlaufenden Headerpositionen.",
      "Ein reproduzierbares Blinksignal verbindet Softwarezeit mit realer Spannung."],
    preparation: ["Verwende die funktionierende LED-Schaltung aus Schritt 3.", "Verschiebe die Versorgung der LED vom festen 3,3-V-Pin auf einen geeigneten GPIO-Ausgang."],
    procedure: ["Erzeuge ein kleines Python-Programm, das einen GPIO als Ausgang konfiguriert.", "Schalte HIGH, warte, schalte LOW und wiederhole den Ablauf.", "Miss mit dem Multimeter den Pin gegen GND in beiden Zuständen.", "Ändere ausschließlich die Wartezeit und beobachte die Blinkfrequenz."],
    predict: "Welchen Spannungswert erwartest du gegen GND für HIGH und für LOW?",
    observe: ["Der logische Zustand ist als reale Spannung messbar.", "Die Blinkdauer wird durch Software bestimmt, der Pegel durch die elektrische Ausgangsstufe.", "Das Betriebssystem läuft parallel weiter; dein Programm ist nur ein Prozess unter vielen."],
    reflect: ["Was ist der Unterschied zwischen Pin-Modus und Pin-Wert?", "Warum wäre ein Motor trotz 'digitalem An/Aus' kein sinnvoller direkter GPIO-Verbraucher?"],
    troubleshooting: ["LED dauerhaft aus: falsche BCM-Nummer oder physische Pinposition prüfen.", "GPIO wirkt invertiert: LED-Orientierung und Schaltungsrichtung überprüfen.", "Vor jedem Umstecken Pi beziehungsweise Schaltung spannungsfrei machen."],
    check: ["Ich kann HIGH/LOW elektrisch erklären.", "Ich kann BCM-Nummer und Header-Pin korrekt zuordnen.", "Ich kann erklären, warum GPIO keine universelle Leistungsquelle ist."],
    sources: [raspberryDocs],
  },
  "mfrc522-anschliessen": {
    question: "Welche Funktion hat jeder einzelne Draht zwischen Raspberry Pi und MFRC522?",
    explanation: "Jetzt ersetzen wir eine einfache Last durch ein digitales Peripheriegerät. Der MFRC522 braucht zuerst korrekte Versorgung und ein gemeinsames Bezugspotenzial. Dann kommen SPI-Takt, zwei Datenrichtungen und Chip Select hinzu. RST wird in unserem Referenzaufbau separat über GPIO23 geführt. Die Leitung IRQ bleibt zunächst frei.",
    theory: [
      "RC522 3.3V → Pi 3V3; GND → GND.",
      "SCK → GPIO11 / physisch Pin 23.",
      "MOSI → GPIO10 / Pin 19; MISO → GPIO9 / Pin 21.",
      "SDA/SS → GPIO8 / CE0 / Pin 24.",
      "RST → GPIO23 / Pin 16; IRQ bleibt unbeschaltet.",
      "SPI0 muss in Raspberry Pi OS aktiviert sein."],
    preparation: ["Pi vollständig herunterfahren und Netzteil trennen.", "RC522-Pinbeschriftung mit Datenblatt/Board vergleichen.", "Verdrahtungsplan mit drei Spalten vorbereiten: RC522-Pin, BCM-GPIO, physischer Pin."],
    procedure: ["Stecke zuerst GND und 3,3 V, aber versorge den Pi noch nicht.", "Ergänze SCK, MOSI, MISO, SDA/SS und RST einzeln und hake jeden Draht im Plan ab.", "Prüfe vor dem Einschalten Durchgang beziehungsweise offensichtliche Kurzschlüsse.", "Boote den Pi und aktiviere SPI über `sudo raspi-config` beziehungsweise prüfe die SPI-Konfiguration."],
    predict: "Welche Leitungen könnten theoretisch gemeinsam von mehreren SPI-Geräten benutzt werden – und welche Leitung müsste für jedes Gerät separat sein?",
    observe: ["SCK, MOSI und MISO bilden den gemeinsamen Bus.", "CE0/CS entscheidet, welcher Teilnehmer angesprochen wird.", "Der Reader funktioniert nur mit gemeinsamem GND, obwohl seine Datenleitungen korrekt gesteckt sein könnten."],
    reflect: ["Warum steht auf vielen RC522-Boards 'SDA', obwohl wir den Pin als SS/CS verwenden?", "Welche Fehlerklasse entsteht, wenn die Versorgung stimmt, aber MISO und MOSI vertauscht sind?"],
    troubleshooting: ["Reader wird nicht gefunden: zuerst 3,3 V gegen GND messen.", "Dann SPI-Aktivierung und Pinbelegung prüfen; erst danach Bibliothekscode ändern.", "5 V am RC522 vermeiden."],
    check: ["Ich kann jeden Draht funktional erklären.", "Ich kann die Belegung ohne Foto aus SPI0 und dem Modul-Pinout herleiten.", "SPI ist im Betriebssystem aktiviert."],
    sources: [raspberryDocs, mfrcDatasheet, originalBuild],
  },
  "spi-register": {
    question: "Was macht eine Python-Bibliothek bei einem MFRC522-Registerzugriff wirklich?",
    explanation: "Unterhalb eines komfortablen Funktionsaufrufs liegt ein synchroner serieller Transfer. Der Pi aktiviert den Reader über Chip Select, erzeugt Taktflanken und schiebt Bits über MOSI hinaus, während gleichzeitig Bits über MISO hereinkommen. Beim MFRC522 kodiert das erste Byte unter anderem Registeradresse und Lese-/Schreiboperation. Das Datenblatt gibt diesen Bits ihre Bedeutung.",
    theory: [
      "SPI ist synchron: Daten werden relativ zu SCLK-Flanken übertragen.",
      "MOSI und MISO sind getrennte Datenrichtungen.",
      "Ein Byte ist eine Gruppe von acht Bits; Hex schreibt vier Bits kompakt als eine Ziffer.",
      "Register besitzen Adressen und definierte Bitfelder.",
      "Ein Logic Analyzer wäre später das passende Messgerät, um diesen Transfer real zu beobachten."],
    preparation: ["Öffne die MFRC522-Datenblattabschnitte zu Host-Schnittstelle und Registern.", "Öffne parallel unseren SPI-Signal-Explorer im Lab."],
    procedure: ["Markiere in einem Beispieltransfer zuerst CS, dann acht SCLK-Perioden.", "Ordne MOSI-Bits zu einem Adress-/Befehlsbyte zusammen.", "Ordne MISO-Bits zu einem Antwortbyte zusammen.", "Suche die Registeradresse im Datenblatt und schreibe daneben, was der gelesene Wert semantisch bedeutet."],
    predict: "Wenn der Pi keinen Takt erzeugt, kann der Reader dann trotzdem über MISO ein vollständiges Byte übertragen? Begründe.",
    observe: ["Elektrische Pegel werden zu Bits, Bits zu Bytes und Bytes zu Registersemantik.", "SPI selbst weiß nichts von RFID – diese Bedeutung entsteht erst durch das MFRC522-Protokoll."],
    reflect: ["Welche Information liefert SCLK, die MOSI allein nicht enthält?", "Warum ist das Datenblatt für Registerarbeit unverzichtbar?"],
    troubleshooting: ["Nur 0x00/0xFF: Versorgung, CS und MISO prüfen.", "Instabile Werte: Verdrahtung und gemeinsame Masse prüfen, bevor Timingparameter verändert werden."],
    check: ["Ich kann SCLK, MOSI, MISO und CS erklären.", "Ich kann Binär- und Hexdarstellung ineinander übersetzen.", "Ich kann Adresse, Registerwert und Bedeutung auseinanderhalten."],
    sources: [raspberryDocs, mfrcDatasheet],
  },
  "rfid-physik": {
    question: "Wie versorgt der Reader einen Tag ohne Batterie – und wie bekommt er trotzdem eine Antwort zurück?",
    explanation: "Der MFRC522 treibt seine Antenne mit einem hochfrequenten Signal bei 13,56 MHz. Im magnetischen Nahfeld koppelt die Tag-Antenne ein; der zeitlich veränderliche magnetische Fluss induziert eine Spannung, die der Tag gleichrichten und nutzen kann. Für die Antwort verändert der Tag gezielt seine Last. Diese Load Modulation erzeugt kleine Änderungen, die der Reader demoduliert und digital auswertet.",
    theory: [
      "Faradays Induktionsgesetz verbindet zeitlich veränderlichen magnetischen Fluss mit induzierter Spannung.",
      "Reader- und Tag-Antenne verhalten sich im Nahfeld wie lose gekoppelte Spulen.",
      "Arbeitsfrequenz des MFRC522: 13,56 MHz.",
      "Abstand, Winkel und Materialien in der Umgebung beeinflussen die Kopplung.",
      "Die Tag-Antwort entsteht über Lastmodulation, nicht durch einen starken eigenen Sender."],
    preparation: ["Lege einen kompatiblen RFID-Tag und ein Lineal bereit.", "Nutze das funktionierende Reader-Testprogramm aus dem nächsten Schritt oder eine einfache Erkennungsanzeige."],
    procedure: ["Teste den Tag direkt über der Antenne und vergrößere den Abstand schrittweise.", "Wiederhole den Versuch bei 0°, 45° und 90° Orientierung.", "Notiere die größte reproduzierbare Lesedistanz je Orientierung.", "Teste optional ein nichtmetallisches und ein metallisches Hindernis – ohne das Modul kurzzuschließen."],
    predict: "Welche Orientierung erwartest du als günstigste für die magnetische Kopplung zwischen den Antennenschleifen?",
    observe: ["Die Lesereichweite ist kurz und orientierungsabhängig.", "Der Tag braucht keine Batterie.", "Mechanische Gestaltung des späteren Gehäuses beeinflusst die elektrische Funktion."],
    reflect: ["Wie erklärt der magnetische Fluss die Winkelabhängigkeit?", "Warum ist 'Funk' hier als Begriff zu grob, wenn man das Nahfeldprinzip verstehen will?"],
    troubleshooting: ["Sehr kurze Reichweite: Tag-Kompatibilität, Modulversorgung und metallische Umgebung prüfen.", "Intermittierende Reads: Tag ruhig positionieren und zuerst Geometrie statt Software verändern."],
    check: ["Ich kann Energieübertragung und Datenantwort trennen.", "Ich kann die Rolle beider Antennen erklären.", "Ich kann Abstand und Orientierung physikalisch begründen."],
    sources: [mfrcDatasheet],
  },
  "uid-lesen": {
    question: "Wann wird eine gelesene Kartenantwort zu einem zuverlässigen Schlüssel in unserer Anwendung?",
    explanation: "Zuerst lesen wir Daten, ohne sofort Musik zu starten. Eine UID erscheint als Folge von Bytes. Für unsere Anwendung brauchen wir eine konsistente Darstellung, damit derselbe Tag bei jeder Messung denselben Schlüssel liefert. Gleichzeitig lernen wir eine wichtige Grenze: UID-basierte Zuordnung ist für eine Jukebox praktisch, aber keine sichere Authentifizierung.",
    theory: [
      "Die UID ist eine Bytefolge; die Anzeige als Dezimal- oder Hex-Zeichenkette ist nur Darstellung.",
      "Wiederholte Messungen prüfen, ob Leselogik und Format stabil sind.",
      "Eine Anwendung kann die UID als Dictionary-Key verwenden.",
      "Sicherheitsrelevante Systeme dürfen nicht einfach annehmen, eine UID sei geheim oder fälschungssicher."],
    preparation: ["Mindestens drei kompatible RFID-Tags nummerieren.", "Python-Umgebung für den Reader einrichten und ein minimales Leseskript vorbereiten."],
    procedure: ["Lies Tag A zehnmal und protokolliere das Ergebnis.", "Wiederhole mit Tag B und C.", "Gib die UID zusätzlich byteweise beziehungsweise hexadezimal aus.", "Definiere ein einheitliches Format, das du ab jetzt im Projekt verwendest."],
    predict: "Was sollte sich beim zehnmaligen Lesen desselben Tags ändern – die UID oder nur Zeitpunkt und Messumstände?",
    observe: ["Gleicher Tag liefert bei korrektem Aufbau dieselbe Identität.", "Unterschiedliche Darstellungen können denselben Rohdaten entsprechen.", "Ein Lesefehler ist von einer unbekannten, aber gültigen UID zu unterscheiden."],
    reflect: ["Warum ist ein String wie `04-A7-...` nicht die physikalische Information selbst?", "Welche Daten würdest du zusätzlich loggen, wenn sporadisch Reads ausfallen?"],
    troubleshooting: ["Keine Reads: zuerst Schritt 5 Versorgung/SPI erneut verifizieren.", "Unterschiedliche Formate: Normalisierungsfunktion an einer Stelle zentralisieren."],
    check: ["Ich kann UID-Rohdaten und Darstellung unterscheiden.", "Ich habe mehrere Tags wiederholt getestet.", "Ich verwende die UID nicht als Sicherheitsversprechen."],
    sources: [mfrcDatasheet, originalBuild],
  },
  "uid-zuordnung": {
    question: "Wie wird aus 'Karte erkannt' eine erweiterbare Medienlogik statt eines wachsenden if/elif-Blocks?",
    explanation: "Reader und Player sollen nicht voneinander wissen müssen. Der Reader liefert eine normalisierte UID. Eine Mapping-Schicht übersetzt diese UID in eine Medienaktion. Der Player führt diese Aktion aus. Dadurch kannst du später lokale Dateien, Spotify oder etwas völlig anderes austauschen, ohne die RFID-Schicht neu zu schreiben.",
    theory: [
      "Separation of Concerns: lesen, entscheiden und ausführen sind getrennte Verantwortlichkeiten.",
      "Ein Python-Dictionary ist eine natürliche Darstellung für UID → Aktion.",
      "Unbekannte UID ist ein regulärer Zustand, kein Programmfehler.",
      "Konfiguration kann später aus Code in eine JSON-/YAML-Datei wandern."],
    preparation: ["Verwende die UID-Tabelle aus Schritt 8.", "Lege zunächst harmlose Testaktionen fest, zum Beispiel Textausgaben statt Musik."],
    procedure: ["Erzeuge ein Dictionary `media_by_uid` mit mindestens drei Karten.", "Schreibe eine Funktion, die eine UID auflöst und einen strukturierten Medienwert zurückgibt.", "Definiere den Fall 'UID unbekannt'.", "Teste die Mapping-Funktion unabhängig vom Reader mit festen Testwerten."],
    predict: "Welche Teile deines Programms sollten unverändert bleiben, wenn du morgen von Spotify auf lokale FLAC-Dateien wechselst?",
    observe: ["Die RFID-Schicht kann ohne Audio getestet werden.", "Die Player-Schicht kann ohne echte RFID-Hardware getestet werden.", "Das System wird durch klare Schnittstellen einfacher statt komplizierter."],
    reflect: ["Warum ist Testbarkeit ein Architekturmerkmal und nicht nur eine spätere Qualitätssicherung?", "Welche Daten gehören wirklich in die Zuordnung: nur ein Dateipfad oder ein strukturierter Medientyp?"],
    troubleshooting: ["Falsche Karte löst Aktion aus: normalisierte UID und Datentyp im Mapping prüfen.", "Mapping wächst unübersichtlich: Medienmetadaten in eigene Struktur auslagern."],
    check: ["Reader, Mapping und Player sind logisch getrennt.", "Unbekannte Karten haben definiertes Verhalten.", "Die Mapping-Funktion lässt sich ohne Hardware testen."],
    sources: [],
  },
  "audio-spotify": {
    question: "Wie beweisen wir, dass die Ausgabekette funktioniert, bevor wir sie mit RFID verknüpfen?",
    explanation: "Wir isolieren zuerst das Audio-Subsystem. Ein lokaler Testton oder eine lokale Datei muss zuverlässig über die gewählte Audioausgabe an der Stereoanlage ankommen. Erst danach ergänzen wir die Netzwerkebene. Für die Referenzvariante kann der Pi als Spotify-Gerät dienen und per Web API gesteuert werden. Die Spotify-Schicht ist bewusst optional und austauschbar; die Lernziele der Hardware bleiben davon unabhängig.",
    theory: [
      "Digitale Audiodaten werden von Software dekodiert und über ein Audiointerface ausgegeben.",
      "Line-Level/USB/HDMI-Ausgänge gehören an geeignete Verstärker- oder Aktivlautsprechereingänge.",
      "Eine Web API steuert Zustände über das Netzwerk; OAuth autorisiert den Zugriff.",
      "Spotify Web API Playback-Steuerung setzt aktuell Premium voraus.",
      "Zugangsdaten gehören in Umgebungsvariablen oder lokale Konfiguration, nicht in Git."],
    preparation: ["Stereoanlage oder Aktivlautsprecher mit passendem Eingang anschließen und Lautstärke niedrig setzen.", "Für Spotify: Developer-App und passende OAuth-Konfiguration separat vorbereiten; Secrets nicht committen."],
    procedure: ["Teste zuerst einen lokalen Ton oder eine lokale Audiodatei ohne RFID.", "Erst wenn dies stabil funktioniert, teste einen Player-Befehl aus Python.", "Optional: Richte Spotify-Connect/Web-API-Steuerung nach aktueller Dokumentation ein.", "Teste Track/Album-Aktion direkt – noch ohne RFID."],
    predict: "Wenn Spotify nicht reagiert, aber eine lokale Datei hörbar ist: Welche Subsysteme kannst du damit bereits als funktionierend abhaken?",
    observe: ["Audiofehler und Netzwerk-/API-Fehler sind verschiedene Fehlerklassen.", "Ein aktives Wiedergabegerät und gültige Autorisierung sind separate Voraussetzungen.", "Die RFID-Seite des Projekts muss für diesen Test nicht angeschlossen sein."],
    reflect: ["Warum ist lokale Audioausgabe die bessere erste Baseline?", "Welche Spotify-spezifischen Teile sollten in einer Adapter-Schicht gekapselt werden?"],
    troubleshooting: ["Kein lokaler Ton: Audioausgabe, Kabel, Eingang und Lautstärke prüfen.", "API-Fehler: HTTP-Status, OAuth-Scopes und aktives Gerät protokollieren.", "Niemals Client Secret im öffentlichen Code ablegen."],
    check: ["Audio funktioniert unabhängig vom RFID-Reader.", "Ich kann lokalen Audiopfad und Netzwerksteuerung unterscheiden.", "Secrets sind nicht im Repository gespeichert."],
    sources: [spotifyPlayback, originalBuild],
  },
  "integration": {
    question: "Wann ist der Aufbau nicht mehr nur eine Sammlung von Teilversuchen, sondern ein robustes Embedded-System?",
    explanation: "Jetzt werden die getesteten Schichten in genau derselben Reihenfolge verbunden, in der wir sie gelernt haben. Ein Scan erzeugt ein Event, die UID wird normalisiert, das Mapping liefert eine Medienaktion, der Player führt sie aus. Anschließend testen wir Kaltstart, unbekannte Karten, wiederholte Scans und Fehlerzustände. Das Ziel ist nicht 'es lief einmal', sondern reproduzierbares Verhalten.",
    theory: [
      "Ein Zustandsmodell macht READY, CARD_DETECTED, RESOLVED, PLAYING und ERROR sichtbar.",
      "Subsysteme werden über kleine, definierte Schnittstellen gekoppelt.",
      "Autostart ist Teil des Produktverhaltens und sollte als Systemdienst sauber definiert werden.",
      "Logs verbinden Hardwareereignis, UID, Mapping und Player-Reaktion zeitlich.",
      "Ein Gehäuse verändert Antennengeometrie, Kabelführung und thermische Bedingungen – Mechanik ist Teil des Systems."],
    preparation: ["Alle Einzelschritte separat erfolgreich abschließen.", "Pinout, UID-Tabelle, Player-Test und Konfigurationsdatei bereithalten.", "Vor dem Gehäusebau den offenen Aufbau mehrfach testen."],
    procedure: ["Verbinde Reader-Event mit der Mapping-Funktion.", "Verbinde das Mapping mit dem Player-Adapter.", "Führe zehn bekannte, fünf unbekannte und mehrere schnelle Wiederholungsscans durch.", "Fahre den Pi vollständig herunter, starte kalt und wiederhole den Test.", "Richte erst danach einen Autostart-Dienst und die endgültige Kabelführung ein."],
    predict: "Welche Fehler sollten nach einem Kaltstart sichtbar im Log stehen, statt still verschluckt zu werden?",
    observe: ["Integration erzeugt neue Fehler an Schnittstellen, obwohl Subsysteme einzeln funktionieren.", "Mechanische Position des RC522 beeinflusst RFID-Reichweite.", "Ein definiertes Fehlerverhalten macht das Gerät vertrauenswürdiger als ein endloses `except: pass`."],
    reflect: ["Welche Mess- oder Logstelle hat dir beim Debugging am meisten geholfen?", "Welches Concept aus dem Projekt würdest du in einem zweiten Projekt wiederverwenden?", "Was müsste sich ändern, wenn der Raspberry Pi später durch einen ESP32/Pico ersetzt wird?"],
    troubleshooting: ["UID korrekt, keine Musik: Mapping und Player isoliert testen.", "Keine UID nach Gehäuseeinbau: Readerposition, Material und Versorgung prüfen.", "Autostart scheitert: Arbeitsverzeichnis, Umgebungsvariablen und Dienst-Logs kontrollieren."],
    check: ["Das Gerät funktioniert nach mehreren Kaltstarts.", "Bekannte und unbekannte Karten haben definiertes Verhalten.", "Ich kann einen Fehler einer Systemschicht zuordnen.", "Pinout, Softwarekonfiguration und Grenzen sind dokumentiert."],
    sources: [raspberryDocs, mfrcDatasheet, spotifyPlayback, originalBuild],
  },
};

export const conceptById = (id: string) => concepts.find((item) => item.id === id);
export const componentById = (id: string) => components.find((item) => item.id === id);
export const stepById = (id: string) => rfidSteps.find((item) => item.id === id);
