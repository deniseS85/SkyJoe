import { generateCardImage } from "./setup.js";
import { rotatePlayers, currentStep, incrementStep, setTurnState, turnState } from "./setup.js";

const flipCardSound = new Audio('/assets/sounds/flip-card.mp3');
const playerStartSound = new Audio('assets/sounds/player-starts.mp3');
const cardDropSound = new Audio('/assets/sounds/card-drop.mp3');
const stack1 = document.getElementById('stack-field-1');
const stack2 = document.getElementById('stack-field-2');

export const flippedCards = {};
export let firstPlayerRotated = false;


/**
 * Startet das Spiel und setzt Klickevent auf die Karten
 */
export function startGame() {
    setTurnState('WAIT'); 
    console.log('Wer fängt an? ', turnState)
    document.querySelectorAll('.card').forEach(cardEl => {
        cardEl.dataset.flipped = 'false';
        const inner = cardEl.querySelector('div');
        cardEl.addEventListener('click', () => flipCard(cardEl, inner));
    });
    updateClickableCards();
    firstGameMove(); 
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
           cardEl.dataset.flipped == 'false' &&
           playerData.count < 2;
}

/**
 * Karte wird gedreht bei Klick
 * @param {HTMLElement} cardEl - Kartenelement (Wrapper)
 * @param {HTMLElement} inner - inneres Flip-Element
 */
function flipCard(cardEl, inner, changeCard = false) {
    const wrapper = cardEl.closest('.grid-wrapper');
    if (!wrapper) return;

    const playerData = getOrCreatePlayerData(wrapper);
    if (!changeCard && !canFlipCard(wrapper, cardEl, playerData)) return;

    inner.style.transform = 'rotateY(0deg)';
    playSound(flipCardSound);
    cardEl.dataset.flipped = 'true';
    playerData.total += Number(cardEl.dataset.value);
    updatePointInfo(playerData);

    if (!changeCard) {
        playerData.count++;
        checkAllPlayersFlipped();
    }
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
        let startingPlayer = flippedValues.reduce((prev, curr) => curr.total > prev.total ? curr : prev);

        const topPlayers = flippedValues.filter(p => p.total === startingPlayer.total);
        if (topPlayers.length > 1) {
            startingPlayer = topPlayers[Math.floor(Math.random() * topPlayers.length)];
        }
        showPopup(startingPlayer);
    }
}


/**
 * Setzt Pointer-Events und Cursor auf eine Karte.
 * @param {HTMLElement} card 
 * @param {boolean} clickable 
 * @param {string} cursor 
 */
function setCardInteractive(card, clickable, cursor = 'pointer') {
    card.style.pointerEvents = clickable ? 'auto' : 'none';
    card.style.cursor = clickable ? cursor : 'default';
}

/**
 * Aktualisiert Klickbarkeit und Event-Handler für Spielerkarten.
 * @param {HTMLElement} card 
 * @param {HTMLElement} wrapper 
 */
function updatePlayerCard(card, wrapper) {
    const bottom = isPlayerBottom(wrapper);

    switch (turnState) {
        case 'WAIT':
            setCardInteractive(card, bottom, 'pointer');
            break;

        case 'DRAWN': {
            const isFlipped = card.dataset.flipped !== 'false';

            if (bottom && !isFlipped) {
                setCardInteractive(card, true);

                card.onclick = () => {
                    if (turnState !== 'DRAWN') return;
                    if (card.dataset.flipped !== 'false') return;

                    const inner = card.querySelector('div');
                    if (!inner) return;

                    flipCard(card, inner, true);
                    refreshPoints(wrapper);
                    setTurnState('DECIDE');
                    updateClickableCards();
                    console.log('Karte im Grid wurde aufgedeckt, Spielzug beendet ', turnState)
                };
            } else {
                setCardInteractive(card, false);
                card.onclick = null;
            }
            break;
        }

        case 'INIT':
        case 'START':
        case 'DECIDE':
        default:
            setCardInteractive(card, false);
    }
}

/**
 * Aktualisiert Klickbarkeit für Stapelkarten.
 * @param {HTMLElement} card 
 */
