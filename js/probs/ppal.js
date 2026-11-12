document.addEventListener("DOMContentLoaded", init);
window.onload = renderitza;

/**
 * Objecte que emmagatzema tots els paràmetres aleatoris de l'exercici 
 * (habitatges, locals, garatge, serveis comuns).
 * @type {Object<string, any>}
 */
let params = {};

/**
 * Text Markdown original extret del textarea de l'enunciat.
 * @type {string}
 */
let md = '';

/**
 * Inicialitza l'exercici generant els paràmetres aleatoris i 
 * substituint les etiquetes de plantilla `[[...]]` del textarea pels 
 * valors o elements d'entrada.
 * 
 * @returns {void}
 */
function init() {
    params = genera_params();
    let ta = document.getElementById('enunciat');            // textarea
    md = ta.value;
    let md2 = md.replace(/\[\[(.*?)\]\]/g, processar_plantilla)
    ta.value = md2;
    console.log(md2);
}


/**
 * Processa una coincidència d'etiqueta de plantilla i retorna el 
 * contingut HTML o text pertinent.
 * 
 * @param {string} match - La coincidència completa trobada per 
 *   l'expressió regular (ex: `"[[nh1]]"`).
 * @param {string} rawId - L'identificador intern sense els claudàtors 
 *   (ex: `"form"`, `"%ph"`, `"nh1"`).
 * @returns {string} El codi HTML del formulari/input o el valor 
 *   formatat del paràmetre.
 */
function processar_plantilla(match, rawId) {
    if (rawId === 'form') return crear_form();
    else if (rawId.startsWith('%')) return crear_input(rawId);
    else return crear_param(rawId, match);
}

/**
 * Genera el formulari HTML per al nom de l'alumne, la confirmació i el 
 * botó d'avaluació.
 * 
 * @returns {string} Codi HTML del formulari `<form>`.
 */
function crear_form() {
    const html = ['',
        '<form onsubmit="event.preventDefault(); avaluar();">',
        '  <label>Nom: ',
        '    <input id="nom" required style="width: 250px;">',
        '  </label><br>',
        '  <label>',
        '    <input type="checkbox" id="informat" required>',
        '    Entenc que no es pot tornar enrere.',
        '  </label>',
        '  <div style="text-align: center; margin-top: 10px;">',
        '    <button type="submit" style="font-size: 20px; color: #AA5050;">',
        '      Avaluar',
        '    </button>',
        '  </div>',
        '</form>'
    ].join("\n");

    return html;
}

/**
 * Crea un element d'entrada numèric `<input>` a partir d'un 
 * identificador.
 * 
 * @param {string} rawId - Identificador que comença per `%` 
 *   (ex: `"%ph"`).
 * @returns {string} Codi HTML de l'element `<input>`.
 */
function crear_input(rawId) {
    const id = rawId.substring(1);
    return '<input type="number" id="i_' + id + '" style="width: 80px;">';
}

/**
 * Retorna el valor d'un paràmetre emmagatzemat a `params` formatat, o 
 * el text original de coincidència si el paràmetre no existeix.
 * 
 * @param {string} rawId - Nom de la clau del paràmetre (ex: `"nh1"`).
 * @param {string} match - Text original de reserva en cas que no es 
 *   trobi la clau (ex: `"[[nh1"]]").
 * @returns {string|number} Valor del paràmetre o text de reserva.
 */
function crear_param(rawId, match) {
    return params[rawId] !== undefined ? coma(params[rawId]) : match;
}

/**
 * Configura el motor TexMe i inicia la renderització de la pàgina.
 * 
 * @returns {void}
 */
function renderitza(){
    texme.setOption('onRenderPage', post_renderitzat_exer);
    texme.renderPage();
}

/**
 * Callback executat immediatament després que TexMe hagi acabat de 
 * renderitzar la pàgina.
 * 
 * @returns {void}
 */
function post_renderitzat_exer(){
    /*creaMembreteKatakana();*/
}

/**
 * Controladora del procés d'avaluació:
 * 1. Calcula les solucions teòriques.
 * 2. Obté les respostes introduïdes per l'alumne.
 * 3. Avalua i puntua les respostes.
 * 4. Neteja el DOM i renderitza la vista d'avaluació final.
 * 
 * @returns {void}
 */
function avaluar(){
    solucions = calcular_solucions();
    respostes = obtenir_respostes();
    correccio = corregir_test(solucions, respostes, puntuacio);
    explicacio = generar_explicacio(solucions);
    resetejar();
    renderitzar_avaluacio(solucions, respostes, correccio, explicacio);    
}

/**
 * Llegeix els valors introduïts per l'usuari des dels camps del 
 * formulari (`input`).
 * 
 * @returns {Object<string, number|string|null>} Objecte amb la clau 
 *   `nom` (nom de l'alumne) i les respostes numèriques introduïdes per 
 *   a cada pregunta.
 */
