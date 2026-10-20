# Prüfprotokoll – Finanzplaner 4.2.1

Stand: 20.10.2026. Version 4.2.1 basiert auf Version 4.2. Die kleinen Ausgleichshinweise innerhalb der Essentials- und Wealth-Karten entfallen; der gemeinsame Meldungsblock unter den vier Budgetblöcken bleibt erhalten. Berechnungen, Speicherung und App-Schutz sind unverändert. Die fixierte untere Navigation sowie der dunklere Monatsbudget-Bearbeiten-Knopf bleiben erhalten.

## Aktuelle Prüfung für Version 4.2.1

Die 15 Integrationsprüfungen und die 15 Prüfungen für Budgetmeldungen, Deckungsgrenzen, Credits und Speicherfehler wurden mit den tatsächlichen Dateien der Version 4.2.1 erneut ausgeführt und bestanden.

Zusätzlich wurde geprüft, dass keine zusätzlichen Warnhinweise innerhalb der vier Budgetkarten erzeugt werden und bei einem Ausgleich genau ein gemeinsamer Meldungsblock unter ihnen erscheint. Die Budgetkarten verwenden wieder exakt dieselbe Renderfunktion wie in Version 4.1. Die Renderfunktion des gemeinsamen Meldungsblocks ist gegenüber 4.2 unverändert.

## Dokumentierter Prüfumfang der Basisversion 4.2

Alle 15 bisherigen Integrationsprüfungen und 15 zusätzliche Prüfungen für Budgetmeldungen und Fußzeile wurden mit den ausgelieferten Dateien der Version 4.2 ausgeführt und bestanden. Die Prüfungen verwenden die tatsächlichen App-Skripte, Node.js WebCrypto sowie simulierte DOM-, Speicher- und Service-Worker-Schnittstellen.

Die zusätzlichen Prüfungen decken beide Ausgleichsrichtungen, exakte Deckung, fehlende Mittel bei beiden möglichen Geberbudgets, die Safety-Umverteilung, Cent-Beträge und einen um genau einen Cent zu geringen freien Betrag ab. Ohne tatsächlichen Ausgleich erscheint keine positive Meldung. Alle fünf Seiten zeigen die gewünschten Credits bei bestätigter Speicherung; echte lokale und verschlüsselte Schreibfehler bleiben sichtbar.

Die neuen CSS-Regeln wurden zusätzlich auf ihre Reihenfolge, Bildschirmbreiten, Abstände für Inhalt und Meldungen sowie den iPhone-Sicherheitsabstand geprüft. Form, Farben und Innenabstände der Navigation bleiben erhalten. Der dunklere Bearbeiten-Knopf erreicht mit seiner Schrift einen Kontrast von ungefähr 10:1; die Änderung ist auf den Dunkelmodus begrenzt.

- Alle fünf Seiten und drei Planungsbereiche rendern; Eintrags-, Konten-, Vorsorge- und Fortschreibungsformulare bleiben erreichbar.
- Frühere Pläne und Sicherungen der Versionen 1–3 übernehmen die bisherige Laufzeit in beide neuen Regler. Getrennte Werte von 1–50 Jahren werden validiert und dauerhaft gespeichert.
- Die gemeinsame Prognose entspricht bei gleichem Horizont der Summe beider Depotmodelle. Unterschiedliche Horizonte werden getrennt angezeigt.
- Budgetausgleich, Safety-Verteilung, Zielerreichungsmonat, Monatsumrechnung und centgenauer ETF-Balancer wurden geprüft.
- Reale AES-GCM-Ver- und Entschlüsselung, PIN-Entsperrung, Wiederherstellungscode und verschlüsselte Sicherungen erhalten beide Laufzeiten. Falsche Geheimnisse werden abgewiesen.
- Bestehende geschützte Pläne bleiben vor der Entsperrung verborgen. Neue Werte durchlaufen die tatsächliche verschlüsselte Speicherwarteschlange. Hintergrundsperren entfernen Planungsinhalt und Zustand aus der Oberfläche.
- Der Offline-Cache umfasst alle 15 benötigten App-Ressourcen. Installation, Offline-Abruf und Bereinigung der eigenen vorherigen Cache-Version wurden simuliert.
- Logo, Finanzmodell, Verschlüsselungsmodul, Speicherkennungen und PWA-Identität wurden mit der Ausgangsversion verglichen. Die neue Oberfläche benötigt keinen externen Symbolserver und enthält keine Vorschau-Speicherersatzfunktionen.

Nicht durchgeführt: Darstellung in einer echten Browser-Engine, Bedienung auf einem realen iPhone und echte Face-ID-/Passkey-Systemdialoge. Diese Umgebungen standen hier nicht zur Verfügung. Die CSS-Struktur, die eingebetteten Symbole und die übernommenen Kontrast- und Reglerregeln wurden statisch geprüft.

Die Veröffentlichung erfolgt durch Austausch sämtlicher App-Dateien unter der bisherigen Adresse; siehe ANLEITUNG.txt. Die ZIP enthält keine persönlichen Planungsdaten.
