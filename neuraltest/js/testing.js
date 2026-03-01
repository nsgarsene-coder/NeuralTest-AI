/**
 * testing.js — Logique de simulation des sessions de test
 *
 * Orchestre les phases d'analyse, génère les métriques en temps
 * réel, met à jour les graphiques et produit le rapport final.
 *
 * Dépendances : state.js, agents.js, charts.js, ui.js
 */

/* ── Utilitaires ────────────────────────────────────────────── */

/**
 * Retourne une promesse résolue après `ms` millisecondes.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Génère un message d'erreur aléatoire pour la simulation.
 * @returns {string}
 */
function generateError() {
    const errors = [
        'Timeout on /api/users',
        '500 Internal Server Error on POST /auth/login',
        'Memory leak detected after 1000 requests',
        'CORS policy violation on cross-origin request',
        'Validation failed: malformed JSON payload'
    ];
    return errors[Math.floor(Math.random() * errors.length)];
}

/* ── Orchestration principale ───────────────────────────────── */

/**
 * Lance la séquence d'analyse en trois phases :
 *   1. Context Analyzer — détection de l'architecture
 *   2. Test Manager     — génération de la stratégie
 *   3. Agents spécialisés — exécution distribuée
 *
 * Valide d'abord que l'utilisateur a renseigné une cible.
 */
async function startAnalysis() {
    const url = document.getElementById('target-url').value;
    if (!url) {
        alert('Please enter a target URL or description');
        return;
    }

    // Afficher et faire défiler vers le panneau de test
    const panel = document.getElementById('testing-panel');
    panel.classList.remove('hidden');
    panel.scrollIntoView({ behavior: 'smooth' });

    // Phase 1 : Analyzer
    setAgentStatus('analyzer', 'thinking');
    agentLog('analyzer', 'Analyzing architecture...');
    logOrchestrator(`Target acquired: ${url.substring(0, 40)}...`);

    await delay(2000);
    agentLog('analyzer', 'Stack detected: React/Node.js/PostgreSQL');
    setAgentStatus('analyzer', 'active');

    // Phase 2 : Manager
    setAgentStatus('manager', 'thinking');
    agentLog('manager', 'Generating test strategy...');
    logOrchestrator('Analysis report received');

    await delay(1500);
    agentLog('manager', `${currentMode} strategy generated: 47 scenarios`);
    setAgentStatus('manager', 'active');

    // Phase 3 : Exécution distribuée
    logOrchestrator('Distributing tasks to specialized agents');
    startTesting();
}

/**
 * Démarre la boucle de simulation de test.
 * Met à jour les métriques, les logs et les graphiques
 * à intervalles réguliers jusqu'à la fin de la session.
 */
function startTesting() {
    isTesting = true;
    let coverage = 0;
    let requests = 0;
    let errors   = 0;

    // Activer les agents selon le mode
    if (currentMode === 'comprehensive' || currentMode === 'ux') {
        setAgentStatus('user', 'active');
        agentLog('user', 'Simulating user journeys...');
    }
    if (currentMode === 'comprehensive' || currentMode === 'security') {
        setAgentStatus('security', 'active');
        agentLog('security', 'Running security scans...');
    }
    if (currentMode === 'comprehensive' || currentMode === 'performance') {
        setAgentStatus('load', 'active');
        agentLog('load', 'Stress test in progress...');
    }

    testInterval = setInterval(() => {
        if (!isTesting) return;

        // Incrémenter les métriques
        requests += Math.floor(Math.random() * 500) + 100;
        coverage  = Math.min(100, coverage + Math.random() * 3);
        const latency = Math.floor(Math.random() * 200) + 50;

        // Erreurs aléatoires
        if (Math.random() > 0.85) {
            errors++;
            addLog('error', generateError());
        } else {
            const successMessages = [
                'GET /api/health → 200 OK (12ms)',
                'POST /auth/login → 200 OK (45ms)',
                'GET /api/users → 200 OK (89ms)',
                'PUT /api/settings → 204 No Content (23ms)',
                'Security scan: XSS check passed',
                'Load test: 1000 concurrent users handled',
                'UI flow: checkout completed successfully'
            ];
            addLog('info', successMessages[Math.floor(Math.random() * successMessages.length)]);
        }

        // Mise à jour des métriques affichées
        document.getElementById('metric-req').textContent      = requests.toLocaleString();
        document.getElementById('metric-latency').textContent  = `${latency}ms`;
        document.getElementById('metric-errors').textContent   = errors;
        document.getElementById('metric-coverage').textContent = `${Math.floor(coverage)}%`;

        // Mise à jour des graphiques
        updateCharts(coverage);

        // Fin de session après couverture complète
        if (coverage >= 95) {
            clearInterval(testInterval);
            finishTesting();
        }
    }, 800);
}

