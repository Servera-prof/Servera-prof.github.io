

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

const rutaEnunciat = 'md/enun_ex3_maquines_asinc.md';
const rutaAvaluacio = 'md/aval_ex3_maquines_asinc.md';
const puntuacions = ["",
    1, 1, 1, 1, 1,
    2, 2, 2, 2, 1.5, 1.5,
/*  2, 3,
    2, 3, 
    3, 3
*/];


const e1 = {};
calculs[2] = "";
tlog = "";
function estableixParametres(){
    let p_e1;
    e1.R1 = 0.5;
    e1.X1 = 1.5;
    e1.R2 = 0.1;
    e1.X2 = 0.2;
    e1.RFe = 360;
    e1.XM = 40;
    e1.rt = 2.5;
    e1.Pm = 100;

    e1.nN = 1425;
    e1.PuN = 9.2;
    e1.VND = 230;
    e1.VNY = 400;
    e1.VN = "△ " + e1.VND + " / Υ " + e1.VNY;
    e1.f = 50;
    e1.INY = 18;
    e1.fdp = 0.85;

    e1.M = 14;
    e1.VL = 400;
    e1.Rr = 10;

    p_e1 = [
        e1.R1, e1.X1, e1.R2, e1.X2, e1.RFe, e1.XM, e1.rt, e1.Pm,
        e1.nN, e1.PuN, e1.VN, e1.f, e1.INY, e1.fdp,
        e1.M, e1.VL, e1.Rr
    ];
    parametres = parametres.concat(p_e1);
}

function calcula(){

    tlog += "1. Paràmetres\n";
    tlog += "=============\n\n";
    R1 = e1.R1; X1 = e1.X1; R2 = e1.R2; X2 = e1.X2;
    tlog += blog("R1", R1, "X1", X1, "R2", R2, "X2", X2);
    
    RFe = e1.RFe; XM = e1.XM; rt = e1.rt; Pm = e1.Pm;
    tlog += blog("RFe", RFe, "XM", XM, "rt", rt, "Pm", Pm);

    nN = e1.nN; PuN = e1.PuN; VND = e1.VND; VNY = e1.VNY;
    tlog += blog("nN", nN, "PuN", PuN, "VND", VND, "VNY", VNY);

    f = e1.f; INY = e1.INY; fdp = e1.fdp; 
    tlog += blog("f", f, "INY", INY, "fdp", fdp);

    M = e1.M; VL = e1.VL; Rr = e1.Rr;
    tlog += blog("M", M, "VL", VL, "Rr", Rr) + "\n\n\n";



    tlog += "2. Càlculs\n";
    tlog += "==========\n\n";
    p = Math.floor(60 * f / nN);
    ω = 2 * π * f;
    ns = 60 * f / p;
    sN = (ns - nN) / ns;
    tlog += blog("p", p, "ω", ω, "ns", ns, "sN", sN);

    VLY_MAX = VNY;
    VF = VL / 3**0.5;
    tlog += blog("VLY_MAX", VLY_MAX, "VF", VF) + "\n\n\n";



    tlog += "2.1. Velocitat nominal\n";
    tlog += "----------------------\n\n";
    V1 = cpol(VF, 0);
    tlog += logc("V1", V1);



  
    actualitzaZeq(sN, rt, R2, X2, XM, RFe, R1, X1);



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
    tlog += blog("η", η);

    P1N = 3**0.5 * VNY * INY * fdp;
    ηN = PuN*1000 / P1N * 100;
    tlog += "P1N = 3**0.5 * VNY * INY * fdp = " +
            xs(P1N/1000) + " kW\n\n\n\n";



    tlog += "2.2. Arrencada\n";
    tlog += "--------------";

    s = 1;                              // Motor aturat
    actualitzaZeq(1, rt, R2, X2, XM, RFe, R1, X1);
    I1arr = divc(V1, Ztot);             // I1 = V1 / Ztot

    tlog += "### Càlcul d'intensitat i Moment" 
    tlog += logc("I1arr", I1arr);

    r_e1 = [
        p, ω, VLY_MAX, sN, M,
        I1.r, IM.r, IFe.r, I2.r, η, ηN,
        /*I1arr,*/
    ];

    xs_e1 = r_e1.map(xsMap); //resultats amb 4 xifres significatives
    solucions = solucions.concat(xs_e1);

}




function actualitzaZeq(s, rt, R2, X2, XM, RFe, R1, X1){

    tlog += "\n\n### Càlcul d'impedàncies\n\n";

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

