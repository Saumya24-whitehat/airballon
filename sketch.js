var backgroundimg;
var ballon, ballonposition;
var database;
var position;
function preload(){
  backgroundimg=loadImage("images/Hot Air Ballon-01.png");
  ballonimg=loadImage("images/Hot Air Ballon-02.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);
  ballon=createSprite(250,250,10,10);
  ballon.addImage(ballonimg,"ballon img");
  ballon.scale=.35;
  ballonposition=database.ref('ballon/position');
  ballonposition.on("value", readPosition,showError);
}

function draw() {
  background(backgroundimg);
  if(position!==undefined){    
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  }
}

function readPosition(data){
  position=data.val();
  ballon.x=position.x;
  ballon.y=position.y;
}

function writePosition(x,y){
  database.ref("ballon/position").set({
      'x':position.x+x,
      'y':position.y+y
  });
}

function showError(){
  console.log("Error in the code");
}