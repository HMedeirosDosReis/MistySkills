//Goal: Misty answers to some audio inputs based on previously coded interactions.

//Since misty only has so much internal storage, we need to delete the temporary audio files after usage
//Most likely need to place directly in a function so that they're may be a continuous conversation
//will be used later with the WIt API
try {
    misty.DeleteAudio("tts.wav");
} catch (e) {}
try {
    misty.DeleteAudio("convo2.wav");
} catch (error) {}


//PREDEFINED PHRASES/UTTERANCES
misty.Set("HowAreYou", "How are you misty?",false);
misty.Set("NotReal", "Are you a robot misty?",false);
misty.Set("friends", "Are we friends misty?", false);
misty.Set("yourResponse", "", false);
//misty.Set("nextResponse","", false); //store the next user/robot response
misty.Set("MistyExpects1", "",false);//store the current response misty expects
misty.Set("MistyExpects2", "", false);
misty.Set("MQU", "", false); // misty questions you.. you/robot has to respond
misty.Set("wordAcc1", "", false);
misty.Set("wordAcc2", "", false);
misty.Set("wordAcc3","",false);
misty.Set("TimeDown", 0, false);
misty.Set("mistySecondR1", "", false);
misty.Set("mistySecondR2", "", false);
//Play some audio from misty before it records audio to prompt robot/user to sstart conversation
//code here
///
speakTheText("Please speak when you see blue light");
misty.Pause(4000);
speakTheText("Hey there. I'm misty");//REPLACE THIS WITH AN AUDIO FILE FFS
misty.Pause(3000);
misty.MoveArmDegrees("both", -90, 0, 150);
misty.MoveHead(-5, 5, -2, 0, 10);
Start_The_Convo();
misty.Pause(1000);
misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
//Start_The_Convo();
//SOMETHING IS NOT RIGHT HERE...HALF THE TIME THIS IS RAN AND NOISE ISNT INPUTTED IT LAGS AND IS STUCK IN THE API IT SEEMS LIKe
// Triggers when Misty finishes capturing a speech recording
function _Convo(data) 
{
   // Get data from AdditionalResults array
 // THIS IS A VERY BASIC VERSION OF CONVERSATION WHICH CAN CONSISTENTLY BE ADDED TO, 
 // HOWEVER WE NEED TO UTILIZE AN API TO MAKE THIS SIGNIFICANTLY MORE SEEMLESS
 // WE CAN STILL USE ALL THE CONDITIONALS AND RESPONSES THROUGH THE API
   var success = data.AdditionalResults[1];
   var errorCode = data.AdditionalResults[2];
   var errorMessage = data.AdditionalResults[3];
   Speech_In_Text = data.AdditionalResults[4].toString(); //Store the speech as text string 
   misty.Set("yourResponse" , Speech_In_Text, false);
   //define the utterances that mistyshould recognize...
   //more will surely be added here lol....gotta make her more robust

   word_accuracy_hru = similar(Speech_In_Text,misty.Get("HowAreYou"));
   misty.Debug("word acc = " + word_accuracy_hru); //just to test some accuracies
   word_accuracy_rur = similar(Speech_In_Text, misty.Get("NotReal"));
   misty.Debug("word rur = " + word_accuracy_rur);
   word_accuracy_fr = similar(Speech_In_Text, misty.Get("friends"));

   misty.Set("wordAcc1", word_accuracy_hru, false);
   misty.Set("wordAcc2", word_accuracy_rur, false);
   misty.Set("wordAcc3", word_accuracy_fr, false);
   misty.Debug("word fr =" + word_accuracy_fr);
   //misty.Set("ENGtext",speechRecognitionResult,false); // if the conversion of string doesn't work
   // If speech capture is successful, continue the conversation
   if (success) 
   {
      misty.Debug("Successfully processed speech! ... you said something which is.." + Speech_In_Text);
      //use radomizer for misty's responses for now
     if(word_accuracy_hru > 70 || word_accuracy_rur > 70 || word_accuracy_fr > 70)
     {
         misty.Set("yourResponse", Speech_In_Text, false);
         misty.Debug("ONE OF THE ACCUracies came to pass!!!!!!!!");
         misty.Pause(1000);
        // misty.RegisterEvent("MainConversation")
        //misty.UnregisterEvent("Convo");
         _MainConversation();
        // misty.UnregisterEvent("Convo");// make sure the conversation event isn't still running once we have desired response
     }

     else if(word_accuracy_fr < 70 && word_accuracy_hru < 70 && word_accuracy_rur < 70)
     {
       speakTheText("I don't compute anything you said, try again");
      // misty.Pause(6000);
       misty.Pause(4000);
       Start_The_Convo(); //restarting part or whole conversation because didn't recognize utterance
       misty.Pause(1000);
       misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
       misty.Pause(8000);
     }

    }
    else if(word_accuracy_fr < 70 && word_accuracy_hru < 70 && word_accuracy_rur < 70)
     {
       speakTheText("I don't compute anything you said, try again");
      // misty.Pause(6000);
       misty.Pause(4000);
       Start_The_Convo(); //restarting part or whole conversation because didn't recognize utterance
       misty.Pause(1000);
       misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
       misty.Pause(8000);
     }
}

