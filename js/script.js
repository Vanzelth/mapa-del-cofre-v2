// ======================================================
// MAPA DEL COFRE V0.3.2
// Servidor América
// ======================================================

// ==================== CONFIGURACIÓN ====================

const BASE_CHILE = {
    year: 2026,
    month: 7,
    day: 26,
    hour: 5,
    minute: 15
};

const INTERVAL = 225 * 60 * 1000; // 3h 45m
const WINDOW = 15 * 60 * 1000;    // 15 min
const NEXT_SPAWNS = 10;

function getBaseDate() {
    return new Date(
        BASE_CHILE.year,
        BASE_CHILE.month - 1,
        BASE_CHILE.day,
        BASE_CHILE.hour,
        BASE_CHILE.minute,
        0,
        0
    );
}

const BASE = getBaseDate();

// ==================== ELEMENTOS ====================

const countdown = document.getElementById('countdown');
const progressBar = document.getElementById('progress-bar');
const statusTitle = document.getElementById('statusTitle');
const statusBadge = document.getElementById('statusBadge');
const heroSubtitle = document.getElementById('heroSubtitle');
const chileClock = document.getElementById('chileClock');
const spawnList = document.getElementById('spawnList');
const countryTable = document.getElementById('countryTable');
const timelineMarkers = document.getElementById('timelineMarkers');
const timelineProgress = document.getElementById('timelineProgress');

// ==================== PAÍSES ====================

const countries = [
    { flag:'https://flagcdn.com/w40/mx.png', name:'México', zone:'America/Mexico_City' },
    { flag:'https://flagcdn.com/w40/gt.png', name:'Guatemala', zone:'America/Guatemala' },
    { flag:'https://flagcdn.com/w40/bz.png', name:'Belice', zone:'America/Belize' },
    { flag:'https://flagcdn.com/w40/hn.png', name:'Honduras', zone:'America/Tegucigalpa' },
    { flag:'https://flagcdn.com/w40/sv.png', name:'El Salvador', zone:'America/El_Salvador' },
    { flag:'https://flagcdn.com/w40/ni.png', name:'Nicaragua', zone:'America/Managua' },
    { flag:'https://flagcdn.com/w40/cr.png', name:'Costa Rica', zone:'America/Costa_Rica' },
    { flag:'https://flagcdn.com/w40/pa.png', name:'Panamá', zone:'America/Panama' },
    { flag:'https://flagcdn.com/w40/co.png', name:'Colombia', zone:'America/Bogota' },
    { flag:'https://flagcdn.com/w40/ec.png', name:'Ecuador', zone:'America/Guayaquil' },
    { flag:'https://flagcdn.com/w40/pe.png', name:'Perú', zone:'America/Lima' },
    { flag:'https://flagcdn.com/w40/cl.png', name:'Chile', zone:'America/Santiago' },
    { flag:'https://flagcdn.com/w40/bo.png', name:'Bolivia', zone:'America/La_Paz' },
    { flag:'https://flagcdn.com/w40/ve.png', name:'Venezuela', zone:'America/Caracas' },
    { flag:'https://flagcdn.com/w40/ar.png', name:'Argentina', zone:'America/Argentina/Buenos_Aires' },
    { flag:'https://flagcdn.com/w40/uy.png', name:'Uruguay', zone:'America/Montevideo' },
    { flag:'https://flagcdn.com/w40/py.png', name:'Paraguay', zone:'America/Asuncion' },
    { flag:'https://flagcdn.com/w40/br.png', name:'Brasil', zone:'America/Sao_Paulo' },

    { flag:'https://flagcdn.com/w40/pt.png', name:'Portugal', zone:'Europe/Lisbon' },
    { flag:'https://flagcdn.com/w40/gb.png', name:'Reino Unido', zone:'Europe/London' },
    { flag:'https://flagcdn.com/w40/es.png', name:'España', zone:'Europe/Madrid' },
    { flag:'https://flagcdn.com/w40/fr.png', name:'Francia', zone:'Europe/Paris' },
    { flag:'https://flagcdn.com/w40/de.png', name:'Alemania', zone:'Europe/Berlin' },
    { flag:'https://flagcdn.com/w40/it.png', name:'Italia', zone:'Europe/Rome' },

    { flag:'https://flagcdn.com/w40/tr.png', name:'Turquía', zone:'Europe/Istanbul' },
    { flag:'https://flagcdn.com/w40/sa.png', name:'Arabia Saudita', zone:'Asia/Riyadh' },
    { flag:'https://flagcdn.com/w40/ae.png', name:'Emiratos Árabes', zone:'Asia/Dubai' },

    { flag:'https://flagcdn.com/w40/in.png', name:'India', zone:'Asia/Kolkata' },
    { flag:'https://flagcdn.com/w40/th.png', name:'Tailandia', zone:'Asia/Bangkok' },
    { flag:'https://flagcdn.com/w40/sg.png', name:'Singapur', zone:'Asia/Singapore' },
    { flag:'https://flagcdn.com/w40/cn.png', name:'China', zone:'Asia/Shanghai' },
    { flag:'https://flagcdn.com/w40/jp.png', name:'Japón', zone:'Asia/Tokyo' },
    { flag:'https://flagcdn.com/w40/kr.png', name:'Corea del Sur', zone:'Asia/Seoul' },

    { flag:'https://flagcdn.com/w40/au.png', name:'Australia', zone:'Australia/Sydney' }
];

// ==================== MOTOR DEL EVENTO ====================

