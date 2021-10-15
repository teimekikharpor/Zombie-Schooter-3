var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombieImg,zombie;
var bulletsImg;bullets;
var instruction;
var gameState = instruction;
var PLAY=1;
var END = 0;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletsImg = loadImage("assets/108718-middle.png")
  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
 
  

//creating the player sprite
bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1 
   
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300);

   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();

  }

function draw() {
  background(0); 



if(gameState === 1){
 
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullets();
  player.addImage(shooter_shooting)
  
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
} 

if(zombieGroup.isTouching(player)){
    gameState===0;

  
 }
enemy();
drawSprites();
}  

 
   else if (gameState === 0) {
   console.log("end");
   for(var i=0;i<zombieGroup.length;i++){     
       
    if(zombieGroup[i].isTouching(player)){
         zombieGroup[i].destroy()
         } 
   }
  }

  if (gameState === instruction) {
  
    
  
    stroke("red");
    fill("black");
    textFont("trebuchetMS")
    textSize(50);
    text("------------", canvas.width / 2 - 300, canvas.height / 2 - 300);
    text("ENJOY THE GAME!", canvas.width / 2 - 300, canvas.height / 2 + 100);
      stroke("yellow");
      fill("yellow");
      textSize(35);
      textFont("Apple Chancery");
  
  
    if (keyDown("s")) {
      gameState = 1;
    }
  }




}

function enemy(){
if(frameCount%50===0){
  zombie=createSprite(1500,random(50,1300),40,40);
  zombie.addImage(zombieImg);
  zombie.velocityX=-3;
  zombie.scale = 0.15
  zombie.lifetime = 400
   zombieGroup.add(zombie)
}
}


function bullets(){
  bullet = createSprite(displayWidth-1150,displayHeight-300,30,20);
  bullet.shapeColor="red";
  bullet.velocityX=6;
  //bullet.addImage(bulletsImg);
  bullet.y = player.y;
  bullet.depth=player.depth;
  player.depth+=1;
  //bullet.scale=0.5;
}