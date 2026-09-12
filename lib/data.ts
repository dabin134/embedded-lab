export type Concept = {
  id: string;
  title: string;
  eyebrow: string;
  summary: string;
  level: "Basis" | "Aufbau" | "Vertiefung";
  accent: string;
  usedIn: string[];
};

export type Component = {
  id: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  concepts: string[];
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
};

export const concepts: Concept[] = [
  { id: "electricity", title: "Spannung, Strom & Widerstand", eyebrow: "Elektrische Grundlagen", summary: "Verstehe Potenzialdifferenz, Ladungsfluss und warum Widerstände den Strom begrenzen.", level: "Basis", accent: "01", usedIn: ["rfid-music-player"] },
  { id: "gpio", title: "GPIO", eyebrow: "Mikrocontroller", summary: "Pins gezielt als digitale Ein- und Ausgänge konfigurieren, lesen und schalten.", level: "Basis", accent: "02", usedIn: ["rfid-music-player"] },
  { id: "spi", title: "SPI", eyebrow: "Digitale Kommunikation", summary: "Clock, MOSI, MISO und Chip Select als synchrones Bussystem verstehen und Signale lesen.", level: "Aufbau", accent: "03", usedIn: ["rfid-music-player"] },
  { id: "registers", title: "Register", eyebrow: "Hardware ↔ Software", summary: "Wie Bits in Registern das Verhalten eines ICs konfigurieren und Status sichtbar machen.", level: "Aufbau", accent: "04", usedIn: ["rfid-music-player"] },
  { id: "rfid", title: "RFID & induktive Kopplung", eyebrow: "Funk & Felder", summary: "Wie ein 13,56-MHz-Feld passive Tags mit Energie versorgt und Daten transportiert.", level: "Vertiefung", accent: "05", usedIn: ["rfid-music-player"] },
  { id: "uid", title: "UID & Identität", eyebrow: "Datenmodell", summary: "Gelesene Karten-IDs als robuste Schlüssel für Aktionen und Medienzuordnungen verwenden.", level: "Aufbau", accent: "06", usedIn: ["rfid-music-player"] },
  { id: "audio", title: "Digitales Audio", eyebrow: "Signalverarbeitung", summary: "Von Audiodaten über I²S und Verstärker bis zur hörbaren Schallwelle.", level: "Aufbau", accent: "07", usedIn: ["rfid-music-player"] },
  { id: "integration", title: "Systemintegration", eyebrow: "Engineering", summary: "Einzelsysteme verbinden, Schnittstellen testen und Fehler methodisch eingrenzen.", level: "Vertiefung", accent: "08", usedIn: ["rfid-music-player"] },
];

export const components: Component[] = [
  { id: "esp32", title: "ESP32", category: "Mikrocontroller", summary: "Das steuernde Gehirn: liest RFID-Daten, entscheidet und kontrolliert die Audioausgabe.", role: "Controller", concepts: ["gpio", "spi", "audio", "integration"] },
  { id: "led", title: "LED + Vorwiderstand", category: "Aktuator", summary: "Unser kleinstes sichtbares Experiment für Stromkreis, Polarität und GPIO.", role: "Feedback", concepts: ["electricity", "gpio"] },
  { id: "mfrc522", title: "MFRC522", category: "RFID Reader IC", summary: "Erzeugt das HF-Feld, spricht mit RFID-Tags und stellt Daten über SPI bereit.", role: "Sensor / Interface", concepts: ["spi", "registers", "rfid", "uid"] },
  { id: "rfid-tag", title: "MIFARE / RFID Tag", category: "Passiver Transponder", summary: "Bezieht Energie aus dem Reader-Feld und antwortet mit seiner Identität und Daten.", role: "Identität", concepts: ["rfid", "uid"] },
  { id: "audio-module", title: "I²S Audioverstärker", category: "Audio", summary: "Wandelt digitale Audiodaten in ein verstärktes Analogsignal für den Lautsprecher.", role: "Ausgabe", concepts: ["audio", "integration"] },
  { id: "speaker", title: "Lautsprecher", category: "Aktuator", summary: "Wandelt die elektrische Audioschwingung in mechanische Schwingung und Schall.", role: "Ausgabe", concepts: ["audio"] },
];