function obtenir_respostes(){

    const respostes = {};
    const nomElem = document.getElementById('nom');
    respostes.nom = nomElem ? nomElem.value.trim() : '';

    const inputs = document.querySelectorAll('input[id^="i_"]');
    inputs.forEach(input => {
        const key = input.id.replace('i_', '');
        const val = input.value.trim();
        if (val === '') {
            respostes[key] = null;
        } else {
            respostes[key] = parseFloat(val.replace(',', '.'));
        }
    });

    return respostes;
}

/**
 * Compara les respostes de l'alumne amb les solucions correctes i 
 * assigna les puntuacions.
 * S'admet una tolerància d'error de l'1%.
 * 
 * @param {SolucionsEdifici} solu - Objecte amb les solucions 
 *   calculades.
 * @param {RespostesUsuari} resp - Objecte amb les respostes 
 *   proporcionades.
 * @param {Array<number>|Object<string, number>|null} [pts] - Pesos de 
 *   puntuació de les preguntes.
 * @returns {Object<string, number>} Objecte amb la puntuació obtinguda 
 *   a cada pregunta.
 */
function corregir_test(solu, resp, pts){
    const correccio = {};
    const keys = Object.keys(solu);
    
    keys.forEach((key, index) => {
        
        const r = resp[key];
        const s = solu[key];
        
        const sha_respost = r !== null && r !== undefined && !isNaN(r);

        if (sha_respost) {
            const t = Math.abs(s) * 0.01;          // tolerància de l'1%
            const m = t === 0 ? 1e-4 : t;                       // marge
            const dins_marge = Math.abs(r - s) <= m;
            
            if (dins_marge) correccio[key] = pts_preg(pts, key, index);
            else correccio[key] = 0;
        } else {
            correccio[key] = 0;
        }
    });
    
    return correccio;
}

/**
 * Obté la puntuació d'una pregunta a partir d'un array o un objecte, en
 * el cas de absencia d'array o objecte, o en el cas que no estigui
 * definit per l'index i o la clau k, assumeix que és 1 punt.
 *
 * @param {number[]|Object.<string, number>|null} pts - Puntuacions 
 *   disponibles (array, objecte de puntuacions o null).
 * @param {string|number} k - Clau per cercar la puntuació quan `pts` 
 *   és un objecte.
 * @param {number} i - Índex per cercar la puntuació quan `pts` és 
 *   un array.
 * @returns {number} La puntuació obtinguda o `1` per defecte.
 */
function pts_preg(pts, k, i){
    let p = null;
    const pts_es_array = (
        Array.isArray(pts) && 
        pts[i] !== undefined
    );
    const pts_es_obj = (
        typeof pts === 'object' && 
        pts !== null && 
        pts[k] !== undefined
    );

    if (pts_es_array) p = pts[i];
    else if (pts_es_obj) p = pts[k];
    else p = 1;
    
    return p;
}


/**
 * Prepara el DOM per a la fase d'avaluació: elimina l'element `<main>` 
 * actual i afegeix un nou element `<textarea id="avaluacio">`.
 * 
 * @returns {void}
 */
function resetejar(){
    const ppal = document.getElementsByTagName("main")[0];
    const body = ppal.parentNode;
    const textArea = body.appendChild(document.createElement("textarea"));
    body.removeChild(ppal);
    textArea.setAttribute("id", "avaluacio");
}

/**
 * Genera el codi Markdown d'avaluació amb la nota final i l'estat 
 * detallat de cada resposta i ho passa al motor de renderització TexMe.
 * 
 * @param {soluEdifici} solu - Objecte amb les solucions teòriques.
 * @param {respUsuari} resp - Objecte amb les respostes aportades per 
 *   l'alumne.
 * @param {Object<string, number>} corr - Puntuació aconseguida en 
 *   cada camp.
 * @param {string} [explicacio] - Text d'explicació o aclariment 
 *   addicional per annexar al final.
 * @returns {void}
 */
function renderitzar_avaluacio(solu, resp, corr, explicacio){
    let md2 = md;

    md2 = afegir_prefix_titol(md2);
    md2 = inserir_resum_avaluacio(md2, corr, resp);
    md2 = reemplacar_etiquetes_plantilla(md2, solu, resp, corr);

    if (explicacio && typeof explicacio === 'string') {
        md2 += "\n\n" + explicacio;
    }
    console.log(md2);
    document.getElementById("avaluacio").value = md2;
    texme.renderPage();
}

/**
 * Modifica el títol principal d'un text en Markdown (formatat amb 
 * subratllat de signes `=`), afegint-hi un prefix i ajustant la 
 * longitud de la línia de subratllat.
 * 
 * @param {string} md - Text Markdown que conté el títol principal.
 * @param {string} [prefix="Avaluació - "] - Prefix que s'afegirà abans 
 *   del títol.
 * @returns {string} El text Markdown amb el títol modificat i 
 *   reajustat.
 */
