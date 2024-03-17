# Transformadors trifàsics

## 1. Introducció

Es crea connectant (magnèticament) tres transformadors monofàsics. Poden tenir 3 o 5 columnes. Tres d'aquestes columnes tindran un bobinat primari i un secundari. Tot i que el de tres columnes té el desavantatge de crear asimetries en el circuit magnètic, l'estalvi que suposa utilitzar menys material (estalvi en pes, i preu) en front a la pèrdua d'asimetria (un desavantatge només en càrregues baixes), fa que tots els transformadors utilitzin un banc de tres columnes

Bàsicament, està format per dos o més circuits elèctrics acoblats magnèticament mitjançant un flux comú, és a dir, per dues o més bobines acoblades. El de dues bobines acoblades es diu transformador monofàsic.

Per a aconseguir un flux comú entre les bobines es pot utilitzar un nucli d'aire, encara que resulta molt més adequat utilitzar un nucli de ferro o un altre material  ferromagnètic (en aquest cas, el camí a través de l'aire també existeix, però és negligible). Per a que un bobinat indueixi tensió a l'altre, el flux comú ha de ser variable i, per això, també ha de ser-ho la corrent que el crea (amb corrent contínua constant no es pot induir tensió).

Com altres màquines elèctriques, el transformador és reversible. Això vol dir que també es pot alimentar pel costat u₂, i₂ cedir energia al costat u₁, i₁. Sovint es considera que el primari del transformador és el costat que es connecta a l'alimentació (a tensió) mentre que el secundari és el que es connecta al consum, és a dir, la transferència de potència és del primari al secundari. No obstant això, aquesta definició té una certa ambigüitat en el cas de transformadors connectats en xarxes mallades, en els quals la transferència de potència es pot produir en qualsevol dels dos sentits, depenent de com es distribueixi la potència de tota la xarxa.

El transformador no modifica la freqüència de les tensions i corrents, per la qual cosa la freqüència de les tensions i corrents del secundari serà la mateixa que les del primari.

L'aplicació més significativa dels transformadors és en els sistemes elèctrics de potència, en els quals fa possible que la generació, el transport i el consum es facin a les tensions més rendibles en cada cas. També s'utilitza en circuits de baixa potència i tensió per a altres aplicacions com, per exemple, la igualació de les impedàncies de càrrega i font per tenir la màxima transferència de potència, l'aïllament de circuits o l'aïllament front a la corrent contínua, sense perdre la continuïtat de la corrent alterna. Una altra aplicació és com a dispositiu auxiliar dels aparells de mesura, reduint la tensió o corrent d'un circuit per adequar-la a la que accepten els aparells de mesura: són els transformadors de mesura.

## 2. Connexions. Propietats.

El transformador es pot connectar en triangle (D), estrella (Y) o zig-zag (Z). Cada una d'elles amb unes propietats i relacions de transformació diferents.

La connexió estrella permet tenir accessible el neutre i distribuir 2 tensions. EL debanaments suporten la mateixa corrent que la línia.

La connexió en triangle no te neutre. La corrent de cada debanament és la de línia  dividida per $ \sqrt{3} $. Els debanaments suporten la tensió composta. Per a igual tensió de línia i igual potencia, cada debanament ha de tenir 1.73 vegades més espires que en estrella (la tensió és superior), però de secció 1.73 vegades inferior (la corrent és inferior), per tant la quantitat de coure és la mateixa.

Per a una connexió en zig-zag és necessiten dues bobines iguals per fase, per les que circula la intensitat de línia. Per a igual tensió es necessiten $ 2 / \sqrt{3} =1.15 $ més espires que en estrella, de la mateixa secció, cada una de les espires suporta una tercera part de la tensió composta.

En general, la connexió en triangle té una bona resposta en front dels desequilibris de càrregues no simètriques, mentre que en estrella no tant. La connexió en zig-zag es comporta bé sota desequilibris tot i que necessita un 15% més de coure. També tenen el neutre accessible.

En general:

- Les connexions Y-Y s'utilitzen poc degut als desequilibris.
- Les connexions Y-D, D-Y funcionen bastant bé amb càrregues desequilibrades.
- La D-D es comporta bé sota càrregues desequilibrades, tot i que no tenir neutre sol ser un problema en la distribució. Si hi ha un banc trifàsic, es pot desconnectar un transformador per a realitzar operacions de manteniment.
- Les connexions Y-Z i D-Z tenen un excel·lent comportament front a desequilibris. La connexió Y-Z és preferible a Y-Y.

### 2.1 Índex horari

