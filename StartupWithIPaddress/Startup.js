misty.Set("IPLayer", false);

misty.AddReturnProperty("Touched", "sensorName");
misty.AddReturnProperty("Touched", "isContacted");
misty.RegisterEvent("Touched", "TouchSensor", 100, true);

function _Touched(data) {
    if (data.AdditionalResults[1] == true) {
        switch (data.AdditionalResults[0]) {
            case "CapTouch_Chin":
                toggleIPLayer();
                break;
            default:
                return;
        }
    }
}

function toggleIPLayer() {
    if (!misty.Get("IPLayer")) {
        misty.GetDeviceInformation();
        misty.SetTextDisplaySettings("IPLayer", null, null, true);
        misty.SetImageDisplaySettings("DefaultImageLayer", null, null, false);
        misty.Set("IPLayer", true);
    }
    else if (misty.Get("IPLayer")) {
        misty.SetTextDisplaySettings("IPLayer", null, null, false);
        misty.SetImageDisplaySettings("DefaultImageLayer", null, null, true);
        misty.Set("IPLayer", false);
    }
}

function _GetDeviceInformation(data) {
	misty.DisplayText(data.Result.IPAddress, "IPLayer");
	misty.SetTextDisplaySettings("IPLayer", false, false, true, 1, 40, 400, true, "Center", "Center", "Normal", 255, 255, 255, 480, 80, true, "Courier New");
}