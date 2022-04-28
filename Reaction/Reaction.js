/*needs to work on:
        Definition a little bit more
        More actions 
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
  //event --done
  misty.RegisterEvent("head_pitch", "ActuatorPosition", 500, true);
}
// Register listener for head yaw position from ActuatorPosition events
function registerHeadYaw() {
  misty.AddReturnProperty("head_yaw", "SensorId");
  misty.AddReturnProperty("head_yaw", "Value");
  misty.AddPropertyTest("head_yaw", "SensorId", "==", "ahy", "string");
  //event --done
  misty.RegisterEvent("head_yaw", "ActuatorPosition", 500, true);
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
  // event --done
  misty.RegisterEvent("person_detection", "ObjectDetection", 1000, true);
  misty.StartObjectDetector(0.5, 0, 15);
}
// Human Pose Estimation
function startHumanPoseEstimation() {
  //event --done
  misty.RegisterEvent("human_pose_estimation", "PoseEstimation", 500, true);
  // Arguments: Minimum Confidence (float) 0.0 to 1.0, ModelId (int) 0 or 1, DelegateType (int) - 0 (CPU), 1 (GPU), 2 (NNAPI), 3 (Hexagon)
  misty.StartPoseEstimation(0.2, 0, 1);
}
/******************/
function start() {
  // Head calibration and events -- should move head to the correct place
  defaultBody();
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

  misty.Set("next_look_side", "right", false); //
  //event --done
  misty.RegisterTimerEvent("look_side_to_side", 1800, true); //
  //event --done
  //misty.RegisterTimerEvent("move_arms_random", 6000, true); //
}

/*event functions---loops*/
function _look_side_to_side() {
  if (
    !misty.Get("waving_now") &&
    (new Date() - new Date(misty.Get("last_person_update_at"))) / 1000 > 4
  ) {
    if (misty.Get("next_look_side") == "right") {
      misty.MoveHead(0, 0, getRandomInt(-40, -20), null, 4);
      misty.Set("next_look_side", "left", false);
    } else {
      misty.MoveHead(0, 0, getRandomInt(20, 40), null, 4);
      misty.Set("next_look_side", "right", false);
    }
  }
}

function _move_arms_random() {
  if (!misty.Get("waving_now"))
    misty.MoveArms(
      getRandomInt(20, 90),
      getRandomInt(20, 90),
      null,
      null,
      1,
      null
    );
}

function _head_pitch(data) {
  misty.Set("head_pitch", data.AdditionalResults[1], false);
}

function _head_yaw(data) {
  misty.Set("head_yaw", data.AdditionalResults[1], false);
}

function _person_detection(data) {
  if (data.PropertyTestResults[0].PropertyParent.Confidence >= 0.6) {
    let width_of_human =
      data.PropertyTestResults[0].PropertyParent.ImageLocationRight -
      data.PropertyTestResults[0].PropertyParent.ImageLocationLeft;
    // misty.Debug(width_of_human);

    // Attempt to look just at the closest person when multiplpe people are in the FoV
    var person_width_history = JSON.parse(misty.Get("person_width_history"));
    person_width_history.shift();
    person_width_history.push(Math.floor(width_of_human));
    misty.Set(
      "person_width_history",
      JSON.stringify(person_width_history),
      false
    );
    // misty.Debug(person_width_history); // DEBUG
    // misty.Debug(std_deviation(person_width_history)); // DEBUG

    // First part checks if this measurement is the closest person and second part checks if there is only one person that Misty can see
    if (
      Math.abs(width_of_human - Math.min(...person_width_history)) >
        Math.abs(width_of_human - Math.max(...person_width_history)) ||
      std_deviation(person_width_history) <= 40
    ) {
      // Act - This is the closest person
      // misty.Debug("Closer Person"); // DEBUG

      // 0 is Left 320 is Right  - Convert it ==>  L:1 to R:-1
      var x_error =
        (160.0 -
          (data.PropertyTestResults[0].PropertyParent.ImageLocationLeft +
            data.PropertyTestResults[0].PropertyParent.ImageLocationRight) /
            2.0) /
        160.0;
      var y_error =
        (160.0 -
          1.4 * data.PropertyTestResults[0].PropertyParent.ImageLocationTop +
          0.2 *
            data.PropertyTestResults[0].PropertyParent.ImageLocationBottom) /
        160.0;
      var threshold = Math.max(0.1, (341.0 - width_of_human) / 1000.0); // WAS 321 -
      // misty.Debug("Threshold: " + threshold.toString());
      // misty.Debug("x_error: " + x_error.toString());

      var damper_gain = 6.0; // WAS 7
      var actuate_to_yaw =
        Math.abs(x_error) > threshold
          ? misty.Get("head_yaw") +
            x_error *
              ((misty.Get("yaw_left") - misty.Get("yaw_right")) / damper_gain)
          : null;
      var actuate_to_pitch =
        Math.abs(y_error) > threshold
          ? misty.Get("head_pitch") -
            y_error *
              ((misty.Get("pitch_down") - misty.Get("pitch_up")) / 3.0) -
            (misty.Get("pitch_down") + misty.Get("pitch_up"))
          : null;

      if (
        Math.abs(misty.Get("head_pitch") - Math.round(actuate_to_pitch)) > 7 ||
        Math.abs(misty.Get("head_yaw") - Math.round(actuate_to_yaw)) > 7
      ) {
        // misty.MoveHead(actuate_to_pitch, null, actuate_to_yaw, null, (actuate_to_yaw == 0) ? 0.75 : 0.25);
        misty.MoveHead(actuate_to_pitch, null, actuate_to_yaw, null, 0.5);
      }
    } else {
      // Measurement belongs to the not very close person
      // misty.Debug("Farther Person"); // DEBUG
    }
    misty.Set("last_person_update_at", new Date().toUTCString());
  }
}

