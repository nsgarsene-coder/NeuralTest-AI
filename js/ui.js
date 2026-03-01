/**
 * ui.js — Contrôles de l'interface utilisateur
 *
 * Gère la navigation entre sections, les logs de l'orchestrateur,
 * les logs du panneau de test en temps réel, et le changement de mode.
 *
 * Dépendances : state.js
 */

/* ── Navigation ─────────────────────────────────────────────── */

/**
 * Fait défiler vers la section demandée.
 * Masque aussi le panneau de test si on revient au dashboard.
 * @param {'dashboard'|'agents'|'reports'} section
 */
function showSection(section) {
    document.getElementById('testing-panel').classList.add('hidden');

    if (section === 'dashboard') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'agents') {
        document.getElementById('agents-grid').scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'reports') {
        document.querySelector('.reports-section').scrollIntoView({ behavior: 'smooth' });
    }
}

/* ── Mode de test ───────────────────────────────────────────── */

/**
 * Active le mode de test sélectionné et met à jour
 * l'apparence des boutons de mode.
 * @param {'comprehensive'|'security'|'performance'|'ux'} mode
 */
function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => {
        const isActive = btn.dataset.mode === mode;
        btn.classList.toggle('bg-blue-600',  isActive);
        btn.classList.toggle('text-white',   isActive);
        btn.classList.toggle('bg-zinc-800',  !isActive);
        btn.classList.toggle('text-zinc-400', !isActive);
    });
    logOrchestrator(`Mode switched: ${mode.toUpperCase()}`);
}

/* ── Log de l'orchestrateur ─────────────────────────────────── */

/**
 * Insère une entrée horodatée dans le log de l'orchestrateur.
 * Les entrées les plus récentes apparaissent en haut.
 * @param {string} message
 */
function logOrchestrator(message) {
    const log  = document.getElementById('orchestrator-log');
    const time = new Date().toLocaleTimeString('en-US', {
        hour12: false, hour: '2-digit', minute: '2-digit'
    });
    const entry = document.createElement('div');
    entry.className = 'text-blue-400';
    entry.innerHTML = `<span class="text-zinc-600">[${time}]</span> ${message}`;
    log.insertBefore(entry, log.firstChild);
}

/* ── Logs du panneau de test en direct ──────────────────────── */

/**
 * Ajoute une ligne de log dans le flux en direct.
 * @param {'info'|'error'|'success'} type - Niveau du log
 * @param {string} message
 */
function addLog(type, message) {
    const logs = document.getElementById('live-logs');
    const div  = document.createElement('div');
    const time = new Date().toLocaleTimeString('en-US', {
        hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const colorMap = {
        info:    'text-zinc-400 border-zinc-700',
        error:   'text-red-400  border-red-800',
        success: 'text-emerald-400 border-emerald-800'
    };

    div.className = `border-l-2 pl-2 ${colorMap[type] || colorMap.info}`;
    div.innerHTML = `<span class="text-zinc-600">${time}</span> ${message}`;

    logs.appendChild(div);
    logs.scrollTop = logs.scrollHeight;
}

/** Vide le flux de logs en direct. */
function clearLogs() {
    document.getElementById('live-logs').innerHTML =
        '<div class="text-zinc-600 border-l-2 border-zinc-700 pl-2">Log cleared</div>';
}

/* ── Initialisation ─────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
    logOrchestrator('System initialized. All agents standing by.');

    // Pré-remplir les métriques et graphiques après un court délai
    setTimeout(() => {
        document.getElementById('metric-req').textContent      = '12,450';
        document.getElementById('metric-latency').textContent  = '124ms';
        document.getElementById('metric-errors').textContent   = '3';
        document.getElementById('metric-coverage').textContent = '78%';

        coverageChart.data.datasets[0].data = [85, 92, 67, 88, 45, 78];
        coverageChart.update();

        issuesChart.data.datasets[0].data = [1, 2, 4, 8, 12];
        issuesChart.update();
    }, 500);
});