function updateStackCard(card) {
    switch (turnState) {
        case 'START':
            if (card.id === 'stack-field-1') setCardInteractive(card, true, 'pointer');
            else if (card.id === 'stack-field-2') setCardInteractive(card, true, 'grab');
            else setCardInteractive(card, false);
            break;

        case 'DRAWN':
            if (card.id === 'stack-field-2') setCardInteractive(card, true, 'grab');
            else setCardInteractive(card, false);
            break;

        case 'INIT':
        case 'WAIT':
        case 'DECIDE':
        default:
            setCardInteractive(card, false);
    }
}

/**
 * Setzt Klickbarkeit und Cursor für alle Karten im Spiel.
 */
function updateClickableCards() {
    document.querySelectorAll('.card, .card-field').forEach(card => {
        const wrapper = card.closest('.grid-wrapper');
        if (wrapper) updatePlayerCard(card, wrapper);
        else updateStackCard(card);
    });
}


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
            setTurnState('START');
            updateClickableCards();
            console.log('Spielzug beginnt ', turnState)
        }, 800);
    }, 2000);
}

/**
 * Lässt die oberste Karte vom Ziehstapel in den Ablagestapel fliegen.
 */
function revealDiscardCard() {
    const drawDeck = window.stacks.stack1;
    if (!drawDeck?.length) return stack1.style.visibility = 'hidden';

    const currentCard = drawDeck.shift();
    const width = stack1.offsetWidth;
    const imgSrc = currentCard.img || generateCardImage(currentCard, width, width * 3 / 2);
    const fromRect = stack1.getBoundingClientRect();
    const toRect = stack2.getBoundingClientRect();

    const flyingCard = createFlyingCard(imgSrc, fromRect)
    document.body.appendChild(flyingCard);

    const delta = animationDirection(fromRect, toRect);
    playSound(cardDropSound, 1, 0, 0.7);
    animateFlyingCard(flyingCard, delta);
    finalizeCard(flyingCard, stack2, currentCard, imgSrc);
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
        transformOrigin: 'center center',
        boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.35)',
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
        toEl.style.boxShadow = '4px 4px 8px rgba(0, 0, 0, 0.35)';
        toEl.dataset.value = currentCard.value;
        toEl.alt = currentCard.value ? `Card ${currentCard.value}` : 'Card';
        toEl.src = imgSrc;
        firstGameMove();
    }, { once: true });
}


function firstGameMove() {
    if (turnState !== 'START') return;
    enableStack1Click();
    enableStack2Drag();
}

function enableStack1Click() {
    const handleClick = () => {
        if (turnState !== 'START') return;
        revealDiscardCard();
        setTurnState('DRAWN'); 
        updateClickableCards();
        console.log('Karte wurde gezogen', turnState)
        stack1.removeEventListener('click', handleClick);
    };
    stack1.addEventListener('click', handleClick);
}

function enableStack2Drag() {
    stack2.onmousedown = e => {
        if (turnState !== 'START' && turnState !== 'DRAWN') return;
        e.preventDefault();

        const rect = stack2.getBoundingClientRect();
        handleCardDrag(
            stack2,
            e.clientX - rect.left,
            e.clientY - rect.top
        );
    };
}


