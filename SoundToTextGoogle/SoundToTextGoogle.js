/*Goal: Get the voice of a person and transform it in text. 
        It was used a goggle API to complete this task and the language chosen was english
*/

// Register to VoiceRecord Event to follow up with what happens after the recording is complete
register_voice_record_complete();
misty.Pause(1000);



// parameters: overwriteExisting, silenceTimeout, maxSpeechLength, requireKeyPhrase, captureFile, speechRecognitionLanguage, key
//language set to english
misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_Google);


//function that will check if it worked and then display the text
function _voice_record_complete_message(data) {
    //debugging message
    misty.Debug(JSON.stringify(data));
    //store return values from capture of speach
    var filename = data.AdditionalResults[0];
    let success = data.AdditionalResults[1];
    let stt_result = data.AdditionalResults[4];
    //if it works
    if (success) {
        //debugging messages to check if it works
        misty.Debug("Info: Audio recording successful.");
        misty.Debug(filename);
        misty.Debug("Misty Heard: " + stt_result);
        //display the text on the screen
        misty.DisplayText(stt_result);
        //set a pause to 3000 milliseconds (to display the message)
        misty.Pause(3000);
        //display nothing
        misty.DisplayText(""); 

    }
}
//function that will get the sound (voice)
function register_voice_record_complete() {
    //add what needs to be stored and then will be returned later
    misty.AddReturnProperty("voice_record_complete_message", "Filename");
    misty.AddReturnProperty("voice_record_complete_message", "Success");
    misty.AddReturnProperty("voice_record_complete_message", "ErrorCode");
    misty.AddReturnProperty("voice_record_complete_message", "ErrorMessage");
    misty.AddReturnProperty("voice_record_complete_message", "SpeechRecognitionResult");
    misty.RegisterEvent("voice_record_complete_message", "VoiceRecord", 100, true);
}

