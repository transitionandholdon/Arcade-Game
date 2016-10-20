//open strict mode.
"use strict";

/*----------------------global--------------------*/

// construct a character.
var characterLoc = function(x, y) {
  this.x = x;
  this.y = y;
};

//Array of Enemies.
var allEnemies = [];


/*----------------------Enemy Object--------------------*/

//Enemy construction.
var Enemy = function(x, y) {
    characterLoc.call(this, x, y)
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random() * 10;

};

//Enrmy update function : make enemy walk through canvas with different speed,
//and when they finished one journey to the right, will update to the left over and over.
Enemy.prototype.update = function() {

    if (this.x > 500) {
       this.x = Math.floor(Math.random() * 5) * -500;
       this.speed = Math.random() * 10;
     } else {
      this.x += this.speed ;
     }
};

//Enemy render function : draw the enemy object on canvas.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*----------------------Player Object--------------------*/

//Player construction.
var Player = function (x, y) {
  characterLoc.call(this, x, y)
  this.sprite = 'images/char-boy.png';
};

//Player update function : check the collision.
Player.prototype.update = function() {

  for (var i = 0; i < allEnemies.length; i++) {
    if (Math.abs(allEnemies[i].x - this.x) < 40
        && Math.abs(allEnemies[i].y - this.y) < 40) {
            this.x = 200;
            this.y = 300;
    }
  }
};

//Player render function : draw Player on canvas.
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player handleInput function : control the move direction of Player.
Player.prototype.handleInput = function (direction) {

  if (direction === "left") {
    if (this.x > 0) {
      this.x -= 101;
    }else{
      this.x = 200;
    }
  }
  if (direction === "right") {
    if (this.x < 400) {
      this.x += 101;
    }else{
      this.x = 200;
    }
  }
  if (direction === "up") {
    if (this.y > 100) {
      this.y -= 83;
    }else {
      this.y = 300;
    }
  }
  if (direction === "down") {
    if (this.y < 380) {
      this.y += 83;
    }else{
      this.y = 300;
    }
  }
};


/*-------------------Instantiate objects--------------------*/
// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(-50, 50);
var enemy2 = new Enemy(-5000, 50);
var enemy3 = new Enemy(-100, 200);
var enemy4 = new Enemy(-2000, 120);
var enemy5 = new Enemy(-700, 50);
var enemy6 = new Enemy(-1000, 120);
var enemy7 = new Enemy(-2000, 50);
var enemy8 = new Enemy(-1000, 200);
var enemy9 = new Enemy(-500, 200);

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);
allEnemies.push(enemy6);
allEnemies.push(enemy7);
allEnemies.push(enemy8);
allEnemies.push(enemy9);

// Place the player object in a variable called player
var player = new Player(200, 300);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
