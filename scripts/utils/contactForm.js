// Fonction pour afficher la modal de contact
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
  }
  
  // Fonction pour fermer la modal de contact
  function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
  }
  
  // Sélectionnez le formulaire par son ID
  const contactForm = document.getElementById("contactForm");
  
  // Ajoutez un gestionnaire d'événement pour l'événement "submit"
  contactForm.addEventListener("submit", function(event) {
    // Empêchez la soumission par défaut du formulaire, car nous allons gérer cela manuellement
    event.preventDefault();
  
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    console.log("Prénom:", prenom);
    console.log("Nom:", nom);
    console.log("Email:", email);
    console.log("Message:", message);

    contactForm.reset();
  
    closeModal();
  });
  