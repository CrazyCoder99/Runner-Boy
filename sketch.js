var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running, boy_collided;
var ground, invisibleGround, groundImage;

var obstacle, obstacleImg;

var score;

var gameOver;

var restart;
var restartImage;




function preload(){
    boy_running = loadAnimation("boy_running.gif");
    boy_collided = loadAnimation("boy_collided.png");
  
    groundImage = loadImage("ground1.png");

    obstacleImg = loadImage("obstacle.png");

    restartImage = loadImage("restart.png");
}

function setup() {
    createCanvas(600, 200);

    boy = createSprite(50,80,20,50);
    boy.addAnimation("boy_running", boy_running);
    boy.addAnimation("boy_collided", boy_collided)
    boy.scale = 0.3;

    ground = createSprite(0,180,400,20);
    ground.addImage(groundImage);
    ground.x = ground.width /2;

    invisibleGround = createSprite(200,100,400,10);
    invisibleGround.visible = false;

    obstaclesGroup = createGroup();

    boy.setCollider("circle",0,0,45);

    restart = createSprite(300, 140);
    restart.addImage(restartImage);
    restart.scale = 0.1
    restart.visible = false

    score = 0;
 
}

function draw() {
    background(180);

    text("Score: "+ score, 500,50);


    if(gameState === PLAY){
        
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);
        
        if (ground.x < 200){
          ground.x = ground.width/2;
        }

        boy.scale=0.3

        restart.visible=false;
        
        
        if(keyDown("space") && boy.y >=80) {
            boy.velocityY = -13;
        }
        
        spawnObstacle();
        
        boy.velocityY = boy.velocityY + 0.8

        


        if(obstaclesGroup.isTouching(boy)){
            gameState = END;
        }
      }
       else if (gameState === END) {
        ground.velocityX = 0;
        boy.changeAnimation("boy_collided", boy_collided);
        boy.scale = 0.2;
         obstaclesGroup.setVelocityXEach(0);
         obstaclesGroup.setLifetimeEach(-1);

         if(mousePressedOver(restart)) {
            reset();
          }

         text("Game Over!", 300, 100);
         restart.visible = true;
 
    }


    boy.collide(invisibleGround);

    

    


    drawSprites();
}


function spawnObstacle(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(550,100,10,40);
      obstacle.addImage(obstacleImg);
      obstacle.scale = 0.20;
      
      obstacle.velocityX = -(6 + 3*score/100);
                
       obstacle.lifetime = 300;
      
       obstaclesGroup.add(obstacle);
    }
   }

function reset(){
    gameState = PLAY;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    
    
    boy.changeAnimation("boy_running",boy_running);
    
   score = 0;
    
  }