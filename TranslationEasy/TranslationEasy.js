/*probably wont work without api*/
 
function compareAudio(aud1, aud2)
{ 
   var average =0;
   //dindt work----- need to think of something else
    return average;
}
misty.DisplayImage("e_DefaultContent.jpg");
misty.ChangeLED(255, 22, 5);//change led before start recording
misty.Pause(1000);//wait one sec and once the blue light on the robots right side turns on, you are good to go
misty.StartRecordingAudio("audio1.wav");//save the audio
misty.Pause(2000);
misty.StopRecordingAudio(null);//stop the recording
misty.ChangeLED(5, 9, 255);//easy too see that we are done
misty.Pause(1000);

misty.ChangeLED(255, 22, 5)//ready to start the translation.
if(compareAudio("audio1.wav","./audios/Hello.mp3")>45 && compareAudio("audio1.wav","./audios/Hello.mp3")<48)//1
{   //hello World
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage("oi1.png");
    misty.RegisterTimerEvent("done", 3000, false)
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","./audios/GoodMorning.mp3")>60)//2
{   //good morning
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage("goodMorning.png"); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","./audios/GoodAfternoon.mp3")>60)//3
{   //good afternoon
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage("goodAfternoon.png");
    //could also be an audio, not a big change 
}
else if(compareAudio("audio1.wav","./audios/GoodNight.mp3")>60)//4
{   //good night
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage("GoodNight.png"); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","./audios/HowAreYou.mp3")>60)//5
{   //How are you
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage("howAreYou.png"); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","./audios/WhatIsYourName.mp3")>60)//6
{   //What is your name?
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage("name.png"); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","./audios/bathroom.mp3")>60)//7
{   //Where is the bathroom?
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage(""); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","./audios/NiceToMeetYou.mp3")>60)//8
{   //Nice to meet you
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage(""); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","./audios/MNIMisty.mp3")>60)//9
{
    //My name is Misty 
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage(""); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","./audios/Hard.mp3")>60)//10
{
    //this is hard
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage(""); 
    //could also be an audio, not a big change
}
else
{
    //phrase not in the "dictonary", display something
}

function _done(repeat = true)
{
    misty.Pause(3000);
    if (repeat) misty.RegisterTimerEvent(
        "done",
        3000,
        false);
}
/*
    2 think about what the average between audios should be.
    4 start thinking about the definition of the translation medium
    BUGS: need to upload the skill everytime, otherwise, the results stay saved for next run.
*/
