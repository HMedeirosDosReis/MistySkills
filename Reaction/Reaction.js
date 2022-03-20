/*needs to work on:
        Definition a little bit more
        Looping
        More actions 
        Work on events and helper methods
*/

/* Notes:
var keypoints = data.PropertyTestResults[0].PropertyParent.keypoints;

Keypoints - Index Map
NOSE(0),
LEFT_EYE(1),
RIGHT_EYE(2),
LEFT_EAR(3),
RIGHT_EAR(4),
LEFT_SHOULDER(5),
RIGHT_SHOULDER(6),
LEFT_ELBOW(7),
RIGHT_ELBOW(8),
LEFT_WRIST(9),
RIGHT_WRIST(10),
LEFT_HIP(11),
RIGHT_HIP(12),
LEFT_KNEE(13),
RIGHT_KNEE(14),
LEFT_ANKLE(15),
RIGHT_ANKLE(16);
Example of Data Received under each KeyPoint
bodyPart: 0
confidence: 0.3205725
imageX: 191
imageY: 253
pitch: 0.003858468
yaw: -0.126723886
*/
misty.Debug("Reaction Skill Start!!");
//lets start with the definition of reaction being only wave back

// Register listener for pitch position from ActuatorPosition events
function registerHeadPitch() {
  misty.AddReturnProperty("head_pitch", "SensorId");
  misty.AddReturnProperty("head_pitch", "Value");
  misty.AddPropertyTest("head_pitch", "SensorId", "==", "ahp", "string");
  //event
  misty.RegisterEvent("head_pitch", "ActuatorPosition", 100, true);
}
// Register listener for head yaw position from ActuatorPosition events
function registerHeadYaw() {
  misty.AddReturnProperty("head_yaw", "SensorId");
  misty.AddReturnProperty("head_yaw", "Value");
  misty.AddPropertyTest("head_yaw", "SensorId", "==", "ahy", "string");
  //event
  misty.RegisterEvent("head_yaw", "ActuatorPosition", 100, true);
}

// Person Tracking
function startPersonTracking() {
  misty.AddPropertyTest(
    "person_detection",
    "Description",
    "==",
    "person",
    "string"
  );
  // event
  misty.RegisterEvent("person_detection", "ObjectDetection", 500, true);
  misty.StartObjectDetector(0.5, 0, 15);
}
// Human Pose Estimation
function start_human_pose_estimation() {
  //event
  misty.RegisterEvent("human_pose_estimation", "PoseEstimation", 100, true);
  // Arguments: Minimum Confidence (float) 0.0 to 1.0, ModelId (int) 0 or 1, DelegateType (int) - 0 (CPU), 1 (GPU), 2 (NNAPI), 3 (Hexagon)
  misty.StartPoseEstimation(0.2, 0, 1);
}
/******************/
function start() {
  // Head calibration and events -- should move head to the correct place
  registerHeadPitch(); //
  registerHeadYaw(); //
  misty.Pause(1000); //
  _ = initiate_head_physical_limit_variables(
    (forceCalibration = _params.forceHeadCalibration)
  ); //

  // Person Detection
  misty.Set("person_width_history", JSON.stringify([0, 0, 0, 0]), false); //
  misty.Set("last_person_update_at", new Date().toUTCString()); //
  startPersonTracking(); //

  // Human Pose Estimation
  misty.Set("waving_now", false, false); //
  startHumanPoseEstimation(); //

  misty.Set("next_look_side", "right", false);
  //event
  misty.RegisterTimerEvent("look_side_to_side", 12000, true);
  //event
  misty.RegisterTimerEvent("move_arms_random", 6000, true);
}

start();
