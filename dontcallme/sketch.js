let data;

const d = new Date();
let day = d.getDay();
let phone

let myRec = new p5.SpeechRec()
let botVoice = new p5.Speech() 

let listening = false // to check status of listening
let answer = ""; //bot's output

function preload() {
  data = loadJSON("bot.json"); //load the json file
  phone = loadImage("phone.png");
  call = loadImage("call?.png");
  calling = loadImage("calling!.png");
  bushwick = loadImage("bushwick.jpg")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  botVoice.setPitch(2)
  botVoice.setRate(1.2)
  
  talkButton = createButton('📞')
  talkButton.mousePressed(startRec)
  talkButton.size(55, 25);
  talkButton.position(width/2 -147,height/2+88);
  
  endButton = createButton('⛔')
  endButton.mousePressed(endRec)
  endButton.size(55, 25);
  endButton.position(width/2+17,height/2+88);
  
}

function startRec(){
  
  botVoice.speak("... what's up, what do you want?")
  myRec.start()
  
   listening = true; //change listening to true when recognition starts
  myRec.onEnd = function recEnded() {
    listening = false;
  }; //when recognition stops, turn listening to false
  
  myRec.onResult = answerMe
}

function endRec() {
  myRec.stop();
}

function showResult(){
  console.log(myRec.resultString)
}

function answerMe() {
  //get the input
  let inputStr = myRec.resultString;
  inputStr = inputStr.toLowerCase();
  console.log(inputStr);
  
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

   botVoice.speak(answer)
  console.log(answer)

}

function draw() {
  background(220);
  image(bushwick, width/2,height/2)
  textAlign(CENTER);
  imageMode(CENTER)
  textSize(20);
  calling.resize (1470,732)
  call.resize (1470,732)
  
   if (listening == true){
  image(calling, width/2,height/2)
    
  } else if (listening == false) {
  image(call, width/2,height/2)
  }


 
    
phone.resize (1470,732);
image(phone, width/2,height/2);



}