function _human_pose_estimation(data) {
  // misty.Debug(JSON.stringify(data.PropertyTestResults[0].PropertyParent));

  // Not doing any fancy Math here.. Just checking a simple condition
  // if elbow is below shoulder and shoulder is below wrist

  var keypoints = data.PropertyTestResults[0].PropertyParent.keypoints;

  // 5,6- Shoulder; 7,8- Elbow ; 9,10- Wrist ;

  if (!misty.Get("waving_now")) {
    // Left Hand
    if (
      confident(keypoints[7]) &&
      confident(keypoints[5]) &&
      confident(keypoints[9])
    ) {
      if (
        pairCorrelation(keypoints[7], keypoints[5]) &&
        pairCorrelation(keypoints[5], keypoints[9])
      ) {
        if (ScaleValid(keypoints[7], keypoints[5])) {
          waveBack("left");
        }
      }
    }
    // Right Hand
    else if (
      confident(keypoints[8]) &&
      confident(keypoints[6]) &&
      confident(keypoints[10])
    ) {
      if (
        pairCorrelation(keypoints[8], keypoints[6]) &&
        pairCorrelation(keypoints[6], keypoints[10])
      ) {
        if (ScaleValid(keypoints[8], keypoints[6])) {
          waveBack("right");
        }
      }
    } else if (
      confident(keypoints[5]) &&
      confident(keypoints[7]) &&
      confident(keypoints[9])
    ) {
      if (
        pairCorrelation(keypoints[7], keypoints[9]) //&&
        //pairCorrelation(keypoints[7], keypoints[9])
      ) {
        if (ScaleValid(keypoints[7], keypoints[9])) {
          //what should it do?---represent raise left hand
          misty.DisplayText("raised left hand", "DefaultTextLayer");
        }
      }
    } else if (
      confident(keypoints[6]) &&
      confident(keypoints[8]) &&
      confident(keypoints[10])
    ) {
      if (
        pairCorrelation(keypoints[8], keypoints[10]) //&&
        //pairCorrelation(keypoints[8], keypoints[10])
      ) {
        if (ScaleValid(keypoints[6], keypoints[8])) {
          //what should it do?---represent raise right hand
          misty.DisplayText("raised right hand", "DefaultTextLayer");
        }
      }
    }
  }
}

