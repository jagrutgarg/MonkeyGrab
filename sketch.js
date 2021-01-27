var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score = 0;
var ground;
var survivalTime = 0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
  createCanvas(900,600);
  monkey = createSprite(100,480);
  monkey.addAnimation("running", monkey_running);  
  monkey.scale = 0.15;
  monkey.setCollider("circle",0,0,270);
  monkey.debug = false;
  ground = createSprite(450,535,2000,10);
  ground.velocityX = -4;
  FoodGroup = new Group();
  obstacleGroup = new Group();
}
function draw() {
  background(2200);
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Score : " + score,20,20);
  text("Survival Time : " + survivalTime,20,40);
  monkey.collide(ground);
  if (ground.x<20){
    ground.x = 435;
  }
  if (keyWentDown("space") && monkey.y>450){
    monkey.velocityY = -30;
  }
  monkey.velocityY = monkey.velocityY + 1.2;
  if (monkey.isTouching(obstacleGroup)){
    obstacleGroup.destroyEach();
    score = score - 2;
  }
  if (monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score = score + 1;
  }
  obstacleSpawn();
  bananaSpawn();
  drawSprites();
}
function obstacleSpawn(){
 if (frameCount % 90 === 0){
    obstacle = createSprite(800,500);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.16;
    obstacle.velocityX = -4.5;
    obstacleGroup.add(obstacle);
  }
}
function bananaSpawn(){
  if (frameCount % 100 === 0){
    banana = createSprite(800,Math.round(random(200,400)));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.13;
    banana.velocityX = -4;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}





