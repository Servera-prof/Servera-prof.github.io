"use strict";

const BASE = "0123456789ABCDEFGHJKMNPQRTVWXY"

/** 
 * Codifica les respostes a un int. Per entendre això suposem
 * que tenim:
 *   - po = [4n, 113n, 233n]
 *   - no = [3, 5, 6]
 * Si a la primera pregunta jo tinc 3 opcions, llavors el màxim de
 * permutacions són 3! = 6. Suposem que em toca la permutació 4; per la
 * segona em toca 113 de 5! i per la tercera 233 de 6!
 * Jo ho podria codificar com 4.113.233, també com 233.113.004 
 * o el que seria el mateix 233 * 10**6 + 133 * 10**3 + 4. Però amb el
 * 4 s'observa que malbarato espai, no es necessari fer-li lloc per 1000
 * opcions ja que el maxim és 3! = 6. Per tant podria escriure:
 * 233*120*6+113*6+4 = 168.442
 * 
 * @param {bigint[]} po - array amb les permutacions de les opcions
 *   per a cada resposta.
 * @param {int[]} no - array amb el número d'opcions per a cada 
 *   resposta
 * @returns {int} ip - enter amb totes les permutacions combinades.
 */
function array_a_int(po, no){
    /* multiplicador acumulat (a la darrera iteració de l'exemple seria
     * 120*6) */
    let ma = 1n 
    /* Integer de les permutacions de les opcions el 1668442 de 
     * l'exemple */
    let ip = 0n;

    for (let i = 0; i < po.length; i++){
        ip = ip + po[i] * ma;
        ma = ma * factorial(no[i]);
    }
    return ip;
}

/** 
 * Descodifica un enter (combinació de permutacions) a l'array original
 * de respostes. Per entendre això, apliquem l'operació inversa al
 * sistema de base variable creat a `array_a_int`.
 * Seguint l'exemple anterior, si tenim l'enter 168442 i sabem que 
 * els màxims d'opcions (les bases) eren 3! = 6, 5! = 120 i 6! = 720:
 *   - Per la 1a posició: 168442 % 6 = 4. Ens guardem el 4 i dividim 
 *     l'acumulat (168442 / 6 = 28073).
 *   - Per la 2a posició: 28073 % 120 = 113. Ens guardem el 113 i 
 *     dividim l'acumulat (28073 / 120 = 233).
 *   - Per la 3a posició: 233 % 720 = 233. Ens guardem el 233.
 * S'obté així l'array original: [4n, 113n, 233n].
 * 
 * @param {bigint} ip - enter amb totes les permutacions combinades
 *   (el 168442n de l'exemple).
 * @param {int[]} no - array amb el número d'opcions per a cada 
 *   resposta.
 * @returns {bigint[]} po - array amb les permutacions de les opcions
 *   recuperades per a cada resposta.
 */
function int_a_array(ip, no) {
    let po = [];
    /* Valor restant. Copiem l'enter d'entrada per poder-lo anar 
     * dividint (consumint) */
    let vr = BigInt(ip); 

    for (let i = 0; i < no.length; i++) {
        let b = BigInt(factorial(no[i]));
        po.push(vr % b);
        vr = vr / b;
    }
    
    return po;
}

/**
 * Codifica dos bigint a BASE. Per exemple si pp = 6 i ip =  168.442
 * ho codificaria com 6 :: 674P
 * 
 * @param{bigint} pp - permutacio preguntes
 * @param{bigint} ip - integer permutacio de les opcions de resposta. 
 *   Es a dir, totes les permutacions de les opcions codificades a un 
 *   sol enter
 * @returns {string} - permutació de les preguntes i opcions de
 *   resposta codificat en BASE i en una sola cadena de text.
 */
function codifica(pp, ip){
    let ppBASE = bigabase(pp);
    /* Separam de 5 en 5 per facilitar la còpia */
    ppBASE = ppBASE.match(/.{1,5}/g).join(' '); 
    let ipBASE = bigabase(ip);
    ipBASE = ipBASE.match(/.{1,5}/g).join(' ');
    return ppBASE + " :: " + ipBASE;
}

