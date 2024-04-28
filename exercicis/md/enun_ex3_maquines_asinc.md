# Exercici 3 - Màquines asincrones

## Enunciat

Gràcies a l'exel·lent feina feta amb l'encàrreg del transformador de fa unes setmanes s'ha contractat de nou a la teva empresa per a resoldre un problema. Al polígon de Son Servera, l'empresa Capsule Corp. té un pont grua per a moure palets de càpsules Hoi-Poi. No obstant això, la inspecció reglamentaria ha detectat que les intensitats sol·licitades a la xarxa superen els màxims legals.

El tipus de problema és característic de les puntes provocades per l'arrencada de motors asíncrons. El client conserva tota la documentació del motor, en ella s'observa la corba característica del motor i els valors nominals. Es pot comprovar com amb una arrencada directa el parell és més que suficient per a moure la càrrega, no obstant, també apareix una intensitat d'arrencada molt alta.

Detectat el problema cal proposar una sol·lució, tot i això, les sol·lucions modificaran algunes característiques de la màquina i tant la corba com els valors nominals ja no serveixen, al menys per si sols. No obstant al ser de rotor bobinar amb anells lliscants es pot coneixer tot el circuit equivalent. Als assajos s'han obtingut els següents valors:

- Resistència de l'estator: [[p1]] Ω
- Inductància de l'estator: [[p2]] Ω
- Resistència del rotor: [[p3]] Ω
- Inductancia del rotor: [[p4]] Ω
- Resistència del ferro: [[p5]] Ω
- Inductància magnetitzant: [[p6]] Ω
- Relació de transformació: [[p7]]
- Pèrdues mecàniques: [[p8]] W

Per altra banda la placa aporta les següents característiques:

- Velocitat nominal: [[p9]] rpm
- Potència: [[p10]] kW
- Tensió nominal: [[p11]] V
- Freqüencia: [[p12]] Hz
- Intensitat nominal [[p13]] A
- fdp: [[p14]]

La càrrega requereix un moment constant de [[p15]] N·m, tan a l'arrencada com quan va a velocitat nominal.

## Preguntes

Abans de resoldre la necessitat del client convé caracteritzar mínimament la màquina:

1. Quants de parells de pols té la màquina? <br/>
[[i1]] (1 pt)
2. Quina és la seva velocitat angular nominal (en rad/s)?<br/>
[[i2]] (1 pt)
3. Si es vol connectar en estrella quina és la tensió de línia màxima que aguantarà (en V)?<br/>
[[i3]] (1 pt)
4. Quin es el lliscament a la velocitat nominal?<br/>
[[i4]] (1 pt)
5. Quin es el moment nominal en N·m? <br/>
[[i5]] (1 pt)

Tot i que el problema principal és a l'arrencada es calcularan alguns valors nominals per assegurar que no s'ha de rectificar res una vegada s'aconsegueix arribar al règim estacionari. Suposant que la màquina es connecta en estrella a la tensió de línia [[p16]]

6. Quina és la intensitat a l'estator (en A)?<br/>
[[i6]] (2 pt)
7. Pel que fa al circuit magnètic, quina és la intensitat magnetitzant (en A)? <br/>
[[i7]] (2 pt)
8. I la intensitat en el ferro (en A)?<br/>
[[i8]] (2 pt)
9. Llavors la intensitat del rotor, serà (en A):<br/>
[[i9]] (2 pt)
10. Finalment es pot calcular el rendiment, però **Alerta!** el rendiment calculat segons la placa i segons els assajos poden ser diferents degut a alguna anomalia, comprova-ho:<br/>
    - Rendiment segons el circuit equivalent (en %): [[i10]]
    - Rendiment segons la placa (en %): [[i11]]

Tots aquest valors són concordants amb les dades de que es disposen, per tant el motor funciona correctament. La sol·lució del problema del client passarà per estudiar les diferents estratègies per a l'arrencada. Per començar:

11. Quina és la intensitat que li arriba a l'estator durant l'arrencada? (en A)<br/>
[[i12]] (2 pt)
12. Quin és el moment en aquest punt (en N·m)?<br/>
[[i13]] (3 pt)

Sabent això, es proposa la instal·lació d'un autotransformador a l'entrada per a reduïr la tensió a una tercera part de la nominal, i d'aquesta manera reduir la intensitat.

13. La intensitat s'ha reduït fins a un valor de (en A):<br/>
[[i14]] (2 pt)

14. Ara bé, el moment s'ha reduït fins a (en N·m):<br/>
[[i15]] (2 pt)

Per a comparar, s'estudia l'opció de instal·lar unes resistències rotòriques de [[p17]] Ω. En aquest supòsit:

15. La intesitat és:<br/>
[[i16]] (3 pt)

16. El moment és:<br/>
[[i17]] (3 pt)

## Identificació de l'alumne:

[[identificacio]]
