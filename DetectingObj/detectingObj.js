

// THIS CODE CURRENTLY CAN DETECT an object and move but will stop unusually before reaching objects when other objects are near


// Misty Randomly Wanders around 

misty.Set("inCorrecetion", false);
misty.Set("lastHazard", "NotYet");
misty.AddReturnProperty("Hazard", "DriveStopped");
misty.RegisterEvent("Hazard", "HazardNotification", 1, true);

start_object_detection(); //immediately start searching for the object

//WILL MOST LIKELY USE THESE TO HAVE MISTY MOVE IN PREDEFINED SPACE INSTEAD OF RANDOMLY
//NOT CURRENTLY BEING USED --REMOVE THIS COMMENT ONCE UTILIZED
misty.Set("roamInX", 305, false);// in cm equates to around 10 feet...roam in a rectangle
misty.Set("roamInY", 100, false);
//maybe allow user to select the specific object misty needs to look for

// ------------------------ Random Drive -------------------------------------
//instead of completely random drives we may have her drive a certain path in timed intervals
//this way she isn't randomly driving in an arc...path may still be random but not as much
function _drive_random() {
    misty.Debug("Random Drive -> Now Issuing a Drive Command");
    if (Math.random() <= 0.2) {
        drive(0, 0);
        misty.Debug("Idle State Selected - wait 10-20 sec");

        //determines when new drive command is issued
        misty.RegisterTimerEvent("drive_random", getRandomInt(10, 20) * 1000, false);
    }
    else {
        switch (misty.Get("lastHazard")) {
            case "LEFT":
                drive(getRandomInt(15, 30), getRandomInt(-15, 0));
                misty.Set("lastHazard", "NotYet");
                break;
            case "RIGHT":
                drive(getRandomInt(15, 30), getRandomInt(0, 15));
                misty.Set("lastHazard", "NotYet");
                break;
            default:
                drive(getRandomInt(15, 30), getRandomInt(-15, 15));
        }
        misty.RegisterTimerEvent("drive_random", getRandomInt(4, 9) * 1000, false);
    }
}
misty.RegisterTimerEvent("drive_random", 10, false);

function drive(lin, ang) {
    if (!misty.Get("inCorrecetion")) {
        if (lin === 0 && ang === 0) misty.Stop();
        else misty.Drive(lin, ang);
    }
    else {
        misty.Debug("Drive command ignored as Misty is in correction mode");
    }
}

// --------- Misty detects hazards - based of Time of Flight Sensors (both range and edge) and bump sensors -------

function _Hazard(data) {
    //data received from misty while she is near hazards

    const dataIn = data.AdditionalResults;

    var triggers = [];
    dataIn.forEach(sensor => {
        sensor.forEach(sensorData => {
            sensorData.InHazard ? triggers.push(sensorData.SensorName) : {}
        });
    });

    if (triggers.length && !misty.Get("inCorrecetion")) {
        misty.Set("inCorrecetion", true);
        misty.Set("inCorrecetion", true);
        misty.Set("inCorrecetion", true);
        misty.Debug(triggers);
        if (triggers[0] == "Back center hazard") BackCorrection();
        else if (triggers[0] == "Front right hazard") RightCorrection();
        else if (triggers[0] == "Front left hazard") LeftCorrection();
        else if (triggers[0] == "Front center hazard") FrontCorrection();
        else if (triggers[0] == "Back left hazard") BackCorrection("LEFT");
        else if (triggers[0] == "Back right hazard") BackCorrection("RIGHT");
        else { }
    }
}

// --------- Misty gets into programmed sequence of corrective action to move away from the Hazard -----

function FrontCorrection() {
    misty.Debug("FRONT-CORRECTION");
    misty.ChangeLED(255, 0, 0);
    misty.MoveArmDegrees("both", -80, 30);
    misty.Pause(2000);
    misty.DriveTime(-20, 0, 600);
    misty.Pause(600);
    misty.DriveTime(-20, -20, 5500);
    misty.Pause(3500)
    misty.ChangeLED(0, 255, 0);
    misty.Set("inCorrecetion", false);
    misty.Set("inCorrecetion", false);
}

function BackCorrection(preferredDrive = "NotYet") {
    misty.Debug("BACK-CORRECTION");
    misty.Set("lastHazard", preferredDrive);
    misty.ChangeLED(255, 0, 0);
    misty.MoveArmDegrees("both", -80, 90);
    misty.Pause(2000);
    misty.DriveTime(40, 0, 5500);
    misty.Pause(3500)
    misty.ChangeLED(50, 255, 50);
    misty.Set("inCorrecetion", false);
    misty.Set("inCorrecetion", false);
}

