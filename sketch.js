let PLAY = 1;
let END = 0;
let gameState = PLAY;

let monkey, banana, rocks, jungle;
let monkeyImage, bananaImage, rocksImage, jungleImage;
let bananaGroup, rocksGroup;
let go,restart;
let goImage, restartImage;

let score = 0;

function preload(){
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  rocksImage = loadImage("stone.png");
  
  jungleImage = loadImage("jungle.jpg");
  
  goImage = loadImage("Game over.png");
  restartImage = loadImage("restart.png");
  
}

function setup() {
  createCanvas(660,400);
  
  jungle = createSprite(330,80,30,30);
  jungle.addImage(jungleImage);
  jungle.scale = 1.5;
  jungle.velocityX = -4;
  
  ground = createSprite(330,370,760,10);
  ground.visible = false;
  
  monkey = createSprite(50,320,100,100);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale = 0.15;
  
  go = createSprite(330,130);
  go.addImage(goImage);
  go.scale = 0.9;
  go.visible = false;
  
  restart = createSprite(330,250);
  restart.addImage(restartImage);
  restart.scale = 0.6;
  restart.visible = false;
  
  rocksGroup = createGroup();
  bananasGroup = createGroup();
  
}

function draw() {
  background(220);
  
  if(gameState === PLAY){
    jungle.velocityX = -(3 + 2*score/300);
    
    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
    
    spawnBananas();
    spawnRocks();

    if(keyDown("space") && monkey.y >= 280) {
      monkey.velocityY = -17;
    }
    monkey.velocityY += 0.85;
    
    if(monkey.isTouching(bananasGroup)){
      bananasGroup.destroyEach();
      score += 2;
      monkey.scale += 0.02;
    }
    
    if(monkey.isTouching(rocksGroup)){
      monkey.velocityY += 1;
      monkey.scale -= 0.06;
      rocksGroup.destroyEach();
      score -= 3;
    }
    if(monkey.scale < 0.03){
      gameState = END;
    }
  }
  else if(gameState === END){
    go.visible = true;
    restart.visible = true;
    jungle.velocityX = 0;
    monkey.velocityY = 0;
    rocksGroup.setVelocityXEach(0);
    rocksGroup.setLifetimeEach(-1);
    bananasGroup.setVelocityXEach(0);
    bananasGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  monkey.collide(ground);
  
  drawSprites();
  fill("black");
  textSize(20);
  text("Score: "+ score, 550,50);
}

function reset(){
  gameState = PLAY;
  go.visible = false;
  restart.visible = false;
  
  bananasGroup.destroyEach();
  rocksGroup.destroyEach();
  
  score = 0;
  
  monkey.scale = 0.15;
  
}

function spawnBananas(){
  if(frameCount%160 === 0){
    bananas();
  }
}

function bananas(){
  var r = Math.round(random(80,300));
  banana = createSprite(650,r,30,30);
  banana.addImage(bananaImage);
  banana.scale = 0.08;
  banana.velocityX = -(4 + 2*score/300);
  // banana.debug = true;
  banana.setCollider("rectangle",0,0,500,250);
  bananasGroup.add(banana);
}

function spawnRocks(){
  if(frameCount%280 === 0){
    rock();
  }
}

function rock(){
  rocks = createSprite(650,330,30,30);
  rocks.addImage(rocksImage);
  rocks.scale = 0.2;
  rocks.velocityX = -(4 + 2*score/300);
  rocks.lifetime = 250;
  // rocks.debug = true;
  rocks.setCollider("circle",0,20,200);
  rocksGroup.add(rocks);
}