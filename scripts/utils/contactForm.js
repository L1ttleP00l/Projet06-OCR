function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';

  // Désactiver le défilement sur le body lorsque la modale est ouverte.
  document.body.style.overflow = 'hidden';

  // Appel de la fonction pour piéger le focus dans la modale.
  trapFocus(modal);

  // Ajout de l'écouteur pour les clics à l'extérieur de la modale et la touche 'Echap'.
  window.addEventListener('click', handleWindowClick);
  window.addEventListener('keydown', handleEscapeClick);
}

function trapFocus(modal) {
  const focusableContent = modal.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="email"], input[type="password"], input[type="submit"]');
  const firstFocusableElement = focusableContent[0]; 
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  // Si aucun élément focusable n'est trouvé, sortez de la fonction.
  if (!firstFocusableElement) {
    return;
  }

  // Mettez le focus sur le premier élément focusable.
  firstFocusableElement.focus();

  modal.addEventListener('keydown', function(e) {
    let isTabPressed = e.key === 'Tab';

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) { // Si la touche majuscule est enfoncée pendant que 'Tab' est pressé
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else { // Si la touche majuscule n'est pas enfoncée
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });
}

function handleWindowClick(event) {
  const modal = document.getElementById('contact_modal');

  // Vérifiez si le clic a été fait à l'extérieur de la modale.
  if (event.target === modal) {
    closeModal();
  }
}

function handleEscapeClick(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';

  // Réactiver le défilement sur le body lorsque la modale est fermée.
  document.body.style.overflow = 'auto';

  // Réactiver le focus pour les éléments hors de la modale.
  document.querySelectorAll('a, button, input, textarea, video').forEach(elem => {
    elem.removeAttribute('tabindex');
  });

  // Supprimer les écouteurs d'événements.
  window.removeEventListener('click', handleWindowClick);
  window.removeEventListener('keydown', handleEscapeClick);
}

// Ajouter des écouteurs d'événements au formulaire de contact et au bouton d'ouverture de la modale.
document.querySelector('.contact_button').addEventListener('click', displayModal);
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // [Votre logique de traitement du formulaire]

  closeModal();
});