## Functions

<dl>
<dt><a href="#startGame">startGame()</a></dt>
<dd><p>Initialisiert den Spielstart.</p>
</dd>
<dt><a href="#flipCard">flipCard(cardEl, inner, [changeCard])</a> ⇒ <code>void</code></dt>
<dd><p>Dreht eine Karte um und aktualisiert den Spielstand.</p>
</dd>
<dt><a href="#getOrCreatePlayerData">getOrCreatePlayerData(wrapper)</a> ⇒ <code>Object</code></dt>
<dd><p>Liefert vorhandene Spieler-Daten oder legt sie neu an</p>
</dd>
<dt><a href="#canFlipCard">canFlipCard(wrapper, cardEl, playerData)</a> ⇒ <code>boolean</code></dt>
<dd><p>Prüft, ob die Karte eines Spielers aufgedeckt werden darf.</p>
</dd>
<dt><a href="#isPlayerBottom">isPlayerBottom(element)</a> ⇒ <code>boolean</code></dt>
<dd><p>Prüft, ob ein Karten-Wrapper ein Spieler-Bottom ist.</p>
</dd>
<dt><a href="#updatePointInfo">updatePointInfo(playerData, blink)</a></dt>
<dd><p>Aktualisiert die sichtbare Punkteanzeige im DOM und speichert die Werte im localStorage.</p>
</dd>
<dt><a href="#checkAllPlayersFlipped">checkAllPlayersFlipped()</a></dt>
<dd><p>Prüft, ob alle Spieler ihre 2 Karten aufgedeckt haben und startet ggf. 
die Spielrotation bzw. zeigt den Startspieler an.</p>
</dd>
<dt><a href="#getPlayersFlippedTwoCards">getPlayersFlippedTwoCards()</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>gibt alle Spieler zurück, die bereits 2 Karten aufgedeckt haben.</p>
</dd>
<dt><a href="#updateClickableCards">updateClickableCards()</a></dt>
<dd><p>Setzt Klickbarkeit und Cursor für alle Karten im Spiel.</p>
</dd>
<dt><a href="#revealDiscardCard">revealDiscardCard()</a></dt>
<dd><p>Lässt die oberste Karte vom Ziehstapel in den Ablagestapel fliegen.</p>
</dd>
<dt><a href="#createFlyingCard">createFlyingCard(imgSrc, fromRect)</a> ⇒ <code>HTMLImageElement</code></dt>
<dd><p>Erstellt ein fliegendes Karten-Element.</p>
</dd>
<dt><a href="#animationDirection">animationDirection(fromRect, toRect)</a> ⇒ <code>Object</code></dt>
<dd><p>Berechnet die Richtung der Kartenanimation.</p>
</dd>
<dt><a href="#animateFlyingCard">animateFlyingCard(card, delta)</a></dt>
<dd><p>Animiert die fliegende Karte.</p>
</dd>
<dt><a href="#finalizeCard">finalizeCard(card, toEl, currentCard, imgSrc)</a></dt>
<dd><p>Finalisiert die Animation einer Karte und setzt sie in das Ziel-Element.</p>
</dd>
<dt><a href="#updatePlayerCard">updatePlayerCard(card, wrapper)</a></dt>
<dd><p>Aktualisiert Klickbarkeit und Event-Handler für Spielerkarten.</p>
</dd>
<dt><a href="#updateStackCard">updateStackCard(card)</a></dt>
<dd><p>Passt Klickbarkeit und Cursor für Stapelkarten an, je nach Spielphase.</p>
</dd>
<dt><a href="#setCardInteractive">setCardInteractive(card, clickable, [cursor])</a></dt>
<dd><p>Aktiviert oder deaktiviert Klickbarkeit und Cursor einer Karte.</p>
</dd>
<dt><a href="#gameMove">gameMove()</a></dt>
<dd><p>Startet den ersten Spielzug, aktiviert Klick- und Drag-Events für Stapel.</p>
</dd>
<dt><a href="#enableStack1Click">enableStack1Click()</a></dt>
<dd><p>Aktiviert den Klick auf dem Ziehstapel, um die oberste Karte zu ziehen.</p>
</dd>
<dt><a href="#enableStack2Drag">enableStack2Drag()</a></dt>
<dd><p>Aktiviert Drag-and-Drop für den Ablagestapel (Mouse &amp; Touch).</p>
</dd>
<dt><a href="#handleCardDrag">handleCardDrag(original, offsetX, offsetY)</a></dt>
<dd><p>Aktiviert Drag &amp; Drop für eine Karte (Mouse &amp; Touch via Pointer Events).</p>
</dd>
<dt><a href="#createClone">createClone(element, [offsetLeft], [offsetTop])</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Erstellt eine optische Kopie (Clone) einer Karte für Drag-Effekt.</p>
</dd>
<dt><a href="#highlightDropzone">highlightDropzone(x, y, playerCards)</a> ⇒ <code>HTMLElement</code> | <code>null</code></dt>
<dd><p>Hebt Drop-Zonen hervor, über denen die Maus ist.</p>
</dd>
<dt><a href="#swapCards">swapCards(original, targetCard)</a></dt>
<dd><p>Tauscht die Inhalte der gezogenen Karte und Zielkarte.</p>
</dd>
<dt><a href="#resetClone">resetClone(clone, original)</a></dt>
<dd><p>Setzt die Klonkarte zurück, wenn kein Drop erfolgt.</p>
</dd>
<dt><a href="#refreshPoints">refreshPoints(wrapper)</a></dt>
<dd><p>Berechnet die aktuellen Punkte eines Spielers anhand der aufgedeckten Karten</p>
</dd>
<dt><a href="#handleFinishState">handleFinishState()</a></dt>
<dd><p>wenn ein Spielzug beendet wird, rotiert das Spielfeld, nächster Spieler beginnt.</p>
</dd>
<dt><a href="#isFieldComplete">isFieldComplete(wrapper)</a> ⇒ <code>boolean</code></dt>
<dd><p>Prüft, ob alle Karten in einem Spielerfeld aufgedeckt sind.</p>
</dd>
<dt><a href="#startLastRound">startLastRound()</a></dt>
<dd><p>Startet die letzte Runde des Spiels.</p>
</dd>
<dt><a href="#showLastRoundBanner">showLastRoundBanner()</a></dt>
<dd><p>Zeigt Info letzte Runde, dann ist das Spiel vorbei.</p>
</dd>
<dt><a href="#revealRemainingCards">revealRemainingCards()</a></dt>
<dd><p>Deckt alle noch nicht aufgedeckten Karten aller Spieler auf, 
aktualisiert die Punktestände und bestimmt den Gewinner des Spiels.</p>
</dd>
<dt><a href="#applyFirstPlayerPenalty">applyFirstPlayerPenalty()</a></dt>
<dd><p>Prüft, ob der erste Spieler, der die Runde beendet hat, die niedrigste Punktzahl hat,
wenn nicht, dann bekommt er eine Strafe (Punkte werden verdoppelt)</p>
</dd>
<dt><a href="#checkThreeInColumn">checkThreeInColumn(wrapper)</a></dt>
<dd><p>Prüft, ob in ein Speiler in einer Spalte drei gleiche Kartenwerte hat.</p>
</dd>
<dt><a href="#highlightColumn">highlightColumn(wrapper, column)</a></dt>
<dd><p>Hebt die Spalte hervor, wo drei Kartenwerte gleich sind.</p>
</dd>
<dt><a href="#animateColumn">animateColumn(cards)</a></dt>
<dd><p>Animiert das Entfernen von drei gleichen Karten aus einer Spalte
und verschiebt sie in den Ablagestapel.</p>
</dd>
<dt><a href="#checkPlayingFieldIsEmpty">checkPlayingFieldIsEmpty(wrapper)</a></dt>
<dd><p>Prüft, ob das Grid des Spielers leer ist und startet die letzte Runde.</p>
</dd>
<dt><a href="#isWrapperEmpty">isWrapperEmpty(wrapper)</a> ⇒ <code>boolean</code></dt>
<dd><p>Prüft, ob ein Wrapper keine Karten mehr hat.</p>
</dd>
<dt><a href="#checkEndOfGame">checkEndOfGame()</a></dt>
<dd><p>Prüft alle Grids, ob das Spiel beendet ist, und löst ggf. das Endspiel aus.</p>
</dd>
<dt><a href="#setupGameSettings">setupGameSettings()</a></dt>
<dd><p>Initialisiert die Toggle-Icons für Sound und Musik.
Speichert den Status in localStorage und spielt/stoppt Sounds.</p>
</dd>
<dt><a href="#setupToggles">setupToggles()</a></dt>
<dd><p>Initialisiert Sound- und Musik-Toggles, synchronisiert deren Status mit dem localStorage.</p>
</dd>
<dt><a href="#initializeToggleButton">initializeToggleButton(button, key, [onEnable], [onDisable])</a></dt>
<dd><p>Initialisiert einen Toggle-Button (Sound oder Musik).</p>
</dd>
<dt><a href="#showPopUp">showPopUp(content, [soundOptions])</a></dt>
<dd><p>Zeigt ein Popup-Fenster an.</p>
</dd>
<dt><a href="#showStartPopup">showStartPopup(player)</a></dt>
<dd><p>Zeigt das Popup an mit dem Startspieler.</p>
</dd>
<dt><a href="#showWinPopup">showWinPopup()</a></dt>
<dd><p>Zeigt das HighScore-Popup am Ende des Spiels an.</p>
</dd>
<dt><a href="#loadPlayers">loadPlayers()</a> ⇒ <code>Array</code></dt>
<dd><p>Lädt die Spieler aus dem LocalStorage.</p>
</dd>
<dt><a href="#generateHighscoreHTML">generateHighscoreHTML(players, isSettings)</a> ⇒ <code>string</code></dt>
<dd><p>Generiert das HTML für das Highscore-Popup.</p>
</dd>
<dt><a href="#calculateRanks">calculateRanks(players, pointKey)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Berechnet die Platzierungen der Spieler basierend auf ihren Punkten.
Gleiche Punktzahlen erhalten den gleichen Rang.</p>
</dd>
<dt><a href="#setupGameRulesPopup">setupGameRulesPopup()</a></dt>
<dd><p>Initialisiert das Popup für die Spielregeln.</p>
</dd>
<dt><a href="#setupHighScorePopup">setupHighScorePopup()</a></dt>
<dd><p>Initialisiert das Popup für die Highscore.</p>
</dd>
<dt><a href="#setupClickOutside">setupClickOutside(popupWrapper, popupContent, triggerElement, type)</a></dt>
<dd><p>Schließt ein Popup, wenn außerhalb des Popup-Inhalts geklickt wird.</p>
</dd>
<dt><a href="#playSound">playSound(sound, [volume], [delay], [playbackRate])</a></dt>
<dd><p>Spielt einen Sound ab, wenn die Soundeinstellungen aktiv sind.</p>
</dd>
<dt><a href="#resetCards">resetCards()</a></dt>
<dd><p>Setzt alle Karten zurück und löscht Spielerinformationen.</p>
</dd>
<dt><a href="#openPaperRoll">openPaperRoll(content, isSettings, isPlayerForm, triggerBtn)</a></dt>
<dd><p>Öffnet die Paper-Roll mit Inhalt.
Fügt automatisch einen Close-Button hinzu.
Start-Button wird kurz deaktiviert.</p>
</dd>
<dt><a href="#closePaperRoll">closePaperRoll()</a></dt>
<dd><p>Schließt die Paper-Roll und aktiviert den Start-Button wieder.</p>
</dd>
<dt><a href="#resetPlayers">resetPlayers(newNum)</a></dt>
<dd><p>Löscht alte Spieler- und Gegnerdaten aus dem LocalStorage, wenn Anzahl Gegner sich ändert und speichert die neue Anzahl..</p>
</dd>
<dt><a href="#initPlayers">initPlayers(newNum)</a></dt>
<dd><p>Initialisiert Standardwerte für den Spieler und die Gegner im LocalStorage, wenn nichts existiert.</p>
</dd>
<dt><a href="#setupAvatarSelect">setupAvatarSelect()</a></dt>
<dd><p>Öffnet die Avatar-Auswahl für den jeweiligen Spieler.</p>
</dd>
<dt><a href="#showAvatarPicker">showAvatarPicker(playerIndex)</a> ⇒ <code>void</code></dt>
<dd><p>Öffnet das Avatar-Auswahl-Submenu für einen Spieler und ermöglicht Auswahl.</p>
</dd>
<dt><a href="#renderAvatarMenu">renderAvatarMenu(form, playerIndex)</a></dt>
<dd><p>Rendert das HTML für das Avatar-Auswahlmenü eines Spielers.</p>
</dd>
<dt><a href="#adjustThreePlayersLayout">adjustThreePlayersLayout(form, container)</a></dt>
<dd><p>Passt Layout für drei Spieler an.</p>
</dd>
<dt><a href="#setupAvatarClick">setupAvatarClick(avatars, playerIndex)</a></dt>
<dd><p>Bindet Klick-Events auf alle Avatar-Bilder und speichert die Auswahl.</p>
</dd>
<dt><a href="#restorePlayerForm">restorePlayerForm(form, prevContent, inputValues, submitBtn, threePlayers)</a></dt>
<dd><p>Stellt das ursprüngliche Player-Formular wieder her und initialisiert Events.</p>
</dd>
<dt><a href="#handlePlayerFormSubmit">handlePlayerFormSubmit()</a></dt>
<dd><p>Bindet den Submit-Button des Spielerformulars.
Speichert die Werte und schließt die Paper-Roll. Verhindert doppelte Listener (bound).</p>
</dd>
<dt><a href="#applyPlayerDefaults">applyPlayerDefaults()</a></dt>
<dd><p>Wendet Standardwerte für Spieler und Gegner an, falls keine Daten vorhanden sind.</p>
</dd>
<dt><a href="#validateInputs">validateInputs(inputElements)</a></dt>
<dd><p>Validiert Inputfelder: erlaubt nur Buchstaben und Bindestriche.</p>
</dd>
<dt><a href="#restorePlayerFormData">restorePlayerFormData()</a></dt>
<dd><p>Stellt gespeicherte Spieler- und Gegnerdaten im Formular wieder her. Inputs leeren, wenn Standardwerte.</p>
</dd>
<dt><a href="#markSelectedAvatar">markSelectedAvatar(avatarBtns, selectedSrc)</a></dt>
<dd><p>Markiert einen gewählten Avatar und dimmt die anderen.</p>
</dd>
<dt><a href="#showSelectedAvatarInPlayerForm">showSelectedAvatarInPlayerForm(form)</a></dt>
<dd><p>Setzt das gewählte Avatar-Bild in Formular, bei Deselektierung Default-Image (upload-image.png).</p>
</dd>
<dt><a href="#initToggle">initToggle(toggleId, storageKey, onEnable, onDisable)</a></dt>
<dd><p>Initialisiert einen Toggle für Sound oder Musik.</p>
</dd>
<dt><a href="#playMusic">playMusic()</a></dt>
<dd><p>Startet Hintergrundmusik, falls Element vorhanden.</p>
</dd>
<dt><a href="#stopMusic">stopMusic()</a></dt>
<dd><p>Stoppt Musik und setzt Zeit auf 0</p>
</dd>
<dt><a href="#initBackgroundCarousel">initBackgroundCarousel()</a></dt>
<dd><p>Initialisiert das 3D Carousel für Hintergrundbilder.
Passt Größe an Bildschirmbreite an.</p>
</dd>
<dt><a href="#setBackgroundName">setBackgroundName(index)</a></dt>
<dd><p>Setzt den Screenreader‑Text für den aktuell ausgewählten Hintergrund.</p>
</dd>
<dt><a href="#updateCells">updateCells(images, selectedIndex, theta, radius, rotateFn)</a></dt>
<dd><p>Aktualisiert Position und Opazität aller Carousel-Bilder.
Das vorderste Bild (selectedIndex) wird hervorgehoben, alle anderen leicht transparent.</p>
</dd>
<dt><a href="#rotateCarousel">rotateCarousel(carousel, images, selectedIndex, theta, radius, rotateFn)</a></dt>
<dd><p>Dreht das gesamte Carousel auf das aktuell ausgewählte Bild.
Ruft updateCells auf und speichert die Auswahl in localStorage.</p>
</dd>
<dt><a href="#resetGame">resetGame(isRestart)</a></dt>
<dd></dd>
<dt><a href="#clearGameDOM">clearGameDOM()</a></dt>
<dd><p>Entfernt alle Karten aus dem DOM</p>
</dd>
<dt><a href="#resetRotationWrapper">resetRotationWrapper()</a></dt>
<dd><p>Setzt den Rotation-Wrapper zurück.</p>
</dd>
<dt><a href="#resetLocalStorage">resetLocalStorage()</a></dt>
<dd><p>Löscht Spieler-Informationen aus localStorage.</p>
</dd>
<dt><a href="#showGameScreen">showGameScreen(isRestart)</a></dt>
<dd><p>Zeigt den Spielbildschirm und initialisiert Spieler und Deck.</p>
</dd>
<dt><a href="#updateRound">updateRound(increase)</a> ⇒ <code>number</code></dt>
<dd><p>Zeigt die Rundenanzahl an</p>
</dd>
<dt><a href="#setBackground">setBackground()</a></dt>
<dd><p>Setzt den Hintergrund abhängig von der Auswahl.</p>
</dd>
<dt><a href="#setSoundMusicIcons">setSoundMusicIcons()</a></dt>
<dd><p>Setzt die Icons für Sound und Musik anhand des LocalStorage-Status.</p>
</dd>
<dt><a href="#createPlayers">createPlayers()</a></dt>
<dd><p>Erstellt Spieler- und Gegner-Container und fügt sie dem Rotation-Wrapper hinzu.</p>
</dd>
<dt><a href="#createContainer">createContainer(type, index)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Erstellt einen Container für Spieler oder Gegner inklusive Spielerinfos und Raster.</p>
</dd>
<dt><a href="#createPlayerGridWrapper">createPlayerGridWrapper(name, id, imageUrl)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Erstellt die Spielerinfo mit Bild, Name und Punkteanzeige.</p>
</dd>
<dt><a href="#createProfileImage">createProfileImage(container, imageUrl)</a></dt>
<dd><p>Erstellt ein Profilbild-Element und fügt es in ein Container-Element ein.</p>
</dd>
<dt><a href="#createUserName">createUserName(container, name)</a></dt>
<dd><p>Erstellt ein Namens-Element und fügt es in ein Container-Element ein.</p>
</dd>
<dt><a href="#createPointsInfo">createPointsInfo(container)</a></dt>
<dd><p>Fügt ein Punktefeld in den Container ein.</p>
</dd>
<dt><a href="#createGrid">createGrid(id, className)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Erstellt ein Raster mit 12 Kartenfeldern.</p>
</dd>
<dt><a href="#createDeck">createDeck()</a> ⇒ <code>Array</code></dt>
<dd><p>Erstellt ein Kartendeck aus skyjoCards-Objekten.</p>
</dd>
<dt><a href="#shuffle">shuffle(array)</a></dt>
<dd><p>Mischt die Karten durch</p>
</dd>
<dt><a href="#createStacks">createStacks(deck)</a> ⇒ <code>Object</code></dt>
<dd><p>Teilt das Deck in drei Stacks: Hauptstapel (stack1) und aktuelle Karte (stack2)</p>
</dd>
<dt><a href="#placeStacks">placeStacks(stack1)</a></dt>
<dd><p>Platziert den Ziehstapel auf dem Spielbildschirm.</p>
</dd>
<dt><a href="#createCardElement">createCardElement(card, width, borderRadius)</a> ⇒ <code>HTMLElement</code></dt>
<dd><p>Erstellt Kartenelement mit Vorder- und Rückseite</p>
</dd>
<dt><a href="#createCardWrapper">createCardWrapper(card, width, borderRadius)</a> ⇒ <code>HTMLDivElement</code></dt>
<dd><p>Erstellt den äußeren Wrapper einer Karte.</p>
</dd>
<dt><a href="#createCardInner">createCardInner()</a> ⇒ <code>HTMLDivElement</code></dt>
<dd><p>Erstellt den inneren Flip-Container der Karte.</p>
</dd>
<dt><a href="#createCardFace">createCardFace(src, alt, borderRadius, [extraStyles])</a> ⇒ <code>HTMLImageElement</code></dt>
<dd><p>Erstellt eine einzelne Kartenfläche (Vorder- oder Rückseite).</p>
</dd>
<dt><a href="#generateCardImage">generateCardImage(card, width, height)</a> ⇒ <code>string</code></dt>
<dd><p>Erzeugt ein dynamisches Bild für eine Karte über ein Canvas.</p>
</dd>
<dt><a href="#animateDeal">animateDeal(players)</a></dt>
<dd><p>Startet die Karten-Austeil-Animation für alle Spieler.</p>
</dd>
<dt><a href="#afterDeal">afterDeal(delayMs)</a></dt>
<dd><p>Stoppt den Deal-Sound nach der angegebenen Zeit.
Startet das Spiel.</p>
</dd>
<dt><a href="#incrementStep">incrementStep()</a></dt>
<dd><p>Erhöht <code>currentStep</code> um 1 und fährt mit dem nächsten Spieler fort.</p>
</dd>
<dt><a href="#setTurnState">setTurnState(state)</a></dt>
<dd><p>Setzt den aktuellen Spielzustand.</p>
<ul>
<li>&#39;INIT&#39;   : Spiel wird aufgbaut, alle Karten deaktiviert</li>
<li>&#39;SELECT&#39; : Auswahl wer das Spiel beginnt</li>
<li>&#39;START&#39;  : Spieler beginnt das Spiel</li>
<li>&#39;DECIDE&#39; : Spieler hat Zugmöglichkeiten</li>
<li>&#39;FINISH&#39; : 1. Spielzug fertig, alle Karten deaktiviert</li>
</ul>
</dd>
<dt><a href="#dealToPlayer">dealToPlayer(player, pIndex, fieldWidth, deckRect, startWidth, borderRadius, cardsPerPlayer)</a></dt>
<dd><p>Teilt einem Spieler seine Karten aus und startet die Animation jeder Karte.</p>
</dd>
<dt><a href="#positionCardAtDeck">positionCardAtDeck(cardEl, deckRect, index)</a></dt>
<dd><p>Positioniert die Karte am Deck vor dem Start der Animation.</p>
</dd>
<dt><a href="#animateSingleCard">animateSingleCard(cardEl, player, index, fieldWidth, deckRect)</a></dt>
<dd><p>Animiert eine einzelne Karte vom Deck zum Spielerfeld.</p>
</dd>
<dt><a href="#playDealSound">playDealSound()</a></dt>
<dd><p>Spielt den Sound des Kartenausteilens einmalig ab, solange er noch nicht läuft.</p>
</dd>
<dt><a href="#stopDealSound">stopDealSound()</a></dt>
<dd><p>Stoppt den Deal-Sound, setzt Position zurück und deaktiviert Loop.</p>
</dd>
<dt><a href="#finalizeCardPlacement">finalizeCardPlacement(cardEl, field, widthValue)</a></dt>
<dd><p>Platziert die Karte dauerhaft auf dem Spielerfeld und setzt Stil zurück.</p>
</dd>
<dt><a href="#resizeAllCards">resizeAllCards()</a></dt>
<dd><p>Passt die Größe aller Karten initial und bei windows resize an ihre jeweiligen Kartenfelder an.</p>
</dd>
<dt><a href="#positionPlayersInRotationWrapper">positionPlayersInRotationWrapper()</a></dt>
<dd><p>Positioniert alle Spieler gleichmäßig im Kreis innerhalb des Rotation-Wrappers.</p>
</dd>
<dt><a href="#calculatePositionOnEllipse">calculatePositionOnEllipse(angle, radiusX, radiusY, center)</a> ⇒ <code>Object</code></dt>
<dd><p>Berechnet die x- und y-Position eines Punktes auf einer Ellipse anhand eines Winkels.</p>
</dd>
<dt><a href="#calculatePlayerAngles">calculatePlayerAngles(count)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Berechnet die Winkel für jeden Spieler abhängig von der Spielerzahl.</p>
</dd>
<dt><a href="#applyPlayerPosition">applyPlayerPosition(player, pos, angle)</a></dt>
<dd><p>Setzt die Position, Rotation und CSS-Klassen eines Spielers.</p>
</dd>
<dt><a href="#rotatePlayers">rotatePlayers(step)</a></dt>
<dd><p>Dreht den Spieler-Wrapper und alle Spieler-Container um einen Schritt.
Berechnet die Rotation für jeden Spieler und passt deren Layout entsprechend an.</p>
</dd>
<dt><a href="#rotateWrapper">rotateWrapper(degrees)</a></dt>
<dd><p>Dreht den gesamten Spieler-Wrapper.</p>
</dd>
<dt><a href="#rotatePlayer">rotatePlayer(player, wrapperRotation)</a></dt>
<dd><p>Dreht einen einzelnen Spieler entgegen der Wrapper-Drehung
und passt die CSS-Klassen für bottom/top sowie das Grid-Layout an.</p>
</dd>
<dt><a href="#adjustGrid">adjustGrid(grid, isBottom)</a></dt>
<dd><p>Passt die Breite der Karten und den Abstand (Gap) innerhalb eines Grids an,
abhängig davon, ob der Spieler unten sitzt und von der Fensterhöhe.</p>
</dd>
</dl>

