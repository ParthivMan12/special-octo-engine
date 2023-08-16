let dino;
let attacks = [];
let ground;
let dinoImg, longBoneImg, shortBoneImg, mediumBoneImg, groundImg, dino_deadImg;
let papyMusic, deadSong;
let playerHP = 100;

function preload() {
  dinoImg = loadImage('Blue.png');
  longBoneImg = loadImage('attack_long_bone.png');
  shortBoneImg = loadImage('attack_short_bone.png');
  mediumBoneImg = loadImage('attack_medium_bone.png');
  groundImg = loadImage('background.png');
  dino_deadImg = loadImage('Blue_Dead.png')

  papyMusic = loadSound('papyMus.mp3');
  deadSong = loadSound('DeadSong.mp3');
}

function setup() {
  createCanvas(800, 400);
  dino = new Dino();
  ground = new Ground();

  papyMusic.play();
  papyMusic.loop();
}

function draw() {
  background(240);

  dino.update();
  dino.display();

  


  ground.display();

  textSize(20);
  fill(255);
  text(`Player HP: ${playerHP}`, 20, 30);

  if (frameCount % 50 === 0) {
    let randomAttack = Math.floor(random(3));
    attacks.push(new Attack(randomAttack));
  }

  for (let attack of attacks) {
    attack.update();
    attack.display();

    if (dino.hits(attack)) {
      playerHP -= 10;
      attacks.splice(attacks.indexOf(attack), 1);
    }
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

function gameOver() {
  background(0);
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("You Died", width / 2, height / 2);
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
