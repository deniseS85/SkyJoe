import { skyjoCards } from "./skyjoCardsObj.js";
import { startGame, setupGameSettings, resetCards } from './game.js'; 

const gameScreen = document.getElementById("gameScreen");
const backButton = document.getElementById("backBtn");
const startScreen = document.getElementById("startScreen");
const rotationWrapper = document.querySelector(".rotation-wrapper");
export const cardSound = new Audio('/assets/sounds/deal-cards.mp3');
export let currentStep = 0;
export let turnState = 'INIT';
export let isDealing = false; 
let dealTimeouts = [];
let afterDealTimeoutId = null;


/**
 * Setzt das Spiel vollständig zurück.
 */
export function resetGame(isRestart = false) {
    isDealing = false;

    dealTimeouts.forEach(id => clearTimeout(id));
    dealTimeouts = [];
    if (afterDealTimeoutId) {
        clearTimeout(afterDealTimeoutId);
        afterDealTimeoutId = null;
    }

    if (!isRestart) {
        stopDealSound();
        resetLocalStorage();
    }

    clearGameDOM();
    resetRotationWrapper();
    resetCards();
    currentStep = 0;
}


/**
 * Entfernt alle Karten aus dem DOM
 */
function clearGameDOM() {
    document.querySelectorAll('.card-field').forEach(field => field.innerHTML = '');
    document.querySelectorAll('.card').forEach(card => card.remove());
    document.getElementById('stack-field-2').style.visibility = 'hidden';
    const stack2 = document.getElementById('stack-field-2');
    stack2.style.visibility = 'hidden';
    stack2.dataset.value = '';
    stack2.src = '';
    stack2.alt = '';
}


/**
 * Setzt den Rotation-Wrapper zurück.
 */
export function resetRotationWrapper() {
    rotationWrapper.innerHTML = '';
    rotationWrapper.style.transition = 'none';
    rotationWrapper.style.transform = `rotate(0deg)`;
    rotationWrapper.offsetHeight;
    rotationWrapper.style.transition = 'transform 0.6s ease'; 
}


/**
 * Löscht Spieler-Informationen aus localStorage.
 */
function resetLocalStorage() {
    localStorage.removeItem('player');
    const numOpponent = parseInt(localStorage.getItem('numOpponent')) || 0;
    
    for (let i = 1; i <= numOpponent; i++) {
        localStorage.removeItem(`opponent${i}`);
    }
    localStorage.removeItem('numOpponent');
    localStorage.removeItem('roundNumber');
}


/**
 * Zeigt den Spielbildschirm und initialisiert Spieler und Deck.
 */
export function showGameScreen(isRestart = false) { 
    if (!isRestart) {
        setBackground();
        setSoundMusicIcons();
        startScreen.style.display = 'none';
        gameScreen.style.display = 'flex';
    }

    updateRound(isRestart);
    createPlayers();
    positionPlayersInRotationWrapper();
    const deck = createDeck();
    window.stacks = createStacks(deck);
    placeStacks(stacks);

    requestAnimationFrame(() => {
        const allPlayers = [
            document.querySelector('.player-grid'),
            ...document.querySelectorAll('.opponent-grid')];
        animateDeal(allPlayers);
    });
}


/**
 * Zeigt die Rundenanzahl an
 * @param {boolean} increase - true bei Restart
 * @returns {number} - die aktuelle Runde
 */
export function updateRound(increase = false) {
    let round = Number(localStorage.getItem('roundNumber')) || 1;

    if (increase) {
        round++;
        localStorage.setItem('roundNumber', round);
    } else {
        localStorage.setItem('roundNumber', round);
    }

    document.getElementById('roundNumber').textContent = `Runde ${round}`;
    return round;
}


/**
 * Setzt den Hintergrund abhängig von der Auswahl.
 */
function setBackground() {
    const selectedBg = localStorage.getItem('selectedBg');
    gameScreen.style.background = `#fffbea url(/assets/img/bg${selectedBg}.png) no-repeat center/cover`;
}


/**
 * Setzt die Icons für Sound und Musik anhand des LocalStorage-Status.
 */
function setSoundMusicIcons() {
    const icons = [
            { id: 'soundIcon', key: 'sound', default: 'off' },
            { id: 'musicIcon', key: 'music', default: 'off' }
        ];

        icons.forEach(({ id, key, defaultStatus }) => {
            const icon = document.getElementById(id);
            if (!icon) return;

            const status = localStorage.getItem(key) || defaultStatus;
            icon.src = `/assets/img/${key}_${status}.png`;
        });
}


