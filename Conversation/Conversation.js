//Goal: Misty responds to used uttered phrases to simulate a short conversation
/*
//*  PROCESS: This program utilizes the google Speech-To-Text and Text-To-Speech APIs to simulate a somewhat fluid conversation.
              Misty begins the conversation with greeting and instructs user to speak when they see the blue light.misty.
              When the blue light displays anywhere during the conversation Misty will listen for audio up to 7 seconds.
              Audio inputted from the user or environment will then be sent to the google speech-to-text API.
              Text returned from the API call is then compared to 1 or possibly endless beginning conversation utterances.
              "How are you misty" is the only accepted string value that the returned text value must be at least 70% similar. 
              If the value returned isn't similar, Misty asks the user to speak again until she recognizes what is stated.
              This program intentionally uses registered events in places where while loops could better be utilized to get
              a better sense of how they operate. Try replacing the second conversation starter with a while loop!
              After accepting your audio input, Misty will randomly respond in three ways. Similar to the first part of the
              conversation, the user will then need to reply when they see the blue light again to continue the conversation.
              Misty will then accept two possible string values within 70% confidence so she may respond one last time.
              This code is an alternative to utilizing a paid conversation API.
              You may input ANY string values you wish into the code below to have differing conversations with Misty.
              Anytime Misty speaks during the conversation, she sends her response string value to the Text-To-Speech API which then
              sends the audio input into the base64 function so that the newly encoded audio file be played inside that call.

*/
misty.DeleteAudio("tts.wav"); //delete this audio file granted it is still saved to internal memory of misty.. used with TTS API

//Define all global variables(remember Misty won't automatically store values of variables defined outside the scope of a function
//                            so you must save data values in her local storage so any function can access them)
//PREDEFINED PHRASES/UTTERANCES
misty.Set("HowAreYou", "How are you misty?",false);
misty.Set("NotReal", "Are you a robot misty?",false);
misty.Set("friends", "Are we friends misty?", false);


misty.Set("yourResponse", "", false); //store the users actual uttered response
misty.Set("MistyExpects1", "",false);//store the current response misty expects
misty.Set("MistyExpects2", "", false);

misty.Set("MQU", "", false); // store the randomly selected Misty response within the next part of the conversation

//stores the string values of all three accepted utterances to begin conversation
misty.Set("wordAcc1", "", false);
misty.Set("wordAcc2", "", false);
misty.Set("wordAcc3","",false);

//Misty's second response string inputted here within the main conversation function
misty.Set("mistySecondR1", "", false);
misty.Set("mistySecondR2", "", false);


//Play some audio from misty using the TTS API before it records audio to prompt robot/user to sstart conversation
speakTheText("Please speak when you see blue light");
misty.Pause(4000); //wait four seconds before executing next line of code
speakTheText("Hey there. I'm misty");
misty.Pause(3000);//wait three seconds... these pauses are used so the next line isn't executed while Misty is still talking

//React by rotating misty arms upwards
misty.MoveArmDegrees("both", -90, 0, 150);
misty.MoveHead(-5, 5, -2, 0, 10);

//Start the conversation now
Start_The_Convo();
misty.Pause(1000);

//audio inputted into misty is sent to the google speech to text api and sent back directly into the _Convo function
// parameters: overwriteExisting, silenceTimeout, maxSpeechLength, requireKeyPhrase, captureFile, speechRecognitionLanguage, key
misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);


