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
 * @property {int[]} s - solució
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
     * @param {string[]} s - Solucions
     * @param {string} r - Resposta (ex: "abcdn ccd")
     */
    constructor (s, r){
        this.s = s;
        this.n = s.length;
        this.r = r;
        if (Array.isArray(r)) {
            this.rn = r;
        } else if (typeof r === 'string') {
            this.rn = resposta_numerada(r);
        }
        this.pts = new Array(this.n);
        this.pts_str = new Array(this.n);
        this.pts_plus = new Array(this.n);
        this.pts_minus = new Array(this.n);
        this.ok = new Array(this.n);
        this.pts_obt = 0;
        this.pts_tot = 0;
        this.qualif = 0;
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
 * Exemple: suposem t.n_opc[i] = 3, t.p_opc = 3, so_pr[i] = 3
 * - ob = [1, 2, 3], ja que t.n_opc[i] = 3
 * - ob_r = [2, 3, 1], ja t.p_opc[i] = 3 ,
 * - sr[i] = 2 (ja que el 3 està a la segona posició). 
 * Al test original la resposta correcta era c) ara es b
 * 
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
    }
    return sr;
}

/**
 * Reordena els punts originals segons les dades de permutació.
 *  @param {number[]} so - Array de puntuacions originals 
 * (1=a, 2=b, 3=c...)
 * @param {TestReordenat} tr - Test ja reordenat
 * @returns {number[]} pts_r - Array amb les noves puntuacions en 
 * l'ordre de l'alumne
 */
function punts_reordenats(pts, tr){
    const pts_r = permuta(pts, tr.pp);
    return pts_r
}

 
/**
 * Corregeix un test depenent del nombre de respostes encertades, i del
 * nombre d'opcions de resposta 
 * @param {TestReordenat} t - test
 * @param {int[]} s - solució (ex: [3, 1, 2, ... la bona és la 3, la 
 * 1, ...).
 * @param {string} resp - cadena amb la resposta de l'alumne
 * @param {int[]} pts - punts de cada una de les preguntes
 * @returns {object} c - correcció 
 * */
function corregir_test(t, s, resp, pts){
    console.log(t);
    const c = new Correccio(s, resp);
    for(let i = 0; i < c.n; i++){
        c.pts_plus[i] = pts[i];
        c.pts_minus[i] = pts[i]/t.n_opc[i];
        c.pts_tot += pts[i];
        if (c.s[i] === 0){
            c.ok[i] = null;
            c.pts[i] = 0;
            c.pts_tot -= pts[i];
        }else if (c.rn[i] === 0){
            c.ok[i] = null;
            c.pts[i] = 0;
        }else if (c.s[i] === c.rn[i]){
            c.ok[i] = true;
            c.pts[i] = pts[i];
            c.pts_obt += pts[i];
        }else{
            c.ok[i] = false;
            c.pts[i] = -pts[i]/(t.n_opc[i] - 1);
            c.pts_obt -= pts[i]/(t.n_opc[i] - 1);
        }
        c.pts_str[i] = c.pts[i].toLocaleString('ca-ES', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    }
    c.qualif = trunca(c.pts_obt/c.pts_tot*10);
    if (c.qualif < 0) c.qualif = 0;
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





/* Reordena la resposta de l'alumne a la permutació original, com si
 * hagues respost la 0 :: 0.
 * Anem a suposar que tenim 5 preguntes, de 4 opcions de resposta cada
 * una, per tant idn seria:
 * [[1, 1, 2, 3, 4], [2, 1, 2, 3, 4], [3, 1, 2, 3, 4], [4, 1, 2, 3, 4],
 * [5, 1, 2, 3, 4]]
 * Suposem que la permutació de les preguntes fos 101, en aquest cas com 
 * s'ha vist a la funció array_pos el vector seria [4, 0, 2, 1, 0],
 * i per tant les preguntes es reodenarien:
 * idn = [[5, 1, 2, 3, 4], [1, 1, 2, 3, 4], [4, 1, 2, 3, 4], 
 * [3, 1, 2, 3, 4], [2, 1, 2, 3, 4]],
 * Ara suposem que les permutacions de respostes són [17, 10, 2, 5, 8],
 * aixo vol dir queel vector 2D de «les boles» seria [[2, 2, 1, 0], 
 * [1, 2, 0, 0], [0, 1, 0, 0], [0, 2, 1, 0], [1, 1, 0, 0]], com s'ha 
 * vist a la funció array_pos
 * Per tant, les preguntes reordenades amb les opcions també reordenades
 * seria:
 * idn_r = [[5, 3, 4, 2, 1], [1, 2, 4, 1, 3], [4, 1, 3, 2, 4], 
 * [3, 1, 4, 3, 1], [2, 2, 3, 1, 4]].
 * Suposem que l'alumne fa r = "caabn" → rn = [3, 1, 1, 2, 0].
 * Si l'alumne contesta a la pregunta reordenada 1 (i=0), es a dir 
 * idn_r[0] = [5, 3, 4, 2, 1], amb una c (es a dir 3), això
 * vol dir que ha contestat realment a la pregunta 5 amb una b al test
 * original.
 * L'algoritme fa, 
 * - per i = 0:
 *     + a = idn_r[0][0]-1 = 5-1 = 4
 *     + b = rn[0] = 3
 *     + c, b !=0 → c = ind_r[0][3] = 2 → b (al test original)
 * - i = 1: a = idn_r[1][0]-1 = 0; b = rn[1] = 1; c = ind_r[1][1] = 2
 * 
 * @param {string} r - resposta tipus "abcdn abcdn"
 * @param {TestReordenat} t - test reordenat a la permutació 0 :: 0
 * @param {TestReordenat} p - permutació que li va tocar a l'alumne
 * @returns {int[]} roo - resposta ordre original com si hagues 
 *     contestat la 0 :: 0
 */
function resp_perm_orig(r, t, p){
    const rn = resposta_numerada(r);
    const idn = crear_idn(t);
    const idn_r = test_reordenat(idn, p).arr_preg;
                                                
    const roo = new Array (t.np);
    for (let i = 0; i < t.np; i++){
        const a = idn_r[i][0]-1;
        const b = rn[i];
        const c = b === 0 ? 0 : idn_r[i][b];
        roo[a] = c;      
    }
    return roo;
}

/** Crea [[1, 1, 2, 3, ...], [2, 1, 2, 3, ...]], que representa 
 * [["P1", "a)", "b)", "c)", ...], ["P2", "a)", "b)", "c)"]]
 */
function crear_idn(t){
    console.log(t);
    const idn = new Array (t.np);
    console.log (idn);
    for (let i = 0; i < t.np; i++){
        const noo = t.n_opc[i];
        idn[i] = new Array (noo + 1);
        idn[i][0] = i+1;
        for (let j = 0; j < noo; j++){
            idn[i][j+1] = j+1;
        }
    }
    return idn;
}
    
