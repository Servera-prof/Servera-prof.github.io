"use strict";

const BASE = "0123456789ABCDEFGHJKMNPQRTVWXY"

window.onload = renderitza;

function renderitza(){
    const preenunciat = document.getElementById("enunciat").value;
    const html = genera_html_texme(preenunciat, titol, test_original);
    
    document.getElementById("titol").innerText = titol; 
    document.getElementById("enunciat").innerHTML = html;
    texme.renderPage();
}


function genera_html_texme(preenunciat, titol, test_original){
    let html = "";
    const t = test_aleatoritzat(test_original);
    
    html = '<h1 align ="center">' + titol + "</h1>\n" +
          preenunciat;
    html += [
      '<pre><b>Permutació:</b>' + t.permutacio + '</pre>',
      '<h2>Preguntes</h2>',
      html_preguntes(t.array_preguntes),
      '<h2>Resposta</h2>',
      formulari_respostes(t),
      '<h2>Identificacio de l\'alumne</h2>',
      crear_identificacio()
    ].join("\n");
    return html;
}



/**
 * Aleatoritza un array que conté les preguntes i les ocions de resposta
 * d'un exercici o examen tipus test.
 * De tal manera que la pregunta 1 de n'Aina és la 5 d'en
 * Biel, però si les comparen l'opció de resposta a) de la pregunta 1
 * de n'Aina és la c) de la pregunta 5 d'en Biel.
 * 
 * L'array ha de tenir la forma:
 * [
 * ["Preg 1", "opcio a)", "opcio b)", "opcio c)"],
 * ["Preg 2", "opcio a)", "opcio b)", "opcio c)", "ocio d)"],
 * ...
 * ]
 * 
 * També torna un string amb un codi derivat de la permutació utilitzada
 * per a poder reordenar l'array de cara a la correcció.
 * 
 * @ param {string[][]} to - test original
 * @ returns {{string[][], string}} t - test aleatoritzat amb l'array
 *   ja reordenat i la permutació que permet corregir-lo.
 */
function test_aleatoritzat(to){
    const t = {
        array_preguntes: [],
        permutacio: ""
    }
    const pp = permutacio_preguntes(to);
    const pa = preguntes_aleatoritzades(to, pp);
    const n_opc = numero_opcions(pa);
    const p_opc = permutacions_opcions(n_opc);
    const i_opc = array_a_int(p_opc, n_opc);
    t.array_preguntes = opcions_aleatoritzades(pa, p_opc);
    t.permutacio = codifica(pp, i_opc);
    return t;
}

/** 
 * Obté un numero aleatori entre 0 i np! (a on np! és el factorial
 * del nombre de preguntes), aquest nombre determinarà com s'aleatoritza
 * el test.
 * 
 * @ param {string[][]} to - test original.
 * @ returns {int} - enter que determina com s'han d'ordenar les 
 *   preguntes.
 */
function permutacio_preguntes(to){
    const np = to.length;
    return perm_aleat(np);
}

/** Retorna un array amb només les preguntes aleatoritzades, es a dir
 * torna un array de la forma:
 * [
 * ["Preg 5", "opcio a)", "opcio b)", "opcio c)"],
 * ["Preg 7", "ocio a)", "opcio b)"], 
 * ...
 * ]
 * S'observa que les opcions encara estan ordenades.
 * 
 * @ param {string[][]} to - test original
 * @ param {int} pp - permutacio preguntes
 * @ returns {string[][]} pa - preguntes aleatoritzades
 */
function preguntes_aleatoritzades(to, pp){
    return permuta(to, pp);    
}

/** Torna el número d'opcions que hi ha a cada pregunta. El numero 
 * d'opcions el la longitud de del subarray pa[i] menys 1, ja que el 
 * primer element és la pregunta.
 * 
 * @ param {string[][]} pa - preguntes aleatoritzades
 * @ returns {int[]} n_opc - número d'opcions per cada pregunta
 */
function numero_opcions(pa){
    let n_opc = [];
    for (let i = 0; i < pa.length; i++){
        /* El numero d'opcions el la longitud de del subarray pa[i] 
         * menys 1, ja que el primer element és la pregunta */
        n_opc.push(pa[i].length - 1);
    }
    return n_opc;
}


/** 
 * Obté un array amb els diferents numeros de permutacions de les
 * opcions. És a dir, números aleatoris entre 0 i no! (a on no! és 
 * el factorial del nombre d'opcions.
 * 
 * @ param {int[]} no - array amb el nombre d'opcions de resposta
 *   per cada pregunta.
 * @ returns {bigint[]} p_opc - permutació de les opcions (un array de
 *   enters que representen com es mesclaran cada una de les opcions
 *   de resposta).
 */ 
