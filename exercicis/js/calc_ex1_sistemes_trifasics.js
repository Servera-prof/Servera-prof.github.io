

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
 * -  EL mateix succeeix amb els càlculs. Tot haura de volcar-se al
 * vector solucions
 * *******************************************************************/

const rutaEnunciat = 'md/enun_ex1_sistemes_trifasics.md';
const rutaAvaluacio = 'md/aval_ex1_sistemes_trifasics.md';
const puntuacions = ["",
    0.5, 0.5,
    0.5, 0.5, 0.5, 0.5,
    0.5, 0.5,
    1
];

const e1 = {};
function estableixParametres(){
    let p_e1;
    e1.VF_Traf = aleat(100, 500); 
    e1.Z_trif = aleat(20,60);
    p_e1 = [e1.VF_Traf, e1.Z_trif];
    parametres = parametres.concat(p_e1);

}

function calcula(){
    VF_Traf = e1.VF_Traf; Z_trif = e1.Z_trif;

    VL = 3**0.5 * VF_Traf; 
    e1.VL = xs(VL);

    V_mono_fn = VF_Traf; 
    V_mono_ff = VL; 
    e1.V_mono_fn = xs(V_mono_fn); e1.V_mono_ff = xs(V_mono_ff);

    VL_D = VL; 
    VF_D = VL_D; 
    IF_D = VF_D / Z_trif;
    IL_D = 3**0.5 * IF_D;
    e1.VL_D = xs(VL_D); e1.VF_D = xs (VF_D);
    e1.IF_D = xs(IF_D); e1.IL_D = xs(IL_D);

    VL_Y = VL;
    VF_Y = VL_Y/3**0.5;
    IF_Y = VF_Y / Z_trif;
    IL_Y = IF_Y;
    e1.VL_Y = xs(VL_Y); e1.VF_Y = xs(VF_Y);
    e1.IF_Y = xs(IF_Y); e1.IL_Y = xs(IL_Y); 

    IL_tot = IL_D + IL_Y;
    e1.IL_tot = xs(IL_tot);

    tlog = "" + JSON.stringify(e1);

    r_e1 = [
        e1.V_mono_fn, e1.V_mono_ff, 
        e1.VL_D, e1.VF_D, e1.VL_Y, e1.VF_Y, 
        e1.IF_D, e1.IF_Y, e1.IL_tot
    ];
    xs_e1 = r_e1.map(xsMap);
    solucions = solucions.concat(xs_e1);

}

