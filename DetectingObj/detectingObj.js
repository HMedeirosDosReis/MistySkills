

// THIS CODE CURRENTLY CAN DETECT an object and move but will stop unusually before reaching objects when other objects are near

//start_object_detection();
//several ways to implement the object detection
//function look_for_object(){
//  start_object_detection();
/*
  misty.ChangeLED(0,128,0); //start driving green light
  misty.DriveTime(20, 0, 7000);
  misty.AddPropertyTest("FrontTOF", "SensorPosition", "==", "Center", "string");
  misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.2, "double" ); //add tests for event
  misty.RegisterEvent("FrontTOF", "TimeOfFlight", 250);
 // misty.DriveTime(50, 0, 10000);
//}


var currObject = "";

function _FrontTOF2(data){
  let frontTOF2 = data.PropertyTestResults[0].PropertyParent;
  return true; // while there is an object infront of misty don't move.....
}

function _FrontTOF(data){


      let frontTOF = data.PropertyTestResults[0].PropertyParent;
      misty.Debug("Distance: " + frontTOF.DistanceInMeters);
      misty.Debug("Sensor Position: " + frontTOF.SensorPosition);
      misty.Stop();
      misty.Pause(3000); //Wait to take in data from object

      //IMPLEMENT WANDER AROUND AND BUMP SENSOR/HAZARD DETECTION CODE HERE
      start_object_detection(); // DETECT THE OBJECT AND RETURN ITS STRING. 
   
   
  /*
   while(frontTOF.DistanceInMeters <= 0.4){ //WHILE DOES NOT WORK WITH MISTY
       misty.Stop(); //misty won't move again until the current object is moved out the way
       misty.AddPropertyTest("FrontTOF2", "SensorPosition", "==", "Center", "string");//search for object again
       misty.AddPropertyTest("FrontTOF2", "DistanceInMeters", "<=", 0.4, "double" ); 
       misty.RegisterEvent("FrontTOF2", "TimeOfFlight", 250);
   }
   */
/*
 misty.DriveTime(10,0,5000); //drive forward once object is out the way again
 misty.AddPropertyTest("FrontTOF", "SensorPosition", "==", "Center", "string");//search for object again
 misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.4, "double" ); 
 misty.RegisterEvent("FrontTOF", "TimeOfFlight", 250); //may need to write second function for this to work

 
if(currObject == "cup"){
    misty.Debug("The cup was indeed found this part is done");
  //  misty.UnregisterEvent("FrontTOF");
    misty.UnregisterAllEvents(); //everything stopping for now
    misty.Stop();
}
else if(currObject != "cup")
{
    misty.Debug("This is not the object in question..");
    misty.Debug("This is actually the current object.... " + currObject);

    //call wander/hazard/bump functions again to continue moving misty around until another object is infront of her
}
 

misty.ChangeLED(255,0,0); //stop because object is infront of her
misty.Debug("End of skill ..object close to misty");
 
}

*/

// Misty Randomly Wanders around the space

misty.Set("inCorrecetion", false);
misty.Set("lastHazard", "NotYet");
misty.AddReturnProperty("Hazard", "DriveStopped");
misty.RegisterEvent("Hazard", "HazardNotification", 1, true);
//_look_around(); //start moving misty head to look in different directions
start_object_detection();
// ------------------------ Random Drive -------------------------------------

