import { paperRollContent } from "./paperRollContent.js";

const paperRoll = document.getElementById("paperRoll");
const startButton = document.getElementById("startBtn");
const menuButtons = document.querySelectorAll(".menu-btn");
const paperContent = document.getElementById("paperContent");
const music = document.getElementById('bgMusic');
const backgroundNames = ["Strand","Felsenschlucht","Kristallsee","Wanderdüne","Spielarena","Schneelandschaft"];
const avatarNames = ["Frau mit braungelocktem Haar","Junge mit Mütze","Rothaariges Mädchen","Älterer Herr","Blondes Mädchen mit Mütze","Mann mit Mütze und Brille","Dunkelhaarige junge Dame mit Mütze","Mann mit Schnautzer"];

let accessibilityFocusBtn = null;


/**
 * Öffnet die Paper-Roll mit Inhalt.
 * Fügt automatisch einen Close-Button hinzu.
 * Start-Button wird kurz deaktiviert.
 * @param {string} content - HTML Inhalt, der angezeigt wird
 * @param {boolean} isSettings - true: initBackgroundCarousel & MusicToggle aufrufen
 * @param {boolean} isPlayerForm - true: Player-Formular initialisieren
 * @param {HTMLElement} triggerBtn - jeweilige Button, der geklickt wird
 */
function openPaperRoll(content, isSettings = false, isPlayerForm = false, triggerBtn = null) {
    accessibilityFocusBtn = triggerBtn;

    paperContent.innerHTML = /*html*/`
        <button class="close-btn" aria-label="Schließen">
            <img src="/assets/img/close-icon.png" alt="" aria-hidden="true">
        </button>
        ${content}`;

    paperRoll.classList.add("open");
    document.querySelector(".menu-box").inert = true;
    paperRoll.inert = false;
    paperContent.querySelector("button, input, [tabindex]")?.focus();
  
    const closeBtn = paperContent.querySelector(".close-btn");
    if (closeBtn) closeBtn.addEventListener("click", closePaperRoll);

    if (startButton) setTimeout(() => startButton.disabled = true, 350);
    if (isPlayerForm) {
        setupAvatarSelect();
        handlePlayerFormSubmit();
        restorePlayerFormData();
    }
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
    paperRoll.inert = true;
    document.querySelector(".menu-box").inert = false;
    accessibilityFocusBtn?.focus();
}


/**
 * Klick außerhalb Paper-Roll schließt diese automatisch.
 * @param {MouseEvent} e - Das Klick-Ereignis
 */
document.addEventListener("click", (e) => {
    const menuButtonsArray = Array.from(menuButtons);

    if (
        paperRoll.classList.contains("open") &&
        !e.target.closest(".avatar-image") &&
        !e.target.closest(".avatar-menu") &&
        !e.target.closest(".submit-avatar-btn") &&
        !paperRoll.contains(e.target) &&
        !menuButtonsArray.includes(e.target)
    ) {
        closePaperRoll();
    }
});


/**
 * Menü-Buttons öffnen Paper-Roll mit dem passenden Inhalt.
 * Entscheidet automatisch, ob Settings- oder Spieler-Formular geladen wird.
 */
menuButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const text = btn.textContent;
        const content = paperRollContent[text];
        if (!content) return;

        const isSettings = text === "EINSTELLUNGEN";
        const isPlayerForm = ["2 SPIELER", "3 SPIELER"].includes(text);

        if (isPlayerForm) {
            const newNum = text === '2 SPIELER' ? 1 : 2;
            resetPlayers(newNum);
            initPlayers(newNum); 
        }
        openPaperRoll(content, isSettings, isPlayerForm, btn);
    });
});


/**
 * Löscht alte Spieler- und Gegnerdaten aus dem LocalStorage, wenn Anzahl Gegner sich ändert und speichert die neue Anzahl..
 * @param {number} newNum - Neue Anzahl der Gegner
 */
function resetPlayers(newNum) {
    const prevNum = Number(localStorage.getItem('numOpponent')) || 1;
    if (newNum !== prevNum) {
        localStorage.removeItem('player');
        for (let i = 1; i <= 2; i++) localStorage.removeItem(`opponent${i}`);
    }
    localStorage.setItem('numOpponent', newNum);
}


/**
 * Initialisiert Standardwerte für den Spieler und die Gegner im LocalStorage, wenn nichts existiert.
 * @param {number} newNum - Anzahl der Gegner
 */
