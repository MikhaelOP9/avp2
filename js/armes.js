//_______________________________déclaration de la classe Armes

class Armes {
    constructor(nom, degatArme, positionArme, imgSrc, actif) {
        this.nom = nom;
        this.degatArme = degatArme;
        this.positionArme = positionArme;
        this.imgSrc = imgSrc;
        this.actif = actif;
    }
     //_______________________________Déscripion des armes
    decrireArmes() {
        return `Cette arme se nomme ${this.nom} elle enléve ${this.degatArme} 
        points de vie, elle est localisée à la case N°${this.positionArme}  
        ${this.imgSrc} ${this.actif}`;
    }
}