function _drive_random() {
    misty.Debug("Random Drive -> Now Issuing a Drive Command");
    if (Math.random() <= 0.2) {
        drive(0, 0);
        misty.Debug("Idle State Selected - wait 10-20 sec");
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
    // misty.Debug(JSON.stringify(data));
    // misty.Debug(JSON.stringify(data.AdditionalResults));
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
    misty.Pause(5500)
    misty.ChangeLED(0, 255, 0);
    misty.Set("inCorrecetion", false);
    misty.Set("inCorrecetion", false);
}

function BackCorrection(preferredDrive = "NotYet") {
    misty.Debug("BACK-CORRECTION");
    misty.Set("lastHazard", preferredDrive);
    misty.ChangeLED(255, 0, 0);
    misty.MoveArmDegrees("both", -80, 30);
    misty.Pause(2000);
    misty.DriveTime(20, 0, 5500);
    misty.Pause(5500)
    misty.ChangeLED(0, 255, 0);
    misty.Set("inCorrecetion", false);
    misty.Set("inCorrecetion", false);
}

function LeftCorrection() {
    misty.Debug("LEFT-CORRECTION");
    misty.Set("lastHazard", "LEFT");
    misty.ChangeLED(255, 0, 0);
    misty.MoveArmDegrees("both", -80, 30);
    misty.Pause(2000);
    misty.DriveTime(-20, 0, 600);
    misty.Pause(600);
    misty.DriveTime(-20, -15, 5000);
    misty.Pause(5000);
    misty.ChangeLED(0, 255, 0);
    misty.Set("inCorrecetion", false);
    misty.Set("inCorrecetion", false);
}

function RightCorrection() {
    misty.Debug("RIGHT-CORRECTION");
    misty.Set("lastHazard", "RIGHT");
    misty.ChangeLED(255, 0, 0);
    misty.MoveArmDegrees("both", -80, 30);
    misty.Pause(2000);
    misty.DriveTime(-20, 0, 600);
    misty.Pause(600);
    misty.DriveTime(-20, 15, 5000);
    misty.Pause(5000);
    misty.ChangeLED(0, 255, 0);
    misty.Set("inCorrecetion", false);
    misty.Set("inCorrecetion", false);
}

//------------------------- Random Hand Movements--------------------------------------------
//not necessary
/*
function _move_hands() 
{
    misty.MoveArmDegrees("left", getRandomInt(-80, 80), getRandomInt(5, 30));
    misty.MoveArmDegrees("right", getRandomInt(-80, 80), getRandomInt(5, 30));
    misty.RegisterTimerEvent("move_hands", getRandomInt(5, 10) * 1000, false);
}
misty.RegisterTimerEvent("move_hands", 100, false);
*/
//------------------------- Random Head Movements-------------------------------------------------

function _look_around() {
    misty.MoveHeadDegrees(getRandomInt(-40, 20), getRandomInt(-35, 35), getRandomInt(-45, 45), 40);
    misty.RegisterTimerEvent("look_around", getRandomInt(5, 10) * 1000, false);
}
misty.RegisterTimerEvent("look_around", 100, false);
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
    misty.RegisterEvent("object_detection", 1000, false);

    // Argument 1: Minimum confidence required (float) 0.0 to 1.0 
    // Argument 2: ModelId (int) 0 - 3 
    // Argument 3: MaxTrackHistory - Consistently maintains ID of object across x points in history
    // Argument 4: (optinal) DelegateType (int) - 0 (CPU), 1 (GPU), 2 (NNAPI), 3 (Hexagon)  
    misty.StartObjectDetector(0.51, 0, 25);
if(currObject == "cup" || theA == "cell phone" || theA == "backpack"){
  misty.Stop();
  misty.Debug("Misty detect haults here... the object found is a " + currObject );
  
}
    //there will be much more complexity here later...misty
    //have misty move in a set direction while looking for an object
    //  misty.DriveTime(50, 0, 5000); //literally needs to stop if the object is detected(otherwise it will bump)

}
var theA = "";
var currObject = "";
function _object_detection(data) {
    var object_info = data.PropertyTestResults[0].PropertyParent;
    misty.Debug("OBJ detection code is now executing...");
    theA = object_info.Description.toString();
    if (theA == "cup" && data.PropertyTestResults[0].PropertyParent.Confidence >= 0.6) //minimum confidence should be at least 60%
    {
        //we can do this for each object we select on dashboard....whenever that functionality is added
        misty.Debug("We have located the DARN CUP your job is DONE HERE STOP");
        misty.ChangeLED(50, 150, 50);
        //misty.Stop();
        misty.MoveArmDegrees("both", -80, 100);
        // misty.PlayAudio("Anikko10.mp3");
        misty.GetAudioList();

        /// Have misty do something... react to the object.. "I found the cup! ... wave arms up in excitement"
        currObject = theA; // set global variable to current object_info
        // misty.UnregisterEvent("object_detection");
        misty.Stop();
        //misty.Pause(30000);
        misty.UnregisterEvent("Hazard");
        misty.UnregisterEvent("drive_random");
        misty.UnregisterEvent("look_around");
        misty.UnregisterEvent("object_detection");
        misty.UnregisterAllEvents();
    }
    else if (theA == "cell phone" && data.PropertyTestResults[0].PropertyParent.Confidence >= 0.55) { //when we add funtionality for user to select object this will instead look like this 
        //if(theA == "cell phone" && userSelectedObject == "cell phone"){}
        misty.Debug("we got a cell phone folks");
        misty.Stop();
        misty.ChangeLED(33, 125, 70);
        currObject = theA;
        misty.UnregisterEvent("Hazard");
        misty.UnregisterEvent("drive_random");
        misty.UnregisterEvent("look_around");
        misty.UnregisterEvent("object_detection");
        misty.UnregisterAllEvents();
    }
    else if (theA == "suitcase" && data.PropertyTestResults[0].PropertyParent.Confidence >= 0.55) {
        misty.Debug("we found MISTYS HOME yall");
        misty.Stop();
        misty.ChangeLED(10, 12, 150);
        misty.GetAudioList();
        misty.UnregisterEvent("Hazard");
        misty.UnregisterEvent("drive_random");
        misty.UnregisterEvent("look_around");
        misty.UnregisterEvent("object_detection");
        misty.UnregisterAllEvents();
        currObject = theA;
    }
    else if (theA != "cup" && theA != "cell phone" && theA != "backpack") //DEBUG displayed '' instead of "" so maybe its a char instead of string
    {
        //please move the object out of mistys view..... this will have added complexity..misty
        //she should and will be able to detect the object, if it isn't the one being search for
        /*
        misty.Debug("We have not found your object of choice just yet.. remove it to continue search");
*/
        currObject = theA;
        misty.Debug("We have not found the current object as of yet..The current object found is a  " + currObject); //display current object found
    }


    // To access confidence and pitch
    misty.Debug(object_info.Confidence);
    misty.Debug(object_info.Pitch);
    misty.Debug(object_info.Description);
}

misty.RegisterEvent("object_detection", "ObjectDetection", 500, true); //misty will keep searching for obj..misty


//getting random sound for now to play when the object in question is found

// Callback to handle data returned by GetAudioList()
function _GetAudioList(data) {
    // Check if data was received
    if (data) {
        // Capture the array of files
        let audioArr = data.Result;

        // Generate a random number and use it to choose a filename at 
        // random from the list
        let randNum = Math.floor(Math.random() * audioArr.length);
        let randSound = audioArr[randNum].Name;
        // Print the name of the file
        misty.Debug(randSound);

        // Issue command to play the audio clip
        misty.PlayAudio(randSound);
    }
}

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