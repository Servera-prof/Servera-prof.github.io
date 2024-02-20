Exercici de Kirchhoff
=====================

![img 1](img/exemple_kirchhoff_5_incognites_malles.png)

Aplicant la primera llei de Kirchhoff:

![eq 1](https://latex.codecogs.com/svg.latex?\begin{array}{l}i_1+i_3=i_2\\\\i_2+i_5=i_4+i_1\end{array})

Aplicant la segona llei de Kirchoff:

![eq 2](https://latex.codecogs.com/svg.latex?\begin{array}{lll}7+3=5\cdot{i_1}+10\cdot{i_1}+15\cdot{i_2}&\rightarrow&10=15i_1+15i_2\\\\9+3=4\cdot{i_4}+12\cdot{i_3}+15\cdot{i_2}&\rightarrow&12=4i_4+12i_3+15i_2\\\\9+2=4\cdot{i_4}+8\cdot{i_5}&\rightarrow&11=4i_4+8i_5\end{array})

Es té un sistema de 5 equacions amb 5 incògnites. Però es possible eliminar ràpidament 2 d'elles, triant adequadament dues variables de les equacions obtingudes amb l'aplicació de la primera llei de Kirchhoff, aïllar-les i substituir-les a les equacions obtingudes amb la segona llei.

Per a fer-ho, es trien les variables i<sub>3</sub> i i<sub>5</sub>, ja que només surten a dues de les equacions de la segona llei.

![eq 3](https://latex.codecogs.com/svg.latex?\begin{array}{lll}i_1+i_3=i_2&\rightarrow&i_3=i_2-i_1\\\\i_2+i_5=i_4+i_1&\rightarrow&i_5=i_4+i_1-i_2\end{array})

Ara es substitueixen les variables i<sub>3</sub> i i<sub>5</sub> a on apareguin.

![eq 4](https://latex.codecogs.com/svg.latex?\begin{array}{lll}&&10=15i_1+15i_2\\\\12=4i_4+12i_3+15i_2&\rightarrow&12=4i_4+12(i_2-i_1)+15i_2\\\\11=4i_4+8i_5&\rightarrow&11=4i_4+8(i_4+i_1-i_2)\end{array})

Operant:

![eq 5](https://latex.codecogs.com/svg.latex?\begin{array}{lll}&&10=15i_1+15i_2\\\\12=4i_4+12(i_2-i_1)+15i_2&\rightarrow&12=4i_4+12i_2-12i_1+15i_2\\\\11=4i_4+8(i_4+i_1-i_2)&\rightarrow&11=4i_4+8i_4+8i_1-8i_2\end{array})

Finalment, simplificant i ordenant:

![eq 6](https://latex.codecogs.com/svg.latex?\left.\begin{array}{r}15i_1+15i_2=10\\\\4i_4+12i_2-12i_1+15i_2=12\\\\4i_4+8i_4+8i_1-8i_2=11\end{array}\right\\}\rightarrow\begin{array}{rrrcr}15i_1&+15i_2&&=&10\\\\-12i_1&+27i_2&+4i_4&=&12\\\\8i_1&-8i_2&+12i_4&=&11\end{array})

Es pot eliminar una equació amb el mètode de la reducció fent 3 vegades l'equació 2 i restant-li l'equació 3. Es a dir:

![eq 7](https://latex.codecogs.com/svg.latex?\left.\begin{array}{rrrrcr}&3\cdot(-12i_1&+27i_2&+4i_4&=&12)\\\\-\\\\&8i_1&-8i_2&+12i_4&=&11\end{array}\right\\}\rightarrow\left.\begin{array}{rrrrcr}&-36i_1&+81i_2&+12i_4&=&36\\\\-\\\\&8i_1&-8i_2&+12i_4&=&11\end{array}\right\\})

![eq 8](https://latex.codecogs.com/svg.latex?\rightarrow-44i_1+89i_2=25)

Ara, el sistema ja només te dues equacions i dues incògnites.

![eq 9](https://latex.codecogs.com/svg.latex?\left.\begin{array}{r}15i_1+15i_2=10\\\\-44i_1+89i_2=25\end{array}\right\\})

I novament es pot aplicar el sistema de reducció per eliminar una de les dues, per exemple i<sub>1</sub>. Per a fer-ho es multiplicarà cada una de les equacions pel factor que multiplica i<sub>1</sub> a l'altra és a dir, i es sumaran:

![eq 10](https://latex.codecogs.com/svg.latex?\left.\begin{array}{rlcr}&44&\cdot&(15i_1+15i_2=10)\\\\+\\\\&15&\cdot&(-44i_1+89i_2=25)\end{array}\right\\}\rightarrow\left.\begin{array}{rr}&660i_1+660i_2=440\\\\+\\\\&-660i_1+1335i_2=375\end{array}\right\\})

![eq 11](https://latex.codecogs.com/svg.latex?\rightarrow1995i_2=815\rightarrow%20i_2=\frac{815}{1995}=0.4085\text{A}=408.5\text{mA})

Ara es pot substituir aquest valor a les anteriors equacions i per tant

![eq 12](https://latex.codecogs.com/svg.latex?15i_1+15i_2=10\rightarrow%20i_1=\frac{10-15i_2}{15}=\frac{10-15\cdot0.4085}{15}=258.1\text{mA})

![eq 13](https://latex.codecogs.com/svg.latex?i_3=i_2-i_1=408.5-258.1=150.4\text{mA})

![eq 14](https://latex.codecogs.com/svg.latex?12=4i_4+12i_3+15i_2\rightarrow%20i_4=\frac{12-12\cdot0.1504-15\cdot0.4085}{4}=1.017\text{A})

![eq 15](https://latex.codecogs.com/svg.latex?11=4i_4+8i_5\rightarrow%20i_5=\frac{11-4\cdot1.017}{8}=866.5\text{mA})