/**
 * Met à jour les données des deux graphiques Chart.js.
 * @param {number} coverage - Pourcentage de couverture global
 */
function updateCharts(coverage) {
    coverageChart.data.datasets[0].data = [
        Math.min(100, coverage * 1.1),
        Math.min(100, coverage * 1.2),
        Math.min(100, coverage * 0.9),
        Math.min(100, coverage * 1.0),
        Math.min(100, coverage * 0.7),
        Math.min(100, coverage * 0.95)
    ];
    coverageChart.update();

    if (Math.random() > 0.7) {
        issuesChart.data.datasets[0].data = [
            Math.floor(Math.random() * 2),
            Math.floor(Math.random() * 4),
            Math.floor(Math.random() * 6),
            Math.floor(Math.random() * 8),
            Math.floor(Math.random() * 10)
        ];
        issuesChart.update();
    }
}

/**
 * Termine la session de test : remet les agents en idle,
 * logue la fin et génère le rapport final.
 */
function finishTesting() {
    isTesting = false;
    ['analyzer', 'manager', 'user', 'security', 'load'].forEach(id => {
        setAgentStatus(id, 'idle');
    });
    logOrchestrator('All agents completed. Generating report...');
    addLog('success', 'Testing session complete. All agents debriefed.');
    generateFinalReport();
}

/**
 * Met en pause la simulation (stoppe l'intervalle sans réinitialiser).
 */
function pauseTesting() {
    isTesting = false;
    logOrchestrator('Session paused by user');
    addLog('info', 'Testing paused');
}

/**
 * Arrête définitivement la session et réinitialise l'état.
 */
function stopTesting() {
    clearInterval(testInterval);
    isTesting = false;
    ['analyzer', 'manager', 'user', 'security', 'load'].forEach(id => {
        setAgentStatus(id, 'idle');
    });
    document.getElementById('testing-panel').classList.add('hidden');
    logOrchestrator('Session terminated by user');
}

/* ── Rapport final ──────────────────────────────────────────── */

/**
 * Génère et insère dynamiquement une carte d'insight
 * "Performance Optimization Available" dans la liste des rapports.
 */
function generateFinalReport() {
    addLog('success', 'Final report generated by Orchestrator');
    logOrchestrator('Comprehensive analysis complete');

    const insights   = document.getElementById('insights-list');
    const newInsight = document.createElement('div');
    newInsight.className = 'report-card rounded-lg p-4 cursor-pointer chat-message';
    newInsight.onclick   = function () { toggleInsight(this); };

    newInsight.innerHTML = `
        <div class="flex items-start gap-4">
            <div class="w-8 h-8 rounded bg-emerald-900/30 border border-emerald-800 flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
            </div>
            <div class="flex-1">
                <div class="flex justify-between items-start">
                    <h4 class="font-medium text-sm text-emerald-400">Performance Optimization Available</h4>
                    <span class="text-xs text-zinc-500 mono">Just now</span>
                </div>
                <p class="text-xs text-zinc-400 mt-2 leading-relaxed">
                    Redis caching recommended for frequent endpoints.
                    Projected latency reduction: 40%. Implementation complexity: Low.
                </p>
                <div class="mt-3 flex gap-2">
                    <button onclick="downloadInsight(this, 'performance-opt')"
                            class="text-xs text-emerald-500 hover:text-emerald-400 transition">
                        Download analysis
                    </button>
                    <span class="text-zinc-700">|</span>
                    <button onclick="applyFix('cache')"
                            class="text-xs text-blue-500 hover:text-blue-400 transition">
                        View implementation
                    </button>
                </div>
            </div>
        </div>
    `;

    insights.insertBefore(newInsight, insights.firstChild);
}