function LeftCorrection() {
    misty.Debug("LEFT-CORRECTION");
    misty.Set("lastHazard", "LEFT");
    misty.ChangeLED(255, 0, 255);
    misty.MoveArmDegrees("both", -80, 90);
    misty.Pause(2000);
    misty.DriveTime(-40, 0, 600);
    misty.Pause(600);
    misty.DriveTime(-40, -15, 5000);
    misty.Pause(5000);
    misty.ChangeLED(0, 255, 0);
    misty.Set("inCorrecetion", false);
    misty.Set("inCorrecetion", false);
}

function RightCorrection() {
    misty.Debug("RIGHT-CORRECTION");
    misty.Set("lastHazard", "RIGHT");
    misty.ChangeLED(255, 100, 0);
    misty.MoveArmDegrees("both", -80, 90); //signals for correction to made off of the ride side
    misty.Pause(2000);
    misty.DriveTime(-40, 0, 600);
    misty.Pause(600);
    misty.DriveTime(-40, 15, 5000);
    misty.Pause(3000);
    misty.ChangeLED(0, 255, 0);
    misty.Set("inCorrecetion", false);
    misty.Set("inCorrecetion", false);
}

//--------------------- Random Head Movements-------------------------------------------------

function _look_around() {
    misty.MoveHeadDegrees(getRandomInt(-40, 20), getRandomInt(-35, 35), getRandomInt(-45, 45), 40);
    misty.RegisterTimerEvent("look_around", getRandomInt(5, 10) * 1000, false);
}
misty.RegisterTimerEvent("look_around", 100, true); //changed from false to true
//need to add something extra here. If misty stops because what is directly infront..adjust head setting to see and detect whats infront of her
//to make sure the object in question isn't there
// -------------------------- Support Function------------------------------------------------

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Object Detection
function start_object_detection() {
    // If you would like to get data only about say object - dog use the below line
    // If you prefer to get data about all 70 objects comment it out
    // misty.AddPropertyTest("object_detection", "Description", "==", "cup", "string");

    // Argument 1: Data from human pose estimation is streamed into the callback function
    // Argument 2: Event Name (do not change this) 
    // Argument 3: Debounce in milliseconds (least time between updates)
    // Argument 4: Live forever
    misty.RegisterEvent("object_detection", 2000, false); //search for the object every few seconds until it is found

    // Argument 1: Minimum confidence required (float) 0.0 to 1.0 
    // Argument 2: ModelId (int) 0 - 3 
    // Argument 3: MaxTrackHistory - Consistently maintains ID of object across x points in history
    // Argument 4: (optinal) DelegateType (int) - 0 (CPU), 1 (GPU), 2 (NNAPI), 3 (Hexagon)  
    misty.StartObjectDetector(0.51, 0, 25);


}

