// ======================================================
// MAPA DEL COFRE V2
// Servidor América
// ======================================================

// ---------- CONFIGURACIÓN ----------

// Último inicio de ventana confirmado (Chile)
const BASE = new Date("2026-07-26T05:15:00-04:00");

// Tiempo entre ventanas
const INTERVAL = 225 * 60 * 1000; // 3h 45m

// Duración de la ventana
const WINDOW = 15 * 60 * 1000; // 15 minutos

// Cantidad de próximos cofres
const NEXT_SPAWNS = 10;


// ---------- ELEMENTOS ----------

const countdown = document.getElementById("countdown");
const progressBar = document.getElementById("progress-bar");
const statusTitle = document.getElementById("statusTitle");
const chileClock = document.getElementById("chileClock");
const spawnList = document.getElementById("spawnList");
const countryTable = document.getElementById("countryTable");


// ---------- PAÍSES ----------

const countries = [

    // América
    {flag:"https://flagcdn.com/w40/ca.png",zone:"America/Toronto"},
    {flag:"https://flagcdn.com/w40/us.png",zone:"America/New_York"},
    {flag:"https://flagcdn.com/w40/us.png",zone:"America/Chicago"},
    {flag:"https://flagcdn.com/w40/us.png",zone:"America/Denver"},
    {flag:"https://flagcdn.com/w40/us.png",zone:"America/Los_Angeles"},

    {flag:"https://flagcdn.com/w40/mx.png",zone:"America/Mexico_City"},

    {flag:"https://flagcdn.com/w40/gt.png",zone:"America/Guatemala"},
    {flag:"https://flagcdn.com/w40/bz.png",zone:"America/Belize"},
    {flag:"https://flagcdn.com/w40/hn.png",zone:"America/Tegucigalpa"},
    {flag:"https://flagcdn.com/w40/sv.png",zone:"America/El_Salvador"},
    {flag:"https://flagcdn.com/w40/ni.png",zone:"America/Managua"},
    {flag:"https://flagcdn.com/w40/cr.png",zone:"America/Costa_Rica"},
    {flag:"https://flagcdn.com/w40/pa.png",zone:"America/Panama"},
    {flag:"https://flagcdn.com/w40/co.png",zone:"America/Bogota"},
    {flag:"https://flagcdn.com/w40/ec.png",zone:"America/Guayaquil"},
    {flag:"https://flagcdn.com/w40/pe.png",zone:"America/Lima"},
    {flag:"https://flagcdn.com/w40/bo.png",zone:"America/La_Paz"},
    {flag:"https://flagcdn.com/w40/cl.png",zone:"America/Santiago"},
    {flag:"https://flagcdn.com/w40/ve.png",zone:"America/Caracas"},
    {flag:"https://flagcdn.com/w40/ar.png",zone:"America/Argentina/Buenos_Aires"},
    {flag:"https://flagcdn.com/w40/uy.png",zone:"America/Montevideo"},
    {flag:"https://flagcdn.com/w40/py.png",zone:"America/Asuncion"},
    {flag:"https://flagcdn.com/w40/br.png",zone:"America/Sao_Paulo"}

];

// ======================================================
// FUNCIONES
// ======================================================

// Devuelve el inicio de la ventana actual o siguiente
function getCurrentWindow() {

    const now = new Date();

    const elapsed = now - BASE;

    const cycles = Math.floor(elapsed / INTERVAL);

    const start = new Date(BASE.getTime() + cycles * INTERVAL);
    const end = new Date(start.getTime() + WINDOW);

    if (now < start) {
        return {
            start: start,
            end: end,
            active: false
        };
    }

    if (now >= start && now < end) {
        return {
            start: start,
            end: end,
            active: true
        };
    }

    const nextStart = new Date(start.getTime() + INTERVAL);

    return {
        start: nextStart,
        end: new Date(nextStart.getTime() + WINDOW),
        active: false
    };

}


// ------------------------------------------------------

function updateChileClock(){

    chileClock.textContent =
        new Date().toLocaleTimeString("es-CL",{

            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit",

            hour12:false,

            timeZone:"America/Santiago"

        });

}


// ------------------------------------------------------

function updateCountdown(){

    const now = new Date();

    const windowData = getCurrentWindow();

    let diff;

    if(windowData.active){

        statusTitle.textContent =
            "🟢 EL COFRE YA APARECIÓ";

        diff = windowData.end - now;

        progressBar.style.background =
            "linear-gradient(90deg,#26d07c,#66ff99)";

    }

    else{

        statusTitle.textContent =
            "📦 El Cofre aparecerá en";

        diff = windowData.start - now;

        progressBar.style.background =
            "linear-gradient(90deg,#2fa8ff,#26d07c)";

    }

    const h =
        Math.floor(diff / 3600000);

    const m =
        Math.floor((diff % 3600000) / 60000);

    const s =
        Math.floor((diff % 60000) / 1000);

    countdown.textContent =
        `${String(h).padStart(2,'0')}:` +
        `${String(m).padStart(2,'0')}:` +
        `${String(s).padStart(2,'0')}`;

}

// ------------------------------------------------------

function updateProgressBar(){

    const now = new Date();

    const windowData = getCurrentWindow();

    let percent;

    if(windowData.active){

        percent =
            ((now-windowData.start)/WINDOW)*100;

    }

    else{

        const previous =
            new Date(windowData.start.getTime()-INTERVAL);

        percent =
            ((now-previous)/INTERVAL)*100;

    }

    progressBar.style.width =
        Math.max(0,Math.min(100,percent))+"%";

}



// ------------------------------------------------------

function update(){

    updateChileClock();

    updateCountdown();

    updateProgressBar();

}

update();

setInterval(update,1000);