<a name="startGame"></a>

## startGame()
Initialisiert den Spielstart.

**Kind**: global function  
<a name="flipCard"></a>

## flipCard(cardEl, inner, [changeCard]) ⇒ <code>void</code>
Dreht eine Karte um und aktualisiert den Spielstand.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cardEl | <code>HTMLElement</code> |  | Kartenelement (Wrapper) |
| inner | <code>HTMLElement</code> |  | inneres Flip-Element |
| [changeCard] | <code>boolean</code> | <code>false</code> | true bei Kartentausch (ohne Flip-Regelprüfung) |

<a name="getOrCreatePlayerData"></a>

## getOrCreatePlayerData(wrapper) ⇒ <code>Object</code>
Liefert vorhandene Spieler-Daten oder legt sie neu an

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| wrapper | <code>HTMLElement</code> | grid-wrapper des Spielers |

<a name="canFlipCard"></a>

## canFlipCard(wrapper, cardEl, playerData) ⇒ <code>boolean</code>
Prüft, ob die Karte eines Spielers aufgedeckt werden darf.

**Kind**: global function  
**Returns**: <code>boolean</code> - true, wenn die Karte aufgedeckt werden darf  

| Param | Type | Description |
| --- | --- | --- |
| wrapper | <code>HTMLElement</code> | Wrapper-Element der Karte |
| cardEl | <code>HTMLElement</code> | Kartenelement |
| playerData | <code>Object</code> | Spielerinformationen aus flippedCards |

