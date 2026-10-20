# Änderungen

## 4.2.1

- Kleine Ausgleichshinweise innerhalb der Essentials- und Wealth-Budgetkarten entfernt; die Karten bleiben kompakt.
- Gemeinsamen Meldungsblock unter den vier Budgets mit unveränderter Deckungsprüfung beibehalten.
- Versionsanzeige und Offline-Cache aktualisiert. Berechnungen, Credits, Speicherung und App-Schutz bleiben unverändert.

## 4.2.0

- Budgetausgleich mit Betrag und Richtung an den betroffenen Übersichtskarten sichtbar gemacht.
- Warnung, wenn Essentials aus Wealth ausgeglichen wird; positive Meldung für Wealth nur bei vollständiger Deckung durch unverplante Essentials-Mittel.
- Fehlende Deckung wird mit dem tatsächlichen Fehlbetrag angezeigt.
- Normale Fußzeile auf „Credits an 🐭“ reduziert; dauerhafte Speicher- und Bankverbindungs-Hinweistexte entfernt. Speicherwarnungen bei ausstehender oder nicht bestätigter Speicherung bleiben erhalten.
- Versionsanzeige und Offline-Cache aktualisiert. Finanzberechnung, Speicherkennungen und App-Schutz unverändert.

## 4.1.0

- Bestehendes Pocket-Menüband am unteren Bildschirmrand fixiert; die fünf Bereiche bleiben beim Scrollen erreichbar.
- Abstand für Seiteninhalt und unteren geschützten Bildschirmbereich ergänzt, damit die Navigation keine letzten Inhalte verdeckt.
- Bearbeiten-Knopf beim Monatsbudget ausschließlich im Dunkelmodus dunkler abgestimmt.
- Versionsanzeige und Offline-Cache aktualisiert. Finanzberechnungen, Daten- und Schutzformate bleiben unverändert.

## 4.0.0

- Neuer sichtbarer Name Finanzplaner mit unverändertem App-Logo.
- Freigegebenes Pocket-Design in Lavendel, gut lesbarer Hellmodus und abgestimmter Dunkelmodus.
- Navigation Heute / Mein Plan / Konten / Polster / Zukunft; Alltag, ETF & Anlagen und Altersvorsorge als Planungsbereiche.
- Dezente farbige Kopfbereiche auf den Folgeseiten und sichtbarer Safety-Verteilungsregler im Hellmodus.
- Einheitliche lokale Liniensymbole ohne externe Laufzeit-Abhängigkeit.
- Zwei getrennte, gespeicherte Laufzeiten von 1 bis 50 Jahren für ETF und Vorsorge; identische Reglerhintergründe.
- Gemeinsame Prognose nur bei gleichem Horizont; bewusste Angleichung an die längere Laufzeit möglich.
- Bestehende Pläne übernehmen für beide Regler die bisherige Laufzeit. Finanzberechnungen, PIN-/Passkey-Schutz und lokale Speichernamensräume bleiben erhalten.
- Offline-Installation um pocket.css und pocket-ui.js erweitert; Cache-Version und Manifest-Beschriftung aktualisiert.


## 3.5.0

- Leere Betragsfelder mit Platzhalter bei neuen Einträgen; vorhandene Nullbeträge werden beim Fokussieren ausgewählt.
- Automatischer Face-ID-/Passkey-Versuch bei App-Start und Rückkehr mit verknüpftem Passkey.
- PIN-Rückfall bei Abbruch, Fehler oder Zeitüberschreitung; sofortiger Wechsel zur PIN möglich.
- Keine automatischen Wiederholungen nach Fehler oder Abbruch; bewusste manuelle Sperre bleibt bestehen.
- Abgebrochene oder überholte Passkey-Ergebnisse werden nicht zum Entsperren verwendet.
- Kleiner „JUHUU 🐭“-Hinweis nach dem positiven unverplanten Betrag, mit Umbruch auf schmalen Bildschirmen.
- Version, Dokumentation und Offline-Cache aktualisiert; Daten- und Tresorformate bleiben unverändert.

## 3.4.0

- PIN-/Face-ID-Sperrbildschirm übernimmt die gewählte helle oder dunkle Darstellung.
- Frühes synchrones theme.js vor dem Stylesheet setzt das Design ohne vorherige Planentschlüsselung.
- Ausschließlich die Designwahl wird zusätzlich separat gespeichert; das Tresorformat bleibt gleich.
- Systemmodus folgt Änderungen der Geräteeinstellung auch bei gesperrter App.
- Designwahl wird beim Entsperren, Umschalten und Übernehmen einer Planung synchronisiert.
- Bestehende 3.3-Pläne übernehmen ihre Designwahl nach dem ersten Entsperren.
- Offline-Cache um theme.js erweitert; Versionsanzeige und Dokumentation aktualisiert.

## 3.3.0

- Optionaler App-Schutz mit exakt sechsstelliger PIN, Wiederholung und führenden Nullen.
- Verschlüsselte Planung mit zufälligem AES-256-GCM-Datenschlüssel und getrennten PIN-/Wiederherstellungsschlüsselhüllen.
- PIN-Ableitung mit PBKDF2-SHA-256 und 600.000 Iterationen.
- Schutzaktivierung erst nach Sicherung des Wiederherstellungscodes; Bereinigung alter lokaler Klartextkopien.
- Gesperrter Start ohne Laden der Planoberfläche, Sperre beim Verlassen und manuelle Sperre.
- PIN-Wechsel, Wiederherstellung mit neuer PIN und bewusstes Abschalten.
- Optionale Passkey-PRF-Verknüpfung für Face ID / Geräteentsperrung mit PIN als Alternative.
- Verschlüsselte Sicherungen mit eigenem Passwort; alte JSON-Dateien bleiben importierbar.
- Automatische Fortschreibung und Importe nutzen ebenfalls ausschließlich den verschlüsselten Speicher, wenn der Schutz aktiv ist.
- Abwarten ausstehender Speicherung vor Offline-Updates; Erkennung konkurrierender Fenster.
- Website-Dateien vault-crypto.js, security.js und Dokumentation ergänzt; Offline-Cache aktualisiert.