function initPlayers(newNum) {
    const defaultAvatar = '/assets/img/profile_image_default.png';

    if (!localStorage.getItem('player')) 
        localStorage.setItem('player', JSON.stringify({ name: 'Spieler', avatar: defaultAvatar, points: 0, totalPoints: 0 }));
    
    for (let i = 1; i <= newNum; i++) {
        const key = `opponent${i}`;
        if (!localStorage.getItem(key)) 
            localStorage.setItem(key, JSON.stringify({ name: `Gegner ${i}`, avatar: defaultAvatar, points: 0, totalPoints: 0 }));
    }
}


/**
 * Öffnet die Avatar-Auswahl für den jeweiligen Spieler.
 */
function setupAvatarSelect() {
    const avatarButtons = paperContent.querySelectorAll(".avatar-image");
    if (!avatarButtons.length) return;

    avatarButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => showAvatarPicker(index));
    });
}


/**
 * Öffnet das Avatar-Auswahl-Submenu für einen Spieler und ermöglicht Auswahl.
 * @param {number} playerIndex - Index des Spielers, dessen Avatar gewählt wird.
 * @returns {void}
 */
function showAvatarPicker(playerIndex) {
    const playerForm = paperContent.querySelector(".player-form");
    const submitBtn = document.querySelector(".submit-player-btn");
    if (!playerForm) return;

    const playerInputs = playerForm.querySelectorAll('input');
    const inputValues = Array.from(playerInputs).map(input => input.value);
    
    if (submitBtn) submitBtn.style.display = "none";

    const prevContent = playerForm.innerHTML;
    renderAvatarMenu(playerForm, playerIndex);

    const threePlayers = document.querySelector('.three-players');
    adjustThreePlayersLayout(playerForm, threePlayers);

    const avatars = playerForm.querySelectorAll(".avatar-btn");
    setupAvatarClick(avatars, playerIndex);

    const key = playerIndex === 0 ? "player" : `opponent${playerIndex}`;
    const data = JSON.parse(localStorage.getItem(key)) || {};
    if (data.avatar) markSelectedAvatar(avatars, data.avatar);

    playerForm.querySelector(".submit-avatar-btn").addEventListener("click", () => {
        restorePlayerForm(playerForm, prevContent, inputValues, submitBtn, threePlayers);
    });
}


/**
 * Rendert das HTML für das Avatar-Auswahlmenü eines Spielers.
 * @param {HTMLElement} form - Container des Player-Formulars
 * @param {number} playerIndex - Index des Spielers, dessen Avatar gewählt wird
 */
function renderAvatarMenu(form, playerIndex) {
    form.innerHTML = /*html*/`
        <div class="avatar-menu">
            <div class="avatar-title">Bild für Spieler ${playerIndex + 1} auswählen</div>
            <div class="avatar-circle">
                ${Array.from({ length: 8 }, (_, i) => /*html*/`
                    <button class="avatar-btn" aria-label="${avatarNames[i]}">
                        <img src="/assets/img/avatar/avatar-${i+1}.png" alt="">
                    </button>
                `).join('')}
            </div>
        </div>
        <button class="submit-avatar-btn">ZURÜCK</button>`;
}


/**
 * Passt Layout für drei Spieler an.
 * @param {HTMLElement} form - Player-Formular
 * @param {HTMLElement} container - Container für das Drei-Spieler-Layout
 */
function adjustThreePlayersLayout(form, container) {
    if (form.classList.contains("three-players") && container) {
        container.style.height = "100%";
        container.style.gap = "clamp(0.9375rem, 0.625rem + 1.5625vw, 3.125rem)";
    }
}


/**
 * Bindet Klick-Events auf alle Avatar-Bilder und speichert die Auswahl.
 * @param {HTMLImageElement[]} avatars - Alle Avatar-Bilder
 * @param {number} playerIndex - Index des Spielers, dessen Avatar gewählt wird
 */
function setupAvatarClick(avatars, playerIndex) {
    avatars.forEach(btn => {
        btn.addEventListener("click", () => {
            const img = btn.querySelector("img");
            const key = playerIndex === 0 ? "player" : `opponent${playerIndex}`;
            const data = JSON.parse(localStorage.getItem(key)) || { name: "", avatar: "" };
            const clickedFile = img.src.split("/").pop();
            const currentFile = data.avatar.split("/").pop();

            data.avatar = clickedFile === currentFile ? "/assets/img/profile_image_default.png" : img.src;

            localStorage.setItem(key, JSON.stringify(data));
            markSelectedAvatar(avatars, data.avatar);
        });
    });
}


/**
 * Stellt das ursprüngliche Player-Formular wieder her und initialisiert Events.
 * @param {HTMLElement} form - Player-Formular
 * @param {string} prevContent - HTML-Inhalt vor dem Avatar-Menü
 * @param {string[]} inputValues - Gesicherte Werte der Inputfelder
 * @param {HTMLElement} submitBtn - Submit-Button
 * @param {HTMLElement} threePlayers - Container für Drei-Spieler-Layout
 */
