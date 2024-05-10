

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

const rutaEnunciat = 'md/enun_ex3_maquines_asinc.md';
const rutaAvaluacio = 'md/aval_ex3_maquines_asinc.md';
const puntuacions = ["",
    1, 1, 1, 1, 0.5,
    2, 2, 2, 2, 
    1.5, 1.5, 1.5, 1.5,
    2, 2,
    2, 2, 
    3, 3
];

const a = [""];


const e1 = {};
calculs[2] = "";
tlog = "";
function estableixParametres(){
    let p_e1;
/*
    e1.R1 = 0.5;
    e1.X1 = 1.5;
    e1.R2 = 0.1;
    e1.X2 = 0.2;
    e1.RFe = 360;
    e1.XM = 40;
    e1.rt = 2.5;
    e1.Pm = 100;

    e1.nN = 1425;
    e1.PuN = 9.8;
    e1.VND = 230;
    e1.VNY = 400;
    e1.VN = "△ " + e1.VND + " / Υ " + e1.VNY;
    e1.f = 50;
    e1.INY = 18.7;
    e1.fdp = 0.85;

    e1.Mc = 14;
    e1.VL = 400;
    e1.Rr = 7;
*/
    e1.R1 = aleat (40, 50) / 100;
    e1.X1 = aleat (10, 20) / 10;
    e1.R2 = aleat (10, 20) / 100;
    e1.X2 = xs(aleat (20, 25) / 10 * e1.R2, 2);
    e1.RFe = aleat (30, 40) * 10;
    e1.XM = aleat (30, 40);
    e1.rt = aleat (20, 20) / 10;
    e1.Pm = aleat (10, 30) * 10;



    vns = [[127, 220], [230, 400], [400, 630]];
    vn = triaElementMatriu(vns);
    e1.VND = vn[0];
    e1.VNY = vn[1];
    e1.VN = "△ " + e1.VND + " / Υ " + e1.VNY;

    fs = [50, 60];
    e1.f = triaElementMatriu(fs);
    e1.nN = Math.round(aleat(93, 98) / 100 * 60 * e1.f / aleat (1, 4));

    is = calculaIs(e1.VNY/3**0.5, e1.f, e1.nN, e1.rt, 
        e1.R1, e1.X1, e1.RFe, e1.XM, e1.R2, e1.X2);
    e1.INY = xs(aleat(97, 103) / 100 * is.get("I1").r, 2);
    e1.PuN = xs(aleat(97, 103) / 100 * is.get("rc") * is.get("i2").r**2 * 3 / 1000, 2);
    e1.fdp = xs(cos(aleat(97, 103) / 100 * is.get("Ztot").φ), 2);

    e1.Mc = xs(aleat(25, 35) / 100 * e1.PuN*1e3 / (2*π * e1.nN / 60), 2);
    e1.VL = aleat (95, 101) / 100 * e1.VNY;
    e1.Rr = aleat (5, 8);

    p_e1 = [
        e1.R1, e1.X1, e1.R2, e1.X2, e1.RFe, e1.XM, e1.rt, e1.Pm,
        e1.nN, e1.PuN, e1.VN, e1.f, e1.INY, e1.fdp,
        e1.Mc, e1.VL, e1.Rr
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

    Mc = e1.Mc; VL = e1.VL; Rr = e1.Rr;
    tlog += blog("Mc", Mc, "VL", VL, "Rr", Rr) + "\n\n\n";



    tlog += "2. Càlculs\n";
    tlog += "==========\n\n";
    p = Math.floor(60 * f / nN);
    ω = 2 * π * nN / 60;
    ns = 60 * f / p;
    sN = (ns - nN) / ns;
    tlog += blog("p", p, "ω", ω, "ns", ns, "sN", sN);
    
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
    tlog += blog("I1arr", I1.r);
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

function calculaIs(Vin, f, n, rt, R1, X1, RFe, XM, R2, X2){

    const d = new Map();
    const r2 = R2 * rt**2;
    const x2 = X2 * rt**2;
    
    const p = Math.floor(60 * f / n);
    const ns = 60 * f / p;
    const s = (ns - n) / ns;
    const rc = r2 * (1 - s) / s;
    
    const za = cbi(r2 + rc, x2);
    const ya = invc(za);                 

    const YFe = cbi(1 / RFe, -1 / XM);
    const Yb = sumc(ya, YFe);            
    const Zb = invc(Yb);                 

    const Z1 = cbi(R1, X1);
    const Ztot = sumc(Z1, Zb);           

    const V1 = cbi(Vin, 0);
    const I1 = divc(V1, Ztot);        
    const Vb = multc(I1, Zb);         

    const RFec = cbi(RFe, 0);
    const XMc = cbi(0, XM);
    const IFe = divc(Vb, RFec);       
    const IM = divc(Vb, XMc);               
 
    const i2 = divc(Vb, za);                
    const rtc = cbi(rt, 0);
    const I2 = multc(rtc, i2);

    d.set("rc", rc);
    d.set("Ztot", Ztot);
    d.set("I1", I1);
    d.set("IFe", IFe);
    d.set("IM", IM);
    d.set("i2", i2);
    d.set("I2", I2);

    return d;              
}