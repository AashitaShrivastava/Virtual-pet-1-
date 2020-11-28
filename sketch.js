//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock;

function preload()
{
  //load images here
  Dog=loadImage("Dog.png")
  happyDog=loadImage("happydog.png")
}

function setup() {
  database = firebase.database()

  createCanvas(500, 500);

  dog = createSprite(250,250,60,60)
  dog.addImage(Dog)
  dog.scale = 0.25


  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  
}


function draw() {  
  background(46,139,86)



if(foodS>0){
 if(keyDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDog)
}
}
if(keyWentUp(UP_ARROW)){
  dog.addImage(Dog)
}

  drawSprites();
fill("white")
  textSize(20)
  text("Note:Press UP Arrow Key To Feed Drago Milk",50,20)
  //add styles here
text("Food Remaining :"+foodS,100,50)

}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<0){
    x=0
  }else{
    x=x-1
  }
  database.ref("/").update({
    Food:x
  })
}
