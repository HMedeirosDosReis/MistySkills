// THIS CODE CURRENTLY CAN DETECT an object and move but will stop unusually before reaching objects when other objects are near
//works, but missing movement
//start_object_detection();
//several ways to implement the object detection
//function look_for_object(){
//  start_object_detection();
misty.ChangeLED(0, 128, 0); //start driving green light
misty.DriveTime(20, 0, 7000);
misty.AddPropertyTest("FrontTOF", "SensorPosition", "==", "Center", "string");
misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.2, "double"); //add tests for event
misty.RegisterEvent("FrontTOF", "TimeOfFlight", 250);
// misty.DriveTime(50, 0, 10000);
//}

var currObject = "";
/*
function _FrontTOF2(data){
    let frontTOF2 = data.PropertyTestResults[0].PropertyParent;
    return true; // while there is an object infront of misty don't move.....
}
*/
function _FrontTOF(data) {
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
*/

  if (currObject == "cup") {
    misty.Debug("The cup was indeed found this part is done");
    //  misty.UnregisterEvent("FrontTOF");
    misty.UnregisterAllEvents(); //everything stopping for now
    misty.Stop();
  } else if (currObject != "cup") {
    misty.Debug("This is not the object in question..");
    misty.Debug("This is actually the current object.... " + currObject);

    //call wander/hazard/bump functions again to continue moving misty around until another object is infront of her
  }

  misty.ChangeLED(255, 0, 0); //stop because object is infront of her
  misty.Debug("End of skill ..object close to misty");
}
// Object Detection
function start_object_detection() {
  // If you would like to get data only about say object - dog use the below line
  // If you prefer to get data about all 70 objects comment it out
  misty.AddPropertyTest(
    "object_detection",
    "Description",
    "==",
    "cup",
    "string"
  );

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

  //there will be much more complexity here later...misty
  //have misty move in a set direction while looking for an object
  //  misty.DriveTime(50, 0, 5000); //literally needs to stop if the object is detected(otherwise it will bump)
}
var theA;
function _object_detection(data) {
  var object_info = data.PropertyTestResults[0].PropertyParent;
  misty.Debug("This code is now executing...");
  theA = object_info.Description;
  theA = theA.toString();
  if (theA == "cup") {
    misty.Debug("We have located the DARN CUP your job is DONE HERE STOP");
    misty.ChangeLED(50, 150, 50);
    //misty.Stop();
    misty.MoveArmDegrees("both", -80, 100);
    misty.PlayAudio("Anikko10.mp3");
    // misty.PlayAudio("Play.wav", 100);// placeholder sound will be randomly played
    //misty.RegisterEvent("object_detection", 1000, true); //kill the event?? stop searching
    /// Have misty do something... react to the object.. "I found the cup! ... wave arms up in excitement"
    currObject = theA; // set global variable to current object_info
    misty.UnregisterEvent("object_detection");
  } else if (theA != "cup") {
    //DEBUG displayed '' instead of "" so maybe its a char instead of string
    //please move the object out of mistys view..... this will have added complexity..misty
    //she should and will be able to detect the object, if it isn't the one being search for
    /*
        misty.Debug("We have not found your object of choice just yet.. remove it to continue search");
        misty.AddPropertyTest("FrontTOF", "SensorPosition", "==", "Center", "string");
        misty.AddPropertyTest("FrontTOF", "DistanceInMeters", "<=", 0.4, "double" ); //add tests for event
        misty.RegisterEvent("FrontTOF", "TimeOfFlight", 250);
        misty.ChangeLED(0,128,0); //start driving green light
        misty.DriveTime(10, 0, 7000);

 */
    // currObject = object_info.Description;
    currObject = theA;
    misty.Debug("The current object found is a  " + currObject); //display current object found
  }

  // Sample data
  // Confidence: 0.6656214
  // Created: "2020-07-23T14:02:34.8795248Z"
  // Description: "laptop"
  // Id: 0
  // ImageLocationBottom: 275.450775
  // ImageLocationLeft: 81.9578247
  // ImageLocationRight: 249.462738
  // ImageLocationTop: 101.051857
  // LabelId: 73
  // Pitch: 0.119271189
  // SensorId: "cv"
  // Yaw: 0.00674471259

  // To access confidence and pitch
  misty.Debug(object_info.Confidence);
  misty.Debug(object_info.Pitch);
  misty.Debug(object_info.Description);
}

misty.RegisterEvent("object_detection", "ObjectDetection", 500, true); //misty will keep searching for obj..misty
