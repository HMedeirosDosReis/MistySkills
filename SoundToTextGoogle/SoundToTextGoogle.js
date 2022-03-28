//needs extreme carrefull testing, might have a lot of bugs
register_voice_record_complete();
misty.Pause(1000);
misty.ChangeLED(255, 0, 0);
misty.CaptureSpeech(false, true, 6500, 4000);
misty.ChangeLED(0,0,255);

function _voice_record_complete_message(data) {

    misty.Debug(JSON.stringify(data));
    var filename = data.AdditionalResults[0];
    let success = data.AdditionalResults[1];
    let error_code = data.AdditionalResults[2];
    let error_message = data.AdditionalResults[3];
    let stt_result = data.AdditionalResults[4];

    if (success) {
        misty.Debug(filename);
        misty.GetAudioFile(filename, "use_audio");   // Send audio to your preferred cloud service
    
    }
    else {
        misty.Debug("Error: Recording Audio");
        misty.Debug(error_message);
        misty.Debug(error_code);
    }
}


function use_audio(data) {
    // misty.Debug(JSON.stringify(data));
    let base64 = data.Result.Base64;
    misty.Debug(base64);
    var arguments = JSON.stringify(
        {
            "config":{
                "encoding":"LINEAR16",
                "sampleRateHertz": 16000,
                "languageCode": "en-US",
                "enableWordTimeOffsets": false
            },
            "audio": base64
            
        }
    )
    // You can chooose to send the base64 any of your preferred cloud service here using misty.SendExternalRequest() command
    misty.SendExternalRequest("POST", "https://speech.googleapis.com/v1/speech:recognize", _params.APIKEY_Google, null, null, arguments,false,false, null, "application/json", "_Base64In");
}
function _Base64In(data) {
    try {
        misty.Debug(JSON.stringify(data));
    } catch (error) {
        misty.Debug(JSON.stringify(data));
    }
}

function register_voice_record_complete() {
    misty.AddReturnProperty("voice_record_complete_message", "Filename");
    misty.AddReturnProperty("voice_record_complete_message", "Success");
    misty.AddReturnProperty("voice_record_complete_message", "ErrorCode");
    misty.AddReturnProperty("voice_record_complete_message", "ErrorMessage");
    misty.AddReturnProperty("voice_record_complete_message", "SpeechRecognitionResult");
    misty.RegisterEvent("voice_record_complete_message", "VoiceRecord", 100, true);
}
