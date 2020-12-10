//Create variables here
var dog,happyDog,database,foodS,foodStock;
var database;

function preload()
{
  //load images here
  dog1= loadImage("dogImg.png");
  happyDog= loadImage("dogImg1.png");

}

function setup() {

  database= firebase.database();

  createCanvas(800, 700);
  dog = createSprite(400,400,20,20);
  dog.addImage(dog1);
  dog.scale= 0.2;
  
  foodStock= database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  

  background(46,139,87);

  drawSprites();
  //add styles here

  textSize(25);
  fill("lightgreen");
  strokeWeight(3);
  stroke("blue");
  text("Food remaining: "+foodS,250,275);

  textSize(20);
  fill("black");
  strokeWeight(1.5);
  stroke("red");
  text("Note: Press Up Arrow to feed food to dog",200,75);

}

function keyPressed(){


if(keyDown(UP_ARROW)){

writeStock(foodS);
dog.addImage(happyDog);

}

}

function readStock(data){

foodS= data.val();

}

function writeStock(a){

if(a<=0){

a=0;

}
else{

a=a-1;

}

database.ref('/').update({

Food:a

})

}
