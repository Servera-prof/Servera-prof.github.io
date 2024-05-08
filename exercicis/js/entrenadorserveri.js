const π = Math.PI;

let calculs = [""];
let parametres = [""];
let solucions = [""];
let respostes = [""];


let alumne = {
    nom: "",
    cicle: "CFGS Tècnic Superior en Sistemes Electrotècnics i Automatitzats",
    anys: "2023/2024"
}


function renderEnunciat(txtEnunciat){
    const enunciat = document.getElementById("enunciat");
    estableixParametres();
    txtEnunciat = exportarParametres(txtEnunciat);

    txtEnunciat = crearInputs(txtEnunciat);
    txtEnunciat = crearIdentificacio(txtEnunciat);
    enunciat.innerHTML = txtEnunciat;
    texme.renderPage();
}



function exportarParametres(txt){
    let patro = "", canvi = "";
    const fi = parametres.length;
    for (let i = 1; i < parametres.length; i++) {
        patro = "[[p" + i +"]]";
        canvi = parametres[i];
        txt = txt.replace(patro, canvi);
    }
    return txt;
    
}

function crearInputs(txt){
    let patro = "", canvi = "";
    for (let i = 1; i < puntuacions.length; i++) {
        patro = "[[i" + i +"]]";
        canvi = '<input type="number" onwheel="return false;" ';
        canvi += 'id="i'+ i +'" style="width: 80px">';
        txt = txt.replace(patro, canvi);
    }
    return txt;
}



function crearIdentificacio(txt){
    const patro = "[[identificacio]]";
    let canvi = "";
    canvi += '<form id="avalua" onsubmit="event.preventDefault() & avalua()">\n';
    canvi += '<label>Nom de l\'alumne: </label><input id="nom" ';  
    canvi += 'style="width: 400px" />\n';
    canvi += '<div>\n';
    canvi += '\t<input type="checkbox" id="informat" required/>';
    canvi += '\t<label>Entenc que al premer el botó avaluar ';
    canvi += 'no es pot tornar enrera.</label>\n';
    canvi += '</div>\n';
    canvi += '<br/>\n';
    canvi += '<div style="text-align: center;">';
    canvi += '<button type="submit" ';
    canvi += 'id="boto" style="font-size: 20px; ';
    canvi += 'color: #AA5050;"> Avaluar </button>';
    canvi += '</div>\n';
    canvi += '</form>';

    txt = txt.replace(patro, canvi);
    return txt;
}

function avalua(){
    importaRespostes();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', rutaAvaluacio, true);
    xhr.setRequestHeader("Cache-Control", "max-age=0");
 
    xhr.onreadystatechange = function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return;
        txtAvaluacio = this.responseText;
        resetejar();
        renderAvaluacio(txtAvaluacio);
    };
    xhr.send();
}

function importaRespostes(){
    let r = [""];
    alumne.nom = document.getElementById("nom").value;
    for (let i = 1; i < puntuacions.length; i++){
        r[i] = document.getElementById("i"+i).value;
    }
    respostes = r.map(xsMap);
}



function resetejar(){
    const ppal = document.getElementsByTagName("main")[0];
    const body = ppal.parentNode;
    body.removeChild(ppal);
    textArea = body.appendChild(document.createElement("textarea"));
    textArea.setAttribute("id", "avaluacio");
}



function renderAvaluacio(txt){
    const avaluacio = document.getElementById("avaluacio");
    txt = identificarAlumne(txt);
    txt = puntua(txt);
    txt = txt.replace("[[log]]", tlog);
    avaluacio.innerHTML = txt;
    texme.renderPage();
}


function identificarAlumne(txt){
    txt = txt.replace("[[nom]]", alumne.nom);
    txt = txt.replace("[[cicle]]", alumne.cicle);
    txt = txt.replace("[[any]]", alumne.anys);
    return txt;
}

