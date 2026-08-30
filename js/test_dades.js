"use strict";

/**
 * @typedef {Object} TestReordenat
 * @property {bigint} pp - Enter de permutació de les preguntes
 * @property {bigint[]} p_opc - Array amb les permutacions de les 
 *   opcions per cada pregunta
 * @property {number} np - Nombre total de preguntes del test
 * @property {number[]} n_opc - Array amb el nombre d'opcions de 
 *   resposta per a cada pregunta
 * @property {string[][]} arr_preg - Matriu final de preguntes i 
 *   respostes completament mesclades
 * @property {string} str_perm - String de la permutació codificada en 
 *   BASE (ex: "4YEQV J7 :: 6KXWC 2DXYF 39YAA D0XEQ 4K2YP")
 */

/**
 * Classe que genera i encapsula un test reordenat a partir del test 
 * original (anomenat to {sting[][]} i dels enters pp i p_opc.
 */
class TestReordenat {
    /**
     * @param {string[][]} to - Test original sencer
     * @param {bigint} pp - Enter de permutació de les preguntes
     * @param {bigint[]} p_opc - Array de permutacions de les opcions per cada pregunta
     */
    constructor(to, pp, p_opc) {        
        const pr = preguntes_reordenades(to, pp);
        const n_opc = numero_opcions(pr);        
        const i_opc = array_a_int(p_opc, n_opc);
        
        this.pp = pp;
        this.p_opc = p_opc;
        this.np = to.length;
        this.n_opc = n_opc;
        this.arr_preg = opcions_reordenades(pr, p_opc);
        this.str_perm = codifica(pp, i_opc);
    }
}

/**
 * @typedef {Object} Correccio
 * @property {int[]} sr - solució reordenada
 * @property {string} r - resposta de l'alumne (ex: "abcdn ccd")
 * @property {int[]} rn - resposta numerada
 * @property {int[]} pts_plus - punts per encertar la pregunta
 * @property {int[]} pts_minus - punts per fallar la pregunta
 * @property {boolean[]} ok - true: correcta, false: incorrecta
 * @property {float} pts_obt - punts obtinguts
 * @property {float} pts_tot - punts totals (màxim de punts del test)
 */
class Correccio {
    /**
     * @param {string[]} sr - Solucions reordenades
     * @param {string} r - Resposta (ex: "abcdn ccd")
     */
    constructor (sr, r){
        this.sr = sr;
        this.r = r;
        this.rn = resposta_numerada(r);
        this.pts = new Array(sr.length);
        this.pts_str = new Array(sr.length);
        this.pts_plus = new Array(sr.length);
        this.pts_minus = new Array(sr.length);
        this.ok = new Array(sr.length);
        this.pts_obt = 0;
        this.pts_tot = 0;
    }
}
 
/**
 * Aleatoritza un array que conté les preguntes i les ocions de resposta
 * d'un exercici o examen tipus test.
 * De tal manera que la pregunta 1 de n'Aina és la 5 d'en
 * Biel, però si les comparen l'opció de resposta a) de la pregunta 1
 * de n'Aina és la c) de la pregunta 5 d'en Biel.
 * 
 * @param {string[][]} to - test original
 * @returns {TestReordenat} t - test aleatoritzat amb l'array
 *   ja reordenat i la permutació que permet corregir-lo.
 */
function test_aleatoritzat(to){
      
    const np = to.length;
    const pp = permutacio_preguntes(np);

    const pr = preguntes_reordenades(to, pp);
    const n_opc = numero_opcions(pr);
    const p_opc = permutacions_opcions(n_opc);

    const t = new TestReordenat(to, pp, p_opc);
    return t;
}

/**
 * Reordena un array que conté les preguntes i les ocions de resposta
 * d'un exercici o examen tipus test segons una permutacio d'un test ja 
 * generat, per a que el nou array tingui el mateix ordre que aquell
 * array aleatori.
 * 
 * @param {string[][]} to - test original
 * @param {string} p - permutació de la forma 4YE :: 6KXWC 2DXYF 39YA
 *   permutacio i la resposta de l'alumne
 * @returns {TestReordenat} t - test reordenat
 */
function test_reordenat(to, p){
    const np = to.length;
    const pp = descodifica_permutacio_preguntes(p);
    
    const pr = preguntes_reordenades(to, pp);
    const n_opc = numero_opcions(pr);
    const i_opc = descodifica_permutacio_opcions(p);
    const p_opc = int_a_array(i_opc,n_opc);
    
    const t = new TestReordenat(to, pp, p_opc);
    return t;
}


/** 
 * Obté un numero aleatori entre 0 i np! (a on np! és el factorial
 * del nombre de preguntes), aquest nombre determinarà com s'aleatoritza
 * el test.
 * 
 * @param {string[][]} to - test original.
 * @returns {int} pp - permutació preguntes, enter que determina com 
 *   s'han d'ordenar les preguntes.
 */
function permutacio_preguntes(np){
    const pp = perm_aleat(np);
    return pp;
}

/** 
 * Retorna un array amb només les preguntes aleatoritzades, es a dir
 * torna un array de la forma:
 * [
 * ["Preg 5", "opcio a)", "opcio b)", "opcio c)"],
 * ["Preg 7", "ocio a)", "opcio b)"], 
 * ...
 * ]
 * S'observa que les opcions encara estan ordenades.
 * 
 * @param {string[][]} to - test original
 * @param {int} pp - permutacio preguntes
 * @returns {string[][]} pr - preguntes aleatoritzades
 */
function preguntes_reordenades(to, pp){
    const pr = permuta(to, pp);
    return pr;
}

