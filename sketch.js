let dino;
let attacks = [];
let ground;
let dinoImg, dino_inde_image, longBoneImg, shortBoneImg, mediumBoneImg, groundImg, dino_deadImg;
let papyMusic, deadSong, indeSong;
let playerHP = 100;
let score;
let attacks_given = 0;
let level = 0;
let difficulty;
let hitsound;


function preload() {
  dinoImg = loadImage('Blue.png');
  longBoneImg = loadImage('attack_long_bone.png');
  shortBoneImg = loadImage('attack_short_bone.png');
  mediumBoneImg = loadImage('attack_medium_bone.png');
  groundImg = loadImage('background.png');
  dino_deadImg = loadImage('Blue_Dead.png')
  dino_inde_image = loadImage('Orange.png')

  savedHighScore = loadStrings('data/highscores.txt');

  papyMusic = loadSound('papyMus.mp3');
  deadSong = loadSound('DeadSong.mp3');
  indeSong = loadSound('nationalAnthem.mp3');

  hitsound = loadSound('hitsound.wav');
}

function setup() {
  createCanvas(800, 400);
  dino = new Dino();
  ground = new Ground();

  papyMusic.play();
  papyMusic.setVolume(0.5);
  papyMusic.loop();

  score = 0
}

function draw() {
  background(240);

  dino.update();
  dino.display();

  score = score + Math.round(frameCount/60);

  ground.display();

  console.log(attacks_given);

  textSize(20);
  fill(255);
  text(`Player HP: ${playerHP}`, 20, 30);

  textSize(20);
  fill(255);
  text(`Score: ${score}`, 680, 30);

  textSize(20);
  fill(255);
  text(`Difficulty: ${difficulty}`, 320, 30);

  if(level === 0) {
    if (frameCount % 50 === 0) {
      let randomAttack = Math.floor(random(3));
      attacks.push(new Attack(randomAttack));
      attacks_given += 1
      difficulty = 'Easiest'
    }
  }
  else if (level === 1) {
    if (frameCount % 40 === 0) {
      let randomAttack = Math.floor(random(3));
      attacks.push(new Attack(randomAttack));
      attacks_given += 1
      difficulty = 'Easy'
    }
  }
  else if (level === 2) {
    if (frameCount % 30 === 0) {
      let randomAttack = Math.floor(random(3));
      attacks.push(new Attack(randomAttack));
      attacks_given += 1
      difficulty = 'Medium'
    }
  }
  else if (level === 3) {
    if (frameCount % 20 === 0) {
      let randomAttack = Math.floor(random(3));
      attacks.push(new Attack(randomAttack));
      attacks_given += 1
      difficulty = 'Hard'
    }
  }
  else if (level === 4) {
    if (frameCount % 10 === 0) {
      let randomAttack = Math.floor(random(3));
      attacks.push(new Attack(randomAttack));
      attacks_given += 1
      difficulty = 'IMPOSSIBLE (GODIENERD)'
    }
  }

  for (let attack of attacks) {
    attack.update();
    attack.display();

    if (dino.hits(attack)) {
      playerHP -= 10;
      attacks.splice(attacks.indexOf(attack), 1);
      hitsound.play()
    }
  }

  if(attacks_given === 100) {
    level = 1
  }
  else if(attacks_given === 200) {
    level = 2
  }
  else if(attacks_given === 300) {
    level = 3
  }
  else if(attacks_given === 500) {
    level = 4
  }
  if(playerHP === 0) {
    gameOver();
  }

  attacks = attacks.filter(attack => !attack.isOffscreen());
}

function keyPressed() {
  if (keyCode === UP_ARROW && dino.isOnGround()) {
    dino.jump();
  }
}

function independenceDay() {
  dino.independeceDay();
  papyMusic.stop();
}

function gameOver() {
  background(0);
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("You Died", width / 2, height / 2);
  noLoop();
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Your Score: " + score, width / 4, height / 2);
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Last Difficulty: " + difficulty, width / 2, height / 4);
  noLoop();
  papyMusic.stop();
  deadSong.play();
  deadSong.loop();
  

}
class Dino {
  constructor() {
    this.x = 50;
    this.y = height - 50;
    this.gravity = 1;
    this.velocity = 0;
  }

  display() {
    image(dinoImg, this.x - 25, this.y - 25, 50, 50);
  }

  jump() {
    if (this.isOnGround()) {
      this.velocity = -20;
    }
  }

  independeceDay() {
    image(dino_inde_image, this.x - 25, this.y - 25, 50, 50);
    indeSong.play()
    setTimeout(() => {
      image(dinoImg, this.x - 25, this.y - 25, 50, 50);
      papyMusic.play()
    }, "61000");
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height - 50) {
      this.y = height - 50;
      this.velocity = 0;
    }
  }

  isOnGround() {
    return this.y === height - 50;
  }

  hits(attack) {
    let d = dist(this.x, this.y, attack.x, attack.y);
    return d < 25; // Assuming player radius is 25
  }
}

class Attack {
  constructor(attackType) {
    this.x = width;
    this.y = height - 50;
    this.size = 40;
    this.speed = 30;
    this.attackType = attackType;
    this.lifetime = 50
  }

  display() {
    let attackImg;
    if (this.attackType === 0) {
      attackImg = longBoneImg;
      this.y = height - 120;
    } else if (this.attackType === 1) {
      attackImg = shortBoneImg;
    } else if (this.attackType === 2) {
      attackImg = mediumBoneImg;
      this.y = height - 80;
    }
    image(attackImg, this.x - this.size / 2, this.y - this.size / 2);
  }
  
  update() {
    this.x -= this.speed;
  }

  isOffscreen() {
    return this.x + this.size < 0;
  }
}

class Ground {
  constructor() {
    this.y = height - 20;
  }

  display() {
    image(groundImg, 0, this.y, width, 20);
  }
}
