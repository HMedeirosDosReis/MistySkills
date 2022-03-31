// Requirements: 
// 1. Get an API Key from Google Cloud Platform Console for TTS and update APIKEY_Google in the .JSON file
// Henrique Can help you with that, and I woulndt share your key with other people, but thats up to you

//change this string to the desired text
//the string represents what misty will say
speakTheText("test");

// ==================== Send Text To Google ===========================

function speakTheText(text) {
    // TTS
    var arguments = JSON.stringify({
        'input': {
            'text': text
        },
        'voice': {
            'languageCode': "en-US",//choose languase for misty to speak
            'ssmlGender': "FEMALE" //choose gender
        },
        'audioConfig': {
            'audioEncoding': "LINEAR16",

            "effectsProfileId": [
                "small-bluetooth-speaker-class-device"
            ],
            "pitch": 0.7,
            "speakingRate": 0.91
        }
    });
    //send an external request to google text to sound api
    misty.SendExternalRequest("POST", "https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=" + _params.APIKEY_Google, null, null, arguments, false, false, null, "application/json", "_Base64In");
}

// ==================== Audio returned from Google ====================
//save the audio that misty will speak
function _Base64In(data) {
        misty.SaveAudio("TTS.wav", JSON.parse(data.Result.ResponseObject.Data).audioContent, true, true);
    
}

// ============= Enable REST API call directly to skill ================
//register event 
misty.RegisterUserEvent("speakTheText", true);

function _speakTheText(data) {
        //misty.Debug(JSON.stringify(data));
        speakTheText(data.text);
}
 ////working, just missing communication to the other robot