/*********************************************** FUNCTION _CONVO ******************************************************************** */
function _Convo(data) 
{
   // Get data from AdditionalResults array
 // THIS IS A VERY BASIC VERSION OF CONVERSATION WHICH CAN CONSISTENTLY BE ADDED TO, 
 // HOWEVER WE NEED TO UTILIZE AN API TO MAKE THIS SIGNIFICANTLY MORE SEEMLESS
 // WE CAN STILL USE ALL THE CONDITIONALS AND RESPONSES THROUGH THE API
   var success = data.AdditionalResults[1];//check to see if data was returned
   Speech_In_Text = data.AdditionalResults[4].toString(); //Store the speech as text string 
   misty.Set("yourResponse" , Speech_In_Text, false);
   //define the utterances that mistyshould recognize...
   //more will surely be added here lol....gotta make her more robust

   //compare the percentage confidence of the string read in to the three string values she currently recognize
   word_accuracy_hru = similar(Speech_In_Text,misty.Get("HowAreYou"));
   word_accuracy_rur = similar(Speech_In_Text, misty.Get("NotReal"));
   word_accuracy_fr = similar(Speech_In_Text, misty.Get("friends"));

   //store the read in values into there respective global variable to be accessed outside this function
   misty.Set("wordAcc1", word_accuracy_hru, false);
   misty.Set("wordAcc2", word_accuracy_rur, false);
   misty.Set("wordAcc3", word_accuracy_fr, false);

   // If speech capture is successful, continue the conversation
   if (success) 
   {
       //output message to console if data was successfully read in
      misty.Debug("Successfully processed speech! ... you said something which is.." + Speech_In_Text);
      //use radomizer for misty's responses for now
     if(word_accuracy_hru > 70 || word_accuracy_rur > 70 || word_accuracy_fr > 70)
     {
         //store the phrase into the yourResponse global variable to be accessed in the main conversation
         misty.Set("yourResponse", Speech_In_Text, false); 
         misty.Pause(1000);             // pause misty for one second 
         _MainConversation();          //if a recognizable phrase is read in, start the next part of the conversation

     }

     //force user to utter new phrase because the one registered isn't recognized
     else if(word_accuracy_fr < 70 && word_accuracy_hru < 70 && word_accuracy_rur < 70)
     {
       speakTheText("I don't compute anything you said, try again"); //
       misty.Pause(4000); 
       Start_The_Convo(); //restarting part or whole conversation because didn't recognize utterance
       misty.Pause(1000);
       misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
       misty.Pause(8000);
     }

   }
   else //Simply have user utter phrase again because the audio originally listened to wasn't successfully read in through the API
   {
       speakTheText("I don't compute anything you said, try again");
       misty.Pause(4000); //pause misty for 4 seconds
       Start_The_Convo(); //restarting part or whole conversation because didn't recognize utterance
       misty.Pause(1000); //pause misty for 1 second
       misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
       misty.Pause(8000); //pause misty for 8 seconds
   }
}
/******************************************************************************************************************************************* */