/* math */
function mean(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

function std_deviation(array) {
  const meanValue = mean(array);
  var numerator = 0; // sum(sqr(value-mean))
  for (let index = 0; index < array.length; index++) {
    numerator += Math.pow(array[index] - meanValue, 2);
  }
  return Math.abs(Math.sqrt(numerator / array.length));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*some more helpers */
function ScaleValid(keypoint_one, keypoint_two) {
  var x_offset = keypoint_one.imageX - keypoint_two.imageX;
  var y_offset = keypoint_one.imageY - keypoint_two.imageY;
  var scaled_distance = Math.sqrt(x_offset * x_offset + y_offset * y_offset);
  if (scaled_distance > 60) return true;
  return false;
  // misty.Debug("SCLAED DISTANCE : " + scaled_distance.toString());
}
//s
function confident(data, threshold = 0.6) {
  if (data.confidence >= threshold) return true;
  return false;
}

function pairCorrelation(keypoint_one, keypoint_two) {
  if (keypoint_one.imageY > keypoint_two.imageY) return true;
  return false;
}

function waveBack(arm) {
  misty.Set("waving_now", true, false);
  misty.Set("last_wave_at", new Date().toUTCString());
  animateWaveBack(arm);
}

/*animation */
function animateWaveBack(arm) {
  misty.Debug("Waving Back!!!!");
  // Audio
  if (!_params.silent_mode)
    misty.PlayAudio(Math.random() >= 0.5 ? "s_Acceptance.wav" : "s_Awe.wav");

  // Display
  if (Math.random() >= 0.5) {
    misty.DisplayImage("e_Joy2.jpg");
    misty.TransitionLED(0, 90, 0, 0, 255, 0, "Breathe", 800);
  } else {
    misty.DisplayImage("e_Love.jpg");
    misty.TransitionLED(90, 0, 0, 255, 0, 0, "Breathe", 800);
  }

  // Arms
  if (arm == "left") {
    misty.PlayAudio("003-Waaa.wav");
    misty.MoveArms(80, -89, null, null, 0.75, null);
    misty.Pause(1000);
    misty.MoveArms(80, 0, null, null, 0.75, null);
    misty.Pause(750);
    misty.MoveArms(80, -89, null, null, 0.75, null);
  } else {
    misty.PlayAudio("002-Ahhh.wav");
    misty.MoveArms(-89, 80, null, null, 0.75, null);
    misty.Pause(1000);
    misty.MoveArms(0, 80, null, null, 0.75, null);
    misty.Pause(750);
    misty.MoveArms(-89, 80, null, null, 0.75, null);
  }

  misty.Pause(2000);
  defaultBody();
  misty.Pause(2000);
  misty.Set("waving_now", false, false);
}
function defaultBody() {
  misty.DisplayImage("e_DefaultContent.jpg");
  misty.TransitionLED(0, 40, 90, 0, 130, 255, "Breathe", 1200);
  misty.MoveArms(
    getRandomInt(70, 89),
    getRandomInt(70, 89),
    null,
    null,
    1,
    null
  );
}

/*calibration */
function initiate_head_physical_limit_variables(forceCalibration = false) {
  if (!forceCalibration) {
    var allLongTermVariables = misty.Keys();
    if (
      allLongTermVariables.includes("yaw_right") &&
      allLongTermVariables.includes("yaw_left") &&
      allLongTermVariables.includes("pitch_down") &&
      allLongTermVariables.includes("pitch_up")
    ) {
      misty.Debug("Head calibration limits loaded from Long Term Memory");
    } else {
      misty.Debug(
        "Head calibration data is unavailable and now initiating calibrating"
      );
      _ = calibrate();
    }
  } else {
    _ = calibrate();
  }
  misty.Pause(500);
  return 0;
}

function calibrate() {
  _ = move_head_and_record_position(0, 0, -90, "yaw_right", "head_yaw");
  _ = move_head_and_record_position(0, 0, 90, "yaw_left", "head_yaw");
  _ = move_head_and_record_position(90, 0, 0, "pitch_down", "head_pitch");
  _ = move_head_and_record_position(-90, 0, 0, "pitch_up", "head_pitch");

  misty.Debug("CALIBRATION COMPLETE");
  misty.MoveHead(0, 0, 0, null, 2);
  return 0;
}
function move_head_and_record_position(
  pitch,
  roll,
  yaw,
  outputSetTo,
  inputFrom
) {
  misty.MoveHead(pitch, roll, yaw, null, 2);
  misty.Pause(4000);
  misty.Set(outputSetTo, misty.Get(inputFrom), true);
  misty.Debug(outputSetTo + " Recorded :" + misty.Get(outputSetTo).toString());
  return 0;
}
start();
