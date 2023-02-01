let data; //variable for the json data
let inputbox; //input box
let orderbutton; //orderbutton

let answer = ""; //bot's output

function preload() {
  data = loadJSON("bot.json"); //load the json file
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  console.log(data);

  inputbox = createInput("submit a drink or a pastry :D"); //create the input field
  inputbox.size(width / 2, 40);
  inputbox.position(width / 4, height / 4);
  sendbutton = createButton("order");
  sendbutton.size(100, 30);
  sendbutton.position(width / 4, height / 4 + 50);

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
  background(220);
  textAlign(CENTER);
  text(answer, width/2, height/2);
}
