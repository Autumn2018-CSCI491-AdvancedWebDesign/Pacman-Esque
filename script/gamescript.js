// tutorial.js
// --------------------------------------------------------
// this file will hold info that controls the game engine!
// Original file created by: Will

// Global constant variables
var SPEED = 300,
    SAFETILE = 1;

// Global variables
var score, map, tileset, marker, turnpoint,
    turning = Phaser.NONE,
    current = Phaser.UP,
    directions = {},
    normal = [Phaser.NONE, Phaser.LEFT, Phaser.RIGHT, Phaser.UP, Phaser.DOWN]
    opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];

    directions[Phaser.LEFT] = null;
    directions[Phaser.RIGHT] = null;
    directions[Phaser.UP] = null;
    directions[Phaser.DOWN] = null;
    directions[Phaser.NONE] = null;

// Global variables - objects
var scoreText;

var config = {
  type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
    default: 'arcade',
      arcade: {
          debug: false
      }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);
function preload() {
  this.load.image('tiles', 'assets/tiles.png');
  this.load.image('car', 'assets/car.png');
  this.load.tilemapTiledJSON('map', 'assets/maze.json');
}

function create() {
  map = this.make.tilemap({ key: 'map' });
  tileset = map.addTilesetImage('tiles');
  layer = map.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y
  layer.setCollision(20)
  marker = new Phaser.Geom.Point();
  turnPoint = new Phaser.Geom.Point();


  // The carrrr
  car = this.physics.add.sprite(48, 48, 'car');
  this.physics.add.collider(car, layer);

  cursors = this.input.keyboard.createCursorKeys();




}

function update() {
  this.checkDirection = function(dirIndex) {
    if (dirIndex === Phaser.DOWN) {console.log("yes")}

    if (turning === dirIndex || directions[dirIndex] === null || directions[dirIndex].index !== SAFETILE) {console.log(directions[dirIndex].index);return;}

    if (current == opposites[dirIndex]) {this.move}

    else {
      turning = dirIndex
      turnPoint.x = (marker.x * map.tileWidth) + (map.tileWidth / 2);
      turnPoint.y = (marker.y * map.tileHeight) + (map.tileHeight / 2);
    }
  }

  this.move = function(direction) {
    var speed = SPEED,
        transform = 0;

    if (direction === Phaser.LEFT || direction === Phaser.UP) {
      speed = -speed
      transform = 180
    }

    if (direction === Phaser.LEFT || direction === Phaser.RIGHT) {
      car.setVelocityX(speed);
      car.angle = 90 + transform
      // car.scaleY = 1
    }
    else {
      car.setVelocityY(speed);
      car.angle = 0 + transform
      // car.scaleY = transform
    }

    // this.add.tween(this.car).to( { angle: this.getAngle(direction) }, this.turnSpeed, "Linear", true);

    // car.body.velocity.normalize().scale(SPEED);
  }

  this.checkKeys = function() {
    if (cursors.left.isDown) {this.checkDirection(Phaser.LEFT)}
    else if (cursors.right.isDown) {this.checkDirection(Phaser.RIGHT)}
    else if (cursors.up.isDown) {this.checkDirection(Phaser.UP)}
    else if (cursors.down.isDown){this.checkDirection(Phaser.DOWN)}
    else {turning = Phaser.NONE}
  }

  this.turn = function() {
    var cx = Math.floor(car.x)
    var cy = Math.floor(car.y)
    var THRESHOLD = 3;

    if (!Phaser.Math.Fuzzy.Equal(cx, turnPoint.x, THRESHOLD) || !Phaser.Math.Fuzzy.Equal(cy, turnPoint.y, THRESHOLD)) {return false}

    car.x = turnPoint.x;
    car.y = turnPoint.y;

    car.body.reset(turnPoint.x, turnPoint.y);
    this.move(turning)
    turning = Phaser.NONE;

    return true;

  }

  // this.physics.add.collider(car, layer);
  marker.x = Phaser.Math.Snap.Floor(Math.floor(car.x), map.tileWidth) / map.tileWidth;
  marker.y = Phaser.Math.Snap.Floor(Math.floor(car.y), map.tileHeight) / map.tileHeight;

  //  Update our grid sensors
  directions[Phaser.LEFT] = map.getTileAt( marker.x - 1, marker.y); // Left
  directions[Phaser.RIGHT] = map.getTileAt( marker.x + 1, marker.y); // Right
  directions[Phaser.UP] = map.getTileAt( marker.x, marker.y - 1); // Top
  directions[Phaser.DOWN] = map.getTileAt( marker.x, marker.y + 1); // Bottom

  this.checkKeys()

  if (turning != Phaser.NONE) {this.turn()}
}