function permutacions_opcions(no){
    const p_opc = [];
    for (let i = 0; i < no.length; i++){
        const po = perm_aleat(no[i]);
        p_opc.push(po);
    }
    return p_opc;
}


/** 
 * Codifica les respostes a un int. Per entendre això cal pensar que si
 * a la primera pregunta jo tinc 3 opcions, llavors el màxim de
 * permutacions són 3! = 6. Suposem que em toca la permutació 4; per la
 * segona em toca 113 de 5! i per la tercera 233 de 6!
 * Jo ho podria codificar com 4.113.233, també com 233.113.004 
 * o el que seria el mateix 233 * 10**6 + 133 * 10**3 + 4. Però amb el
 * 4 s'observa que malbarato espai, no es necessari fer-li lloc per 1000
 * opcions ja que el maxim és 3! = 6. Per tant podria escriure:
 * 233*120*6+113*6+4 = 168.442
 * 
 * @ param {bigint[]} po - array amb les permutacions de les opcions
 *   per a cada resposta.
 * @ param {int[]} no - array amb el número d'opcions per a cada 
 *   resposta
 * @ returns {int} ip - enter amb totes les permutacions combinades.
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
 * A partir d'una matriu de preguntes i respostes, a on les preguntes
 * ja estan aleatoritzades, desordena també les opcions de resposta
 * de cada una de les preguntes en funció d'una serie d'enters aleatoris
 * que son les permutacions de les opcions de cada pregunta.
 * 
 * @ param {string[][]} pa - preguntes aleatoritzades (files mesclades,
 *   però no les columnes).
 * @ param {bigint[]} p_opc - permutació de les opcions (un array de
 *   enters que representen com es mesclaran cada una de les opcions
 *   de resposta).
 * @ returns {string[][]} a - array 2D amb tot (tant les preguntes com
 *   les opcions aleatoritzades).
 */
function opcions_aleatoritzades(pa, p_opc){
    const a = [];
    for (let i = 0; i < pa.length; i++){
        const p = pa[i][0];
        const opc = permuta(pa[i].slice(1), p_opc[i]);
        a.push([p].concat(opc));
    }
    return a;
}

/**
 * Codifica dos bigint a BASE. Per exemple si pp = 6 i ip =  168.442
 * ho codificaria com 6 :: 674P
 * 
 * @ param{bigint} pp - permutacio preguntes
 * @ param{bigint} ip - integer permutacio de les opcions de resposta. 
 *   Es a dir, totes les permutacions de les opcions codificades a un 
 *   sol enter
 * @ returns {string} - permutació de les preguntes i opcions de
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
 * Obté un nombre de permutació aleatoria donat un nombre d'elements.
 * Per exemple si hi ha 5 elements hi ha 5! = 120 posibilitats 
 * d'ordenar-los, la funció podria tornar qualsevol valor entre 0 i 119.
 * @ param {number[]} ne - nombre d'elements
 * @ returns {bigint[]} p - permutació aleatoria
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
 * @ param {bigint} n - un nombre enter qualsevol
 * @ returns {string} s - el nombre codificat en BASE
 */
function bigabase(n){
    if (n === 0n) return "0";
    let a = n;   // numerador
    let s = ""; // string amb el nombre codificat en BASE
    let b = BigInt(BASE.length);
    while (a > 0n) {
        let r = a % b; // residu
        s = BASE[Number(r)] + s;
        a = a / b;
    }
    return s;
}

/**
 * Desordena un array en base a un nombre de permutació
 * @ param {string[]} array - array a desordenar
 * @ perm {bigint} perm - número de permutació (un nombre aleatori
 *   entre 0 i n! a on n és array.length
 * @ returns {string[]} ap - array permutat (array desordenat)
 */ 