function handleCardDrag(original, offsetX, offsetY) {
    let clone = null;
    let isDragging = false;

    const playerCards = Array.from(document.querySelectorAll('.player-bottom .card'));

    function startDrag(event) {
        if (!isDragging) {
            clone = createClone(original);
            original.style.opacity = '0.01';
            clone.style.transform = window.getComputedStyle(original).transform;

            requestAnimationFrame(() => {
                clone.style.transition = 'transform 0.3s ease';
                clone.style.transform = 'rotate(0deg)';
            });
            
            isDragging = true;
        }
        clone.style.left = `${event.clientX - offsetX}px`;
        clone.style.top = `${event.clientY - offsetY}px`;

        highlightDropzone(event.clientX, event.clientY, playerCards);
    }

    function stopDrag(event) {
        playerCards.forEach(c => c.classList.remove('drop-hover'));
        document.removeEventListener('mousemove', startDrag);
        document.removeEventListener('mouseup', stopDrag);

        if (!isDragging) return;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        let targetCard = null;
        for (const card of playerCards) {
            const rect = card.getBoundingClientRect();
            if (
                mouseX >= rect.left &&
                mouseX <= rect.right &&
                mouseY >= rect.top &&
                mouseY <= rect.bottom
            ) {
                targetCard = card;
                break;
            }
        }

        if (targetCard && (turnState === 'START' || turnState === 'DRAWN')) {
            const targetImg = targetCard.querySelector('img');
            const newDiscardCard = original.tagName === 'IMG' ? original : original.querySelector('img'); 
            const dragCard = { img: targetImg.src, value: targetCard.dataset.value, alt: targetImg.alt  };

            targetImg.src = original.src;
            targetCard.dataset.value = original.dataset.value; 
            targetImg.alt = original.dataset.value ? `Card ${original.dataset.value}` : newDiscardCard.alt;

            if (targetCard.dataset.flipped === 'false') {
                const inner = targetCard.querySelector('div');
                if (inner) flipCard(targetCard, inner, true);
            }

            const wrapper = targetCard.closest('.grid-wrapper');
            refreshPoints(wrapper);
            
            newDiscardCard.src = dragCard.img;
            original.dataset.value = dragCard.value;
            newDiscardCard.alt = dragCard.alt;
            playSound(flipCardSound);

            setTurnState('DECIDE');
            updateClickableCards();
            console.log('Karte wurde gedroppt, Spielzug beendet ', turnState);

            clone.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                clone.remove();
                original.style.opacity = '1';
            }, 50);
            return;
        }       



        const originalRect = original.getBoundingClientRect(); 
        clone.style.transition = 'left 0.5s ease, top 0.5s ease, transform 0.3s ease';       
        clone.style.left = `${originalRect.left + 15}px`;
        clone.style.top = `${originalRect.top + 9}px`;
        clone.style.transform = window.getComputedStyle(original).transform;
        clone.addEventListener('transitionend', () => {
            clone.remove();
            original.style.opacity = '1';
        }, { once: true });

        
    }
    document.addEventListener('mousemove', startDrag);
    document.addEventListener('mouseup', stopDrag);
}

function refreshPoints(wrapper) {
    const playerData = getOrCreatePlayerData(wrapper);

    let total = 0;
    let count = 0;

    wrapper.querySelectorAll('.card[data-flipped="true"]').forEach(card => {
        total += Number(card.dataset.value);
        count++;
    });

    playerData.total = total;
    playerData.count = count;
    updatePointInfo(playerData);
}


function createClone(element, offsetLeft = 15, offsetTop = 9) {
    const rect = element.getBoundingClientRect();
    const clone = element.cloneNode(true);

    Object.assign(clone.style, {
        position: 'fixed',
        left: `${rect.left + offsetLeft}px`,
        top: `${rect.top + offsetTop}px`,
        pointerEvents: 'none',
        transform: window.getComputedStyle(element).transform,
        transition: 'transform 0.3s ease',
        zIndex: 9999
    });

    document.body.appendChild(clone);
    return clone;
}

function highlightDropzone(x, y, playerCards) {
    let active = null;

    for (const card of playerCards) {
        const rect = card.getBoundingClientRect();
        const isOver =
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom;

        card.classList.toggle('drop-hover', isOver);
        if (isOver) active = card;
    }

    return active;
}




/**
 * Aktualisiert die Punkteanzeige eines Spielers
 * @param {{id:string, total:number}} playerData
 */
function updatePointInfo(playerData) {
    const wrapper = document.querySelector(`.grid-wrapper[data-player-id="${playerData.id}"]`);
    const pointsEl = wrapper?.querySelector('.point-info');
    pointsEl && (pointsEl.innerHTML = `<span>${playerData.total}</span>`);
}


/**
 * Setzt alle Karten zurück und löscht Spielerinformationen.
 */
export function resetCards() {
    for (const key in flippedCards) delete flippedCards[key];
    firstPlayerRotated = false;
    setTurnState('INIT');
    updateClickableCards();

    document.querySelectorAll('.card').forEach(cardEl => {
        cardEl.dataset.flipped = 'false';
        const inner = cardEl.querySelector('div');
        if (inner) inner.style.transform = '';
    });
}