function restorePlayerForm(form, prevContent, inputValues, submitBtn, threePlayers) {
    form.innerHTML = prevContent;

    const restoredInputs = form.querySelectorAll('input');

    restoredInputs.forEach((input, i) => input.value = inputValues[i] || '');

    showSelectedAvatarInPlayerForm(form);
    validateInputs(restoredInputs);

    if (submitBtn) submitBtn.style.display = '';
    if (threePlayers) {
        threePlayers.style.height = '';
        threePlayers.style.gap = '';
    }

    setupAvatarSelect();
    handlePlayerFormSubmit();
}


/**
 * Bindet den Submit-Button des Spielerformulars.
 * Speichert die Werte und schließt die Paper-Roll. Verhindert doppelte Listener (bound).
 */
function handlePlayerFormSubmit() {
    const submitBtn = document.querySelector('.submit-player-btn');
    const playerForm = document.querySelector('.player-form');
    if (!submitBtn || submitBtn.dataset.bound) return;

    submitBtn.dataset.bound = "true";

    const inputs = playerForm.querySelectorAll('input');
    validateInputs(inputs); 

    submitBtn.addEventListener('click', () => {
        applyPlayerDefaults();
        closePaperRoll();
    });
}


/**
 * Wendet Standardwerte für Spieler und Gegner an, falls keine Daten vorhanden sind.
 */
function applyPlayerDefaults() {
    const numOpponent = Number(localStorage.getItem("numOpponent")) || 1;

    const player = JSON.parse(localStorage.getItem("player")) || {};
    if (!player.name) player.name = "Spieler";
    if (!player.avatar) player.avatar = "/assets/img/profile_image_default.png";
    localStorage.setItem("player", JSON.stringify(player));

    for (let i = 1; i <= numOpponent; i++) {
        const key = `opponent${i}`;
        const data = JSON.parse(localStorage.getItem(key)) || {};

        if (!data.name) data.name = numOpponent === 1 ? "Gegner" : `Gegner ${i}`;
        if (!data.avatar) data.avatar = "/assets/img/profile_image_default.png";

        localStorage.setItem(key, JSON.stringify(data));
    }
}


/**
 * Validiert Inputfelder: erlaubt nur Buchstaben und Bindestriche.
 * @param {HTMLInputElement[]} inputElements - Inputfelder
 */
function validateInputs(inputElements) {
    inputElements.forEach((input, index) => {

        const tooltip = document.createElement('div');
        tooltip.className = 'input-tooltip';
        tooltip.textContent = 'Nur Buchstaben erlaubt 😄';

        input.parentNode.appendChild(tooltip);

        input.addEventListener('input', () => {
            const original = input.value;

            input.value = input.value.replace(/[^A-Za-zÄÖÜäöüß -]/g, '').trimStart();
            tooltip.style.opacity = original !== input.value ? '1' : '0';

            const key = index === 0 ? "player" : `opponent${index}`;
            const data = JSON.parse(localStorage.getItem(key)) || { name: "", avatar: "" };
            data.name = input.value;
            localStorage.setItem(key, JSON.stringify(data));
        });

        input.addEventListener('blur', () => {
            input.value = input.value.trim();
            tooltip.style.opacity = '0';
        });
    });
}


/**
 * Stellt gespeicherte Spieler- und Gegnerdaten im Formular wieder her. Inputs leeren, wenn Standardwerte.
 */
function restorePlayerFormData() {
    const playerForm = paperContent.querySelector(".player-form");
    if (!playerForm) return;

    const numOpponent = Number(localStorage.getItem("numOpponent")) || 1;
    const inputs = playerForm.querySelectorAll('input');
    const avatarBtns = playerForm.querySelectorAll(".avatar-btn");

    for (let i = 0; i <= numOpponent; i++) {
        const key = i === 0 ? "player" : `opponent${i}`;
        const data = JSON.parse(localStorage.getItem(key)) || {};

        const input = inputs[i];
        const defaultNames = i === 0 ? ["Spieler"] : ["Gegner", `Gegner ${i}`];
        if (input) input.value = data.name && !defaultNames.includes(data.name) ? data.name : '';

        if (data.avatar) markSelectedAvatar(avatarBtns, data.avatar);
    }

    showSelectedAvatarInPlayerForm(playerForm);
}


/**
 * Markiert einen gewählten Avatar und dimmt die anderen.
 * @param {NodeList|HTMLElement[]} avatarBtns - Alle Avatare im Formular
 * @param {string} selectedSrc - URL des gewählten Avatars
 */
