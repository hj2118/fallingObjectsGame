// falling objects

// all sound effects are from freesound.org

// game character
let character;
let charIndex = 6;  // initializes to 6 if the character is not chosen, since there are 6 characters available
let chars = []; // will store images of the characters and their heights

// images
let ball_img, can_img, wool_img, chicken_img, fish_img, rock1_img, rock2_img;
let cry1_img, cry2_img, cry3_img, cry4_img, cry5_img, cry6_img;
let cry_imgs = [];
let cup_img;

// groups that store the items created
let balls, cans, wools, chickens, fishGroup, rocks1, rocks2;

// texts
let playAgainText, howToText, gameOverText, startGameText;
let font;

// boolean variables that control the entire game
let gameStart = false;
let gameOver = false;
let howTo = false;
let chooseMode = false;
let chooseChar = false;
let ready = false;
let start = false;
let first = true;

// a variable to store the mode of game
let gameMode = 0;

// scores
let score = 0;
let scores = [];

// times
let remainingTime = 61;
let survivingTime = 0;
let readyTime = 3;
let startTime = 100;
let buffTime = 300;
let invincibleTime = 500;
let currTime;

// buffs
let slowDown = false;
let speedUp = false;
let freeze = false;
let invincible = false;

// rates of rocks falling
let rate1 = 0.005;
let rate2 = 0.007;

// sounds
let wool_sound, rock_sound, otherItem_sound, start_sound, gameOver_sound, select_sound;


// preloads the font and images
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

  cup_img = loadImage('data/cup.png');

  wool_sound = loadSound('data/592346__axilirate__collect-crystal.wav');
  rock_sound = loadSound('data/524312__bertsz__rock-destroy.wav');
  otherItem_sound = loadSound('data/135936__bradwesson__collectcoin.wav');
  start_sound = loadSound('data/243020__plasterbrain__game-start.ogg');
  gameOver_sound = loadSound('data/266163__plasterbrain__pacman-is-dead.wav');
  select_sound = loadSound('data/608432__plasterbrain__pokemon-ui-select-enter.flac');
}

function setup() {
  // createCanvas(windowWidth - 20, windowHeight - 20);
  createCanvas(windowWidth, windowHeight);
  background(255);

  startGameText = "Press ENTER to start game";
  howToText = "Press M key to learn how to play";

  gameOverText = "GAME OVER";
  playAgainText = "To play again press ENTER!";

  // https://editor.p5js.org/denaplesk2/sketches/ryIBFP_lG
  // time decreases in every second
  setInterval(timeDecrease, 1000);
  setInterval(readyTimeDec, 1000);

  // initializes the groups to store falling items created
  balls = new Group();
  cans = new Group();
  wools = new Group();
  chickens = new Group();
  fish = new Group();
  rocks1 = new Group();
  rocks2 = new Group();

  // an array that stores images and the values needed to display the images
  // since the size of the images are all different
  chars = [[char_img, 168], [char2_img, 140], [char3_img, 130], [char4_img, 143], [char5_img, 143], [char6_img, 135]];
  cry_imgs = [[cry1_img, 300, 100], [cry2_img, 300, 120], [cry3_img, 290, 0], [cry4_img, 300, 100], [cry5_img, 300, 70], [cry6_img, 330, 0]];
}

