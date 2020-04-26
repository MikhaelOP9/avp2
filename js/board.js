
class Board {
  constructor() {
    this.map;
    this.mapSize = 10;
    this.wallCount = 20;
    this.weaponCount = 4;
    this.playerCount = 2;
    this.alienCount = 1;
    this.predatorCount = 1;
    this.arme;
    this.createMap();
    this.createWalls();
    this.createLazer();
    this.createGun();
    this.createChemical();
    this.createNuclear();
    this.createAlien();
    this.createPredator();
    this.displayMap();
  }
  getRandomAvailableCoords() {
    let x = this.rndNbInRange(0, this.mapSize);
    let y = this.rndNbInRange(0, this.mapSize);
    while (this.map[y][x] !== '') {
      x = this.rndNbInRange(0, this.mapSize);
      y = this.rndNbInRange(0, this.mapSize);
    }
    return { x, y }
  }
  createMap() {
    this.map = [];
//__________________________________________________Boucle des rangées.
    for (let y = 0; y < this.mapSize; y++) {
      // Créer chaque rangée.
      this.map[y] = [];
//__________________________________________________Boucle des cellules de chaques rangées.
      for (let x = 0; x < this.mapSize; x++) {
        this.map[y][x] = '';
      }
    }
  }
  //__________________________________________________génération d'un nombre aleatoire pour la génération de la carte
  rndNbInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  //__________________________________________________disposition sur la carte des murs
  createWalls() {
    for (let i = 0; i !== this.wallCount; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x] = 'wall';
    }
  }
  //__________________________________________________disposition sur la carte des guns
  createGun() {
    for (let i = 0; i < 1; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x] = 'gun';
    }
  }
  //__________________________________________________disposition sur la carte des lazers
  createLazer() {
    for (let i = 0; i < 1; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x] = 'lazer';
    }
  }
//__________________________________________________disposition sur la carte des armes chimique
  createChemical() {
    for (let i = 0; i < 1; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x] = 'chemical';
    }
  }
  //__________________________________________________disposition sur la carte de l'arme nucléaire
  createNuclear() {
    for (let i = 0; i < 1; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x] = 'nuclear';
    }
  }
  //__________________________________________________disposition sur la carte du perso predator
  createPredator() {
    for (let i = 0; i < this.predatorCount; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x] = 'predator';
    }
  }
  //__________________________________________________disposition sur la carte du perso alien
  createAlien() {
    for (let i = 0; i < this.alienCount; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x] = 'alien';
    }
  }
  //__________________________________________________affichage de la carte en jquery
  displayMap() {
    $("#container").empty();
    $('#container').append(`
        <table class="mainTable">
          <tbody class="gameContainer">
          </tbody>
        </table>`
    );
    for (let y = 0; y < this.mapSize; y++) {
      $('table.mainTable>tbody.gameContainer').append(`
          <tr class="gameRow" data-location-y="${y}"></tr>`);
      for (let x = 0; x < this.mapSize; x++) {
        let type = "";
        if (this.map[y][x] == "wall")
          type = "wall";
        if (this.map[y][x] == "alien")
          type = "alien";
        if (this.map[y][x] == "predator")
          type = "predator";
        if (this.map[y][x] == "gun")
          type = "gun";
        if (this.map[y][x] == "chemical")
          type = "chemical"
        if (this.map[y][x] == "nuclear")
          type = "nuclear";
        if (this.map[y][x] == "lazer")
          type = "lazer";
        $('table.mainTable>tbody.gameContainer>tr.gameRow[data-location-y="' + y + '"]').append(`
            <td data-location-x="${x}" data-location-y="${y}" class="case ${type}"></td> 
          `);
      }
    }
  }
  locatePlayer(player) {
    for (let y = 0; y < this.mapSize; y++) {
      for (let x = 0; x < this.mapSize; x++) {
        if (this.map[y][x] == player.nom) {
          return { y, x };
        }
      }
    }
  }
 //__________________________________________________position de déplacement disponible 
  availablePosition(y, x) {
    if (
      y >= 0 &&
      y < this.mapSize &&
      x >= 0 &&
      x < this.mapSize &&
      this.map[y][x] != "wall" &&
      this.map[y][x] != "alien" &&
      this.map[y][x] != "predator"
      ) {
      return true;
    }
    return false;
  }
  movePlayer(player, newY, newX, oldY, oldX) {
    if (player.armeLache != null){
      this.map[oldY][oldX] = player.armeLache;

    } else {
      this.map[oldY][oldX] = null;
    }
    
    this.map[newY][newX] = player.nom;
    
 //__________________________________________________rafraichissement de l'affichage
    this.displayMap();
  }
   //__________________________________________________armes disponible sur la carte
  availableWeapon(y, x) {
    let newWeapon = null;
    if (this.map[y][x] == "gun") {
      newWeapon = "gun"
    } if (this.map[y][x] == "lazer") {
      newWeapon = "lazer"
    } if (this.map[y][x] == "chemical") {
      newWeapon = "chemical"
    } if (this.map[y][x] == "nuclear") {
      newWeapon = "nuclear"
    } 
    return newWeapon;
  }
   //__________________________________________________détection de la proximité des joueurs sur des cases adjacentes
  nextToPlayer(y, x){
    if (y-1 != -1)
      if (this.map[y-1][x] == "alien" || this.map[y-1][x] == "predator") return true;
    if (y+1 < this.mapSize)
      if (this.map[y+1][x] == "alien" || this.map[y+1][x] == "predator") return true;
    if (x-1 != -1)
      if (this.map[y][x-1] == "alien" || this.map[y][x-1] == "predator") return true;
    if (this.map[y][x+1] == "alien" || this.map[y][x+1] == "predator") return true;
    return false;
  }
}





