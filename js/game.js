import { generateCardImage } from "./setup.js";
import { rotatePlayers, currentStep, incrementStep } from "./setup.js";

const stackArea = document.querySelector('.stack-area');
const flipCardSound = new Audio('/assets/sounds/flip-card.mp3');
const playerStartSound = new Audio('assets/sounds/player-starts.mp3');
const cardDropSound = new Audio('/assets/sounds/card-drop.mp3');

export const flippedCards = {};
export let firstPlayerRotated = false;


/**
 * Startet das Spiel und setzt Klickevent auf die Karten
 */
export function startGame() {
    document.querySelectorAll('.card').forEach(cardEl => {
        const inner = cardEl.querySelector('div');
        cardEl.addEventListener('click', () => flipCard(cardEl, inner));
    });
}


/**
 * Prüft, ob die Karte eines Spielers umgedreht werden darf.
 * @param {HTMLElement} wrapper - Wrapper-Element der Karte
 * @param {HTMLElement} cardEl - Kartenelement
 * @param {Object} playerData - Spielerinformationen aus flippedCards
 * @returns {boolean} true, wenn die Karte aufgedeckt werden darf
 */
function canFlipCard(wrapper, cardEl, playerData) {
    return isPlayerBottom(wrapper) &&
           cardEl.dataset.flipped !== 'true' &&
           playerData.count < 2;
}

/**
 * Karte wird gedreht bei Klick
 * @param {HTMLElement} cardEl - Kartenelement (Wrapper)
 * @param {HTMLElement} inner - inneres Flip-Element
 */
function flipCard(cardEl, inner) {
    const wrapper = cardEl.closest('.grid-wrapper');
    if (!wrapper) return;

    const playerData = getOrCreatePlayerData(wrapper);
    if (!canFlipCard(wrapper, cardEl, playerData)) return;

    inner.style.transform = 'rotateY(0deg)';
    playSound(flipCardSound);
    cardEl.dataset.flipped = 'true';
    playerData.count++;
    playerData.total += Number(cardEl.dataset.value);
    checkAllPlayersFlipped();
}


/**
 * Liefert vorhandene Spieler-Daten oder legt sie neu an
 * @param {HTMLElement} wrapper - grid-wrapper des Spielers
 * @returns {{id:string, count:number, total:number, name:string}}
 */
function getOrCreatePlayerData(wrapper) {
    const playerId = wrapper.dataset.playerId;
    const nameEl = wrapper.querySelector('.player-name');
    const playerName = nameEl?.innerText ?? (playerId.startsWith('player') ? 'Spieler' : 'Gegner');

    if (!flippedCards[playerId]) {
        flippedCards[playerId] = {
            id: playerId,
            count: 0,
            total: 0,
            name: playerName
        };
    }
    return flippedCards[playerId];
}


/**
 * gibt alle Spieler zurück, die bereits 2 Karten aufgedeckt haben.
 * @returns {Array<Object>} Array der Spieler-Daten
 */
function getPlayersFlippedTwoCards() {
    return Object.values(flippedCards).filter(p => p.count >= 2);
}


/**
 * Prüft, ob alle Spieler ihre Karten aufgedeckt haben
 */
function checkAllPlayersFlipped() {
    const numOpponents = Number(localStorage.getItem('numOpponent') || 1);
    const totalPlayers = 1 + numOpponents;
    const flippedValues = getPlayersFlippedTwoCards();
    const allDone = flippedValues.length === totalPlayers;

    if (!firstPlayerRotated && flippedValues.length > 0) {
        firstPlayerRotated = true;
        incrementStep();
        setTimeout(() => {
            rotatePlayers(currentStep);
            updateClickableCards();
        }, 500);
    }

    if (allDone) {
        const startingPlayer = flippedValues.reduce((prev, curr) => curr.total > prev.total ? curr : prev);
        showPopup(startingPlayer);
    }
}


/**
 * Setzt Klickbarkeit der Karten
 */
function updateClickableCards() {
    document.querySelectorAll('.card').forEach(cardEl => {
        const wrapper = cardEl.closest('.grid-wrapper');
        cardEl.style.pointerEvents = isPlayerBottom(wrapper) ? 'auto' : 'none';
    });
}


/* document.getElementById('animate-card-btn').addEventListener('click', () => {
    revealDiscardCard(); 
}); */


/**
 * Prüft, ob ein Karten-Wrapper ein Spieler-Bottom ist.
 * @param {HTMLElement} element - Wrapper-Element
 * @returns {boolean} true, wenn es player-bottom ist
 */
function isPlayerBottom (element) {
    return element.classList.contains('player-bottom');
}


/**
 * Spielt einen Sound ab, wenn die Soundeinstellungen aktiv sind.
 * @param {HTMLAudioElement} sound - Audio-Objekt
 * @param {number} [volume=1] - Lautstärke (0.0 - 1.0)
 * @param {number} [delay=0] - Verzögerung vor Abspielen in ms
 * @param {number} [playbackRate=1] - Geschwindigkeit des Sounds
 */
