//_________________________________________________declarations des objets Armes
const gun = new Armes("gun", 10, 0, 0, "../img/Gun.png", true);
const lazer = new Armes("lazer", 20, 0, 0, "../img/Lazer.png", false);
const chemical = new Armes("chemical", 40, 0, 0, "../img/Chemical.png", false);
const nuclear = new Armes("nuclear", 50, 0, 0, "../img/Nuclear.png", false);

//_________________________________________________ déclarations des Perso
let alien = new Perso("alien", 100, 10, gun, 0, "../img/alien.png", false, 0);
let predator = new Perso("predator", 100, 10, gun, 0, "../img/predator.png", false, 0);

//_________________________________________________déclaration du compteur de tour
let compteurDeTour = 0;

// console.log(alien.decrirePerso());
// console.log(predator.decrirePerso());
// console.log(gun.decrireArmes());
// console.log(lazer.decrireArmes());
// console.log(chemical.decrireArmes());
// console.log(nuclear.decrireArmes());

//_________________________________________________appel de la carte
let map = new Board(10, 10);
//_________________________________________________initialisation du status du perso
let actif = null;
//_________________________________________________fonction aléatoire
function rndNbInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//_________________________________________________quel joueur commence en 1er
function quiCommence() {
    if (this.rndNbInRange(0, 2) == 0) {
        actif = alien;
        alien.initQuiCommence();
        console.log(alien.nom + " commence");
    } else {
        actif = predator;
        predator.initQuiCommence();
        console.log(predator.nom + " commence");
    }
//_________________________________________________Affichage dans la page des infos des perso
    predator.affichePerso();
    alien.affichePerso();
    mouvementPerso();
};
//_________________________________________________appel de la fonction quiCommence();
quiCommence();
//_________________________________________________Mouvement des personnages assigné au clavier
function mouvementPerso() {
    // Ecouter les saisies clavier.
    window.addEventListener('keydown', evt => {
        console.log(evt);
        let { y, x } = map.locatePlayer(actif);
        let newY = y;
        let oldY = y;
        let newX = x;
        let oldX = x;

        //_________________________________________________Modifie les coordonnées x,y en fonction de la flèche pressée.
        if (evt.key === 'ArrowUp') newY--;
        else if (evt.key === 'ArrowRight') newX++;
        else if (evt.key === 'ArrowDown') newY++;
        else if (evt.key === 'ArrowLeft') newX--;

        //_________________________________________________ mise à jour de la position du pion.
        let movePossible = map.availablePosition(newY, newX);
        if (movePossible) {
            let weapon = map.availableWeapon(newY, newX)
            console.log(weapon);
            if (weapon != null) setWeapon(weapon, newY, newX);
            map.movePlayer(actif, newY, newX, oldY, oldX);
            
            let attackPossible = map.nextToPlayer(newY, newX)

            //_________________________________________________les joueurs sont sur des cases adjacentes, c'est la bagarre!
            if (attackPossible) {
                console.log("attack is possible");
                document.getElementById("alienOuPredator").textContent = actif.name;
                let overlay1Elt = document.getElementById("overlay1");
                overlay1Elt.style.display = "block";
                let boutonDefendre = document.getElementsByClassName("defendre")[1];
                let boutonAttaquer = document.getElementsByClassName("attaquer")[1];
                //__________________________________________________attaque
                boutonAttaquer.onclick = function () {
                    overlay1Elt.style.display = "none";
                    console.log("fayyyaaa!!");
                    //__________________________________________________ alien attaque & defense
                    if (actif == alien) {
                        console.log(alien.nom +" attaque");
                        // if (alien.defending){
                        //     alien.defending = false;
                        // }
                        document.getElementById("alienOuPredator").textContent = predator.nom;
                        if (alien.arme == gun) {
                            alien.degat = gun.degatArme;
                        } if (alien.arme == lazer) {
                            alien.degat = lazer.degatArme;
                        } if (alien.arme == chemical) {
                            alien.degat = chemical.degatArme;
                        } if (alien.arme == nuclear) {
                            alien.degat = nuclear.degatArme;
                        }
                        // Défense predator
                        if (predator.defending){
                            alien.degat = alien.degat/2;
                        }
                        predator.sante = predator.sante - alien.degat;
                        if (predator.defending){
                            predator.defending = false;
                        }
                        actif.affichePerso();
                        changeFighter();

                    } if (actif == predator) {
                        // if (predator.defending){
                        //     predator.defending = false;
                        // }
                        //__________________________________________________ predator attaque & defense
                        console.log(predator.nom + " attaque");
                        document.getElementById("alienOuPredator").textContent = alien.nom;
                        if (predator.arme == gun) {
                            predator.degat = gun.degatArme
                        } if (predator.arme == lazer) {
                            predator.degat = lazer.degatArme;
                        } if (predator.arme == chemical) {
                            predator.degat = chemical.degatArme
                        } if (predator.arme == nuclear) {
                            predator.degat = nuclear.degatArme;
                        } 
                        if (alien.defending){
                            predator.degat = predator.degat/2;
                        }
                        alien.sante = alien.sante - predator.degat;
                        if (predator.defending){
                            predator.defending = false;
                        }
                        actif.affichePerso();
                        changeFighter();

                    };
                    console.log("sante alien : " + alien.sante + ", arme alien : " + alien.arme.nom +
                        " sante predator : " + predator.sante + ", arme predator " + predator.arme.nom);
                }
                //__________________________________________________Defense
                boutonDefendre.onclick = function () {
                    overlay1Elt.style.display = "none";
                    //__________________________________________________Défense Alien
                    if (actif == alien) {
                        console.log("alien défend");
                        alien.defending = true;
                    
                     } if (actif == predator) {
                         console.log("predator défend");
                        predator.defending = true;

                    };
                    changeFighter();
                }
            }
            compteurDeTour++;
            if (compteurDeTour == 3) changePlayer();
        }
    }, false);
}
//_________________________________________________Fonction gérrant les changements de joueurs pdt la pahse des deplacements
function changePlayer() {
    if (actif == alien) {
        actif = predator;
        actif.currentPlayer();

    } else if (actif == predator) {
        actif = alien;
        actif.currentPlayer();
    }
    compteurDeTour = 0;
    // actif = alien;
    
    }

