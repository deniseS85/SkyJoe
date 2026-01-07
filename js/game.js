import { generateCardImage } from "./setup.js";
import { rotatePlayers, currentStep, incrementStep, setTurnState, turnState } from "./setup.js";
import { resetGame } from "./setup.js";
import { showGameScreen } from "./setup.js";

const flipCardSound = new Audio('/assets/sounds/flip-card.mp3');
const playerStartSound = new Audio('assets/sounds/player-starts.mp3');
const cardDropSound = new Audio('/assets/sounds/card-drop.mp3');
const winnerSound = new Audio('/assets/sounds/winner-sound.mp3');
const stack1 = document.getElementById('stack-field-1');
const stack2 = document.getElementById('stack-field-2');

export const flippedCards = {};
export let firstPlayerRotated = false;
let lastTurnActive = false;
let remainingLastTurns = 0;


/**
 * Initialisiert den Spielstart.
 */
export function startGame() {
    setTurnState('SELECT'); 
    document.querySelectorAll('.card').forEach(cardEl => {
        cardEl.dataset.flipped = 'false';
        const inner = cardEl.querySelector('div');

        if (!cardEl.dataset.listener) {
            cardEl.addEventListener('click', () => flipCard(cardEl, inner));
            cardEl.dataset.listener = 'true';
        }
    });
    updateClickableCards();
    gameMove(); 
}


/**
 * Dreht eine Karte um und aktualisiert den Spielstand.
 * @param {HTMLElement} cardEl - Kartenelement (Wrapper)
 * @param {HTMLElement} inner - inneres Flip-Element
 * @param {boolean} [changeCard=false] - true bei Kartentausch (ohne Flip-Regelprüfung)
 * @returns 
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
    if (isFieldComplete(wrapper)) startLastRound();
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
 * Prüft, ob die Karte eines Spielers aufgedeckt werden darf.
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
 * Prüft, ob ein Karten-Wrapper ein Spieler-Bottom ist.
 * @param {HTMLElement} element - Wrapper-Element
 * @returns {boolean} true, wenn es player-bottom ist
 */
function isPlayerBottom (element) {
    return element.classList.contains('player-bottom');
}


/**
 * Aktualisiert die Punkteanzeige eines Spielers
 * @param {{id:string, total:number}} playerData - Spielerinformationen
 */
function updatePointInfo(playerData) {
    const wrapper = document.querySelector(`.grid-wrapper[data-player-id="${playerData.id}"]`);
    const pointsEl = wrapper?.querySelector('.point-info');
    pointsEl && (pointsEl.innerHTML = `<span>${playerData.total}</span>`);

    const parts = playerData.id.split('-');
    const key = parts[0] === 'player' ? 'player' : `opponent${parts[1]}`;
    const stored = JSON.parse(localStorage.getItem(key)) || { name: playerData.name, points: 0, totalPoints: 0  };
    stored.points = playerData.total;
    localStorage.setItem(key, JSON.stringify(stored));
}


/**
 * Prüft, ob alle Spieler ihre Karten aufgedeckt haben und startet ggf. 
 * die Spielrotation bzw. zeigt den Startspieler an.
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
        showStartPopup(startingPlayer);
    }
}


/**
 * gibt alle Spieler zurück, die bereits 2 Karten aufgedeckt haben.
 * @returns {Array<Object>} Array der Spieler-Daten
 */
function getPlayersFlippedTwoCards() {
    return Object.values(flippedCards).filter(p => p.count >= 2);
}


/**
 * Zeigt ein Popup-Fenster an.
 * @param {string} content - HTML-Inhalt, der im Popup angezeigt werden soll.
 * @param {HTMLAudioElement} [sound] - Sound, der beim Öffnen des Popups abgespielt wird.
 * @param {string} className - CSS-Klasse für das Popup-Content-Elemente.
 * @param {function} [onShow] - Callback, der aufgerufen wird, sobald das Popup angezeigt wurde.
 * @param {Object} [soundOptions={}] - Optionen für den Sound:
 *      @property {number} [volume] - Lautstärke des Sounds (0–1)
 *      @property {number} [delay] - Verzögerung vor dem Abspielen des Sounds in ms
 */
function showPopUp(content, sound, className, onShow) {
    const popupWrapper = document.getElementById('popup');
    const popupContent = document.getElementById('popupContent');

    popupContent.className = className;
    popupContent.innerHTML = content;
    popupWrapper.classList.add('show');

    if (sound) playSound(sound, 0.3, 500);
    onShow?.(popupContent, popupWrapper);
}


/**
 * Zeigt das Popup an mit dem Startspieler.
 * @param {Object} player - Spieler-Daten
 */
