import { paperRollContent } from "./paperRollContent.js";

const paperRoll = document.getElementById("paperRoll");
const startButton = document.getElementById("startBtn");
const menuButtons = document.querySelectorAll(".menu-btn");
const paperContent = document.getElementById("paperContent");
const music = document.getElementById('bgMusic');


/**
 * Öffnet die Paper-Roll mit Inhalt.
 * Fügt automatisch einen Close-Button hinzu.
 * Start-Button wird kurz deaktiviert.
 * @param {string} content - HTML Inhalt, der angezeigt wird
 * @param {boolean} isSettings - true: initBackgroundCarousel & MusicToggle aufrufen
 * @param {boolean} isPlayerForm - true: Player-Formular initialisieren
 */
function openPaperRoll(content, isSettings = false, isPlayerForm = false) {
    paperContent.innerHTML = /*html*/`
        <img class="close-btn" src="/assets/img/close-icon.png" alt="Close">${content}`;
    paperRoll.classList.add("open");

    const closeBtn = paperContent.querySelector(".close-btn");
    if (closeBtn) closeBtn.addEventListener("click", closePaperRoll);

    if (startButton) setTimeout(() => startButton.disabled = true, 350);
    if (isPlayerForm) bindSubmitPlayer();
    if (isSettings) {
        initBackgroundCarousel(); 
        initToggle("musicToggle", "music", playMusic, stopMusic);
        initToggle("soundToggle", "sound");
    }
}


/**
 * Schließt die Paper-Roll und aktiviert den Start-Button wieder.
 */
function closePaperRoll() {
    paperRoll.classList.remove("open");
    if (startButton) startButton.disabled = false;
}


/**
 * Klick außerhalb Paper-Roll schließt diese automatisch.
 * 
 * @param {MouseEvent} e - Das Klick-Ereignis
 */
document.addEventListener("click", (e) => {
    const menuButtonsArray = Array.from(menuButtons);
    if (paperRoll.classList.contains("open") &&
        !paperRoll.contains(e.target) &&
        !menuButtonsArray.includes(e.target)) {
        closePaperRoll();
    }
});


/**
 * Menü-Buttons öffnen Paper-Roll mit dem passenden Inhalt.
 * Entscheidet automatisch, ob Settings- oder Spieler-Formular geladen wird.
 */
menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const content = paperRollContent[btn.textContent];
        const isSettings = btn.textContent === "EINSTELLUNGEN";
        const isPlayerForm = ["2 SPIELER", "3 SPIELER"].includes(btn.textContent);

        if (content) openPaperRoll(content, isSettings, isPlayerForm);
    });
});


/**
 * Bindet EventListener für Player-Formular einmalig.
 * Speichert Spieler- und Gegnernamen in localStorage inkl. Defaultnamen.
 */
function bindSubmitPlayer() {
    const submitPlayerButton = document.querySelector('.submit-player-btn');
    if (!submitPlayerButton || submitPlayerButton.dataset.bound) return;

    submitPlayerButton.dataset.bound = "true"; // verhindert, dass der Klick-EventListener mehrfach hinzugefügt wird
    submitPlayerButton.addEventListener('click', () => {
        const currentForm = submitPlayerButton.closest('.player-form');
        const playerInputs = currentForm.querySelectorAll('input');
        const numOpponent = playerInputs.length - 1;

        // alte Gegnernamen löschen
        for (let i = 1; i <= 3; i++) {
            localStorage.removeItem(`opponent${i}`);
        }

        // Spieler & Gegner speichern
        playerInputs.forEach((input, i) => {
            const key = i === 0 ? 'player' : `opponent${i}`;
            let name;

            if (i === 0) {
                name = input.value || 'Spieler';
            } else {
                if (numOpponent === 1) {
                    name = input.value || 'Gegner';
                } else {
                    name = input.value || `Gegner ${i}`;
                }
            }

            localStorage.setItem(key, name);
        });

        localStorage.setItem('numOpponent', numOpponent);

        closePaperRoll();
    });
}


/**
 * Initialisiert einen Toggle für Sound oder Musik.
 * 
 * @param {string} toggleId - ID des Checkbox-Elements
 * @param {string} storageKey - Key für localStorage ('sound' oder 'music')
 * @param {function} onEnable - Funktion, die aufgerufen wird, wenn aktiviert
 * @param {function} onDisable - Funktion, die aufgerufen wird, wenn deaktiviert
 */
function initToggle(toggleId, storageKey, onEnable = () => {}, onDisable = () => {}) {
    const toggle = document.getElementById(toggleId);
    if (!toggle) return;

    const isOn = localStorage.getItem(storageKey) === "on";
    toggle.checked = isOn;
    if (isOn) onEnable();

    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            localStorage.setItem(storageKey, "on");
            onEnable();
        } else {
            localStorage.setItem(storageKey, "off");
            onDisable();
        }
    });
}