/** 
 * Descodifica la cadena 4YEQV J7 :: 6KXWC 2DXYF 39YAA D0XEQ 4K2YP
 * (per exemple), es queda amb el que va abans de "::", 4YEQV J7
 * i extreu l'enter que representa la permutació aleatoria assignada 
 * a l'alumne en aquella ocasió per les preguntes.
 * @param {string} p - string amb la permutació codificada
 * @returns {bigint} pp - permutació preguntes
 */
function descodifica_permutacio_preguntes(p){
    const ppBASE = p.split("::")[0].replaceAll(' ', '');
    const pp = baseabig(ppBASE);
    return pp;
}

/** 
 * Descodifica la cadena 4YEQV J7 :: 6KXWC 2DXYF 39YAA D0XEQ 4K2YP
 * (per exemple) s queda amb el que va despres de "::" 
 * (6KXWC 2DXYF 39YAA D0XEQ 4K2YP) i extreu l'enter que representa 
 * la permutació aleatoria assignada a l'alumne en aquella ocasió
 * per les respostes.
 * @param {string} p - string amb la permutació codificada
 * @returns {bigint} ip - index permutació respostes. 
 *   Es a dir, totes les permutacions de les opcions codificades a un 
 *   sol enter
 */
function descodifica_permutacio_opcions(p){
    const ipBASE = p.split("::")[1].replaceAll(' ', '');
    const ip = baseabig(ipBASE);
    return ip;
}

/**
 * Obté un nombre de permutació aleatoria donat un nombre d'elements.
 * Per exemple si hi ha 5 elements hi ha 5! = 120 posibilitats 
 * d'ordenar-los, la funció podria tornar qualsevol valor entre 0 i 119.
 * @param {number[]} ne - nombre d'elements
 * @returns {bigint[]} p - permutació aleatoria
 */
function perm_aleat(ne){
    const n = BigInt(ne);
    const pm = factorial(n);            // permutació màxima
    return aleat(0n, pm - 1n)           // permutació aleatoria
}

/**
 * Converteix un big int a BASE la base definida al principi.
 * Per exemple si la base es hexadecimal, per iteracions aniria:
 * 1. r = 1018 % 16 = 10; s = "A" + "" = "A"; a = 1018 / 16 = 63
 * 2. r = 63 % 16 = 15; s = "F" + "A" = "FA"; a = 63 / 16 = 3
 * 3. r = 3 % 16 = 3; s = "3" + "FA" = "3FA"; a = 3 / 16 = 0
 * 
 * @param {bigint} n - un nombre enter qualsevol
 * @returns {string} s - el nombre codificat en BASE
 */
function bigabase(n){
    if (n === 0n) return "0";
    let a = n;
    let s = "";
    let b = BigInt(BASE.length);
    while (a > 0n) {
        let r = a % b; // residu
        s = BASE[Number(r)] + s;
        a = a / b;
    }
    return s;
}

/**
 * Converteix una cadena codificada en BASE al seu valor BigInt 
 * original. Per exemple si la base és hexadecimal i s = "3FA":
 * 1. c = "3" -> idx = 3;  n = (0 * 16) + 3 = 3
 * 2. c = "F" -> idx = 15; n = (3 * 16) + 15 = 63
 * 3. c = "A" -> idx = 10; n = (63 * 16) + 10 = 1018
 * 
 * @param {string} s - El nombre codificat en BASE
 * @returns {bigint} n - El nombre enter BigInt original
 */
function baseabig(s) {
    if (s === "" || s === "0") return 0n;
    
    let n = 0n;
    let b = BigInt(BASE.length);
    for (let i = 0; i < s.length; i++) {
        const idx = BASE.indexOf(s[i]);
        n = (n * b) + BigInt(idx);
    }
    
    return n;
}

