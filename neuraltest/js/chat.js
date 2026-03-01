/**
 * chat.js — Interface de chat avec les agents
 *
 * Gère l'ouverture / fermeture du modal de chat, l'envoi de
 * messages utilisateur, la simulation de réponses des agents
 * et la persistance de l'historique en mémoire.
 *
 * Dépendances : state.js, agents.js
 */

/**
 * Ouvre le modal de chat pour un agent donné.
 * Restaure l'historique de conversation s'il existe.
 * @param {string} agentId - Clé de l'agent dans l'objet `agents`
 */
function openAgentChat(agentId) {
    currentAgent = agentId;
    const agent = agents[agentId];

    document.getElementById('chat-agent-name').textContent = agent.name;
    document.getElementById('chat-agent-role').textContent =
        `Direct configuration — ${_agentRoleLabel(agentId)}`;

    const statusDot = document.getElementById('chat-agent-status');
    statusDot.className = `status-dot status-${agent.status}`;

    // Restaurer ou initialiser l'historique
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';

    if (messageHistory[agentId]) {
        messageHistory[agentId].forEach(msg => addChatMessage(msg.type, msg.text, false));
    } else {
        const welcome = 'Ready to receive instructions. What specific parameters would you like to configure for this testing session?';
        addChatMessage('agent', welcome, false);
        messageHistory[agentId] = [{ type: 'agent', text: welcome }];
    }

    document.getElementById('chat-modal').classList.remove('hidden');
    document.getElementById('chat-input').focus();
}

/** Ferme le modal de chat et réinitialise l'agent courant. */
function closeChat() {
    document.getElementById('chat-modal').classList.add('hidden');
    currentAgent = null;
}

/**
 * Pré-remplit le champ de saisie du chat avec un texte suggéré.
 * @param {string} text - Texte à insérer
 */
function setChatInput(text) {
    document.getElementById('chat-input').value = text;
}

/**
 * Ajoute un message dans la fenêtre de chat.
 * @param {'user'|'agent'} type - Émetteur du message
 * @param {string} text         - Contenu du message
 * @param {boolean} [save=true] - Enregistrer dans l'historique
 */
function addChatMessage(type, text, save = true) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    const isUser = type === 'user';

    div.className = `chat-message ${isUser
        ? 'bg-blue-900/20 border border-blue-800/50'
        : 'bg-zinc-900 border border-zinc-800'} rounded-lg p-3`;

    div.innerHTML = `
        <div class="text-xs ${isUser ? 'text-blue-400' : 'text-zinc-500'} mb-1 mono">
            ${isUser ? 'YOU' : 'AGENT'}
        </div>
        <p class="text-sm text-zinc-300">${text}</p>
    `;

    container.appendChild(div);
    container.scrollTop = container.scrollHeight;

    if (save && currentAgent) {
        if (!messageHistory[currentAgent]) messageHistory[currentAgent] = [];
        messageHistory[currentAgent].push({ type, text });
    }
}

/**
 * Envoie le message saisi par l'utilisateur et simule
 * une réponse de l'agent après un délai d'une seconde.
 */
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const text  = input.value.trim();
    if (!text || !currentAgent) return;

    addChatMessage('user', text);
    input.value = '';

    setTimeout(() => {
        const responses = [
            `Configuration updated: ${text}. This will be applied to the next testing cycle.`,
            `Acknowledged. Adjusting parameters for ${currentAgent} agent.`,
            `Parameter accepted. Impact analysis: moderate. Proceeding with modified strategy.`,
            `Noted. I will prioritize this configuration in the execution queue.`
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        addChatMessage('agent', response);

        setAgentStatus(currentAgent, 'thinking');
        setTimeout(() => setAgentStatus(currentAgent, 'idle'), 2000);
    }, 1000);
}

/* ── Helpers privés ─────────────────────────────────────────── */

/**
 * Retourne le libellé de rôle d'un agent pour l'en-tête du modal.
 * @param {string} agentId
 * @returns {string}
 */
function _agentRoleLabel(agentId) {
    const labels = {
        analyzer: 'Architecture detection',
        manager:  'Strategy planning',
        user:     'Behavioral simulation',
        security: 'Security testing',
        load:     'Performance analysis'
    };
    return labels[agentId] || 'Specialized agent';
}

/* ── Écouteurs d'événements ─────────────────────────────────── */

// Fermer le modal en cliquant sur l'overlay
document.getElementById('chat-modal').addEventListener('click', function (e) {
    if (e.target === this) closeChat();
});