function draw() {
  // background
  noStroke();
  fill(135, 206, 235);
  rect(0, 0, width, height - 100);  // skyblue
  fill(139, 69, 19);
  rect(0, height - 100, width, 100);  // brown

  // how to guide is displayed
  if (howTo) {
    textAlign(CENTER);
    textFont(font, 32);

    if (first) {  // if it is a first game, where the data from the previous game does not exist
      text(startGameText, width / 2, (height - 200) / 2 - 170);
      textFont(font, 24);
      text("Use arrow keys to move your character", width / 2, (height - 200) / 2 - 90);
    }

    else {
      text(startGameText, width / 2, (height - 200) / 2 - 190);
      text("Press N key to choose again", width / 2, (height - 200) / 2 - 140);

      textFont(font, 24);
      text("Use arrow keys to move your character", width / 2, (height - 200) / 2 - 70);
    }

    textAlign(LEFT);
    text("Points / Buffs:", width / 2 - 350, (height - 200) / 2);

    // images of the items and their points
    image(ball_img, width / 2 - 240, (height - 200) / 2 + 30);
    text(": 30", width / 2 - 150, (height - 200) / 2 + 58)

    image(fish_img, width / 2 - 250, (height - 200) / 2 + 105);
    text(": 50", width / 2 - 150, (height - 200) / 2 + 133);

    image(chicken_img, width / 2 - 245, (height - 200) / 2 + 165);
    text(": 70", width / 2 - 150, (height - 200) / 2 + 203);

    image(can_img, width / 2 - 238, (height - 200) / 2 + 250);
    text(": 100", width / 2 - 150, (height - 200) / 2 + 283);

    image(wool_img, width / 2 + 70, (height - 200) / 2 + 70);
    text(": 200, SPEED UP", width / 2 + 150, (height - 200) / 2 + 93)

    image(rock1_img, width / 2 + 45, (height - 200) / 2 + 130);
    text(": -200, FREEZE", width / 2 + 150, (height - 200) / 2 + 168);

    image(rock2_img, width / 2 + 60, (height - 200) / 2 + 205);
    text(": -100, SLOW DOWN", width / 2 + 150, (height - 200) / 2 + 238);
  }

  // choosing mode screen is displayed
  else if (!gameStart && chooseMode) {
    textAlign(CENTER);
    textFont(font, 28);
    text("Choose a game mode by pressing:", width / 2, (height - 200) / 2 - 140);

    // description of each mode
    textFont(font, 24);
    textAlign(LEFT);
    text("1: Gain a higher score in 60 seconds", width / 2 - 345, (height - 200) / 2 - 55);
    text("You will be debuffed if you collide with a rock", width / 2 - 309, (height - 200) / 2 - 5);
    text("2: Gain a higher score, avoiding rocks", width / 2 - 345, (height - 200) / 2 + 55);
    text("Rocks will fall more often as you survive longer", width / 2 - 309, (height - 200) / 2 + 105);
    text("3: Survive for a longer time, avoiding rocks", width / 2 - 345, (height - 200) / 2 + 165);
    text("Rocks will fall more often as you survive longer", width / 2 - 309, (height - 200) / 2 + 215);

    // if the user preeses either of 1, 2, or 3 key to choose the mode
    // move to the screen where the user has to choose the game character
    if (keyWentDown('1')) {
      gameMode = 1;
      modeChosen();
    }

    else if (keyWentDown('2')) {
      gameMode = 2;
      modeChosen();
    }

    else if (keyWentDown('3')) {
      gameMode = 3;
      modeChosen();
    }
  }

  // images of the game characters available are displayed and the user can choose
  else if (!gameStart && chooseChar) {
    textAlign(CENTER);
    textFont(font, 24);
    text("Choose your character by pressing:", width / 2, (height - 200) / 2 - 150);

    // displaying the images
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

    // sets charIndex to create the game character, based on the key pressed
    if (keyWentDown('1')) {
      charIndex = 0;
    }

    else if (keyWentDown('2')) {
      charIndex = 1;
    }

    else if (keyWentDown('3')) {
      charIndex = 2;
    }

    else if (keyWentDown('4')) {
      charIndex = 3;
    }

    else if (keyWentDown('5')) {
      charIndex = 4;
    }
    else if (keyWentDown('6')) {
      charIndex = 5;
    }

    // if the character is chosen, create the character sprite by calling displayChar() function
    // also initializes variables needed
    if (charIndex != 6) {
      select_sound.play();
      displayChar(charIndex);
      ready = true;

      initialize();
    }
  }

  // initial screen
  else if (!gameStart) {
    textAlign(CENTER);
    textFont(font, 32);
    text(startGameText, width / 2, (height - 200) / 2);

    textFont(font, 24);
    text(howToText, width / 2, (height - 200) / 2 + 50);
  }

  // game over screen
  else if (gameOver) {
    textAlign(CENTER);
    textFont(font, 48);
    text(gameOverText, width / 2, (height - 200) / 2 - 50);

    textFont(font, 24);
    text(playAgainText, width / 2, (height - 200) / 2 + 100);
    text(howToText, width / 2, (height - 200) / 2 + 150);
    text("Press N key to choose again", width / 2, (height - 200) / 2 + 200);

    // printing out the results: score or survived time
    textFont(font, 32);
    fill(139, 69, 19);

    if ((gameMode === 1) || (gameMode === 2)) {
      text("Score: " + score, width / 2, (height - 200) / 2 + 25);
      remainingTime = 61;
    }

    else if (gameMode === 3) {
      text("Survived Time: " + survivingTime, width / 2, (height - 200) / 2 + 25);
    }

    // displaying the game character with a crying face
    image(cry_imgs[charIndex][0], width - cry_imgs[charIndex][1], (height - 200) / 2 - cry_imgs[charIndex][2]);

    // displaying the items falling out of the cup
    image(cup_img, 100, (height - 200) / 2 - 120);
    image(wool_img, 200, (height - 200) / 2 - 35);
    image(can_img, 210, (height - 200) / 2 + 10);
    image(chicken_img, 220, (height - 200) / 2 + 70);
    image(fish_img, 230, (height - 200) / 2 + 145);
    image(ball_img, 250, (height - 200) / 2 + 195);

    // remove all the temporary scores
    for (let i = 0; i < scores.length; i++) {
      scores[i].dead = true;
    }
  }

  // game starts
  else {
    chooseChar = false;

    // diplays the points gained or loosed whenever the character collides with items
    for (let i = 0; i < scores.length; i++) {
			let aScore = scores[i];
			aScore.update();
			aScore.display();
		}

    // notifies any buff in effect on the right side of the screen
    textAlign(CENTER);
    textFont(font, 32);
    fill(139, 69, 19, buffTime);

    if (freeze) {
      text("FREEZE!", width - 150, (height - 200) / 2 + 50);
    }

    if (slowDown) {
      text("SLOW", width - 150, (height - 200) / 2 + 25);
      text("DOWN!", width - 150, (height - 200) / 2 + 75);
    }

    if (speedUp) {
      text("SPEED", width - 150, (height - 200) / 2 + 25);
      text("UP!", width - 150, (height - 200) / 2 + 75);
    }

    if (invincible) {
      text("INVINCIBLE", width - 150, (height - 200) / 2 + 50);

      noStroke();
      fill(127, 50);
      rect(0, 0, width, height);
    }

    // 3 seconds until the game starts to get ready
    if (ready) {
      // displays countdown
      textAlign(CENTER);
      textFont(font, 64);
      fill(139, 69, 19);
      text(readyTime, width / 2, (height - 100) / 2);

      // if 3 seconds passed
      if (readyTime === 0) {
        start = true;
        ready = false;

        start_sound.play();
      }
    }

    // display the START! after 3 seconds (ready)
    else if (start) {
      startTime -= 2;

      if (startTime < 0) {
        start = false;
        ready = false;
        startTime = 100;
        readyTime = 3;
      }

      textAlign(CENTER);
      textFont(font, 64);
      fill(139, 69, 19);
      text("START!", width / 2, (height - 100) / 2);
      currTime = millis();
    }

    // after the 3 seconds of getting ready, finally the game begins
    else {
      first = false;  // stores if it is the first game

      // if game mode 1 was selected
      // gaining a high score in 60 seconds
      // if collides with:
        // rock1: freeze
        // rock2: slow down
        // wool: speed up
      if (gameMode === 1) {  // high score
        // displaying the remaining time and the current score
        textAlign(LEFT);
        textFont(font, 24);
        fill(139, 69, 19);
        text("Time: " + remainingTime, 20, 40);
        text("Score: " + score, 20, 80);

        // rocks falling randomly
        rocks(gameMode);

        // more rocks falling
        if ((survivingTime === 20) || (survivingTime === 40)) {
          moreRock(gameMode);
        }

        timeIncrease(currTime);

        // displaying the time left until more rocks to fall
				if (remainingTime > 19) {
					textAlign(RIGHT);
					textFont(font, 24);
					text("Until More Rocks: " + (20 - (survivingTime % 20)), width - 20, 40);
				}
        if ((remainingTime === 30)) {
          invincible = true;
        }

        // buffs
        // slowDown buff
        if (slowDown) {
          buffTime -= 2;

          if (buffTime < 0) {
            slowDown = false;
            buffTime = 300;
          }
        }

        // freeze buff
        if (freeze) {
          buffTime -= 2;

          if (buffTime < 0) {
            freeze = false;
            buffTime = 300;
          }
        }

        // if there is no time remaining, the game is over
        if (remainingTime == 0) {
          gameOver = true;

          gameOver_sound.play();

          allSprites.removeSprites(); // every sprite on the screen is removed

          buffTime = 0; // to remove the buff text on the right
        }
      }

      // if second or third game mode
      // the rates of rocks falling increase every 15 seconds
      else if ((gameMode === 2) || (gameMode === 3)) {
        // displaying the score or time played at the top left corner
        textAlign(LEFT);
        textFont(font, 24);
        fill(139, 69, 19);

        if (gameMode === 2) {
          text("Score: " + score, 20, 40);
        }

        else if (gameMode === 3) {
          text("Time: " + survivingTime, 20, 40);
        }

        // displaying the time left until more rocks to fall
        textAlign(RIGHT);
        textFont(font, 24);
        text("Until More Rocks: " + (15 - (survivingTime % 15)), width - 20, 40);

        // increasing the survivingTime eac second
        // currTime is in milliseconds
        timeIncrease(currTime);

        // increasing the rates of rocks falling every 15 seconds
        // displaying the text "MORE ROCKS!" to notify it
        if ((survivingTime > 0) && (survivingTime % 15 === 0)) {
          moreRock(2);
        }

        if ((survivingTime > 0) && (survivingTime % 20 === 0)) {
          invincible = true;
        }

        rocks(gameMode);
      }

      // if first or second game mode
      // items for points fall
      if (gameMode != 3) {
        items();

        // speedUp buff is on
        if (speedUp) {
          buffTime -= 2;

          if (buffTime < 0) {
            speedUp = false;
            buffTime = 300;
          }
        }
      }

      // the character becomes invincible - cannot be hit by rocks
      if (invincible) {
        invincibleTime -= 2;

        if (invincibleTime < 0) {
          invincible = false;
          invincibleTime = 500;
        }
      }

      // game character
      // the character moves to the left
      if (keyDown(LEFT_ARROW)) {
        // changes the direction of the image
        character.mirrorX(-1);

        // if slowDown buff is on (collides with rock2)
        if (slowDown) {
          character.velocity.x = -1.5;
        }

        // if speedUp buff is on (wool)
        else if (speedUp) {
          character.velocity.x = - 4.5;
        }

        // if freeze buff is on (rock1)
        else if (freeze) {
          character.velocity.x = 0;
        }

        // normal state
        else {
          character.velocity.x = -3;
        }

        // check the left edge so that the character does not go off the screen
        if (character.position.x < 50) {
          character.velocity.x = 0;
        }
      }

      // the character moves to the right
      else if (keyDown(RIGHT_ARROW)) {
        // changes the direction
        character.mirrorX(1);

        // if slowDown buff is on (collides with rock2)
        if (slowDown) {
          character.velocity.x = 1.5;
        }

        // if speedUp buff is on (wool)
        else if (speedUp) {
          character.velocity.x = 4.5;
        }

        // if freeze buff is on (rock1)
        else if (freeze) {
          character.velocity.x = 0;
        }

        // normal state
        else {
          character.velocity.x = 3;
        }

        // check the right edge so that the character does not go off the screen
        if (character.position.x > width - 50) {
          character.velocity.x = 0;
        }
      }

      else {  // if no key is pressed, the character stays
        character.velocity.x = 0;
      }

      // fix the character's vertical position
      // character.position.y = height - charHeight[charIndex];
      character.position.y = height - chars[charIndex][1];
    }

    drawSprites();
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    // if the game has not started or the game is over
    if (!gameStart && !gameOver) {
      // if the how to play guide page was displayed
      if (howTo && first) {
        howTo = false;
      }

      // if the character has not chosen and the character page is not displayed
      // else if (!chooseMode && !chooseChar) {
      if (!chooseMode && !chooseChar) {
        chooseMode = true;
        gameOver = false;
      }
    }

    // if the game is over or the how to guide is displayed and it is not the first game
    // if it is not the first game, there are the charIndex and gameMode values from the previous game
    if (gameOver || (howTo && !first)) {
      if (howTo) {  // if the how to guide is displayed
        howTo = false;  // close it
      }

      gameStart = true;  // set the gameStart to false to allow playing again
      gameOver = false;

      // set to their initial values
      initialize();

      // not choosing character and mode again
      chooseChar = false;
      chooseMode = false;

      displayChar(charIndex);

      ready = true;

      // move the character to its initial position
      character.position.x = width / 2;
    }
  }

  if (keyCode === 77) { // "m" key
    if (!gameStart || gameOver) { // if the game has not started or is over
      howTo = true; // allows the player to display the how to guide
    }
  }

  // choosing the character and the mode again
  if (keyCode === 78) { // "n" key
    if (gameOver || howTo) {  // if the game is over or the how to guide is opened
      howTo = false;
      gameOver = false;
      gameStart = false;
      charIndex = 6;
      gameMode = 0;
      chooseMode = true;
    }
  }
}

