# Finanzplaner – Version 4.2

**Einkommen planen, Budgets verstehen und Vermögen aufbauen.**

Kostenlose Web-App ohne Bankanbindung, Kontobuchungen oder automatische Überweisungen. Deine Eingaben bleiben im jeweiligen Browser.

**[App öffnen →](https://aaronskii.github.io/vermoegensaufbau/)**

## Neu in Version 4.2

- Die Übersicht zeigt den Betrag und die Richtung des automatischen Ausgleichs direkt bei den betroffenen Budgets. Wenn Essentials Mittel aus Wealth benötigt, erscheint eine Warnung.
- Ein höheres Wealth-Budget erhält nur dann eine positive Meldung, wenn der gesamte Betrag durch noch unverplante Essentials-Mittel gedeckt ist. Sonst zeigt die Übersicht den fehlenden Betrag.
- Die normale Fußzeile zeigt **Credits an 🐭**. Die bisherigen Speicher- und Bankverbindungs-Hinweistexte entfallen. Ausstehende bzw. fehlgeschlagene Speicherung bleibt weiterhin sichtbar.

## Seit Version 4.1

- Das Menüband mit **Heute**, **Mein Plan**, **Konten**, **Polster** und **Zukunft** bleibt mit derselben Gestaltung am unteren Bildschirmrand erreichbar. Der Seiteninhalt erhält den nötigen Abstand zur Navigation, einschließlich des geschützten unteren Bereichs auf dem iPhone.
- Der **Bearbeiten**-Knopf beim Monatsbudget hat im Dunkelmodus einen dunkleren, zur Oberfläche passenden Hintergrund. Der Hellmodus bleibt unverändert.

## Pocket-Design seit Version 4.0

- Neues **Pocket-Design in Lavendel** mit heller und dunkler Darstellung, gut lesbaren Überschriften und einheitlichen Liniensymbolen. Das ursprüngliche Logo bleibt erhalten.
- Fünf Bereiche: **Heute**, **Mein Plan**, **Konten**, **Polster** und **Zukunft**. Unter „Mein Plan“ trennen **Alltag**, **ETF & Anlagen** und **Altersvorsorge** die Eingaben.
- Unter **Zukunft** besitzen ETF-Depot und Altersvorsorgedepot jeweils einen eigenen Laufzeitregler von **1 bis 50 Jahren**. Beide verwenden denselben Hintergrund und werden unabhängig gespeichert.
- Die gemeinsame Prognose erscheint nur bei gleicher Laufzeit. Bei unterschiedlichen Laufzeiten lassen sich beide bewusst auf die längere der beiden Laufzeiten setzen. Endwerte verschiedener Zeitpunkte werden nicht addiert.
- Sicherungsexport und -import sind im **•••-Menü** erreichbar. App-Schutz, automatische Fortschreibung, Konten und alle bisherigen Eingaben bleiben verfügbar.
- Beim Update am bisherigen Website-Ort bleiben lokale Pläne, PIN, Passkey-Verknüpfung und Designwahl erhalten. Beide neuen Laufzeiten übernehmen zunächst die bisherige gemeinsame Laufzeit. Speicher- und Verschlüsselungsformate werden weiterverwendet.

Frühere Versionsänderungen stehen in [CHANGELOG.md](CHANGELOG.md).

## Schnellstart

1. Beim ersten Besuch erscheinen gekennzeichnete Beispieldaten.
2. Mit **„Mit eigenen Daten starten“** einen leeren Plan anlegen.
3. Unter **Mein Plan → Alltag** Einnahmen und Ausgaben eintragen; unter **ETF & Anlagen** sowie **Altersvorsorge** die Sparraten ergänzen.
4. Unter **Konten** Budgetkonten und gegebenenfalls einzelne abweichende Konten wählen.
5. Unter **Polster** Notgroschenstand und Sicherheitsstufe einstellen.
6. ETF- und Vorsorgewerte sowie gegebenenfalls die Förderbedingungen ergänzen.
7. Automatische Fortschreibung nur bewusst aktivieren; regelmäßig exportieren.

## Darstellung

Das Designsymbol oben rechts wechselt zwischen **Hell** und **Dunkel**. Die Auswahl bleibt gespeichert und gilt auch für den Sperrbildschirm. Neue Pläne folgen zunächst dem Gerätedesign; eine bereits gespeicherte Einstellung „System“ bleibt beim Update erhalten und folgt weiter dem Gerät, bis du per Designsymbol eine feste Darstellung wählst.

## Einkommen, Budget und Diagramme

Alle monatlichen Netto-Einnahmen werden addiert.

| Budget | Anteil | Verwendung |
| --- | ---: | --- |
| Essentials | 50 % | Miete, Versicherungen, Lebensmittel, laufende Kosten |
| Safety | 15 % | Notgroschen |
| Lifestyle | 10 % | Freizeit, Spaßausgaben, passende Ratenkäufe |
| Wealth | 25 % | ETF-Sparplan, Altersvorsorge, VL, Gold usw. |

Überbuchte Essentials werden aus Wealth ausgeglichen, überbuchtes Wealth aus Essentials. Reicht beides nicht, bleibt die Unterdeckung sichtbar. Lifestyle-Überbuchungen werden markiert und nicht aus anderen Töpfen ausgeglichen.

**„Noch unverplant“ ganz oben zählt nur den Rest aus Essentials und Wealth.** Lifestyle und Safety sind dort separat reserviert.

Unter **Heute → So verteilt sich dein Einkommen** zeigt **Dein Ziel** die vorgesehene Aufteilung. **Deine aktuelle Planung** zeigt die tatsächliche Budgetaufteilung als Farbstreifen mit Prozentangaben: Essentials und Wealth nach ihren eingetragenen Monatsanteilen, Safety als vorgesehenen Sparbeitrag und Lifestyle mit dem gesamten reservierten Budget einschließlich des noch freien Betrags. Übersteigen die Lifestyle-Ausgaben das Budget, zählt der höhere tatsächliche Betrag. Der verbleibende Rest des Einkommens erhält den eigenen Anteil „Unverplant“. Ohne Überbuchung entspricht er dem freien Rest aus Essentials und Wealth; Lifestyle-Überbuchungen verringern diesen Rest zusätzlich.

Bei Überplanung gibt es keine negativen Diagrammanteile; die dargestellten Anteile beziehen sich dann auf den gesamten verplanten Betrag, die Unterdeckung wird angegeben. Die App kennt keine echten Kontostände.

## Zahlungsrhythmen und gemeinsame Kosten

| Auswahl | Einzutragender Betrag | Monatsanteil |
| --- | --- | --- |
| Monatlich | Eine Monatszahlung | Betrag |
| Vierteljährlich | Eine Quartalszahlung | Betrag ÷ 3 |
| Halbjährlich | Eine Halbjahreszahlung | Betrag ÷ 6 |
| Jährlich | Eine Jahreszahlung | Betrag ÷ 12 |

Beispiel: 600 € jährliche Versicherung ergeben 50 € Monatsanteil. Der Verteiler berücksichtigt diese Monatsrücklage, nicht eine fällige Jahresrechnung. Die auf Cent gerundeten Monatsanteile können geringfügig von der exakten Jahressumme abweichen.

**„Kosten durch zwei teilen“** berücksichtigt deinen hälftigen Anteil: 700 € gemeinsame Monatsmiete ergeben 350 €; 1.200 € jährliche gemeinsame Kosten ergeben 50 € pro Monat. Immer den gemeinsamen Gesamtbetrag eingeben, keinen schon halbierten Betrag.

Die große Zahl am Eintrag ist dein Monatsanteil. Konto, abweichender Rhythmus, Teilung und Ratendetails stehen strukturiert darunter. Symbole sind nach der deutschen Bezeichnung alphabetisch sortiert.

### Ratenkäufe

Essentials und Lifestyle unterstützen Monatsrate, Startmonat und Laufzeit. Der Startmonat zählt mit; die App berechnet den letzten Ratenmonat. Raten haben immer monatlichen Rhythmus.

Restbetrag und offene Raten stehen in den Details. **Der aktuelle Monat gilt als bezahlt.** Künftige Verträge sind vollständig offen; nach der letzten Rate stehen 0 € aus. Geteilte Kosten zeigen deinen persönlichen Rest. Inaktive Raten bleiben sichtbar und belasten das aktuelle Budget nicht.

## Einkommensverteiler und Konten

Das gesamte Einkommen wird zunächst auf dem **Girokonto** angenommen. Der Verteiler zeigt, was dort bleibt und was auf andere Konten gehört.

Standardkonten: Girokonto, Fixkostenkonto, Spaßkonto, Gemeinschaftskonto sowie Lebensmittel & Tanken. Eigene Konten mit Namen, Symbol und Farbe lassen sich unter **Konten → Konten verwalten** ergänzen und bearbeiten. Nur das Girokonto bleibt zwingend erhalten.

Beim Entfernen eines Kontos wählst du ein Ersatzkonto, das alle Budget-, Ausgaben- und Sparratenzuordnungen übernimmt. Die Beträge werden nicht gelöscht.

Einträge mit **„Budgetkonto“** folgen dem Standardkonto ihres Budgets; auch freie Budgetreste werden dort bereitgestellt. Einzelne Einträge sowie ETF- und Vorsorge-Sparrate können abweichen. Die Zahlen sind monatliche Einkommenszuweisungen. Vorhandene Guthaben und ausgeführte Überweisungen werden nicht verrechnet.

## Notgroschen

**Zielbetrag = gesamtes monatliches Netto × Sicherheitsstufe.**

| Stufe | Faktor |
| --- | ---: |
| Basis | 3 Monate |
| Komfort | 5 Monate |
| Maximum | 7 Monate |

Stand manuell pflegen oder optional fortschreiben lassen. Die Safety-Verteilung zwischen Wealth und Lifestyle ist jederzeit einstellbar. Im Zielmonat bleibt noch der volle Beitrag für den Notgroschen vorgesehen, danach greift die Umverteilung. Optional kann sie bereits vor vollem Notgroschen aktiviert werden.

Zusätzliches Wealth-Budget erhöht nicht automatisch die ETF- oder Vorsorge-Sparrate.

## ETF-Sparplan und Balancer

Aktuellen ETF-Depotwert, monatliche Sparrate, Konto und ETF-Zielgewichte hinterlegen. Zielgewichte müssen zusammen 100 % ergeben.

Unter **Mein Plan → ETF & Anlagen → Dein ETF-Sparplan → ETF-Balancer** die aktuellen Euro-Werte der ETFs eintragen. Ihre Summe muss dem Depotwert entsprechen. Bei leerem Depot bleiben die Werte leer oder stehen auf 0 €; die Sparrate wird nach den Zielgewichten verteilt.

Depotwert und Sparrate werden übernommen. Berechnet werden ausschließlich **neue Käufe für die nächste Sparrate**, keine Verkäufe. Ist das Ziel damit noch nicht erreichbar, wird es ohne Verkäufe bestmöglich angenähert und entsprechend gekennzeichnet. Auf Cent gerundete Vorschläge ergeben zusammen die Sparrate.

Die Empfehlung ändert keinen Broker-Sparplan oder deine Zielgewichte. Keine Berücksichtigung von Kursschwankungen, Gebühren oder Mindestordervolumen. Aktuelle ETF-Werte sind eine manuelle Momentaufnahme und müssen bei Veränderungen aktualisiert werden.

## Altersvorsorgedepot

Eigener Wealth-Baustein mit Depotwert, monatlichem Eigenbeitrag und Konto. Eigenbeiträge zählen einmal zum Wealth-Budget, Zulagen nicht als zusätzliches Gehalt.

Ein eindeutig benannter bisheriger Vorsorgedepot-Eintrag wird bei der Übernahme alter Pläne in den neuen Bereich verschoben. Bei mehreren möglichen Treffern bleiben die alten Einträge erhalten. **„Wealth-Eintrag übernehmen“** erlaubt die manuelle Zuordnung; der Monatsanteil wird zur Vorsorge-Sparrate addiert und aus weiteren Anlagen entfernt.

### Fördermodell ab 2027

Recherchestand: **18.10.2026**. Beiträge beginnen im Modell frühestens im eingestellten Startmonat ab 2027. **Unmittelbare Förderberechtigung** und einen zertifizierten Vertrag selbst prüfen und die entsprechende Option nur dann aktivieren. Mittelbare Berechtigung über Ehepartner und steuerliche Günstigerprüfung werden nicht berechnet.

- Mindestens **120 € Eigenbeitrag je Kalenderjahr** für Zulagen.
- Grundzulage: **50 % der ersten 360 €**, danach **25 % bis 1.800 € Eigenbeitrag**, höchstens **540 € jährlich**.
- Kinderzulage je berechtigtem, dir zugeordnetem Kind: Eigenbeitrag bis höchstens **300 € pro Jahr und Kind**. Volle Kinderzulage ab 300 € Eigenbeitrag.
- Einmalig **200 € Einsteigerbonus**, wenn zu Beginn des maßgeblichen Beitragsjahres das 25. Lebensjahr noch nicht vollendet ist. Optionales Geburtsdatum für die Altersprüfung eintragen. Bereits erhaltenen oder im Wert enthaltenen Bonus markieren.
- Höchstens **6.840 € Eigenbeitrag jährlich**, entsprechend 570 € bei konstanten Monatsraten.

Anzahl der Kinder und **letztes Förderjahr je Kind** festlegen. Kindergeldanspruch und Zuordnung werden nicht automatisch geprüft. Neue Kinder stehen zunächst nur für das laufende Jahr; das Ende auf deine passende Annahme ändern. Die Förderung wird nicht unbegrenzt bis zur Rente fortgeschrieben.

### Quellen

- [Bundesregierung: Reform der privaten Altersvorsorge](https://www.bundesregierung.de/breg-de/aktuelles/reform-private-altersvorsorge-2400072)
- [Altersvorsorgereformgesetz, BGBl. I 2026 Nr. 156](https://www.recht.bund.de/bgbl/1/2026/156/VO.html)
- [Beschlossener Gesetzestext, Bundesratsdrucksache 206/26](https://dserver.bundestag.de/brd/2026/0206-26.pdf), insbesondere neue §§ 84–86 EStG und § 1 AltZertG.

## Prognosen und Auszahlung

Unter **Zukunft** zeigt jedes Depot eine eigene Prognose mit einem unabhängig einstellbaren Laufzeitregler von **1 bis 50 Jahren**. Die Regler verändern nur die Modellrechnung, nicht den aktuellen Depotwert oder die Sparrate. Beide Einstellungen sind Teil des gespeicherten Plans und der Sicherungen.

Die gemeinsame Prognose addiert ETF und Altersvorsorge nur bei **gleicher Laufzeit**. Bei unterschiedlichen Laufzeiten erscheint stattdessen ein Hinweis mit der Möglichkeit, beide auf die längere Laufzeit zu setzen. VL und andere Anlagen sind ausgeschlossen. Ältere Pläne übernehmen beim ersten Laden ihre bisherige gemeinsame Laufzeit für beide Depots.

Szenarien: **5 %, 7 % und 10 % effektive Jahresrendite**, monatliche Verzinsung, konstante Eigenbeiträge am Monatsende. Aktuelle Depotwerte sind das Startkapital.

Vorsorgezulagen entstehen aus zukünftigen Modellbeiträgen eines Kalenderjahres und werden vereinfachend im Dezember gutgeschrieben. Tatsächliche Gutschriften können später erfolgen. Frühere Beiträge und mögliche nachträgliche Ansprüche daraus werden nicht rückwirkend berechnet. Zulagen stehen getrennt vom Wertzuwachs.

Ohne Steuern, zusätzliche Produktkosten und Inflation; keine garantierte Entwicklung.

### Brutto-Auszahlungsmodell

Der 7-%-Endwert des Vorsorgedepots wird gleichmäßig über die eingestellte Auszahlung verteilt, ohne weitere Rendite: Beginn zwischen 65 und 70, Ende zwischen 85 und 100. Von 65 bis 85 sind das 20 Jahre, von 67 bis 85 sind es 18.

Gesetzliche Auszahlungspläne enden frühestens mit 85 und können ihre Planraten neu festlegen. Für die Berechnung der Planrate sind mindestens 80 % des verbleibenden Kapitals geteilt durch die verbleibenden Monate vorgesehen. Die vereinfachte App-Rechnung verwendet den gesamten Betrag und keine spätere Auszahlungsrendite.

Der angenommene Beginn gilt für den gezeigten Endwert und wird **nicht** aus Geburtsdatum und Prognoselaufzeit abgeleitet. Keine Zusage einer lebenslangen Rente. Leistungen aus geförderten Beiträgen werden grundsätzlich nachgelagert besteuert; eine persönliche Netto-Auszahlung wird nicht berechnet.

## Automatische Fortschreibung

Bei ETF, Vorsorge und Notgroschen jeweils **„Automatisch fortschreiben → Einstellen“** öffnen. Die Funktion ist zunächst aus. Buchungstag (2. oder 16.) und ersten Monat bewusst wählen, damit bereits enthaltene Beiträge nicht erneut hinzukommen.

- ETF: gespeicherte Monatsrate zum Depotwert addieren.
- Vorsorge: Eigenbeitrag frühestens ab Startmonat addieren.
- Notgroschen: vorgesehenen Safety-Beitrag addieren; im Zielmonat vollständig, danach gegebenenfalls 0 €.
- Bereits verarbeitete Monate werden nicht doppelt gebucht, auch beim Wechsel zwischen dem 2. und 16.
- Bei geschlossener App keine garantierte Hintergrundaktion. Fällige Monate werden beim nächsten Öffnen mit den bis dahin gespeicherten Beträgen nachgeholt.
- **Keine automatischen Gewinne, Zinsen oder Fördergutschriften** auf den aktuellen Wert.

Aktuelle Bestände bleiben manuell korrigierbar. Die Korrektur ist der neue Stand; bereits verarbeitete Monate werden nicht wiederholt. Nicht vor das Datum zurückplanen, bis zu dem dein Bestand Beiträge bereits enthält.

Beim Wiederaktivieren wird eine künftige erste Buchung vorgeschlagen. Nach dem Import einer Sicherung mit aktiven Einstellungen können noch fällige Monate nachgeholt werden. Buchungsmarkierungen sind Teil der Sicherung. Die Fortschreibung führt keine echten Zahlungen aus.

## Speicherung, Datenschutz und Sicherungen

Änderungen bleiben lokal, sofern der Browser Speicherung erlaubt. Betragsfelder durch Verlassen bestätigen; Formulare über Speichern sichern.

**Export:** **••• → Sicherung exportieren** oben rechts. **Import:** **••• → Sicherung importieren**; ersetzt nach Bestätigung den lokalen Plan. Die JSON-Datei enthält alle Einträge und Einstellungen einschließlich Rhythmus, Konten, Anteile, Vorsorge, Kinder, optionalem Geburtsdatum und Buchungsmarkierungen. Der Export bietet zuerst eine verschlüsselte Sicherung mit eigenem Passwort (mindestens zwölf Zeichen) an. Unverschlüsselter Export ist ausdrücklich separat auswählbar.

Ältere Sicherungen sind importierbar. Neue Sicherungen sollten mit der aktuellen App-Version geöffnet werden. Unverschlüsselte Exportdateien sind im Klartext lesbar und privat aufzubewahren. Das Sicherungspasswort verschlüsselter Exporte ist unabhängig von der sechsstelligen App-PIN; es wird beim Import abgefragt. **Niemals persönliche JSON-Dateien ins öffentliche Repository laden.**

Regelmäßig exportieren: Löschen von Website-Daten, Speicherbereinigung oder Gerätewechsel können lokale Daten entfernen. Offline ersetzt kein Backup.

Andere Personen auf anderen Geräten starten mit Beispieldaten. Ohne aktivierten App-Schutz kann jeder in derselben Browserumgebung deinen Plan sehen. Der optionale Schutz sperrt diese lokale Planung. Keine Bankanbindung, automatische Synchronisierung der Finanzdaten oder eingebauten Tracker. Der App-Schutz benötigt kein Benutzerkonto. Der Hostinganbieter verarbeitet die üblichen Website-Anfragen; die App sendet deine Finanzfelder nicht mit.

## Optionaler App-Schutz

Oben auf das **Schutzsymbol** tippen und „Schutz einrichten“ wählen. Eine PIN mit **genau sechs Ziffern** zweimal eingeben. Den angezeigten Wiederherstellungscode sicher außerhalb der App aufbewahren und dies bestätigen. Erst „Schutz aktivieren“ übernimmt deinen gesamten vorhandenen Plan in den verschlüsselten Speicher. Die PIN wird nicht im Klartext gespeichert. Alte lokale Klartextkopien einschließlich interner Migrationssicherungen werden anschließend entfernt; vorhandene heruntergeladene Dateien bleiben unverändert.

Ab dann erscheint beim Öffnen der Sperrbildschirm. Mit verknüpftem Passkey startet automatisch ein Entsperrversuch. Falls er fehlschlägt oder abgebrochen wird, erscheint die sechsstellige PIN-Eingabe; sie ist auch über „Stattdessen PIN verwenden“ sofort erreichbar. Ohne verknüpften Passkey erscheint direkt die PIN. Beim Verlassen oder Wechseln der App wird die Planung gesperrt. „Jetzt sperren“ ist im App-Schutzmenü verfügbar. Nicht gespeicherte Formulare werden beim Sperren geschlossen; Einträge daher vorher speichern. Vor dem Schließen warten, bis keine Speicherwarnung mehr angezeigt wird. Während die App gesperrt ist, werden Beiträge nicht im Hintergrund verändert; fällige Monate werden nach dem Entsperren nachgeholt.

Unter „Face ID / Passkey einrichten“ wird ein Passkey angelegt und mit einem zweiten bewussten Schritt verknüpft. Er muss die PRF-Erweiterung zur Entschlüsselung unterstützen; andernfalls bleibt der PIN-Schutz unverändert. iOS bestimmt, ob Face ID, Touch ID oder der Gerätecode verwendet wird. Die App bekommt keine Gesichtsdaten. Der Passkey kann je nach Passwortmanager synchronisiert werden, deine Finanzdaten werden dadurch nicht synchronisiert.

**Offline:** Die sechsstellige PIN funktioniert nach vollständigem Download offline. Passkeys zum ersten Mal online einrichten. Ihre Verfügbarkeit, insbesondere offline, hängt von Browser und Passwortmanager ab; PIN immer als Alternative behalten. Bei einer anderen Website-Adresse oder Domain den Plan per Sicherung übernehmen und die Passkey-Verknüpfung dort neu einrichten.

**PIN vergessen:** Am Sperrbildschirm „Wiederherstellungscode verwenden“ wählen und eine neue sechsstellige PIN zweimal eingeben. Die Finanzdaten bleiben erhalten. Der Wiederherstellungscode bleibt auch nach einem PIN-Wechsel gültig und ist wie ein Schlüssel zu behandeln. Ohne PIN, zugänglichen Passkey oder Wiederherstellungscode kann der geschützte lokale Plan nicht wiederhergestellt werden. Eine vorhandene externe Sicherung lässt sich nach einer Neueinrichtung importieren.

PIN ändern und Schutz ausschalten sind im App-Schutzmenü möglich und erfordern die bisherige PIN. Ausschalten speichert den Plan wieder unverschlüsselt. Das Entfernen der Passkey-Verknüpfung in der App löscht den Passkey nicht automatisch aus Apples Passwörter-App oder einem anderen Passwortmanager.

**Sicherungen übertragen keine App-Sperre:** Sie enthalten den vollständigen Finanzplan und seine Planungseinstellungen, aber keine App-PIN, Wiederherstellungscodes oder Passkey-Verknüpfung. Beim Import bleibt der vorhandene Schutz des Zielbrowsers bestehen. Auf einem neuen Gerät den Schutz separat einrichten. Sicherungspasswort und Wiederherstellungscode sind unterschiedliche Dinge.

Technik, Grenzen und geprüfte Abläufe: [SICHERHEIT.md](SICHERHEIT.md).

## iPhone und Offline-Nutzung

1. Website online in Safari öffnen.
2. **Teilen → Zum Home-Bildschirm → Als Web-App öffnen**, falls angeboten.
3. Über das Symbol einmal online starten und auf **„Offline bereit“** warten.
4. Flugmodus aktivieren, WLAN ausschalten und zum Test erneut starten.

Safari und installierte App können getrennte Datenspeicher haben. Sicherung gegebenenfalls direkt in der installierten App importieren. Für Offline-Import muss die Datei lokal verfügbar sein.

Das iPhone kann das alte Icon zwischenspeichern. Vor einem eventuellen erneuten Hinzufügen der App den Plan exportieren; Daten werden beim Neuinstallieren nicht als automatisch übertragen vorausgesetzt.

## Bereitstellung und Update

Vorher den bisherigen Plan exportieren. ZIP entpacken und den **Inhalt des Website-Ordners** vollständig im bisherigen Repository hochladen. Gleichnamige Dateien ersetzen, neue ergänzen; index.html bleibt im Hauptverzeichnis.

**Version 4.2 benötigt wie Version 4.0 auch pocket.css und pocket-ui.js.** Alle Dateien gemeinsam veröffentlichen, einschließlich model-v3.js, ui-v3.js, vault-crypto.js, security.js, theme.js, app.js, style.css, offline.js, sw.js, manifest.webmanifest und der unveränderten App-Icons. Die Liniensymbole sind im UI-Skript enthalten; sie benötigen keinen externen Symbolserver. Ihr Lizenztext steht in LICENSE-icons.txt.

GitHub Pages: **Settings → Pages → Deploy from a branch → main → /(root) → Save**. Keine eigene Domain erforderlich. Nach Bereitstellung App online öffnen, offene Eingaben speichern und **„Update laden“** wählen. Unten steht **Version 4.2**. Auf „Offline bereit“ warten.

**Die bisherige Domain und der Website-Pfad müssen für die direkte Datenübernahme gleich bleiben.** Browserdaten sind an ihren bisherigen Website-Ort gebunden. Das Umbenennen der App zu Finanzplaner erfordert deshalb keine Umbenennung des GitHub-Repositorys oder der Website-Adresse. Die technischen Speicherschlüssel, die Manifest-ID und der Service-Worker-Bereich bleiben bestehen. PIN und vorhandene Passkey-Verknüpfung werden weiterverwendet. Bei einem bewussten Umzug auf eine andere Adresse vorher exportieren, dort importieren und den Schutz neu einrichten.

Alte Pläne werden umgestellt. Beim ersten Laden eines gültigen älteren Plans wird zusätzlich intern eine Kopie vor Version 3 angelegt, die einen eigenen Export nicht ersetzt. Für eine Rückkehr zur alten App-Version ihre vorherige alte Sicherung verwenden.

Bei Codeänderungen VERSION in sw.js erhöhen und alle zusammengehörigen Dateien veröffentlichen. Die neue Offline-Version wird erst nach vollständigem Download aller nötigen Dateien installiert. HTTPS oder ein lokaler Entwicklungsserver unter localhost ist nötig; das Öffnen als lokale HTML-Datei installiert keine Offline-App.
