

// Register to VoiceRecord Event to follow up with what happens after the recording is complete
register_voice_record_complete();
misty.Pause(1000);



// parameters: overwriteExisting, silenceTimeout, maxSpeechLength, requireKeyPhrase, captureFile, speechRecognitionLanguage, key
misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_Google);



function _voice_record_complete_message(data) {

    misty.Debug(JSON.stringify(data));
    var filename = data.AdditionalResults[0];
    let success = data.AdditionalResults[1];
    let stt_result = data.AdditionalResults[4];

    if (success) {
        misty.Debug("Info: Audio recording successful.");
        misty.Debug(filename);
        misty.Debug("Misty Heard: " + stt_result);
        misty.DisplayText(stt_result);
        misty.Pause(3000);
        misty.DisplayText(""); 

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

