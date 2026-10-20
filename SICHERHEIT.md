# App-Schutz in Version 4.2

Version 4.2 ergänzt die Budgetmeldungen und reduziert die normale Fußzeile auf „Credits an 🐭“. Der App-Schutz und seine Speicher- und Verschlüsselungswege entsprechen Version 4.0. Die fixierte Navigation und die dunklere Monatsbudget-Schaltfläche aus Version 4.1 bleiben erhalten.

Der Schutz ist freiwillig und gilt für den lokalen Plan dieses Browsers. Er benötigt keinen eigenen Server und kein Benutzerkonto. Die PIN besteht immer aus **genau sechs Ziffern**, einschließlich möglicher führender Nullen. Die Schutzfunktion startet ausgeschaltet, damit ein Update niemanden aus einem bestehenden Plan aussperrt.

## Übernahme aus Version 3.5

Version 4.0 übernimmt die vorhandene Schutzimplementierung. Der neue sichtbare Name Finanzplaner ändert weder die technischen Speicherschlüssel noch das Tresor- und Sicherungsformat. Die neue Oberfläche wird wie die bisherigen Budgetskripte erst nach erfolgreicher Freigabe geladen. Die getrennten ETF- und Vorsorge-Laufzeiten sind normale Planungsfelder und verwenden denselben verschlüsselten Speicher- und Sicherungsweg.

Domain und Website-Pfad müssen für die direkte Übernahme des bisherigen Browser-Speichers gleich bleiben. Manifest-ID und Service-Worker-Bereich bleiben erhalten. Ein Umzug auf eine andere Domain erfordert Export/Import und eine neue Passkey-Verknüpfung.

## Speicherung

Beim Aktivieren erzeugt Web Crypto einen zufälligen 256-Bit-Datenschlüssel. Die Finanzplanung wird mit AES-256-GCM verschlüsselt und bekommt bei jeder Speicherung eine neue zufällige 96-Bit-IV. Getrennte, mit AES-GCM geschützte Schlüsselhüllen erlauben die Entsperrung mit PIN und Wiederherstellungscode. PIN-Schlüssel werden über PBKDF2-SHA-256 mit zufälligem 128-Bit-Salt und 600.000 Iterationen abgeleitet.

Der Wiederherstellungscode enthält 256 zufällige Bits, als acht Gruppen mit je acht Hexadezimalzeichen. Seine Schlüsselhülle verwendet eine eigene Ableitung. PIN und Wiederherstellungscode stehen nicht im gespeicherten Tresor. Der Code wird bei der Einrichtung einmal gezeigt; Aktivierung erfordert die Bestätigung, ihn gesichert zu haben. Er bleibt nach einem PIN-Wechsel gültig.

Der verschlüsselte Tresor wird zuerst gespeichert. Erst danach entfernt die App den bisherigen lokalen Klartextplan und ihre alten internen Migrationssicherungen. Bei fehlgeschlagenem Schreiben wird diese Löschung nicht ausgeführt. Bereits heruntergeladene unverschlüsselte Exporte kann die App nicht nachträglich schützen oder löschen. Der Browser bzw. das Dateisystem kann frühere Speicherinhalte außerhalb der Kontrolle der Web-App aufbewahren; dies ist keine garantierte sichere Dateilöschung.

Wenn ein Tresor vorhanden ist, werden Budgetskripte und Finanzdaten erst nach der Entschlüsselung geladen. Bei beschädigtem Tresor gibt es keinen automatischen Rückfall auf Klartext oder Beispieldaten. Beim Sperren werden die sichtbare Planung, offene Formulare, die aktuelle Zustandsreferenz und die gehaltenen Schlüsselbytes entfernt. JavaScript und Browser garantieren keine vollständige Löschung aller zuvor im Arbeitsspeicher gehaltenen Kopien.

