
start_object_detection();

// Object Detection
function start_object_detection(){
    // If you would like to get data only about say object - dog use the below line
    // If you prefer to get data about all 70 objects comment it out
   // misty.AddPropertyTest("object_detection", "Description", "==", "dog", "string");

    // Argument 1: Data from human pose estimation is streamed into the callback function
    // Argument 2: Event Name (do not change this) 
    // Argument 3: Debounce in milliseconds (least time between updates)
    // Argument 4: Live forever
    misty.RegisterEvent("object_detection", 500, false);

    // Argument 1: Minimum confidence required (float) 0.0 to 1.0 
    // Argument 2: ModelId (int) 0 - 3 
    // Argument 3: MaxTrackHistory - Consistently maintains ID of object across x points in history
    // Argument 4: (optinal) DelegateType (int) - 0 (CPU), 1 (GPU), 2 (NNAPI), 3 (Hexagon)  
    misty.StartObjectDetector(0.5, 0, 15);
    
}

function _object_detection(data) {
    var object_info = data.PropertyTestResults[0].PropertyParent;
    misty.Debug("I am here");
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

misty.RegisterEvent("object_detection", "ObjectDetection", 500, true);