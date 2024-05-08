

/**********************************************************************
 * - Modificar les rutes de l'enunciat i d'avaluació
 * 
 * - Establir les puntuacions, que han de correspondre amb la quantitat
 * de respostes que l'alumne pot contestar.
 * 
 * - Establir els paràmetres. En general serà una funció per a generar
 * nombres aleatoris, però també es poden fixar. Aquest últim cas és
 * interessant per a testejar els càlculs. IMPORTANT: Al finalitzar
 * tots els parametres hauran de concatenarse al vector parametres.
 * 
 * -  El mateix succeeix amb els càlculs. Tot haura de volcar-se al
 * vector solucions.
 * *******************************************************************/





// == ACTUALITZAR VALORS ==============================================
const rutaEnunciat = 'md/enun_ex4_trafo_trif.md';
const rutaAvaluacio = 'md/aval_ex4_trafo_trif.md';
const puntuacions = ["",
    1.25, 1.25, 1.25, 1.25,
    2,
    2,
    1
];

parametres = [""];
tlog = "";
// == FI ACTUALITZAR VALORS ===========================================





// == DECLARACIÓ DE PARÀMETRES ========================================
const S_N = 500;    // kVA
const U_N1 = 25;    // kV
const U_N2 = 6000;  // V
const U_G = 24;     // kV
const ε_cc = 0.05;  // "" 

const W_cc = 10;    // kW
const W_0 = 1;      // kW
const cosφ_0 = 0.2; // ""
const Z_2 = cbi(215, 200); // Ω
// == FI DECLARACIÓ DE PARÀMETRES ====================================





function estableixParametres(){

    p = [
        U_G  + " kV",
        U_N2 + " V",
        S_N  + " kVA",
        U_N1 + " kV / " + U_N2 + " V",
        ε_cc,

        W_cc + "~\\text{kW}",
        W_0  + "~\\text{kW}",
        cosφ_0,
        logcbi(Z_2),
    ];
    parametres = parametres.concat(p);
}





