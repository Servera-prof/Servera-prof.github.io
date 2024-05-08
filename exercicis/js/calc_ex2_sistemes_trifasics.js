

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

const rutaEnunciat = 'md/enun_ex2_sistemes_trifasics.md';
const rutaAvaluacio = 'md/aval_ex2_sistemes_trifasics.md';
const puntuacions = ["",
    0.5, 
    1, 1, 1, 0.5,
    0.5, 0.5, 0.5, 0.5,
    1.5, 
    0.7, 0.7, 0.7
];


const e1 = {};
function estableixParametres(){
    let p_e1;
    e1.connexio = aleat(1,2) === 1 ? "D" : "Y";
    e1.VL = aleat(100, 500); 
    e1.f = aleat(30,100);
    e1.R = aleat(50,150);
    e1.L = aleat(50,150);
    e1.C = aleat(50,150);
    p_e1 = [
        e1.connexio, e1.VL, e1.f,
        e1.R, e1.L, e1.C
    ];
    parametres = parametres.concat(p_e1);
}

function calcula(){
    con = e1.connexio;
    VL = e1.VL; f = e1.f;
    R = e1.R; L = e1.L*1e-3; C = e1.C*1e-6;


    ω = 2*π*f; 
    XL = L*ω;
    XC = 1/(C*ω);
    X = XL-XC;
    e1.ω = xs(ω); e1.XL = xs(XL); e1.XC = xs(XC); e1.X = xs(X); 

    Z = (R**2+X**2)**0.5;
    φrad = Math.atan(X/R);
    φ = φrad*360/(2*π);
    cosφ = Math.cos(φrad);
    e1.Z = xs(Z); e1.φrad = xs(φrad); e1.φ = xs(φ); e1.cosφ = xs(cosφ);

    VF = con === "D" ? VL : VL/3**0.5;
    IF = VF/Z;
    IL = con === "D" ? IF*3**0.5 : IF;
    IL_tot = 2*IL;
    e1.VF = xs(VF); e1.IF = xs(IF); e1.IL = xs(IL); e1.IL_tot = xs(IL_tot);

    S = 3**0.5*VL*IL;
    P = S*cosφ;
    Q = S*(1-cosφ**2)**0.5;
    S = S*1e-3;
    P = P*1e-3;
    Q = Q*1e-3;
    e1.S = xs(S); e1.P = xs(P); e1.Q = xs(Q);


    calculs[1] = e1;

    r_e1 = [
        ω,
        X, Z, φ, cosφ,
        VL, VF, IF, IL,
        IL_tot,
        S, P, Q
    ];

    xs_e1 = r_e1.map(xsMap); //resultats amb 4 xifres significatives
    solucions = solucions.concat(xs_e1);

}