Alle Speicherwege, einschließlich automatischer Monatsbeiträge und bestätigter Importe, verwenden denselben Tresor. Ausstehende Speicherung wird vor einem App-Update abgewartet. Die normale Fußzeile „Credits an 🐭“ erscheint erst nach abgeschlossener Speicherung des aktuellen Stands; während einer noch nicht bestätigten Speicherung bleibt dort die entsprechende Meldung sichtbar. Quotenfehler werden sichtbar. Eine Revisionsprüfung verhindert das stille Überschreiben eines inzwischen in einem anderen Fenster geänderten Tresors; in diesem Fall neu laden. Es ist keine Mehrbenutzer-Synchronisierung.

## Design vor dem Entsperren

Ab Version 3.4 steht zusätzlich nur die Darstellungseinstellung (`light`, `dark` oder `system`) unverschlüsselt im separaten Schlüssel `vermoegensaufbau-theme-v1`. Sie enthält keine Finanzdaten oder Zugangsdaten. Das frühe Skript theme.js liest diese Auswahl und passt den Sperrbildschirm einschließlich der Browser-Metafarbe an. Es liest und entschlüsselt dafür keinen Finanzplan.

Bei der Übernahme eines 3.3-Tresors liegt die alte Designwahl noch ausschließlich im verschlüsselten Plan. Daher wird sie erst nach dem ersten erfolgreichen Entsperren zusätzlich gespeichert. Bis dahin folgt der Sperrbildschirm dem Systemdesign. PIN, Wiederherstellungscode, Passkeys und Verschlüsselungsformat ändern sich durch dieses Update nicht.

## Face ID / Passkey

Ab Version 3.5 startet bei einem verknüpften Passkey automatisch ein Entsperrversuch beim Öffnen sowie bei der Rückkehr aus dem Hintergrund. Ein Systemdialog kann weiterhin eine Bestätigung erfordern; die konkrete Darstellung bestimmt iOS. Ohne verknüpften Passkey erscheint direkt die PIN-Eingabe. Der automatische Versuch fordert dieselbe Benutzerverifikation und PRF-Entschlüsselung wie der manuelle Weg an und umgeht keinen Schutz.

Bei Abbruch, Fehler oder Zeitüberschreitung wird zur PIN gewechselt. „Stattdessen PIN verwenden“ bricht den automatischen Versuch ab. Überholte Antworten werden nicht mehr akzeptiert. Ein weiterer automatischer Versuch erfolgt erst bei einem erneuten Öffnen bzw. einer neuen Rückkehr in die App. Manuelles Wiederholen ist weiterhin möglich. „Jetzt sperren“ löst keine sofortige automatische Entsperrung aus. Ein zusätzlicher Zeitgeber bricht den automatischen Versuch nach 20 Sekunden ab, sofern er noch läuft.


Die optionale Verknüpfung setzt einen Plattform-Passkey mit WebAuthn-PRF-Unterstützung voraus. Ein zweiter bewusster Bestätigungsschritt prüft die Verwendbarkeit. Der PRF-Wert wird mit HKDF-SHA-256 in einen Schlüssel für eine weitere AES-GCM-Schlüsselhülle überführt. Der Passkey dient tatsächlich zur Entschlüsselung; eine erfolgreiche optische Face-ID-Abfrage ohne PRF-Ausgabe wird nicht als Entsperrung akzeptiert.

Die App fordert Benutzerverifikation an und prüft bei der Entsperrung unter anderem Credential-ID, Challenge, Origin und das Benutzerverifikations-Bit. Dies ist ein lokaler Verschlüsselungstresor und kein serverseitiges Anmeldesystem. iOS und der Passwortmanager steuern die verfügbare Bestätigungsmethode und können einen Gerätecode statt Biometrie anbieten. Die sechsstellige PIN bleibt unabhängig davon nutzbar. Passkey-Synchronisierung synchronisiert keine Finanzplanung.

