//Goal: The robot plays rock paper scissors.

/*
To proceed with this code we need to be able to send external requests 
our dashboard. this seems to be our best bet at sending/getting data 
from/to mistys.

We were thinking about sockets, but this may not work. 


more on:
https://docs.mistyrobotics.com/misty-ii/rest-api/api-reference/#sendexternalrequest
*/

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//need to get the images
function _playWithHuman() {
  let num = getRandomInt(1, 9);
  ///GABI IMAGEs DISPLAYING BEFORE PLAY
  misty.SetImageDisplaySettings(null, null, null, null, null, 480, 272, "Fill", null, null, null,null);
  misty.DisplayImage("one.png");
 // misty.SetImageDisplaySettings(null, null, null, null, null, 100, 100, null, null, null, null,null);
  misty.Pause(750);
  misty.DisplayImage("two.png");
  misty.Pause(750);
  misty.DisplayImage("three.png");
  misty.Pause(750);

  if (num >= 0 && num <= 2) {
    misty.DisplayImage("rock.png");
    misty.Debug("rock");
    misty.Pause(3000);
  } else if (num >= 3 && num <= 6) {
    misty.DisplayImage("paper.png");
    misty.Debug("paper");
    misty.Pause(3000);
  } else {
    misty.DisplayImage("scissors.png");
    misty.Debug("scissors");
    misty.Pause(3000);
  }
  //misty.SetImageDisplaySettings(null, null, null, null, null, 480, 272, null, null, null, null,null);
  misty.DisplayImage("e_DefaultContent.jpg");
  misty.RegisterTimerEvent("playWithHuman", 6250, false);
  //can this get any better?
}
function connect() {
  ///work on misty connecting to each other
}

function score(mistyChoice1, mistyChoice2) {
  //let rock = 0, paper = 1, scissors = 2
  if (mistyChoice1 == mistyChoice2);
  else if (mistyChoice1 == 0 && mistyChoice2 == 1);
  else if (mistyChoice1 == 0 && mistyChoice2 == 2);
  else if (mistyChoice1 == 1 && mistyChoice2 == 0);
  else if (mistyChoice1 == 1 && mistyChoice2 == 2);
  else if (mistyChoice1 == 2 && mistyChoice2 == 0);
  else if (
    mistyChoice1 == 2 &&
    mistyChoice2 == 1 //misty1 wins
  );
  else; //error
  //display score --- need to decide how
}
function _playwWithMisty() {
  connect();
  //connect to the other misty somehow
  //********** */
  //let rock = 0, paper = 1, scissors = 2
  let num = getRandomInt(1, 9);
  if (num >= 0 && num <= 2) {
    misty.DisplayImage("rock.jpg");
    misty.Debug("rock");
    misty1 = 0;
    //send the data to the other misty
    //get data from the other misty
    //misty2=
  } else if (num >= 3 && num <= 6) {
    misty.DisplayImage("paper.jpg");
    misty.Debug("paper");
    misty1 = 1;
    //send the data to the other misty
    //get data from the other misty
    //misty2=
  } else {
    misty.DisplayImage("scissors.jpg");
    misty.Debug("scissors");
    misty1 = 2;
    //send the data to the other misty
    //get data from the other misty
    //misty2=
  }
  score(misty1, misty2);
  misty.RegisterTimerEvent("playWithMisty", 1200, false);
}
//if(something that tells me if im supposed to play with human)
misty.RegisterTimerEvent("playWithHuman", 8000, true); //need to work in this timer when actually testing
//else if(something that tells me to play with another misty)
//misty.RegisterTimerEvent("playWithMisty", 1200, true); //need to work in this timer when testing