/** 
 * Torna el número d'opcions que hi ha a cada pregunta. El numero 
 * d'opcions el la longitud de del subarray pr[i] menys 1, ja que el 
 * primer element és la pregunta.
 * 
 * @param {string[][]} pr - preguntes reordenades
 * @returns {int[]} n_opc - número d'opcions per cada pregunta
 */
function numero_opcions(pr){
    let n_opc = [];
    for (let i = 0; i < pr.length; i++){
        /* El numero d'opcions el la longitud de del subarray pr[i] 
         * menys 1, ja que el primer element és la pregunta */
        n_opc.push(pr[i].length - 1);
    }
    return n_opc;
}


/** 
 * Obté un array amb els diferents números de permutacions de les
 * opcions. És a dir, números aleatoris entre 0 i no! (a on no! és 
 * el factorial del nombre d'opcions.
 * 
 * @param {int[]} n_opc - array amb el nombre d'opcions de resposta
 *   per cada pregunta.
 * @returns {bigint[]} p_opc - permutació de les opcions (un array de
 *   enters que representen com es mesclaran cada una de les opcions
 *   de resposta).
 */ 
function permutacions_opcions(n_opc){
    const p_opc = [];
    for (let i = 0; i < n_opc.length; i++){
        const po = perm_aleat(n_opc[i]);
        p_opc.push(po);
    }
    return p_opc;
}



/** 
 * A partir d'una matriu de preguntes i respostes, a on les preguntes
 * ja estan aleatoritzades, desordena també les opcions de resposta
 * de cada una de les preguntes en funció d'una serie d'enters aleatoris
 * que son les permutacions de les opcions de cada pregunta.
 * 
 * @param {string[][]} pa - preguntes aleatoritzades (files mesclades,
 *   però no les columnes).
 * @param {bigint[]} p_opc - permutació de les opcions (un array de
 *   enters que representen com es mesclaran cada una de les opcions
 *   de resposta).
 * @returns {string[][]} a - array 2D amb tot (tant les preguntes com
 *   les opcions aleatoritzades).
 */
function opcions_reordenades(pa, p_opc){
    const a = [];
    for (let i = 0; i < pa.length; i++){
        const p = pa[i][0];
        const opc = permuta(pa[i].slice(1), p_opc[i]);
        a.push([p].concat(opc));
    }
    return a;
}


/**
 * Reordena i recalcula les solucions originals segons les dades de 
 * permutació.
 * @param {number[]} so - Array de solucions originals 
 * (1=a, 2=b, 3=c...)
 * @param {TestReordenat} t - Test ja reordenat
 * @returns {number[]} sr - Array amb les noves solucions en l'ordre 
 *   de l'alumne
 * @example
 * const so = [1, 2]; // Pregunta 1 -> 'a' (1), Pregunta 2 -> 'b' (2)
 * const sr = solucions_reordenades(so, pp, p_opc, n_opc);
 *   // Retorna, per exemple: [3, 1]
 */
function solucions_reordenades(so, t) {
    const so_pr = permuta(so, t.pp);
    const sr = [];

    for (let i = 0; i < so_pr.length; i++) {
        // ob: Opcions Base (crea un array [1, 2, 3...])
        const ob = [];
        for (let j = 1; j <= t.n_opc[i]; j++) {
            ob.push(j);
        }
        const ob_r = permuta(ob, t.p_opc[i]);
        const s = ob_r.indexOf(so_pr[i]) + 1;
        sr.push(s);
        
        /* Exemple: suposem t.n_opc[i] = 3, t.p_opc = 3, so_pr[i] = 3
         * - ob = [1, 2, 3], ja que t.n_opc[i] = 3
         * - ob_r = [2, 3, 1], ja t.p_opc[i] = 3 ,
         * - sr[i] = 2 (ja que el 3 està a la segona posició). 
         * Al test original la resposta correcta era c) ara es b)*/ 
    }
    return sr;
}

 
/**
 * Corregeix un test depenent del nombre de respostes encertades, i del
 * nombre d'opcions de resposta 
 * @param {TestReordenat} tr - test reordenat
 * @param {int[]} sr - solució reordenada (ex: [3, 1, 2, ... la bona 
 *   és la 3, la 1, ...).
 * @param {string} resp - cadena amb la resposta de l'alumne
 * @param {int[]} pts - punts de cada una de les preguntes
 * @returns {object} c - correcció 
 * */
function corregir_test(tr, sr, resp, pts){
    const c = new Correccio(sr, resp);
    const pts_pr = permuta(pts, tr.pp);
    for(let i = 0; i < sr.length; i++){
        c.pts_plus[i] = pts_pr[i];
        c.pts_minus[i] = pts_pr[i]/tr.n_opc[i];
        c.pts_tot += pts_pr[i];
        if (c.rn[i] === 0){
            c.ok[i] = null;
            c.pts[i] = 0;
        }else if (c.sr[i] === c.rn[i]){
            c.ok[i] = true;
            c.pts[i] = pts_pr[i];
            c.pts_obt += pts_pr[i];
        }else{
            c.ok[i] = false;
            c.pts[i] = -pts_pr[i]/(tr.n_opc[i] - 1);
            c.pts_obt -= pts_pr[i]/(tr.n_opc[i] - 1);
        }
        c.pts_str[i] = c.pts[i].toLocaleString('ca-ES', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    }
    return c;
}

/** 
 * Si la resposta és "abcna bbc", la passa a [1, 2, 3, 0, 1, 2, 2, 3]
 * @param {string} resp - resposta
 * @returns {int[]} rn - resposta amb forma de números
 */
function resposta_numerada(resp){
    const rn = [];
    const l = resp.replaceAll(' ', '').split(""); 
    for(let i = 0; i < l.length; i++){
        const lletra = l[i];
        if (lletra == 'n') rn.push(0);
        else rn.push(nombre(lletra));
    }
    return rn;
}
    