<a name="isPlayerBottom"></a>

## isPlayerBottom(element) ⇒ <code>boolean</code>
Prüft, ob ein Karten-Wrapper ein Spieler-Bottom ist.

**Kind**: global function  
**Returns**: <code>boolean</code> - true, wenn es player-bottom ist  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>HTMLElement</code> | Wrapper-Element |

<a name="updatePointInfo"></a>

## updatePointInfo(playerData, blink)
Aktualisiert die sichtbare Punkteanzeige im DOM und speichert die Werte im localStorage.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| playerData | <code>Object</code> |  | Spielerinformationen |
| blink | <code>boolean</code> | <code>false</code> | gitb visuellen Feedback bei true |

<a name="checkAllPlayersFlipped"></a>

## checkAllPlayersFlipped()
Prüft, ob alle Spieler ihre 2 Karten aufgedeckt haben und startet ggf. 
die Spielrotation bzw. zeigt den Startspieler an.

**Kind**: global function  
<a name="getPlayersFlippedTwoCards"></a>

## getPlayersFlippedTwoCards() ⇒ <code>Array.&lt;Object&gt;</code>
gibt alle Spieler zurück, die bereits 2 Karten aufgedeckt haben.

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - Array der Spieler-Daten  
<a name="updateClickableCards"></a>

