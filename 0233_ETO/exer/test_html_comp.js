"use strict";

function renderitza(){
    const proleg = document.getElementById("md").value
    const html = formulari_comprovador(titol, proleg);
    
    document.getElementById("md").innerHTML = html;
    document.getElementById("titol").innerText = titol;
    texme.renderPage();
}

/**
 * Genera l'estructura HTML del formulari d'entrada per a la correcció 
 * del test.
 * @param {string} titol - El títol principal del test.
 * @param {string} proleg - Text introductori o instruccions 
 *   (en format Markdown/text).
 * @returns {string} html - Codi HTML amb el títol, pròleg i formulari 
 *   d'avaluació.
 */
function formulari_comprovador(titol, proleg){
    let html = ['',
      '<h1 align="center"> Comprovador </h1>',
      '<h2 align="center" style="color: #888">' + titol + '</h2>',
      proleg,
    ].join("\n");
    
    html += ['',
      '<form id="avalua" onsubmit="event.preventDefault() ' +
        '& avalua()" class="academic-form">',
        
      '',
      '<div class="form-group">',
      '  <label>Nom de l\'alumne: </label>',
      '  <input id="nom" style="width: 400px"',
      '   placeholder="Tomàs de Terra García"/>',
      '</div>',
      
      '',
      '<div class="form-group">',
      '  <label>Permutació: </label>',
      '  <input id="perm" style="width: 400px"',
      '   placeholder="4YEQV J7 :: 6KXWC 2DXYF 39YAA D0XEQ 4K2YP"/>',
      '</div>',
      
      '',
      '<div class="form-group">',
      '  <label>Resposta: </label>',
      '  <input id="resp" style="width: 400px"',
      '   placeholder="nancn abdef aabn"/>',
      '</div>',
      
      '',
      '<br/>',
      '<div class="form-actions">',
      '  <button type="submit" id="boto"> Avaluar </button>',
      '</div>',
      '</form>'
    ].join("\n");
    return html;
}

/**
 * Recull els inputs de l'estudiant del formulari HTML, 
 * executa els algorismes de correcció i 
 * crida la funció per renderitzar els resultats de l'avaluació.
 * @global {string[][]} test_original - L'array del test original 
 *   definit globalment.
 * @global {number[]} solucions_originals - Les respostes correctes 
 *   del test original.
 * @global {number[]} punts_preguntes - La puntuació assignada a cada 
 *   pregunta del test original.
 */
function avalua(){
    // Constants que procedeixen de l'arxiu html
    const to = test_original;
    const so = solucions_originals;
    const pts = punts_preguntes;    
    
    const nom = document.getElementById('nom').value;
    const perm = document.getElementById('perm').value;
    const resp = document.getElementById('resp').value;
    
    const tr = test_reordenat(to, perm);
    const sr = solucions_reordenades(so, tr);
    const c = corregir_test(tr, sr, resp, pts);
    resetejar();  // està a test_html.js
    render_avaluacio(nom, tr, c);
}

function resetejar(){
    const ppal = document.getElementsByTagName("main")[0];
    const body = ppal.parentNode;
    const textArea = body.appendChild(document.createElement("textarea"));
    body.removeChild(ppal);
    textArea.setAttribute("id", "avaluacio");
}

/**
 * Genera i injecta l'HTML de la puntuació obtinguda i el desglòs de 
 * cada pregunta corregida.
 * @param {TestReordenat} tr - El test adaptat a la reordenació de 
 *   l'alumne.
 * @param {Correccio} c - L'objecte que conté els resultats del càlcul 
 *   de la correcció.
 * @global {string} titol - El títol global del test.
 * @global {Object} texme - Instància global per forçar el re-processat 
 *   dels continguts LaTeX/MD.
 */
function render_avaluacio(nom, tr, c){
    let html = ['',
      '<h1 align="center"> Correcció </h1>',
      '<h2 align="center" style="color: #888">' + titol + '</h2>',
    ].join("\n");
    html += html_puntuacio(nom, tr, c);
    html += html_preguntes_corregides(tr, c);
    
    document.getElementById("avaluacio").innerHTML = html;
    texme.renderPage();
}