function permuta (array, perm){
    const ap = []; // array permutat
    const e = array.slice();  // copia de l'arr original.
    const n = e.length;

    for (let i = 0; i < n; i++) {
        /* per i = 0, suposant n = 5, f = 4! = 4*3*2*1 = 24
         * per i = 1, f = 3! = 6; per i = 2 , f = 2! = 2;
         * per i = 3, f = 1! = 1; per i = 4 f = 0! = 1 */
        const f = factorial(n - i - 1);
        /* 
         * «perm» pot valer qualsevol valor entre 0 i 5! (que és 119), 
         * suposarem 100, en aquest cas quan i = 0 floor(100/24) = 4, 
         * si ens fixem si «perm» val entre 0 i 23 «pos» sera 0, 
         * entre 24 i 47, 1, etc.
         * Les posibilitats de que valgi 0, 1, 2, 3, o 4 són iguals;
         */
        let pos = Number(perm / f);
        /*
         * així que posa el darrer element a la posició 0 del nou 
         * array «ap» i treu l'element 4 de l'array «e».
         * Si abans era ["a", "b", "c", "d", "e"], 
         * ara és ["a", "b", "c", "d"].
         */
        ap.push(e[pos]);
        e.splice(pos, 1);
        /* 
         * despres fa que «perm» valgui 100 % 24 = 4, les posibilitats
         * de que «perm» valgui 0, 1, 2, ... 24 són iguals, ja que 
         * el valor anterior de «perm» podia ser 96, 97, 98, 99, 100, 
         * ... 119 
         */
        perm %= f;
    }
    return ap;
}

/**
 * A Partir d'un array del tipus [["Pregunta 4", "c)", "a)", "b"], 
 * ["Pregunta 2", "b)"...], ...], crea un html que escriu aquestes
 * preguntes com una llista que te el format d'un test classic redactat.
 * @ param {string[]} p - array de preguntes i opcions de respostes
 * @ returns {string} html - text html amb una paragrafs (preguntes)
 *   seguit d'una llista de respostes.
 */
function html_preguntes(p){
    let html = "";
    for (let i = 0; i < p.length; i++){
        html += 
          '<p class="pregunta">' + 
          '  <b>' + (i+1) + '.</b> ' + p[i][0] + 
          '</p>' +
          '<ol style="list-style-type: none;">';
        for (let j = 1; j < p[i].length; j++){
            html +=
              '<li class="test">' +
              '  <span><i>' + lletra(j) + '</i>) ' + '</span>' +
              '  <span style="flex: 1;">' + p[i][j] + '</span>' +
              '</li>';     
        }
        html += "</ol>"
    }
    return html;
}

/**
 * A Partir d'un array del tipus [["Pregunta 4", "c)", "a)", "b"], 
 * ["Pregunta 2", "b)"...], ...], crea un html que genera un formulari
 * basat en radio buttons que permet triar una o altra resposta.
 * 
 * @ param {string[]} p - array de preguntes i opcions de respostes
 * @ returns {string} html - text html amb una formulari que permet
 *  triar una resposta.
 */
function formulari_respostes(test){
    const p = test.array_preguntes;
    let html = "";
    let resp = "";
    for (let i = 0; i < p.length; i++){
        resp += "n";
        if ((i+1) % 5 == 0 && i != p.length -1) resp += " ";
    }

    html += [
        '<table id="table_resp">',
        ''
    ].join("\n");
    
    for (let i = 0; i < p.length; i++){
        const esmeitat = i>= Math.ceil(p.length/2);
        const multiple5 = ((i+1) % 5) == 0;
        const esultima = i == p.length - 1;
        html += [ 
          '  <tr>',
          '    <td><b>' + (i + 1) + '. </b></td>',
          '    <td>',
          ''
        ].join("\n");
        for (let j = 1; j < p[i].length; j++){
            html += [ 
              '      '+
              '<label>' + 
                '<input type="radio" value="' + lletra(j) + 
                '" name="p' + (i + 1) + '" '+
                'onchange="actualitza_resp()">' + lletra(j) + 
              '</label>',
              ''
            ].join("\n");
        }
        html += [
              '      ' +
              '<label>' + 
              '<input type="radio" value="n"' + 
              ' name="p' + (i + 1) + '"' + 
              'onchange="actualitza_resp()">' + 'n/s ' +
              '</label>'
        ].join("\n");        
        html += [
          '    </td>',
          '  </tr>',
          ''
        ].join("\n");
    }
    html += [
        '</table>',
        '<pre>',
        '<b>ES GUARDARAN LES SEGÜENTS DADES</b>',
        '  <b>- Nom alumne: </b><span id="nom_span">' +
          'ALERTA! Recorda escriure el teu nom' +
        '  </span>',
        '  <b>- Resposta de l\'alumne:</b> ' +
          '<span id="resp_span">' + resp + '</span>',
        '  <b>- <i>Timestamp</i> inici test: </b>' +
          '<span id="t_ini_span">' + data_local() + '</span>',
         '  <b>- <i>Timestamp</i> final test: </b>' +
          '<span id="t_fi_span">' + data_local() + '</span>',
        '  <b>- Permutació:</b> ' + 
          '<span id="perm_span">' + test.permutacio + '</span>',
        '</pre>',
    ].join("\n");
    return html;
}



