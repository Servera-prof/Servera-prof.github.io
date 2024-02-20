Resolució de circuits (Kirchhoff)
=================================

En general el procediment per resoldre qualsevol circuit aplicant les dues lleis de Kirchhoff. És el següent:

1. Assignem una lletra a cada nus del circuit
2. Es dibuixen les intensitats per cada branca assignant-los un sentit a l'atzar.
3. S'aplica la primera llei de Kirchhoff o la llei dels corrents a tants nusos tingui el circuit menys un.
4. S'aplica la segona llei de Kirchhoff o la llei de les tensions a totes les malles del circuit.
5. Tindrem tantes equacions com el nombre d'intensitats tingui el circuit
6. Es resol el sistema d'equacions plantejat, ja sigui pel mètode de substitució, reducció etc.
7. Les intensitats que tinguin signe positiu tenen el mateix sentit que li assignem en el segon pas. Les intensitats amb signe negatiu tenen sentit contrari al valor assignat inicialment i els hem de canviar el sentit.
8. Un cop tenim el valor i el sentit real de totes les intensitats, ja podem fer un balanç de potències i contestar totes les preguntes sobre l'anàlisi del circuit.


### Primera llei de Kirchhoff

La suma de les corrents que entren a un nus és igual a la suma de les corrents que en surten

> ![eq 1](https://latex.codecogs.com/svg.latex?\sum%20I_{ent}=\sum%20I_{sal})

### Segona llei de Kirchhoff

> ![eq 2](https://latex.codecogs.com/svg.latex?\sum%20E=\sum%20I\cdot%20R)

### Exemple

> ![eq 3](img/exemple-kirchhoff.png)

S'ha d'aplicar la llei dels corrents de Kirchhoff a tants nusos com en tingui el circuit menys un. Tenim 2 nusos. S'aplica al nus superior i queda:

> ![eq 4](https://latex.codecogs.com/svg.latex?I_1=I_2+I_3)
> 
> **A on:**
> 
> + I<sub>1</sub> és la intensitat que va de R1 al nus
> + I<sub>2</sub> és la intensitat que baixa
> + I<sub>3</sub> és la intensitat que va del nus a R2


Ja es té la primera equació. Ara es tenen dues malles, a les que s'imposen dues circulacions amb les que es recorre el circuit de cada malla. En aquest cas s'ha triat el sentit de les agulles del rellotge. Per tant:

> ![eq 5](https://latex.codecogs.com/svg.latex?\begin{array}{l}E_1+E_2=I_1\cdot%20R_1+I_2\cdot%20R_4+I_1\cdot%20R_3\\\\-10+6=I_1\cdot%202+I_2\cdot%203+I_1\cdot%204\\\\6I_1+3I_2=-4\end{array})

Per altra banda

> ![eq 6](https://latex.codecogs.com/svg.latex?\begin{array}{l}-E_2-E_3=I_3\cdot%20R_2+I_3\cdot%20R_5-I_2\cdot%20R_4\\\\-6-4=I_3\cdot%204+I_3\cdot%202-I_2\cdot%203\\\\-3I_2+6I_3=-10\end{array})

El sistema d'equacions queda definit de la següent manera:

> ![eq 7](https://latex.codecogs.com/svg.latex?\left\\{\begin{array}{l}I_1-I_2-I_3=0\\\\6I_1+3I_2=-4\\\\-3I_2+6I_3=-10\end{array}\right.)

Resolem:

> ![eq 7](https://latex.codecogs.com/svg.latex?\left\\{\begin{array}{rrrcr}-6I_1&+6I_2&+6I_3&=&0\\\\6I_1&+3I_2&&=&-4\\\\&-3I_2&+6I_3&=&-10\end{array}\right.)

> ![eq 8](https://latex.codecogs.com/svg.latex?\left\\{\begin{array}{rrrcr}&9I_2&+6I_3&=&-4\\\\&-3I_2&+6I_3&=&-10\end{array}\right.)


> ![eq 9](https://latex.codecogs.com/svg.latex?12I_2=6\rightarrow%20I_2={6\over12}=0,5A)

> ![eq 10](https://latex.codecogs.com/svg.latex?-3I_2+6I_3=-3\cdot0,5+6I_3=-10\rightarrow%20I_3={-10+3\cdot0,5\over6}=-1,42A)
<p>
<img src="https://latex.codecogs.com/svg.latex?I_1=I_2+I_3=0,5-1,42=0,92A" />
</p>
</blockquote>

Les intensitats negatives simplement vol dir que van en sentit contrari al que s'ha suposat inicialment.