function calcula(){

    tlog += "1. Paràmetres\n";
    tlog += "=============\n\n";
    
    tlog += blog2(
        "S_N, U_N1, U_N2, U_G",
         S_N, U_N1, U_N2, U_G ,        
        "kVA, kV  , V   , kV " 
    ); tlog += blog2(
        "ε_cc, W_cc, W_0, cosφ_0",
         ε_cc, W_cc, W_0, cosφ_0 ,
        "    , kW  , kW ,       "
    ); tlog += logc(
        "Z_2", Z_2, "Ω"
    ); tlog += 
        "\n\n\n";


    
    tlog += "1.1. Valors base\n";
    tlog += "----------------\n\n";

    const I_N1 = S_N / (3**0.5 * U_N1);
    const I_N2 = S_N*1e3 / (3**0.5 * U_N2);
    const Z_b1 = (U_N1*1e3)**2 / (S_N*1e3);
    const Z_b2 = (U_N2)**2 / (S_N*1e3);

    tlog += blog2(
        "S_b, U_b1, U_b2",
         S_N, U_N1, U_N2 ,
        "kVA, kV  , V   "
    ); tlog += blog2(
        "I_N1, I_N2",
         I_N1, I_N2 ,
        "A   , A   "
    ); tlog += blog2(
        "Z_b1, Zb2",
         Z_b1, Zb2 ,
        "Ω   , Ω  "
    );
    tlog += "\n\n";



    tlog += "1.2. Valors reduïts\n";
    tlog += "-------------------\n\n";

    const z_mod = ε_cc;
    const r = W_cc / S_N;
    const x = Math.sqrt(z_mod**2-r**2);
    const z = cbi(r, x);

    const g_Fe = W_0 / S_N;
    const y_Fe_mod = g_Fe / cosfi_0;
    const b_M = y_Fe * Math.sqrt(1 - cosfi_0**2);
    const y_Fe = cbi(g_Fe, b_M);

    tlog += logc(
        "z", z, ""
    ); tlog += logc(
        "y_Fe", y_Fe, ""
    ); tlog += 
        "\n\n";



    tlog += "1.3. Entrada i sortida reduïda\n";
    tlog += "------------------------------\n\n";

    const U_1 = U_G;
    const u_1 = cpol (U_1 / U_N1, 0);
    const z_2 = multc_esc(1/(3 * Z_b2), Z_2);

    tlog += blog2(
        "U_1", U_1, "V"
    ); tlog += logc(
        "u_1", u_1, ""
    ); tlog += logc(
        "z_2", z_2, ""
    ); tlog += 
        "\n\n";



    tlog += "1.4. Calcul Z equivalent i intensitat\n";
    tlog += "-------------------------------------\n\n";

    let z_eq = sumc(z_2, z);
    let i_1 = divc(u_1, z_eq);
    const u_2 = multc(i_1, z_2);

    tlog += logc (
        "z_eq", z_eq, ""
    ); tlog += logc (
        "i_1", i_1, ""
    ); tlog += logc (
        "u_2", u_2, ""
    ); tlog += 
        "\n\n";

    a[1] = i_1.r;



    tlog += "1.5. caiguda de tensió\n";
    tlog += "----------------------\n\n";

    const cdt_pu = u_1.r - u_2.r;
    const cdt_V = cdt_pu * U_N2;

    tlog += blog2(
        "cdt_pu, cdt_V",
         cdt_pu, cdt_V ,
        "      ,      "
    ); tlog += 
        "\n\n";

    a[2] = cdt_V;



    tlog += "1.6. càlcul potències i rendiment\n";
    tlog += "---------------------------------\n\n"; 

    const p_2 = z_2.x * i_1.r**2;
    const p_Cu = z.x * i_1.r**2;
    const p_Fe = u_2.r**2 * y_Fe.x;
    const η = p_2 / (p_2 + p_Cu + p_Fe) * 100;

    tlog += blog2(
        "p_2, p_Cu, p_Fe",
         p_2, p_Cu, p_Fe ,
        "   ,     ,     "
    ); tlog += blog2(
        "η", η, ""
    ); tlog += 
        "\n\n";

    a[3] = η;



    tlog += "1.7. Càlcul tensió real al secundari\n";
    tlog += "------------------------------------\n\n"; 

    const U_2 = multc_esc (U_N2 * u_2.r);

    tlog += logc(
        "U_2", U_2, "V"
    ); tlog += 
        "\n\n\n";

    a[4] = U_2;





    tlog += "2. Càlcul intensitats de curtcircuit\n";
    tlog += "====================================\n\n"; 

    const i_cc = u_1.r / z.r;
    const I_cc2 = i_cc * I_N2 / 1000;

    tlog += blog2(
        "I_cc2", I_cc2, "kA"
    ); tlog += 
        "\n\n\n";

    a[5] = I_cc2;





    tlog += "3. Índex horari\n";
    tlog += "===============\n\n"; 

    let index_horari;
    if (iAT === 0 && iBT === 0) index_horari = 11;
    else if (iAT === 0 && iBT === 1) index_horari = 7;
    else if (iAT === 0 && iBT === 2) index_horari = 3;
    else if (iAT === 1 && iBT === 0) index_horari = 1;
    else if (iAT === 1 && iBT === 1) index_horari = 5;
    else if (iAT === 1 && iBT === 2) index_horari = 9;
    else index_horari = "";

    tlog += 
        "Index horari: " + index_horari + "\n";
    tlog += 
        "\n\n\n";

    a[6] = index_horari;




    tlog += "4. Impedancia línia AT\n";
    tlog += "======================\n\n"; 

    const L = 2*1e3;
    const S = 50;
    const γ = 56;
    const R_AT = L/(γ*S);
    const r_AT = R_AT / Z_b2;
    const x_AT = r_AT * 0.1;
    const z_AT = cbi(r_AT, x_AT);
    const u_g = cbi(U_G / U_N1, 0);
    z_eq = sumc(z_eq, z_AT);
    i_1 = divc(u_g/z_eq);

    tlog += blog2(
        "R_AT", R_AT, "Ω"
    ); tlog += logc(
        "z_AT", z_AT, ""
    ); tlog += logc (
        "z_eq", z_eq, ""
    ); tlog += logc(
        "i_1", i_1, ""
    ); tlog += 
        "\n\n\n";

    a[7] = i_1.r;



   
    xs_e1 = a.slice(1).map(xsMap); //resultats amb 4 xifres significatives
    solucions = solucions.concat(xs_e1);

}