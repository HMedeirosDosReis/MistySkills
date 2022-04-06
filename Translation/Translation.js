//start with sound to text
register_voice_record_complete();
//create a pause of 1 second
misty.Pause(1000);
// parameters: overwriteExisting, silenceTimeout, maxSpeechLength, requireKeyPhrase, captureFile, speechRecognitionLanguage, key
//language set to english
misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
misty.Set("translate", "", false);
misty.Set("translation","",false);
//function that will check if it worked and then display the text
function _voice_record_complete_message(data) {
    //debugging message
    misty.Debug(JSON.stringify(data));
    //store return values from capture of speach
    var filename = data.AdditionalResults[0];
    let success = data.AdditionalResults[1];
    stt_result = data.AdditionalResults[4];
    //if it works
    if (success) {
        //debugging messages to check if it works
        misty.Debug("Info: Audio recording successful.");
        misty.Debug(filename);
        misty.Debug("Misty Heard: " + stt_result);
       
        misty.Set("translate",stt_result,false);
        misty.Debug("translate:"+misty.Get("translate"));

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
//create a pause of 8 seconds
misty.Pause(8000);

//translate
/*
*
*
*
*
*/
//misty.Debug(misty.Get("translate"));
translateText(misty.Get("translate"));
//function to translate the text
function translateText(text) {
    var arguments = JSON.stringify({ 
        "q": text,
        "source": "en",//from english
        "target": "es",//to spanish
        "format": "text" //in text format
    })
    //send and external request to the translation api
    misty.SendExternalRequest("POST","https://translation.googleapis.com/language/translate/v2?key="+_params.APIKEY_GoogleTranslate,null,null,arguments,false,false,null,"application/json","_translatedData");
    //misty.Debug(JSON.stringify(data));
}

//after getting the translation we use store the result in variables so that later we  can use the text to speach function
function _translatedData(data)
{
    let response = JSON.parse(data.Result.ResponseObject.Data);
    let textToSpeak = response.data.translations[0].translatedText;
    misty.Debug(textToSpeak);
    misty.Set("translation",textToSpeak,false);
}
misty.Pause(3000);
//text to sound
//misty.Debug(misty.Get("translation"));
speakTheText(misty.Get("translation"));

// ==================== Send Text To Google ===========================

function speakTheText(text) {
    // TTS
    var arguments = JSON.stringify({
        'input': {
            'text': text
        },
        'voice': {
            'languageCode': "es-ES",//choose languase for misty to speak
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
    misty.SendExternalRequest("POST", "https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=" + _params.APIKEY_GoogleTTS, null, null, arguments, false, false, null, "application/json", "_Base64In");
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

misty.Debug("end");