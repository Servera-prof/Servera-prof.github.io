

/**********************************************************************
 * - Modificar les rutes de l'enunciat i d'avaluació
 * 
 * - Establir les puntuacions, que han de correspondre amb la quantitat
 * de respostes que l'alumne pot contestar.
 * 
 * - Establir els paràmetres. En general serà una funció per a generar
 * nombres aleatoris, però també es poden fixar. Aquest últim cas és
 * interessant per a testejar els càlculs. IMPORTANT: Al finalitzar
 * tots els parametres hauran de concatenarse al vector parametres
 * 
 * -  El mateix succeeix amb els càlculs. Tot haura de volcar-se al
 * vector solucions
 * *******************************************************************/

const rutaEnunciat = 'md/enun_form3_maquines_asinc.md';
const rutaAvaluacio = '';
const puntuacions = ["",

];


const e1 = {};
function estableixParametres(){
    let p_e1;
    p_e1 = [
        
    ];
    parametres = parametres.concat(p_e1);
}

function calcula(){
    
    calculs[1] = e1;

    r_e1 = [

    ];

    xs_e1 = r_e1.map(xsMap); //resultats amb 4 xifres significatives
    solucions = solucions.concat(xs_e1);

}

