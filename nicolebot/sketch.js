let data; //variable for the json data
let message; //chatbox bg
let bg;
let inputbox; //input box
let orderbutton; //orderbutton

let answer = ""; //bot's output

function preload() {
  data = loadJSON("bot.json"); //load the json file
  message = loadImage("message.jpg")
  bg = loadImage("bg.jpg")
}

function setup() {
  createCanvas(1024,768);
 // console.log(data);

  inputbox = createInput("ask me about songs, shows, movies that i've recently consumed :D"); //create the input field
 inputbox.size(408,68);
  inputbox.position(479, 544);
  sendbutton = createButton("send");
  sendbutton.size(48, 30);
  sendbutton.position(842, 635);

 // imageMode(CENTER)
  
  sendbutton.mousePressed(answerMe); //when the button is pressed, callback function will be triggered
}

function answerMe() {
  //get the input
  let inputStr = inputbox.value().toLowerCase();
  console.log(inputStr);
  //loop through the brain array and through each triggers array
  //if there is a match, select randomly from the responses
  //break out of the loop
  outerloop: for (let i = 0; i < data.brain.length; i++) {
    innnerloop: for (let j = 0; j < data.brain[i].triggers.length; j++) {
      //check if the user input contains the key phrase
      if (inputStr.indexOf(data.brain[i].triggers[j]) !== -1) {
        answer = random(data.brain[i].responses);
        break outerloop;
      }else{
        answer = random(data.catchall);
      }
    }
  }
}

function draw() {
  console.log(mouseX,mouseY)
  image(bg,0,0)
  image(message, 400,330)
  message.resize(512,384)
  fill(0);
  textSize(15)
  text(answer, 556, 385, 328, 872);
  if (answer) {
  textSize(15)
  fill(60,169,52);
  text("nicolebot: ", 486, 397)
  }
}
