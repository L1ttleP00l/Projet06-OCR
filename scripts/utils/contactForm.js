// // Fonction pour afficher la modal de contact
// function displayModal() {
//   const modal = document.getElementById('contact_modal');
//   modal.style.display = 'block';

//   // Désactiver le focus pour les éléments hors de la modale
//   document.querySelectorAll('a, button, input, textarea, video').forEach(elem => {
//       if (!modal.contains(elem)) {
//           elem.setAttribute('tabindex', '-1');
//       }
//   });

//   // Mettre le focus sur le premier élément du formulaire ou sur la modale elle-même
//   const firstInput = modal.querySelector('input');
//   if (firstInput) {
//       firstInput.focus();
//   } else {
//       // Si pour une raison quelconque il n'y a pas d'entrée, définissez le focus sur la modale elle-même
//       modal.setAttribute('tabindex', '0');
//       modal.focus();
//   }

//   // Ajouter un écouteur d'événements pour la gestion du focus et la touche Échap
//   modal.addEventListener('keydown', handleModalKeydown);
// }

// // Gestionnaire pour le comportement du clavier dans la modale
// function handleModalKeydown(event) {
//   const modal = document.getElementById('contact_modal');
  
//   // Si la touche 'Échap' est pressée, fermez la modale.
//   if (event.key === 'Escape' || event.key === 'Esc') {
//       closeModal();
//       return;
//   }
  
//   // Si la touche 'Tab' est pressée, gérer le focus à l'intérieur de la modale.
//   if (event.key === 'Tab') {
//       const focusableElementsString = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
//       const focusableElements = modal.querySelectorAll(focusableElementsString);
//       const firstFocusable = focusableElements[0];
//       const lastFocusable = focusableElements[focusableElements.length - 1];

//       if (!event.shiftKey && document.activeElement === lastFocusable) {
//           firstFocusable.focus();
//           event.preventDefault();
//       } else if (event.shiftKey && document.activeElement === firstFocusable) {
//           lastFocusable.focus();
//           event.preventDefault();
//       }
//   }
// }

// // Fonction pour fermer la modal de contact
// function closeModal() {
//   const modal = document.getElementById('contact_modal');
//   modal.style.display = 'none';

//   // Réactiver le focus pour les éléments hors de la modale
//   document.querySelectorAll('a, button, input, textarea, video').forEach(elem => {
//       elem.removeAttribute('tabindex');
//   });

//   // Supprimer l'écouteur d'événements pour la touche 'Échap' et la gestion du focus
//   modal.removeEventListener('keydown', handleModalKeydown);
// }

// // Lorsque le formulaire est soumis, affichez les données saisies dans la console et réinitialisez le formulaire.
// document.getElementById("contactForm").addEventListener("submit", function(event) {
//   event.preventDefault(); // Empêche l'envoi normal du formulaire

//   // Récupération des valeurs des champs du formulaire
//   const prenom = document.getElementById("prenom").value;
//   const nom = document.getElementById("nom").value;
//   const email = document.getElementById("email").value;
//   const message = document.getElementById("message").value;

//   // Affichage des données du formulaire dans la console
//   console.log("Prénom:", prenom);
//   console.log("Nom:", nom);
//   console.log("Email:", email);
//   console.log("Message:", message);

//   // Réinitialisation du formulaire et fermeture de la modale
//   this.reset();
//   closeModal();
// });


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

  // Optionnel : renvoyer le focus à l'élément qui a déclenché l'ouverture de la modale.
  // document.querySelector('.contact_button').focus();
}

// Ajouter des écouteurs d'événements au formulaire de contact et au bouton d'ouverture de la modale.
document.querySelector('.contact_button').addEventListener('click', displayModal);
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // [Votre logique de traitement du formulaire]

  closeModal();
});