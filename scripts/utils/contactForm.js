// Function to display the modal
function displayModal () {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';

  // Disable scrolling on the body when the modal is open.
  document.body.style.overflow = 'hidden';

  // Call the function to trap focus within the modal.
  trapFocus(modal);

  // Add event listeners for clicks outside the modal and the 'Escape' key.
  window.addEventListener('click', handleWindowClick);
  window.addEventListener('keydown', handleEscapeClick);
}

// Function to trap focus within the modal
function trapFocus (modal) {
  const focusableContent = modal.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="email"], input[type="password"], input[type="submit"]');
  const firstFocusableElement = focusableContent[0];
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  // If no focusable elements are found, exit the function.
  if (!firstFocusableElement) {
    return;
  }

  // Set focus to the first focusable element.
  firstFocusableElement.focus();

  modal.addEventListener('keydown', function (e) {
    let isTabPressed = e.key === 'Tab';

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) { // If the Shift key is pressed while 'Tab' is pressed
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else { // If the Shift key is not pressed
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });
}

// Function to handle clicks outside the modal
function handleWindowClick (event) {
  const modal = document.getElementById('contact_modal');

  // Check if the click was made outside the modal.
  if (event.target === modal) {
    closeModal();
  }
}

// Function to handle the 'Escape' key press
function handleEscapeClick (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// Function to close the modal
function closeModal () {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';

  // Re-enable scrolling on the body when the modal is closed.
  document.body.style.overflow = 'auto';

  // Re-enable focus for elements outside of the modal.
  document.querySelectorAll('a, button, input, textarea, video').forEach(elem => {
    elem.removeAttribute('tabindex');
  });

  // Remove event listeners.
  window.removeEventListener('click', handleWindowClick);
  window.removeEventListener('keydown', handleEscapeClick);
}

// Add event listeners to the modal open button and the contact form.
document.querySelector('.contact_button').addEventListener('click', displayModal);
document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();

  // Retrieve form field values using identifiers
  const firstName = document.getElementById('prenom').value;
  const lastName = document.getElementById('nom').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Display values in the console
  console.log('Prénom:', firstName);
  console.log('Nom:', lastName);
  console.log('Email:', email);
  console.log('Message:', message);

  closeModal();
});
