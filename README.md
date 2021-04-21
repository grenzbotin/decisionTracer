## DecisionTracer

Make your decisions based on rational thoughts

### Live

- English: https://grenzbotin.github.io/decisionTracer/en
- German: https://grenzbotin.github.io/decisionTracer/de

### Data: Corona preset

#### Disease Probabilty:

European Center for Disease prevention and control
https://covid19-surveillance-report.ecdc.europa.eu/

#### Vaccination efficacy:

Paul Ehrlich Institut
https://www.pei.de/DE/arzneimittel/impfstoffe/covid-19/covid-19-node.html

Vaxzevria (COVID-19 Vaccine Astra-Zeneca)
————————————————————————————————————————————————

- mild: -59.5%
- hospitalised: -59.5%
- severely hospitalised: -59.5%

COVID-19 Vaccine Janssen (Johnson & Johnson)
————————————————————————————————————————————————

- mild: -67%
- hospitalised: -67%
- severely reduction: -67%

Comirnaty (BioNTech Manufacturing GmbH)
————————————————————————————————————————————————

- mild: -95%
- hospitalised: -95%
- severely reduction: -95%

COVID-19 Vaccine Moderna (Moderna Biotech Spain, S.L.)
————————————————————————————————————————————————

- mild: -94.1%
- hospitalised: -90.9%
- severely reduction: -90.9%

#### Vaccination damage:

Paul Ehrlich Institut
Verdachtsfälle nach Impfung (27.12.2020 - 02.04.2021)
https://www.pei.de/SharedDocs/Downloads/DE/newsroom/dossiers/sicherheitsberichte/sicherheitsbericht-27-12-bis-02-04-21.pdf?__blob=publicationFile&v=4

Vaxzevria (COVID-19 Vaccine Astra-Zeneca)
————————————————————————————————————————————————
Mild: 5.8 % - 0.5% = 5.3%
Schwerwiegend: 0.5% - (0.001 _ 0.5)% = 0.4995%
Tod: (0.001 _ 0.5)% = 0.0005%

Comirnaty (BioNTech Manufacturing GmbH)
————————————————————————————————————————————————
Mild: 1.2 - 0.2% = 1%
Schwerwiegend: 0.2% - (0.27 _ 0.2)% = 0.146%
Tod: (0.27 _ 0.2)% = 0.054%

COVID-19 Vaccine Moderna (Moderna Biotech Spain, S.L.)
————————————————————————————————————————————————
Mild: 1.6% - 0.2% = 1.4%
Schwerwiegend: 0.2% - (0.006 _ 0.2)% = 0.1988%
Tod: (0.006 _ 0.2)% = 0.0012%

Was sind schwerwiegende Verdachtsfälle?
In 3.436 Verdachtsfällen wurden schwerwiegende unerwünschte Reaktionen gemeldet. Als schwerwiegende Reaktionen gelten solche, bei denen die Personen im Krankenhaus behandelt werden oder Reaktionen, die als medizinisch bedeutsam eingeordnet wurden.

An der Befragung mittels SafeVac 2.0-App zu unerwünschten Reaktionen nach Impfung nahmen bis zum Zeitpunkt der Auswertung 154.134 Personen teil. Dies entspricht 1,5 % der geimpften Personen bei bisher insgesamt 10.046.898 Erstimpfungen. Diese Daten tragen dazu bei,
dass die Verträglichkeit der Impfung über die klinischen Prüfungen vor der Zulassung hinaus in der breiten Anwendung noch besser beurteilt werden kann. 133.542 der teilnehmenden Personen waren 18 bis 59 Jahre alt, 11.731 Personen waren 60 bis 69 Jahre alt, 4.060 Personen 70 bis 79 Jahre alt und 4.801 Personen waren älter als 80 Jahre.

### Development status

- [x] Data structure ready for presets
- [x] Create, modify & delete decisions, sub scenarios and sub cases
- [x] Enable "independent" mode for sub scenario and sub case probability
- [x] Growing slider for utility settings (let user get as high/low as he wishes)
- [x] Localisation setup
- [x] Icons for presets
- [x] Adding multiple presets
- [x] Have mask to choose between presets in sub menu
- [x] Entry page
- [x] Language toggle
- [x] Same-named cases should have same value (optional)
- [x] Result always visible
- [x] Tree view (selectable)
- [x] Tree view (adding, deleting, modifying data)
- [x] Create own decision tree
- [x] Input on enter, show numeric/decimal keyboard (mobile)
- [x] Questionnaire for corona simple preset
- [x] Implement RKI numbers
- [x] Tooltips
- [x] Simple confirmation on route leaving from calculator page
- [x] Tutorial preset
- [x] Tutorial Questionnaire
- [x] Corona Preset: Implement data for disease probability via age + sex
- [] Corona Preset: Improve UI with more graphical elements
- [] Corona Preset: Implement vaccination efficacy data by vaccination type (?)
- [] Corona Preset: Implement vaccination damage data by vaccination type (?)

### Icons

<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
<div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
### Photos

- Custom icon Photo by Markus Spiske (https://unsplash.com/@markusspiske) on Unsplash
- Virus: Photo by <a href="https://unsplash.com/@cdc">CDC</a> on <a href="https://unsplash.com/s/photos/virus">Unsplash</a>
- Coin: Photo by <a href="https://unsplash.com/@neural_notworks">Shaojie</a> on <a href="https://unsplash.com/s/photos/coin">Unsplash</a>