function markSelectedAvatar(avatarBtns, selectedSrc) {
    const buttons = Array.from(avatarBtns);

    if (!selectedSrc || selectedSrc.includes("profile_image_default.png")) {
        buttons.forEach(btn => btn.classList.remove("selected", "dimmed"));
        return;
    }

    const selectedBtn = buttons.find(btn =>
        btn.querySelector("img").src.split("/").pop() === selectedSrc.split("/").pop()
    );

    if (!selectedBtn) return;
    buttons.forEach(btn => btn.classList.remove("selected", "dimmed"));
    selectedBtn.classList.add("selected");

    buttons
        .filter(btn => btn !== selectedBtn)
        .forEach(btn => btn.classList.add("dimmed"));
}



/**
 * Setzt das gewählte Avatar-Bild in Formular, bei Deselektierung Default-Image (upload-image.png).
 * @param {HTMLElement} form - Das jeweilige Player-Formular
 */
function showSelectedAvatarInPlayerForm(form) {
    const playerFields = form.querySelectorAll('.player-field');
    playerFields.forEach((field, i) => {
        const avatarBtn = field.querySelector('.avatar-image');
        const avatarImg = avatarBtn.querySelector('img');
        const key = i === 0 ? 'player' : `opponent${i}`;
        const data = JSON.parse(localStorage.getItem(key)) || {};

        if (avatarImg) {
            if (data.avatar && !data.avatar.includes('profile_image_default.png')) {
                avatarImg.src = data.avatar;
                avatarImg.classList.add('has-avatar');
            } else {
                avatarImg.src = '/assets/img/avatar-image.png';
                avatarImg.classList.remove('has-avatar');
            }
        }
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

    const iconButton = document.getElementById(`${storageKey}Icon`);
    const icon = iconButton?.querySelector("img");

    const setState = (isOn) => {
        localStorage.setItem(storageKey, isOn ? "on" : "off");
        toggle.checked = isOn;

        if (icon) {
            icon.src = `/assets/img/${storageKey}_${isOn ? "on" : "off"}.png`;
            iconButton.setAttribute("aria-label", `${storageKey} ${isOn ? "an" : "aus"}`);
        }

        isOn ? onEnable() : onDisable();
    };

    setState(localStorage.getItem(storageKey) === "on");
    toggle.addEventListener("change", () => setState(toggle.checked));
}


/**
 * Startet Hintergrundmusik, falls Element vorhanden.
 */
export function playMusic() {
    if (!music) return;
    music.volume = 0.4;
    music.play().catch(() => {
        console.log("Autoplay blocked, waiting for interaction.");
    });
}


/**
 * Stoppt Musik und setzt Zeit auf 0
 */
export function stopMusic() {
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
        setBackgroundName(selectedIndex);
    });

    nextButton.addEventListener('click', () => {
        selectedIndex = (selectedIndex + 1) % imageCount;
        rotateCarousel(carousel, images, selectedIndex, theta, radius, rotateFn);
        setBackgroundName(selectedIndex);
    });

    updateCarouselDimensions();
}


/**
 * Setzt den Screenreader‑Text für den aktuell ausgewählten Hintergrund.
 * @param {number} index - Index des ausgewählten Hintergrund vom Array backgroundNames
 */
function setBackgroundName(index) {
    const status = document.getElementById('carouselStatus');
    if (status) status.textContent = `${backgroundNames[index]} ausgewählt`;
    
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
 * Startet das Spiel. Zeigt GeameScreen an.
 * Initialisiert ein Default-Spieler/ Gegner-Setup, wenn der Nutzer keine Auswahl getroffen hat.
 */
startButton.addEventListener("click", async () => {
    let defaultAvatar = '/assets/img/profile_image_default.png';

    const defaultPlayers = {
        player: { name: 'Spieler', avatar: defaultAvatar, points: 0, totalPoints: 0 },
        opponent1: { name: 'Gegner', avatar: defaultAvatar, points: 0, totalPoints: 0 },
        numOpponent: 1
    };

    const defaultSettings = {
        sound: 'off',
        music: 'off',
        selectedBg: 0
    };

    const setIfEmpty = (key, value) => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
        }
    };

    Object.entries(defaultPlayers).forEach(([key, value]) => setIfEmpty(key, value));
    Object.entries(defaultSettings).forEach(([key, value]) => setIfEmpty(key, value));
    const gameModule = await import("./setup.js");
    gameModule.showGameScreen();
});


document.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "IMG") {
        e.preventDefault();
    }
});

document.addEventListener('pointerdown', e => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

