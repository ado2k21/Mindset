// JavaScript pour le menu déroulant
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}

// Fermer le menu si on clique en dehors
window.onclick = function(event) {
    const menu = document.getElementById('menu');
    if (!event.target.matches('.menu-button')) {
        if (menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    }
};

// Slider manuel
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  if (index >= slides.length) currentSlide = 0;
  if (index < 0) currentSlide = slides.length - 1;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  currentSlide++;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide--;
  showSlide(currentSlide);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentSlide);
});

// Gestion du formulaire d'inscription par e-mail
const emailForm = document.getElementById('email-form');
const formMessage = document.getElementById('form-message');

emailForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Empêcher l'envoi du formulaire par défaut

    const formData = new FormData(emailForm);
    const email = formData.get('email');

    // Validation simple de l'e-mail
    if (!email || !email.includes('@')) {
        formMessage.textContent = 'Veuillez entrer une adresse e-mail valide.';
        formMessage.style.color = 'red';
        return;
    }

    // Envoyer les données du formulaire à Formspree
    try {
        const response = await fetch(emailForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formMessage.textContent = 'Merci ! Vous recevrez bientôt nos offres.';
            formMessage.style.color = 'green';
            emailForm.reset(); // Réinitialiser le formulaire
        } else {
            formMessage.textContent = 'Une erreur s\'est produite. Veuillez réessayer.';
            formMessage.style.color = 'red';
        }
    } catch (error) {
        formMessage.textContent = 'Une erreur s\'est produite. Veuillez réessayer.';
        formMessage.style.color = 'red';
    }
});

// Désactiver le clic droit sur la page
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Désactiver les raccourcis clavier (Ctrl+S, Ctrl+Shift+I, etc.)
document.addEventListener('keydown', function (e) {
    // Empêcher Ctrl+S (enregistrer)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
    }
    // Empêcher Ctrl+Shift+I (outils de développement)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
    }
    // Empêcher Ctrl+U (afficher le code source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
    }
});