function timeDecrease() { // the remainingTime to decrease each second
  // if the game has started and there is a remaining time
  if (remainingTime > 0 && gameStart && !ready && !start) {
    remainingTime--;  // decrement the time
  }
}

function readyTimeDec() {
  if (readyTime > 0 && ready) {
    readyTime--;
  }
}

function timeIncrease(currTime) { // time increases by 1 second
  if (gameStart && !gameOver) { // if the game is playing
    // increasing each second
    if (int((millis() - currTime) / 1000) != survivingTime) {
      survivingTime++;
    }
  }
}

// http://molleindustria.github.io/p5.play/examples/index.html?fileName=collisions2.js
// p5.play library example: "Collisions - group collisions and events functions"
function collect(collector, collected) {  // collecting the objects falling from the sky
  collected.remove();
}

// creates items falling from the sky, except for the rocks
function items() {
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

    otherItem_sound.play();

    score += 30;
    scores.push(new TempScore("+30", character.position.x));
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

    otherItem_sound.play();

    score += 100;
    scores.push(new TempScore("+100", character.position.x));
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

    wool_sound.play();

    score += 200;
    scores.push(new TempScore("+200", character.position.x));

    speedUp = true;
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

    otherItem_sound.play();

    score += 70;
    scores.push(new TempScore("+70", character.position.x));
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

    otherItem_sound.play();

    score += 50;
    scores.push(new TempScore("+50", character.position.x));
  }
}