function showStartPopup(player) {
    showPopUp(`${player.name} beginnt das Spiel!`,playerStartSound, 'start-player-container', (_, popupWrapper) => {
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
            }, 800);
        }, 2000);
    });
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
        gameMove();
    }, { once: true });
}


/**
 * Aktualisiert Klickbarkeit und Event-Handler für Spielerkarten.
 * @param {HTMLElement} card - Karte, deren Klickbarkeit und Events angepasst werden.
 * @param {HTMLElement} wrapper - Übergeordnetes Grid-Element zur Reihenprüfung.
 */
function updatePlayerCard(card, wrapper) {
    const bottom = isPlayerBottom(wrapper);

    switch (turnState) {
        case 'SELECT':
            setCardInteractive(card, bottom, 'pointer');
            break;

        case 'DECIDE': {
            const isFlipped = card.dataset.flipped !== 'false';

            if (bottom && !isFlipped) {
                setCardInteractive(card, true);

                card.onclick = () => {
                    if (turnState !== 'DECIDE') return;
                    if (isFlipped) return;

                    const inner = card.querySelector('div');
                    if (!inner) return;

                    flipCard(card, inner, true);
                    refreshPoints(wrapper);
                    setTurnState('FINISH');
                    handleFinishState();
                };
            } else {
                setCardInteractive(card, false);
                card.onclick = null;
            }
            break;
        }
        case 'INIT':
        case 'START':
        case 'FINISH':
        default:
            setCardInteractive(card, false);
    }
}


/**
 * Passt Klickbarkeit und Cursor für Stapelkarten an, je nach Spielphase.
 * @param {HTMLElement} card - Karte, deren Interaktion gesetzt wird.
 */
function updateStackCard(card) {
    switch (turnState) {
        case 'START':
            if (card.id === 'stack-field-1') setCardInteractive(card, true, 'pointer');
            else if (card.id === 'stack-field-2') setCardInteractive(card, true, 'grab');
            else setCardInteractive(card, false);
            break;

        case 'DECIDE':
            if (card.id === 'stack-field-2') setCardInteractive(card, true, 'grab');
            else setCardInteractive(card, false);
            break;

        case 'INIT':
        case 'SELECT':
        case 'FINISH':
        default:
            setCardInteractive(card, false);
    }
}


/**
 * Aktiviert oder deaktiviert Klickbarkeit und Cursor einer Karte.
 * @param {HTMLElement} card - Die Karte, deren Interaktion angepasst wird.
 * @param {boolean} clickable - Ob die Karte anklickbar sein soll.
 * @param {string} [cursor='pointer'] - Angezeigter Cursor bei Klickbarkeit.
 */
function setCardInteractive(card, clickable, cursor = 'pointer') {
    card.style.pointerEvents = clickable ? 'auto' : 'none';
    card.style.cursor = clickable ? cursor : 'default';
}


/**
 * Startet den ersten Spielzug, aktiviert Klick- und Drag-Events für Stapel.
 */
function gameMove() {
    if (turnState !== 'START') return;
    enableStack1Click();
    enableStack2Drag();
}


/**
 * Aktiviert den Klick auf dem Ziehstapel, um die oberste Karte zu ziehen.
 */
function enableStack1Click() {
    const handleClick = () => {
        if (turnState !== 'START') return;
        revealDiscardCard();
        setTurnState('DECIDE'); 
        updateClickableCards();
        stack1.removeEventListener('click', handleClick);
    };
    stack1.addEventListener('click', handleClick);
}


/**
 * Aktiviert Drag-and-Drop für den Ablagestapel.
 */
function enableStack2Drag() {
    stack2.onmousedown = e => {
        if (turnState !== 'START' && turnState !== 'DECIDE') return;
        e.preventDefault();

        const rect = stack2.getBoundingClientRect();
        handleCardDrag(
            stack2,
            e.clientX - rect.left,
            e.clientY - rect.top
        );
    };
}


/**
 * Aktiviert Drag & Drop für eine Karte.
 * @param {HTMLElement} original - Die gezogene Karte
 * @param {number} offsetX - Maus-Offset X
 * @param {number} offsetY - Maus-Offset Y
 */
