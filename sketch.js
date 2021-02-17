var PLAY=1
var END=0
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obGroup
var score
var jungle,jungleImage
var invisibleline
var gameState=PLAY
var survivalTime=0
var bananaTaken=0

function preload(){
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png") 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage=loadImage("jungle.jpg")
}



function setup() {

  createCanvas(600,500)
  
  jungle=createSprite(500,200,250,20)
  jungle.addImage(jungleImage)
  jungle.scale=1.2
  jungle.x= jungle.width /2;
  jungle.velocityX=-3
  

  monkey=createSprite(80,380,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.2
  
  invisibleline=createSprite(0,475,1500,20)
  invisibleline.visible=false
  
  

  
  bananaGroup= new Group();
  obGroup= new Group();
}


function draw() {
if(gameState===PLAY){
  if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
  if(keyDown("space")){
    monkey.velocityY=-4
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(invisibleline)

  spawnBanana()
  spawnObstacle() 
  
   survivalTime=survivalTime+Math.round(getFrameRate()/60);
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    bananaTaken=bananaTaken+1
  }
   if(monkey.isTouching(obGroup)){
    obGroup.destroyEach();
     gameState=END
  }
  
} 
  
  else if(gameState===END){
   monkey.visible=false
    jungle.velocityX=0
    bananaGroup.destroyEach();
    jungle.visible=false
    background("black")
    
    textSize(59)
    fill("white")
    text("You lose!",200,200)
  }
  
drawSprites();
 
 
  textSize(20)
  fill("white")
  text("Survival Time :" + survivalTime,30,50)
  
  text("Banana Eaten :" + bananaTaken,400,50)
}

function spawnBanana(){
  
  if(frameCount%90===0){
    banana=createSprite(50,80,20,20)
    banana.x=Math.round(random(470,490));
    banana.y=Math.round(random(90,150))
    banana.addImage(bananaImage)
    banana.scale=0.1
    banana.velocityX=-5
    banana.lifetime=300
    bananaGroup.add(banana)
    }
}

function spawnObstacle(){
  
  if(frameCount%150===0){
    obstacle=createSprite(50,424,20,20)
    obstacle.x=Math.round(random(495,500));
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.3
    obstacle.velocityX=-5
    obstacle.lifetime=300
    obGroup.add(obstacle);
    }
}