En un transformador monofàsic les tensions només poden estar en fase o en contrafase, o 0° o 180°, ja que ambdós debanaments estan travessats pel mateix flux magnètic. Per a un transformador trifàsic els debanaments de cada columna estan en fase o contrafase, però al fer les connexions apareixen  desfases diferents segons la connexió.

L'índex horari caracteritza l'angle de la tensió entre dues fases del primari amb les mateixes fases del secundari. Es refereix sempre a un sistema trifàsic de seqüència directa, amb el transformador en buit.

Degut a les simetries dels sistemes trifàsics cada desfasament serà múltiple de $ %pi/6 $ per tant hi ha 12 possibles posicions, d'on prové el nom d'índex horari.

l'índex horari és molt important a l'hora de fer connexions de transformadors en paral·lel ja que connectar dues tensions del mateix voltatge però diferent angle són curtcircuits. Per tant **han de tenir el mateix índex horari**.

### 2.2. Grup de connexió

El grup de connexió indica el tipus de debanaments i l'índex horari. Consta de dues lletres i un nombre.

- La primera lletra és la connexió del debanament de tensió més alta i s'escriu en majúscula.
- La segona lletra és la connexió del debanament de tensió més baixa i s'escriu en minúscula.
- El nombre és l'índex horari.

Per exemple, un transformador Yd11 està en estrella a la part d'alta en triangle a baixa i te un índex horari de 11, això vol dir que el desfasament entre les tensions és de $ 11 %pi / 6 $

Una nomenclatura més completa indica si el neutre està accessible. Per exemple Dyn11 YNd1.

## 3. Placa de característiques

Els valors donats són similars als transformadors monofàsics.

- **Potència nominal:** És la potència trifàsica. Es calcula com:

$$
S_N = \sqrt 3 \cdot U_{N1} \cdot I_{N1} = \sqrt 3 \cdot U_{N2} \cdot I_{N2}
$$

- **Tensions nominals:** són les tensions de línia que pot suportar el transformador
- **Intensitats nominals:** són les intensitats de línia màximes que pot suportar el transformador.
- **Relació de transformació:** Relació entre tensions nominals.
  Per exemple per un Dy, es té:
  $
  r_t = \dfrac{U_{N1}}{U_{N2}} = \dfrac{U_{N1,fase}}{\sqrt 3 \cdot 
  U_{N2,fase}}=\dfrac{N_1}{\sqrt 3 \cdot N_2}=\dfrac{I_{N2}}{I_{N1}}
  $
  Si no hi ha connexió en estrella no cal el $ \sqrt 3 $.
- **Freqüència nominal:** és la freqüència a la que corresponen els diferents valors nominals.
- **Placa de característiques:**
  + Potència nominal
  + Tensions nominals del primari i secundari
  + Intensitat nominals del primari i secundari
  + Relació de transformació
  + Freqüència nominal
  + Dades dels assajos en buit i en curtcircuit
  + Grup de connexió

L'estudi d'un transformador trifàsic equilibrat es realitza només a una de les fases (amb el neutre) i l'estratègia a seguir és similar a la del monofàsic. Els desfasaments deguts a l'índex horari no són necessaris al transformador reduït, però si al tornar als valors reals.

