// tutorial.js
// --------------------------------------------------------
// this file will hold info that controls the game engine!
// Original file created by: Will

// For reduce()
const add = (a, b) =>
  a + b

// Global constant variables
var SPEED = 200,
  SAFETILE = [1, 29, 43, 99];

// Map building variables
map1x = [48, 84, 120, 145, 176, 212, 240, 273, 309, 338, 374, 408, 442, 472, 500, 532, 568, 595, 628];
map1y = [43, 79, 115, 150, 180, 205, 240, 268, 300, 336, 370, 400, 432];
totalmap = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0,
  0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
totalmap2 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
totalmap3 = [
  0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0,
  0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0,
  0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0,
  0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0,
  0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
];
totalmap4 = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
  0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0,
  0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0,
  0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0,
  0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0,
  0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
  0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0,
  0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
tilecount = 0;
xcount = 0;
ycount = 0;
extraspeed = 0;
lives=3;

// This is determined by game difficulty

var enemySpeed;
if (localStorage.getItem("difficulty") === null) {
  enemySpeed = 70 // Normal
}
else {
  enemySpeed = localStorage.getItem("difficulty") * 35;
}

var levelDict = ["map1", "map2", "map3", "map4"]
var totalmapDict = [totalmap, totalmap2,totalmap3,totalmap4]
var currentInd = 0
var totalmapdots = [(totalmap.length - totalmap.reduce(add)), (totalmap.length - totalmap2.reduce(add)), (totalmap.length - totalmap3.reduce(add)), (totalmap.length - totalmap4.reduce(add))]
var curTotalmapdots = totalmapdots[currentInd]
// Global variables
var scene, scoreText, map, tileset, marker, turnPoint, layer, cursors, turtle, fishes, fishes2, fishes3, enemy, enemy2, enemy3, enemy4, enemy5, enemy6, dots,
  score = 0,
  turning = Phaser.NONE,
  current = Phaser.UP,
  directions = {},
  normal = [Phaser.NONE, Phaser.LEFT, Phaser.RIGHT, Phaser.UP, Phaser.DOWN]
opposites = [Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP],
  currentMap = levelDict[currentInd];

directions[Phaser.LEFT] = null;
directions[Phaser.RIGHT] = null;
directions[Phaser.UP] = null;
directions[Phaser.DOWN] = null;
directions[Phaser.NONE] = null;

localStorage.setItem("score", score);


