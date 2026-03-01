/**
 * agents.js — Gestion des agents IA
 *
 * Fonctions de mise à jour des statuts visuels des agents,
 * de leurs logs en temps réel, et des contrôles spécifiques
 * (slider charge, sélecteur mode sécurité).
 *
 * Dépendances : state.js
 */

/**
 * Met à jour l'indicateur de statut visuel d'un agent.
 * @param {string} agentId  - Clé de l'agent dans l'objet `agents`
 * @param {'idle'|'active'|'thinking'|'error'} status - Nouveau statut
 */
function setAgentStatus(agentId, status) {
    const dot = document.getElementById(`status-${agentId}`);
    if (dot) {
        dot.className = `status-dot status-${status}`;
        agents[agentId].status = status;
    }
}

/**
 * Affiche un message court dans le log d'un agent.
 * Applique un bref flash de couleur pour signaler la mise à jour.
 * @param {string} agentId - Clé de l'agent
 * @param {string} message - Texte à afficher
 */
function agentLog(agentId, message) {
    const log = document.getElementById(`log-${agentId}`);
    if (log) {
        log.textContent = message;
        log.classList.add('text-zinc-300');
        setTimeout(() => log.classList.remove('text-zinc-300'), 500);
    }
}

/**
 * Met à jour la valeur affichée du slider "Simulated users"
 * et synchronise le log de l'agent Load & Data.
 * @param {string|number} val - Valeur brute du slider
 */
function updateLoadValue(val) {
    document.getElementById('load-value').textContent = parseInt(val).toLocaleString();
    agentLog('load', `Configured: ${val} concurrent users`);
}

/**
 * Synchronise le log de l'agent Security Tester
 * lorsque l'utilisateur change le mode dans le <select>.
 * @param {string} mode - Valeur de l'option sélectionnée
 */
function updateSecurityMode(mode) {
    const labels = {
        recon:     'Passive reconnaissance',
        injection: 'Injection testing',
        fuzz:      'Fuzzing',
        dos:       'Controlled stress'
    };
    agentLog('security', `Mode: ${labels[mode]}`);
}