function puntua(txt){
    calcula();

    txt = exportarParametres(txt);

    let ptsAlumne = 0, ptsTotal = 0;
    let canvi = "", patro = "";
    let a = 0, b = 0;
    for (let i = 1; i < puntuacions.length; i++){
        a = respostes[i];
        b = solucions[i];
        ptsTotal += puntuacions[i];
        canvi = 
            '<span style="border-bottom: 1px solid silver; padding: 0.2em 1em 0;">' 
            + coma(a) + '</span>';
        if ((b*0.99) < a && a < (b*1.01)) {
            ptsAlumne += puntuacions[i];
            canvi += 
                ' <span style="color: green">(' + 
                coma(b) +') OK (+' + puntuacions[i] + ')</span>';
        }else{
            canvi += 
                ' <span style="color: red;"> (' + 
                coma(b) +')</span>';
        }
        patro = "[[i" + i + "]]";

        txt = txt.replace(patro, canvi);
    }
    txt = txt.replace("[[nota]]", "S'han aconseguit: "+ xs(ptsAlumne, 2) +
        " punts de " + xs(ptsTotal, 2) + " possibles.\n>\n>" +
        "**Nota final: " + xs(ptsAlumne/ptsTotal*10, 2) + "**");
    return txt;
}







/** 
 * Genera un enter aleatori entre min i max ambdós inclosos 
 */
function aleat(min, max) {
    const a = Math.ceil(min);
    const b = Math.floor(max);
    const c = Math.floor(Math.random() * (b - a + 1) + a);
    return c;
}

function triaElementMatriu (matriu, n = 0){
    const aleat = Math.floor(Math.random() * (matriu.length));
    return matriu[aleat.toFixed(n)];
}

function atan(a){
    return Math.atan(a)*360/2/π;
}

function sin(a){
    return Math.sin(a*2*π/360);
}

function cos(a){
    return Math.cos(a*2*π/360);
}

function cbi(x, y){ //complexe input en binomial
    c = {};
    c.r = (x**2 + y**2)**0.5;
    c.φ = Math.atan2(y, x)*360/2/π;
    c.x = x;
    c.y = y;
    return c;
}

function cpol(r, φ){ //complexe input en polar
    c = {};
    c.r = r;
    c.φ = φ;
    c.x = r * cos(φ);
    c.y = r * sin(φ);
    return c;
}

function sumc(a, b){
    return cbi(a.x + b.x, a.y + b.y)
}

function restc(a, b){
    return cbi(a.x - b.x, a.y - b.y)
}

function multc(a, b){
    return cpol(a.r*b.r, a.φ+b.φ);
}

function multc_esc(λ, a){
    return cpol(λ*a.r, a.φ);
}

function divc(a, b){
    return cpol(a.r/b.r, a.φ-b.φ);
}

function invc(a){ // inversa d'un complexe
    return cpol(1/a.r, -a.φ);
}

function logc (nom, v){ // log de un numero complexe
    log = "";
    log += nom + ": ";
    log += xs(v.x);
    if (v.y > 0) log += " + j" + xs(v.y);
    else if (v.y < 0) log += "-j" + xs(-v.y);
    log += "; ";
    log += xs(v.r) + "∠" + xs(v.φ) + "°\n";
    return log;
}

function logcbi (v){ // log de un numero complexe només en binomial
    log = "";
    log += xs(v.x);
    if (v.y > 0) log += " + j" + xs(v.y);
    else if (v.y < 0) log += "-j" + xs(-v.y);
    return log;
}

function blog(){
    log = "";
    for (var i = 0; i < arguments.length - 2; i++){
        log += arguments[i] + ": "
        i++;
        log += xs(arguments[i]) + "; "
    }
    log += arguments[i] + ": "
    i++;
    log += xs(arguments[i]) + "\n"
    return log;
}

function blog2(){
    let ids = arguments[0].split().trim();
    let uds = arguments[length - 1].split().trim();

    let log = "";
    for (var i = 1; i < arguments.length - 2; i++){
        log += ids[i - 1] + ": ";
        log += xs(arguments[i]) + " " + uds[i - 1] + "\n";
    }
    return log;
}

function xs(a, b = 4){
    a = Number(a);
    if (a.toPrecision) a = a.toPrecision(b);
    return a;
}

function coma(a){
    a = a.replace(".", ",");
    return a;
}

function xsMap(a){
    a = xs(a);
    return a;
}

