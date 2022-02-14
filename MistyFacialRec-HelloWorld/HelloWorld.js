/*
*Group: Flowrentinos
*11/31/2021
*/

// Sends a message to debug listeners
misty.Debug("The HelloWorld skill is starting!")
//play audio 
misty.PlayAudio("awake.mp3", 100);
//turn head
misty.MoveHead(-70, 0, 0, null, null, null);
// Returns a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Unchanged from hello World program
// The look_around timer event invokes this callback function. Change
// the value of repeat to false if Misty should only move her head once.
function _look_around(repeat = true) {

    //moves her head, pitch -70
     misty.MoveHead(-70, 0, 0, null, null, null);
     //pause for 5000 milliseconds
     misty.Pause(5000);
     //moves her head, pitch -70, yaw to 100
     misty.MoveHead(-70, 0, 100, null, null, null);
     //pause for 5000 milliseconds
     misty.Pause(5000);
     //moves her head, pitch -70
     misty.MoveHead(-70, 0, 0, null, null, null);
     //pause for 5000 milliseconds
     misty.Pause(5000);
     //moves her head, pitch -70, yaw to -100
     misty.MoveHead(-70, 0, -100, null, null, null);
     //pause for 5000 milliseconds
     misty.Pause(5000);
     
        //if repeat is true, register for look_around
        if (repeat) misty.RegisterTimerEvent(
        "look_around",
            3000,
       
        false);
}
//function called to to drive (move) misty
function startDrive()
{
//set linear speed to 100 and angular speed to 0
misty.Drive(100,0);
//stop driving for 7000 milliseconds
misty.Pause(7500);
//misty.Stop(False);
//set linear speed to 0 and angular speed to 100
misty.Drive(0,100);
//stop driving for 4250 milliseconds
misty.Pause(4250);
//set linear speed to 0 and angular speed to 0
misty.Drive(0,0);
//set linear speed to 100 and angular speed to 0
misty.Drive(100,0);
//stop driving for 3500 milliseconds
misty.Pause(3500);
//set linear speed to 0 and angular speed to 0
misty.Drive(0,0);
//stop driving for 5000 milliseconds
misty.Pause(5000);

}
//call function to start driving
startDrive();

//Register time event to look around and invoke look_around()
misty.RegisterTimerEvent("look_around", 1000, false);

//Color is a light pink, and it "breathes slower"
misty.TransitionLED(247, 15, 181, 0, 0, 0, "Breathe", 1000);

// function to wave misty's right arm
function waveRightArm() {
    //move the arm between -80 and 30 degrees
    misty.MoveArmDegrees("right", -80, 30); // Right arm up to wave
    misty.Pause(3000); // Pause with arm up for 3 seconds
    misty.MoveArmDegrees("both", 80, 30); // Both arms down
}
//call the function to move right arm
waveRightArm();

//misty recognizes faces
function _registerFaceRec() {
    // Cancels any face recognition that's currently underway
    misty.StopFaceRecognition();
    // Starts face recognition
    misty.StartFaceRecognition();
    // If a FaceRecognition event includes a "Label" property,
    // then Misty invokes the _FaceRec callback function.
    misty.AddPropertyTest("FaceRec", "Label", "exists", "", "string");
    // Registers for FaceRecognition events. Sets eventName to FaceRec,
    // debounceMs to 1000, and keepAlive to false.
    misty.RegisterEvent("FaceRec", "FaceRecognition", 1000, false);
}

// FaceRec events invoke this callback function.
function _FaceRec(data) {
    // Stores the value of the label for the detected face
    var faceDetected = data.PropertyTestResults[0].PropertyParent.Label;
    // Logs a debug message with the label of the detected face
    misty.Debug("Misty sees " + faceDetected);

    // Use the Command Center to train Misty to recognize your face.
    // Then, replace <FaceID> below with the label that Misty
    // associates with your own face. If Misty sees and recognizes you,
    // she waves, looks happy, and says a phrase.
    if (faceDetected == "Henrique") {
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("synthesize.mp3");
        waveRightArm();
    }
    if (faceDetected == "Zach") {
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("synthesize4.mp3");
        waveRightArm();
    }
    if (faceDetected == "Pablo") {
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("synthesize3.mp3");
        waveRightArm();
    }
    if (faceDetected == "Luke") {
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("synthesize2.mp3");
        waveRightArm();
    }
    if (faceDetected == "DrBlythe") {
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("synthesize5.mp3");
        waveRightArm();
    }
    if (faceDetected == "Gabriela") {
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("synthesize1.mp3");
        waveRightArm();
    }
    if (faceDetected == "DrJ") {
        misty.DisplayImage("e_Joy.jpg");
        misty.PlayAudio("synthesize6.mp3");
        waveRightArm();
    }

    // If misty sees someone she doesn't know, she raises her eyebrow
    // and plays a different sound.
    if (faceDetected == "unknown person") {
        misty.DisplayImage("e_Contempt.jpg");
        misty.PlayAudio("whatsname.mp3");
    }

    // Register for a timer event to invoke the _registerFaceRec
    // callback function loop through the _registerFaceRec() again
    // after 3000 milliseconds pass.
    misty.RegisterTimerEvent("registerFaceRec", 3000, false);
}

// Starts Misty recognizing faces!
_registerFaceRec();
//pause for 11000 milliseconds
misty.Pause(11000);
//turn head
misty.MoveHead(-70, 0, 0, null, null, null);
//function makes her drive (move) a second time
function startDrive2()
{
//pause for 3000 milliseconds
misty.Pause(3000);
//set linear speed to 100 and angular speed to 0
misty.Drive(100,0);
//pause for 3000 milliseconds
misty.Pause(5000);
//set linear speed to 0 and angular speed to 0
misty.Drive(0,0);
//pause for 11000 milliseconds
misty.Pause(11000);
//set linear speed to 100 and angular speed to 0
misty.Drive(100,0);
//pause for 3000 milliseconds
misty.Pause(3000);
//set linear speed to 0 and angular speed to 0
misty.Drive(0,0);
//pause for 3000 milliseconds
misty.Pause(11000);

}
startDrive2();
misty.MoveHead(-70, 0, 0, null, null, null);
function startDrive3()
{
//pause for 3000 milliseconds
misty.Pause(3000);
//set linear speed to 100 and angular speed to 0 
misty.Drive(100,0);
//pause for 3000 milliseconds
misty.Pause(3000);
//set linear speed to 0 and angular speed to 0
misty.Drive(0,0);
//pause for 3000 milliseconds
misty.Pause(11000);

}
startDrive3();