function html_puntuacio(nom, tr, c){
    const html = ['',
      '<pre>',
        "L'alumne <b>" + nom + '</b>' + " ha aconseguit " + 
        trunca(c.pts_obt) + " punts de " + 
        c.pts_tot + " punts possibles." + 
        " Per tant obté una qualificació de <b>" +  
        trunca(c.pts_obt/c.pts_tot*10) + "</b> sobre 10.",
        "<br/>",
        "<b>DADES APORTADES</b>",
        "  <b> - Nom:</b> " + nom,
        "  <b> - Resposta:</b> " + c.r,
        "  <b> - Permutació:</b> " + tr.str_perm,
      '</pre>'
    ].join("\n");
    return html;
}
    

/**
 * Recorre totes les preguntes del test de l'alumne i n'acumula l'HTML 
 * depenent del seu estat.
 * @param {TestReordenat} tr - El test reordenat per l'alumne.
 * @param {Correccio} c - Les dades de la correcció.
 * @returns {string} El codi HTML de tot el llistat de preguntes 
 *   comentades i corregides.
 */
function html_preguntes_corregides(tr, c){
    let html = "";
    const p = tr.arr_preg;
    for (let i = 0; i < tr.np; i++){
        if (c.sr[i] == 0) html += preg_anulada(p, i);
        else if (c.rn[i] == 0) html += preg_sense_resp(p, i, c);
        else if (c.ok[i]) html += preg_correcta(p, i, c);
        else if (!c.ok[i]) html += preg_incorrecta(p, i, c);
    }
    console.log(html);
    return html;
}

/**
 * Genera l'HTML d'una pregunta que ha estat anul·lada a nivell de 
 * test (solució = 0).
 * @param {string[][]} p - Array de preguntes reordenades
 *   ex: ['Pregunta 3', 'opc a)', 'opc b)', ...].
 * @param {number} i - L'índex o número de la pregunta (basat en 0).
 * @returns {string} Codi HTML amb els estils de pregunta nul·la.
 */
function preg_anulada(p, i){
    let html = html_preg(p, i, 'nula', 'nula', '');
    html += '\n\n<table class ="opc">';
    const opc = p[i].slice(1);
    for (let j = 0; j < opc.length; j++){
        html += html_opc(opc, j, 'nula', 'nula', '');
    }
    html += '</table>';
    return html;
}

/**
 * Genera l'HTML d'una pregunta que l'alumne s'ha deixat en blanc.
 * @param {string[][]} p - Array de preguntes reordenades
 *   ex: ['Pregunta 3', 'opc a)', 'opc b)', ...].
 * @param {number} i - L'índex o número de la pregunta.
 * @param {Correccio} c - L'objecte amb l'estat de les respostes 
 *   i puntuació.
 * @returns {string} Codi HTML on es mostra la resposta correcta 
 *   d'aquella pregunta sense penalitzar.
 */
function preg_sense_resp(p, i, c){
    let html = html_preg(p, i, '', 'neutre', '(+0 punts)');
    
    html += '\n\n<table class ="opc">';
    const opc = p[i].slice(1);
    for (let j = 0; j < opc.length; j++){
        if ((j+1) == c.sr[i]){
            html += html_opc(opc, j, '', '', ' ✅');
        }else{
            html += html_opc(opc, j, '', '', '');
        }
    }
    html += '</table>';
    return html;
}

/**
 * Genera l'HTML d'una pregunta que l'alumne ha respost de manera correcta.
 * @param {string[][]} p - Array de preguntes reordenades
 *   ex: ['Pregunta 3', 'opc a)', 'opc b)', ...].
 * @param {number} i - L'índex de la pregunta.
 * @param {Correccio} c - Dades de la correcció (especialment per 
 *   saber els punts guanyats).
 * @returns {string} Codi HTML d'una pregunta encertada i marcada en 
 *   verd.
 */
