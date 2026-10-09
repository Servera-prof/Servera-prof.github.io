function aleat(min, max) { // enter aleat entre min i max (inclosos)
    const a = Math.ceil(min);
    const b = Math.floor(max);
    const c = Math.floor(Math.random() * (b - a + 1) + a);
    return c;
}

function triaElementMatriu (matriu){
    const aleat = Math.floor(Math.random() * (matriu.length));
    return matriu[aleat.toFixed(0)];
}

function tan(a){
    return Math.tan(a*2*π/360);
}

function atan(a){
    return Math.atan(a)*360/2/π;
}

function sin(a){
    return Math.sin(a*2*π/360);
}

function asin(a){
    return Math.asin(a)*360/2/π;
}

function cos(a){
    return Math.cos(a*2*π/360);
}

function acos(a){
    return Math.acos(a)*360/2/π;
}


function cbi(x, y){ //complexe input en binomial
    const c = {};
    c.r = (x**2 + y**2)**0.5;
    c.φ = Math.atan2(y, x)*360/2/π;
    c.x = x;
    c.y = y;
    return c;
}

function cpol(r, φ){ //complexe input en polar
    const c = {};
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
    let log = "";
    log += nom + ": ";
    log += xs(v.x);
    if (v.y > 0) log += " + j" + xs(v.y);
    else if (v.y < 0) log += "-j" + xs(-v.y);
    log += "; ";
    log += xs(v.r) + "∠" + xs(v.φ) + "°\n";
    log = coma(log);
    return log;
}

function logcbi (v){ // log de un numero complexe només en binomial
    let log = "";
    log += xs(v.x);
    if (v.y > 0) log += " + j" + xs(v.y);
    else if (v.y < 0) log += "-j" + xs(-v.y);
    log = coma(log);
    return log;
}

function l(a, b = 4){  // log abreviat a l totsol
    return coma(xs(a, b));
}

function ll(a, b = 4){ // log Latex
    return cl(xs(a, b));
}

function xs(a, b = 4){
    a = Number(a);
    if (a.toPrecision) a = a.toPrecision(b);
    return a;
}

function coma(a){
    a = a + "";
    return a.replaceAll(".", ",");
}

function cl(a){ // coma per a latex
    return coma(a).replaceAll(",", "{,}");
}

function xsMap(a){
    a = xs(a);
    return a;
}

function binari(n) {
    a = n;
    return a.toString(2).toString();
}

function hexadecimal(n) {
    a = n;
    return a.toString(16).toUpperCase();
}
