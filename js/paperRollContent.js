export const paperRollContent = {
      "SPIELREGELN": /*html*/`
            <div class="paper-roll-header">Skyjo – Spielregeln</div>
            <p><strong>Ziel:</strong> Sammle Karten, um am Ende möglichst wenige Punkte zu haben. Wer zuerst 100 Punkte oder mehr erreicht, beendet das Spiel; gewonnen hat der Spieler mit den wenigsten Punkten.</p>
            <p><strong>Vorbereitung:</strong> Jeder Spieler erhält 12 Karten, die verdeckt in einem 3x4-Rechteck vor ihm liegen. Jeder deckt zu Beginn 2 Karten auf. Die restlichen Karten bilden den Nachziehstapel in der Mitte. Der Spieler mit den meisten Punkten auf seinen aufgedeckten Karten beginnt.</p>
            <p><strong>Ablauf pro Zug:</strong></p>
            <ul>
            <li>Ziehen einer Karte: vom Nachzieh- oder Ablagestapel.</li>
            <li>Karte vom Nachziehstapel: ansehen, entscheiden → tauschen oder ablegen.</li>
            <li>Karte vom Ablagestapel: muss getauscht werden.</li>
            <li>Tauschen: Eine Karte (verdeckt oder offen) wird gegen die gezogene Karte ersetzt. Die getauschte Karte kommt auf den Ablagestapel.</li>
            <li>Kein Tausch: gezogene Karte auf Ablagestapel, eine verdeckte Karte aufdecken.</li>
            </ul>
            <p><strong>Sonderregel – Drillinge:</strong> Drei gleiche Zahlen in einer Spalte müssen auf den Ablagestapel gelegt werden, auch in der letzten Runde. Stern-Karten zählen am Ende als die Zahl, die sie ersetzen.</p>
            <p><strong>Rundenende:</strong> Sobald ein Spieler alle Karten aufgedeckt hat, ist die Runde zuende. Alle anderen Spieler dürfen noch einen Zug machen. Dann werden die Punkte aller Karten addiert. Wer die Runde beendet, sollte die geringste Punktzahl haben, sonst wird sie verdoppelt.</p>
            <p><strong>Spielende:</strong> Nach jeder Runde werden Punkte aufaddiert. Sobald ein Spieler 100 Punkte erreicht, endet das Spiel. Gewinner ist der Spieler mit den wenigsten Punkten.</p>
            <p><strong>Tipps:</strong> 
            <ul>
                  <li>Sammle gleiche Karten, um Reihen abzuräumen.</li>
                  <li>Behalte die Mitspieler im Blick und lege ihnen hohe Karten hin.</li>
                  <li>Überlege, wann du das Spiel beendest – manchmal lohnt es sich, noch einen Zug zu optimieren.</li>
            </ul>
            </p>
            <p>Skyjo ist einfach zu lernen, macht Spaß für Jung und Alt und bietet bei jeder Runde neue Taktiken und Überraschungen 😺🏆</p>`,
      "EINSTELLUNGEN": /*html*/`
            <div class="settings">
                  <div class="settings-option">
                        <span class="settings-label">SOUND</span>
                        <label class="settings-toggle">
                              <input type="checkbox" id="soundToggle">
                              <span class="settings-slider"></span>
                        </label>
                  </div>
                  <div class="settings-option">
                        <span class="settings-label">MUSIK</span>
                        <label class="settings-toggle">
                              <input type="checkbox" id="musicToggle">
                              <span class="settings-slider"></span>
                        </label>
                  </div>
                  <div class="settings-background">
                        <span class="settings-label">HINTERGRUND</span>
                        <img class="prev-btn" src="/assets/img/arrow.png" alt="Prev">
                        <div class="scene">
                              <div class="carousel">
                                    <img src="/assets/img/bg0.png" class="carousel-image">
                                    <img src="/assets/img/bg1.png" class="carousel-image">
                                    <img src="/assets/img/bg2.png" class="carousel-image">
                                    <img src="/assets/img/bg3.png" class="carousel-image">
                                    <img src="/assets/img/bg4.png" class="carousel-image">
                                    <img src="/assets/img/bg5.png" class="carousel-image">
                              </div>
                        </div>
                        <img class="next-btn" src="/assets/img/arrow.png" alt="Next">
                  </div>
            </div>`,
      "2 SPIELER": /*html*/`
            <div class="player-form">
                  <div class="player-field">
                        <label for="player1-name">SPIELER 1 – NAME:</label>
                        <input type="text" id="player1-name" name="player1" autocomplete="off">
                        <img class="upload-image" src="/assets/img/upload-image.png" alt="Upload></img>
                  </div>
                  <div class="player-field">
                        <label for="player2-name">SPIELER 2 – NAME:</label>
                        <input type="text" id="player2-name" name="player2" autocomplete="off">
                  </div>    
            </div>
            <button class="submit-player-btn">SPEICHERN</button>`,
      "3 SPIELER": /*html*/`
            <div class="player-form">
                  <div class="player-field">
                        <label for="player1-name">SPIELER 1 – NAME:</label>
                        <input type="text" id="player1-name" name="player1" autocomplete="off">
                  </div>
                  <div class="player-field">
                        <label for="player2-name">SPIELER 2 – NAME:</label>
                        <input type="text" id="player2-name" name="player2" autocomplete="off">
                  </div>
                  <div class="player-field">
                        <label for="player3-name">SPIELER 3 – NAME:</label>
                        <input type="text" id="player3-name" name="player3" autocomplete="off">
                  </div> 
                  <button class="submit-player-btn submit-btn-3">SPEICHERN</button>
            </div>`
};