function crear_identificacio(){
const html =  `
<form id="avalua" onsubmit="event.preventDefault() & avalua()">
    <label>Nom de l'alumne: </label>
    <input id="nom" oninput="actualitza_nom()" style="width: 400px"/>
    <div>
        <input type="checkbox" id="informat" required/>
        <label>
            Entenc que al premer el botó avaluar no es pot tornar
            enrera.
        </label>
    </div>
    <br/>
    <div style="text-align: center;">
        <button type="submit" id="boto"
            style="font-size: 20px; color: #AA5050;">
            Avaluar
        </button>
    </div>
</form>
`; 
return html;
}

function actualitza_resp(){
    const resp_span = document.getElementById("resp_span");
    const t_fi_span = document.getElementById("t_fi_span");
    const np = resp_span.innerHTML.replaceAll(' ','').length;
    let resp = "";
    for (let i = 0; i < np; i++){
        const resp_selec =                     
            document.querySelector(
                'input[name="p' +
                (i+1) + 
                '"]:checked'
            );
        if (resp_selec) resp += resp_selec.value;
        else resp += "n";
        if ((i+1) % 5 == 0 && i != np -1 ) resp += " ";
    }
    resp_span.innerHTML = resp;
    t_fi_span.innerHTML = data_local();
}

function actualitza_nom(){
    const nom = document.getElementById("nom").value;
    document.getElementById("nom_span").innerHTML = nom;
    document.getElementById("t_fi_span").innerHTML = data_local();
}

function avalua(){
    actualitza_nom();
    const dades = importaRespostes();
    resetejar();
    renderAvaluacio(dades);
}

function importaRespostes(){
    const dades = {
        nom: document.getElementById("nom_span").innerHTML,
        resp: document.getElementById("resp_span").innerHTML,
        t_ini:  document.getElementById("t_ini_span").innerHTML,
        t_fi:  document.getElementById("t_fi_span").innerHTML,
        perm: document.getElementById("perm_span").innerHTML,
    };
    return dades;
}

function resetejar(){
    const ppal = document.getElementsByTagName("main")[0];
    const body = ppal.parentNode;
    const textArea = body.appendChild(document.createElement("textarea"));
    body.removeChild(ppal);
    textArea.setAttribute("id", "avaluacio");
}

function renderAvaluacio(d){
    const txt = [
      '<img src="../img/top.svg" class="fons top">',
      '<img src="../img/down.svg" class="fons down">',
      '<h1 align="center">Avaluació</h1>',
      '<h2 align="center" style="color: #888">' + titol + '</h2>',
      '',
      'El test ha finalitzat, l\'alumne ha **d\'entregar:** ',
      '- el justificant (fes click al botó «💾 Justificant»,',
         'tria «Desar com PDF», evita Microsoft PDF)',
      '- l\'Screencapture (si aquest test és part d\'un exàmen',
      'fent clic a «stop recording» i després clic al',
      'botó **negre** que diu «Download», **NO** s\'ha de clicar als',
      'botons verds.',
      '',
      'En breu es posarà a la disposició de l\'alumne la qualificació',
      'i, si és possible, el comprovador del test.',
      '',
      '<pre>',
      '<b>RESPOSTA</b>',
      '',
      '<b>- Alumne: </b>' + d.nom,
      '<b>- Resposta: </b>' + d.resp,
      '<b>- <i>Timestamp</i> inici test: </b>' + d.t_ini,
      '<b>- <i>Timestamp</i> final test: </b>' + d.t_fi,
      '<b>- Permutació: </b>' + d.perm,
      '</pre>',
      '',
      '<div style="text-align: center;">',
      '<button type="submit" id="boto"' +
        ' onclick="window.print()"' +
        ' style="font-size: 20px; color: #AA5050;">',
        ' 💾 Justificant ',
      '</button>',
      '</div>'
    ].join("\n");

    document.getElementById("avaluacio").innerHTML = txt;
    texme.renderPage();
}

function lletra(nombre) {
    const ascii = 97; // Còdi ASCII d'«a»
    return String.fromCharCode(ascii + nombre - 1);
}

function data_local() {
    const ara = new Date();
    return ara.toLocaleString('ca-ES');
}

function factorial(n) {
    let resultat = 1n;
    for (let i = 2n; i <= BigInt(n); i++) {
        resultat *= i;
    }
    return resultat;
}

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
