/**
 * state.js — État global de l'application NeuralTest AI
 *
 * Ce module centralise toutes les variables d'état partagées
 * entre les différents modules. Il est chargé en premier.
 */

/** Mode de test actif : 'comprehensive' | 'security' | 'performance' | 'ux' */
let currentMode = 'comprehensive';

/** Identifiant de l'agent actuellement ouvert dans le chat modal */
let currentAgent = null;

/** Indique si une session de test est en cours */
let isTesting = false;

/** Référence à l'intervalle de simulation de test */
let testInterval;

/** Historique des messages par agent : { agentId: [{type, text}] } */
let messageHistory = {};

/**
 * Registre des agents disponibles.
 * Chaque entrée contient le nom affiché, le statut courant et la couleur d'accentuation.
 */
const agents = {
    analyzer:     { name: 'Context Analyzer',  status: 'idle',   color: 'blue' },
    manager:      { name: 'Test Manager',       status: 'idle',   color: 'purple' },
    orchestrator: { name: 'Orchestrator',       status: 'active', color: 'blue' },
    user:         { name: 'User Simulator',     status: 'idle',   color: 'emerald' },
    security:     { name: 'Security Tester',    status: 'idle',   color: 'red' },
    load:         { name: 'Load & Data',        status: 'idle',   color: 'orange' }
};
