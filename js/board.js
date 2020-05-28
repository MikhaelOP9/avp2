class Board {
  constructor(lazer, gun, nuclear, chemical, alien, predator) {
    this.map;
    this.mapSize = 10;
    this.wallCount = 20;
    this.gunCount = 1;
    this.lazerCount = 1;
    this.chemicalCount = 1;
    this.nuclearCount = 1;
    this.playerCount = 2;
    this.alienCount = 1;
    this.predatorCount = 1;
    this.lazer = lazer;
    this.gun = gun;
    this.nuclear = nuclear;
    this.chemical = chemical;
    this.alien = alien;
    this.predator = predator;
    this.checkMapSize();
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
  checkMapSize(){
    let mapCase = this.mapSize * this.mapSize;
    let emptyCase = mapCase - (this.wallCount + this.gunCount + this.lazerCount +
      this.chemicalCount + this.nuclearCount + this.playerCount) 
    console.log (mapCase, emptyCase);
    if (emptyCase < 10){
      throw new Error("merci de s'assurer que la map est assez grande pour contenir tous les objets générés")
    }
  }
  //_______________________________Génération aléatoire des cases
  getRandomAvailableCoords() {
    let x = this.rndNbInRange(0, this.mapSize);
    let y = this.rndNbInRange(0, this.mapSize);
    while (this.map[y][x].wall !== false ||
      this.map[y][x].weapon !== null ||
      this.map[y][x].player !== null) {
      x = this.rndNbInRange(0, this.mapSize);
      y = this.rndNbInRange(0, this.mapSize);
    }; 
    return { x, y }
  }
  //_______________________________Génération de la carte
  createMap() {
    this.map = [];
    //_______________________________Boucle des rangées.
    for (let y = 0; y < this.mapSize; y++) {
      // Créer chaque rangée.
      this.map[y] = [];
      //_______________________________Boucle des cellules de chaques rangées.
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
  //_______________________________génération d'un nombre aleatoire pour le remplaissage de la carte
  rndNbInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  //_______________________________disposition sur la carte des murs
  createWalls() {
    for (let i = 0; i !== this.wallCount; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].wall = true;
    }
  }
  //_______________________________disposition sur la carte du gun
  createGun() {
    for (let i = 0; i < this.gunCount; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].weapon = this.gun.nom;
    }
  }
  //_______________________________disposition sur la carte du lazer
  createLazer() {
    for (let i = 0; i < this.lazerCount; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].weapon = this.lazer.nom;
    }
  }
  //_______________________________disposition sur la carte de l'arme chimique
  createChemical() {
    for (let i = 0; i < this.chemicalCount; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].weapon = this.chemical.nom;
    }
  }
  //_______________________________disposition sur la carte de l'arme nucléaire
  createNuclear() {
    for (let i = 0; i < this.nuclearCount; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].weapon = this.nuclear.nom;
    }
  }
  //_______________________________disposition sur la carte du perso predator
  createPredator() {
    for (let i = 0; i < this.predatorCount; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].player = this.predator.nom;
    }
  }
  //_______________________________disposition sur la carte du perso alien
  createAlien() {
    for (let i = 0; i < this.alienCount; i++) {
      let { x, y } = this.getRandomAvailableCoords();
      this.map[y][x].player = this.alien.nom;
    }
  }
  //_______________________________affichage de la carte en jquery
  displayMap() {
    $("#container").empty();
    $('#container').append(`<table class="mainTable">
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
        if (this.map[y][x].weapon == this.gun.nom)
          type = this.gun.nom;
        if (this.map[y][x].weapon == this.chemical.nom)
          type = this.chemical.nom
        if (this.map[y][x].weapon == this.nuclear.nom)
          type = this.nuclear.nom;
        if (this.map[y][x].weapon == this.lazer.nom)
          type = this.lazer.nom;
        if (this.map[y][x].player == this.alien.nom)
          type = this.alien.nom;
        if (this.map[y][x].player == this.predator.nom)
          type = this.predator.nom;
        $('table.mainTable>tbody.gameContainer>tr.gameRow[data-location-y="' + y + '"]').append(`
            <td data-location-x="${x}" data-location-y="${y}" class="case ${type}"></td>`
          );
      }
    }
  }
  //_______________________________Positionnement des joueurs
  locatePlayer(player) {
    for (let y = 0; y < this.mapSize; y++) {
      for (let x = 0; x < this.mapSize; x++) {
        if (this.map[y][x].player == player.nom) {
          return { y, x };
        }
      }
    }
  }
  //_______________________________position de déplacement disponible 
  availablePosition(y, x) {
    if (
      y >= 0 &&
      y < this.mapSize &&
      x >= 0 &&
      x < this.mapSize &&
      this.map[y][x].wall != true &&
      this.map[y][x].player != this.alien.nom &&
      this.map[y][x].player != this.predator.nom
      ) {
      return true;
    }
    return false;
  }
  //_______________________________Mouvement des joueurs
  movePlayer(player, newY, newX, oldY, oldX) {
    if (player.armeLache != null){
      this.map[newY][newX].weapon = player.armeLache.nom;
      player.armeLache = null;
    } 
    this.map[oldY][oldX].player = null;
    this.map[newY][newX].player = player.nom;
    //_______________________________rafraichissement de l'affichage
    this.displayMap();
  }
    //_______________________________armes disponible sur la carte
  availableWeapon(y, x) {
    let newWeapon = null;
    if (this.map[y][x].weapon == this.gun.nom) {
      newWeapon = this.gun;
    } if (this.map[y][x].weapon == this.lazer.nom) {
      newWeapon = this.lazer;
    } if (this.map[y][x].weapon == this.chemical.nom) {
      newWeapon = this.chemical;
    } if (this.map[y][x].weapon == this.nuclear.nom) {
      newWeapon = this.nuclear;
    } 
    return newWeapon;
  }
   //_______________________________détection de la proximité des joueurs sur des cases adjacentes
  nextToPlayer(y, x){
    if (y-1 != -1)
      if (this.map[y-1][x].player == this.alien.nom || this.map[y-1][x].player == this.predator.nom) return true;
    if (y+1 < this.mapSize)
      if (this.map[y+1][x].player == this.alien.nom || this.map[y+1][x].player == this.predator.nom) return true;
    if (x-1 != -1)
      if (this.map[y][x-1].player == this.alien.nom || this.map[y][x-1].player == this.predator.nom) return true;
    if (this.map[y][x+1].player == this.alien.nom || this.map[y][x+1].player == this.predator.nom) return true;
    return false;
  }
}