/************************************** FUNCTION _MAINCONVERSATION ************************************************************************ */
/*
    Depending on 1 of the 3(or more if you add them) recognized phrases, misty will respond one more time.
    Misty then accepts two phrase strings within the second part of the conversation.
    Misty responds with a specific phrase depending on which of the 2 utterances
    that are read in at this part of the conversation.
    The conversation is over after misty reponds once more....you may add as many potential phrases
    recognized and phrases Misty says as a response here....
*/
function _MainConversation()
{
    misty.MoveArmDegrees("both", 0, 0, 100); //reset misty's arm and head to the original state
    misty.MoveHead(0, 0, 0, 0, 50);
    var random_choice = Math.floor(Math.random() * 3); // store random int from 0 - 2
    misty.UnregisterEvent("Convo"); //unregister the Convo event so it won't continously run whilst inside this function

    //depending on accuracy of a statement,... proceed
    //determine out of the three recognized phrases to begin the conversation is actually within the wordAcc1 global variable
       if(misty.Get("wordAcc1") > 70.0) // if the contents of wordAcc1 = "How are you misty?"
       {
        //respond to the initial greeting depending on the random int calculated within random_choice variable
        switch(random_choice)
        {
            case 0:              
                misty.UnregisterEvent("Convo");
                misty.MoveHeadDegrees(-30, -40, -20, 80); // misty reacts to next part of conversation
                misty.MoveArmDegrees("right", -90, 100);
                //set global variables
                misty.Set("MistyExpects1", "I am great", false ); //store strings into global variables
                misty.Set("MistyExpects2", "Not too good", false);//recognized phrases misty will accept

                misty.Set("MQU", "I didn't understand what you said, How about you", false); //what misty will say if you 
                //don't utter phrases defined within MistyExpects1 and 2

                //misty outputs contents of this string as audio
                //if user's phrase is mostly similar to contents of MistyExpects1
                misty.Set("mistySecondR1", "Good for you. Goodbye", false); 

                //misty outputs contents of this string as audio
                //if user's phrase is mostly similar to contents of MistyExpects2
                misty.Set("mistySecondR2", "I am sorry, I am just a robot, I can't help you with that", false);

                speakTheText("I am fine, how about yourself"); //Misty will output audio equivalent to string value using TTS API
                //get response from user/robot
                misty.Pause(4000);
                Start_The_Convo2(); //Begin the next part of the conversation
                misty.Pause(2000);
                misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT); //listen for audio from user
                misty.Pause(8000);

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
              
                //get response from user/robot
                Start_The_Convo2();
                misty.Pause(1000);
                misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
                misty.Pause(7500);
               
                break;
            case 2:
                 misty.UnregisterEvent("Convo");
                 misty.MoveHeadDegrees(-30, -40, -20, 80);
                 misty.MoveArmDegrees("right", -90, 100);

                 misty.Set("MistyExpects1", "Well sorry I asked", false );
                 misty.Set("MistyExpects2", "Bad misty bad", false);
                 misty.Set("MQU", "What was that. I didn't hear you", false);
 
                 misty.Set("mistySecondR1", "You should be. I don't get paid to listen to you", false);
                 misty.Set("mistySecondR2", "I'll never forget the first time we met. But I'll keep trying", false);
 
                speakTheText("I was fine until you asked");
                misty.Pause(3000);

                //get response from user/robot
                Start_The_Convo2();
                misty.Pause(1000);
                misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
                misty.Pause(8000);
                break;
        }
     }

     else if(word_accuracy_rur > 70.0) //if contents of NotReal = "Are you a robot misty?" minimum 70% accuracy
     {
        switch(random_choice)
        {
            //note that options 0 - 2 determine how misty responds to are you a robot misty... add what you like here
            case 0:
                misty.UnregisterEvent("Convo"); //second attempt at unregistering the previous event...
                misty.MoveHeadDegrees(-30, -40, -20, 80); // misty reacts to next part of conversation
                misty.MoveArmDegrees("right", -90, 100);
                //set global variables
                misty.Set("MistyExpects1", "", false ); //refer to previous conversation "How are you"
                misty.Set("MistyExpects2", "", false);  //You can place any string her you expect misty to listen to and recognize
                //what misty will expect after she responds to are you a robot misty

                misty.Set("MQU", "", false);  //this value holds the response misty utters if she doesn't recognize an uttered phrase

                misty.Set("mistySecondR1", "", false); //this global variable holds Misty's response to the string in MistyExpects1
                misty.Set("mistySecondR2", "", false); //this global variable holds Misty's response to the string in MistyExpects2
                speakTheText(""); //misty verbally outputs the string value. her direct response to "Are you a robot misty?"
                //you will want to change misty's response here depeding on which part of the switch case you are within

                //get response from user/robot
                misty.Pause(4000); //pause for 4 seconds
                Start_The_Convo2(); // use the contents from the variables set within this case to this function to finish conversation
                misty.Pause(2000);
                misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
                misty.Pause(8000);
                break;
            case 1:
                misty.UnregisterEvent("Convo"); //second attempt at unregistering the previous event...
                misty.MoveHeadDegrees(-30, -40, -20, 80); // misty reacts to next part of conversation
                misty.MoveArmDegrees("right", -90, 100);
                //set global variables
                misty.Set("MistyExpects1", "", false ); //refer to previous conversation "How are you"
                misty.Set("MistyExpects2", "", false);  //You can place any string her you expect misty to listen to and recognize
                misty.Set("MQU", "", false);  //this value holds the response misty utters if she doesn't recognize an uttered phrase

                misty.Set("mistySecondR1", "", false); //this global variable holds Misty's response to the string in MistyExpects1
                misty.Set("mistySecondR2", "", false); //this global variable holds Misty's response to the string in MistyExpects2
                speakTheText(""); //misty verbally outputs the string value. her direct response to "Are you a robot misty?"
                //you will want to change misty's response here depeding on which part of the switch case you are within

                //get response from user/robot
                misty.Pause(4000); //pause for 4 seconds
                Start_The_Convo2(); // use the contents from the variables set within this case to this function to finish conversation
                misty.Pause(2000);
                misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
                misty.Pause(8000);
                break;
            case 2:
                misty.UnregisterEvent("Convo"); //second attempt at unregistering the previous event...
                misty.MoveHeadDegrees(-30, -40, -20, 80); // misty reacts to next part of conversation
                misty.MoveArmDegrees("right", -90, 100);
                //set global variables
                misty.Set("MistyExpects1", "", false ); //refer to previous conversation "How are you"
                misty.Set("MistyExpects2", "", false);  //You can place any string her you expect misty to listen to and recognize
                misty.Set("MQU", "", false);  //this value holds the response misty utters if she doesn't recognize an uttered phrase

                misty.Set("mistySecondR1", "", false); //this global variable holds Misty's response to the string in MistyExpects1
                misty.Set("mistySecondR2", "", false); //this global variable holds Misty's response to the string in MistyExpects2
                speakTheText(""); //misty verbally outputs the string value. her direct response to "Are you a robot misty?"
                //you will want to change misty's response here depeding on which part of the switch case you are within

                //get response from user/robot
                misty.Pause(4000); //pause for 4 seconds
                Start_The_Convo2(); // use the contents from the variables set within this case to this function to finish conversation
                misty.Pause(2000);
                misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
                misty.Pause(8000);
                break;
        }
     }
     else if(word_accuracy_fr > 70.0) //if contents of friends = "Are we friends"
     {
        /*
                //use the code below within the case statements to determine what misty says to the user and
                //what misty recognizes so she can continue the conversation
                //you may use this block of code to make as many recognizable phrases and responses to those phrases
                //keep in mind you can also add as many initial potential responses through the switch case statement

                misty.UnregisterEvent("Convo"); //second attempt at unregistering the previous event...
                misty.MoveHeadDegrees(-30, -40, -20, 80); // misty reacts to next part of conversation
                misty.MoveArmDegrees("right", -90, 100);
                //set global variables
                misty.Set("MistyExpects1", "", false ); //refer to previous conversation "How are you"
                misty.Set("MistyExpects2", "", false);  //You can place any string her you expect misty to listen to and recognize
                misty.Set("MQU", "", false);  //this value holds the response misty utters if she doesn't recognize an uttered phrase

                misty.Set("mistySecondR1", "", false); //this global variable holds Misty's response to the string in MistyExpects1
                misty.Set("mistySecondR2", "", false); //this global variable holds Misty's response to the string in MistyExpects2
                speakTheText(""); //misty verbally outputs the string value. her direct response to "Are you a robot misty?"
                //you will want to change misty's response here depeding on which part of the switch case you are within

                //get response from user/robot
                misty.Pause(4000); //pause for 4 seconds
                Start_The_Convo2(); // use the contents from the variables set within this case to this function to finish conversation
                misty.Pause(2000);
                misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
                misty.Pause(8000);
        */
        switch(random_choice)
        {
            case 0:
            break;
            case 1:
            break;
            case 2:
            break;
        }
     }
}
/******************************************************************************************************************************************* */

