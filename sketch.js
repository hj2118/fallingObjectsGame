// falling objects

// https://www.youtube.com/watch?v=_H9JIwWP7HQ

let character;
let charIndex;
let charHeight = [168, 140, 130, 143, 143, 135];

let ball_img, can_img, wool_img, chicken_img, fish_img, rock1_img, rock2_img;

let balls, cans, wools, chickens, fishGroup, rocks1, rocks2;

let font
let startGameText;
let howToText;

let gameStart = false;
let gameOver = false;
let howTo = false;
let chooseChar = false;

let score = 0;
let remainingTime = 60;
// let remainingTime = 10;

let duration = 10000;   // score appears for 3 seconds
let currTime;

let gameOverText;
let playAgain;

function preload() {
  font = loadFont('data/font0.otf');

  char_img = loadImage('data/character.png');
  char2_img = loadImage('data/character_2.png');
  char3_img = loadImage('data/character_3.png');
  char4_img = loadImage('data/character_4.png');
  char5_img = loadImage('data/character_5.png');
  char6_img = loadImage('data/character_6.png');

  ball_img = loadImage('data/ball.png');
  can_img = loadImage('data/can.png');
  wool_img = loadImage('data/wool.png');
  chicken_img = loadImage('data/chicken.png');
  fish_img = loadImage('data/fish.png');

  rock1_img = loadImage('data/rock1.png');
  rock2_img = loadImage('data/rock2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  startGameText = "Press ENTER to start the game!";
  chooseCharText = "Press ENTER to choose a characer";
  howToText = "Press M key to learn how to play";

  gameOverText = "GAME OVER";
  playAgain = "To play again press ENTER!";

  // https://editor.p5js.org/denaplesk2/sketches/ryIBFP_lG
  setInterval(timeDecrease, 1000);

  balls = new Group();
  cans = new Group();
  wools = new Group();
  chickens = new Group();
  fish = new Group();
  rocks1 = new Group();
  rocks2 = new Group();
}

function draw() {
  // background
  noStroke();
  fill(135, 206, 235);
  rect(0, 0, width, height - 100);
  fill(139, 69, 19);
  rect(0, height - 100, width, 100);

  if (howTo) {
    textAlign(CENTER);
    textFont(font, 32);
    text(chooseCharText, width / 2, (height - 200) / 2 - 190);
    textFont(font, 24);

    text("Use arrow keys to move your character", width / 2, (height - 200) / 2 - 120);
    text("Try to gain higher points!", width / 2, (height - 200) / 2 - 70);

    text("Points:", width / 2 - 247, (height - 200) / 2);

    textAlign(LEFT);
    image(ball_img, width / 2 - 240, (height - 200) / 2 + 30);
    text(": 30", width / 2 - 150, (height - 200) / 2 + 58)

    image(fish_img, width / 2 - 250, (height - 200) / 2 + 105);
    text(": 50", width / 2 - 150, (height - 200) / 2 + 133);

    image(chicken_img, width / 2 - 245, (height - 200) / 2 + 165);
    text(": 70", width / 2 - 150, (height - 200) / 2 + 203);

    image(can_img, width / 2 - 238, (height - 200) / 2 + 250);
    text(": 100", width / 2 - 150, (height - 200) / 2 + 283);

    image(wool_img, width / 2 + 120, (height - 200) / 2 + 70);
    text(": 200", width / 2 + 200, (height - 200) / 2 + 93)

    image(rock1_img, width / 2 + 95, (height - 200) / 2 + 130);
    text(": -200", width / 2 + 200, (height - 200) / 2 + 168);

    image(rock2_img, width / 2 + 110, (height - 200) / 2 + 205);
    text(": -100", width / 2 + 200, (height - 200) / 2 + 238);

    // chooseChar();
  }

  else if (!gameStart && chooseChar) {
    textAlign(CENTER);
    textFont(font, 24);
    text("Choose your character by pressing:", width / 2, (height - 200) / 2 - 150);

    textAlign(LEFT);
    textFont(font, 24);
    text("1:", width / 2 - 345, (height - 200) / 2 - 70);
    image(char_img, width / 2 - 285, (height - 200) / 2 - 110);
    text("2:", width / 2 - 110, (height - 200) / 2 - 70);
    image(char2_img, width / 2 - 45, (height - 200) / 2 - 110);
    text("3:", width / 2 + 125, (height - 200) / 2 - 70);
    image(char3_img, width / 2 + 195, (height - 200) / 2 - 60);
    text("4:", width / 2 - 345, (height - 200) / 2 + 160);
    image(char4_img, width / 2 - 285, (height - 200) / 2 + 140);
    text("5:", width / 2 - 110, (height - 200) / 2 + 160);
    image(char5_img, width / 2 - 40, (height - 200) / 2 + 150);
    text("6:", width / 2 + 125, (height - 200) / 2 + 160);
    image(char6_img, width / 2 + 180, (height - 200) / 2 + 165);

    if (keyWentDown('1')) {
      charIndex = 0;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 213);
      character.addImage(char_img);

      chooseChar = false;
      gameStart = true;
      gameOver = false;
    }

    else if (keyWentDown('2')) {
      charIndex = 1;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 216);
      character.addImage(char2_img);

      chooseChar = false;
      gameStart = true;
      gameOver = false;
    }

    else if (keyWentDown('3')) {
      charIndex = 2;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 87);
      character.addImage(char3_img);

      chooseChar = false;
      gameStart = true;
      gameOver = false;
    }

    else if (keyWentDown('4')) {
      charIndex = 3;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 167);
      character.addImage(char4_img);

      chooseChar = false;
      gameStart = true;
      gameOver = false;
    }
    else if (keyWentDown('5')) {
      charIndex = 4;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 143);
      character.addImage(char5_img);

      chooseChar = false;
      gameStart = true;
      gameOver = false;
    }
    else if (keyWentDown('6')) {
      charIndex = 5;
      character = createSprite(width / 2, height - charHeight[charIndex], 120, 96);
      character.addImage(char6_img);

      chooseChar = false;
      gameStart = true;
      gameOver = false;
    }
  }

  else if (!gameStart) {
    textAlign(CENTER);
    // START GAME
    textFont(font, 32);
    // text(startGame, width / 2 - 330, 200);
    text(chooseCharText, width / 2, (height - 200) / 2);

    // use arrow keys...
    textFont(font, 24);
    // text(howTo, width / 2 - 370, 250);
    text(howToText, width / 2, (height - 200) / 2 + 50);

    // chooseChar();
  }

  else if (gameOver) {
    textAlign(CENTER);
    textFont(font, 48);
    text(gameOverText, width / 2, (height - 200) / 2 - 50);

    textFont(font, 32);
    text("Score: " + score, width / 2, (height - 200) / 2);

    textFont(font, 24);
    text(playAgain, width / 2, (height - 200) / 2 + 100);
    text(howToText, width / 2, (height - 200) / 2 + 150);
    remainingTime = 60;

    // chooseChar();
  }

  else {
    chooseChar = false;

    textAlign(LEFT);
    textFont(font, 24);
    text("Time: " + remainingTime, 20, 40);
    text("Score: " + score, 20, 80);

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

    textFont(font, 24);
    if (character.collide(balls)) {
      character.overlap(balls, collect);
      score += 30;
      text("+30", character.position.x + 50, height - 200);
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
      text("+100", character.position.x + 50, height - 200);
    }

    // wool
    if (random(1) < 0.002) {
      let newWool = createSprite(random(0, width), 20, 40, 38);
      newWool.addImage(wool_img);
      newWool.addToGroup(wools);
    }

    for (let i = 0; i < wools.length; i++) {
      let aWool = wools[i];
      aWool.position.y += 9;
      if (aWool.position.y > height - 120) {
        aWool.remove();
      }
    }

    if (character.collide(wools)) {
      character.overlap(wools, collect);
      score += 200;
      text("+200", character.position.x + 50, height - 200);
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
      text("+70", character.position.x + 50, height - 200);
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
      text("+50", character.position.x + 50, height - 200);
    }

    // rock1
    if (random(1) < 0.005) {
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
      text("-200", character.position.x + 50, height - 200);
    }

    // rock2
    if (random(1) < 0.007) {
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
      text("-100", character.position.x + 50, height - 200);
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

function keyPressed() {
  console.log(keyCode);
  if (keyCode === ENTER) {
    if (!gameStart) {
      if (howTo) {
        howTo = false;
      }

      if (!chooseChar) {
        chooseChar = true;
      }
      // else if (chooseChar) {
      //   chooseChar = false;
      //   gameStart = true;
      //   gameOver = false;
      // }
    }

    else if (gameOver) {
      if (howTo) {
        howTo = false;
      }

      if (!chooseChar) {
        chooseChar = true;
      }
      gameOver = false;
      gameStart = false;

      score = 0;
      remainingTime = 60;

      // move the character to its initial position
      character.position.x = width / 2;
    }
  }

  if (keyCode === 77) { // "m" key
    if (!gameStart || gameOver) {
      howTo = true;
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
