/**
 * charts.js — Gestion des graphiques Chart.js
 *
 * Initialise le graphique radar de couverture et le graphique
 * en barres de répartition des issues. Expose les instances
 * globalement pour que testing.js puisse les mettre à jour.
 *
 * Dépendances : Chart.js (CDN), state.js
 */

/* ── Graphique Radar : Couverture par module ─────────────────── */
const coverageCtx = document.getElementById('coverageChart').getContext('2d');

/** @type {Chart} Instance globale du graphique de couverture */
const coverageChart = new Chart(coverageCtx, {
    type: 'radar',
    data: {
        labels: ['Auth', 'API', 'UI', 'Database', 'Security', 'Performance'],
        datasets: [{
            label: 'Current Coverage',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor:     'rgba(37, 99, 235, 0.2)',
            borderColor:         'rgba(37, 99, 235, 1)',
            borderWidth:         1,
            pointBackgroundColor:'rgba(37, 99, 235, 1)',
            pointBorderColor:    '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor:     'rgba(37, 99, 235, 1)'
        }]
    },
    options: {
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                grid:        { color: 'rgba(255, 255, 255, 0.05)' },
                angleLines:  { color: 'rgba(255, 255, 255, 0.05)' },
                pointLabels: {
                    color: 'rgba(255, 255, 255, 0.5)',
                    font:  { size: 10 }
                },
                ticks: { display: false }
            }
        },
        plugins: { legend: { display: false } }
    }
});

/* ── Graphique Barres : Issues par sévérité ──────────────────── */
const issuesCtx = document.getElementById('issuesChart').getContext('2d');

/** @type {Chart} Instance globale du graphique d'issues */
const issuesChart = new Chart(issuesCtx, {
    type: 'bar',
    data: {
        labels: ['Critical', 'High', 'Medium', 'Low', 'Info'],
        datasets: [{
            label: 'Issues',
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(239, 68,  68,  0.8)',
                'rgba(249, 115, 22,  0.8)',
                'rgba(245, 158, 11,  0.8)',
                'rgba(59,  130, 246, 0.8)',
                'rgba(113, 113, 122, 0.8)'
            ],
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                grid:  { color: 'rgba(255, 255, 255, 0.05)' },
                ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { size: 10 } }
            },
            x: {
                grid:  { display: false },
                ticks: { color: 'rgba(255, 255, 255, 0.5)', font: { size: 10 } }
            }
        },
        plugins: { legend: { display: false } }
    }
});
