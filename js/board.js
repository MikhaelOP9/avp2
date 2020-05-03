class Board {
  constructor() {
    this.map;
    this.mapSize = 10;
    this.wallCount = 20;
    this.weaponCount = 4;
    this.playerCount = 2;
    this.alienCount = 1;
    this.predatorCount = 1;
    // this.arme;
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
    while (this.map[y][x].wall !== false ||
      this.map[y][x].weapon !== null ||
      this.map[y][x].player !== null) {
      x = this.rndNbInRange(0, this.mapSize);
      y = this.rndNbInRange(0, this.mapSize);
    } console.log(this.map[y][x].wall);
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
        let box = {
          wall : false,
          player : null,
          weapon : null,
        };
        this.map[y][x] = box;
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
      this.map[y][x].wall = true;
    }
  }
  //__________________________________________________disposition sur la carte des guns
  createGun() {
    for (let i = 0; i < 1; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].weapon = gun.nom;
    }
  }
  //__________________________________________________disposition sur la carte des lazers
  createLazer() {
    for (let i = 0; i < 1; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].weapon = lazer.nom;
    }
  }
//__________________________________________________disposition sur la carte des armes chimique
  createChemical() {
    for (let i = 0; i < 1; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].weapon = chemical.nom;
    }
  }
  //__________________________________________________disposition sur la carte de l'arme nucléaire
  createNuclear() {
    for (let i = 0; i < 1; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].weapon = nuclear.nom;
    }
  }
  //__________________________________________________disposition sur la carte du perso predator
  createPredator() {
    for (let i = 0; i < this.predatorCount; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].player = predator.nom;
    }
  }
  //__________________________________________________disposition sur la carte du perso alien
  createAlien() {
    for (let i = 0; i < this.alienCount; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].player = alien.nom;
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
        if (this.map[y][x].wall == true)
          type = "wall";
        if (this.map[y][x].weapon == gun.nom)
          type = gun.nom;
        if (this.map[y][x].weapon == chemical.nom)
          type = chemical.nom
        if (this.map[y][x].weapon == nuclear.nom)
          type = nuclear.nom;
        if (this.map[y][x].weapon == lazer.nom)
          type = lazer.nom;
        if (this.map[y][x].player == alien.nom)
          type = alien.nom;
        if (this.map[y][x].player == predator.nom)
          type = predator.nom;
        $('table.mainTable>tbody.gameContainer>tr.gameRow[data-location-y="' + y + '"]').append(`
            <td data-location-x="${x}" data-location-y="${y}" class="case ${type}"></td> 
          `);
      }
    }
  }
  locatePlayer(player) {
    for (let y = 0; y < this.mapSize; y++) {
      for (let x = 0; x < this.mapSize; x++) {
        if (this.map[y][x].player == player.nom) {
          return { y, x };
        }
      }
    }
  }
 //__________________________________________________position de déplacement disponible 
  availablePosition(y, x) {
    console.log(this.map[y][x]);
    if (
      y >= 0 &&
      y < this.mapSize &&
      x >= 0 &&
      x < this.mapSize &&
      this.map[y][x].wall != true &&
      this.map[y][x].player != alien.nom &&
      this.map[y][x].player != predator.nom
      ) {
      return true;
    }
    return false;
  }
  movePlayer(player, newY, newX, oldY, oldX) {
    if (player.armeLache != null){
      this.map[newY][newX].weapon = player.armeLache.nom;
      player.armeLache = null;
    } 
    this.map[oldY][oldX].player = null;
    this.map[newY][newX].player = player.nom;
    console.log(this.map[newY][newX]);
    console.log(this.map[oldY][oldX]);
 //__________________________________________________rafraichissement de l'affichage
    this.displayMap();
  }
   //__________________________________________________armes disponible sur la carte
  availableWeapon(y, x) {
    let newWeapon = null;
    if (this.map[y][x].weapon == gun.nom) {
      newWeapon = gun;
    } if (this.map[y][x].weapon == lazer.nom) {
      newWeapon = lazer;
    } if (this.map[y][x].weapon == chemical.nom) {
      newWeapon = chemical;
    } if (this.map[y][x].weapon == nuclear.nom) {
      newWeapon = nuclear;
    } 
    return newWeapon;
  }
   //__________________________________________________détection de la proximité des joueurs sur des cases adjacentes
  nextToPlayer(y, x){
    if (y-1 != -1)
      if (this.map[y-1][x].player == alien.nom || this.map[y-1][x].player == predator.nom) return true;
    if (y+1 < this.mapSize)
      if (this.map[y+1][x].player == alien.nom || this.map[y+1][x].player == predator.nom) return true;
    if (x-1 != -1)
      if (this.map[y][x-1].player == alien.nom || this.map[y][x-1].player == predator.nom) return true;
    if (this.map[y][x+1].player == alien.nom || this.map[y][x+1].player == predator.nom) return true;
    return false;
  }
}





