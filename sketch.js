// falling objects

// https://www.youtube.com/watch?v=_H9JIwWP7HQ

let character;
let charIndex;
let charHeight = [168, 140, 130, 143, 143, 135];

let ball_img, can_img, wool_img, chicken_img, fish_img, rock1_img, rock2_img;

let cry1_img, cry2_img, cry3_img, cry4_img, cry5_img, cry6_img;
let cry_imgs = [];

let balls, cans, wools, chickens, fishGroup, rocks1, rocks2;

let font
let howToText;
let gameOverText;
let startGameText;

let gameStart = false;
let gameOver = false;
let howTo = false;
let chooseMode = false;
let chooseChar = false;

let gameMode = 0;

let score = 0;
let scores = [];
let remainingTime = 60;
let survivingTime = 0;

let spellTime = 300;
let slowDown = false;
let freeze = false;

let rate1 = 0.005;
let rate2 = 0.007;

let fallFaster = false;

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

  cry1_img = loadImage('data/cry1.png');
  cry2_img = loadImage('data/cry2.png');
  cry3_img = loadImage('data/cry3.png');
  cry4_img = loadImage('data/cry4.png');
  cry5_img = loadImage('data/cry5.png');
  cry6_img = loadImage('data/cry6.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  startGameText = "Press ENTER to start game";
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

  cry_imgs = [[cry1_img, 300, 100], [cry2_img, 300, 120], [cry3_img, 290, 0], [cry4_img, 300, 100], [cry5_img, 300, 70], [cry6_img, 330, 0]];
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
    text(startGameText, width / 2, (height - 200) / 2 - 190);
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
  }

  else if (!gameStart && chooseMode) {
    textAlign(CENTER);
    textFont(font, 28);
    text("Choose a game mode by pressing:", width / 2, (height - 200) / 2 - 45);

    textFont(font, 24);
    textAlign(LEFT);
    text("1: Gain a higher score in 60 seconds", width / 2 - 345, (height - 200) / 2 + 40);
    text("You will be debuffed if you collide with a rock", width / 2 - 309, (height - 200) / 2 + 90);
    text("2: Survive for a longer time, avoiding rocks", width / 2 - 345, (height - 200) / 2 + 150);
    text("Rocks will fall more often as you survive longer", width / 2 - 309, (height - 200) / 2 + 200);

    if (keyWentDown('1')) {
      gameMode = 1;
      chooseMode = false;
      chooseChar = true;
    }
    else if (keyWentDown('2')) {
      gameMode = 2;
      chooseMode = false;
      chooseChar = true;
    }
  }

  else if (!gameStart && chooseChar) {
    textAlign(CENTER);
    textFont(font, 24);
    text("Choose your character by pressing:", width / 2, (height - 200) / 2 - 150);

    textAlign(LEFT);
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

      currTime = millis();
    }

    else if (keyWentDown('2')) {
      charIndex = 1;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 216);
      character.addImage(char2_img);

      chooseChar = false;
      gameStart = true;
      gameOver = false;

      currTime = millis();
    }

    else if (keyWentDown('3')) {
      charIndex = 2;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 87);
      character.addImage(char3_img);

      chooseChar = false;
      gameStart = true;
      gameOver = false;

      currTime = millis();
    }

    else if (keyWentDown('4')) {
      charIndex = 3;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 167);
      character.addImage(char4_img);

      chooseChar = false;
      gameStart = true;
      gameOver = false;

      currTime = millis();
    }

    else if (keyWentDown('5')) {
      charIndex = 4;
      character = createSprite(width / 2, height - charHeight[charIndex], 100, 143);
      character.addImage(char5_img);

      chooseChar = false;
      gameStart = true;
      gameOver = false;

      currTime = millis();
    }
    else if (keyWentDown('6')) {
      charIndex = 5;
      character = createSprite(width / 2, height - charHeight[charIndex], 120, 96);
      character.addImage(char6_img);

      chooseChar = false;
      gameStart = true;
      gameOver = false;

      currTime = millis();
    }
  }

  else if (!gameStart) {
    textAlign(CENTER);
    // START GAME
    textFont(font, 32);
    // text(startGame, width / 2 - 330, 200);
    text(startGameText, width / 2, (height - 200) / 2);

    // use arrow keys...
    textFont(font, 24);
    // text(howTo, width / 2 - 370, 250);
    text(howToText, width / 2, (height - 200) / 2 + 50);
  }

  else if (gameOver) {
    if (gameMode === 1) {
      textAlign(CENTER);
      textFont(font, 48);
      text(gameOverText, width / 2, (height - 200) / 2 - 50);

      textFont(font, 32);
      text("Score: " + score, width / 2, (height - 200) / 2 + 25);

      textFont(font, 24);
      text(playAgain, width / 2, (height - 200) / 2 + 100);
      text(howToText, width / 2, (height - 200) / 2 + 150);
      remainingTime = 60;
    }

    else if (gameMode === 2) {
      textAlign(CENTER);
      textFont(font, 48);
      text(gameOverText, width / 2, (height - 200) / 2 - 70);

      textFont(font, 32);
      text("Score: " + score, width / 2, (height - 200) / 2 + 10);
      text("Survived Time: " + survivingTime, width / 2, (height - 200) / 2 + 60);

      textFont(font, 24);
      text(playAgain, width / 2, (height - 200) / 2 + 140);
      text(howToText, width / 2, (height - 200) / 2 + 190);
    }

    image(cry_imgs[charIndex][0], width - cry_imgs[charIndex][1], (height - 200) / 2 - cry_imgs[charIndex][2]);

  }

  else {  // game starts
    chooseChar = false;

    for (let i = 0; i < scores.length; i++) {
			let aScore = scores[i];
			aScore.update();
			aScore.display();
		}

    if (freeze) {
      textAlign(CENTER);
      textFont(font, 32);
      text("FREEZE!", width - 150, height / 2);
    }

    if (slowDown) {
      textAlign(CENTER);
      textFont(font, 32);
      text("SLOW", width - 155, (height - 200) / 2 - 25);
      text("DOWN!", width - 150, (height - 200) / 2 + 25);
    }

    if (gameMode === 1) {  // high score
      textAlign(LEFT);
      textFont(font, 24);
      text("Time: " + remainingTime, 20, 40);
      text("Score: " + score, 20, 80);

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
        scores.push(new TempScore("-200", character.position.x));
        freeze = true;
        // text("-200", character.position.x + 50, height - 200);
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
        scores.push(new TempScore("-100", character.position.x));
        slowDown = true;
        // text("-100", character.position.x + 50, height - 200);
      }

      if (slowDown) {
        spellTime -= 2;
        if (spellTime < 0) {
          slowDown = false;
          spellTime = 300;
        }
      }

      if (freeze) {
        spellTime -= 2;
        if (spellTime < 0) {
          freeze = false;
          spellTime = 300;
        }
      }

      if (remainingTime == 0) {
        gameOver = true;
        allSprites.removeSprites();
      }
    }

    else if (gameMode === 2) {  // surviving
      timeIncrease(currTime);

      textAlign(LEFT);
      textFont(font, 24);
      text("Time: " + survivingTime, 20, 40);
      text("Score: " + score, 20, 80);

      // rock1
      if ((survivingTime > 0) && (survivingTime % 20 === 0)) {
        rate1 += 0.00005;
      }

      if (random(1) < rate1) {
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
        gameOver = true;
        allSprites.removeSprites();
      }

      // rock2
      if ((survivingTime > 0) && (survivingTime % 20 === 0)) {
        rate2 += 0.00005;
      }

      if (random(1) < rate2) {
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
        gameOver = true;
        allSprites.removeSprites();
      }
    }

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
      scores.push(new TempScore("+30", character.position.x));
      // text("+30", character.position.x + 50, height - 200);
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
      scores.push(new TempScore("+100", character.position.x));
      // text("+100", character.position.x + 50, height - 200);
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
      scores.push(new TempScore("+200", character.position.x));
      // text("+200", character.position.x + 50, height - 200);
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
      scores.push(new TempScore("+70", character.position.x));
      // text("+70", character.position.x + 50, height - 200);
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
      let collidedTime = remainingTime;
      character.overlap(fish, collect);
      score += 50;
      scores.push(new TempScore("+50", character.position.x));
    }

    // game character
    if (keyDown(LEFT_ARROW)) {
      character.mirrorX(-1);
      if (slowDown) {
        character.velocity.x = -1.5;
      }

      else if (freeze) {
        character.velocity.x = 0;
      }

      else {
        character.velocity.x = -3;
      }

      // check the left edge
      if (character.position.x < 50) {
        character.velocity.x = 0;
      }
    }

    else if (keyDown(RIGHT_ARROW)) {
      character.mirrorX(1);
      if (slowDown) {
        character.velocity.x = 1.5;
      }

      else if (freeze) {
        character.velocity.x = 0;
      }

      else {
        character.velocity.x = 3;
      }

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
}