## updateClickableCards()
Setzt Klickbarkeit und Cursor für alle Karten im Spiel.

**Kind**: global function  
<a name="revealDiscardCard"></a>

## revealDiscardCard()
Lässt die oberste Karte vom Ziehstapel in den Ablagestapel fliegen.

**Kind**: global function  
<a name="createFlyingCard"></a>

## createFlyingCard(imgSrc, fromRect) ⇒ <code>HTMLImageElement</code>
Erstellt ein fliegendes Karten-Element.

**Kind**: global function  
**Returns**: <code>HTMLImageElement</code> - Neues fliegendes Karten-Element  

| Param | Type | Description |
| --- | --- | --- |
| imgSrc | <code>string</code> | Bildquelle der Karte |
| fromRect | <code>DOMRect</code> | Ausgangsposition |

<a name="animationDirection"></a>

## animationDirection(fromRect, toRect) ⇒ <code>Object</code>
Berechnet die Richtung der Kartenanimation.

**Kind**: global function  
**Returns**: <code>Object</code> - Bewegungsvektor  

| Param | Type | Description |
| --- | --- | --- |
| fromRect | <code>DOMRect</code> | Startposition |
| toRect | <code>DOMRect</code> | Zielposition |

<a name="animateFlyingCard"></a>

## animateFlyingCard(card, delta)
Animiert die fliegende Karte.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| card | <code>HTMLImageElement</code> | Fliegendes Karten-Element |
| delta | <code>Object</code> | Bewegungsvektor |

<a name="finalizeCard"></a>

## finalizeCard(card, toEl, currentCard, imgSrc)
Finalisiert die Animation einer Karte und setzt sie in das Ziel-Element.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| card | <code>HTMLImageElement</code> | Fliegendes Karten-Element |
| toEl | <code>HTMLElement</code> | Ziel-Element |
| currentCard | <code>Object</code> | Kartendaten |
| imgSrc | <code>string</code> | Bildquelle |

<a name="updatePlayerCard"></a>

## updatePlayerCard(card, wrapper)
Aktualisiert Klickbarkeit und Event-Handler für Spielerkarten.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| card | <code>HTMLElement</code> | Karte, deren Klickbarkeit und Events angepasst werden. |
| wrapper | <code>HTMLElement</code> | Übergeordnetes Grid-Element zur Reihenprüfung. |

<a name="updateStackCard"></a>

## updateStackCard(card)
Passt Klickbarkeit und Cursor für Stapelkarten an, je nach Spielphase.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| card | <code>HTMLElement</code> | Karte, deren Interaktion gesetzt wird. |

<a name="setCardInteractive"></a>

## setCardInteractive(card, clickable, [cursor])
Aktiviert oder deaktiviert Klickbarkeit und Cursor einer Karte.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| card | <code>HTMLElement</code> |  | Die Karte, deren Interaktion angepasst wird. |
| clickable | <code>boolean</code> |  | Ob die Karte anklickbar sein soll. |
| [cursor] | <code>string</code> | <code>&quot;&#x27;pointer&#x27;&quot;</code> | Angezeigter Cursor bei Klickbarkeit. |

<a name="gameMove"></a>

## gameMove()
Startet den ersten Spielzug, aktiviert Klick- und Drag-Events für Stapel.

**Kind**: global function  
<a name="enableStack1Click"></a>

## enableStack1Click()
Aktiviert den Klick auf dem Ziehstapel, um die oberste Karte zu ziehen.

**Kind**: global function  
<a name="enableStack2Drag"></a>

## enableStack2Drag()
Aktiviert Drag-and-Drop für den Ablagestapel (Mouse & Touch).

**Kind**: global function  
<a name="handleCardDrag"></a>

## handleCardDrag(original, offsetX, offsetY)
Aktiviert Drag & Drop für eine Karte (Mouse & Touch via Pointer Events).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| original | <code>HTMLElement</code> | Die gezogene Karte |
| offsetX | <code>number</code> | Pointer-Offset X |
| offsetY | <code>number</code> | Pointer-Offset Y |


