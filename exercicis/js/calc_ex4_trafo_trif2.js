

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
        UN_1 + " kV / " + U_N2 + " V",
        ε_cc,

        W_cc + " kW",
        W_0  + " kW",
        cosφ_0,
        logcbi(Z_2),
    ];
    parametres = parametres.concat(p);
}





function calcula(){

    const I_N1 = S_N / (Math.sqrt(3) * U_N1);
    const I_N2 = S_N*1000 / (Math.sqrt(3) * U_N2);
    const Z_b1 = (U_N1*1000)**2 / (S_N * 1000);
    const Z_b2 = (U_N2)**2 / (S_N * 1000);

    const z_mod = ε_cc;
    const r = W_cc / S_N;
    const x = Math.sqrt(z_mod**2-r**2);
    const z = cbi(r, x);

    const g_Fe = W_0 / S_N;
    const y_Fe_mod = g_Fe / cosfi_0;
    const b_M = y_Fe * Math.sqrt(1 - cosfi_0**2);
    const y_Fe = cbi(g_Fe, b_M);

    const U_1 = U_G;
    const u_1 = cpol (U_1 / U_N1, 0);
    const z_2 = multc_esc(1/(3 * Z_b2), Z_2);



    const z_eq = sumc(z_2, z);
    const i_1 = divc(u_1, z_eq);
    const u_2 = multc(i_1, z_2);



    const cdt_pu = u_1.r - u_2.r;
    const cdt_V = cdt_pu * U_N2;

    tlog += blog2(
         cdt_pu, cdt_V
        "cdt_pu, cdt_V"
    );
    tlog += "\n\n";




    tlog += "1.6. càlcul potències i rendiment\n";
    tlog += "---------------------------------\n\n"; 

    const p_2 = z_2.x * i_1.r**2;
    const p_Cu = z.x * i_1.r**2;
    const p_Fe = u_2.r**2 * y_Fe.x;
    const η = p_2 / (p_2 + p_Cu + p_Fe) * 100;

    tlog += blog2(
         p_2, p_Cu, p_Fe
        "p_2, p_Cu, p_Fe"
    );
    tlog += "\n\n";



    tlog += "1.7. Càlcul tensió real al secundari\n";
    tlog += "------------------------------------\n\n"; 

    const U_2 = multc_esc (U_N2 * u_2.r);

    tlog += logc("U_2", U_2);
    tlog += "\n\n\n";






    tlog += "2. Càlcul intensitats de curtcircuit\n";
    tlog += "====================================\n\n"; 

    const i_cc = u_1.r / z.r;
    const I_cc2 = i_cc * I_N2 / 1000;

    tlog += blog2(I_cc2, "I_cc2");
    tlog += "\n\n\n";





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

    tlog += "Index horari: " + index_horari + "\n";
    tlog += "\n\n\n";





    tlog += "4. Índex horari\n";
    tlog += "===============\n\n"; 

    const R_AT = 2000/56/50;
    const r_AT = R_AT / Z_b2;
    const x_AT = r_AT * 0.1;
    const u_g = U_G / U_N1;
    const r_totV2 = r_tot + r_AT;
    const x_totV2 = x_tot + x_AT;
    const z_totV2Mod = (r_totV2**2 + x_totV2**2)**0.5;
    const iModV2 = u_g /z_totV2Mod;



    tlog += "1. Paràmetres\n";
    tlog += "=============\n\n";
    
    tlog += blog2(S_N, U_N1, U_N2, U_G,
                 "S_N, U_N1, U_N2, U_G");
    tlog += blog2(ε_cc, W_cc, W_0, cosφ_0,
                 "ε_cc, W_cc, W_0, cosφ_0");
    tlog += logc("Z_2", Z_2);
    tlog += "\n\n\n";


    tlog += "1.1. Valors base\n";
    tlog += "----------------\n\n";

    tlog += blog2(S_N, UN_1, U_N2,
                 "S_N, UN_1, U_N2"); 
    tlog += blog2(I_N1, I_N2,
                 "I_N1, I_N2"); 
    tlog += blog2(Z_b1, Zb2,
                 "Z_b1, Zb2");
    tlog += "\n\n";


    tlog += "1.2. Valors reduïts\n";
    tlog += "-------------------\n\n";

    tlog += logc("z", z);
    tlog += logc("y_Fe", y_Fe);
    tlog += "\n\n";


    tlog += "1.3. Entrada i sortida reduïda\n";
    tlog += "------------------------------\n\n";

    tlog += blog2(U_1, "U_1");
    tlog += logc("u_1" u_1);
    tlog += logc("z_2" z_2);
    tlog += "\n\n";


    tlog += "1.4. Calcul Z equivalent i intensitat\n";
    tlog += "-------------------------------------\n\n";

    tlog += logc ("z_eq", z_eq);
    tlog += logc ("i_1", i_1);
    tlog += logc ("u_2", u_2);
    tlog += "\n\n";


    tlog += "1.5. caiguda de tensió\n";
    tlog += "----------------------\n\n";



    tlog += "2. Càlculs\n";
    tlog += "==========\n\n";
    
    a[1] = p; a[2] = ω;



    VLY_MAX = VNY;
    VF = VL / 3**0.5;
    tlog += blog("VLY_MAX", VLY_MAX, "VF", VF) + "\n\n\n";

    a[3] = VLY_MAX; a[4] = sN; a[5] = Mc;



    tlog += "2.1. Velocitat nominal\n";
    tlog += "----------------------\n\n";
    
    V1 = cpol(VF, 0);
    tlog += logc("V1", V1);
    
    actualitzaZeq(sN);
    actualitzaIs();

    a[6] = I1.r; a[7] = IM.r; a[8] = IFe.r; a[9] = I2.r;
    console.log(I2);



    tlog += "\n\n### Càlcul de potències\n\n";

    PCu1 = 3 * R1 * I1.r**2;
    PFe = 3 * RFe * IFe.r**2;
    PCu2 = 3 * r2 * i2.r**2;
    Pmi = 3 * rc * i2.r**2;
    tlog += blog("PCu1", PCu1, "PFe", PFe, "PCu2", PCu2) + 
            "Pmi: " + xs(Pmi/1000) + " kW\n";
        
    Pu = Pmi - Pm;
    tlog += "Pu = Pmi - Pm = " + xs(Pmi/1000) + " kW - " + xs(Pm) + 
            " = " + xs(Pu/1000) + " kW\n";
    P1 = (Pu + Pm + PCu2 + PFe + PCu1);
    tlog += "P1 = Pu + Pm + PCu2 + PFe + PCu1 = " + 
            xs(P1/1000) + " kW\n";
    φtot = Ztot.φ;
    P1b = 3 * V1.r * I1.r * cos(φtot);
    tlog += "P1 = 3 * V1.r * I1.r * cos(φtot) = \n"+
            "   = 3 * " +  xs(V1.r) + " * " + xs(I1.r)  + " * " + 
            xs(cos(φtot)) + " = " + xs(P1b/1000) + " kW\n";
    η = Pu / P1 * 100;
    
    P1N = 3**0.5 * VNY * INY * fdp;
    tlog += "P1N = 3**0.5 * VNY * INY * fdp = " +
            xs(P1N/1000) + " kW\n\n";
    
    ηN = PuN*1000 / P1N * 100;
    tlog += blog("η", η, "ηN", ηN) + "\n\n";

    a[10] = η; a[11] = ηN;



    tlog += "## Càlcul de moments\n\n";
    Mu = Pu / (2 * π * nN / 60);
    Mn = PuN*1000 / (2 * π * nN / 60);
    tlog += blog("Mu", Mu, "Mn", Mn) + "\n\n\n";

    a[12] = Mu; a[13] = Mn;



    tlog += "2.2. Arrencada\n";
    tlog += "--------------";

    s = 1;                              // Motor aturat
    actualitzaZeq(s);
    actualitzaIs();
    tlog += "\n\n";


    tlog += "### Càlcul Moment\n\n"
    tlog += logc("I1arr", I1.r);
    Marr = 3 * r2 * i2.r**2 / s / (2 * π * ns / 60);
    tlog += blog("Marr", Marr) + "\n\n\n";

    a[14] = I1.r; a[15] = Marr;




    tlog += "Càlcul d'intensitat i Moment amb VF/3\n";
    tlog += "-------------------------------------\n\n";
    V1 = cpol(VF/3, 0);
    tlog += logc("V1", V1);
    actualitzaIs();
    tlog += "\n\n";


    tlog += "### Càlcul Moment\n\n"
    tlog += blog("I1arr", I1.r);
    Marr = 3 * r2 * i2.r**2 / s / (2 * π * ns / 60);
    tlog += blog("Marr", Marr) + "\n\n\n";
    a[16] = I1.r; a[17] = Marr;




    tlog += "Càlcul d'intensitat i Moment amb Rrot = 10 Ω\n";
    tlog += "--------------------------------------------\n\n";
    V1 = cpol(VF, 0);
    tlog += logc("V1", V1);
    R2 = R2 + Rr;
    tlog += blog("R2", R2, "s", s);
    
    actualitzaZeq(s);
    actualitzaIs();
    tlog += "\n\n";

    tlog += "### Càlcul Moment\n\n"
    tlog += blog("I1arr", I1.r);
    Marr = 3 * r2 * i2.r**2 / s / (2 * π * ns / 60);
    tlog += blog("Marr", Marr) + "\n\n\n";
    a[18] = I1.r; a[19] = Marr;

/*
    r_e1 = [
        p, ω, VLY_MAX, sN, M,
        I1.r, IM.r, IFe.r, I2.r, η, ηN,
        I1arr,
    ];

*/
    xs_e1 = a.slice(1).map(xsMap); //resultats amb 4 xifres significatives
    solucions = solucions.concat(xs_e1);

}