function keyPressed() {
  if (keyCode === ENTER) {
    if (!gameStart) {
      if (howTo) {
        howTo = false;
      }

      if (!chooseMode && !chooseChar) {
        chooseMode = true;
      }
    }

    else if (gameOver) {
      if (howTo) {
        howTo = false;
      }

      if (!chooseMode && !chooseChar) {
        chooseMode = true;
      }

      gameStart = false;

      score = 0;
      remainingTime = 60;
      survivingTime = 0;

      rate1 = 0.005;
      rate2 = 0.007;

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

function timeIncrease(currTime) {
  if (gameStart && !gameOver) {
    if (int((millis() - currTime) / 1000) != survivingTime) {
      survivingTime++;
    }
  }
}

function collect(collector, collected) {
  collected.remove();
}

class TempScore {
	constructor(scoreAmount, x) {
		this.amount = scoreAmount;
		this.position = createVector(x + 50, height - 200);
		this.lifespan = 100;
	}

	update() {
		this.lifespan -= 2;
	}

	display() {
		if (!this.isDead() && gameStart) {
			textFont(font, 24);
			text(this.amount, this.position.x, this.position.y);
		}
	}

	isDead() {
		if (this.lifespan < 0) {
			return true;
		}
		else {
			return false;
		}
	}
}