function handleCardDrag(original, offsetX, offsetY) {
    const playerCards = Array.from(document.querySelectorAll('.player-bottom .card'));
    let clone = null;
    let isDragging = false;

    /**
    * Bewegt die Klonkarte mit der Maus und hebt mögliche Drop-Zonen hervor.
    * @param {MouseEvent} event - Mausbewegungs-Ereignis
    */
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

    /**
    * Beendet den Drag-Vorgang, führt Swap durch oder setzt Klon zurück.
    * @param {MouseEvent} event - Mausfreigabe-Ereignis
    */
    function stopDrag(event) {
        playerCards.forEach(c => c.classList.remove('drop-hover'));
        document.removeEventListener('mousemove', startDrag);
        document.removeEventListener('mouseup', stopDrag);

        if (!isDragging) return;

        const targetCard = playerCards.find(card => {
            const rect = card.getBoundingClientRect();
            return event.clientX >= rect.left &&
                   event.clientX <= rect.right &&
                   event.clientY >= rect.top &&
                   event.clientY <= rect.bottom;
        });

        if (targetCard && (turnState === 'START' || turnState === 'DECIDE')) {
            swapCards(original, targetCard);

            clone.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                clone.remove();
                original.style.opacity = '1';
            }, 50);
            return;
        }       
        resetClone(clone, original);
    }
    document.addEventListener('mousemove', startDrag);
    document.addEventListener('mouseup', stopDrag);
}


/**
 * Erstellt eine optische Kopie (Clone) einer Karte für Drag-Effekt.
 * @param {HTMLElement} element - Karte zum Klonen
 * @param {number} [offsetLeft=15] - Linksoffset
 * @param {number} [offsetTop=9] - Obenoffset
 * @returns {HTMLElement} Clone-Element
 */
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


/**
 * Hebt Drop-Zonen hervor, über denen die Maus ist.
 * @param {number} x - Maus X
 * @param {number} y - Maus Y
 * @param {HTMLElement[]} playerCards - Zielkarten
 * @returns {HTMLElement|null} Aktive Dropzone
 */
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
 * Tauscht die Inhalte der gezogenen Karte und Zielkarte.
 * @param {HTMLElement} original - Gezogene Karte
 * @param {HTMLElement} targetCard - Zielkarte im Grid
 */
function swapCards(original, targetCard) {
    const targetImg = targetCard.querySelector('img');
    const originalImg = original.tagName === 'IMG' ? original : original.querySelector('img');
    const dragCard = { img: targetImg.src, value: targetCard.dataset.value, alt: targetImg.alt };

    targetImg.src = originalImg.src;
    targetCard.dataset.value = original.dataset.value;
    targetImg.alt = original.dataset.value ? `Card ${original.dataset.value}` : originalImg.alt;

    if (targetCard.dataset.flipped === 'false') {
        const inner = targetCard.querySelector('div');
        if (inner) flipCard(targetCard, inner, true);
    }

    const wrapper = targetCard.closest('.grid-wrapper');
    refreshPoints(wrapper);

    originalImg.src = dragCard.img;
    original.dataset.value = dragCard.value;
    originalImg.alt = dragCard.alt;
    playSound(flipCardSound);
    setTurnState('FINISH');
    handleFinishState();
}


/**
 * Setzt die Klonkarte zurück, wenn kein Drop erfolgt.
 * @param {HTMLElement} clone - Clone der Karte
 * @param {HTMLElement} original - Originalkarte
 */
function resetClone(clone, original) {
    const rect = original.getBoundingClientRect();
    clone.style.transition = 'left 0.5s ease, top 0.5s ease, transform 0.3s ease';
    clone.style.left = `${rect.left + 15}px`;
    clone.style.top = `${rect.top + 9}px`;
    clone.style.transform = window.getComputedStyle(original).transform;
    clone.addEventListener('transitionend', () => {
        clone.remove();
        original.style.opacity = '1';
    }, { once: true });
}


/**
 * Aktualisiert Punkte und gezählte Karten eines Spielers.
 * @param {HTMLElement} wrapper - Grid-Wrapper des Spielers
 */
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


/**
 * wenn ein Spielzug beendet wird, rotiert das Spielfeld, nächster Spieler beginnt.
 */
function handleFinishState() {
    if (turnState !== 'FINISH') return;

    if (lastTurnActive) {
        remainingLastTurns--;

        if (remainingLastTurns > 0) {
            incrementStep();
            rotatePlayers(currentStep);
            setTurnState('START'); 
            updateClickableCards();
            enableStack1Click();
        } else {
            setTimeout(() => {
                lastTurnActive = false;
                updateClickableCards();
                revealRemainingCards();
            }, 500);
        }
    } else {
        setTimeout(() => {
            incrementStep();
            rotatePlayers(currentStep);
            setTurnState('START'); 
            updateClickableCards();
            enableStack1Click();
        }, 500);
    }
     
}


/**
 * Prüft, ob alle Karten in einem Spielerfeld aufgedeckt sind.
 * @param {HTMLElement} wrapper - Das Wrapper-Element des Spielerfeldes.
 * @returns {boolean} True, wenn alle Karten aufgedeckt sind, sonst false.
 */
function isFieldComplete(wrapper) {
    return Array.from(wrapper.querySelectorAll('.card'))
        .every(card => card.dataset.flipped === 'true');
}