function preg_correcta(p, i, c){
    let html = "";
    let pts = c.pts_plus[i];
    if (Number(pts) == 1){ 
        pts = '(+1 punt)';
    }else{ 
        pts = '(+' + trunca(pts) + ' punts)';
    }
    html = html_preg(p, i, '', 'plus', pts);
    
    html += '\n\n<table class ="opc">';
    const opc = p[i].slice(1);
    for (let j = 0; j < opc.length; j++){
        if ((j+1) == c.sr[i]){
            html += html_opc(opc, j, 'marcada', 'ok', ' ✅');
        }else{
            html += html_opc(opc, j, '', '', '');
        }
    }
    html += '</table>';
    return html;
}

/**
 * Genera l'HTML d'una pregunta que l'alumne ha fallat (mostra la seva 
 * opció en vermell i l'encertada amb el check).
 * @param {string[][]} p - Array de preguntes reordenades
 *   ex: ['Pregunta 3', 'opc a)', 'opc b)', ...].
 * @param {number} i - L'índex de la pregunta.
 * @param {Correccio} c - Dades de la correcció (per saber el valor 
 *   del punt negatiu aplicat).
 * @returns {string} Codi HTML d'una pregunta errònia.
 */
function preg_incorrecta(p, i, c){
    let html = "";
    let pts = c.pts[i];
    if (Number(pts) == -1){ 
        pts = '(-1 punt)';
    }else{ 
        pts = '(' + trunca(pts) + ' punts)';
    }
    html = html_preg(p, i, '', 'minus', pts);
    html += '\n\n<table class ="opc">';
    const opc = p[i].slice(1);
    for (let j = 0; j < opc.length; j++){
        if ((j+1) == c.sr[i]){
            html += html_opc(opc, j, '', '', ' ✅');
        }else if ((j+1) == c.rn[i]){
            html += html_opc(opc, j, 'marcada', 'no_ok', '');
        }else{
            html += html_opc(opc, j, '', '', '');
        }
    }
    html += '</table>';
    return html;
}

/** Genera l'estructura d'una pregunta individual amb el seu enunciat, 
 *   estils css i la puntuació assignada.
 * @param {string[][]} p - Array de preguntes reordenades.
 *   ex: [['Pregunta 3', 'opc a)', 'opc b)', ...].
 * @param {number} i - El número o índex de la pregunta (per mostrar 
 *   per exemple: "1. Enunciat").
 * @param {string} sc1 - Estil CSS que s'aplica al text de la pregunta 
 *   sencer ('nula' o 'aval').
 * @param {string} sc2 - Estil CSS aplicat a la part dels punts 
 *   ('plus', 'zero' o 'minus').
 * @param {string} pts - Cadena de text amb els punts obtinguts/restats 
 *  (ex: "(+1 punt)").
 * @returns {string} Codi HTML corresponent a l'enunciat de la pregunta.
 */
function html_preg(p, i, sc1, sc2, pts){
    const html = [ '',
      '<p>',
      '  <span class="' + sc1 + '">',
      '    <b>' + (i+1) + '. ' + 
          '<span class="' + sc2 + '"> ' + pts + '</span></b> ',
           p[i][0] + ' ',
      '  </span>',
      '</p>',
    ].join("\n");
    
    return html;
}

/**
 * Genera l'HTML de la fila d'una taula (`<tr>`) amb una de les opcions 
 * de resposta.
 * @param {string[]} opc - El llistat net de les opcions de la pregunta.
 * @param {number} j - Índex de l'opció en què es troba el bucle.
 * @param {string} sc1 - Estil CSS que s'aplica al caràcter indicador 
 *   de l'opció (per exemple, 'marcada').
 * @param {string} sc2 - Estil CSS aplicat al text de l'opció de 
 *   resposta (per exemple, 'ok' o 'no_ok').
 * @param {string} simb - Símbol que acompanya la resposta si 
 *   s'escau (per exemple, '✅').
 * @returns {string} html - Codi HTML d'una opció formatada com una 
 * fila de taula.
 */
function html_opc(opc, j, sc1, sc2, simb){
    const html = ['',
      '  <tr>',
      '    <td><span class="' + sc1 + '">' +
             '<i>' + lletra(j+1) + '</i>)' + 
      '    </span></td>',
      '    <td>' + 
              '<span class="' + sc2 + '">' + opc[j] + '</span>' +
              simb + 
      '    </td>',
      '  </tr>'
    ].join("\n");
    
    return html;
}

