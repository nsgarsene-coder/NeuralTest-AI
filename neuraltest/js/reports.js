/**
 * reports.js — Gestion des rapports et des insights
 *
 * Gère l'affichage de la notification de téléchargement,
 * le toggle d'expansion des cartes d'insight et les
 * suggestions de correctifs.
 *
 * Dépendances : state.js
 */

/**
 * Affiche la notification de téléchargement en bas à droite
 * avec le nom de fichier généré, puis la masque après 3 secondes.
 * @param {'pdf'|'json'} format - Format du rapport à télécharger
 */
function downloadReport(format) {
    const notification = document.getElementById('download-notification');
    const filename     = document.getElementById('download-filename');

    const date = new Date().toISOString().split('T')[0];
    filename.textContent = `neuraltest-analysis-${date}.${format}`;

    notification.classList.remove('hidden', 'translate-y-20');
    notification.classList.add('download-active');

    setTimeout(() => {
        notification.classList.add('translate-y-20');
        setTimeout(() => {
            notification.classList.remove('download-active');
            notification.classList.add('hidden');
        }, 300);
    }, 3000);
}

/**
 * Déclenche le téléchargement d'un insight spécifique au format JSON.
 * Stoppe la propagation pour éviter de déclencher le toggle de la carte.
 * @param {HTMLElement} btn - Bouton cliqué
 * @param {string} id       - Identifiant de l'insight (non utilisé côté front)
 */
function downloadInsight(btn, id) {
    event.stopPropagation();
    downloadReport('json');
}

/**
 * Affiche une suggestion de correctif pour un type de problème donné.
 * Stoppe la propagation pour éviter de déclencher le toggle de la carte.
 * @param {'nplus1'|'xss'|'cache'} type - Type de correctif
 */
function applyFix(type) {
    event.stopPropagation();
    alert(`Fix suggestion for "${type}" would open in implementation view`);
}

/**
 * Bascule l'affichage complet / tronqué du contenu d'une carte d'insight.
 * @param {HTMLElement} element - Élément de la carte cliqué
 */
function toggleInsight(element) {
    const content = element.querySelector('p');
    content.classList.toggle('line-clamp-2');
}
