# Avaluació

## Presentació de resultats

L'alumne **[[nom]]**, del [[cicle]] (any [[any]]) ha obtingut una qualificació de: 

> [[nota]]


## Enunciat

Un famós fabricant de joieria menorquí vol establir-se a Son Servera 
i obrir una nova fàbrica més moderna i alimentada exclusivament amb
electricitat, en lloc del generador diesel que actualment tenen a 
Ciutadella.

Això no obstant, els seus tècnics estan preocupats pels valors de la
tensió d'alimentació de les màquines. Principalment pel que fa a la 
mínima tensió, ja que tot i que el procés compta amb proteccions contra 
sobretensión (transitories i permanents).
No succeeix el mateix amb la minva de tensió, ja que alguns dels 
motors es poden arribar a aturar i el metall fos es solidifica a un punt
aleatori del procés avariant una maquinaria molt cara.

S'ha contractat a la enginyeria on treballes per a avaluar el 
problema i la teva tasca correspon a comprovar el valor mínim de tensió
que es pot donar a la fàbrica, per a que l'equip prengui mesures per
tal d'evitar l'aturada del procés productiu.
Per a complir aquest encàrrec, decideixes prendre una sèrie de
decissions, la primera és demanar un llistat de la sèrie històrica dels
valors de mitja tensió de la línia de la que s'alimentarà el 
transformador de la fàbrica.

Al llistat, el mínim històric ha estat de [[p1]]. Per 
tant, utilitzes aguest valor com a alimentació. Tinguent en compte això 
i que la fabrica funciona amb tensions de línia de [[p2]], tries un
transformador trifàsic de [[p3]], [[p4]].

A la placa d'aquest transformador s'hi poden trobar unes dades
obtingudes dels assajos de buid i de curtcircuit:

- $\epsilon_{cc} = [[p5]]$
- $W_{cc} = [[p6]]$
- $W_0 = [[p7]]$
- $\cos\varphi_0 = [[p8]]$

Un company teu ha determinat la impedància més desfavorable que és pot
tenir al procés: $Z_2 = [[p9]]$, connectat en triangle.


### Primera tasca (5 punts). 

Quan acabes de fer els pertinents càlculs. Arribes a la conclusió que
per a la situació més desfavorable, l'índex de càrrega serà [[i1]] i 
la c.d.t en V és [[i2]], el CT en aquest punt estarà funcionant a un 
rendiment, en percentatge, del [[i3]]

Tenint en compte que el quadre està pràcticament aferrat al CT i per
tant no cal considerar la resistència del mateix, quin serà el voltatge
que mesurarà el voltimetre en volts a l'entrada del quadre de BT serà 
[[i4]]

### Segona tasca (2 punt).

Ara és tasca del teu company determinar si amb aquesta tensió i index
de càrrega, el disseny dels circuits interiors permet que tot el
sistema funcioni.

Al cap de dos dies torna amb un esquema unifilar del cuadre de baixa
que compleix els requeriments. Tot i que li falta assignar un poder de
tall a l'interruptor general del quadre. Per això et demana si li pots
proporcionar un valor.

Per a proporcionar un valor des del costat de la seguretat novament 
assumeixes que la línia de baixa tensió que va des de les bornes de BT
del transformador fins al IGA pràcticament no ofereix resistència. 
Al cap d'una estona li envies el següent resultat en kA [[i5]]

### Tercera tasca (2 punts)

Quan ja ho tenies tot enllestit i et preparaves per anar a berenar el
teu coordinador et demana si es pot aprofitar un transformador de
similars característiques que ja té el client i que duria de Fornalutx
per a connectar-lo en paral·lel, si li dones el vist i plau.

Tot concorda, excepte l'index horari, que no és que no concordi sino
que no és veu, tot i que se li han fet proves i es conneixen els 
esquemes del primari i del secundari. Són els següents:

![](img/index_horari.png)

Les connexions seran les següents:
- born A → [[p10]]
- born B → [[p11]]
- born C → [[p12]]
- born d → [[p13]]
- born e → [[p14]]
- born f → [[p15]]

Així doncs està clar que l'índex horari és [[i6]]

<pre>
[[log]]
</pre>