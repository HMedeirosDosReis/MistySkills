//Goal: In this skill, Misty moves its arms and head. It also turns around and plays an audio. 


misty.Debug("The Dancing skill is starting!")

//display an image that will show an expression in its face
misty.DisplayImage("e_Admiration.jpg", 1, "DefaultImageLayer", false);
function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//function that will move misty's left arm
function _moveLeftArm(repeat = true) 
{
       //call funtion from misty's api that moves its arms
       //parameters will be: left arm, -30 for position, 60 for velocity, 0 velocity, and null for duration
       misty.MoveArm("left", -30, 60, 0, null);
       //pause for 900 milliseconds
       misty.Pause(900);
       //call funtion from misty's api that moves its arms
       //parameters will be: left arm, 30 for position, 60 for velocity, 0 velocity, and null for duration
       misty.MoveArm("left",30, 60, 0, null);
       //pause for 300 milliseconds
       misty.Pause(300);
       if (repeat) misty.RegisterTimerEvent(
        "moveLeftArm",
        1200,
           false);
    
}

//function that will move misty's right arm
function _moveRightArm(repeat = true) 
{   
       //call funtion from misty's api that moves its arms
       //parameters will be: right arm, 30 for position, 60 for velocity, 0 velocity, and null for duration
       misty.MoveArm("right", 30, 60, 0, null);
       //pause for 900 milliseconds
       misty.Pause(900);
       //call funtion from misty's api that moves its arms
       //parameters will be: right arm, 30 for position, 60 for velocity, 0 velocity, and null for duration
       misty.MoveArm("right",-30, 60, 0, null);
       //pause for 300 milliseconds
       misty.Pause(300);
       //register a timer for the event
       //set the timer to 1200 milliseconds
       if (repeat) misty.RegisterTimerEvent(
        "moveRightArm",
        1200,
        false);
}

//function that will move misty's head
function _moveHead(repeat= true)
{
    //call funtion from misty's api that moves its head
    //parameters will be: 0 for pitch, -90 for roll, 100 for yaw, velocity null, and duration null
    misty.MoveHead(0, -90, 0, 100, null, null);
    //pause for 900 milliseconds
    misty.Pause(900);
    misty.MoveHead(0, 90, 0, 100, null, null);
    //pause for 300 milliseconds
    misty.Pause(300);
    //register a timer for the event
    //set the timer to 1200 milliseconds
    if (repeat) misty.RegisterTimerEvent(
        "moveHead",
        1200,
        false);
}

//function that will move/drive misty
function _turning(repeat = true)
{
    //call function that will drive in an arc
    //parameters:heading =-20, radius=0.0001, time = 500milliseconds
    misty.DriveArc(-20, 0.0001, 500, false);
    //pause for 1000 milliseconds
    misty.Pause(1000);
    //call function that will drive in an arc
    //parameters:heading =20, radius=0.0001, time = 500milliseconds
    misty.DriveArc(20, 0.0001, 500, false);
    //pause for 1000 milliseconds
    misty.Pause(1000);
    //register a timer for the event
    //set the timer to 3000 milliseconds
    if (repeat) misty.RegisterTimerEvent(
        "turning",
        3000,
        false);
}
//call function that will play the audio with 100 volume
misty.PlayAudio("music.mp3", 100);
//call function that registered the timer for the events 
misty.RegisterTimerEvent("moveLeftArm", 1200, false)
misty.RegisterTimerEvent("moveRightArm", 1200, false)
misty.RegisterTimerEvent("moveHead", 1200, false)
misty.RegisterTimerEvent("turning", 3000, false)

