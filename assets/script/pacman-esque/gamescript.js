// tutorial.js
// --------------------------------------------------------
// this file will hold info that controls the game engine!
// Original file created by: Will


// Global constant variables
var SPEED = 300,
    SAFETILE = [1,29,43];

// Global variables
var scene, score, map, tileset, marker, turnPoint, layer, cursors, turtle, fishes, enemy,
    turning = Phaser.NONE,
    current = Phaser.UP,
    directions = {},
    normal = [Phaser.NONE, Phaser.LEFT, Phaser.RIGHT, Phaser.UP, Phaser.DOWN]
    opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ],
    currentMap = "map1";

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
    width: 672,
    height: 480,
    physics:
    {
    default: 'arcade',
      arcade:
      {
          debug: false
      }
    },
    parent: 'game'
}

class StateMain extends Phaser.Scene {
   preload() {
    this.load.image('tiles', 'assets/images/pacman-esque/tiles.png');
    this.load.image('turtle', 'assets/images/pacman-esque/turtle.png');
    this.load.image('fish', 'assets/images/pacman-esque/fish.png');
    this.load.image('creepy', 'assets/images/pacman-esque/creepy.png');
    // this.load.tilemapTiledJSON('map', 'assets/maps/maze.json');
    this.load.tilemapTiledJSON('map1', 'assets/maps/maze1.json');
    this.load.tilemapTiledJSON('map2', 'assets/maps/maze2.json');
    this.load.tilemapTiledJSON('map3', 'assets/maps/maze3.json');
    this.load.tilemapTiledJSON('map4', 'assets/maps/maze4.json');
  }

   create() {
    function collectFish (player, fish) {
        fish.disableBody(true, true);
    }

    function playerDeath (player, enemy) {
      alert("You Is Dead.")
      scene.scene.restart();
    }


    map = this.make.tilemap({ key: currentMap });
    tileset = map.addTilesetImage('tiles');
    layer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0); // layer index, tileset, x, y
    layer.setCollision(20);
    layer.setCollision(24);
    marker = new Phaser.Geom.Point();
    turnPoint = new Phaser.Geom.Point();

    // The turtlerrr
    turtle = null;
    turtle = this.physics.add.sprite(48, 48, 'turtle');
    this.physics.add.collider(turtle, layer);

    cursors = this.input.keyboard.createCursorKeys();

    fishes = this.physics.add.sprite(48, 84, 'fish');

    enemy = this.physics.add.sprite(48, 420, 'creepy');
    enemy.setVelocityY(-70);
    enemy.body.bounce.set(1);
    this.physics.add.collider(enemy, layer);

    this.physics.add.overlap(turtle, fishes, collectFish, null, this);
    this.physics.add.overlap(turtle, enemy, playerDeath, null, this);
    scene = this.scene.get("StateMain");
  }

   update() {
    this.checkDirection = function(dirIndex) {

      if (turning === dirIndex || directions[dirIndex] === null || (directions[dirIndex].index !== SAFETILE[0] && directions[dirIndex].index !== SAFETILE[1] && directions[dirIndex].index !== SAFETILE[2])) {return;}

      if (current == opposites[dirIndex]) {this.move(dirIndex);}

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

    this.checkKeys();

    if (turning != Phaser.NONE) {this.turn()}
  }
}


class Game extends Phaser.Game {

    constructor() {

        super(config);

        this.scene.add('StateMain', StateMain, false);

        this.scene.start('StateMain');

    }
}

var game = new Game(config);

function changeLevel(newMap = "map1") {
  turning = Phaser.NONE;
  currentMap = newMap;
  scene.scene.stop();
  scene.scene.start();
}