Ein vorhandener Passkey kann nicht automatisch auf eine andere Website-Domain übertragen werden. Beim Umzug auf eine andere Adresse die Planung exportieren/importieren und die Verknüpfung neu einrichten. Entfernen der Verknüpfung in der App löscht den Eintrag nicht aus dem Passwortmanager.

## Sperren und Wiederherstellen

Der gesperrte Start verbirgt die Planung bereits im HTML. Beim Wechsel in den Hintergrund und bei `pagehide` sperrt die App. Unterbrochene Passkey-Systemdialoge werden gesondert behandelt. Die Wiederherstellung aus dem Browser-Seitencache öffnet die Planung nicht automatisch wieder. Es gibt keine Zusage für alle vom Betriebssystem erzeugten Vorschau- oder Bildschirmaufnahmen.

Noch nicht bestätigte Formulare werden beim Sperren geschlossen. Änderungen vor dem App-Wechsel speichern und warten, bis keine Speicherwarnung mehr angezeigt wird. Browser können Hintergrundarbeit unterbrechen; die letzten ungespeicherten Eingaben sind dadurch nicht garantiert erhalten. Bei einem Schreibfehler bleibt der zuletzt erfolgreich gespeicherte Tresor erhalten. Manuelles Sperren wird in diesem Fall bis zur Sicherung bzw. erfolgreichen Speicherung abgewiesen.

Nach fünf fehlgeschlagenen PIN-Versuchen gibt es im aktuellen App-Prozess eine Wartezeit von 30 Sekunden. Das ist eine Bedienungshürde, kein Schutz gegen Offline-Angriffe oder manipulierten JavaScript-Code. Der Wiederherstellungscode erlaubt direkt das Setzen einer neuen sechsstelligen PIN. Ohne PIN, funktionierenden Passkey oder Wiederherstellungscode gibt es keine Hintertür. Regelmäßige externe Sicherungen bleiben notwendig.

## Exporte und Importe

Verschlüsselte Sicherungen benötigen ein **eigenes Passwort mit mindestens zwölf Zeichen** und verwenden PBKDF2-SHA-256 (600.000 Iterationen) und AES-256-GCM mit neuem Salt und neuer IV. Das Passwort ist unabhängig von der App-PIN. Ein langes, zufälliges Passwort oder eine lange Passphrase wählen. Bei Verlust dieses Passworts hilft die App-PIN nicht.

Alte Klartext-JSON-Dateien bleiben importierbar. Ein Export enthält Finanzplan und Planungseinstellungen, aber nicht die lokale PIN, Wiederherstellungsdaten oder Passkey-Verknüpfung. Der Import ersetzt die Planung erst nach Bestätigung und behält den Schutz des Zielbrowsers bei. Auf einem neuen Gerät den Schutz erneut einrichten. Unverschlüsselter Export bleibt nach ausdrücklicher Auswahl möglich und enthält die Finanzdaten lesbar.

## Grenzen

Eine sechsstellige PIN besitzt nur eine Million Kombinationen. Die aufwendige Schlüsselableitung verlangsamt das Ausprobieren, macht die PIN aber nicht zu einem starken Passwort. Wer den verschlüsselten Browserinhalt kopieren kann, kann PINs außerhalb der App ausprobieren. Gerätesperre und aktuelle Software bleiben wichtig.

Die Funktion schützt lokal gespeicherte Daten und den normalen Zugriff auf die App. Sie schützt nicht vor einem kompromittierten Gerät, bösartigen Erweiterungen, manipuliertem Website-Code oder Schadcode, der während einer entsperrten Sitzung ausgeführt wird. Wer Zugriff auf das GitHub-Repository und die Website-Veröffentlichung hat, kontrolliert auch künftig geladenen Code. Deshalb das GitHub-Konto gut absichern. Andere Projekte derselben Website-Origin teilen grundsätzlich die Browser-Sicherheitsgrenze.

