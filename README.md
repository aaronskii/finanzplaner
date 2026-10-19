# Vermögensaufbau – Version 3.5

**Einkommen planen, Budgets verstehen und Vermögen aufbauen.**

Kostenlose Web-App ohne Bankanbindung, Kontobuchungen oder automatische Überweisungen. Deine Eingaben bleiben im jeweiligen Browser.

**[App öffnen →](https://aaronskii.github.io/vermoegensaufbau/)**

## Neu in Version 3.5

- Neue Einträge beginnen mit einem leeren Betragsfeld und einem grauen Platzhalter. Eine vorhandene Null wird beim Bearbeiten ausgewählt und durch Tippen ersetzt; andere Beträge bleiben erhalten.
- Mit verknüpftem Passkey startet beim Öffnen bzw. bei der Rückkehr in die App automatisch ein Face-ID-/Passkey-Versuch. Nach Abbruch oder Fehler erscheint die PIN-Eingabe. „Stattdessen PIN verwenden“ ist sofort verfügbar, ein erneuter Face-ID-Versuch bleibt manuell möglich.
- Keine Abfrageschleifen: ein automatischer Versuch pro Öffnen. „Jetzt sperren“ lässt die App bewusst gesperrt.
- Ein kleines **„JUHUU 🐭“** folgt auf der Übersicht dem grünen unverplanten Betrag, wenn dieser mindestens einen positiven Cent anzeigt.

## Neu in Version 3.4

- Der Sperrbildschirm für PIN und Face ID übernimmt das gewählte App-Design.
- Die Darstellung wird vor dem Aufbau des Sperrbildschirms angewendet, einschließlich der Browser-Hintergrundfarbe.
- Nur die Auswahl „hell“, „dunkel“ oder „System“ wird zusätzlich außerhalb des verschlüsselten Plans gespeichert. Finanzdaten, PIN und Passkey-Verknüpfung bleiben geschützt.
- Der Systemmodus folgt auch auf dem gesperrten Bildschirm Änderungen der Geräteeinstellung.
- **Nach einem Update von 3.3 einmal entsperren**, damit die bisher verschlüsselt gespeicherte Designwahl übernommen wird. Danach passt sie bereits beim nächsten Start. Bis dahin folgt der Sperrbildschirm der Geräteeinstellung.

## Neu in Version 3.3

- Freiwilliger App-Schutz mit **genau sechsstelliger PIN** (auch führende Nullen).
- Verschlüsselte lokale Speicherung und automatische Sperre beim Verlassen der App.
- Optionales Entsperren mit Face ID / Passkey bei unterstützter Passkey-Verschlüsselung.
- Wiederherstellungscode zum Entsperren und Setzen einer neuen PIN.
- Wahlweise passwortverschlüsselte Sicherungen; alte JSON-Dateien bleiben importierbar.
- Bestehende Pläne werden beim Aktivieren verschlüsselt übernommen.

## Neu in Version 3.2

- Die Ist-Verteilung zeigt wie die Ziel-Verteilung **Prozentangaben**.
- Das gesamte reservierte Lifestyle-Budget zählt zu Lifestyle, einschließlich des noch freien Betrags. Überbuchungen bleiben sichtbar.
- In den Prognosen stehen „Möglicher Depotwert“ und „7 % Rendite p. a.“ in getrennten Zeilen. Zahl und Prozentzeichen bleiben zusammen.
- Bestehende Einträge und Einstellungen bleiben erhalten; keine erneute Einrichtung nötig.

## Neu in Version 3.1

- ETF-Balancer: aktuelle ETF-Bestände in **Euro**, Zielgewichte weiterhin in Prozent. Die Summe der Bestände muss zum angezeigten Depotwert passen.
- Vorhandene Prozentangaben aus Version 3.0 werden einmalig anhand des gespeicherten Depotwerts centgenau in Euro umgerechnet. Spätere Änderungen des Depotwerts skalieren diese manuellen Einzelwerte nicht automatisch.
- Ziel- und Ist-Kreis stehen gemeinsam oben auf der Übersicht. Das Altersvorsorgedepot steht unmittelbar unter dem ETF-Plan.
- Einheitliche Namen: **Safety** (bisher Stability), **Lifestyle** (bisher Rewards), **Wealth** (bisher Growth). Die Aufteilung und Berechnungen bleiben unverändert.
- Monats- und Datumsfelder sowie ihre Formularcontainer haben begrenzte Breiten für schmale Bildschirme und Safari.
- Die zusätzliche Kontobeschriftung und der leere Bereich über dem automatischen Fortschreiben unter Polster sind entfernt.

## Neu in Version 3

- Ist-Kreisdiagramm mit eigenem unverplanten Anteil.
- Geordnete Ausgabendetails, Zahlungsrhythmen und Monatsumrechnung.
- Alphabetische Symbole und korrigierter Pfeil im App-Icon.
- Eigener Bereich für das Altersvorsorgedepot mit Förder- und Auszahlungsmodell.
- Gemeinsame Prognose für ETF und Vorsorge, darunter beide einzeln.
- Optionale monatliche Fortschreibung am 2. oder 16.
- Aufklappbarer ETF-Balancer für die nächste Sparrate.
- Übernahme älterer Pläne und Sicherungen aus Version 1 und 2 einschließlich 2.1.

## Schnellstart

1. Beim ersten Besuch erscheinen gekennzeichnete Beispieldaten.
2. Mit **„Mit eigenen Daten starten“** einen leeren Plan anlegen.
3. Unter **Planung** Einnahmen, Ausgaben und Sparraten eintragen.
4. Unter **Verteilen** Budgetkonten und gegebenenfalls einzelne abweichende Konten wählen.
5. Unter **Polster** Notgroschenstand und Sicherheitsstufe einstellen.
6. ETF- und Vorsorgewerte sowie gegebenenfalls die Förderbedingungen ergänzen.
7. Automatische Fortschreibung nur bewusst aktivieren; regelmäßig exportieren.

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

Der Ziel-Kreis zeigt die vorgesehene Aufteilung. Der **Ist-Kreis** zeigt die tatsächliche Budgetaufteilung mit Prozentangaben: Essentials und Wealth nach ihren eingetragenen Monatsanteilen, Safety als vorgesehenen Sparbeitrag und Lifestyle mit dem gesamten reservierten Budget einschließlich des noch freien Betrags. Übersteigen die Lifestyle-Ausgaben das Budget, zählt der höhere tatsächliche Betrag. Der verbleibende Rest des Einkommens erhält den eigenen Anteil „Unverplant“. Ohne Überbuchung entspricht er dem freien Rest aus Essentials und Wealth; Lifestyle-Überbuchungen verringern den Rest im Kreis zusätzlich.

Bei Überplanung gibt es keine negativen Kreisstücke; die Kreisanteile beziehen sich dann auf den gesamten verplanten Betrag, die Unterdeckung wird angegeben. Die App kennt keine echten Kontostände.

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

Standardkonten: Girokonto, Fixkostenkonto, Spaßkonto, Gemeinschaftskonto sowie Lebensmittel & Tanken. Eigene Konten mit Namen, Symbol und Farbe lassen sich unter **Verteilen → Konten verwalten** ergänzen und bearbeiten. Nur das Girokonto bleibt zwingend erhalten.

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

Unter **Planung → Dein ETF-Sparplan → ETF-Balancer** die aktuellen Euro-Werte der ETFs eintragen. Ihre Summe muss dem Depotwert entsprechen. Bei leerem Depot bleiben die Werte leer oder stehen auf 0 €; die Sparrate wird nach den Zielgewichten verteilt.

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

## Gemeinsame Prognose und Auszahlung

Oben werden ETF und Altersvorsorge zusammengerechnet, darunter einzeln gezeigt. VL und andere Anlagen sind ausgeschlossen.

Gemeinsame Laufzeit: 1 bis 50 Jahre. Szenarien: **5 %, 7 % und 10 % effektive Jahresrendite**, monatliche Verzinsung, konstante Eigenbeiträge am Monatsende. Aktuelle Depotwerte sind das Startkapital.

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

**Export:** Pfeil nach unten oben rechts. **Import:** Pfeil nach oben; ersetzt nach Bestätigung den lokalen Plan. Die JSON-Datei enthält alle Einträge und Einstellungen einschließlich Rhythmus, Konten, Anteile, Vorsorge, Kinder, optionalem Geburtsdatum und Buchungsmarkierungen. Ab Version 3.3 bietet der Export zuerst eine verschlüsselte Sicherung mit eigenem Passwort (mindestens zwölf Zeichen) an. Unverschlüsselter Export ist ausdrücklich separat auswählbar.

Ältere Sicherungen sind importierbar; Version-3-Sicherungen sind nicht für ältere App-Versionen bestimmt. Unverschlüsselte Exportdateien sind im Klartext lesbar und privat aufzubewahren. Das Sicherungspasswort verschlüsselter Exporte ist unabhängig von der sechsstelligen App-PIN; es wird beim Import abgefragt. **Niemals persönliche JSON-Dateien ins öffentliche Repository laden.**

Regelmäßig exportieren: Löschen von Website-Daten, Speicherbereinigung oder Gerätewechsel können lokale Daten entfernen. Offline ersetzt kein Backup.

Andere Personen auf anderen Geräten starten mit Beispieldaten. Ohne aktivierten App-Schutz kann jeder in derselben Browserumgebung deinen Plan sehen. Der optionale Schutz sperrt diese lokale Planung. Keine Bankanbindung, automatische Synchronisierung der Finanzdaten oder eingebauten Tracker. Der App-Schutz benötigt kein Benutzerkonto. Der Hostinganbieter verarbeitet die üblichen Website-Anfragen; die App sendet deine Finanzfelder nicht mit.

## Optionaler App-Schutz ab Version 3.3

Oben auf das **Schloss** tippen und „Schutz einrichten“ wählen. Eine PIN mit **genau sechs Ziffern** zweimal eingeben. Den angezeigten Wiederherstellungscode sicher außerhalb der App aufbewahren und dies bestätigen. Erst „Schutz aktivieren“ übernimmt deinen gesamten vorhandenen Plan in den verschlüsselten Speicher. Die PIN wird nicht im Klartext gespeichert. Alte lokale Klartextkopien einschließlich interner Migrationssicherungen werden anschließend entfernt; vorhandene heruntergeladene Dateien bleiben unverändert.

Ab dann erscheint beim Öffnen der Sperrbildschirm. Mit verknüpftem Passkey startet ab Version 3.5 automatisch ein Entsperrversuch. Falls er fehlschlägt oder abgebrochen wird, erscheint die sechsstellige PIN-Eingabe; sie ist auch über „Stattdessen PIN verwenden“ sofort erreichbar. Ohne verknüpften Passkey erscheint direkt die PIN. Beim Verlassen oder Wechseln der App wird die Planung gesperrt. „Jetzt sperren“ ist im Schloss-Menü verfügbar. Nicht gespeicherte Formulare werden beim Sperren geschlossen; Einträge daher vorher speichern. Auf „Verschlüsselt gespeichert“ achten. Während die App gesperrt ist, werden Beiträge nicht im Hintergrund verändert; fällige Monate werden nach dem Entsperren nachgeholt.

Unter „Face ID / Passkey einrichten“ wird ein Passkey angelegt und mit einem zweiten bewussten Schritt verknüpft. Er muss die PRF-Erweiterung zur Entschlüsselung unterstützen; andernfalls bleibt der PIN-Schutz unverändert. iOS bestimmt, ob Face ID, Touch ID oder der Gerätecode verwendet wird. Die App bekommt keine Gesichtsdaten. Der Passkey kann je nach Passwortmanager synchronisiert werden, deine Finanzdaten werden dadurch nicht synchronisiert.

**Offline:** Die sechsstellige PIN funktioniert nach vollständigem Download offline. Passkeys zum ersten Mal online einrichten. Ihre Verfügbarkeit, insbesondere offline, hängt von Browser und Passwortmanager ab; PIN immer als Alternative behalten. Bei einer anderen Website-Adresse oder Domain den Plan per Sicherung übernehmen und die Passkey-Verknüpfung dort neu einrichten.

**PIN vergessen:** Am Sperrbildschirm „Wiederherstellungscode verwenden“ wählen und eine neue sechsstellige PIN zweimal eingeben. Die Finanzdaten bleiben erhalten. Der Wiederherstellungscode bleibt auch nach einem PIN-Wechsel gültig und ist wie ein Schlüssel zu behandeln. Ohne PIN, zugänglichen Passkey oder Wiederherstellungscode kann der geschützte lokale Plan nicht wiederhergestellt werden. Eine vorhandene externe Sicherung lässt sich nach einer Neueinrichtung importieren.

PIN ändern und Schutz ausschalten sind im Schloss-Menü möglich und erfordern die bisherige PIN. Ausschalten speichert den Plan wieder unverschlüsselt. Das Entfernen der Passkey-Verknüpfung in der App löscht den Passkey nicht automatisch aus Apples Passwörter-App oder einem anderen Passwortmanager.

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

**Version 3 benötigt auch die neuen Dateien model-v3.js und ui-v3.js.** Version 3.3 benötigt zusätzlich **vault-crypto.js und security.js**, Version 3.4 außerdem **theme.js**. Das Paket enthält außerdem app.js, style.css, offline.js, sw.js, manifest.webmanifest und die Icons.

GitHub Pages: **Settings → Pages → Deploy from a branch → main → /(root) → Save**. Keine eigene Domain erforderlich. Nach Bereitstellung App online öffnen, offene Eingaben speichern und **„Update laden“** wählen. Unten steht **Version 3.5**. Auf „Offline bereit“ warten.

Die Adresse bleibt gleich; alte Pläne werden umgestellt. Beim ersten Laden eines gültigen älteren Plans wird zusätzlich intern eine Kopie vor Version 3 angelegt, die einen eigenen Export nicht ersetzt. Für eine Rückkehr zur alten App-Version ihre vorherige alte Sicherung verwenden.

Bei Codeänderungen VERSION in sw.js erhöhen und alle zusammengehörigen Dateien veröffentlichen. Die neue Offline-Version wird erst nach vollständigem Download aller nötigen Dateien installiert. HTTPS oder ein lokaler Entwicklungsserver unter localhost ist nötig; das Öffnen als lokale HTML-Datei installiert keine Offline-App.