## 3.2.0

- Prozentlegende der Ist-Verteilung passend zur Ziel-Verteilung.
- Freies Lifestyle-Budget bleibt dem Lifestyle-Anteil zugeordnet.
- Lifestyle-Überbuchungen und Safety-Umverteilung werden im Ist-Kreis berücksichtigt.
- Gemeinsame Berechnungsgrundlage für Ist-Kreis und Überplanungshinweis.
- Getrennte Zeilen für möglichen Depotwert und 7-%-Rendite in allen Prognosen.
- Geschützte Leerzeichen zwischen Renditezahl und Prozentzeichen.
- Bestehende Daten und Einstellungen bleiben erhalten.
- Dokumentation und Offline-Version aktualisiert.

## 3.1.0

- Euro-Eingaben für aktuelle ETF-Bestände im Balancer.
- Centgenaue einmalige Übernahme früherer Prozentbestände.
- Prüfung, ob die Summe der ETF-Werte dem Depotwert entspricht.
- Ziel- und Ist-Verteilung gemeinsam oben auf der Übersicht.
- Altersvorsorgedepot direkt unter dem ETF-Plan.
- Einheitliche Bezeichnungen Safety, Lifestyle und Wealth.
- Monats-/Datumsfelder und Formularcontainer für kleine Bildschirme begrenzt.
- Kontountertitel „Frei zuordenbares Konto“ entfernt.
- Leerbereich und zusätzliche Trennlinie bei der Polster-Fortschreibung entfernt.
- Aktualisierte Dokumentation und Offline-Version.

## 3.0.0

- Zusätzliches Ist-Diagramm mit unverplantem Anteil und Kennzeichnung von Überplanung.
- Ausgabendetails als geordnete Angaben zu Konto, Zahlung, Teilung und Rate.
- Zahlungsrhythmen monatlich, vierteljährlich, halbjährlich und jährlich.
- Monatsumrechnung einschließlich geteilter Kosten; Raten bleiben monatlich.
- Alphabetisch sortierte Symbolauswahl und neu ausgerichteter Icon-Pfeil.
- Eigenes Altersvorsorgedepot mit Depotwert, Sparrate, Konto und Fördermodell.
- Grundzulage, Kinderzulagen mit Förderende und einmaliger Einsteigerbonus.
- Gemeinsame sowie getrennte ETF-/Vorsorge-Prognosen und Brutto-Auszahlungsmodell.
- Optionales monatliches Fortschreiben am 2. oder 16. mit Nachholen beim Öffnen.
- Wiederholte Monatsverarbeitung verhindert; aktuelle Werte weiter manuell änderbar.
- ETF-Balancer für die nächste Sparrate mit Cent-Rundung und ohne Verkäufe.
- Alte Pläne und Sicherungen werden übernommen; alte Vorsorge-Einträge bei eindeutiger Zuordnung verschoben.
- Neue Dateien model-v3.js und ui-v3.js müssen mit veröffentlicht werden.

## 2.1.0

- Detailzeile bei Ratenkäufen zeigt verbleibenden Betrag und offene Raten.
- Der laufende Monat gilt bereits als bezahlt; nur spätere Raten zählen.
- Funktioniert für Essentials und Lifestyle sowie für geteilte Kosten.
- Künftig beginnende Ratenkäufe zeigen den gesamten offenen Betrag.
- Laufende und abgeschlossene Verträge werden beim Monatswechsel neu berechnet.
- Datenformat bleibt zu Version 2 kompatibel; keine neue Eingabe erforderlich.

## 2.0.0

- Hell-/Dunkelmodus mit Schaltfläche oben und gespeicherter Auswahl.
- Eigene Konten mit frei wählbarem Namen, Symbol und Akzentfarbe.
- Standardkonten können entfernt werden; das Girokonto bleibt bestehen.
- Beim Entfernen übernimmt ein gewähltes Ersatzkonto alle Zuordnungen.
- „Noch unverplant“ berücksichtigt nur Essentials und Wealth.
- Ratenkäufe bei Essentials und Lifestyle, Eingabe über Startmonat und Laufzeit.
- Automatische Anzeige des letzten Ratenmonats einschließlich Startmonat.
- Bestehende Start-/Endmonate werden bei der Übernahme passend umgerechnet.
- Zusätzliche Symbole für alltägliche Ausgaben und Konten.
- Zwei Prognosekacheln (5 % und 10 %) statt drei; 7 % samt Wertzuwachs oben.
- Angepasste Darstellung auf schmalen Bildschirmen und dunkle Diagramme.
- Automatische Übernahme von Version-1-Plänen und Sicherungen.
- Eigene Konten, Laufzeiten und Design werden im Export mitgesichert.
- Neue Offline-Version; Aktualisierung über „Update laden“.

## Vor Version 2

Budgetplanung, Einkommensverteiler, Notgroschen, ETF-Prognose,
Offline-Nutzung, Export/Import und Teilung gemeinsamer Kosten.