export const rfidSteps: ProjectStep[] = [
  { id: "system-verstehen", number: 1, title: "System verstehen", phase: "Orientieren", summary: "Zerlege die Jukebox in Eingabe, Verarbeitung und Ausgabe und zeichne den Datenfluss.", concepts: ["integration"], components: ["esp32", "mfrc522", "audio-module", "speaker"], duration: "20 min", outcome: "Du kannst erklären, wie ein Scan zu Musik wird." },
  { id: "led-grundlagen", number: 2, title: "Elektrische Grundlagen & LED", phase: "Fundament", summary: "Baue einen sicheren LED-Stromkreis und leite Spannung, Strom und Widerstand praktisch her.", concepts: ["electricity"], components: ["esp32", "led"], duration: "35 min", outcome: "Eine LED leuchtet kontrolliert und du weißt warum." },
  { id: "gpio", number: 3, title: "GPIO kontrollieren", phase: "Steuern", summary: "Übernimm die LED per Software und verstehe, wie Code einen realen Pinzustand verändert.", concepts: ["gpio"], components: ["esp32", "led"], duration: "30 min", outcome: "Du schaltest Hardware reproduzierbar aus Code." },
  { id: "mfrc522-anschliessen", number: 4, title: "MFRC522 anschließen", phase: "Verbinden", summary: "Verdrahte Versorgung und SPI-Leitungen, ohne Pin-Namen nur mechanisch abzuschreiben.", concepts: ["spi"], components: ["esp32", "mfrc522"], duration: "30 min", outcome: "Reader und Controller sind elektrisch sauber verbunden." },
  { id: "spi-register", number: 5, title: "SPI & Register", phase: "Kommunizieren", summary: "Verfolge ein SPI-Telegramm und lies ein Register, statt die Bibliothek als Black Box zu behandeln.", concepts: ["spi", "registers"], components: ["esp32", "mfrc522"], duration: "50 min", outcome: "Du kannst erklären, was auf den vier SPI-Leitungen passiert." },
  { id: "rfid-physik", number: 6, title: "RFID-Physik", phase: "Verstehen", summary: "Untersuche Feld, Energieübertragung und Antwort des passiven Tags.", concepts: ["rfid"], components: ["mfrc522", "rfid-tag"], duration: "40 min", outcome: "Du verstehst, warum ein passiver Tag ohne Batterie antwortet." },
  { id: "uid-lesen", number: 7, title: "UID lesen", phase: "Messen", summary: "Lies eine Karte zuverlässig ein, normalisiere die Bytes und beobachte Wiederholbarkeit.", concepts: ["uid", "spi"], components: ["esp32", "mfrc522", "rfid-tag"], duration: "35 min", outcome: "Eine eindeutige Karten-ID erscheint stabil im System." },
  { id: "uid-zuordnung", number: 8, title: "UID → Aktion", phase: "Modellieren", summary: "Trenne Identifikation von Aktion und baue eine erweiterbare Zuordnung von Karten zu Tracks.", concepts: ["uid", "integration"], components: ["esp32", "rfid-tag"], duration: "35 min", outcome: "Mehrere Tags lösen unterschiedliche Aktionen aus." },
  { id: "audio", number: 9, title: "Audio ausgeben", phase: "Ausgeben", summary: "Verfolge den Weg einer Audiodatei bis zum Lautsprecher und teste die Ausgabe isoliert.", concepts: ["audio"], components: ["esp32", "audio-module", "speaker"], duration: "50 min", outcome: "Der ESP32 spielt einen definierten Testton oder Track." },
  { id: "integration", number: 10, title: "Subsysteme integrieren", phase: "Integrieren", summary: "Verbinde RFID-Ereignis, Mapping und Audio zu einer robusten Zustandslogik.", concepts: ["integration", "uid", "audio"], components: ["esp32", "mfrc522", "audio-module", "speaker"], duration: "60 min", outcome: "Auflegen einer Karte startet den zugeordneten Track." },
  { id: "geraet", number: 11, title: "Gerät fertigstellen", phase: "Engineering", summary: "Strukturiere Verkabelung und Software, definiere Fehlerfälle und mache aus dem Aufbau ein Gerät.", concepts: ["integration"], components: ["esp32", "mfrc522", "audio-module", "speaker"], duration: "60+ min", outcome: "Eine dokumentierte, wiederholbar funktionierende RFID-Jukebox." },
];