/**
 * Startet Hintergrundmusik, falls Element vorhanden.
 */
function playMusic() {
    if (!music) return;
    music.volume = 0.4;
    music.play().catch(() => {
        console.log("Autoplay blocked, waiting for interaction.");
    });
}


/**
 * Stoppt Musik und setzt Zeit auf 0
 */
function stopMusic() {
    if (!music) return;
    music.pause();
    music.currentTime = 0;
}


/**
 * Initialisiert das 3D Carousel für Hintergrundbilder.
 * Passt Größe an Bildschirmbreite an.
 */
function initBackgroundCarousel() {
    const carousel = document.querySelector('.carousel');
    const images = carousel.querySelectorAll('.carousel-image');
    const imageCount = images.length;
    let selectedIndex = Number(localStorage.getItem('selectedBg')) || 0;
    const rotateFn = 'rotateY';
    let radius = 0;
    let theta = 360 / imageCount;
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');

    if (!carousel || images.length === 0 || !prevButton || !nextButton) return;
   
    window.updateCarouselDimensions = function() {
        const screenWidth = window.innerWidth; 
        const minRadius = 85;     
        const maxRadius = 200;   
        const minScreenWidth = 320;
        const maxScreenWidth = 2560;
        let scale = (screenWidth - minScreenWidth) / (maxScreenWidth - minScreenWidth);
        scale = Math.min(Math.max(scale, 0), 1);
        radius = Math.round(minRadius + (maxRadius - minRadius) * scale);
        theta = 360 / imageCount;
        rotateCarousel(carousel, images, selectedIndex, theta, radius, rotateFn);
    }

    prevButton.addEventListener('click', () => {
        selectedIndex = (selectedIndex - 1 + imageCount) % imageCount;
        rotateCarousel(carousel, images, selectedIndex, theta, radius, rotateFn);
    });

    nextButton.addEventListener('click', () => {
        selectedIndex = (selectedIndex + 1) % imageCount;
        rotateCarousel(carousel, images, selectedIndex, theta, radius, rotateFn);
    });

    updateCarouselDimensions();
}


/**
 * Aktualisiert Position und Opazität aller Carousel-Bilder.
 * Das vorderste Bild (selectedIndex) wird hervorgehoben, alle anderen leicht transparent.
 *
 * @param {NodeList} images - Alle Carousel-Bilder
 * @param {number} selectedIndex - Index des aktuell ausgewählten Bildes
 * @param {number} theta - Winkel zwischen den Bildern
 * @param {number} radius - Radius des 3D-Karussells
 * @param {string} rotateFn - Rotationsfunktion (z.B. 'rotateY')
 */
function updateCells(images, selectedIndex, theta, radius, rotateFn) {
    images.forEach((cell, index) => {
        const cellAngle = theta * index;
        cell.style.transform = `${rotateFn}(${cellAngle}deg) translateZ(${radius}px)`;
        cell.style.opacity = index === selectedIndex % images.length ? 1 : 0.5;
    });
}


/**
 * Dreht das gesamte Carousel auf das aktuell ausgewählte Bild.
 * Ruft updateCells auf und speichert die Auswahl in localStorage.
 *
 * @param {HTMLElement} carousel - Das Carousel-Container-Element
 * @param {NodeList} images - Alle Carousel-Bilder
 * @param {number} selectedIndex - Index des aktuell ausgewählten Bildes
 * @param {number} theta - Winkel zwischen den Bildern
 * @param {number} radius - Radius des 3D-Karussells
 * @param {string} rotateFn - Rotationsfunktion
 */
function rotateCarousel(carousel, images, selectedIndex, theta, radius, rotateFn) {
    const angle = theta * selectedIndex * -1;
    carousel.style.transform = `translateZ(${-radius}px) ${rotateFn}(${angle}deg)`;
    updateCells(images, selectedIndex, theta, radius, rotateFn);
    localStorage.setItem('selectedBg', selectedIndex);
}


/**
 * Aktualisiert Carousel bei Fenstergrößeänderung
 */
window.addEventListener('resize', () => {
    if (window.updateCarouselDimensions) window.updateCarouselDimensions();
});

/**
 * Einmalige User-Interaktion starten Musik, falls vorher aktiviert
 */
let musicStarted = false;
['click', 'keydown'].forEach(ev =>
    document.addEventListener(ev, () => {
        if (!musicStarted && localStorage.getItem("music") === "on") {
            playMusic();
            musicStarted = true;
        }
    }, { once: true })
);


/**
 * Startet das Spiel: blendet Startscreen aus, zeigt GameScreen.
 */
startButton.addEventListener("click", async () => {
    if (!localStorage.getItem('numOpponent')) {
        localStorage.setItem('player', 'Spieler');
        localStorage.setItem('opponent1', 'Gegner');
        localStorage.setItem('numOpponent', 1);
    }

    const gameModule = await import("./setup.js");
    gameModule.showGameScreen();
});
