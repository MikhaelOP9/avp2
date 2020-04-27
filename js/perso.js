
 //__________________________________________________Déclaration de la classe Perso
class Perso {
    constructor(nom, sante, degat, arme, position, imgSrc, actif, compteur) {
        this.nom = nom;
        this.sante = sante;
        this.degat = degat;
        this.arme = arme;
        this.position = position;
        this.imgSrc = imgSrc;
        this.actif = actif;
        // this.joueur1 = joueur1;
        // this.joueur2 = joueur2;
        this.armeLache = null;
        this.defending = false;
        this.currentPlayer();
    }
     //__________________________________________________description des personnages
    decrirePerso() {
        return `${this.nom} a ${this.sante} points de vie, son arme est 
        ${this.arme} il est localisé à la position ${this.position}
            ${this.imgSrc}, est-il actif : ${this.actif}`;
    }
    rndNbInRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
     //__________________________________________________affichage des données des perso sur la page
    affichePerso() {

        if (this.nom == 'alien') {
            $("#nomPlayer1").html(`${this.nom}`);
            $("#santePlayer1").html(`${this.sante}`);
            $("#armePlayer1").html(`${this.arme}`);
            $("#positionPlayer1").html(`${this.position}`);
        }

        if (this.nom == 'predator') {
            $("#nomPlayer2").html(`${this.nom}`);
            $("#santePlayer2").html(`${this.sante}`);
            $("#armePlayer2").html(`${this.arme}`);
            $("#positionPlayer2").html(`${this.position}`);
        }
    };
    currentPlayer(actif){

        if (this.actif == "alien") {
            console.log("currentPlayer Alien")
            $("#joueur2").css({
                'border': 'solid',
                'borderRadius': '10px',
                'borderColor': 'grey',
                'borderWidth': "5px"
            });
            $("#joueur1").css({
                'border': 'none'
            });
            return actif = predator;
        
        } else if (this.actif == "predator") {
            console.log("currentPlayer Alien")
            $("#joueur1").css({
                'border': 'solid',
                'borderRadius': '10px',
                'borderColor': 'grey',
                'borderWidth': "5px"
            });
            $("#joueur2").css({
                'border': 'none'
            });
            return actif = alien;

        }
        // let overlay2Elt = document.getElementById("overlay2");
        // document.getElementById("player1Or2").textContent = actif.nom;
        // overlay2Elt.style.display = "block";
        // let boutonClose = document.getElementsByClassName("btn_close")[1];
        // boutonClose.onclick = function () {
        //     overlay2Elt.style.display = "none";
        }
 }

// }