function actualitzaZeq(s){

    tlog += "\n\n### Càlcul d'impedàncies\n\n";

    tlog += blog ("s", s);

    r2 = R2 * rt**2;
    x2 = X2 * rt**2;
    rc = r2 * (1 - s) / s;
    tlog += blog("R2'", r2, "X2'", x2, "Rc'", rc);
    
    ra = r2 + rc;
    xa = x2;
    za = cbi(ra, xa);
    tlog += logc("Za", za);
    
    ya = invc(za);                  // ya = 1 / za
    tlog += logc("Ya", ya);


    BM = -1 / XM;
    GFe = 1 / RFe;
    YFe = cbi(GFe, BM);
    tlog += logc("YFe", YFe);
    Yb = sumc(ya, YFe);             // Yb = ya + YFe
    tlog += logc("Yb", Yb);
    Zb = invc(Yb);                  // Zb = 1 / Yb
    tlog += logc ("Zb", Zb);


    Z1 = cbi(R1, X1);
    Ztot = sumc(Z1, Zb);            // Ztot = Z1 + Zb
    tlog += logc("Ztot", Ztot);
}


 function actualitzaIs(){
    tlog += "\n\n### Càlcul d'intensitats\n\n";

    I1 = divc(V1, Ztot);                // I1 = V1 / Ztot
    tlog +=  logc("I1", I1);

    Vb = multc(I1, Zb);                 // Vb = I1 / Zb
    tlog += logc("Vb", Vb);

    RFec = cbi(RFe, 0);
    XMc = cbi(0, XM);
    IFe = divc(Vb, RFec);               // IFe = Vb / RFec
    IM = divc(Vb, XMc);                 // IM = Vb / XM
    tlog += logc("IFe", IFe);
    tlog += logc("IM", IM);
 
    i2 = divc(Vb, za);                  // i2 = Vb / za
    rtc = cbi(rt, 0);
    I2 = multc(rtc, i2);                // I2 = rt * i2
    tlog += logc("i2", i2);
    tlog += logc("I2", I2);
 }

