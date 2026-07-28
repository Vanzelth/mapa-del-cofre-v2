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

    // Norteamérica
    {code:"CA",name:"Canadá (Toronto)",flag:"https://flagcdn.com/w40/ca.png",zone:"America/Toronto"},
    {code:"US",name:"Estados Unidos (Nueva York)",flag:"https://flagcdn.com/w40/us.png",zone:"America/New_York"},
    {code:"US",name:"Estados Unidos (Chicago)",flag:"https://flagcdn.com/w40/us.png",zone:"America/Chicago"},
    {code:"US",name:"Estados Unidos (Denver)",flag:"https://flagcdn.com/w40/us.png",zone:"America/Denver"},
    {code:"US",name:"Estados Unidos (Los Ángeles)",flag:"https://flagcdn.com/w40/us.png",zone:"America/Los_Angeles"},
    {code:"MX",name:"México",flag:"https://flagcdn.com/w40/mx.png",zone:"America/Mexico_City"},

    // Centroamérica
    {code:"GT",name:"Guatemala",flag:"https://flagcdn.com/w40/gt.png",zone:"America/Guatemala"},
    {code:"BZ",name:"Belice",flag:"https://flagcdn.com/w40/bz.png",zone:"America/Belize"},
    {code:"HN",name:"Honduras",flag:"https://flagcdn.com/w40/hn.png",zone:"America/Tegucigalpa"},
    {code:"SV",name:"El Salvador",flag:"https://flagcdn.com/w40/sv.png",zone:"America/El_Salvador"},
    {code:"NI",name:"Nicaragua",flag:"https://flagcdn.com/w40/ni.png",zone:"America/Managua"},
    {code:"CR",name:"Costa Rica",flag:"https://flagcdn.com/w40/cr.png",zone:"America/Costa_Rica"},
    {code:"PA",name:"Panamá",flag:"https://flagcdn.com/w40/pa.png",zone:"America/Panama"},

    // Caribe
    {code:"CU",name:"Cuba",flag:"https://flagcdn.com/w40/cu.png",zone:"America/Havana"},
    {code:"DO",name:"República Dominicana",flag:"https://flagcdn.com/w40/do.png",zone:"America/Santo_Domingo"},
    {code:"PR",name:"Puerto Rico",flag:"https://flagcdn.com/w40/pr.png",zone:"America/Puerto_Rico"},
    {code:"JM",name:"Jamaica",flag:"https://flagcdn.com/w40/jm.png",zone:"America/Jamaica"},

    // Sudamérica
    {code:"CO",name:"Colombia",flag:"https://flagcdn.com/w40/co.png",zone:"America/Bogota"},
    {code:"EC",name:"Ecuador",flag:"https://flagcdn.com/w40/ec.png",zone:"America/Guayaquil"},
    {code:"PE",name:"Perú",flag:"https://flagcdn.com/w40/pe.png",zone:"America/Lima"},
    {code:"BO",name:"Bolivia",flag:"https://flagcdn.com/w40/bo.png",zone:"America/La_Paz"},
    {code:"CL",name:"Chile",flag:"https://flagcdn.com/w40/cl.png",zone:"America/Santiago"},
    {code:"VE",name:"Venezuela",flag:"https://flagcdn.com/w40/ve.png",zone:"America/Caracas"},
    {code:"AR",name:"Argentina",flag:"https://flagcdn.com/w40/ar.png",zone:"America/Argentina/Buenos_Aires"},
    {code:"UY",name:"Uruguay",flag:"https://flagcdn.com/w40/uy.png",zone:"America/Montevideo"},
    {code:"PY",name:"Paraguay",flag:"https://flagcdn.com/w40/py.png",zone:"America/Asuncion"},
    {code:"BR",name:"Brasil",flag:"https://flagcdn.com/w40/br.png",zone:"America/Sao_Paulo"},

    // Europa
    {code:"PT",name:"Portugal",flag:"https://flagcdn.com/w40/pt.png",zone:"Europe/Lisbon"},
    {code:"ES",name:"España",flag:"https://flagcdn.com/w40/es.png",zone:"Europe/Madrid"},
    {code:"GB",name:"Reino Unido",flag:"https://flagcdn.com/w40/gb.png",zone:"Europe/London"},
    {code:"FR",name:"Francia",flag:"https://flagcdn.com/w40/fr.png",zone:"Europe/Paris"},
    {code:"BE",name:"Bélgica",flag:"https://flagcdn.com/w40/be.png",zone:"Europe/Brussels"},
    {code:"NL",name:"Países Bajos",flag:"https://flagcdn.com/w40/nl.png",zone:"Europe/Amsterdam"},
    {code:"DE",name:"Alemania",flag:"https://flagcdn.com/w40/de.png",zone:"Europe/Berlin"},
    {code:"CH",name:"Suiza",flag:"https://flagcdn.com/w40/ch.png",zone:"Europe/Zurich"},
    {code:"AT",name:"Austria",flag:"https://flagcdn.com/w40/at.png",zone:"Europe/Vienna"},
    {code:"IT",name:"Italia",flag:"https://flagcdn.com/w40/it.png",zone:"Europe/Rome"},
    {code:"PL",name:"Polonia",flag:"https://flagcdn.com/w40/pl.png",zone:"Europe/Warsaw"},
    {code:"CZ",name:"República Checa",flag:"https://flagcdn.com/w40/cz.png",zone:"Europe/Prague"},
    {code:"HU",name:"Hungría",flag:"https://flagcdn.com/w40/hu.png",zone:"Europe/Budapest"},
    {code:"RO",name:"Rumanía",flag:"https://flagcdn.com/w40/ro.png",zone:"Europe/Bucharest"},
    {code:"BG",name:"Bulgaria",flag:"https://flagcdn.com/w40/bg.png",zone:"Europe/Sofia"},
    {code:"GR",name:"Grecia",flag:"https://flagcdn.com/w40/gr.png",zone:"Europe/Athens"},
    {code:"SE",name:"Suecia",flag:"https://flagcdn.com/w40/se.png",zone:"Europe/Stockholm"},
    {code:"NO",name:"Noruega",flag:"https://flagcdn.com/w40/no.png",zone:"Europe/Oslo"},
    {code:"DK",name:"Dinamarca",flag:"https://flagcdn.com/w40/dk.png",zone:"Europe/Copenhagen"},
    {code:"FI",name:"Finlandia",flag:"https://flagcdn.com/w40/fi.png",zone:"Europe/Helsinki"},
    {code:"TR",name:"Turquía",flag:"https://flagcdn.com/w40/tr.png",zone:"Europe/Istanbul"},

    // Asia
    {code:"IL",name:"Israel",flag:"https://flagcdn.com/w40/il.png",zone:"Asia/Jerusalem"},
    {code:"SA",name:"Arabia Saudita",flag:"https://flagcdn.com/w40/sa.png",zone:"Asia/Riyadh"},
    {code:"AE",name:"Emiratos Árabes Unidos",flag:"https://flagcdn.com/w40/ae.png",zone:"Asia/Dubai"},
    {code:"IN",name:"India",flag:"https://flagcdn.com/w40/in.png",zone:"Asia/Kolkata"},
    {code:"TH",name:"Tailandia",flag:"https://flagcdn.com/w40/th.png",zone:"Asia/Bangkok"},
    {code:"VN",name:"Vietnam",flag:"https://flagcdn.com/w40/vn.png",zone:"Asia/Ho_Chi_Minh"},
    {code:"MY",name:"Malasia",flag:"https://flagcdn.com/w40/my.png",zone:"Asia/Kuala_Lumpur"},
    {code:"SG",name:"Singapur",flag:"https://flagcdn.com/w40/sg.png",zone:"Asia/Singapore"},
    {code:"PH",name:"Filipinas",flag:"https://flagcdn.com/w40/ph.png",zone:"Asia/Manila"},
    {code:"CN",name:"China",flag:"https://flagcdn.com/w40/cn.png",zone:"Asia/Shanghai"},
    {code:"TW",name:"Taiwán",flag:"https://flagcdn.com/w40/tw.png",zone:"Asia/Taipei"},
    {code:"KR",name:"Corea del Sur",flag:"https://flagcdn.com/w40/kr.png",zone:"Asia/Seoul"},
    {code:"JP",name:"Japón",flag:"https://flagcdn.com/w40/jp.png",zone:"Asia/Tokyo"},

    // Oceanía
    {code:"AU",name:"Australia (Sídney)",flag:"https://flagcdn.com/w40/au.png",zone:"Australia/Sydney"},
    {code:"AU",name:"Australia (Perth)",flag:"https://flagcdn.com/w40/au.png",zone:"Australia/Perth"},
    {code:"NZ",name:"Nueva Zelanda",flag:"https://flagcdn.com/w40/nz.png",zone:"Pacific/Auckland"}

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
