//Since misty only has so much internal storage, we need to delete the temporary audio files after usage
//Most likely need to place directly in a function so that they're may be a continuous conversation
//will be used later with the WIt API
try {
    misty.DeleteAudio("convo1.wav");
} catch (e) {}
try {
    misty.DeleteAudio("convo2.wav");
} catch (error) {}


//Play some audio from misty before it records audio to prompt robot/user to sstart conversation
//code here
///
//misty.Pause(2000);
misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
Start_The_Convo();

function Start_The_Convo(){
    misty.AddReturnProperty("Convo", "Filename");
    misty.AddReturnProperty("Convo", "Success");
    misty.AddReturnProperty("Convo", "ErrorCode");
    misty.AddReturnProperty("Convo", "ErrorMessage");
    misty.AddReturnProperty("Convo", "SpeechRecognitionResult");
    misty.RegisterEvent("Convo", "VoiceRecord", 100, true);
}

// Triggers when Misty finishes capturing a speech recording
function _Convo(data) {
   // Get data from AdditionalResults array
 // THIS IS A VERY BASIC VERSION OF CONVERSATION WHICH CAN CONSISTENTLY BE ADDED TO, 
 // HOWEVER WE NEED TO UTILIZE AN API TO MAKE THIS SIGNIFICANTLY MORE SEEMLESS
 // WE CAN STILL USE ALL THE CONDITIONALS AND RESPONSES THROUGH THE API
   var success = data.AdditionalResults[1];
   var errorCode = data.AdditionalResults[2];
   var errorMessage = data.AdditionalResults[3];
   Speech_In_Text = data.AdditionalResults[4].toString(); //Store the speech as text string 
   //define the utterances that mistyshould recognize...
   //more will surely be added here lol....gotta make her more robust
   let HowAreYou = "How are you misty?";
   let NotReal = "Are you a robot misty?";
   let friends = "Are we friends misty?";
    

   //misty.Set("ENGtext",speechRecognitionResult,false); // if the conversion of string doesn't work
   // If speech capture is successful, continue the conversation
   if (success = true) {
      misty.Debug("Successfully processed speech! ... you said .." + Speech_In_Text)
      //use radomizer for misty's responses for now
     var random_choice = Math.floor(Math.random() * 3);
     //calculate the word confidence so that misty can pick up most of what is said even
     //if it isn't 100% accurate
     function similar(a,b) {
        var equivalency = 0;
        var minLength = (a.length > b.length) ? b.length : a.length;    
        var maxLength = (a.length < b.length) ? b.length : a.length;    
        for(var i = 0; i < minLength; i++) {
            if(a[i] == b[i]) {
                equivalency++;
            }
        }
        var weight = equivalency / maxLength;
        return (weight * 100) + "%";
    }


    word_accuracy_hru = similar(Speech_In_Text,HowAreYou);
    misty.Debug(word_accuracy_hru); //just to test some accuracies
    word_accuracy_rur = similar(Speech_In_Text, NotReal);
    misty.Debug(word_accuracy_rur);
    word_accuracy_fr = similar(Speech_In_Text, friends);
    misty.Debug(word_accuracy_fr);

    //depending on accuracy of a statement,... proceed
 //    if(Speech_In_Text == "How are you misty?"){
       if(word_accuracy_hru > 70.0){
        switch(random_choice){
        case 0:
            //misty plays audiofile 1 //INSTEAD OF AUDIO FILE ...JUST USE TEXT TO SPEECH API
            //misty file will respond then ask how about you?
            speakTheText("I am fine, how about yourself");
            //get response from user/robot
            misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
            newResponse = data.AdditionalResults[4].toString;
            if(newResponse == "I am great"){ //THESE NEED TO ALSO HAVE WORD CONFIDENCE 

                speakTheText("Good for you, Goodbye"); //Since this is an incredibly  basic conversation we will stop here
            }
            else if(newResponse == "Not to good"){
                speakTheText("I am sorry, I am just a robot, I can't help you with that");
                
            }
            else{
                speakTheText("I didn't understand what you said, I said how about YOU");
                ////Register some type of event that keeps looping when user/robot isn't saying predifined response to continue convo
                //error:
            }
        break;
        case 1:
            //misty plays audiofile 2
            speakTheText("Nice and dandy like cotton candy");
            //more responses please...
            misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
            newResponse = data.AdditionalResults[4].toString;

            break;
        case 2:
            //misty plays audiofile 3
            speakTheText("I was fine until you asked");
            //more responses
            misty.Pause(500);
            misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
            newResponse = data.AdditionalResults[4].toString;
            if(newResponse == "Well that isn't nice misty"){
                speakTheText("Well the robot gods don't pay me enough to be nice, wait, they don't pay me at all, and neither do you");
            }
            else if(newResponse == "I'll be on my way then"){
                speakTheText("Don't let the door stop you on the say out!");
            }
            break;
        }
     }
     else if(word_accuracy_rur > 70.0){
        switch(random_choice){
            case 1:
                //misty plays audiofile 4
            break;
            case 2:
                //misty plays audiofile 5
                break;
            case 3:
                //misty plays audiofile 6
            }
     }
     else if(word_accuracy_fr > 70.0){
        switch(random_choice){
            case 1:
                //misty plays audiofile 7
            break;
            case 2:
                //misty plays audiofile 8
                break;
            case 3:
                //misty plays audiofile 9
            }
     }

   }
   // Otherwise, print the error message
   else {
      misty.Debug("Error: " + errorCode + ". " + errorMessage);
      //have misty say i didn't understand you speak again.
      //Capture the speech again...
      //misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
      //restart the conversation possibly
      //Start_The_Convo(); 
   }
}



/*************Speak the text from the bot response */

function speakTheText(text) {
    // TTS
    var arguments = JSON.stringify({
        'input': {
            'text': text
        },
        'voice': {
            'languageCode': "es-ES",//choose languase for misty to speak
            'ssmlGender': "MALE" //choose gender
        },
        'audioConfig': {
            'audioEncoding': "LINEAR16",

            "effectsProfileId": [
                "small-bluetooth-speaker-class-device"
            ],
            "pitch": 0.8,
            "speakingRate": 0.85
        }
    });
    //send an external request to google text to sound api
    misty.SendExternalRequest("POST", "https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=" 
    + _params.APIKEY_GoogleTTS, null, null, arguments, false, false, null, "application/json", "_Base64In");
}

// ==================== Audio returned from Google ====================
//save the audio that misty will speak
function _Base64In(data) {
        misty.SaveAudio("TTS.wav", JSON.parse(data.Result.ResponseObject.Data).audioContent, true, true);
    
}
/************************************************* */