/**
 * Desordena un array en base a un nombre de permutació.
 * Suposems que n = 5, així doncs per i = 0 → f = 4! = 4*3*2*1 = 24
 * i = 1, f = 3! = 6;  i = 2 → f = 2; i = 3 → f = 1; i = 4 → f = 0! = 1.
 * 
 * «perm» pot valer qualsevol valor entre 0 i 119 (= 5! - 1), suposarem 
 * 100, en aquest cas quan i = 0 (100/24) = 4 (ja que 100 i 4 estan 
 * definits com bigint), si ens fixem si «perm» val entre 0 i 23 «pos» 
 * sera 0, entre 24 i 47, 1, etc. Les posibilitats de que valgi 0, 1, 2, 
 * 3, o 4 són iguals. 
 * 
 * Com que pos ha resultat 0 posa el darrer element a la posició 0 del 
 * nou  array «ap» i treu l'element 4 de l'array «e». Si abans era 
 * ["a", "b", "c", "d", "e"], ara és ["a", "b", "c", "d"].
 * 
 * despres fa que «perm» valgui 100 % 24 = 4, les posibilitats de que 
 * «perm» valgui 0, 1, 2, ... 24 són iguals, ja que el valor anterior 
 * de «perm» podia ser 96, 97, 98, 99, 100, ... 119
 * 
 * @param {string[]} array - array a desordenar
 * @perm {bigint} perm - número de permutació (un nombre aleatori
 *   entre 0 i n! a on n és array.length
 * @returns {string[]} ap - array permutat (array desordenat)
 */ 
function permuta (array, perm){
    const ap = []; // array permutat
    const e = array.slice();  // copia de l'arr original.
    const n = e.length;

    for (let i = 0; i < n; i++) {
        const f = factorial(n - i - 1);
        let pos = Number(perm / f);
        ap.push(e[pos]);
        e.splice(pos, 1);
        perm %= f;
    }
    return ap;
}


/**
 * Converteix la posició numèrica d'una lletra en el seu caràcter 
 * alfabètic (1 = a, 2 = b, 3 = c, ...).
 * @param {number} nombre - La posició numèrica de la lletra (basada en 1)
 * @returns {string} El caràcter alfabètic corresponent en minúscula
 */
function lletra(nombre) {
    const ascii = 97; // Còdi ASCII d'«a»
    return String.fromCharCode(ascii + nombre - 1);
}


/**
 * Converteix un caràcter alfabètic en la seva posició numèrica 
 * corresponent (a = 1, b = 2, c = 3, ...).
 * 
 * @param {string} lletra - El caràcter de l'abecedari (admets majúscules i minúscules)
 * @returns {number} La posició numèrica (basada en 1)
 */
function nombre(lletra){
    return lletra.toLowerCase().charCodeAt() - 96;
}

/**
 * Obté la data i hora actual del sistema formatada segons la convenció 
 * @returns {string} Cadena de text amb la data local 
 *   (ex: "17/7/2026, 17:19:15")
 */
function data_local() {
    const ara = new Date();
    return ara.toLocaleString('ca-ES');
}

/**
 * Calcula el factorial d'un nombre com un bigint per evitar el 
 * desbordament de memòria.
 * @param {number|bigint} n - El nombre enter del qual es vol calcular 
 *   el factorial
 * @returns {bigint} El resultat del factorial (n!) en format BigInt
 */
function factorial(n) {
    let resultat = 1n;
    for (let i = 2n; i <= BigInt(n); i++) {
        resultat *= i;
    }
    return resultat;
}

/**
 * Genera un número enter aleatori criptogràficament segur dins d'un 
 * rang inclusiu. Implementa l'algorisme de rebuig amb màscara de bits 
 * per garantir una distribució uniforme.
 * @param {number|bigint} min - Valor mínim del rang (inclòs aquest)
 * @param {number|bigint} max - Valor màxim del rang (inclòs aquest)
 * @returns {bigint} Un número aleatori enter gran entre min i max
 */
function aleat(min, max){
    const rang = BigInt(max) - BigInt(min);
    const bitsNecessaris = rang.toString(2).length;
    const bytesNecessaris = Math.ceil(bitsNecessaris / 8);
    const buffer = new Uint8Array(bytesNecessaris);

    while (true) {
        crypto.getRandomValues(buffer);

        let numeroGenerat = 0n;
        for (let i = 0; i < buffer.length; i++) {
            numeroGenerat = (numeroGenerat << 8n) | BigInt(buffer[i]);
        }

        /* Apliquem la màscara per optimitzar els intents, ja que el
        número generat tindrà multibles de 8 bits */
        const mascara = (1n << BigInt(bitsNecessaris)) - 1n;
        numeroGenerat &= mascara;

        if (numeroGenerat <= rang) {
            return BigInt(min) + numeroGenerat;
        }
    }
}