//misty.Pause(10000);
//MainConversation();

function _MainConversation()
{
    misty.MoveArmDegrees("both", 0, 0, 100);
    misty.MoveHead(0, 0, 0, 0, 50);
    var random_choice = Math.floor(Math.random() * 3);
    misty.UnregisterEvent("Convo");
    misty.Debug("the current accuracy of words1 is..." + misty.Get("wordAcc1"));
    //depending on accuracy of a statement,... proceed
 //    if(Speech_In_Text == "How are you misty?"){
       if(misty.Get("wordAcc1") > 70.0)
       {
           misty.UnregisterEvent("Convo");
           misty.Debug("misty heard you say how are you misty.... random choice = " + random_choice);
           //misty.Pause(3000);
        switch(random_choice)
        {
            case 0:
                misty.UnregisterEvent("Convo");
                misty.MoveHeadDegrees(-30, -40, -20, 80);
                misty.MoveArmDegrees("right", -90, 100);
                //set global variables
                misty.Set("MistyExpects1", "I am great", false );
                misty.Set("MistyExpects2", "Not too good", false);
                misty.Set("MQU", "I didn't understand what you said, How about you", false);

                misty.Set("mistySecondR1", "Good for you. Goodbye");
                misty.Set("mistySecondR2", "I am sorry, I am just a robot, I can't help you with that", false);
                speakTheText("I am fine, how about yourself");
                //get response from user/robot
                misty.Pause(4000);
                Start_The_Convo2();
                misty.Pause(2000);
                misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
               // misty.Pause(7500);//may not need this...in the function loopconversation
               // misty.UnregisterEvent("Convo2");
               // newResponse = data.AdditionalResults[4].toString;
                misty.Pause(8000);//may not need this...in the function loopconversation

                break;
            case 1:
                misty.UnregisterEvent("Convo");
                misty.MoveHeadDegrees(-30, -40, -20, 80);
                misty.MoveArmDegrees("right", -90, 100);

                misty.UnregisterEvent("Convo");
                misty.Set("MistyExpects1", "You are funny Misty", false );
                misty.Set("MistyExpects2", "You are not candy Misty", false);
                misty.Set("MQU", "I didn't hear you. Speak up", false);

                misty.Set("mistySecondR1", "If you need a ride to school remember I can tranform into a roadbot", false);
                misty.Set("mistySecondR2", "They say you are what you eat. I am robot ten candy", false);
                speakTheText("Nice and dandy like cotton candy");
                misty.Pause(4000);
                //set global variables

                //get response from user/robot
                Start_The_Convo2();
                misty.Pause(1000);
                misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
                misty.Pause(7500);//may not need this...in the function loopconversation
               
                break;
            case 2:
                 //misty shakes her head lol I WANT HER TO SHAKE HER HEAD 
                 misty.UnregisterEvent("Convo");
                 misty.MoveHeadDegrees(-30, -40, -20, 80);
                 misty.MoveArmDegrees("right", -90, 100);

                 misty.Set("MistyExpects1", "Well sorry I asked", false );
                 misty.Set("MistyExpects2", "Bad misty bad", false);
                 misty.Set("MQU", "What was that. I didn't hear you", false);
 
                 misty.Set("mistySecondR1", "You should be. I don't get paid to listen to you", false);
                 misty.Set("mistySecondR2", "I'll never forget the first time we met. But I'll keep trying", false);
 
                speakTheText("I was fine until you asked");
                //more responses
                misty.Pause(3000);

                //set global variables

                //get response from user/robot
                Start_The_Convo2();
                misty.Pause(1000);
                misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
                misty.Pause(8000);//may not need this...in the function loopconversation
               
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
     else if(word_accuracy_fr > 70.0)
     {
        switch(random_choice)
        {
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

//misty will respond to the second utterance she hears
function _IsReady(textToSay1, textToSay2)
{
  //  misty.MoveArmDegrees("both", -20, 0, 100);
  //  misty.MoveHead(-30, -30, 0, 0, 50);
    misty.UnregisterEvent("Convo2");
    wordAcc1 = similar(misty.Get("yourResponse"), misty.Get("MistyExpects1"));
    wordAcc2 = similar(misty.Get("yourResponse"), misty.Get("MistyExpects2"));
    misty.Debug("word acc 1 value = " + wordAcc1 + " |word acc 2 value = " + wordAcc2);
    if(wordAcc1 >= 65.0)
    {   
        //misty reacts to second utterance by moving head and arms
        misty.MoveHeadDegrees(-30, 40, 20, 80);
        misty.MoveArmDegrees("right", 90, 100);
        misty.MoveArmDegrees("left", -90, 100);
        //THESE NEED TO ALSO HAVE WORD CONFIDENCE 
        //  Start_The_Convo2();
        speakTheText(textToSay1); //Since this is an incredibly  basic conversation we will stop here
        misty.ChangeLED(255, 0, 0); 
        misty.Pause(5000);
        misty.UnregisterEvent("Convo");
        misty.MoveHeadDegrees(0, 0, 0, 80);
        misty.MoveArmDegrees("both", -90, 100);
       // misty.ChangeLED(255, 0, 0); //display red led for stopping everything
        misty.UnregisterEvent("Convo2");
        misty.UnregisterEvent("Convo");
        misty.UnregisterAllEvents();
        //will use this same function in every continueing conversation so it will reset itself

       // ending the conversation here for now but can add even more later
     }
     else if(wordAcc2 >= 65.0)
     {
        misty.MoveHeadDegrees(-30, 40, 20, 80);
        misty.MoveArmDegrees("right", 90, 100);
        misty.MoveArmDegrees("left", -90, 100);
         speakTheText(textToSay2);
         misty.ChangeLED(255, 0, 0); 
         misty.Pause(5000);
        misty.MoveHeadDegrees(0, 0, 0, 80);
        misty.MoveArmDegrees("both", -90, 100);
        // misty.ChangeLED(255, 0, 0); //display red led for stopping everything
         misty.UnregisterEvent("Convo2");
         misty.UnregisterEvent("Convo");
         misty.UnregisterAllEvents();
         //will use this same function in
     }
}
    



function _Convo2(data)
{
    //store the results from the new response...misty and return it as a string
    var success = data.AdditionalResults[1];
    var errorCode = data.AdditionalResults[2];
    var errorMessage = data.AdditionalResults[3];
    Speech_In_Text = data.AdditionalResults[4].toString();
    misty.Debug("What is currenly being read in is .. " + Speech_In_Text);
    misty.Set("yourResponse", Speech_In_Text, false);
    //nextResponse = similar(Speech_In_Text, misty.Get("nextResponse"))
    misty.Debug("Current percentage word 1 " + similar(misty.Get("MistyExpects1"), misty.Get("yourResponse")) + "and the word is " + misty.Get("yourResponse"));
   // misty.Debug("Current percentage for word 2.. " + similar(misty.Get("MistyExpects2"), misty.Get("yourResponse")) + "and the word is " + misty.Get("yourResponse"));
    misty.Debug("your response right this second is --- " + misty.Get("yourResponse"));

    _LoopConversation(misty.Get("MistyExpects1"), misty.Get("MistyExpects2"), misty.Get("MQU"));
    


}



//may need to create event so that loopconversation continues to loop... POTENTIALLY -REMOVE THIS IF THE
//CURRENT FUNCTIONALITY WORKS
function _LoopConversation(text, text2, text3)
{
    existingConversation1 = similar(text, misty.Get("yourResponse"));
    existingConversation2 = similar(text2, misty.Get("yourResponse"));
    misty.Debug("we are here NOWWWWWWWWWW OMGGGGGG");
    if(existingConversation1 < 70 && existingConversation2 < 70)
    {
        
        moreTime = 7500 + misty.Get("TimeDown");
        misty.Set("TimeDown", moreTime, false);
       // misty.set("nextResponse", "", false); //reset current response by ythe user or robot
        misty.Debug("still haven't gotten an excepted string.. keep trying");

        //unregistrer convo2 then reinitialize...you may not need to do this.. TEST

        //if need event
       // RegisterEvent()
        //misty.UnregisterEvent();
        speakTheText(text3);
        misty.Pause(5000); // let the robot's utterance complete and allow for listening
        Start_The_Convo2();
        misty.Pause(2000);
        misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
        misty.Pause(8000);
    }
    else if(existingConversation1 > 70 || existingConversation2 > 70)
    {
        misty.Debug("the users response matches predifined misty question/response..continueing execution..");
// -- the function to run when misty responds once more
        //kill the event once we have desired response outcome
      //  misty.Pause(2000);
        _IsReady(misty.Get("mistySecondR1"), misty.Get("mistySecondR2"));
        misty.UnregisterEvent("Convo2");
    }
}
//change
/********************************************** */
function Start_The_Convo()
{
    misty.AddReturnProperty("Convo", "Filename");
    misty.AddReturnProperty("Convo", "Success");
    misty.AddReturnProperty("Convo", "ErrorCode");
    misty.AddReturnProperty("Convo", "ErrorMessage");
    misty.AddReturnProperty("Convo", "SpeechRecognitionResult");
    misty.RegisterEvent("Convo", "VoiceRecord", 100, true);
}

function Start_The_Convo2()//CONVO 2 TO BE USED WHEN MISTY HAS TO GET NEW INPUT FRON USER/ROBOT BECAUSE THEIR VERBAL STATEMENT
//DIDNT CONTAIN PREDEFINED QUESTIONS/STAEMENTS
{
    misty.AddReturnProperty("Convo2", "Filename");
    misty.AddReturnProperty("Convo2", "Success");
    misty.AddReturnProperty("Convo2", "ErrorCode");
    misty.AddReturnProperty("Convo2", "ErrorMessage");
    misty.AddReturnProperty("Convo2", "SpeechRecognitionResult");
    misty.RegisterEvent("Convo2", "VoiceRecord", 100, true);
}
//misty.Pause(8000);

//calculate the word confidence so that misty can pick up most of what is said even
//if it isn't 100% accurate
function similar(a,b)
{
    var equivalency = 0;
    var minLength = (a.length > b.length) ? b.length : a.length;    
    var maxLength = (a.length < b.length) ? b.length : a.length;    
    for(var i = 0; i < minLength; i++)
     {
        if(a[i] == b[i]) 
            {
                equivalency++;
            //    misty.Debug("the eq is = ... " + equivalency); //make sure the for loop works
            }
    }
    var weight = equivalency / maxLength;
    return (weight * 100);
}

/*************Speak the text from the bot response */

function speakTheText(text) {
    // TTS
    var arguments = JSON.stringify({
        'input': {
            'text': text
        },
        'voice': {
            'languageCode': "en-US",//choose languase for misty to speak
            'ssmlGender': "MALE" //choose gender
        },
        'audioConfig': {
            'audioEncoding': "LINEAR16",

            "effectsProfileId": [
                "small-bluetooth-speaker-class-device"
            ],
            "pitch": 0.9,
            "speakingRate": 0.85
        }
    });
    //send an external request to google text to sound api
    misty.SendExternalRequest("POST", "https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=" 
    + _params.APIKEY_GoogleTTS, null, null, arguments, false, false, null, "application/json", "_Base64In");
}

// ==================== Audio returned from Google ====================
//save the audio that misty will speak
function _Base64In(data)
 {
        misty.SaveAudio("TTS.wav", JSON.parse(data.Result.ResponseObject.Data).audioContent, true, true);
    
}
/************************************************* */