/**
 * Startet die letzte Runde des Spiels.
 * @returns {void}
 */
function startLastRound() {
    if (lastTurnActive) return;
    
    lastTurnActive = true;
    const allPlayers = document.querySelectorAll('.grid-wrapper');
    remainingLastTurns = allPlayers.length;
}


/**
 * Deckt alle noch nicht aufgedeckten Karten aller Spieler auf, 
 * aktualisiert die Punktestände und bestimmt den Gewinner des Spiels.
 * @returns {void}
 */
function revealRemainingCards() {
    document.querySelectorAll('.grid-wrapper').forEach(wrapper => {
        const playerData = getOrCreatePlayerData(wrapper);

        wrapper.querySelectorAll('.card').forEach(card => {
            if (card.dataset.flipped !== 'true') {
                const inner = card.querySelector('div');
                if (inner) inner.style.transform = 'rotateY(0deg)';
                playSound(flipCardSound);
                card.dataset.flipped = 'true';
                playerData.total += Number(card.dataset.value);
            }
        });
        updatePointInfo(playerData);
    });

    showWinPopup();
    setTurnState('FINISH');
}


/**
 * Zeigt das HighScore-Popup am Ende des Spiels an.
 */
function showWinPopup() {
    const numOpponent = Number(localStorage.getItem('numOpponent') || 1);

    const players = [{ key: 'player' }, { key: 'opponent1' }, { key: 'opponent2' }]
        .slice(0, numOpponent + 1)
        .map(p => {
            const data = JSON.parse(localStorage.getItem(p.key)) || { name: p.key, points: 0, totalPoints: 0 };
            data.totalPoints += data.points;
            localStorage.setItem(p.key, JSON.stringify(data));
            return { name: data.name, points: data.points, totalPoints: data.totalPoints, key: p.key };
        });

    players.sort((a, b) => a.points - b.points);

    const popupHTML = generateHighscoreHTML(players);

    showPopUp(popupHTML, winnerSound, 'highscore-container', (popupContent, popupWrapper) => {
        popupContent.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                popupWrapper.style.transition = 'none';
                popupWrapper.classList.remove('show');
                requestAnimationFrame(() => {
                    popupWrapper.style.transition = '';
                });

                if (btn.id === 'restartBtn') {
                     players.forEach(p => {
                        const stored = JSON.parse(localStorage.getItem(p.key)) || { name: p.name, points: 0, totalPoints: 0 };
                        stored.points = 0;
                        localStorage.setItem(p.key, JSON.stringify(stored));
                    });
                    resetGame(true);
                    showGameScreen(true);
                    setTurnState('INIT');
                    startGame();
                }
                if (btn.id === 'closeBtn') {
                    gameScreen.style.display = 'none';
                    startScreen.style.display = 'flex';
                    resetGame();
                }
            }, { once: true });
        });
    });
}


/**
 * Generiert das HTML für das Highscore-Popup.
 * @param {Array<{name: string, points: number}>} players - Sortierte Spieler mit Punkten
 * @returns {string} HTML-String für das Highscore-Popup
 */
function generateHighscoreHTML(players) {
    const medals = ['gold', 'silber', 'bronze'];

    const entriesHTML = players.map((p, i) => /*html*/`
        <div class="highscore-entry">
            <img class="rank" src="/assets/img/medaille-${medals[i]}.png" alt="Medaille ${medals[i]}">
            <img src="assets/img/profile_image_default.png" class="avatar">
            <div class="score-pill">
                <span class="name">${p.name}</span>
                <div class="points-container">
                    <span class="player-points">${p.points}</span>
                    <span class="player-total">${p.totalPoints}</span>
                </div>
                
            </div>
        </div>`
    ).join('');

    return /*html*/`
        <div class="highscore-title">HighScore</div>
        <div class="highscore-list">
            <div class="list-header">
                <div class="points-container">
                    <span>Jetzt</span>
                    <span>Total</span>
                </div>
            </div>
            ${entriesHTML}
        </div>
        <div class="btn-wrapper">
            <button class="menu-btn" id="restartBtn">Neues Spiel</button>
            <button class="menu-btn" id="closeBtn">Schliessen</button>
        </div>`;
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
 * Setzt alle Karten zurück und löscht Spielerinformationen.
 */
export function resetCards() {
    for (const key in flippedCards) delete flippedCards[key];
    firstPlayerRotated = false;
    lastTurnActive = false;
    remainingLastTurns = 0;
    setTurnState('INIT');
    updateClickableCards();

    document.querySelectorAll('.card').forEach(cardEl => {
        cardEl.dataset.flipped = 'false';
        const inner = cardEl.querySelector('div');
        if (inner) inner.style.transform = '';
    });
}