export const stepLessons: Record<string, { question: string; explanation: string; experiment: string; check: string[] }> = {
  "system-verstehen": { question: "Welche Information wandert eigentlich durch das System?", explanation: "Nicht 'die Karte' löst Musik aus. Der Reader erzeugt zunächst ein Feld, gewinnt daraus digitale Identitätsdaten, der Controller interpretiert diese Daten und wählt eine Aktion. Erst danach entsteht ein Audio-Datenstrom. Diese Trennung in physikalisches Ereignis, Daten, Entscheidung und Ausgabe ist das mentale Modell für das gesamte Projekt.", experiment: "Zeichne vier Kästen: Tag → Reader → ESP32 → Audio. Beschrifte jeden Pfeil mit dem, was wirklich übertragen wird. Wenn du einen Pfeil nur mit 'Signal' beschriften kannst, ist dort noch eine Wissenslücke.", check: ["Ich kann Eingabe, Verarbeitung und Ausgabe unterscheiden.", "Ich kann den Datenfluss ohne Bibliotheksnamen erklären.", "Ich weiß, welche Subsysteme wir später einzeln testen."] },
  "led-grundlagen": { question: "Warum braucht selbst eine einfache LED bereits Engineering?", explanation: "Eine LED ist kein Verbraucher, den man beliebig direkt an eine Spannungsquelle hängt. Ihre nichtlineare Kennlinie macht einen strombegrenzenden Widerstand notwendig. Genau hier werden Spannung, Strom, Polarität und Verlustleistung zu beobachtbaren Größen statt abstrakten Formeln.", experiment: "Plane zuerst auf Papier: Versorgung → Widerstand → LED → GND. Schätze den Strom mit I = (UQuelle − ULED) / R und miss danach die Spannungen im realen Aufbau.", check: ["Anode und Kathode sind korrekt orientiert.", "Der Vorwiderstand begrenzt den Strom.", "Messwert und Überschlagsrechnung passen plausibel zusammen."] },
  "gpio": { question: "Wie wird eine Zeile Code zu einer elektrischen Spannung?", explanation: "Ein GPIO-Pin verbindet Software mit Transistorstrukturen im Mikrocontroller. Die Konfiguration bestimmt, ob der Pin treibt oder misst; der logische Zustand führt zu einem elektrischen Pegel. Damit wird aus einer Variable ein reales, messbares Ereignis.", experiment: "Lass die LED blinken und variiere gezielt nur eine Zeitkonstante. Miss anschließend HIGH und LOW am Pin. Beobachte damit Software im Zeit- und Spannungsbereich.", check: ["Pin-Modus und Pin-Zustand sind getrennte Konzepte.", "HIGH/LOW sind elektrische Pegel, keine abstrakten Wörter.", "Die LED reagiert reproduzierbar auf das Programm."] },
  "mfrc522-anschliessen": { question: "Warum reicht 'Kabel nach Tabelle stecken' nicht?", explanation: "Schnittstellen werden robust, wenn du die Funktion jeder Leitung verstehst: Versorgung schafft Betriebsbedingungen, GND ein gemeinsames Bezugspotenzial und die SPI-Leitungen verteilen Takt, Datenrichtung und Teilnehmerauswahl. Dann kannst du auch andere Boards korrekt verbinden.", experiment: "Ordne SCK, MOSI, MISO und SS zuerst nach Funktion, danach erst physischen Pins zu. Prüfe Versorgungsspannung und gemeinsame Masse, bevor der Reader gesteckt wird.", check: ["Die Versorgung passt zum Modul.", "Jede SPI-Leitung hat eine erklärte Funktion.", "Pinbelegung wurde aus Funktionen abgeleitet."] },
  "spi-register": { question: "Was macht eine Bibliothek beim Registerlesen wirklich?", explanation: "SPI ist ein synchroner serieller Dialog. Der Master erzeugt den Clock, wählt einen Slave und verschiebt Bits gleichzeitig hinaus und hinein. Beim MFRC522 kodiert ein Teil der übertragenen Bits zusätzlich, welches Register adressiert und ob gelesen oder geschrieben wird.", experiment: "Nutze den Signal-Explorer im Lab. Markiere an einem fiktiven Transfer: Auswahl des Slaves, Registeradresse, Taktflanken und Antwortbyte. Erkläre danach den Transfer ohne den Begriff 'Funktion aufrufen'.", check: ["MOSI und MISO haben klare Richtungen.", "SCK gibt den zeitlichen Rahmen vor.", "Ich kann Registeradresse und Datenbyte unterscheiden."] },
  "rfid-physik": { question: "Wie kann eine Karte ohne Batterie senden?", explanation: "Der Reader erzeugt ein hochfrequentes magnetisches Nahfeld. Die Antenne des Tags koppelt induktiv ein, gewinnt daraus Energie und betreibt den Chip. Seine Antwort entsteht durch kontrollierte Laständerung, die der Reader im Feld detektieren kann.", experiment: "Teste die maximale Lesedistanz und verschiedene Winkel. Formuliere vor jedem Versuch eine Hypothese, wie sich die magnetische Kopplung verändert.", check: ["Ich kann Energie- und Datenübertragung trennen.", "Ich kann die Rolle beider Antennenspulen erklären.", "Abstand und Orientierung beeinflussen die Kopplung plausibel."] },
  "uid-lesen": { question: "Wann ist eine gelesene UID wirklich ein brauchbarer Schlüssel?", explanation: "Die UID kommt als Folge von Bytes. Für Vergleiche braucht das Programm eine konsistente Repräsentation: gleiche Byte-Reihenfolge, gleiche Länge und ein festes Format. Erst dann wird aus Messdaten eine stabile Identität im Anwendungsmodell.", experiment: "Lies denselben Tag zehnmal und protokolliere die Bytes. Danach lies einen zweiten Tag. Vergleiche Wiederholbarkeit und Unterschiede, bevor du eine Zuordnungslogik baust.", check: ["Die UID wird bytegenau erfasst.", "Darstellung und eigentliche Daten werden nicht verwechselt.", "Mehrere Tags lassen sich eindeutig unterscheiden."] },
  "uid-zuordnung": { question: "Warum sollte die UID nicht direkt tief im Audio-Code geprüft werden?", explanation: "Identifikation und Aktion sind verschiedene Verantwortlichkeiten. Eine Mapping-Schicht macht aus einer UID eine semantische Auswahl, etwa trackId. Dadurch kann die Audioausgabe unabhängig bleiben und das System später wachsen.", experiment: "Definiere mindestens drei UID→Track-Zuordnungen in einer Datenstruktur. Füge eine unbekannte Karte hinzu und lege bewusst fest, was der Fehlerfall bedeutet.", check: ["Mapping und Hardwarezugriff sind getrennt.", "Unbekannte IDs haben definiertes Verhalten.", "Neue Karten erfordern keine Änderung der Audio-Logik."] },
  "audio": { question: "Welche Repräsentationen durchläuft Musik bis zum Lautsprecher?", explanation: "Eine Audiodatei enthält digital codierte Samples. Der Controller liefert daraus einen zeitlich geordneten Datenstrom; ein Audiointerface und Wandler beziehungsweise Verstärker erzeugen daraus ein analoges Leistungssignal. Der Lautsprecher setzt dieses schließlich mechanisch in Luftdruckschwankungen um.", experiment: "Teste die Audiokette ohne RFID. Spiele zuerst einen definierten Ton oder Track. Erst wenn die Ausgabe isoliert stabil ist, darf sie in die Gesamtlogik.", check: ["Datei, Sample-Strom und Analogsignal sind unterschieden.", "Die Audio-Hardware funktioniert unabhängig vom Reader.", "Lautstärke und Versorgung sind kontrolliert."] },
  "integration": { question: "Wie verhindert man, dass ein funktionierendes Einzelteil im Gesamtsystem unzuverlässig wird?", explanation: "Integration braucht explizite Zustände und Schnittstellen. Ein Scan ist ein Ereignis, das validiert, gemappt und an den Audioteil weitergereicht wird. Debouncing, Wiederholung, unbekannte Karten und laufende Wiedergabe sind Systemfälle, keine Details einzelner Treiber.", experiment: "Schreibe vor dem Code eine kleine Zustandsmaschine: READY → CARD_DETECTED → RESOLVED → PLAYING. Definiere auch, was bei unbekannter Karte und erneuter Karte passiert.", check: ["Subsysteme sind einzeln getestet.", "Übergänge und Fehlerfälle sind explizit.", "Ein Fehler lässt sich einer Schicht zuordnen."] },
  "geraet": { question: "Wann wird ein Prototyp zu einem Gerät?", explanation: "Ein Gerät funktioniert nicht nur einmal auf dem Tisch. Es besitzt nachvollziehbare Verkabelung, definierte Versorgung, reproduzierbare Software, einen Startzustand und dokumentierte Grenzen. Engineering bedeutet hier vor allem, Unsicherheit systematisch zu entfernen.", experiment: "Starte das System fünfmal kalt neu, teste bekannte und unbekannte Karten und dokumentiere jeden Fehler. Behebe nicht Symptome, sondern ordne die Ursache einem Subsystem zu.", check: ["Kaltstarts funktionieren reproduzierbar.", "Verkabelung und Pinbelegung sind dokumentiert.", "Bekannte Fehlerfälle haben definiertes Verhalten."] }
};

export const conceptById = (id: string) => concepts.find((item) => item.id === id);
export const componentById = (id: string) => components.find((item) => item.id === id);
export const stepById = (id: string) => rfidSteps.find((item) => item.id === id);