// Global variables - objects
var config = {
  type: Phaser.AUTO,
  width: 672,
  height: 480,
  physics: {
    default: 'arcade',
    arcade: {
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
    this.load.image('dot', 'assets/images/pacman-esque/dot.png');
    this.load.tilemapTiledJSON('map1', 'assets/maps/maze1.json');
    this.load.tilemapTiledJSON('map2', 'assets/maps/maze2.json');
    this.load.tilemapTiledJSON('map3', 'assets/maps/maze3.json');
    this.load.tilemapTiledJSON('map4', 'assets/maps/maze4.json');
  }

  create() {
    function collectFish(player, fish) {
      extraspeed += SPEED/2;
      fish.disableBody(true, true);
    }

    function collectDots(player, dot) {
      dot.disableBody(true, true);
      curTotalmapdots -= 1;
      score += 1;
      updateScore(score);
    }

    function playerDeath(player, enemy) {
      alert("You have lost a life");
      //changeLevel(currentMap);
		lives=lives-1;
		if (lives >0){
			turtle.body.reset(48, 48);
		}
		else{
			alert("GAME OVER! Click refresh to try again!");
			alert("Score: "+score);
		}
    }

    var enemiesPowerupsDict = {
      0: function(that, turtle, layer) {
        fishes = that.physics.add.sprite(48, 84, 'fish');

        enemy = that.physics.add.sprite(48, 420, 'creepy', randomDirection);
        enemy.setVelocityY(-enemySpeed);
        enemy.body.bounce.set(1);
        that.physics.add.collider(enemy, layer);

        enemy2 = that.physics.add.sprite(480, 48, 'creepy');
        enemy2.setVelocityX(-enemySpeed);
        enemy2.body.bounce.set(1);
        that.physics.add.collider(enemy2, layer);

        enemy3 = that.physics.add.sprite(176, 48, 'creepy', randomDirection);
        enemy3.setVelocityY(enemySpeed);
        enemy3.body.bounce.set(1);
        that.physics.add.collider(enemy3, layer);

        enemy4 = that.physics.add.sprite(176, 240, 'creepy');
        enemy4.setVelocityX(enemySpeed);
        enemy4.body.bounce.set(1);
        that.physics.add.collider(enemy4, layer);

        that.physics.add.overlap(turtle, fishes, collectFish, null, this);
        that.physics.add.overlap(turtle, enemy, playerDeath, null, this);
        that.physics.add.overlap(turtle, enemy2, playerDeath, null, this);
        that.physics.add.overlap(turtle, enemy3, playerDeath, null, this);
        that.physics.add.overlap(turtle, enemy4, playerDeath, null, this);
      },
      1: function(that, turtle, layer) {
        fishes = that.physics.add.sprite(48, 84, 'fish');
        fishes2 = that.physics.add.sprite(480, 435, 'fish');

        enemy = that.physics.add.sprite(450, 435, 'creepy');
        enemy.setVelocityX(-enemySpeed);
        enemy.body.bounce.set(1);
        that.physics.add.collider(enemy, layer, randomDirection);


        enemy2 = that.physics.add.sprite(480, 48, 'creepy');
        enemy2.setVelocityX(-enemySpeed);
        enemy2.body.bounce.set(1);
        that.physics.add.collider(enemy2, layer);

        enemy3 = that.physics.add.sprite(176, 48, 'creepy');
        enemy3.setVelocityY(enemySpeed);
        enemy3.body.bounce.set(1);
        that.physics.add.collider(enemy3, layer);

        enemy4 = that.physics.add.sprite(176, 240, 'creepy');
        enemy4.setVelocityX(enemySpeed);
        enemy4.body.bounce.set(1);
        that.physics.add.collider(enemy4, layer, randomDirection);

        enemy5 = that.physics.add.sprite(176, 240, 'creepy');
        enemy5.setVelocityX(-enemySpeed);
        enemy5.body.bounce.set(1);
        that.physics.add.collider(enemy5, layer, randomDirection);

        that.physics.add.overlap(turtle, fishes, collectFish, null, this);
        that.physics.add.overlap(turtle, fishes2, collectFish, null, this);
        that.physics.add.overlap(turtle, enemy, playerDeath, null, this);
        that.physics.add.overlap(turtle, enemy2, playerDeath, null, this);
        that.physics.add.overlap(turtle, enemy3, playerDeath, null, this);
        that.physics.add.overlap(turtle, enemy4, playerDeath, null, this);
        that.physics.add.overlap(turtle, enemy5, playerDeath, null, this);
      },
      2: function(that, turtle, layer) {
        fishes = that.physics.add.sprite(240, 84, 'fish');
        fishes2 = that.physics.add.sprite(430, 435, 'fish');

        enemy = that.physics.add.sprite(450, 435, 'creepy');
        enemy.setVelocityX(-enemySpeed);
        enemy.body.bounce.set(1);
        that.physics.add.collider(enemy, layer, randomDirection);


        enemy2 = that.physics.add.sprite(480, 144, 'creepy');
        enemy2.setVelocityX(-enemySpeed);
        enemy2.body.bounce.set(1);
        that.physics.add.collider(enemy2, layer);

        enemy3 = that.physics.add.sprite(208, 48, 'creepy');
        enemy3.setVelocityY(enemySpeed);
        enemy3.body.bounce.set(1);
        that.physics.add.collider(enemy3, layer);

        enemy4 = that.physics.add.sprite(176, 240, 'creepy');
        enemy4.setVelocityX(enemySpeed);
        enemy4.body.bounce.set(1);
        that.physics.add.collider(enemy4, layer, randomDirection);

        enemy5 = that.physics.add.sprite(176, 240, 'creepy');
        enemy5.setVelocityX(-enemySpeed);
        enemy5.body.bounce.set(1);
        that.physics.add.collider(enemy5, layer, randomDirection);

        enemy2 = that.physics.add.sprite(480, 48, 'creepy');
        enemy2.setVelocityX(-enemySpeed);
        enemy2.body.bounce.set(1);
        that.physics.add.collider(enemy2, layer);

        that.physics.add.overlap(turtle, fishes, collectFish, null, this);
        that.physics.add.overlap(turtle, fishes2, collectFish, null, this);
        that.physics.add.overlap(turtle, enemy, playerDeath, null, this);
        that.physics.add.overlap(turtle, enemy2, playerDeath, null, this);
        that.physics.add.overlap(turtle, enemy3, playerDeath, null, this);
        that.physics.add.overlap(turtle, enemy4, playerDeath, null, this);
        that.physics.add.overlap(turtle, enemy5, playerDeath, null, this);},
      3: function(that, turtle, layer) {
              fishes = that.physics.add.sprite(240, 48, 'fish');
              fishes2 = that.physics.add.sprite(430, 435, 'fish');

              enemy = that.physics.add.sprite(450, 435, 'creepy');
              enemy.setVelocityX(-enemySpeed);
              enemy.body.bounce.set(1);
              that.physics.add.collider(enemy, layer, randomDirection);


              enemy2 = that.physics.add.sprite(480, 144, 'creepy');
              enemy2.setVelocityX(-enemySpeed);
              enemy2.body.bounce.set(1);
              that.physics.add.collider(enemy2, layer);

              enemy3 = that.physics.add.sprite(208, 148, 'creepy');
              enemy3.setVelocityY(enemySpeed);
              enemy3.body.bounce.set(1);
              that.physics.add.collider(enemy3, layer);

              enemy4 = that.physics.add.sprite(176, 240, 'creepy');
              enemy4.setVelocityX(enemySpeed);
              enemy4.body.bounce.set(1);
              that.physics.add.collider(enemy4, layer, randomDirection);

              enemy5 = that.physics.add.sprite(176, 240, 'creepy');
              enemy5.setVelocityX(-enemySpeed);
              enemy5.body.bounce.set(1);
              that.physics.add.collider(enemy5, layer, randomDirection);

              enemy2 = that.physics.add.sprite(480, 48, 'creepy');
              enemy2.setVelocityX(-enemySpeed);
              enemy2.body.bounce.set(1);
              that.physics.add.collider(enemy2, layer);

              that.physics.add.overlap(turtle, fishes, collectFish, null, this);
              that.physics.add.overlap(turtle, fishes2, collectFish, null, this);
              that.physics.add.overlap(turtle, enemy, playerDeath, null, this);
              that.physics.add.overlap(turtle, enemy2, playerDeath, null, this);
              that.physics.add.overlap(turtle, enemy3, playerDeath, null, this);
              that.physics.add.overlap(turtle, enemy4, playerDeath, null, this);
              that.physics.add.overlap(turtle, enemy5, playerDeath, null, this);}
    }


    map = this.make.tilemap({
      key: currentMap
    });
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

    enemiesPowerupsDict[currentInd](this, turtle, layer)

    cursors = this.input.keyboard.createCursorKeys();

    for (var i = 0; i < totalmapDict[currentInd].length; i++) {
      var tile = totalmapDict[currentInd][i];
      if (i == 0) {
        //window.alert(0);
        ycount = 0;
      } else if (i != 0 && tilecount <= 12) {
        //window.alert(1)
      } else if (i != 0 && tilecount > 12) {
        xcount = xcount + 1;
        ycount = 0;
        tilecount = 0;
        //window.alert(2);
      }
      var x = map1x[xcount];
      var y = map1y[ycount];
      //window.alert(x);
      //window.alert(y);
      if (tile == 0) {
        dots = this.physics.add.sprite(x, y, 'dot');
        ycount = ycount + 1;
      } else if (tile == 1) {
        ycount = ycount + 1;
      }
      if (i == 0) {
        ycount = ycount + 1;
      }
      //window.alert(5)
      this.physics.add.overlap(turtle, dots, collectDots, null, this);
      tilecount = tilecount + 1;
    }
    scene = this.scene.get("StateMain");
  }

  update() {
    this.checkDirection = function(dirIndex) {

      if (turning === dirIndex || directions[dirIndex] === null || (directions[dirIndex].index !== SAFETILE[0] && directions[dirIndex].index !== SAFETILE[1] && directions[dirIndex].index !== SAFETILE[2] && directions[dirIndex].index !== SAFETILE[3])) {
        return;
      }

      if (current == opposites[dirIndex]) {
        this.move(dirIndex);
      } else {
        turning = dirIndex
        turnPoint.x = (marker.x * map.tileWidth) + (map.tileWidth / 2);
        turnPoint.y = (marker.y * map.tileHeight) + (map.tileHeight / 2);
      }
    }

    this.move = function(direction) {
      var speed = SPEED + extraspeed,
        transform = 180;

      if (direction === Phaser.LEFT || direction === Phaser.UP) {
        speed = -speed
        transform = 0;
      }

      if (direction === Phaser.LEFT || direction === Phaser.RIGHT) {
        turtle.setVelocityX(speed);
        turtle.angle = -90 + transform;
      } else {
        turtle.setVelocityY(speed);
        turtle.angle = 0 + transform
      }

    }

    this.checkKeys = function() {
      if (cursors.left.isDown) {
        this.checkDirection(Phaser.LEFT)
      } else if (cursors.right.isDown) {
        this.checkDirection(Phaser.RIGHT)
      } else if (cursors.up.isDown) {
        this.checkDirection(Phaser.UP)
      } else if (cursors.down.isDown) {
        this.checkDirection(Phaser.DOWN)
      // } else {
      //   // turning = Phaser.NONE
      //   console.log("NOT TODAY")
      }
    }

    this.turn = function() {
      var cx = Math.floor(turtle.x)
      var cy = Math.floor(turtle.y)
      var THRESHOLD = 3;

      if ((!Phaser.Math.Fuzzy.Equal(cx, turnPoint.x, THRESHOLD) || !Phaser.Math.Fuzzy.Equal(cy, turnPoint.y, THRESHOLD))  && (directions[turning].index !== SAFETILE[0] && directions[turning].index !== SAFETILE[1] && directions[turning].index !== SAFETILE[2] && directions[turning].index !== SAFETILE[3])) {
        // console.log(turning)
        // console.log(turnPoint.x)
        // console.log(turnPoint.y)
        return false
      }

      turtle.x = turnPoint.x;
      turtle.y = turnPoint.y;

      turtle.body.reset(turnPoint.x, turnPoint.y);
      this.move(turning)
      turning = Phaser.NONE;

      return true;
    }

    this.checkFinishedLevel = function() {
      if (curTotalmapdots < 1) {changeLevel(currentInd+1)}
    }

    // this.physics.add.collider(turtle, layer);
    marker.x = Phaser.Math.Snap.Floor(Math.floor(turtle.x), map.tileWidth) / map.tileWidth;
    marker.y = Phaser.Math.Snap.Floor(Math.floor(turtle.y), map.tileHeight) / map.tileHeight;

    //  Update our grid sensors
    directions[Phaser.LEFT] = map.getTileAt(marker.x - 1, marker.y); // Left
    directions[Phaser.RIGHT] = map.getTileAt(marker.x + 1, marker.y); // Right
    directions[Phaser.UP] = map.getTileAt(marker.x, marker.y - 1); // Top
    directions[Phaser.DOWN] = map.getTileAt(marker.x, marker.y + 1); // Bottom

    this.checkKeys();
    this.checkFinishedLevel();

    if (turning != Phaser.NONE) {
      this.turn()
    }
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

function changeLevel(newMapInd = null) {
  if (newMapInd == null) { // We didn't change a map, we died or restarted
    newMapInd = currentInd
    score = parseInt(localStorage.getItem("score"));
  }
  else if (newMapInd >= levelDict.length) {
    localStorage.setItem("score", score);
    // User inputs a high score here
  }
  turning = Phaser.NONE;
  currentInd = newMapInd
  currentMap = levelDict[newMapInd];
  curTotalmapdots = totalmapdots[newMapInd];
  tilecount = 0;
  xcount = 0;
  ycount = 0;
  extraspeed = 0;
  localStorage.setItem("score", score);
  scene.scene.stop();
  scene.scene.start();
}

function updateScore(score) {
  document.getElementById("scoreCounter").innerHTML = "Score: " + score;
}

function randomDirection(obj1, obj2) {
  rand = Math.random()
  if (rand > .7) {
    if (Math.random() > .85) {
      sign = 1
    }
    else {
      sign = -1
    }
    // Makes ob1 go in a random direction
    if (obj1.body.velocity.x != 0) {
      obj1.setVelocityY(obj1.body.velocity.x * sign)
      obj1.setVelocityX(0);
    }
    else {
      obj1.setVelocityX(obj1.body.velocity.y * sign)
      obj1.setVelocityY(0);
    }
  }
}