//_________________________________________________Fonction gérant les changements d'armes
function setWeapon(weapon) {
    actif.armeLache = actif.arme;
    actif.arme = weapon;
    actif.affichePerso();
}
//_________________________________________________Changement de joueur durant le combat & vainqueur
function changeFighter() {
    if (predator.sante <= 0) {
        overlayWin.style.display = "block";
        document.getElementById("vainqueur").textContent = alien.nom;
        let boutonRecommencer = document.getElementsByClassName("recommencer")[1];
        boutonRecommencer.onclick = function () {
            location.reload();
        }
    } if (alien.sante <= 0) {
        overlayWin.style.display = "block";
        document.getElementById("vainqueur").textContent = predator.nom;
        let boutonRecommencer = document.getElementsByClassName("recommencer")[1];
        boutonRecommencer.onclick = function () {
            location.reload();
        }
    } else {
        console.log("changement de joueur");
        if (actif == alien) {
            document.getElementById("player1Or2").textContent = predator.nom;
           alien.showCurrentFighter();
        } else if (actif == predator) {
            document.getElementById("player1Or2").textContent = alien.nom;
           predator.showCurrentFighter();
        }
        let overlay2Elt = document.getElementById("overlay2");
        overlay2Elt.style.display = "block";
        let boutonClose = document.getElementsByClassName("btn_close")[1];
        boutonClose.onclick = function () {
            overlay2Elt.style.display = "none";
            changePlayer();
            let overlay1Elt = document.getElementById("overlay1");
            overlay1Elt.style.display = "block";
        }
    }
}