/**
 * Erstellt Spieler- und Gegner-Container und fügt sie dem Rotation-Wrapper hinzu.
 */
function createPlayers() {
    const numOpponent = parseInt(localStorage.getItem('numOpponent')) || 1;
    const opponentContainers = Array.from({ length: numOpponent}, (_, i) => createContainer('opponent', i));

    rotationWrapper.append(createContainer('player'));
    rotationWrapper.append(...opponentContainers);
}


/**
 * Erstellt einen Container für Spieler oder Gegner inklusive Spielerinfos und Raster.
 * @param {string} type - "player" oder "opponent"
 * @param {number} index - Index des Gegners (ab 0)
 * @returns {HTMLElement} Container mit Raster und Spielerinformationen
 */
function createContainer(type, index = 0) {
    let stored;
    if (type === 'player') {
        stored = JSON.parse(localStorage.getItem('player')) || { name: 'Spieler', avatar: null, points: 0, totalPoints: 0  };
    } else {
        stored = JSON.parse(localStorage.getItem(`opponent${index + 1}`)) || { name: `Gegner ${index + 1}`, avatar: null, points: 0, totalPoints: 0  };
    }

    const id = type === 'player'
        ? `player-1-${stored.name}`
        : `opponent-${index + 1}-${stored.name}`;

    const className = type === 'player' ? 'player-grid' : 'opponent-grid';

    const container = createPlayerGridWrapper(stored.name, id, stored.avatar);
    const grid = createGrid(id, className);
    container.appendChild(grid);
    return container;
}


/**
 * Erstellt die Spielerinfo mit Bild, Name und Punkteanzeige.
 * @param {string} name - Name des Spielers
 * @param {string} imageUrl - URL für das Spielerbild
 * @returns {HTMLElement} Spielerinfo-Container
 */
function createPlayerGridWrapper(name, id, imageUrl) {
    const container = document.createElement('div');
    container.className = 'grid-wrapper';
    container.dataset.playerId = id;
    createProfileImage(container, imageUrl)
    createUserName(container, name);
    createPointsInfo(container);
    return container;
}


/**
 * Erstellt ein Profilbild-Element und fügt es in ein Container-Element ein.
 * @param {HTMLElement} container - Das HTML-Element, in das das Profilbild eingefügt wird.
 * @param {string} imageUrl - Die URL des anzuzeigenden Profilbildes.
 */
function createProfileImage(container, imageUrl) {
    const img = document.createElement('img');
    img.className = 'player-image';
    img.src = imageUrl;
    container.appendChild(img);
}


/**
 * 
 * Erstellt ein Namens-Element und fügt es in ein Container-Element ein.
 * @param {HTMLElement} container - Das HTML-Element, in das der Spielername eingefügt wird.
 * @param {string} name - Der anzuzeigende Spielername. 
 */
function createUserName(container, name) {
    const title = document.createElement('div');
    title.className = 'player-name';
    title.textContent = name;
    container.appendChild(title);
}


/**
 * Fügt ein Punktefeld in den Container ein.
 * @param {HTMLElement} container - Container, in dem die Punkte angezeigt werden
 */
function createPointsInfo(container) {
    const pointsContainer = document.createElement('div');
    pointsContainer.className = 'point-info';
    const span = document.createElement('span');
    span.textContent = '0';
    pointsContainer.appendChild(span);
    container.appendChild(pointsContainer);
}


/**
 * Erstellt ein Raster mit 12 Kartenfeldern.
 * @param {string} id - Basis-ID für die Kartenfelder
 * @param {string} className - CSS-Klasse für das Raster
 * @returns {HTMLElement} Raster mit Kartenfeldern
 */
function createGrid(id, className) {
    const grid = document.createElement('div');
    grid.className = className;

    Array.from({ length: 12 }, (_, i) => {
        const field = document.createElement('div');
        field.className = 'card-field';
        field.id = `${id}${i + 1}`;
        const col = i % 4;  
        const row = Math.floor(i / 4); 
        field.dataset.row = row;
        field.dataset.col = col;
        grid.appendChild(field);
    });
    return grid;
}