function playSound(sound, volume = 1, delay = 0, playbackRate = 1) {
    if (!sound) return;
    if (localStorage.getItem('sound') !== 'on') return;

    setTimeout(() => {
        try {
            sound.currentTime = 0;
            sound.volume = volume;
            sound.playbackRate = playbackRate;
            sound.play();
        } catch (e) {
            console.warn('Sound konnte nicht abgespielt werden', e);
        }
    }, delay);
}


/**
 * Zeigt das Popup an, um den Startspieler zu präsentieren.
 * @param {Object} player - Spieler-Daten
 */
function showPopup(player) {
    const popupWrapper = document.getElementById('popup');
    const popupContent = document.getElementById('popupContent');

    popupContent.innerHTML = `${player.name} beginnt das Spiel!`;
    popupWrapper.classList.add('show');

    playSound(playerStartSound, 0.3, 500);

    setTimeout(() => {
        popupWrapper.classList.remove('show');
        
        setTimeout(() => {
            const allPlayers = document.querySelectorAll('.grid-wrapper');
            const winningPlayerEl = Array.from(allPlayers).find(p => p.dataset.playerId === player.id);
             
            if (!isPlayerBottom(winningPlayerEl)) {
                incrementStep();
                rotatePlayers(currentStep);
            }
            revealDiscardCard();
        }, 800);
    }, 2000);
}


/**
 * Lässt die oberste Karte vom Ziehstapel in den Ablagestapel fliegen.
 */
function revealDiscardCard() {
    const drawDeck = window.stacks.stack1;
    const fromEl = document.getElementById('stack-field-1');
    if (!drawDeck?.length) return fromEl.style.visibility = 'hidden';

    const currentCard = drawDeck.shift();
    const toEl = document.getElementById('stack-field-2');
    const width = fromEl.offsetWidth;
    const imgSrc = currentCard.img || generateCardImage(currentCard, width, width * 3 / 2);
    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();

    const flyingCard = createFlyingCard(imgSrc, fromRect)
    stackArea.appendChild(flyingCard);

    const delta = animationDirection(fromRect, toRect);
    playSound(cardDropSound, 1, 0, 0.7);
    animateFlyingCard(flyingCard, delta);
    finalizeCard(flyingCard, toEl, currentCard, imgSrc);
}


/**
 * Erstellt ein fliegendes Karten-Element.
 * @param {string} imgSrc - Bildquelle der Karte
 * @param {DOMRect} fromRect - Ausgangsposition
 * @returns {HTMLImageElement} Neues fliegendes Karten-Element
 */
function createFlyingCard(imgSrc, fromRect) {
    const card = document.createElement('img');
    card.src = imgSrc;
    card.classList.add('card-field', 'flying-card');

    Object.assign(card.style, {
        left:  `${fromRect.left}px`,
        top: `${fromRect.top}px`,
        transform: 'translate(0, 0) rotate(0deg)',
        transformOrigin: 'center center'
    })
    return card;
}


/**
 * Berechnet die Richtung der Kartenanimation.
 * @param {DOMRect} fromRect - Startposition
 * @param {DOMRect} toRect - Zielposition
 * @returns {{x:number, y:number}} Bewegungsvektor
 */
function animationDirection(fromRect, toRect) {
    return {
        x: (toRect.left + toRect.width / 2) - (fromRect.left + fromRect.width / 2),
        y: (toRect.top  + toRect.height / 2) - (fromRect.top  + fromRect.height / 2)
    };
}


/**
 * Animiert die fliegende Karte.
 * @param {HTMLImageElement} card - Fliegendes Karten-Element
 * @param {{x:number, y:number}} delta - Bewegungsvektor
 */
function animateFlyingCard(card, delta) {
    card.getBoundingClientRect();
    requestAnimationFrame(() => {
        card.style.transform = `translate(${delta.x}px, ${delta.y}px) rotate(340deg)`;
    });
}


/**
 * Finalisiert die Animation einer Karte und setzt sie in das Ziel-Element.
 * @param {HTMLImageElement} card - Fliegendes Karten-Element
 * @param {HTMLElement} toEl - Ziel-Element
 * @param {Object} currentCard - Kartendaten
 * @param {string} imgSrc - Bildquelle
 */
function finalizeCard(card, toEl, currentCard, imgSrc) {
    card.addEventListener('transitionend', () => {
        card.remove();
        toEl.style.visibility = 'visible';
        toEl.style.border = '1px solid black';
        toEl.dataset.value = currentCard.value;
        toEl.src = imgSrc;
    }, { once: true });
}


/**
 * Setzt alle Karten zurück und löscht Spielerinformationen.
 */
export function resetCards() {
    for (const key in flippedCards) delete flippedCards[key];
    firstPlayerRotated = false;

    document.querySelectorAll('.card').forEach(cardEl => {
        cardEl.dataset.flipped = 'false';
        const inner = cardEl.querySelector('div');
        if (inner) inner.style.transform = '';
        cardEl.style.pointerEvents = 'auto';
    });
}