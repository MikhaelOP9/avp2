
//__________________________________________________Déclaration de la classe Perso
class Perso {
    constructor(nom, sante, degat, arme, position, imgSrc) {
        this.nom = nom;
        this.sante = sante;
        this.degat = degat;
        this.arme = arme;
        this.position = position;
        this.imgSrc = imgSrc;
        this.armeLache = null;
        this.defending = false;
        this.initQuiCommence();
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
            $("#armePlayer1").html(`${this.arme.nom}`);
            $("#positionPlayer1").html(`${this.position}`);
        }

        if (this.nom == 'predator') {
            $("#nomPlayer2").html(`${this.nom}`);
            $("#santePlayer2").html(`${this.sante}`);
            $("#armePlayer2").html(`${this.arme.nom}`);
            $("#positionPlayer2").html(`${this.position}`);
        }
    };
    initQuiCommence(){
        if (this.nom == "alien") {
            let overlay3Elt = document.getElementById("overlay3");
            overlay3Elt.style.display = "block";
            document.getElementById("joueur1Ou2").textContent = this.nom;
            let boutonClose = document.getElementsByClassName("btn_close")[0];
            boutonClose.onclick = function () {
                overlay3Elt.style.display = "none";
                //_________________________________________________affichage encadré indiquant que alien est actif
                $("#joueur1").css({
                    'border': 'solid',
                    'borderRadius': '10px',
                    'borderColor': 'white',
                    'borderWidth': "5px"
                });
            }
        } else if (this.nom == "predator"){
            //_________________________________________________pop-up indiquant que predator commence
            let overlay3Elt = document.getElementById("overlay3");
            overlay3Elt.style.display = "block";
            document.getElementById("joueur1Ou2").textContent = this.nom;
            let boutonClose = document.getElementsByClassName("btn_close")[0];
            boutonClose.onclick = function () {
                overlay3Elt.style.display = "none";
                //_________________________________________________affichage encadré indiquant que predator est actif
                $("#joueur2").css({
                    'border': 'solid',
                    'borderRadius': '10px',
                    'borderColor': 'white',
                    'borderWidth': "5px"
                });

            }
        }

    }

    currentPlayer() {
        if (this.nom == "alien") {
            console.log("currentPlayer Alien")
            $("#joueur1").css({
                'border': 'solid',
                'borderRadius': '10px',
                'borderColor': 'white',
                'borderWidth': "5px"
            });
            $("#joueur2").css({
                'border': 'none'
            });


        } else if (this.nom == "predator") {
            console.log("currentPlayer Predator")
            $("#joueur2").css({
                'border': 'solid',
                'borderRadius': '10px',
                'borderColor': 'white',
                'borderWidth': "5px"
            });
            $("#joueur1").css({
                'border': 'none'
            });
        }
        let overlay2Elt = document.getElementById("overlay2");
        document.getElementById("player1Or2").textContent = actif.nom;
        overlay2Elt.style.display = "block";
        let boutonClose = document.getElementsByClassName("btn_close")[1];
        boutonClose.onclick = function () {
            overlay2Elt.style.display = "none";
        }
    }
    showCurrentFighter(){
        if (actif == alien) {
            console.log("currentFighter Alien")
            $("#joueur1").css({
                'border': 'solid',
                'borderRadius': '10px',
                'borderColor': 'white',
                'borderWidth': "5px"
            });
            $("#joueur2").css({
                'border': 'none'
            });
        } else if (actif == predator) {
            console.log("currentFighter Predator")
            $("#joueur2").css({
                'border': 'solid',
                'borderRadius': '10px',
                'borderColor': 'white',
                'borderWidth': "5px"
            });
            $("#joueur1").css({
                'border': 'none'
            });
    }
}

}
