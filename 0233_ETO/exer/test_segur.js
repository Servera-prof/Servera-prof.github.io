/**
 * @file Mòdul de seguretat i rastreig de comportament per a exàmens en línia.
 * @version 1.1.0
 * @author servera-prof
 */



// =================================================================
// VARIABLES GLOBALS DE CONTROL DE COMPORTAMENT
// =================================================================

let desplaçamentsRatoli = 0;
let tempsCursorImmobil = 0;
let sortidesPestanya = 0;
let ultimX = 0;
let ultimY = 0;
let xPrevi = 0;
let yPrevi = 0;
let intervalRastreig = null;




// =================================================================
// 1. FUNCIONS AUXILIARS DE GESTIÓ D'ESDEVENIMENTS
// =================================================================

/**
 * Incrementa el comptador quan l'usuari perd el focus de la finestra 
 * de l'examen (per exemple, si canvia de pestanya, obre programes 
 * externs o minimitza).
 * @returns {void}
 */
function gestionaPerduaFocus() {
    sortidesPestanya++;
}

/**
 * Registra el moviment del ratolí incrementant el comptador i 
 * actualitzant les coordenades de posició globals.
 * @param {MouseEvent} e - L'esdeveniment de moviment del ratolí 
 *  capturat pel navegador.
 * @returns {void}
 */
function gestionaMovimentRatoli(e) {
    desplaçamentsRatoli++;
    ultimX = e.clientX;
    ultimY = e.clientY;
}

/**
 * Comprova si la posició del ratolí s'ha mantingut fixa respecte a 
 * la darrera revisió. Si detecta immobilitat havent-hi activitat 
 * inicial (coordenades diferents de zero), afegeix 3 segons al 
 * comptador d'inactivitat.
 * @returns {void}
 */
function comprovaImmobilitat() {
    if (ultimX === xPrevi && ultimY === yPrevi) {
        tempsCursorImmobil += 3; 
    }
    xPrevi = ultimX;
    yPrevi = ultimY;
}

function hashCadena(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(36);
}


// =================================================================
// 2. LÒGICA PRINCIPAL DEL MÒDUL
// =================================================================

/**
 * Inicialitza i engega el sistema de rastreig de comportament de 
 * l'alumne. Afegeix els escoltadors d'esdeveniments globals 
 * (listeners) i l'interval de revisió.
 * 
 * @note Aquesta funció es crida de manera segura mitjançant el 
 *   callback `texme.onRenderPage`.
 * @returns {void}
 */
function iniciaRastreigComportament() {
    window.addEventListener('blur', gestionaPerduaFocus);
    window.addEventListener('mousemove', gestionaMovimentRatoli);

    intervalRastreig = setInterval(comprovaImmobilitat, 3000);
}

/**
 * Finalitza completament el sistema de seguretat de l'examen.
 * Atura el temporitzador de control d'immobilitat i elimina els 
 * escoltadors d'esdeveniments globals (listeners) associats al ratolí 
 * i al focus per evitar falsos positius durant la visualització de 
 * l'avaluació.
 * 
 * @note Aquesta funció s'ha de cridar a l'inici del mètode 
 *  `renderAvaluacio`.
 * @returns {void}
 */
function finalitzaRastreigComportament() {
    if (intervalRastreig) {
        clearInterval(intervalRastreig);
        intervalRastreig = null;
    }
    window.removeEventListener('blur', gestionaPerduaFocus);
    window.removeEventListener('mousemove', gestionaMovimentRatoli);
}


/**
 * Obté o genera un identificador únic i persistent per a la sessió 
 * actual de l'alumne. Cerca un identificador existent a 
 * `sessionStorage`. Si no n'existeix cap, genera una cadena 
 * alfanumèrica aleatòria de 8 caràcters i la guarda per a la pestanya 
 * activa.
 * 
 * @returns {string} L'identificador de sessió de l'alumne 
 * (`test_session_id`).
 */
function generaIDSessio(){
    let idSessio = sessionStorage.getItem('test_session_id');
    if (!idSessio) {
        idSessio = Math.random().toString(36).substring(2, 10);
        sessionStorage.setItem('test_session_id', idSessio);
    }
    return idSessio;
}


/**
 * Genera un resum (hash) únic del renderitzat d'un element Canvas 
 * ocult. Dibuixa formes i text per capturar les micro-diferències 
 * del maquinari de l'ordinador (GPU, processador i suavitzat de 
 * fonts) i en calcula un hash a partir de la imatge generada.
 * 
 * @returns {string} El hash alfanumèric del renderitzat o `"NoCanvas"` 
 * si el navegador no permet l'ús de Canvas.
 */
function generaCanvasHash(){
    let canvasHash = "NoCanvas";
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        ctx.textBaseline = "top"; ctx.font = "14px 'Arial'"; 
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20); ctx.fillStyle = "#069"; 
        ctx.fillText("TestSegur", 2, 15);
        
        canvasHash = hashCadena(canvas.toDataURL());
    } catch (e) {}

    return canvasHash;
}

/**
 * Atura el rastreig de seguretat, avalua les mètriques acumulades 
 * durant l'examen i calcula un percentatge estimat de sospita de 
 * còpia o frau.
 * 
 * @returns {string} str - Cadena de text amb el percentatge extret i el 
 *   detall tècnic resumit.
 *                   Exemple: "50%_DETALLS(S:2-I:15s)"
 */
function calculaCopia() {
    let puntsSospita = 0;
    let str = "";
    
    puntsSospita += Math.min(sortidesPestanya * 2.5, 50); 
    if (tempsCursorImmobil >= 3) puntsSospita += 1;
    if (tempsCursorImmobil >= 9) puntsSospita += 1;
    if (tempsCursorImmobil >= 120) puntsSospita += 10;
    if (desplaçamentsRatoli < 1000) puntsSospita += 3;
    if (desplaçamentsRatoli < 500) puntsSospita += 7;
    if (desplaçamentsRatoli < 20) puntsSospita += 10;
    const pctCopia = Math.min(Math.max(puntsSospita, 0), 100);
    if (intervalRastreig) {
        clearInterval(intervalRastreig);
        intervalRastreig = null;
    }
    
    str = pctCopia + " % (" +
      "S: " + sortidesPestanya + "; " +
      "I: " + tempsCursorImmobil + " s; " +
      "R: " + desplaçamentsRatoli +
      ")";
      
    return str;
}