//define variables that will store string data from object detected
var theA = "";
var currObject = "";
function _object_detection(data) {
    var object_info = data.PropertyTestResults[0].PropertyParent;
    misty.Debug("OBJ detection code is now executing...");
    theA = object_info.Description.toString();
    if (theA == "cup" && data.PropertyTestResults[0].PropertyParent.Confidence >= 0.6) //minimum confidence should be at least 60%
    {
        //we can do this for each object we select on dashboard....whenever that functionality is added
        misty.Debug("We have located the CUP your job is DONE HERE STOP");
        misty.ChangeLED(50, 150, 50);
        misty.MoveArmDegrees("both", 90, 100); //misty reacts to finding object
        misty.MoveHeadPosition(-5, 0, 0, 100);
        misty.PlayAudio("Ifoundcup.mp3");
         //In ORDER TO STOP THE OTHER ROBOT WE NEED AN EVENT HERE THAT QUERIES THE DASHBOARD FOR A BOOLEAN
         //ex: ObjectFound = false
         //if the object is found POST the update to OBjectFound = true 
         //ex: sendexternalrequest(GET,.....dashboard);
         //will probably check that data every two seconds...misty
         //
         //if time permits, instead of stopping the robot, we can have it follow the sound of the other robot 
         //to reach its coordinates
        /// Have misty do something... react to the object.. "I found the cup! ... wave arms up in excitement"
        currObject = theA; // set global variable to current object_info
    
        misty.Stop();
        misty.Pause(3000);
        misty.MoveArmDegrees("both", 0, 100); //reset positions to normal.
        misty.MoveHeadPosition(0, 0, 0, 100);

        misty.UnregisterEvent("Hazard");
        misty.UnregisterEvent("drive_random");
        misty.UnregisterEvent("look_around");
        misty.UnregisterEvent("object_detection");
        misty.UnregisterAllEvents();
    }
    else if (theA == "laptop" && data.PropertyTestResults[0].PropertyParent.Confidence >= 0.60) { //when we add funtionality for user to select object this will instead look like this 
        //
        misty.Debug("we got a cell phone folks");
        
        misty.ChangeLED(133, 125, 70);
        misty.MoveHeadPosition(-5, 0, 0, 100);
        misty.MoveArmDegrees("both", 90, 100);
        misty.PlayAudio("Ifoundlaptop.mp3");
        misty.Stop();
        misty.Pause(3000);
        misty.MoveHeadPosition(0, 0, 0, 100);
        misty.MoveArmDegrees("both", 0, 100);
        misty.UnregisterEvent("Hazard");
        misty.UnregisterEvent("drive_random");
        misty.UnregisterEvent("look_around");
        misty.UnregisterEvent("object_detection");
        misty.UnregisterAllEvents();
    }
    else if (theA == "suitcase" && data.PropertyTestResults[0].PropertyParent.Confidence >= 0.60) {
        misty.Debug("we found MISTYS HOME yall..aka a suitcase");
      
        misty.ChangeLED(10, 12, 150);
        misty.GetAudioList(); //instead you should play file that says it found the suitcase.....
        misty.MoveHeadPosition(-5, 0, 0, 100);
        misty.MoveArmDegrees("both", 90, 100);
        misty.PlayAudio("Ifoundsuitcase.mp3");
        misty.Stop();
        misty.Pause(3000);
        misty.MoveHeadPosition(0, 0, 0, 100);
        misty.MoveArmDegrees("both", 0, 100);
        misty.UnregisterEvent("Hazard");
        misty.UnregisterEvent("drive_random");
        misty.UnregisterEvent("look_around");
        misty.UnregisterEvent("object_detection");
        misty.UnregisterAllEvents();
        currObject = theA;
    }
    else if (theA == "chair" && data.PropertyTestResults[0].PropertyParent.Confidence >= 0.60 ) { 
      misty.Debug("we found a chair once again man.......");
      misty.Stop();

      misty.ChangeLED(210, 102, 150);
      misty.MoveArmDegrees("both", 90, 100);//literally doing the same thing but we will update object behaviour later
      misty.PlayAudio("Ifoundchair.mp3");
      misty.MoveHeadPosition(-5, 0, 0, 100);
      misty.MoveArmDegrees("both", 90, 100);
      misty.PlayAudio("Ifoundchair.mp3");
      misty.Stop();
      misty.Pause(3000);
      misty.MoveHeadPosition(0, 0, 0, 100);
      
      misty.MoveArmDegrees("both", 0, 100);
      misty.UnregisterEvent("Hazard");
      misty.UnregisterEvent("drive_random");
      misty.UnregisterEvent("look_around");
      misty.UnregisterEvent("object_detection");
      misty.UnregisterAllEvents();
      currObject = theA;
  }
    else if (theA != "cup" && theA != "laptop" && theA != "backpack" && theA != "chair") //DEBUG displayed '' instead of "" so maybe its a char instead of string
    {
        //please move the object out of mistys view..... this will have added complexity..misty
        //she should and will be able to detect the object, if it isn't the one being search for
        /*
        misty.Debug("We have not found your object of choice just yet.. remove it to continue search");
*/
        currObject = theA;
        misty.Debug("We have not found the current object as of yet..The current object found is a  " + currObject); //display current object found
    }

}

misty.RegisterEvent("object_detection", "ObjectDetection", 500, true); //misty will keep searching for obj..misty


// Misty can detect and provide information about 70 different objects:
// person
// bicycle
// car
// motorcycle
// airplane
// bus
// train
// truck
// boat
// traffic light
// fire hydrant
// stop sign
// parking meter
// bench
// bird
// cat
// dog
// horse
// sheep
// cow
// elephant
// bear
// zebra
// giraffe
// backpack
// umbrella
// handbag
// tie
// suitcase
// frisbee
// skis
// snowboard
// sports ball
// kite
// baseball bat
// baseball glove
// skateboard
// surfboard
// tennis racket
// bottle
// wine glass
// cup
// fork
// knife
// spoon
// bowl
// banana
// apple
// sandwich
// orange
// broccoli
// carrot
// hot dog
// pizza
// donut
// cake
// chair
// couch
// potted plant
// bed
// dining table
// toilet
// tv
// laptop
// mouse
// remote
// keyboard
// cell phone
// microwave
// oven
// toaster
// sink
// refrigerator
// book
// clock
// vase
// scissors
// teddy bear
// hair drier
// toothbrush