Es wurde kein unabhängiges Sicherheitsaudit durchgeführt. Die Verwendung standardisierter Browser-Kryptografie ist keine Zertifizierung oder Garantie eines bestimmten Sicherheitsniveaus.

## Plattformprüfung für Version 4.0

Automatisiert mit Node und simulierten Browser-/Service-Worker-Schnittstellen geprüft:

- Der Schutzcode unterscheidet sich von 3.5 ausschließlich in sichtbaren Namen, Exportdateinamen und dem zusätzlichen Laden von pocket-ui.js. vault-crypto.js und offline.js sind unverändert.
- Manifest-ID, Startadresse, Geltungsbereich und ursprüngliche Logo-Dateien bleiben gleich.
- Helle und dunkle Metafarben, Systemwechsel und Änderungen der gespeicherten Designwahl werden übernommen.
- Der Service Worker installiert alle 15 App-Ressourcen gemeinsam, entfernt beim Aktivieren nur ältere eigene Caches und lädt neue UI-Dateien aus dem Cache.
- „Offline bereit“ wird nur bei vollständigem Cache bestätigt; fehlt pocket-ui.js, meldet die Prüfung den Cache als unvollständig.

## Dokumentierter Prüfumfang der Basisversion 3.5

Die mitgelieferte Dokumentation der Basisversion 3.5 hält folgende automatisierte Prüfungen mit echtem Node-Web-Crypto und simuliertem Browser-/WebAuthn-Verhalten fest:

- Automatischer Passkey-Start, einmaliger Versuch, PIN-Rückfall nach Abbruch, direkter Wechsel zur PIN, manuelles Wiederholen, bewusste Sperre und Verwerfen verspäteter Antworten.
- Gesperrter Kaltstart im gespeicherten dunklen oder hellen Design, Systemwechsel und Übernahme der alten Designwahl nach erstem Entsperren.
- Sechsstellige PIN mit führender Null, Ablehnung anderer Längen und abweichender Wiederholung.
- Aktivierung mit bestehendem Plan erst nach Bestätigung des Wiederherstellungscodes.
- Entfernen alter lokaler Klartextkopien, verschlüsselte Folgeänderungen und Monatsbeiträge.
- Gesperrter Kaltstart ohne Laden der Budgetskripte, falsche PIN und Hintergrundsperre.
- Wiederherstellung, PIN-Wechsel und bewusstes Abschalten mit PIN-Prüfung.
- Passkey mit PRF, fehlende PRF-Unterstützung und tatsächliche Datenentschlüsselung.
- Verschlüsselte Sicherungen, falsches Passwort, vollständiger Import mit Bestätigung und alte JSON-Dateien.
- Manipulierte Daten, frische IVs, Speicherfehler und konkurrierende Fenster.
- Bisherige Budgetberechnungen, Diagramme, Migrationen und Offline-Cache mit dreizehn Ressourcen.

**Nicht direkt geprüft:** echtes Safari auf einem iPhone, Face-ID-Systemdialog und tatsächliche Offline-Verfügbarkeit des individuellen Passwortmanagers. Keine Browser-Engine war in der Prüfungsumgebung verfügbar. Nach dem Update mit gesicherter Planung PIN, Face ID und PIN im Flugmodus auf dem eigenen iPhone testen. Die PIN bleibt die vorgesehene Offline-Alternative.

## Technische Quellen

- [MDN: Web Crypto und Schlüsselableitung](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey)
- [MDN: WebAuthn-Erweiterungen einschließlich PRF](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API/WebAuthn_extensions)
- [WebKit: PRF-Unterstützung ab Safari 18](https://webkit.org/blog/15865/webkit-features-in-safari-18-0/)
- [W3C: WebAuthn PRF-Entwurf und Anwendungsfälle](https://github.com/w3c/webauthn/blob/main/explainers/prf-extension.md)

- [Apple: Wegfall der WebAuthn-Klickvoraussetzung ab iOS 17.4](https://developer.apple.com/forums/thread/747036)
