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

// Bloque le clic droit et le drag sur toutes les vidéos
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('contextmenu', e => e.preventDefault());
  video.addEventListener('dragstart', e => e.preventDefault());
});

// Bloquer F12 et PrintScreen
document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || e.key === 'PrintScreen') {
    alert('Action interdite');
    e.preventDefault();
  }
});

// Pause vidéo si l'onglet est inactif (anti OBS / capture)
document.addEventListener('visibilitychange', function() {
  const video = document.querySelector('video');
  if (video) {
    if (document.hidden) {
      video.pause();
    } else {
      video.play();
    }
  }
});

function redirectTo(url) {
    window.open(url, '_blank');
}

// Stockage local pour persister le compte à rebours
const COUNTDOWN_KEY = 'countdownEndTime';

// Durée initiale du compte à rebours (24 heures)
const INITIAL_DURATION = 24 * 60 * 60 * 1000;

// Éléments du DOM
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Initialisation du compte à rebours
function initCountdown() {
    let endTime = localStorage.getItem(COUNTDOWN_KEY);
    
    if (!endTime || parseInt(endTime) < Date.now()) {
        endTime = Date.now() + INITIAL_DURATION;
        localStorage.setItem(COUNTDOWN_KEY, endTime);
    } else {
        endTime = parseInt(endTime);
    }
    
    if (endTime - Date.now() <= 0) {
        endTime = Date.now() + 1000;
        localStorage.setItem(COUNTDOWN_KEY, endTime);
    }
    
    return endTime;
}

// Mise à jour du compte à rebours
function updateCountdown(endTime) {
    const now = Date.now();
    const remainingTime = endTime - now;
    
    if (remainingTime <= 0) {
        const randomDuration = Math.floor(Math.random() * 23 * 60 * 60 * 1000) + (60 * 60 * 1000);
        endTime = now + randomDuration;
        localStorage.setItem(COUNTDOWN_KEY, endTime);
    }
    
    const totalSeconds = Math.floor(remainingTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    
    setTimeout(() => updateCountdown(endTime), 1000);
}

// Lancement du compte à rebours
const endTime = initCountdown();
updateCountdown(endTime);

// Animation supplémentaire pour le badge de réduction
const discountBadge = document.querySelector('.discount-badge');

setInterval(() => {
    discountBadge.style.transform = 'scale(1.1)';
    setTimeout(() => {
        discountBadge.style.transform = 'scale(1)';
    }, 300);
}, 3000);