/**
 * Erstellt ein Kartendeck aus skyjoCards-Objekten.
 * @returns {Array} Gemischtes Deck
 */
function createDeck() {
    const deck = skyjoCards.flatMap(card =>
        Array.from({ length: card.count }, () => ({ 
            value: card.value, 
            color: card.color,
            img: card.img ?? null
        }))
    );

    shuffle(deck);
    return deck;
}


/**
 * Mischt die Karten durch
 * @param {Array} array - Karten
 */
export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


/**
 * Teilt das Deck in drei Stacks: Hauptstapel (stack1) und aktuelle Karte (stack2)
 * @param {Array} deck - Gemischtes Deck
 * @returns {Object} Stacks
 */
function createStacks(deck) {
    return { stack1: deck, stack2: null };
}


/**
 * Platziert den Ziehstapel auf dem Spielbildschirm.
 * @param {Object} stack1 - Ziehspapelkarten
 */
function placeStacks({ stack1 }) {
    const deckOfCards = document.getElementById("stack-field-1");
    deckOfCards.dataset.count = stack1.length;
    deckOfCards.style.background = 'url(assets/img/cards/card-bg.png) no-repeat center/cover';
}


/**
 * Erstellt Kartenelement mit Vorder- und Rückseite
 * @param {Object} card - Kartenobjekt
 * @param {number} width - Breite der Karte
 * @param {string} borderRadius - Border-Radius
 * @returns {HTMLElement} - Karten-Element
 */
function createCardElement(card, width, borderRadius) {
    const cardEl = createCardWrapper(card, width, borderRadius);
    const inner = createCardInner();

    const front = createCardFace(
        card.img || generateCardImage(card, width, width * 3 / 2),
        `Card ${card.value}`,
        borderRadius
    );

    const back = createCardFace(
        'assets/img/cards/card-bg.png',
        'Card Back',
        borderRadius,
        { transform: 'rotateY(180deg)' }
    );
    inner.append(front, back);
    cardEl.appendChild(inner);
    return cardEl;
}


/**
 * Erstellt den äußeren Wrapper einer Karte.
 * @param {Object} card - Kartenobjekt mit Metadaten
 * @param {number} width - Breite der Karte in Pixeln
 * @param {string} borderRadius - CSS Border-Radius
 * @returns {HTMLDivElement} - Karten-Wrapper
 */
function createCardWrapper(card, width, borderRadius) {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.dataset.value = card.value;

    Object.assign(cardEl.style, {
        width: `${width}px`,
        aspectRatio: '2/3',
        borderRadius,
        perspective: '1000px',
    });

    return cardEl;
}


/**
 * Erstellt den inneren Flip-Container der Karte.
 * @returns {HTMLDivElement} - Innerer Karten-Container
 */
function createCardInner() {
    const inner = document.createElement('div');

    Object.assign(inner.style, {
        width: '100%',
        height: '100%',
        border: '1px solid black',
        borderRadius: 'inherit',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s',
        transform: 'rotateY(180deg)',
    });

    return inner;
}


/**
 * Erstellt eine einzelne Kartenfläche (Vorder- oder Rückseite).
 * @param {string} src - Bildquelle (URL oder Data-URL)
 * @param {string} alt - Alt-Text für das Bild
 * @param {string} borderRadius - Border-Radius
 * @param {Object} [extraStyles={}] - Zusätzliche Inline-Styles
 * @returns {HTMLImageElement} - Kartenfläche
 */
function createCardFace(src, alt, borderRadius, extraStyles = {}) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;

    Object.assign(img.style, {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius,
        backfaceVisibility: 'hidden',
        ...extraStyles
    });

    return img;
}


/**
 * Erzeugt ein dynamisches Bild für eine Karte über ein Canvas.
 * @param {Object} card - Objekt mit Karteninformationen
 * @param {number} width - Breite der Karte
 * @param {number} height - Höhe der Karte
 * @returns 
 */