/************************************************* FUNCTION _ISREADY **************************************************************************/
//misty will respond to the second utterance she hears
//parameters: textToSay1 = string, textToSay2 string
function _IsReady(textToSay1, textToSay2)
{
    misty.UnregisterEvent("Convo2"); //similar to Convo registered event, unregister convo2 so it doesn't continously call its inside function
    wordAcc1 = similar(misty.Get("yourResponse"), misty.Get("MistyExpects1")); //compare what the user states to what phrase misty expects
    wordAcc2 = similar(misty.Get("yourResponse"), misty.Get("MistyExpects2"));
    if(wordAcc1 >= 65.0) // if the user response is mostly similiar to the contents of MistyExpects1
    {   
        //misty reacts to second utterance by moving head and arms
        misty.MoveHeadDegrees(-30, 40, 20, 80);
        misty.MoveArmDegrees("right", 90, 100);
        misty.MoveArmDegrees("left", -90, 100);
        //THESE NEED TO ALSO HAVE WORD CONFIDENCE 
        //  Start_The_Convo2();
        speakTheText(textToSay1); // Misty outputs audio of the string equivalent for the response value to MistyExpects1
        misty.ChangeLED(255, 0, 0); //Misty LED flashes red
        misty.Pause(5000); //pause for 5 seconds
        misty.MoveHeadDegrees(0, 0, 0, 80);
        misty.MoveArmDegrees("both", -90, 100);
        misty.UnregisterEvent("Convo2"); //all events are unregistered... for some reason there are times where previous
        misty.UnregisterEvent("Convo"); //calls to unregister events didn't work so this is the last line
        misty.UnregisterAllEvents(); //ALL EVENTS ARE STOPPED SO THEIR FUNCTION CALLS WON'T CONTINUE
        //will use this same function in every continueing conversation so it will reset itself
       // ending the conversation here for now but can add even more later
     }
     else if(wordAcc2 >= 65.0) //If the user response is mostly similar to the contents of MistyExpects2
     {
        misty.MoveHeadDegrees(-30, 40, 20, 80);
        misty.MoveArmDegrees("right", 90, 100);
        misty.MoveArmDegrees("left", -90, 100);
        speakTheText(textToSay2);
        misty.ChangeLED(255, 0, 0); 
        misty.Pause(5000);
        misty.MoveHeadDegrees(0, 0, 0, 80);
        misty.MoveArmDegrees("both", -90, 100);
        misty.UnregisterEvent("Convo2");
        misty.UnregisterEvent("Convo");
        misty.UnregisterAllEvents();
     }
}
/*********************** *******************************************************************************************************************/  

