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
    opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ],
    currentMap = "map";

    directions[Phaser.LEFT] = null;
    directions[Phaser.RIGHT] = null;
    directions[Phaser.UP] = null;
    directions[Phaser.DOWN] = null;
    directions[Phaser.NONE] = null;

// Global variables - objects
var scoreText;

var config =
{
  type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics:
    {
    default: 'arcade',
      arcade:
      {
          debug: false
      }
    },
    scene:
    {
        preload: preload,
        create: create,
        update: update
    },
    parent: 'game'
}

var game = new Phaser.Game(config);

function preload() {
  this.load.image('tiles', 'assets/images/pacman-esque/tiles.png');
  this.load.image('turtle', 'assets/images/pacman-esque/turtle.png');
  this.load.image('fish', 'assets/images/pacman-esque/fish.png');
  this.load.tilemapTiledJSON('map', 'assets/maps/maze1.json');
  // this.load.tilemapTiledJSON('map1', 'assets/maps/maze1.json');
  // this.load.tilemapTiledJSON('map2', 'assets/maps/maze2.json');
  // this.load.tilemapTiledJSON('map3', 'assets/maps/maze3.json');
  // this.load.tilemapTiledJSON('map4', 'assets/maps/maze4.json');
}

function create() {
  function collectFish (player, fish) {
      fish.disableBody(true, true);
  }


  map = this.make.tilemap({ key: currentMap });
  tileset = map.addTilesetImage('tiles');
  layer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0); // layer index, tileset, x, y
  layer.setCollision(20)
  marker = new Phaser.Geom.Point();
  turnPoint = new Phaser.Geom.Point();


  // The turtlerrr
  turtle = this.physics.add.sprite(48, 48, 'turtle');
  this.physics.add.collider(turtle, layer);

  cursors = this.input.keyboard.createCursorKeys();
  console.log
  // The fishhhhes (colectables)
  // fishes = this.physics.add.group();
  fishes = this.physics.add.sprite(48, 84, 'fish');
  this.physics.add.overlap(turtle, fishes, collectFish, null, this);

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
        transform = 180;

    if (direction === Phaser.LEFT || direction === Phaser.UP) {
      speed = -speed
      transform = 0;
    }

    if (direction === Phaser.LEFT || direction === Phaser.RIGHT) {
      turtle.setVelocityX(speed);
      turtle.angle = -90 + transform;
    }
    else {
      turtle.setVelocityY(speed);
      turtle.angle = 0 + transform
    }

    // this.add.tween(this.turtle).to( { angle: this.getAngle(direction) }, this.turnSpeed, "Linear", true);

    // turtle.body.velocity.normalize().scale(SPEED);
  }

  this.checkKeys = function() {
    if (cursors.left.isDown) {this.checkDirection(Phaser.LEFT)}
    else if (cursors.right.isDown) {this.checkDirection(Phaser.RIGHT)}
    else if (cursors.up.isDown) {this.checkDirection(Phaser.UP)}
    else if (cursors.down.isDown){this.checkDirection(Phaser.DOWN)}
    else {turning = Phaser.NONE}
  }

  this.turn = function() {
    var cx = Math.floor(turtle.x)
    var cy = Math.floor(turtle.y)
    var THRESHOLD = 3;

    if (!Phaser.Math.Fuzzy.Equal(cx, turnPoint.x, THRESHOLD) || !Phaser.Math.Fuzzy.Equal(cy, turnPoint.y, THRESHOLD)) {return false}

    turtle.x = turnPoint.x;
    turtle.y = turnPoint.y;

    turtle.body.reset(turnPoint.x, turnPoint.y);
    this.move(turning)
    turning = Phaser.NONE;

    return true;

  }

  // this.physics.add.collider(turtle, layer);
  marker.x = Phaser.Math.Snap.Floor(Math.floor(turtle.x), map.tileWidth) / map.tileWidth;
  marker.y = Phaser.Math.Snap.Floor(Math.floor(turtle.y), map.tileHeight) / map.tileHeight;

  //  Update our grid sensors
  directions[Phaser.LEFT] = map.getTileAt( marker.x - 1, marker.y); // Left
  directions[Phaser.RIGHT] = map.getTileAt( marker.x + 1, marker.y); // Right
  directions[Phaser.UP] = map.getTileAt( marker.x, marker.y - 1); // Top
  directions[Phaser.DOWN] = map.getTileAt( marker.x, marker.y + 1); // Bottom

  this.checkKeys()

  if (turning != Phaser.NONE) {this.turn()}
}
