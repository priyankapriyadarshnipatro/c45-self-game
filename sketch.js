var bheem,croco,forest,kalia,ladoo,tiger,ground,invisibleGround,restart1;
var bheemImg,crocoImg,forestImg,ladooImg,tigerImg,kaliaImg,restart1Img;

var gameState=PLAY;
var PLAY=1;
var END=0;

var score=0;

var enemyGroup,foodGroup;

function preload(){

bheemImg=loadImage("sprites/bheem.png");
crocoImg=loadImage("sprites/croco.png");
forestImg=loadImage("sprites/forest.png");
ladooImg= loadImage("sprites/ladoo.png");
kaliaImg=loadImage("sprites/kalia.png");
tigerImg=loadImage("sprites/tiger.png");
restart1Img=loadImage("sprites/restart1.png");
}

function setup() {
  createCanvas(1350,600);
forest=createSprite(675,300,1350,600);
forest.addImage(forestImg);
forest.scale=2.85;

ground=createSprite(700,590,1400,20);
ground.visible=false;

 bheem=createSprite(60, 530, 50, 50);
bheem.addImage(bheemImg);
bheem.scale=0.5;
//bheem.debug=true;
bheem.setCollider("rectangle",0,0,200,bheem.height);


restart1=createSprite(670,300,10,10);
restart1.addImage(restart1Img);
restart1.scale=0.5;
restart1.visible= false;



enemyGroup=createGroup();
foodGroup=createGroup();

//invisibleGround=createSprite(700,580,1400,20);
//invisibleGround.visible=false;



  score=0;

  
  
}

function draw() {
  background(0);  

  

  console.log(gameState);
  


//if(gameState === PLAY){

  forest.velocityX=-3;

  if (forest.x < 0){
    forest.x =forest.width/2;
  }

  if(keyDown("space")){
    bheem.velocityY=-5;
  }

  bheem.velocityY=bheem.velocityY +1;

  spawnenemy();
  spawnFood();

  if(enemyGroup.isTouching(bheem)){
    
   // jumpSound.play();
    gameState = END;
    //dieSound.play()
  
}

if(foodGroup.isTouching(bheem)){
 // score=score+1;
 score = score + Math.round(getFrameRate()/60);
}




 // }

 else if(gameState===END){
forest.velocityX=0;
  bheem.velocityY=0;
  enemyGroup.setVelocityXEach(0);
  enemyGroup.setLifetimeEach(-1);
foodGroup.setVelocityXEach(0);
foodGroup.setLifetimeEach(-1);
restart1.visible=true;

if(mousePressedOver(restart1)){
reset ();
}


 }

  bheem.collide(ground);
  drawSprites();
  
 textSize(40);
 fill ("white")
  text("Score: "+score, 1050,100);

}

function spawnenemy(){
 if (frameCount % 130 === 0){
    var enemy = createSprite(1300,530,10,40);
    enemy.velocityX = -6;
    
     //generate random enemys
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: enemy.addImage(crocoImg);
               break;
       case 2: enemy.addImage(kaliaImg);
               break;
       case 3: enemy.addImage(tigerImg);
               break;
       
       default: break;
     }
    
     //assign scale and lifetime to the enemy           
     enemy.scale = 0.45;
     enemyGroup.lifetime = 300;
    
    //add each enemy to the group
     enemyGroup.add(enemy);

     //adjust the depth
    enemy.depth = bheem.depth;
    bheem.depth = bheem.depth + 1;
  }
}

function spawnFood(){

  if (frameCount % 70 === 0){
  food=createSprite(1350,530,10,10);
  food.addImage(ladooImg);
  food.scale=0.25;
  food.velocityX=-6;

     //adjust the depth
     food.depth = bheem.depth;
     food.depth = bheem.depth + 1;

     foodGroup.add(food);

  }
}

function reset(){
  
  gameState=PLAY;
  score=0;
  foodGroup.destroyEach();
  enemyGroup.destroyEach();
restart1.visible=false;



}