/*************************************** FUNCTION _CONVO2 ******************************************************************************* */
//initialize the final part of the conversation... remember we are using events here..you could exchange this with a while loop instead
//to circumvent the issue of events being called after a predifined time within the event
//parameter - data holds the contents read in from CaptureGoogleSpeech call
function _Convo2(data)
{
    //the string we need is found with the additionalresults at index 4 
    Speech_In_Text = data.AdditionalResults[4].toString(); //convert data read in into string
    misty.Set("yourResponse", Speech_In_Text, false);

    //output the global variable current values to prove what is being sent to LoopConversation is what is expected
    misty.Debug("Current percentage word 1 " + similar(misty.Get("MistyExpects1"), misty.Get("yourResponse")) + "and the word is " + misty.Get("yourResponse"));
    misty.Debug("your response right this second is --- " + misty.Get("yourResponse"));
    misty.Pause(3000); //pause misty for 3 seconds

    //read in contents of the global variables to execute the function(details within the function)
    _LoopConversation(misty.Get("MistyExpects1"), misty.Get("MistyExpects2"), misty.Get("MQU"));

}
/**************************************************************************************************************************************** */

/****************************************** FUNCTION _LOOPCONVERSATION ************************************************************************** */
//Restart _Convo2 event recursively until the user utters a recognized phrase from within the respective switch case statement structure
function _LoopConversation(text, text2, text3)
{
    //compare the user uttered phrase to what misty accepts for the second part of the conversation(refer to MistyExpects1 and MistyExpect2 contents)
    existingConversation1 = similar(text, misty.Get("yourResponse"));
    existingConversation2 = similar(text2, misty.Get("yourResponse"));

    if(existingConversation1 < 70 && existingConversation2 < 70) //if the read in phrase isn't recognized
    {
        //speak text read from contents of global variable MQU
        speakTheText(text3);
        misty.Pause(5000); // let the robot's utterance complete and allow for listening..pause for 5 seconds
        Start_The_Convo2(); //start the function again so it may register the _Convo2 event again
        misty.Pause(2000);
        misty.CaptureSpeechGoogle(false, 4000, 6500, false, true, "en-us", _params.APIKEY_GoogleSTT);
        misty.Pause(8000);
    }
    else if(existingConversation1 > 70 || existingConversation2 > 70)
    {
        //if a desired phrase is read in, finish the conversation
        _IsReady(misty.Get("mistySecondR1"), misty.Get("mistySecondR2"));
        misty.UnregisterEvent("Convo2"); //unregister the Convo2 event so it doesn't contionously run 
    }
}
/*********************************************************************************************************************************** */

/************************ FUNCTION START_THE_CONVO ********************** */
function Start_The_Convo()
{
    misty.AddReturnProperty("Convo", "Filename"); //file name to save data to
    misty.AddReturnProperty("Convo", "Success");  //determines if data/audio was read in successfully
    misty.AddReturnProperty("Convo", "ErrorCode"); //contains error code regarding read in data
    misty.AddReturnProperty("Convo", "ErrorMessage"); //contains error message regarding read in data
    misty.AddReturnProperty("Convo", "SpeechRecognitionResult"); //contains the string value that audio was translated into
    misty.RegisterEvent("Convo", "VoiceRecord", 100, true); //registers event that calls the function _Convo
}
/************************************************************************ */

/************************FUNCTION START_THE_CONVO2*********************** */
function Start_The_Convo2()
{
    misty.AddReturnProperty("Convo2", "Filename");
    misty.AddReturnProperty("Convo2", "Success");
    misty.AddReturnProperty("Convo2", "ErrorCode");
    misty.AddReturnProperty("Convo2", "ErrorMessage");
    misty.AddReturnProperty("Convo2", "SpeechRecognitionResult");
    misty.RegisterEvent("Convo2", "VoiceRecord", 100, true); //registers event that calls the function _Convo2
} 
/************************************************************************** */

/***********************FUNCTION SIMILAR *********************************** */
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
            }
    }
    var weight = equivalency / maxLength;
    return (weight * 100); //RETURN THE SIMILARITY CONFIDENCE VALUE AS A PERCENTAGE
}
/******************************************************************************* */

/****************** FUNCTION SPEAKTHETEXT ****************************************/

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
            "pitch": 0.9,
            "speakingRate": 0.85
        }
    });
    //send an external request to google text to sound api
    misty.SendExternalRequest("POST", "https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=" 
    + _params.APIKEY_GoogleTTS, null, null, arguments, false, false, null, "application/json", "_Base64In");
}
/*********************************************************************************************************** */

// ==================== Audio returned from Google ====================
//save the audio that misty will speak
function _Base64In(data)
{
        misty.SaveAudio("TTS.wav", JSON.parse(data.Result.ResponseObject.Data).audioContent, true, true);
    
}
/***************************************************/
