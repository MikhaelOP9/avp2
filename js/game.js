class Game {
    constructor (){
        //_______________________________appel de la carte
        this.actif = null;
        this.compteurDeTour = 0;
        this.gun = new Armes("gun", 10, 0, 0, "../img/Gun.png", true);
        this.lazer = new Armes("lazer", 20, 0, 0, "../img/Lazer.png", false);
        this.chemical = new Armes("chemical", 40, 0, 0, "../img/Chemical.png", false);
        this.nuclear = new Armes("nuclear", 50, 0, 0, "../img/Nuclear.png", false);
        this.alien = new Perso("alien", 100, 10, this.gun, 0, "../img/alien.png", false, 0, this.actif);
        this.predator = new Perso("predator", 100, 10, this.gun, 0, "../img/predator.png", false, 0, this.actif);
        this.map = new Board(this.lazer, this.gun, this.nuclear, this.chemical, this.alien, this.predator);
        this.map.displayMap();
        this.predator.affichePerso();
        this.alien.affichePerso();
    }
    //_______________________________fonction aléatoire
    rndNbInRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    //_______________________________quel joueur commence en 1er
    quiCommence() {
        if (this.rndNbInRange(0, 2) == 0) {
            this.actif = this.alien;
            this.alien.initQuiCommence();
            console.log(this.alien.nom + " commence");
        } else {
        this.actif = this.predator;
        this.predator.initQuiCommence();
        console.log(this.predator.nom + " commence");
    }
};
//_______________________________Mouvement des personnages assigné au clavier
async mouvementPerso(){
    //_______________________________Ecouter les saisies clavier.
    window.addEventListener('keydown',async evt => {
        let { y, x } = this.map.locatePlayer(this.actif);
        let newY = y;
        let oldY = y;
        let newX = x;
        let oldX = x;
        //_______________________________Modifie les coordonnées x,y en fonction de la flèche pressée.
        if (evt.key === 'ArrowUp') newY--;
        else if (evt.key === 'ArrowRight') newX++;
        else if (evt.key === 'ArrowDown') newY++;
        else if (evt.key === 'ArrowLeft') newX--;

        //_______________________________mise à jour de la position du pion.
        let movePossible = this.map.availablePosition(newY, newX);
        if (movePossible) {
            let weapon = this.map.availableWeapon(newY, newX)
            if (weapon != null) this.setWeapon(weapon, newY, newX);
            this.map.movePlayer(this.actif, newY, newX, oldY, oldX);
            this.attackIsPossible(newY, newX);
            this.compteurDeTour++;
            if (this.compteurDeTour == 3) this.changePlayer();
        }
    }, false);
}
//_______________________________attaque ou défense
promptActionFromPlayer(){
    return new Promise((resolve, reject) => { 
        console.log("attack is possible");
        document.getElementById("alienOuPredator").textContent = this.actif.nom;
        let overlay1Elt = document.getElementById("overlay1");
        overlay1Elt.style.display = "block";
        let boutonDefendre = document.getElementsByClassName("defendre")[1];
        let boutonAttaquer = document.getElementsByClassName("attaquer")[1];
        //_______________________________attaque
        boutonAttaquer.onclick = function () {
            overlay1Elt.style.display = "none";
            //_______________________________alien attaque & defense
            if (this.actif == this.alien) {
                document.getElementById("alienOuPredator").textContent = this.predator.nom;
                if (this.alien.arme == this.gun) {
                    this.alien.degat = this.gun.degatArme;
                } if (this.alien.arme == this.lazer) {
                    this.alien.degat = this.lazer.degatArme;
                } if (this.alien.arme == this.chemical) {
                    this.alien.degat = this.chemical.degatArme;
                } if (this.alien.arme == this.nuclear) {
                    this.alien.degat = this.nuclear.degatArme;
                }
                //_______________________________Défense predator
                if (this.predator.defending){
                    this.alien.degat = this.alien.degat/2;
                }
                this.predator.sante = this.predator.sante - this.alien.degat;
                if (this.predator.defending){
                    this.predator.defending = false;
                }
                this.actif.affichePerso();
                this.changeFighter();

            } if (this.actif == this.predator) {
                //_______________________________predator attaque & defense
                console.log(this.predator.nom + " attaque");
                document.getElementById("alienOuPredator").textContent = this.alien.nom;
                if (this.predator.arme == this.gun) {
                    this.predator.degat = this.gun.degatArme
                } if (this.predator.arme == this.lazer) {
                    this.predator.degat = this.lazer.degatArme;
                } if (this.predator.arme == this.chemical) {
                    this.predator.degat = this.chemical.degatArme
                } if (this.predator.arme == this.nuclear) {
                    this.predator.degat = this.nuclear.degatArme;
                } 
                if (this.alien.defending){
                    this.predator.degat = this.predator.degat/2;
                }
                this.alien.sante = this.alien.sante - this.predator.degat;
                if (this.predator.defending){
                    this.predator.defending = false;
                }
                this.alien.affichePerso();
                this.predator.affichePerso();
            };
            console.log("Sante alien : " + this.alien.sante + ", arme alien : " + this.alien.arme.nom +
                " Sante predator : " + this.predator.sante + ", arme predator " + this.predator.arme.nom);
            resolve();
        }.bind(this);
        //_______________________________Defense
        boutonDefendre.onclick = function () {
            overlay1Elt.style.display = "none";
            //_______________________________Défense Alien
            if (this.actif == this.alien) {
                console.log("alien défend");
                this.alien.defending = true;
                document.getElementById("alienOuPredator").textContent = this.predator.nom;
            } if (this.actif == this.predator) {
                console.log("predator défend");
                this.predator.defending = true;
                document.getElementById("alienOuPredator").textContent = this.alien.nom;
            };
            resolve ();
        }.bind(this);
    });    
}
//_______________________________Fonction gérrant les changements de joueurs pdt la pahse des deplacements
changePlayer() {
    if (this.actif == this.alien) {
        this.actif = this.predator;
        this.actif.currentPlayer();
    } else if (this.actif == this.predator) {
        this.actif = this.alien;
        this.actif.currentPlayer();
    }
    this.compteurDeTour = 0;
    }
//_______________________________Fonction gérant les changements d'armes
 setWeapon(weapon) {
    this.actif.armeLache = this.actif.arme;
    this.actif.arme = weapon;
    this.actif.affichePerso();
}
//_______________________________Changement de joueur durant le combat & vainqueur
changeFighter() {
    if (this.predator.sante <= 0) {
        overlayWin.style.display = "block";
        document.getElementById("vainqueur").textContent = this.alien.nom;
        let boutonRecommencer = document.getElementsByClassName("recommencer")[1];
        boutonRecommencer.onclick = function () {
            location.reload();
        }
    } if (this.alien.sante <= 0) {
        overlayWin.style.display = "block";
        document.getElementById("vainqueur").textContent = this.predator.nom;
        let boutonRecommencer = document.getElementsByClassName("recommencer")[1];
        boutonRecommencer.onclick = function () {
            location.reload();
        }
    } else {
        console.log("changement de joueur");
        if (this.actif == this.alien) {
            document.getElementById("player1Or2").textContent = this.predator.nom;
            this.alien.showCurrentFighter();
           
        } else if (this.actif == this.predator) {
            document.getElementById("player1Or2").textContent = this.alien.nom;
            this.predator.showCurrentFighter();
        }
        let overlay2Elt = document.getElementById("overlay2");
        overlay2Elt.style.display = "block";
        let boutonClose = document.getElementsByClassName("btn_close")[1];
        boutonClose.onclick = function () {
            overlay2Elt.style.display = "none";
            let overlay1Elt = document.getElementById("overlay1");
            overlay1Elt.style.display = "block";
        }.bind(this);
    }
}
//__________________________________la phase d'attaque est possible le combat à mort se lance
async attackIsPossible(newY, newX){
    let attackPossible = this.map.nextToPlayer(newY, newX)
    if (attackPossible) {
        while (!this.isGameOver()){
        await this.promptActionFromPlayer();  
        this.changeFighter();
        this.changePlayer();
        console.log("suite"); 
        }
    }
}
//__________________________________détermine qui gagne ou perd
    isGameOver(){
        if (this.predator.sante <= 0) return true;
        if (this.alien.sante <= 0) return true;
        return false;
    }
}
