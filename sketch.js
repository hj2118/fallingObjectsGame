// falling objects

// https://www.youtube.com/watch?v=_H9JIwWP7HQ

// sliding puzzle: https://thecodingtrain.com/CodingChallenges/165-slide-puzzle.html

let character;
let charIndex;
let charHeight = [168, 148, 115];

let ball_img, can_img, chicken_img, fish_img, rock1_img, rock2_img;

let balls, cans, chickens, fishGroup, rocks1, rocks2;

let font;
let startGame;
let howTo;

let gameStart = false;
let gameOver = false;

let score = 0;
// let remainingTime = 60;
let remainingTime = 10;

let gameOverText;
let playAgain;

function preload() {
  font = loadFont('data/font0.otf');

  char_img = loadImage('data/character.png');
  char2_img = loadImage('data/character_2.png');
  char3_img = loadImage('data/character_3.png');

  ball_img = loadImage('data/ball.png');
  can_img = loadImage('data/can.png');
  chicken_img = loadImage('data/chicken.png');
  fish_img = loadImage('data/fish.png');

  rock1_img = loadImage('data/rock1.png');
  rock2_img = loadImage('data/rock2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  startGame = "Press ENTER to start the game!";
  howTo = "Use arrow keys to move";

  gameOverText = "GAME OVER";
  playAgain = "To play again press ENTER!";

  // https://editor.p5js.org/denaplesk2/sketches/ryIBFP_lG
  setInterval(timeDecrease, 1000);

  balls = new Group();
  cans = new Group();
  chickens = new Group();
  fish = new Group();
  rocks1 = new Group();
  rocks2 = new Group();

  // character = createSprite(width / 2, height - 168, 100, 213);

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

    // chooseChar();
    if (keyWentDown('1')) {
      charIndex = 0;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 213);
      character.addImage(char_img);
    }
    else if (keyWentDown('2')) {
      charIndex = 1;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 213);
      character.addImage(char2_img);
    }
    else if (keyWentDown('3')) {
      charIndex = 2;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 82);
      character.addImage(char3_img);
    }
    // else {
    //   charIndex = 0;
    //   character = createSprite(width / 2, height - charHeight[charIndex], 100, 213);
    //   character.addImage(char_img);
    // }
  }

  else if (gameOver) {
    textAlign(CENTER);
    textFont(font, 48);
    text(gameOverText, width / 2, (height - 200) / 2);

    textFont(font, 32);
    text("Score: " + score, width / 2, (height - 200) / 2 + 50);

    textFont(font, 24);
    text(playAgain, width / 2, (height - 200) / 2 + 100);

    remainingTime = 10;
    // balls.removeSprites();
    // cans.removeSprites();
    // chickens.removeSprites();
    // fish.removeSprites();
    // rocks1.removeSprites();
    // rocks2.removeSprites();
    if (keyWentDown('1')) {
      charIndex = 0;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 213);
      character.addImage(char_img);
    }
    else if (keyWentDown('2')) {
      charIndex = 1;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 213);
      character.addImage(char2_img);
    }
    else if (keyWentDown('3')) {
      charIndex = 2;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 82);
      character.addImage(char3_img);
    }
    // chooseChar();
  }

  else {
    textAlign(LEFT);
    textFont(font, 18);
    text("Time: " + remainingTime, 20, 40);
    text("Score: " + score, 20, 70);

    // ball
    if (random(1) < 0.009) {
      let newBall = createSprite(random(0, width), 20, 50, 50);
      newBall.addImage(ball_img);
      newBall.addToGroup(balls);
    }

    for (let i = 0; i < balls.length; i++) {
      let aBall = balls[i];
      aBall.position.y += 2;
      if (aBall.position.y > height - 120) {
        aBall.remove();
      }
    }

    if (character.collide(balls)) {
      character.overlap(balls, collect);
      score += 30;
    }

    // can
    if (random(1) < 0.004) {
      let newCan = createSprite(random(0, width), 20, 50, 48);
      newCan.addImage(can_img);
      newCan.addToGroup(cans);
    }

    for (let i = 0; i < cans.length; i++) {
      let aCan = cans[i];
      aCan.position.y += 6;
      if (aCan.position.y > height - 120) {
        aCan.remove();
      }
    }

    if (character.collide(cans)) {
      character.overlap(cans, collect);
      score += 100;
    }

    // chicken
    if (random(1) < 0.006) {
      let newChicken = createSprite(random(0, width), 20, 70, 70);
      newChicken.addImage(chicken_img);
      newChicken.addToGroup(chickens);
    }

    for (let i = 0; i < chickens.length; i++) {
      let aChicken = chickens[i];
      aChicken.position.y += 4;
      if (aChicken.position.y > height - 120) {
        aChicken.remove();
      }
    }

    if (character.collide(chickens)) {
      character.overlap(chickens, collect);
      score += 70;
    }

    // fish
    if (random(1) < 0.008) {
      let newFish = createSprite(random(0, width), 20, 80, 40);
      newFish.addImage(fish_img);
      newFish.addToGroup(fish);
    }

    for (let i = 0; i < fish.length; i++) {
      let aFish = fish[i];
      aFish.position.y += 3;
      if (aFish.position.y > height - 120) {
        aFish.remove();
      }
    }

    if (character.collide(fish)) {
      character.overlap(fish, collect);
      score += 50;
    }

    // rock1
    if (random(1) < 0.003) {
      let newRock1 = createSprite(random(0, width), 20, 80, 59);
      newRock1.addImage(rock1_img);
      newRock1.addToGroup(rocks1);
    }

    for (let i = 0; i < rocks1.length; i++) {
      let aRock1 = rocks1[i];
      aRock1.position.y += 7;
      if (aRock1.position.y > height - 120) {
        aRock1.remove();
      }
    }

    if (character.collide(rocks1)) {
      character.overlap(rocks1, collect);
      score -= 200;
    }

    // rock2
    if (random(1) < 0.005) {
      let newRock2 = createSprite(random(0, width), 20, 60, 52);
      newRock2.addImage(rock2_img);
      newRock2.addToGroup(rocks2);
    }

    for (let i = 0; i < rocks2.length; i++) {
      let aRock2 = rocks2[i];
      aRock2.position.y += 4;
      if (aRock2.position.y > height - 120) {
        aRock2.remove();
      }
    }

    if (character.collide(rocks2)) {
      character.overlap(rocks2, collect);
      score -= 100;
    }

    // game character
    if (keyDown(LEFT_ARROW)) {
      character.mirrorX(-1);
      character.velocity.x = -3;

      // check the left edge
      if (character.position.x < 50) {
        character.velocity.x = 0;
      }
    }

    else if (keyDown(RIGHT_ARROW)) {
      character.mirrorX(1);
      character.velocity.x = 3;

      // check the right edge
      if (character.position.x > width - 50) {
        character.velocity.x = 0;
      }
    }
    else {
      character.velocity.x = 0;
    }

    character.position.y = height - charHeight[charIndex];
    drawSprites();
  }

  if (remainingTime == 0) {
    gameOver = true;
    allSprites.removeSprites();
  }
}