// behavior of the rocks
function rocks(gameMode) {
  // rock1
  // creates the rock1 randomly at a random position
  if (random(1) < rate1) {
    let newRock1 = createSprite(random(0, width), 20, 80, 59);

    newRock1.addImage(rock1_img);
    newRock1.addToGroup(rocks1);
  }

  // all the rock1s fall down
  for (let i = 0; i < rocks1.length; i++) {
    let aRock1 = rocks1[i];

    aRock1.position.y += 7;

    // if the rock1 sprite reaches the ground, it is removed
    if (aRock1.position.y > height - 120) {
      aRock1.remove();
    }
  }

  // rock2
  // creates the rock2 randomly at a random position
  if (random(1) < rate2) {
    let newRock2 = createSprite(random(0, width), 20, 60, 52);

    newRock2.addImage(rock2_img);
    newRock2.addToGroup(rocks2);
  }

  // all the rock2s fall down
  for (let i = 0; i < rocks2.length; i++) {
    let aRock2 = rocks2[i];

    aRock2.position.y += 4;

    // if the rock2 sprite reaches the ground, it is removed
    if (aRock2.position.y > height - 120) {
      aRock2.remove();
    }
  }

  if (!invincible) {
    // if the character collides with rock1
    if (character.collide(rocks1)) {
      character.overlap(rocks1, collect);

      rock_sound.play();

      if (gameMode === 1) {
        // loses 200 points and displays it
        score -= 200;
        scores.push(new TempScore("-200", character.position.x));

        // the character freezes
        freeze = true;
      }

      // game modes 2 and 3
      // game is over when collides with rocks
      else {
        gameOver_sound.play();

        gameOver = true;
        allSprites.removeSprites();

        // to remove the text on the right
        buffTime = 0;
        invincibleTime = 0;
      }
    }

    // if the character collides with rock2
    if (character.collide(rocks2)) {
      character.overlap(rocks2, collect);

      rock_sound.play();

      if (gameMode === 1) {
        // loses 100 points and displays it
        score -= 100;
        scores.push(new TempScore("-100", character.position.x));

        // the character slows down
        slowDown = true;
      }

      // game modes 2 and 3
      // game is over when collides with rocks
      else {
        gameOver = true;

        gameOver_sound.play();

        allSprites.removeSprites();

        // to remove the text on the right
        buffTime = 0;
        invincibleTime = 0;
      }
    }
  }
}

function moreRock(gameMode) {
  if (gameMode == 1) {
    rate1 += 0.0001;
    rate2 += 0.0001;
  }

  else {
    rate1 += 0.0002;
    rate2 += 0.0002;
  }

  textAlign(CENTER);
  textFont(font, 32);

  fill(139, 69, 19);
  text("MORE", width - 150, (height - 200) / 2 + 25);
  text("ROCKS!", width - 150, (height - 200) / 2 + 75);
}

// if the user chose a game mode
// move to the screen to choose game character
function modeChosen() {
  select_sound.play();
  chooseMode = false;
  chooseChar = true;
}

// create a sprite for the game character after the user chooses one
function displayChar(charIndex) {
  character = createSprite(width / 2, height - chars[charIndex][1], 100, 213);
  character.addImage(chars[charIndex][0]);

  chooseChar = false;
  gameStart = true;
  gameOver = false;
}

// initializes the values
function initialize() {
  score = 0;

  remainingTime = 61;
  survivingTime = 0;

  buffTime = 300;
  invincibleTime = 500;

  rate1 = 0.005;
  rate2 = 0.007;
}
