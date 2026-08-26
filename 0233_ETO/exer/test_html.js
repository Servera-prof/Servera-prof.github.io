"use strict";

function renderitza(){
    const proleg = document.getElementById("md").value;
    const html = genera_html_texme(titol, proleg, test_original);
    
    document.getElementById("titol").innerText = titol; 
    document.getElementById("md").innerHTML = html;
    texme.renderPage();
}


function genera_html_texme(titol, proleg, test_original){
    let html = "";
    const t = test_aleatoritzat(test_original);
    
    
    html = '<h1 align ="center">' + titol + "</h1>\n" +
          proleg;
    html += [
      '<pre><b>Permutació:</b>' + t.str_perm + '</pre>',
      '<h2>Preguntes</h2>',
      html_preguntes(t.arr_preg),
      '<h2>Resposta</h2>',
      formulari_respostes(t),
      '<h2>Identificacio de l\'alumne</h2>',
      crear_identificacio()
    ].join("\n");
    return html;
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
 * @type {TestAleatoritzat} t - array de preguntes i opcions de respostes
 * @returns {string} html - text html amb una formulari que permet
 *  triar una resposta.
 */
function formulari_respostes(t){
    //const p = t.arr_preg;
    let html = "";
    let resp = "";
    for (let i = 0; i < t.np; i++){
        resp += "n";
        if ((i+1) % 5 == 0 && i != t.np -1) resp += " ";
    }

    html += [
        '<table id="table_resp">',
        ''
    ].join("\n");
    
    for (let i = 0; i < t.np; i++){
        const esmeitat = i>= Math.ceil(t.np/2);
        const multiple5 = ((i+1) % 5) == 0;
        const esultima = i == t.np - 1;
        html += [ 
          '  <tr>',
          '    <td><b>' + (i + 1) + '. </b></td>',
          '    <td>',
          ''
        ].join("\n");
        for (let j = 1; j <= t.n_opc[i]; j++){
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
          '<span id="perm_span">' + t.str_perm + '</span>',
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
      '<b>DADES REGISTRADES</b>',
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

