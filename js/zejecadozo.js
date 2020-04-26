console.log(this.map[y][x])
/*
  Case avant déplacement :
  Object {
    wall: false,
    player: null
    weapon: gun
  }
*/
console.log(alien.weapon)
/*
  Arme du player avant déplacement :
  lazer
*/




console.log(this.map[y][x])
/*
  Case après déplacement du joueur sur la case :
  Object {
    wall: false,
    player: alien
    weapon: lazer
  }
*/
console.log(alien.weapon)
/*
  Arme du player une fois sur la case :
  gun
*/




console.log(this.map[y][x])
/*
  Case après déplacement du joueur hors de la case :
  Object {
    wall: false,
    player: null
    weapon: lazer
  }
*/
console.log(alien.weapon)
/*
  Arme du player après déplacement du joueur hors de la case :
  gun
*/

