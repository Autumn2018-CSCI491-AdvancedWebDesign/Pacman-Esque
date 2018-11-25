// tutorial.js
// --------------------------------------------------------
// this file will hold info that controls the game engine!
// Original file created by: Will

// Global constant variables
var SPEED = 300;

// Global variables
var score;

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
    }
}

var game = new Phaser.Game(config);
function preload() {
  this.load.image('tiles', 'assets/images/pacman-esque/tiles.png');
  this.load.image('car', 'assets/images/pacman-esque/car.png');
  this.load.tilemapTiledJSON('map', 'assets/images/pacman-esque/maze.json');
}

function create()
{
  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('tiles');
  layer = map.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y
  layer.setCollision(20)

  // The carrrr
  car = this.physics.add.sprite(48, 48, 'car');
  this.physics.add.collider(car, layer);

  cursors = this.input.keyboard.createCursorKeys();
}

function update()
{
  // this.physics.add.collider(car, layer);
  // this.marker.x = this.math.snapToFloor(Math.floor(car.x), this.gridsize) / this.gridsize;
  // this.marker.y = this.math.snapToFloor(Math.floor(car.y), this.gridsize) / this.gridsize;

  //  Update our grid sensors
  // this.directions[1] = map.getTileLeft(this.layer.index, this.marker.x, this.marker.y);
  // this.directions[2] = map.getTileRight(this.layer.index, this.marker.x, this.marker.y);
  // this.directions[3] = map.getTileAbove(this.layer.index, this.marker.x, this.marker.y);
  // this.directions[4] = map.getTileBelow(this.layer.index, this.marker.x, this.marker.y);
  //
  // if (this.turning !== Phaser.NONE)
  // {
  //     this.turn();
  // }

  if (cursors.left.isDown)
  {
      car.setVelocityX(-160);

  }
  else if (cursors.right.isDown)
  {
      car.setVelocityX(SPEED);

  }
  else if (cursors.up.isDown)
  {
      car.setVelocityY(-SPEED);


  }
  else if (cursors.down.isDown)
  {
      car.setVelocityY(SPEED);

  }
  else
  {
      car.setVelocityX(0);
      car.setVelocityY(0);
  }

  if (cursors.up.isDown && car.body.touching.down)
  {
      car.setVelocityY(-SPEED);
  }
  car.body.velocity.normalize().scale(SPEED);
}
