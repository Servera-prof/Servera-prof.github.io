

const e1 = {};
let calculs = [""];
let parametres = [""];
let solucions = [""];
let respostes = [""];
const puntuacions = ["",
    0.5, 0.5,
    0.5, 0.5, 0.5, 0.5,
    0.5, 0.5,
    1
];

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

function estableixParametres(){
    let p_e1;
    e1.VF_Traf = aleat(100, 500); 
    e1.Z_trif = aleat(20,60);
    p_e1 = [e1.VF_Traf, e1.Z_trif];
    parametres = parametres.concat(p_e1);

}

function exportarParametres(txt){
    let patro = "", canvi = "";
    const fi = parametres.length;
    for (let i = 1; i < puntuacions.length; i++) {
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
    canvi += 'color: #AA5050;"> Avaluar - NO PULSAR! </button>';
    canvi += '</div>\n';
    canvi += '</form>';

    txt = txt.replace(patro, canvi);
    return txt;
}

function avalua(){
    importaRespostes();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', './Avaluacio.md', true);
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
    console.log(r);
    respostes = r.map(xSignif);
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
    txt = txt.replace("[[backup]]", JSON.stringify(calculs[1], false, 4));
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

    let ptsAlumne = 0, ptsTotal = 0;
    let canvi = "", patro = "";
    let a = 0, b = 0;
    for (let i = 1; i < puntuacions.length; i++){
        a = respostes[i];
        b = solucions[i];
        ptsTotal += puntuacions[i];

        if ((b*0.99) < a && a < (b*1.01)) {
            ptsAlumne += puntuacions[i];
            canvi = "**OK**";
        }else{
            canvi = "Error";
        }
        patro = "[[resultat" + i + "]]";
        canvi += "   -   Resposta de l'alumne: " + respostes[i] + 
                ", resultat esperat: " + solucions[i];


        txt = txt.replace(patro, canvi);
    }
    txt = txt.replace("[[nota]]", "S'han aconseguit: "+ ptsAlumne +
        " punts de " + ptsTotal + " possibles.\n>\n>" +
        "**Nota final: " + ptsAlumne/ptsTotal*10 + "**");
    return txt;
}

function calcula(){
       
    e1.VL = 3**0.5 * e1.VF_Traf; 

    e1.V_mono_fn = e1.VF_Traf; 
    e1.V_mono_ff = e1.VL; 

    e1.VL_D = e1.VL; 
    e1.VF_D = e1.VL_D; 
    e1.IF_D = e1.VF_D / e1.Z_trif;
    e1.IL_D = 3**0.5 * e1.IF_D;

    e1.VL_Y = e1.VL;
    e1.VF_Y = e1.VL_Y/3**0.5;
    e1.IF_Y = e1.VF_Y / e1.Z_trif;
    e1.IL_Y = e1.IF_Y;

    e1.IL_tot = e1.IL_D + e1.IL_Y;

    calculs[1] = e1;

    r_e1 = [
        e1.V_mono_fn, e1.V_mono_ff, 
        e1.VL_D, e1.VF_D, e1.VL_Y, e1.VF_Y, 
        e1.IF_D, e1.IF_Y, e1.IL_tot
    ];
    xs_e1 = r_e1.map(xSignif);
    solucions = solucions.concat(xs_e1);

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

function xSignif(a){
    a = Number(a);
    if (a.toPrecision) return a.toPrecision(4);
    else return a;
}

