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
