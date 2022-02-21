
misty.Debug("The Dancing skill is starting!")

misty.DisplayImage("e_Admiration.jpg", 1, "DefaultImageLayer", false);
function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _moveLeftArm(repeat = true) 
{
       misty.MoveArm("left", -30, 60, 0, null);
       misty.Pause(900);
       misty.MoveArm("left",30, 60, 0, null);
       misty.Pause(300);
       if (repeat) misty.RegisterTimerEvent(
        "moveLeftArm",
        1200,
        false);
}
function _moveRightArm(repeat = true) 
{
       misty.MoveArm("right", 30, 60, 0, null);
       misty.Pause(900);
       misty.MoveArm("right",-30, 60, 0, null);
       misty.Pause(300);
       if (repeat) misty.RegisterTimerEvent(
        "moveRightArm",
        1200,
        false);
}
function _moveHead(repeat= true)
{
    misty.MoveHead(0, -90, 0, 100, null, null);
    misty.Pause(900);
    misty.MoveHead(0, 90, 0, 100, null, null);
    misty.Pause(300);
    if (repeat) misty.RegisterTimerEvent(
        "moveHead",
        1200,
        false);
}
function _turning(repeat = true)
{
    misty.DriveArc(-20, 0.0001, 500, false);
    misty.Pause(1000);
    misty.DriveArc(20, 0.0001, 500, false);
    misty.Pause(1000);
    if (repeat) misty.RegisterTimerEvent(
        "turning",
        3000,
        false);
}
misty.RegisterTimerEvent("moveLeftArm", 1200, false)
misty.RegisterTimerEvent("moveRightArm", 1200, false)
misty.RegisterTimerEvent("moveHead", 1200, false)
misty.RegisterTimerEvent("turning", 3000, false)