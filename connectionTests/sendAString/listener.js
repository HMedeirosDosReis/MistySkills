// misty 45 --vblue heart

// Register a listener for the custom user event called "MyEvent"
misty.RegisterUserEvent("MyEvent", true);

/*
To send an event to this listener from an external device, use:

POST <robot-ip>/api/skills/event

And pass in a JSON payload of (for example):

{
  "Skill" : "<This Skill's UniqueId>",
  "EventName": "MyEvent",
  "Payload": {
    "CustomKey": "CustomValue",
    "AnotherKey": "AnotherValue"
    },
  "Source": "EventSender"
}
*/

// Callback triggers on receiving events named "MyEvent"
function _MyEvent(data) {
  misty.Debug("Event received: " + data.EventName); // MyEvent
  misty.Debug("test " + JSON.stringify(data.Source)); //<<<<<<<works
  misty.Debug("pay: " + JSON.stringify(data.Payload)); //<<<<does not work
  //misty.Debug(JSON.stringify(data.AnotherKey)); // AnotherValue
  //misty.Debug(JSON.stringify(data.Source)); // MyRobotApplication
  //misty.Debug(JSON.stringify(data.EventOriginator)); // "REST"
}