function afegir_prefix_titol(md, prefix = "Avaluació - ") {
    return md.replace(/^([^\n]+)\n(=+)/m, (match, title) => {
        const nou_titol = prefix + title;
        return nou_titol + "\n" + "=".repeat(nou_titol.length);
    });
}


/**
 * Genera el blockquote amb el resum de la qualificació de l'alumne 
 * (punts obtinguts, punts totals i nota sobre 10) i l'insereix en el 
 * text Markdown immediatament després de la línia de subratllat del 
 * títol principal (`=`).
 * 
 * @param {string} textMd - Text Markdown on s'inserirà el resum.
 * @param {Object<string, number>} c - Puntuació aconseguida en cada 
 * pregunta.
 * @param {Object<string, any>} s - Objecte amb les solucions teòriques.
 * @param {Object<string, any>} r - Objecte amb les respostes de 
 *   l'alumne (inclou la clau `nom`).
 * @param {Array<number>|Object<string, number>|null} [pts] - Pesos 
     opcionals de puntuació.
 * @returns {string} El text Markdown amb el blockquote del resum 
 *   inserit.
 */
function inserir_resum_avaluacio(textMd, c, r) {
    const keys = Object.keys(c);
    let pts_obt = 0;
    let pts_tot = 0;
    
    keys.forEach((key, index) => {
        pts_obt += c[key];
        pts_tot += pts_preg(puntuacio, key, index);
    });
    let nota = pts_tot > 0 ? la(pts_obt / pts_tot * 10) : 0;
    
    pts_obt = la(pts_obt);
    pts_tot = la(pts_tot);

    const resumBlockquote = ['',
        "> L'alumne " +r.nom+ " ha obtingut " +pts_obt+ " punts de ",
        "> " +pts_tot+ " punts possibles. La seva qualificació és per ",
        "> tant de **" +nota+ " punts**.",
        ''
    ]. join("\n");
    return textMd.replace(/^(=+\n)/m, "$1\n" + resumBlockquote);
}


/**
 * Reemplaça les etiquetes de plantilla ([[form]], [[%id]] i [[param]]) 
 * en un text Markdown pels valors corresponents avaluats, solucions o 
 * puntuacions.
 * 
 * @param {string} md - Text md amb les etiquetes de plantilla.
 * @param {Object<string, any>} solu - Obj, amb les solucions teòriques.
 * @param {Object<string, any>} resp - Obj. de respostes de l'alumne.
 * @param {Object<string, number>} corr - Pts aconseguidts en cada camp.
 * @returns {string} El text md amb les etiquetes reemplaçades.
 */
function reemplacar_etiquetes_plantilla(md, solu, resp, corr) {
    return md.replace(/\[\[(.*?)\]\]/g, (match, rawId) => {
        if (rawId === 'form') {
            return eliminar_formulari();
        } else if (rawId.startsWith('%')) {
            return explicar_correccio(rawId, solu, resp, corr);
        } else {
            return crear_param(rawId, params, match);
        }
    });
}


/**
 * Elimina el formulari del renderitzat d'avaluació.
 * @returns {string} Cadena buida.
 */
function eliminar_formulari() {
    return '';
}


/**
 * Genera l'HTML amb l'estat de la resposta i la puntuació/solució d'un 
 * camp concret.
 * 
 * @param {string} rawId - Id. de la pregunta (amb el prefix '%').
 * @param {Object<string, any>} solu - Obj amb les solucions teòriques.
 * @param {Object<string, any>} resp - Obj de respostes de l'alumne.
 * @param {Object<string, number>} corr - Pts aconseguits en cada camp.
 * @returns {string} Codi HTML amb el format d'avaluació.
 */
function explicar_correccio(rawId, solu, resp, corr) {
    const id = rawId.substring(1);
    const r = resp[id];
    const s = solu[id];
    const pts = corr[id] || 0;

    if (r === null || r === undefined || isNaN(r)) {
        return ['',
          '<span style="text-decoration: underline;">',
          '  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
          '</span> <span style="color: red;">(' +la(s)+ ')</span>'
        ].join("\n");
    }else if (pts > 0) {
        return ['',
          '<span style="color: green; text-decoration: underline;">',
          '  ' +l(r)+ '</span>',
          '<span style="color: green;">✅ (+' +la(pts)+ ' ' +
          '' + (pts === 1 ? "punt" : "punts") + ')</span>'
        ].join("\n");
    }else{
        return ['',
          '<span style="color: red; text-decoration: line-through; ' +
          'color: red;">' +la(r)+ '</span>',
          '<span style="color: red;">(' +la(s)+ ')</span>'
        ].join("\n");
    }
}