function chooseChar() {
  if (keyWentDown('1')) {
    charIndex = 0;
    character = createSprite(width / 2, height - charHeight[charIndex], 100, 213);
    character.addImage(char_img);
  }
  else if (keyWentDown('2')) {
    charIndex = 1;
    character = createSprite(width / 2, height - charHeight[charIndex], 100, 213);
    character.addImage(char2_img);
  }
  else if (keyWentDown('3')) {
    charIndex = 2;
    character = createSprite(width / 2, height - charHeight[charIndex], 100, 82);
    character.addImage(char3_img);
  }
  else {
    charIndex = 0;
    character = createSprite(width / 2, height - charHeight[charIndex], 100, 213);
    character.addImage(char_img);
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
      remainingTime = 10;
      // remainingTime = 60;

      // move the character to its initial position
      character.position.x = width / 2;
    }
  }
}

function timeDecrease() {
  if (remainingTime > 0 && gameStart) {
    remainingTime--;
  }
}

function collect(collector, collected) {
  collected.remove();
}

// // https://p5js.org/examples/interaction-snake-game.html
// class Jewelry {
//   constructor() {
//     this.x = random(20, width - 20);
//     this.y = 20;
//     this.colorIndex = int(random(0, 4));
//     this.yvelocity = this.colorIndex + 2;
//     this.touchGround = false;
//     this.opacity = 100;
//   }
//
//   update() {
//     this.y += this.yvelocity;
//     if (this.y > height - 70) {
//       this.touchGround = true;
//       this.yvelocity = 0;
//     }
//   }
//
//   display() {
//     if (this.touchGround == false) {
//       fill(colorArray[this.colorIndex]);
//     }
//
//     else if (this.touchGround == true) {
//       while (this.opacity > 0) {
//         this.opacity -= 10;
//       }
//
//       if (this.colorIndex == 0) {
//         fill(0, this.opacity);
//
//       }
//       else if (this.colorIndex == 1) {
//         fill(255, this.opacity);
//       }
//       else if (this.colorIndex == 2) {
//         fill(255, 0, 0, this.opacity);
//       }
//       else {
//         fill(0, 0, 255, this.opacity);
//       }
//
//       // this.opacity = 0;
//
//       // for (let i = 0; i < 4; i++) {
//       //   opacity -= 30;
//       // }
//     }
//
//     noStroke();
//     circle(this.x, this.y, 50);
//   }
// }
//
// class Rock {
//   constructor() {
//     this.x = random(20, width - 20);
//     this.y = 20;
//     this.velocity = 4;
//     this.touchGround = false;
//   }
//
//   update() {
//     this.y += this.velocity;
//     if (this.y > height - 70) {
//       this.touchGround = true;
//       this.velocity = 0;
//     }
//   }
//
//   display() {
//     if (this.touchGround == false) {
//       fill(127);
//     }
//
//     // else if (this.touchGround == true) {
//     else {
//       fill(127, 0);
//     }
//
//     noStroke();
//     triangle(this.x, this.y, this.x - 20, this.y + 40, this.x + 20, this.y + 40);
//   }
// }