* [handleCardDrag(original, offsetX, offsetY)](#handleCardDrag)
    * [~startDrag(event)](#handleCardDrag..startDrag)
    * [~stopDrag(event)](#handleCardDrag..stopDrag)

<a name="handleCardDrag..startDrag"></a>

### handleCardDrag~startDrag(event)
Bewegt die Klonkarte mit dem Pointer und hebt mögliche Drop-Zonen hervor.

**Kind**: inner method of [<code>handleCardDrag</code>](#handleCardDrag)  

| Param | Type |
| --- | --- |
| event | <code>PointerEvent</code> | 

<a name="handleCardDrag..stopDrag"></a>

### handleCardDrag~stopDrag(event)
Beendet den Drag-Vorgang, führt Swap durch oder setzt Klon zurück.

**Kind**: inner method of [<code>handleCardDrag</code>](#handleCardDrag)  

| Param | Type |
| --- | --- |
| event | <code>PointerEvent</code> | 

<a name="createClone"></a>

## createClone(element, [offsetLeft], [offsetTop]) ⇒ <code>HTMLElement</code>
Erstellt eine optische Kopie (Clone) einer Karte für Drag-Effekt.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - Clone-Element  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | <code>HTMLElement</code> |  | Karte zum Klonen |
| [offsetLeft] | <code>number</code> | <code>15</code> | Linksoffset |
| [offsetTop] | <code>number</code> | <code>9</code> | Obenoffset |

<a name="highlightDropzone"></a>

## highlightDropzone(x, y, playerCards) ⇒ <code>HTMLElement</code> \| <code>null</code>
Hebt Drop-Zonen hervor, über denen die Maus ist.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> \| <code>null</code> - Aktive Dropzone  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | Maus X |
| y | <code>number</code> | Maus Y |
| playerCards | <code>Array.&lt;HTMLElement&gt;</code> | Zielkarten |

<a name="swapCards"></a>

## swapCards(original, targetCard)
Tauscht die Inhalte der gezogenen Karte und Zielkarte.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| original | <code>HTMLElement</code> | Gezogene Karte |
| targetCard | <code>HTMLElement</code> | Zielkarte im Grid |

<a name="resetClone"></a>

## resetClone(clone, original)
Setzt die Klonkarte zurück, wenn kein Drop erfolgt.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| clone | <code>HTMLElement</code> | Clone der Karte |
| original | <code>HTMLElement</code> | Originalkarte |

<a name="refreshPoints"></a>

## refreshPoints(wrapper)
Berechnet die aktuellen Punkte eines Spielers anhand der aufgedeckten Karten

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| wrapper | <code>HTMLElement</code> | Grid-Wrapper des Spielers |

<a name="handleFinishState"></a>

## handleFinishState()
wenn ein Spielzug beendet wird, rotiert das Spielfeld, nächster Spieler beginnt.

**Kind**: global function  
<a name="isFieldComplete"></a>

## isFieldComplete(wrapper) ⇒ <code>boolean</code>
Prüft, ob alle Karten in einem Spielerfeld aufgedeckt sind.

**Kind**: global function  
**Returns**: <code>boolean</code> - True, wenn alle Karten aufgedeckt sind, sonst false.  

| Param | Type | Description |
| --- | --- | --- |
| wrapper | <code>HTMLElement</code> | Das Wrapper-Element des Spielerfeldes. |

<a name="startLastRound"></a>

## startLastRound()
Startet die letzte Runde des Spiels.

**Kind**: global function  
<a name="showLastRoundBanner"></a>

## showLastRoundBanner()
Zeigt Info letzte Runde, dann ist das Spiel vorbei.

**Kind**: global function  
<a name="revealRemainingCards"></a>

## revealRemainingCards()
Deckt alle noch nicht aufgedeckten Karten aller Spieler auf, 
aktualisiert die Punktestände und bestimmt den Gewinner des Spiels.

**Kind**: global function  
<a name="applyFirstPlayerPenalty"></a>

## applyFirstPlayerPenalty()
Prüft, ob der erste Spieler, der die Runde beendet hat, die niedrigste Punktzahl hat,
wenn nicht, dann bekommt er eine Strafe (Punkte werden verdoppelt)

**Kind**: global function  
<a name="checkThreeInColumn"></a>

## checkThreeInColumn(wrapper)
Prüft, ob in ein Speiler in einer Spalte drei gleiche Kartenwerte hat.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| wrapper | <code>HTMLElement</code> | Grid-Wrapper des Spielers |

<a name="highlightColumn"></a>

## highlightColumn(wrapper, column)
Hebt die Spalte hervor, wo drei Kartenwerte gleich sind.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| wrapper | <code>HTMLElement</code> | Grid-Wrapper des Spielers |
| column | <code>number</code> | Spaltenindex |

<a name="animateColumn"></a>

## animateColumn(cards)
Animiert das Entfernen von drei gleichen Karten aus einer Spalte
und verschiebt sie in den Ablagestapel.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| cards | <code>Array.&lt;HTMLElement&gt;</code> | Array von drei Karten, die entfernt werden sollen |

<a name="checkPlayingFieldIsEmpty"></a>

## checkPlayingFieldIsEmpty(wrapper)
Prüft, ob das Grid des Spielers leer ist und startet die letzte Runde.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| wrapper | <code>HTMLElement</code> | Grid-Element eines Spielers |

<a name="isWrapperEmpty"></a>

## isWrapperEmpty(wrapper) ⇒ <code>boolean</code>
Prüft, ob ein Wrapper keine Karten mehr hat.

**Kind**: global function  
**Returns**: <code>boolean</code> - - true, wenn keine Karten mehr vorhanden sind  

| Param | Type | Description |
| --- | --- | --- |
| wrapper | <code>HTMLElement</code> | Das Grid-Element eines Spielers |

<a name="checkEndOfGame"></a>

## checkEndOfGame()
Prüft alle Grids, ob das Spiel beendet ist, und löst ggf. das Endspiel aus.

**Kind**: global function  
<a name="setupGameSettings"></a>

## setupGameSettings()
Initialisiert die Toggle-Icons für Sound und Musik.
Speichert den Status in localStorage und spielt/stoppt Sounds.

**Kind**: global function  
<a name="setupToggles"></a>

## setupToggles()
Initialisiert Sound- und Musik-Toggles, synchronisiert deren Status mit dem localStorage.

**Kind**: global function  
<a name="initializeToggleButton"></a>

## initializeToggleButton(button, key, [onEnable], [onDisable])
Initialisiert einen Toggle-Button (Sound oder Musik).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| button | <code>HTMLButtonElement</code> | Der ursprüngliche Button im DOM. |
| key | <code>string</code> | "Sound" oder "Musik" |
| [onEnable] | <code>function</code> | Funktion, wenn der Toggle aktiviert wird. |
| [onDisable] | <code>function</code> | Funktion, wenn der Toggle deaktiviert wird. |

<a name="showPopUp"></a>

## showPopUp(content, [soundOptions])
Zeigt ein Popup-Fenster an.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>string</code> |  | HTML-Inhalt, der im Popup angezeigt werden soll. |
| [soundOptions] | <code>Object</code> | <code>{}</code> | Optionen für den Sound: |

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [volume] | <code>number</code> | Lautstärke des Sounds (0–1) |
| [delay] | <code>number</code> | Verzögerung vor dem Abspielen des Sounds in ms |

<a name="showStartPopup"></a>

## showStartPopup(player)
Zeigt das Popup an mit dem Startspieler.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>Object</code> | Spieler-Daten |

<a name="showWinPopup"></a>

## showWinPopup()
Zeigt das HighScore-Popup am Ende des Spiels an.

**Kind**: global function  
<a name="loadPlayers"></a>

## loadPlayers() ⇒ <code>Array</code>
Lädt die Spieler aus dem LocalStorage.

**Kind**: global function  
**Returns**: <code>Array</code> - - Spieler  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options.updateTotal] | <code>boolean</code> | <code>false</code> | Addiert Punkte zu totalPoints |
| [options.sort] | <code>boolean</code> | <code>false</code> | Sortiert Spieler nach Punkten (aufsteigend) |

<a name="generateHighscoreHTML"></a>

## generateHighscoreHTML(players, isSettings) ⇒ <code>string</code>
Generiert das HTML für das Highscore-Popup.

**Kind**: global function  
**Returns**: <code>string</code> - HTML-Markup für das Highscore-Popup  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| players | <code>Array.&lt;{name: string, points: number}&gt;</code> |  | Sortierte Spieler mit Punkten |
| isSettings | <code>boolean</code> | <code>false</code> | bei Klick auf Setting-Bereich true, sonst false |

<a name="calculateRanks"></a>

## calculateRanks(players, pointKey) ⇒ <code>Array.&lt;number&gt;</code>
Berechnet die Platzierungen der Spieler basierend auf ihren Punkten.
Gleiche Punktzahlen erhalten den gleichen Rang.

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - - Array der Ränge für jeden Spieler.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| players | <code>Array</code> |  |  |
| pointKey | <code>string</code> | <code>&quot;points&quot;</code> | Punkte oder Gesamtpunkte. |

<a name="setupGameRulesPopup"></a>

## setupGameRulesPopup()
Initialisiert das Popup für die Spielregeln.

**Kind**: global function  
<a name="setupHighScorePopup"></a>

## setupHighScorePopup()
Initialisiert das Popup für die Highscore.

**Kind**: global function  
<a name="setupClickOutside"></a>

## setupClickOutside(popupWrapper, popupContent, triggerElement, type)
Schließt ein Popup, wenn außerhalb des Popup-Inhalts geklickt wird.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| popupWrapper | <code>HTMLElement</code> | Container des Popups |
| popupContent | <code>HTMLElement</code> | Klickbarer Inhalt des Popups |
| triggerElement | <code>HTMLElement</code> | Element, das das Popup geöffnet hat |
| type | <code>string</code> | Typ/Kennung des Popups zur Unterscheidung |

<a name="playSound"></a>

## playSound(sound, [volume], [delay], [playbackRate])
Spielt einen Sound ab, wenn die Soundeinstellungen aktiv sind.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sound | <code>HTMLAudioElement</code> |  | Audio-Objekt |
| [volume] | <code>number</code> | <code>1</code> | Lautstärke (0.0 - 1.0) |
| [delay] | <code>number</code> | <code>0</code> | Verzögerung vor Abspielen in ms |
| [playbackRate] | <code>number</code> | <code>1</code> | Geschwindigkeit des Sounds |

<a name="resetCards"></a>

## resetCards()
Setzt alle Karten zurück und löscht Spielerinformationen.

**Kind**: global function  
<a name="openPaperRoll"></a>

## openPaperRoll(content, isSettings, isPlayerForm, triggerBtn)
Öffnet die Paper-Roll mit Inhalt.
Fügt automatisch einen Close-Button hinzu.
Start-Button wird kurz deaktiviert.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| content | <code>string</code> |  | HTML Inhalt, der angezeigt wird |
| isSettings | <code>boolean</code> | <code>false</code> | true: initBackgroundCarousel & MusicToggle aufrufen |
| isPlayerForm | <code>boolean</code> | <code>false</code> | true: Player-Formular initialisieren |
| triggerBtn | <code>HTMLElement</code> | <code></code> | jeweilige Button, der geklickt wird |

<a name="closePaperRoll"></a>

## closePaperRoll()
Schließt die Paper-Roll und aktiviert den Start-Button wieder.

**Kind**: global function  
<a name="resetPlayers"></a>

## resetPlayers(newNum)
Löscht alte Spieler- und Gegnerdaten aus dem LocalStorage, wenn Anzahl Gegner sich ändert und speichert die neue Anzahl..

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| newNum | <code>number</code> | Neue Anzahl der Gegner |

<a name="initPlayers"></a>

## initPlayers(newNum)
Initialisiert Standardwerte für den Spieler und die Gegner im LocalStorage, wenn nichts existiert.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| newNum | <code>number</code> | Anzahl der Gegner |

<a name="setupAvatarSelect"></a>

## setupAvatarSelect()
Öffnet die Avatar-Auswahl für den jeweiligen Spieler.

**Kind**: global function  
<a name="showAvatarPicker"></a>

## showAvatarPicker(playerIndex) ⇒ <code>void</code>
Öffnet das Avatar-Auswahl-Submenu für einen Spieler und ermöglicht Auswahl.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| playerIndex | <code>number</code> | Index des Spielers, dessen Avatar gewählt wird. |

<a name="renderAvatarMenu"></a>

## renderAvatarMenu(form, playerIndex)
Rendert das HTML für das Avatar-Auswahlmenü eines Spielers.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| form | <code>HTMLElement</code> | Container des Player-Formulars |
| playerIndex | <code>number</code> | Index des Spielers, dessen Avatar gewählt wird |

<a name="adjustThreePlayersLayout"></a>

## adjustThreePlayersLayout(form, container)
Passt Layout für drei Spieler an.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| form | <code>HTMLElement</code> | Player-Formular |
| container | <code>HTMLElement</code> | Container für das Drei-Spieler-Layout |

<a name="setupAvatarClick"></a>

## setupAvatarClick(avatars, playerIndex)
Bindet Klick-Events auf alle Avatar-Bilder und speichert die Auswahl.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| avatars | <code>Array.&lt;HTMLImageElement&gt;</code> | Alle Avatar-Bilder |
| playerIndex | <code>number</code> | Index des Spielers, dessen Avatar gewählt wird |

<a name="restorePlayerForm"></a>

## restorePlayerForm(form, prevContent, inputValues, submitBtn, threePlayers)
Stellt das ursprüngliche Player-Formular wieder her und initialisiert Events.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| form | <code>HTMLElement</code> | Player-Formular |
| prevContent | <code>string</code> | HTML-Inhalt vor dem Avatar-Menü |
| inputValues | <code>Array.&lt;string&gt;</code> | Gesicherte Werte der Inputfelder |
| submitBtn | <code>HTMLElement</code> | Submit-Button |
| threePlayers | <code>HTMLElement</code> | Container für Drei-Spieler-Layout |

<a name="handlePlayerFormSubmit"></a>

## handlePlayerFormSubmit()
Bindet den Submit-Button des Spielerformulars.
Speichert die Werte und schließt die Paper-Roll. Verhindert doppelte Listener (bound).

**Kind**: global function  
<a name="applyPlayerDefaults"></a>

## applyPlayerDefaults()
Wendet Standardwerte für Spieler und Gegner an, falls keine Daten vorhanden sind.

**Kind**: global function  
<a name="validateInputs"></a>

## validateInputs(inputElements)
Validiert Inputfelder: erlaubt nur Buchstaben und Bindestriche.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| inputElements | <code>Array.&lt;HTMLInputElement&gt;</code> | Inputfelder |

<a name="restorePlayerFormData"></a>

## restorePlayerFormData()
Stellt gespeicherte Spieler- und Gegnerdaten im Formular wieder her. Inputs leeren, wenn Standardwerte.

**Kind**: global function  
<a name="markSelectedAvatar"></a>

## markSelectedAvatar(avatarBtns, selectedSrc)
Markiert einen gewählten Avatar und dimmt die anderen.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| avatarBtns | <code>NodeList</code> \| <code>Array.&lt;HTMLElement&gt;</code> | Alle Avatare im Formular |
| selectedSrc | <code>string</code> | URL des gewählten Avatars |

<a name="showSelectedAvatarInPlayerForm"></a>

## showSelectedAvatarInPlayerForm(form)
Setzt das gewählte Avatar-Bild in Formular, bei Deselektierung Default-Image (upload-image.png).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| form | <code>HTMLElement</code> | Das jeweilige Player-Formular |

<a name="initToggle"></a>

## initToggle(toggleId, storageKey, onEnable, onDisable)
Initialisiert einen Toggle für Sound oder Musik.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| toggleId | <code>string</code> | ID des Checkbox-Elements |
| storageKey | <code>string</code> | Key für localStorage ('sound' oder 'music') |
| onEnable | <code>function</code> | Funktion, die aufgerufen wird, wenn aktiviert |
| onDisable | <code>function</code> | Funktion, die aufgerufen wird, wenn deaktiviert |

<a name="playMusic"></a>

## playMusic()
Startet Hintergrundmusik, falls Element vorhanden.

**Kind**: global function  
<a name="stopMusic"></a>

## stopMusic()
Stoppt Musik und setzt Zeit auf 0

**Kind**: global function  
<a name="initBackgroundCarousel"></a>

## initBackgroundCarousel()
Initialisiert das 3D Carousel für Hintergrundbilder.
Passt Größe an Bildschirmbreite an.

**Kind**: global function  
<a name="setBackgroundName"></a>

## setBackgroundName(index)
Setzt den Screenreader‑Text für den aktuell ausgewählten Hintergrund.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | Index des ausgewählten Hintergrund vom Array backgroundNames |

<a name="updateCells"></a>

## updateCells(images, selectedIndex, theta, radius, rotateFn)
Aktualisiert Position und Opazität aller Carousel-Bilder.
Das vorderste Bild (selectedIndex) wird hervorgehoben, alle anderen leicht transparent.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| images | <code>NodeList</code> | Alle Carousel-Bilder |
| selectedIndex | <code>number</code> | Index des aktuell ausgewählten Bildes |
| theta | <code>number</code> | Winkel zwischen den Bildern |
| radius | <code>number</code> | Radius des 3D-Karussells |
| rotateFn | <code>string</code> | Rotationsfunktion (z.B. 'rotateY') |

<a name="rotateCarousel"></a>

## rotateCarousel(carousel, images, selectedIndex, theta, radius, rotateFn)
Dreht das gesamte Carousel auf das aktuell ausgewählte Bild.
Ruft updateCells auf und speichert die Auswahl in localStorage.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| carousel | <code>HTMLElement</code> | Das Carousel-Container-Element |
| images | <code>NodeList</code> | Alle Carousel-Bilder |
| selectedIndex | <code>number</code> | Index des aktuell ausgewählten Bildes |
| theta | <code>number</code> | Winkel zwischen den Bildern |
| radius | <code>number</code> | Radius des 3D-Karussells |
| rotateFn | <code>string</code> | Rotationsfunktion |

<a name="resetGame"></a>

## resetGame(isRestart)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| isRestart | <code>boolean</code> | gibt true bei Neustart des Spiels, sonst default false |

<a name="clearGameDOM"></a>

## clearGameDOM()
Entfernt alle Karten aus dem DOM

**Kind**: global function  
<a name="resetRotationWrapper"></a>

## resetRotationWrapper()
Setzt den Rotation-Wrapper zurück.

**Kind**: global function  
<a name="resetLocalStorage"></a>

## resetLocalStorage()
Löscht Spieler-Informationen aus localStorage.

**Kind**: global function  
<a name="showGameScreen"></a>

## showGameScreen(isRestart)
Zeigt den Spielbildschirm und initialisiert Spieler und Deck.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| isRestart | <code>boolean</code> | gibt true bei Neustart des Spiels, sonst default false |

<a name="updateRound"></a>

## updateRound(increase) ⇒ <code>number</code>
Zeigt die Rundenanzahl an

**Kind**: global function  
**Returns**: <code>number</code> - - die aktuelle Runde  

| Param | Type | Description |
| --- | --- | --- |
| increase | <code>boolean</code> | true bei Restart, sonst default false |

<a name="setBackground"></a>

## setBackground()
Setzt den Hintergrund abhängig von der Auswahl.

**Kind**: global function  
<a name="setSoundMusicIcons"></a>

## setSoundMusicIcons()
Setzt die Icons für Sound und Musik anhand des LocalStorage-Status.

**Kind**: global function  
<a name="createPlayers"></a>

## createPlayers()
Erstellt Spieler- und Gegner-Container und fügt sie dem Rotation-Wrapper hinzu.

**Kind**: global function  
<a name="createContainer"></a>

## createContainer(type, index) ⇒ <code>HTMLElement</code>
Erstellt einen Container für Spieler oder Gegner inklusive Spielerinfos und Raster.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - Container mit Raster und Spielerinformationen  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | "player" oder "opponent" |
| index | <code>number</code> | <code>0</code> | Index des Gegners (ab 0) |

<a name="createPlayerGridWrapper"></a>

## createPlayerGridWrapper(name, id, imageUrl) ⇒ <code>HTMLElement</code>
Erstellt die Spielerinfo mit Bild, Name und Punkteanzeige.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - Spielerinfo-Container  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | Name des Spielers |
| id | <code>string</code> | ID des Containers (player, opponent) |
| imageUrl | <code>string</code> | URL für das Spielerbild |

<a name="createProfileImage"></a>

## createProfileImage(container, imageUrl)
Erstellt ein Profilbild-Element und fügt es in ein Container-Element ein.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>HTMLElement</code> | Das HTML-Element, in das das Profilbild eingefügt wird. |
| imageUrl | <code>string</code> | Die URL des anzuzeigenden Profilbildes. |

<a name="createUserName"></a>

## createUserName(container, name)
Erstellt ein Namens-Element und fügt es in ein Container-Element ein.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>HTMLElement</code> | Das HTML-Element, in das der Spielername eingefügt wird. |
| name | <code>string</code> | Der anzuzeigende Spielername. |

<a name="createPointsInfo"></a>

## createPointsInfo(container)
Fügt ein Punktefeld in den Container ein.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| container | <code>HTMLElement</code> | Container, in dem die Punkte angezeigt werden |

<a name="createGrid"></a>

## createGrid(id, className) ⇒ <code>HTMLElement</code>
Erstellt ein Raster mit 12 Kartenfeldern.

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - Raster mit Kartenfeldern  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | Basis-ID für die Kartenfelder |
| className | <code>string</code> | CSS-Klasse für das Raster |

<a name="createDeck"></a>

## createDeck() ⇒ <code>Array</code>
Erstellt ein Kartendeck aus skyjoCards-Objekten.

**Kind**: global function  
**Returns**: <code>Array</code> - Gemischtes Deck  
<a name="shuffle"></a>

## shuffle(array)
Mischt die Karten durch

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| array | <code>Array</code> | Karten |

<a name="createStacks"></a>

## createStacks(deck) ⇒ <code>Object</code>
Teilt das Deck in drei Stacks: Hauptstapel (stack1) und aktuelle Karte (stack2)

**Kind**: global function  
**Returns**: <code>Object</code> - Stacks  

| Param | Type | Description |
| --- | --- | --- |
| deck | <code>Array</code> | Gemischtes Deck |

<a name="placeStacks"></a>

## placeStacks(stack1)
Platziert den Ziehstapel auf dem Spielbildschirm.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stack1 | <code>Object</code> | Ziehspapelkarten |

<a name="createCardElement"></a>

## createCardElement(card, width, borderRadius) ⇒ <code>HTMLElement</code>
Erstellt Kartenelement mit Vorder- und Rückseite

**Kind**: global function  
**Returns**: <code>HTMLElement</code> - - Karten-Element  

| Param | Type | Description |
| --- | --- | --- |
| card | <code>Object</code> | Kartenobjekt |
| width | <code>number</code> | Breite der Karte |
| borderRadius | <code>string</code> | Border-Radius |

<a name="createCardWrapper"></a>

## createCardWrapper(card, width, borderRadius) ⇒ <code>HTMLDivElement</code>
Erstellt den äußeren Wrapper einer Karte.

**Kind**: global function  
**Returns**: <code>HTMLDivElement</code> - - Karten-Wrapper  

| Param | Type | Description |
| --- | --- | --- |
| card | <code>Object</code> | Kartenobjekt mit Metadaten |
| width | <code>number</code> | Breite der Karte in Pixeln |
| borderRadius | <code>string</code> | CSS Border-Radius |

<a name="createCardInner"></a>

## createCardInner() ⇒ <code>HTMLDivElement</code>
Erstellt den inneren Flip-Container der Karte.

**Kind**: global function  
**Returns**: <code>HTMLDivElement</code> - - Innerer Karten-Container  
<a name="createCardFace"></a>

## createCardFace(src, alt, borderRadius, [extraStyles]) ⇒ <code>HTMLImageElement</code>
Erstellt eine einzelne Kartenfläche (Vorder- oder Rückseite).

**Kind**: global function  
**Returns**: <code>HTMLImageElement</code> - - Kartenfläche  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> |  | Bildquelle (URL oder Data-URL) |
| alt | <code>string</code> |  | Alt-Text für das Bild |
| borderRadius | <code>string</code> |  | Border-Radius |
| [extraStyles] | <code>Object</code> | <code>{}</code> | Zusätzliche Inline-Styles |

<a name="generateCardImage"></a>

## generateCardImage(card, width, height) ⇒ <code>string</code>
Erzeugt ein dynamisches Bild für eine Karte über ein Canvas.

**Kind**: global function  
**Returns**: <code>string</code> - Data-URL des generierten Kartenbildes  

| Param | Type | Description |
| --- | --- | --- |
| card | <code>Object</code> | Objekt mit Karteninformationen |
| width | <code>number</code> | Breite der Karte |
| height | <code>number</code> | Höhe der Karte |

<a name="animateDeal"></a>

## animateDeal(players)
Startet die Karten-Austeil-Animation für alle Spieler.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| players | <code>Array</code> | Array aus Spieler- und Gegner-Rastern |

<a name="afterDeal"></a>

## afterDeal(delayMs)
Stoppt den Deal-Sound nach der angegebenen Zeit.
Startet das Spiel.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| delayMs | <code>number</code> | Dauer in Millisekunden |

<a name="incrementStep"></a>

## incrementStep()
Erhöht `currentStep` um 1 und fährt mit dem nächsten Spieler fort.

**Kind**: global function  
<a name="setTurnState"></a>

## setTurnState(state)
Setzt den aktuellen Spielzustand.
- 'INIT'   : Spiel wird aufgbaut, alle Karten deaktiviert
- 'SELECT' : Auswahl wer das Spiel beginnt
- 'START'  : Spieler beginnt das Spiel
- 'DECIDE' : Spieler hat Zugmöglichkeiten
- 'FINISH' : 1. Spielzug fertig, alle Karten deaktiviert

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>&#x27;INIT&#x27;</code> \| <code>&#x27;SELECT&#x27;</code> \| <code>&#x27;START&#x27;</code> \| <code>&#x27;FINISH&#x27;</code> | Spielzustand |

<a name="dealToPlayer"></a>

## dealToPlayer(player, pIndex, fieldWidth, deckRect, startWidth, borderRadius, cardsPerPlayer)
Teilt einem Spieler seine Karten aus und startet die Animation jeder Karte.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>HTMLElement</code> | Raster des Spielers |
| pIndex | <code>number</code> | Index des Spielers |
| fieldWidth | <code>number</code> | Breite der Kartenfelder |
| deckRect | <code>DOMRect</code> | Position des Decks |
| startWidth | <code>number</code> | Startbreite der Karte |
| borderRadius | <code>string</code> | Rundung der Karten |
| cardsPerPlayer | <code>number</code> | Anzahl Karten pro Spieler |

<a name="positionCardAtDeck"></a>

## positionCardAtDeck(cardEl, deckRect, index)
Positioniert die Karte am Deck vor dem Start der Animation.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| cardEl | <code>HTMLElement</code> | Kartenelement |
| deckRect | <code>DOMRect</code> | Position des Decks |
| index | <code>number</code> | Index der Karte (für zIndex) |

<a name="animateSingleCard"></a>

## animateSingleCard(cardEl, player, index, fieldWidth, deckRect)
Animiert eine einzelne Karte vom Deck zum Spielerfeld.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| cardEl | <code>HTMLElement</code> | Kartenelement |
| player | <code>HTMLElement</code> | Raster des Spielers |
| index | <code>number</code> | Index des Kartenfeldes |
| fieldWidth | <code>number</code> | Breite des Zielkartenfeldes |
| deckRect | <code>DOMRect</code> | Position des Decks |

<a name="playDealSound"></a>

## playDealSound()
Spielt den Sound des Kartenausteilens einmalig ab, solange er noch nicht läuft.

**Kind**: global function  
<a name="stopDealSound"></a>

## stopDealSound()
Stoppt den Deal-Sound, setzt Position zurück und deaktiviert Loop.

**Kind**: global function  
<a name="finalizeCardPlacement"></a>

## finalizeCardPlacement(cardEl, field, widthValue)
Platziert die Karte dauerhaft auf dem Spielerfeld und setzt Stil zurück.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| cardEl | <code>HTMLElement</code> | Kartenelement |
| field | <code>HTMLElement</code> | Zielkartenfeld |
| widthValue | <code>number</code> | Breite der Karte |

<a name="resizeAllCards"></a>

## resizeAllCards()
Passt die Größe aller Karten initial und bei windows resize an ihre jeweiligen Kartenfelder an.

**Kind**: global function  
<a name="positionPlayersInRotationWrapper"></a>

## positionPlayersInRotationWrapper()
Positioniert alle Spieler gleichmäßig im Kreis innerhalb des Rotation-Wrappers.

**Kind**: global function  
<a name="calculatePositionOnEllipse"></a>

## calculatePositionOnEllipse(angle, radiusX, radiusY, center) ⇒ <code>Object</code>
Berechnet die x- und y-Position eines Punktes auf einer Ellipse anhand eines Winkels.

**Kind**: global function  
**Returns**: <code>Object</code> - Berechnete Position auf der Ellipse.  

| Param | Type | Description |
| --- | --- | --- |
| angle | <code>number</code> | Winkel in Grad, gemessen von der Ellipsenmitte. |
| radiusX | <code>number</code> | Horizontaler Radius der Ellipse. |
| radiusY | <code>number</code> | Vertikaler Radius der Ellipse. |
| center | <code>Object</code> | Mittelpunkt der Ellipse. |

<a name="calculatePlayerAngles"></a>

## calculatePlayerAngles(count) ⇒ <code>Array.&lt;number&gt;</code>
Berechnet die Winkel für jeden Spieler abhängig von der Spielerzahl.

**Kind**: global function  
**Returns**: <code>Array.&lt;number&gt;</code> - Winkel in Grad  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>number</code> | Anzahl Spieler |

<a name="applyPlayerPosition"></a>

## applyPlayerPosition(player, pos, angle)
Setzt die Position, Rotation und CSS-Klassen eines Spielers.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>HTMLElement</code> | Spieler-Container |
| pos | <code>Object</code> | Position auf dem Kreis |
| angle | <code>number</code> | Basiswinkel |

<a name="rotatePlayers"></a>

## rotatePlayers(step)
Dreht den Spieler-Wrapper und alle Spieler-Container um einen Schritt.
Berechnet die Rotation für jeden Spieler und passt deren Layout entsprechend an.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| step | <code>number</code> | Anzahl der Rotationsschritte (z. B. +1 = eine Position im Kreis weiter) |

<a name="rotateWrapper"></a>

## rotateWrapper(degrees)
Dreht den gesamten Spieler-Wrapper.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| degrees | <code>number</code> | Drehung in Grad |

<a name="rotatePlayer"></a>

## rotatePlayer(player, wrapperRotation)
Dreht einen einzelnen Spieler entgegen der Wrapper-Drehung
und passt die CSS-Klassen für bottom/top sowie das Grid-Layout an.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>HTMLElement</code> | Spieler-Container (.grid-wrapper) |
| wrapperRotation | <code>number</code> | Rotation des Wrappers in Grad |

<a name="adjustGrid"></a>

## adjustGrid(grid, isBottom)
Passt die Breite der Karten und den Abstand (Gap) innerhalb eines Grids an,
abhängig davon, ob der Spieler unten sitzt und von der Fensterhöhe.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| grid | <code>HTMLElement</code> | Grid-Container der Karten (.player-grid oder .opponent-grid) |
| isBottom | <code>boolean</code> | true, wenn der Spieler unten sitzt, sonst false |