Degut a això els desfasaments entre primari i secundari són els desfasaments de l'índex horari més els desfasaments de l'esquema reduït (provocat per les impedàncies del sistema.

El resultat representa una de les fases, les altres dues fases estaran desfasades 120°i -120°.

## 4. Reducció del transformador trifàsic

De manera anàloga al transformador monofàsic, els valors base han de complir una sèrie de criteris: 

$$
\begin{array}{ccc}
& S_b~(\text{VA}) & \\\\[1mm]
& S_{b,F} = S_b/3 ~(\text{VA}) & \\\\[3mm]
U_{b1}~(\text{V}) & U_{b1}/U_{b2} = r_t & U_{b2}~(\text{V}) \\\\[1mm]
U_{b1,F}=U_{b1} / \sqrt 3 ~ (\text{V}) & & U_{b2,F}=U_{b2} / \sqrt 3 ~ (\text{V}) \\\\[3mm]
I_{b1} = \dfrac{S_b}{\sqrt 3 U_{b1}}~(\text{A}) & & I_{b2} = \dfrac{S_b}{\sqrt 3 U_{b2}}~(\text{A}) \\\\[3mm]
Z_{b1} = \dfrac{U_{b1}^2}{S_b}~(\Omega) & & Z_{b2} = \dfrac{U_{b2}^2}{S_b}~(\Omega)
\end{array}
$$

Igual que en el cas dels monofàsics tots els valors s'han de reduir utilitzant el valor base corresponent, per exemple si la tensió a reduir és la de fase s'utilitzarà $ U_{b1,F} $ o $ U_{b2,F} $.

Si la impedància està connectada en triangle s'ha de buscar la impedància en estrella equivalent.

Novament, la reducció a p.u. serà la que s'utilitzarà en aquesta assignatura.

$$
\begin{array}{ccc}
& S_b^{p.u}=S_N~(\text{VA}) & \\\\[1mm]
& S_{b,F}^{p.u} = S_N/3 ~(\text{VA}) & \\\\[3mm]
U_{b1}^{p.u}=U_{N1}~(\text{V}) & U_{N1}/U_{N2} = r_t & U_{b2}^{p.u}=U_{N2}~(\text{V}) \\\\[1mm]
U_{b1,F}^{p.u}=U_{N1} / \sqrt 3 ~ (\text{V}) & & U_{b2,F}^{p.u}=U_{N2} / \sqrt 3 ~ (\text{V}) \\\\[3mm]
I_{b1}^{p.u} = \dfrac{S_N}{\sqrt 3 U_{N1}}=I_{N1}~(\text{A}) & & I_{b2}^{p.u} = \dfrac{S_b}{\sqrt 3 U_{b2}}=I_{N2}~(\text{A}) \\\\[3mm]
Z_{b1}^{p.u} = \dfrac{U_{N1}^2}{S_N}~(\Omega) & & Z_{b2}^{p.u} = \dfrac{U_{N2}^2}{S_N}~(\Omega)
\end{array}
$$

## 5 Transformador trifàsic en càrrega i en curtcircuit

Novament estudiarem el transformador monofàsic mitjançant un exemple:

S'ha de calcular la c.d.t., el rendiment i l'índex de càrrega d'un transformador trifàsic Dyn5 de 500 kVA, 25/6 kV, ε<sub>cc</sub> = 0.05, W<sub>cc</sub> = 10 kW, W<sub>0</sub> = 1 kW i i<sub>0</sub> = 0.01, el seu primari està connectat a una xarxa de 24kV i sabent que el seu secundari alimenta una càrrega en triangle constituïda per tres impedàncies iguals de valor $ \underline Z_2 = 215 + j200 ~\omega $. S'han de determinar també els valors en cas de curtcircuit del secundari.

#### Resolució

La primera passa es trobar els diferents valors base.

$$
\begin{array}{ccc}
S_b^{p.u.}=S_N=500~\text{kVA}\\\\
U_{b1}^{p.u.}=U_{N1}=25~\text{kV} & ; & U_{b2}^{p.u.}=U_{N2}=6~\text{kV} \\\\
I_{b1}^{p.u.}=I_{N1}=\dfrac{500\cdot 10^3}{sqrt 3 \cdot 25 \cdot 10^3}=11.55~\text{A} & ; & I_{b2}^{p.u.}=I_{N2}=\dfrac{500\cdot10^3}{\sqrt 3 } \cdot 6000 = 48.11~\text{A}\\\\
Z_{b1}^{p.u.}=25000^2/500\cdot10^3=1250~\Omega & ; & Z_{b2}^{p.u.}=6000^2/500\cdot10^3=72~\Omega
\end{array}
$$

Per a trobar les impedàncies de l'esquema equivalent, es poden utilitzar les mateixes expressions que al transformador monofàsic:

Gracies a l'assaig de curt-circuit coneixem:

$$
\begin{array}{ccccc}
z = \varepsilon_{cc} & ; & r = w_{cc} = \dfrac{W_{cc}}{S_b^{p.u.}} = \dfrac{W_{cc}}{S_N} & ; & x = \sqrt{z^2-r^2}
\end{array}
$$

o també:

$$
\begin{array}{ccccc}
z = \varepsilon_{cc} & ; & r = z\cos\varphi_{cc} & ; & x = z\sin\varphi_{cc} 
\end{array}
$$

Per altra banda, gràcies a l'assaig de buid sabem podem trobar:

$$
\begin{array}{ccccc}
y_{Fe} = \dfrac{1}{z_{Fe}}=i_0 & ; & g_{Fe} = \dfrac{1}{r_{Fe}} = w_0 = \dfrac {W_0}{S_b^{p.u.}} = \dfrac{W_0}{S_N} & ; & b_M = \dfrac {1}{x_M} = \sqrt{y_{Fe}^2-g_{Fe}^2}
\end{array}
$$

o també:

$$
\begin{array}{ccccc}
g_{Fe} = w_0 & ; & y_{Fe} = \dfrac{g_{Fe}}{\cos\varphi_0} & ; & b_M = y_{Fe}\sin\varphi_0 
\end{array}
$$

$$
\begin{array}{ccccc}
z = \varepsilon_{cc} = 0.05~\text{p.u.} & ; &
r = w_{cc} = \dfrac{10}{500} = 0{,}02~\text{p.u.} & ; &
x = \sqrt{0{,}05^2-0{,}02^2} = 0{,}04583~\text{p.u.}
\end{array}
$$

Les impedàncies de l'esquema equivalent són:

$$
\begin{array}{ccccc}
z = \varepsilon_{cc} = 0.05~\text{p.u.} & ; &
r = w_{cc} = \dfrac{10}{500} = 0{,}02~\text{p.u.} & ; &
x = \sqrt{0{,}05^2-0{,}02^2} = 0{,}04583~\text{p.u.}
\end{array}
$$

Les admitàncies reduïdes del ferro del transformador són:

$$
\begin{array}{ccc}
g_{Fe} = w_0 = \dfrac{1}{500}=0{,}002~\text{p.u.} & ; &
y_{Fe} = i_0 = 0{,}01~\text{p.u.}
\end{array}
$$

La tensió del primari és una tensió de línia, per tant per a reduir-la s'utilitzarà un valor base de línia:

$$
u_1=\dfrac{U_1}{U_{b1}^{p.u.}}=\dfrac{24}{25}=0{,}96~\text{p.u}
$$

Per a les càrregues trifàsiques s'ha de reduir la impedància a la seva estrella equivalent:

$$
\underline z_2 = \dfrac {\underline Z_2}{Z_{b2}^{p.u.}}
= \dfrac {(215 + j200)/3}{72} = 0{,}9954+j0{,}9259 ~ \text{p.u.}
$$

Ara ja es pot resoldre el circuit:

$$
\begin{array}{ccc}
\underline i = \dfrac{\underline u_1}{r + jx + \underline z_2} & ; &
\underline u_2 = \underline z_2 \cdot \underline i = 0.9286 \angle -0{,}813^\circ\\\\[2mm]
\end{array}
$$

$$
\begin{array}{ccc}\text {c.d.t.~(p.u.)} = |\underline u_1|-|\underline u_2|
=0{,}0314~\text{p.u.} & ; & \text {c.d.t.} = \text {c.d.t.(p.u.)} \cdot U_{b2}^{p.u.}=0{,}0314 \cdot 6000 = 188{,}5~\text{V}
\end{array}
$$

$$
\begin{array}{ccccc}p_2 = r_2 \cdot i^2 = 0{,}4644 & ; & p_{Cu}=r\cdot i^2 = 0{,}0093~\text{p.u.} & ; & p_{Fe} = u_2^2 \cdot g_{Fe} = 0{,}0017~\text{p.u.}  
\end{array}
$$

$$
\eta=\dfrac{p_2}{p_2+p_{Cu}+p_{Fe}}\cdot 100=97{,}7~\text{\%}
$$

La corrent de curtcircuit en aquest cas

$$
i_{cc} = \dfrac {u_1}{z}=19{,}2~\text{p.u.}
$$

Per tant, aquest resultat indica que les corrents de curtcircuit són 19.2 vegades la nominal. Conseqüentment el transformador haurà de comptar amb les proteccions adients.

Per a obtenir tots els valors reals s'haurà de multiplicar per les corresponents bases:

$$
\begin{array}{ccc}
I_1 = i\cdot I_{b1}^{p.u.}=i \cdot I_{N1}=7{,}89~\text{A}&;
& I_2 = i\cdot I_{b2}^{p.u.} = I_2 = i\cdot I_{N2} = 32{,}86~\text{A}\\\\
U_2 = u_2 \cdot U_{b2}^{p.u.} = u_2 \cdot U_{N2} = 5{,}571~\text{V} & ;
& P_2 = p_2 \cdot S_b^{p.u.} = p_2 \cdot S_{N2}=232{,}2~\text{kW}\\\\

\end{array}
$$

$$
\begin{array}{ccc}
P_{Cu}=p_{Cu}\cdot S_b^{p.u.} = 4{,}666\text{kW}&;
&P_{Fe}=p_{Fe}\cdot S_b^{p.u.} = 0{,}862\text{kW}
\end{array}
$$

$$
\begin{array}{ccc}
I_{cc1} = i_{cc}\cdot I_{b1}^{p.u.}=221{,}7~\text{A}&;
& I_{cc2} = i_{cc}\cdot I_{b2}^{p.u.}=923{,}76~\text{kA}
\end{array}
$$
