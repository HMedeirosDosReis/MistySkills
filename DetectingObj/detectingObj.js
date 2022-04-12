

// THIS CODE CURRENTLY CAN DETECT an object and move but will stop unusually before reaching objects when other objects are near

  //In ORDER TO STOP THE OTHER ROBOT WE NEED AN EVENT HERE THAT QUERIES THE DASHBOARD FOR A BOOLEAN
         //ex: ObjectFound = false
         //if the object is found POST the update to OBjectFound = true 
         //ex: sendexternalrequest(GET,.....dashboard);
         //will probably check that data every two seconds...misty
         //
         //if time permits, instead of stopping the robot, we can have it follow the sound of the other robot 
         //to reach its coordinates
        

// Misty Randomly Wanders around 

misty.Set("inCorrecetion", false);
misty.Set("lastHazard", "NotYet");
misty.AddReturnProperty("Hazard", "DriveStopped");
misty.RegisterEvent("Hazard", "HazardNotification", 1, true);
_GetAudioList();

start_object_detection();
// ------------------------ Random Drive -------------------------------------

function _drive_random() 
{
    misty.Debug("Random Drive -> Now Issuing a Drive Command");
    if (Math.random() <= 0.2) 
    {
        drive(0, 0);
        misty.Debug("Idle State Selected - wait 10-20 sec");
        misty.RegisterTimerEvent("drive_random", getRandomInt(10, 20) * 1000, false);
    } 
    else 
    {
        switch (misty.Get("lastHazard")) 
        {
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

function drive(lin, ang) 
{
    if (!misty.Get("inCorrecetion")) 
    {
        if (lin === 0 && ang === 0) misty.Stop();
        else misty.Drive(lin, ang);
    }
    else
    {
        misty.Debug("Drive command ignored as Misty is in correction mode");
    }
}

// --------- Misty detects hazards - based of Time of Flight Sensors (both range and edge) and bump sensors -------

function _Hazard(data) 
{
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
        else {}
    }
}

// --------- Misty gets into programmed sequence of corrective action to move away from the Hazard -----

function FrontCorrection() 
{
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

function BackCorrection(preferredDrive = "NotYet") 
{
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

function LeftCorrection() 
{
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

function RightCorrection() 
{
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
    misty.RegisterEvent("object_detection", 5000, false); //search for the object every few seconds until it is found

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
        misty.UnregisterEvent("look_around");//stop misty from looking around immediately

        //we can do this for each object we select on dashboard....whenever that functionality is added
        misty.Debug("We have located the CUP your job is DONE HERE STOP");

        //misty reacts to finding the cup
        misty.ChangeLED(50, 150, 50);
        misty.MoveArmDegrees("both", 90, 100); 
        misty.MoveHeadPosition(-5, 0, 0, 100);
        misty.PlayAudio("Ifoundcup.mp3");
       
        //misty stops all operations
        misty.Stop();
      //  misty.Pause(3000);
        misty.MoveArmDegrees("both", 0, 100); //reset positions to normal.
        misty.MoveHeadPosition(0, 0, 0, 100);

         //unregister events so that misty doesn't continue moving/looking around 
        misty.UnregisterEvent("Hazard");
        misty.UnregisterEvent("drive_random");
        misty.UnregisterEvent("object_detection");
        misty.UnregisterAllEvents();
    }
    else if (theA == "laptop" && data.PropertyTestResults[0].PropertyParent.Confidence >= 0.60) { //when we add funtionality for user to select object this will instead look like this 
        misty.UnregisterEvent("look_around");//stop misty from looking around immediately

        misty.Debug("found the laptop");
        
        //misty reacts to finding the laptop
        misty.ChangeLED(133, 125, 70);
        misty.MoveHeadPosition(-5, 0, 0, 100);
        misty.MoveArmDegrees("both", 90, 100);
        misty.PlayAudio("Ifoundlaptop.mp3");

        //misty stops all operations
        misty.Stop();
      //  misty.Pause(3000);
        misty.MoveHeadPosition(0, 0, 0, 100); //reset head and arm position to normal
        misty.MoveArmDegrees("both", 0, 100);
        misty.UnregisterEvent("Hazard");
        misty.UnregisterEvent("drive_random");
       // misty.UnregisterEvent("look_around");
        misty.UnregisterEvent("object_detection");
        misty.UnregisterAllEvents();
    }
    else if (theA == "suitcase" && data.PropertyTestResults[0].PropertyParent.Confidence >= 0.60) {
        misty.Debug("we found MISTYS HOME yall..aka a suitcase");
        misty.UnregisterEvent("look_around");//stop misty from looking around immediately
        misty.UnregisterEvent("Hazard");
        misty.UnregisterEvent("drive_random");
  
        //misty reacts to finding her suitcase
        misty.ChangeLED(255, 0, 0);
        misty.MoveHeadDegrees(-35, -40, -10, 90);
        misty.MoveArmDegrees("both", -90, 100);
        misty.PlayAudio("Ifoundsuitcase.mp3", 80);
        misty.Debug("we ARE HERE IN THE SUITCAAASSEEE");
        //misty halts all operations
        misty.Stop();
        misty.UnregisterEvent("object_detection");
        misty.UnregisterAllEvents();
        misty.Pause(4000);
        misty.MoveHeadDegrees(0, 0, 0, 80);
        misty.MoveArmDegrees("both", 90, 100);
        misty.Debug("we are HERE SUITCAse");
        misty.Pause(3000);
        //unregister events so that misty doesn't continue moving/looking around 

    }
    else if (theA == "cChair" && data.PropertyTestResults[0].PropertyParent.Confidence >= 0.60 ) { 
      misty.Debug("we found a chair once again man.......");
    //  misty.Stop();
      misty.UnregisterEvent("look_around");//stop misty from looking around immediately
      misty.UnregisterEvent("Hazard");
      misty.UnregisterEvent("drive_random");
      //misty reacts to finding a chair
      misty.ChangeLED(255, 0, 0);//red stop
      misty.MoveHeadDegrees(-35, -40, -10, 90);
      misty.MoveArmDegrees("both", -90, 100);
      misty.PlayAudio("Ifoundchair.mp3", 70);
 
      misty.Debug("we are here now CHAIR");

      //misty haults operations
      misty.Stop();
      misty.UnregisterEvent("object_detection");
      misty.UnregisterAllEvents();
      misty.Pause(4000);
      misty.MoveHeadDegrees(0, 0, 0, 80);
      misty.MoveArmDegrees("both", 90, 100);

       //unregister events so that misty doesn't continue moving/looking around 
  }
    else if (theA != "cup" && theA != "laptop" && theA != "backpack" && theA != "chair") //DEBUG displayed '' instead of "" so maybe its a char instead of string
    {
        //please move the object out of mistys view..... this will have added complexity..misty
        //she should and will be able to detect the object, if it isn't the one being searched for
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
