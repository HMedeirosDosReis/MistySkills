function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _playWithHuman() {
  let num = getRandomInt(1, 9);
  if (num >= 0 && num <= 2) {
    misty.DisplayImage("rock.jpg");
    misty.Debug("rock");
  } else if (num >= 3 && num <= 6) {
    misty.DisplayImage("paper.jpg");
    misty.Debug("paper");
  } else {
    misty.DisplayImage("scissors.jpg");
    misty.Debug("scissors");
  }
  misty.RegisterTimerEvent("playWithHuman", 1200, false);
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
  let num = getRandomInt(1, 9);
  if (num >= 0 && num <= 2) {
    misty.DisplayImage("rock.jpg");
    misty.Debug("rock");
    //register data
    //send the data to the other misty
  } else if (num >= 3 && num <= 6) {
    misty.DisplayImage("paper.jpg");
    misty.Debug("paper");
    //register data
    //send the data to the other misty
  } else {
    misty.DisplayImage("scissors.jpg");
    misty.Debug("scissors");
    //register data
    //send the data to the other misty
  }
  score();
  misty.RegisterTimerEvent("playWithMisty", 1200, false);
}
//if(something that tells me if im supposed to play with human)
misty.RegisterTimerEvent("playWithHuman", 1200, true); //need to work in this timer when actually testing
//else if(something that tells me to play with another misty)
misty.RegisterTimerEvent("playWithMisty", 1200, true); //need to work in this timer when testing
