// Requirements: 
// 1. Get an API Key from Google Cloud Platform Console for TTS and update APIKEY_Google in the .JSON file
// Henrique Can help you with that, and I woulndt share your key with other people, but thats up to you

speakTheText("test");

// ==================== Send Text To Google ===========================

function speakTheText(text) {
    // TTS
    var arguments = JSON.stringify({
        'input': {
            'text': text
        },
        'voice': {
            'languageCode': "en-US",
            'ssmlGender': "FEMALE"
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

    misty.SendExternalRequest("POST", "https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=" + _params.APIKEY_Google, null, null, arguments, false, false, null, "application/json", "_Base64In");
}

// ==================== Audio returned from Google ====================

function _Base64In(data) {
    try {
        misty.SaveAudio("TTS.wav", JSON.parse(data.Result.ResponseObject.Data).audioContent, true, true);
    } catch (error) {
        misty.Debug(JSON.stringify(data));
    }
}

// ============= Enable REST API call directly to skill ================

misty.RegisterUserEvent("speakTheText", true);

function _speakTheText(data) {
    try {
        misty.Debug(JSON.stringify(data));
        speakTheText(data.text);
    } catch (error) {
        misty.Debug("Cannot parse text input to speakTheText(); use this format { \"text\" : \"Your Text\"");
    }   
}

//needs testing, but should be pretty straight foward 