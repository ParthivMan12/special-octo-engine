let dino;
let attacks = [];
let ground;
let dinoImg, dino_inde_image, longBoneImg, shortBoneImg, mediumBoneImg, groundImg, dino_deadImg;
let papyMusic, deadSong, indeSong, nggyuSong, sannessTheme, hardIntro;
let playerHP = 200;
let score;
let attacks_given = 0;
let level = 0;
let difficulty = 'Easiest';
let gamestate = 0
let hitsound;
let sans, sans_image, sans_atk, sans_next, sanness, gameTitle_image;
let buttonbegin, buttonbegin_image;
let buttontry, buttontry_image;
let sannessOnStage, lastPlayerHP;
let currentSong;

function preload() {
  dinoImg = loadImage('Blue.png');
  longBoneImg = loadImage('attack_long_bone.png');
  shortBoneImg = loadImage('attack_short_bone.png');
  mediumBoneImg = loadImage('attack_medium_bone.png');
  groundImg = loadImage('background.png');
  dino_deadImg = loadImage('Blue_Dead.png')
  dino_inde_image = loadImage('Orange.png')
  gameTitle_image = loadImage('game_title.png')
  
  sannessTheme = loadSound('sannessThene.mp3')
  papyMusic = loadSound('papyMus.mp3');
  deadSong = loadSound('DeadSong.mp3');
  indeSong = loadSound('nationalAnthem.mp3');
  nggyuSong = loadSound('neverGonna.mp3')
  hardIntro = loadSound('hardIntro.mp3');
  metrikSong = loadSound('Hi739.mp3')

  hitsound = loadSound('hitsound.wav');

  sans_image = loadImage('sans_normal.png');
  sans_atk = loadImage('sans_eye_blue.png');
  sans_next = loadImage('sans_hellifiknow.png')
  sanness = loadImage('SANES.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  dino = new Dino();
  ground = new Ground();

  sans = createSprite(width / 2, height / 3)
  sans.addImage(sans_image)

  currentSong = papyMusic;
  currentSong.setVolume(0.5);
  currentSong.play();
  currentSong.loop();
}

function changeMusic(newMusic) {
  if (newMusic === " ") {
    console.log("Music types")
    console.log("Deltarune - Megaloviana KEYCODE = DELTA")
    console.log("Metrik - HI - KEYCODE = HI")
    console.log("Sanness - Pain - KEYCODE = SANES")
    console.log('Wait, why are you here?')
    console.log('Fuck off.')
  }
  if (newMusic == 'DELTA') {
    console.log('Activated music DELTA')
    currentSong.stop();
    currentSong = papyMusic;
    currentSong.play();
  }

  if (newMusic == 'SANES') {
    console.log('Activated music SANES')
    currentSong.stop()
    currentSong = sannessTheme;
    currentSong.play()
  }

  if(newMusic == 'HI') {
    console.log('Activated music HI')
    currentSong.stop();
    currentSong = metrikSong;
    currentSong.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  drawSprites();

  if(gamestate = 1) {
    dino.update();
    dino.display();

    score = Math.round(frameCount);

    lastPlayerHP = playerHP;

    ground.display();

    textSize(20);
    fill(255);
    text(`Player HP: ${playerHP}`, width / 70, height / 20);

    textSize(20);
    fill(255);
    text(`Score: ${score}`, width / 2.15, height / 20);

    textSize(20);
    fill(255);
    text(`Difficulty: ${difficulty}`, width / 1.3, height / 20);

    if(level === 0) {
      if (frameCount % 50 === 0) {
        let randomAttack = Math.floor(random(3));
        sans.addImage(sans_atk)
        attacks.push(new Attack(randomAttack));
        attacks_given += 1
        setTimeout(() => {
          sans.addImage(sans_image)
        }, "1000");
        difficulty = 'Easiest'
      }
    }
    else if (level === 1) {
      if (frameCount % 40 === 0) {
        let randomAttack = Math.floor(random(3));
        sans.addImage(sans_atk)
        attacks.push(new Attack(randomAttack));
        attacks_given += 1
        setTimeout(() => {
          sans.addImage(sans_image)
        }, "800")
        difficulty = 'Easy'
      } 
    }
    else if (level === 2) {
      if (frameCount % 30 === 0) {
        let randomAttack = Math.floor(random(3));
        sans.addImage(sans_atk)
        attacks.push(new Attack(randomAttack));
        attacks_given += 1
        setTimeout(() => {
          sans.addImage(sans_image)
        }, "600")
        difficulty = 'Medium'
      }
    }
    else if (level === 3) {
      if (frameCount % 20 === 0) {
        let randomAttack = Math.floor(random(3));
        sans.addImage(sans_atk)
        attacks.push(new Attack(randomAttack));
        attacks_given += 1
        setTimeout(() => {
          sans.addImage(sans_image)
        }, "400")
        difficulty = 'Hard'
      }
    }
    else if (level === 4) {
      if (frameCount % 10 === 0) {
        let randomAttack = Math.floor(random(3));
        sans.addImage(sanness)
        changeMusic('SANES')
        attacks.push(new Attack(randomAttack));
        attacks_given += 1
        difficulty = 'Hardest'
      }
    }
    else if (level === 5) {
      if(frameCount % 5 === 0) {
        let randomAttack = Math.floor(random(3));
        sans.addImage(sanness)
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

    if(attacks_given === 50) {
      level = 1
      sans.addImage(sans_next)
      setTimeout(() => {
        sans.addImage(sans_image)
      }, "1000")
    }
    else if(attacks_given === 100) {
      level = 2
      sans.addImage(sans_next)
      setTimeout(() => {
        sans.addImage(sans_image)
      }, "1000")
    }
    else if(attacks_given === 150) {
      level = 3
      sans.addImage(sans_next)
      setTimeout(() => {
        sans.addImage(sans_image)
      }, "1000")
    }
    else if(attacks_given === 200) {
      level = 4
      sans.addImage(sans_next)
      setTimeout(() => {
        sans.addImage(sanness)
      }, "1000")
      sannessOnStage = true
    }
    else if(attacks_given === 400) {
      level = 5
      sans.addImage(sans_next)
      setTimeout(() => {
        sans.addImage(sanness)
      }, "1000")
    }
    if(playerHP === 0) {
      gameOver();
    }
      
    attacks = attacks.filter(attack => !attack.isOffscreen());
  }
};

function keyPressed() {
  if (keyCode === UP_ARROW && dino.isOnGround()) {
    dino.jump();
  }
}

function independenceDay() {
  dino.independeceDay();
  papyMusic.stop();
}

function stopAttacks() {
  attacks = []
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
  sannessTheme.stop();
  papyMusic.stop();
  if(sannessOnStage == true) {
    nggyuSong.play()
  }
  else {
    deadSong.play();
    deadSong.loop();
  }
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