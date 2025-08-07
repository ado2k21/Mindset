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

document.addEventListener('DOMContentLoaded', function() {
    const emails = [
        "Emilie***@gmail.com",
        "Widson***@gmail.com",
        "Polla***@gmail.com",
        "Rich***@gmail.com",
        "Celine***@gmail.com",
        "MrsAnna***@gmail.com",
        // ... (gardez votre liste d'emails complète)
        "MarcusJ***@gmail.com"
    ];
    
    const formations = [
        "fèk achte Formation an!",
        "apèn achte formation an!"
    ];
    
    const notification = document.getElementById("purchase-notification");
    
    function showRandomNotification() {
        const randomEmail = emails[Math.floor(Math.random() * emails.length)];
        const randomFormation = formations[Math.floor(Math.random() * formations.length)];
        
        notification.textContent = `${randomEmail} ${randomFormation}`;
        notification.style.display = "block";
        
        setTimeout(() => {
            notification.style.display = "none";
        }, 5000);
    }
    
    // Démarrer après 30 secondes
    setTimeout(() => {
        showRandomNotification();
        
        // Puis toutes les 30-40 secondes
        setInterval(showRandomNotification, 30000 + Math.random() * 10000);
    }, 30000);
});

// Vérifie que le logo est bien chargé
document.addEventListener('DOMContentLoaded', function() {
  const logo = document.querySelector('img[src*="logogoogle"]');
  if (!logo) {
    console.warn("Le logo principal n'a pas été trouvé");
  }
});

// Configuration
const config = {
    targetPercentage: 97,      // Pourcentage final
    animationDuration: 1500,  // Durée animation en ms (1.5s)
    repeatDelay: 5000,       // Répétition toutes les 10s
    initialDelay: 500         // Délai avant première animation
};

const progressBar = document.getElementById('progress-bar');
let currentPercentage = 0;

function animate() {
    if (currentPercentage < config.targetPercentage) {
        currentPercentage += 1;
        progressBar.style.width = currentPercentage + '%';
        progressBar.textContent = currentPercentage + '%';
        setTimeout(animate, config.animationDuration / config.targetPercentage);
    } else {
        setTimeout(resetAnimation, config.repeatDelay - config.animationDuration);
    }
}

function resetAnimation() {
    currentPercentage = 0;
    progressBar.style.width = '0%';
    progressBar.textContent = '0%';
    setTimeout(animate, config.initialDelay);
}

// Démarrer l'animation
setTimeout(animate, config.initialDelay);

// Fonction pour animer les valeurs
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = "Gdes " + value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Fonction pour générer un lien de parrainage unique
function generateReferralLink() {
    const baseUrl = "https://www.haitianmindset.com/";
    const randomId = Math.random().toString(36).substring(2, 8);
    return `${baseUrl}?ref=${randomId}`;
}

// Fonction pour copier le lien
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => alert('Lien copié dans le presse-papier!'))
        .catch(err => console.error('Erreur lors de la copie: ', err));
}

// Au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du bouton "Générer mon lien"
    const generateBtn = document.getElementById('generateBtn');
    const referralLink = document.getElementById('referralLink');
    const copyBtn = document.getElementById('copyBtn');
    
    generateBtn.addEventListener('click', function() {
        const link = generateReferralLink();
        referralLink.textContent = link;
        referralLink.style.display = 'block';
        copyBtn.style.display = 'block';
    });
    
    copyBtn.addEventListener('click', function() {
        copyToClipboard(referralLink.textContent);
    });
});