# Prüfprotokoll – Finanzplaner 4.1

Stand: 19.10.2026. Version 4.1 basiert auf Version 4.0 und ergänzt die fixierte untere Navigation sowie einen dunkleren Monatsbudget-Bearbeiten-Knopf im Dunkelmodus. Berechnungen, Speicherung und App-Schutz sind unverändert.

## Automatisierte Integrationsprüfung für Version 4.1

Alle 15 automatisierten Integrationsprüfungen wurden mit den ausgelieferten Dateien der Version 4.1 erneut ausgeführt und bestanden. Sie verwenden Node.js WebCrypto sowie simulierte DOM-, Speicher- und Service-Worker-Schnittstellen. Die ergänzenden Migrations- und Plattformprüfungen der Basisversion 4.0 sind im bisherigen Prüfumfang dokumentiert.

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