export function generateCardImage(card, width, height) { 
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = card.color || '#FFF';   
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `${width / 2}px biscuit, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(card.value, width / 2, height / 2);
    return canvas.toDataURL();
}


/**
 * Startet die Karten-Austeil-Animation für alle Spieler.
 * @param {Array} players - Array aus Spieler- und Gegner-Rastern
 */
function animateDeal(players) {
    isDealing = true;
    const deckField = document.getElementById('stack-field-1');
    const deckRect = deckField.getBoundingClientRect();
    const cardsPerPlayer = 12;
    const startWidth = deckRect.width;
    const borderRadius = getComputedStyle(deckField).borderRadius;
    const totalCards = players.length * cardsPerPlayer;
    const dealDurationMs = (totalCards - 1) * 150 + 500;

    deckField.dataset.count = stacks.stack1.length -  players.length * cardsPerPlayer;

    playDealSound();

    players.forEach((player, pIndex) => {
        const fieldWidth = player.querySelector('.card-field').offsetWidth;
        dealToPlayer(player, pIndex, fieldWidth, deckRect, startWidth, borderRadius, cardsPerPlayer);
    });
    
    afterDeal(dealDurationMs);
}


/**
 * Stoppt den Deal-Sound nach der angegebenen Zeit.
 * Startet das Spiel.
 * @param {number} delayMs - Dauer in Millisekunden
 */
function afterDeal(delayMs) {
    if (afterDealTimeoutId) clearTimeout(afterDealTimeoutId);

    afterDealTimeoutId = setTimeout(() => {
        if (!isDealing) return;
        stopDealSound();
        startGame();
        setupGameSettings();
        isDealing = false;
        afterDealTimeoutId = null;
    }, delayMs);
}


/**
 * Erhöht `currentStep` um 1 und fährt mit dem nächsten Spieler fort.
 */
export function incrementStep() {
    currentStep++;
}


/**
 * Setzt den aktuellen Spielzustand.
 * Mögliche States:
 * - 'INIT'   : Spiel wird aufgbaut, alle Karten deaktiviert
 * - 'SELECT' : Auswahl wer das Spiel beginnt
 * - 'START'  : Spieler beginnt das Spiel
 * - 'DECIDE' : Spieler hat Zugmöglichkeiten
 * - 'FINISH' : 1. Spielzug fertig, alle Karten deaktiviert
 * @param {'INIT'|'SELECT'|'START'|'FINISH } state - Spielzustand
 */
export function setTurnState(state) {
    turnState = state;
}


/**
 * Teilt einem Spieler seine Karten aus und startet die Animation jeder Karte.
 * @param {HTMLElement} player - Raster des Spielers
 * @param {number} pIndex - Index des Spielers
 * @param {number} fieldWidth - Breite der Kartenfelder
 * @param {DOMRect} deckRect - Position des Decks
 * @param {number} startWidth - Startbreite der Karte
 * @param {string} borderRadius - Rundung der Karten
 * @param {number} cardsPerPlayer - Anzahl Karten pro Spieler
 */
function dealToPlayer(player, pIndex, fieldWidth, deckRect, startWidth, borderRadius, cardsPerPlayer) {
    isDealing = true;

    for (let i = 0; i < cardsPerPlayer; i++) {
        const cardData = stacks.stack1.shift();
        if (!cardData) continue;

        const cardEl = createCardElement(cardData, startWidth, borderRadius);

        positionCardAtDeck(cardEl, deckRect, i);
        document.body.appendChild(cardEl);
        const timeoutId = setTimeout(() => {
            if (!isDealing) return; 
            animateSingleCard(cardEl, player, i, fieldWidth, deckRect);
        }, (pIndex * cardsPerPlayer + i) * 150);

        dealTimeouts.push(timeoutId);
    }
}


/**
 * Positioniert die Karte am Deck vor dem Start der Animation.
 * @param {HTMLElement} cardEl - Kartenelement
 * @param {DOMRect} deckRect - Position des Decks
 * @param {number} index - Index der Karte (für zIndex)
 */
function positionCardAtDeck(cardEl, deckRect, index) {
    let offsetX = -7;
    let offsetY = -7;

    if (window.innerHeight <= 799) {
        offsetX = -3;
        offsetY = -3;
    }
    cardEl.style.top = `${deckRect.top + offsetY}px`;
    cardEl.style.left = `${deckRect.left + offsetX}px`;
    cardEl.style.zIndex = 2000 + index;
}


/**
 * Animiert eine einzelne Karte vom Deck zum Spielerfeld.
 * @param {HTMLElement} cardEl - Kartenelement
 * @param {HTMLElement} player - Raster des Spielers
 * @param {number} index - Index des Kartenfeldes
 * @param {number} fieldWidth - Breite des Zielkartenfeldes
 * @param {DOMRect} deckRect - Position des Decks
 */
function animateSingleCard(cardEl, player, index, fieldWidth, deckRect) {
    const targetField = player.querySelector(`.card-field:nth-child(${index + 1})`);
    const rect = targetField.getBoundingClientRect();
    const dx = rect.left - deckRect.left;
    const dy = rect.top - deckRect.top;
    const scaleX = fieldWidth / cardEl.offsetWidth;

    cardEl.style.transition = 'transform 0.5s ease';
    cardEl.style.transform = `translate(${dx}px, ${dy}px) scale(${scaleX}`;

    const timeoutId = setTimeout(() => {
        finalizeCardPlacement(cardEl, targetField, fieldWidth);
    }, 500);

    dealTimeouts.push(timeoutId);
}


/**
 * Spielt den Sound des Kartenausteilens einmalig ab, solange er noch nicht läuft.
 */
export function playDealSound() {
    if (localStorage.getItem('sound') !== 'on') return;
    cardSound.loop = true;
    cardSound.currentTime = 0;
    cardSound.play();
}


/**
 * Stoppt den Deal-Sound, setzt Position zurück und deaktiviert Loop.
 */
export function stopDealSound() {
    cardSound.pause();
    cardSound.currentTime = 0;
}


/**
 * Platziert die Karte dauerhaft auf dem Spielerfeld und setzt Stil zurück.
 * @param {HTMLElement} cardEl - Kartenelement
 * @param {HTMLElement} field - Zielkartenfeld
 * @param {number} widthValue - Breite der Karte
 */
function finalizeCardPlacement(cardEl, field, widthValue) {
    field.appendChild(cardEl);

    Object.assign(cardEl.style, {
        position: 'static',
        width: `${widthValue - 4 }px`,
        transform: '',
        transition: '',
        top: '',
        left: '',
        zIndex: '',
        boxShadow: '0 2px 5px rgba(0,0,0,0.5)'
    });
}


/**
 * Passt die Größe aller Karten initial und bei windows resize an ihre jeweiligen Kartenfelder an.
 */
function resizeAllCards() {
    const allFields = document.querySelectorAll('.card-field');

    allFields.forEach(field => {
        const card = field.querySelector('.card');
        if (!card) return;

        const rect = field.getBoundingClientRect();
        const style = getComputedStyle(field);

        card.style.width = `${rect.width}px`;
        card.style.borderRadius = style.borderRadius;
    });
}


/**
 * Positioniert alle Spieler gleichmäßig im Kreis innerhalb des Rotation-Wrappers.
 */
function positionPlayersInRotationWrapper() { 
    const players = rotationWrapper.querySelectorAll(".grid-wrapper"); 
    const wrapperWidth = rotationWrapper.offsetWidth; 
    const wrapperHeight = rotationWrapper.offsetHeight; 
    let radiusX = wrapperWidth * 0.45; 
    let radiusY = wrapperHeight * 0.45; 
    let centerY = wrapperHeight / 2; 

    if (players.length === 3) { 
        radiusY *= 1.35; 
        radiusX *= 1.35; 
        centerY = wrapperHeight / 2 - wrapperHeight * 0.17; 
    } 
    
    const center = { x: wrapperWidth / 2, y: centerY }; 
    rotationWrapper.style.transformOrigin = `${center.x}px ${center.y}px`; 
    const angles = calculatePlayerAngles(players.length); 
    players.forEach((player, i) => { 
        const pos = calculatePositionOnEllipse(angles[i], radiusX, radiusY, center); 
        applyPlayerPosition(player, pos, angles[i]); 
    });
}

/**
 * Berechnet die x- und y-Position eines Punktes auf einer Ellipse anhand eines Winkels.
 * @param {number} angle - Winkel in Grad, gemessen von der Ellipsenmitte.
 * @param {number} radiusX - Horizontaler Radius der Ellipse.
 * @param {number} radiusY - Vertikaler Radius der Ellipse.
 * @param {{x: number, y: number}} center - Mittelpunkt der Ellipse.
 * @returns {{x: number, y: number}} Berechnete Position auf der Ellipse.
 */
function calculatePositionOnEllipse(angle, radiusX, radiusY, center) {
    const rad = angle * (Math.PI / 180);
    return {
        x: center.x + Math.cos(rad) * radiusX,
        y: center.y + Math.sin(rad) * radiusY
    };
}


/**
 * Berechnet die Winkel für jeden Spieler abhängig von der Spielerzahl.
 * @param {number} count - Anzahl Spieler
 * @returns {number[]} Winkel in Grad
 */
function calculatePlayerAngles(count) {
    if (count === 2) return [90, 270];
    if (count === 3) return [90, 210, 330];

    const angles = [90];
    const opponents = count - 1;
    for (let i = 0; i < opponents; i++) {
        angles.push((270 + i * (180 / (opponents - 1 || 1))) % 360);
    }
    return angles;
}


/**
 * Setzt die Position, Rotation und CSS-Klassen eines Spielers.
 * @param {HTMLElement} player - Spieler-Container
 * @param {{x: number, y: number}} pos - Position auf dem Kreis
 * @param {number} angle - Basiswinkel
 */
function applyPlayerPosition(player, pos, angle) {
    player.classList.remove('player-bottom', 'player-top');
    player.classList.add(angle === 90 ? 'player-bottom' : 'player-top');
    player.style.left = `${pos.x}px`;
    player.style.top = `${pos.y}px`;
    player.style.transform = 'translate(-50%, -50%) rotate(0deg)';
    player.dataset.baseAngle = angle;
}


/**
 * Dreht den Spieler-Wrapper und alle Spieler-Container um einen Schritt.
 * Berechnet die Rotation für jeden Spieler und passt deren Layout entsprechend an.
 * @param {number} step - Anzahl der Rotationsschritte (z. B. +1 = eine Position im Kreis weiter)
 */
export function rotatePlayers(step) {
    const players = rotationWrapper.querySelectorAll(".grid-wrapper");
    const count = players.length;
    const rotationDeg = step * (360 / count);
    rotateWrapper(rotationDeg);
    players.forEach(player => rotatePlayer(player, rotationDeg));
}


/**
 * Dreht den gesamten Spieler-Wrapper.
 * @param {number} degrees - Drehung in Grad
 */
function rotateWrapper(degrees) {
    rotationWrapper.style.transition = "transform 0.6s ease";
    rotationWrapper.style.transform = `rotate(${degrees}deg)`;
}


/**
 * Dreht einen einzelnen Spieler entgegen der Wrapper-Drehung
 * und passt die CSS-Klassen für bottom/top sowie das Grid-Layout an.
 * @param {HTMLElement} player - Spieler-Container (.grid-wrapper)
 * @param {number} wrapperRotation - Rotation des Wrappers in Grad
 */
function rotatePlayer(player, wrapperRotation) {
    player.style.transition = "transform 0.6s ease";
    player.style.transform = `translate(-50%, -50%) rotate(${-wrapperRotation}deg)`;
    const baseAngle = parseFloat(player.dataset.baseAngle);
    const currentAngle = (baseAngle + wrapperRotation) % 360;
    const isBottom = currentAngle >= 45 && currentAngle <= 135;
    player.classList.toggle('player-bottom', isBottom);
    player.classList.toggle('player-top', !isBottom);
    const grid = player.querySelector('.player-grid, .opponent-grid');
    if (!grid) return;
    adjustGrid(grid, isBottom);
}


/**
 * Passt die Breite der Karten und den Abstand (Gap) innerhalb eines Grids an,
 * abhängig davon, ob der Spieler unten sitzt und von der Fensterhöhe.
 * @param {HTMLElement} grid - Grid-Container der Karten (.player-grid oder .opponent-grid)
 * @param {boolean} isBottom - true, wenn der Spieler unten sitzt, sonst false
 */
function adjustGrid(grid, isBottom) {
    grid.querySelectorAll('.card').forEach(card => {
        card.style.width = isBottom 
            ? 'var(--player-card-width)' 
            : 'calc(var(--player-card-width) * 0.7)';
    });

    grid.style.gap = isBottom 
        ? 'clamp(0.3125rem, 0.2679rem + 0.2232vw, 0.625rem)' 
        : '2px';

}


backButton.addEventListener("click", () => {
    gameScreen.style.display = 'none';
    startScreen.style.display = 'flex';
    resetGame();
});

window.addEventListener('resize', () => {
   requestAnimationFrame(() => {
        resizeAllCards();
        positionPlayersInRotationWrapper();
        rotatePlayers(currentStep);
    });
});