function getWindowData() {

    const now = new Date();
    const elapsed = now - BASE;

    const cycles = Math.floor(elapsed / INTERVAL);

    const start = new Date(BASE.getTime() + cycles * INTERVAL);
    const end = new Date(start.getTime() + WINDOW);

    if (now >= start && now < end) {
        return { start, end, active: true };
    }

    const nextStart = now < start
        ? start
        : new Date(start.getTime() + INTERVAL);

    return {
        start: nextStart,
        end: new Date(nextStart.getTime() + WINDOW),
        active: false
    };
}

// ==================== RELOJ DE CHILE ====================

function updateChileClock() {

    chileClock.textContent = new Date().toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'America/Santiago'
    });

}

// ==================== CONTADOR ====================

function updateCountdown() {

    const now = new Date();
    const data = getWindowData();

    let diff;

    if (data.active) {

        document.body.classList.add('window-active');

        statusTitle.textContent = '🟢 El Cofre se verá en';
        statusBadge.textContent = 'Ventana de aparición activa';
        heroSubtitle.textContent = 'El cofre puede aparecer en cualquier momento';

        diff = data.end - now;

    } else {

        document.body.classList.remove('window-active');

        statusTitle.textContent = '📦 El Cofre aparecerá en';
        statusBadge.textContent = 'Esperando próxima ventana';
        heroSubtitle.textContent = 'Próxima ventana del evento';

        diff = data.start - now;

    }

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    countdown.textContent =
        `${String(h).padStart(2,'0')}:` +
        `${String(m).padStart(2,'0')}:` +
        `${String(s).padStart(2,'0')}`;

}

// ==================== BARRA DE PROGRESO ====================

function updateProgressBar() {

    const now = new Date();
    const data = getWindowData();

    let percent;

    if (data.active) {
        percent = ((now - data.start) / WINDOW) * 100;
    } else {
        const previous = new Date(data.start.getTime() - INTERVAL);
        percent = ((now - previous) / INTERVAL) * 100;
    }

    progressBar.style.width =
        Math.max(0, Math.min(100, percent)) + '%';

}

// ==================== HORARIOS MUNDIALES ====================

function updateWorldTimes() {

    const data = getWindowData();
    const target = data.start;

    const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const groups = {};

    countries.forEach(country => {

        const hour = target.toLocaleTimeString('es-CL', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: country.zone
        });

        if (!groups[hour]) groups[hour] = [];

        groups[hour].push(country);

    });

    countryTable.innerHTML = '';

    Object.keys(groups)
        .sort()
        .forEach(hour => {

            const group = groups[hour];
            const isLocal = group.some(c => c.zone === userZone);

            countryTable.innerHTML += `
                <div class="time-group ${isLocal ? 'local' : ''}">

                    <div class="time-row">

                        <div class="time-column">

                            <div class="time-hour">${hour}</div>

                            <div class="time-count">
                                ${group.length} ${group.length === 1 ? 'país' : 'países'}
                            </div>

                            ${isLocal ? '<div class="time-local">Tu hora local</div>' : ''}

                        </div>

                        <div class="country-grid">

                            ${group.map(country => `
                                <div class="country-item">

                                    <img src="${country.flag}" alt="${country.name}">

                                    <div class="country-name">
                                        ${country.name}
                                    </div>

                                </div>
                            `).join('')}

                        </div>

                    </div>

                </div>
            `;

        });

}

// ==================== PRÓXIMOS COFRES ====================

function updateSpawnList() {

    const now = new Date();
    const data = getWindowData();

    spawnList.innerHTML = '';

    for (let i = 0; i < NEXT_SPAWNS; i++) {

        const start = new Date(data.start.getTime() + INTERVAL * i);
        const end = new Date(start.getTime() + WINDOW);

        const diff = start - now;
        const totalMinutes = Math.max(0, Math.floor(diff / 60000));

        const h = Math.floor(totalMinutes / 60);
        const m = totalMinutes % 60;

        const dateText = start.toLocaleDateString('es-CL', {
            weekday: 'long',
            day: '2-digit',
            month: 'long'
        });

        const startTime = start.toLocaleTimeString('es-CL', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const endTime = end.toLocaleTimeString('es-CL', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        spawnList.innerHTML += `
            <div class="spawn-card">

                <div class="spawn-title">
                    Ventana ${i + 1}
                </div>

                <div class="spawn-time">
                    En ${h} h ${m} min
                </div>

                <div class="spawn-detail">
                    ${dateText}
                </div>

                <div class="spawn-detail">
                    ${startTime} – ${endTime} (Chile)
                </div>

            </div>
        `;

    }

}

// ==================== LÍNEA DE TIEMPO ====================

function updateTimeline() {

    const data = getWindowData();
    const now = new Date();

    timelineMarkers.innerHTML = "";

    for (let i = 0; i < 6; i++) {

        const start = new Date(data.start.getTime() + INTERVAL * i);

        const marker = document.createElement("div");
        marker.className = "timeline-marker";

        const dot = document.createElement("div");
        dot.className = "timeline-dot";

        if (i === 0) {
            dot.classList.add("active");
        }

        const time = document.createElement("div");
        time.className = "timeline-time";
        time.textContent = start.toLocaleTimeString("es-CL", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });

        marker.appendChild(dot);
        marker.appendChild(time);

        timelineMarkers.appendChild(marker);

    }

    let percent;

    if (data.active) {
        percent = ((now - data.start) / WINDOW) * 100;
    } else {
        const previous = new Date(data.start.getTime() - INTERVAL);
        percent = ((now - previous) / INTERVAL) * 100;
    }

    timelineProgress.style.width =
        Math.max(0, Math.min(100, percent)) + "%";

}

// ==================== ACTUALIZACIÓN GENERAL ====================

function update() {

    updateChileClock();
    updateCountdown();
    updateProgressBar();
    updateTimeline();
    updateWorldTimes();
    updateSpawnList();

}

// ==================== INICIO ====================

update();
setInterval(update, 1000);