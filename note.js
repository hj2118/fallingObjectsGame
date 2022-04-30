// falling objects

// https://www.youtube.com/watch?v=_H9JIwWP7HQ

// sliding puzzle: https://thecodingtrain.com/CodingChallenges/165-slide-puzzle.html

let character;
let colorArray = [];
let jewelries = [];
let rocks = [];

let font;
let startGame;
let howTo;

let gameStart = false;
let gameOver = false;

let score = 0;
let remainingTime = 60;

let gameOverText;
let playAgain;

function preload() {
  font = loadFont('data/font0.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  startGame = "Press ENTER to start the game!";
  howTo = "Use arrow keys to move and space bar to jump";

  gameOverText = "GAME OVER";
  playAgain = "To play again press ENTER!";

  // https://editor.p5js.org/denaplesk2/sketches/ryIBFP_lG
  setInterval(time, 1000);

  character = new Human();
  colorArray = [color(0), color(255), color(255, 0, 0), color(0, 0, 255)];
  // slower --> faster
  // lower point --> higher point
}

function draw() {
  // background
  noStroke();
  fill(135, 206, 235);
  rect(0, 0, width, height - 100);
  fill(139, 69, 19);
  rect(0, height - 100, width, 100);

  if (!gameStart) {
    textAlign(CENTER);
    // START GAME
    textFont(font, 32);
    // text(startGame, width / 2 - 330, 200);
    text(startGame, width / 2, (height - 200) / 2);

    // use arrow keys...
    textFont(font, 24);
    // text(howTo, width / 2 - 370, 250);
    text(howTo, width / 2, (height - 200) / 2 + 50);
  }

  else if (gameOver) {
    textAlign(CENTER);
    textFont(font, 48);
    text(gameOverText, width / 2, (height - 200) / 2);

    textFont(font, 32);
    text("Score: " + score, width / 2, (height - 200) / 2 + 50);

    textFont(font, 24);
    text(playAgain, width / 2, (height - 200) / 2 + 100);
  }

  else {
    textAlign(LEFT);
    textFont(font, 18);
    text("Time: " + remainingTime, 20, 40);
    text("Score: " + score, 20, 70);

    // jewelries
    if (random(1) < 0.02) {
      jewelries.push(new Jewelry());
    }

    for (let each of jewelries) {
      each.update();
      each.display();
    }

    // rocks
    if (random(1) < 0.015) {
      rocks.push(new Rock());
    }

    for (let each of rocks) {
      each.update();
      each.display();
    }

    // game character
    character.display();
    if (keyIsPressed) {
      // character.update();
      if (keyCode === LEFT_ARROW) {
        character.moveLeft();
      }

      else if (keyCode === RIGHT_ARROW) {
        character.moveRight();
      }

      // else if (keyCode === 32) {  // space bar
      //   character.jump();
      //   character.move();
      // }
    }

    if (remainingTime == 0) {
      gameOver = true;
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (!gameStart) {
      gameStart = true;
      gameOver = false;
    }
    else if (gameOver) {
      gameStart = true;
      gameOver = false;
      score = 0;
      remainingTime = 60;
    }
  }
}

function time() {
  if (remainingTime > 0 && gameStart) {
    remainingTime--;
  }
}

// https://p5js.org/examples/interaction-snake-game.html
class Human {
  constructor() {
    this.x = width / 2;
    this.y = height - 200;
    this.yvelocity = 0;
    this.gravity = 0.3;
  }

  moveRight() {
    if (this.x < width - 50) {
      this.x += 3;
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 3;
    }
  }

  // https://editor.p5js.org/slow_izzm/sketches/S19Eq1W67
  // https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_147_Chrome_Dinosaur_Game/P5
  // jump() {
  //   if (this.y == height - 200) {
  //     this.yvelocity = - 10;
  //   }
  // }
  //
  // move() {
  //   this.y += this.vy;
  //   this.vy += this.gravity;
  //   this.y = constrain(this.y, 0, height - 200);
  // }

  display() {
    fill(0);
    noStroke();
    rect(this.x, this.y, 50, 100);
  }
}

class Jewelry {
  constructor() {
    this.x = random(20, width - 20);
    this.y = 20;
    this.colorIndex = int(random(0, 4));
    this.yvelocity = this.colorIndex + 2;
    this.touchGround = false;
    this.opacity = 100;
  }

  update() {
    this.y += this.yvelocity;
    if (this.y > height - 70) {
      this.touchGround = true;
      this.yvelocity = 0;
    }
  }

  display() {
    if (this.touchGround == false) {
      fill(colorArray[this.colorIndex]);
    }

    else if (this.touchGround == true) {
      while (this.opacity > 0) {
        this.opacity -= 10;
      }

      if (this.colorIndex == 0) {
        fill(0, this.opacity);

      }
      else if (this.colorIndex == 1) {
        fill(255, this.opacity);
      }
      else if (this.colorIndex == 2) {
        fill(255, 0, 0, this.opacity);
      }
      else {
        fill(0, 0, 255, this.opacity);
      }

      // this.opacity = 0;

      // for (let i = 0; i < 4; i++) {
      //   opacity -= 30;
      // }
    }

    noStroke();
    circle(this.x, this.y, 50);
  }
}

class Rock {
  constructor() {
    this.x = random(20, width - 20);
    this.y = 20;
    this.velocity = 4;
    this.touchGround = false;
  }

  update() {
    this.y += this.velocity;
    if (this.y > height - 70) {
      this.touchGround = true;
      this.velocity = 0;
    }
  }

  display() {
    if (this.touchGround == false) {
      fill(127);
    }

    // else if (this.touchGround == true) {
    else {
      fill(127, 0);
    }

    noStroke();
    triangle(this.x, this.y, this.x - 20, this.y + 40, this.x + 20, this.y + 40);
  }
}
