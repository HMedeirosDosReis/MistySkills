function compareAudio(aud1, aud2)
{ 
    var audio1 = aud1; 
    var audio2 = aud2;
    var i,j,d;
    var matching = 0;
    var t = 0;var i,j,d;
    var matching = 0;
    var t = 0;
    var audio1Arr = Array();
    var audio1Len = audio1.length;
    for (i = 1; i<=audio1Len; i++)
    {
        //reverse so its like a stack
        d = audio1.charCodeAt(audio1Len-i);
        for (j = 0; j < 8; j++) 
        {
            audio1Arr.push(d%2);
            d = Math.floor(d/2);
        }
    }
    var audio2Len = audio2.length;
    for (i = 1; i<=audio2Len; i++)
    {
        //reverse so its like a stack
        d = audio2.charCodeAt(audio2Len-i);
        for (j = 0; j < 8; j++) 
        {
            if(d%2 == audio1Arr[t])
            {
                matching++;
            }
            d = Math.floor(d/2);
            t++;
        }
    }
    var avarage = Number(matching)/((Number(t)+Number(audio1Arr.length))/Number(2))*Number(100);
    
    //need to figure out what is a good average for comparing both audios
    //this can be very tricky, but it is the only solution I found so far. 
    //At least for the easy version.
    return avarage;
}

misty.ChangeLED(255, 22, 5);//change led before start recording
misty.Pause(1000);//wait one sec and once the blue light on the robots right side turns on, you are good to go
misty.StartRecordingAudio("audio1.wav");//save the audio
misty.Pause(2000);
misty.StopRecordingAudio(null);//stop the recording
misty.ChangeLED(5, 9, 255);//easy too see that we are done
misty.Pause(1000);

misty.ChangeLED(255, 22, 5)//ready to start the translation.
if(compareAudio("audio1.wav","Hello.mp3")>60)//1
{   //hello World
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage("");
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","GoodMorning.mp3")>60)//2
{   //good morning
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage(""); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","GoodAfternoon.mp3")>60)//3
{   //good afternoon
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage("");
    //could also be an audio, not a big change 
}
else if(compareAudio("audio1.wav","GoodNight.mp3")>60)//4
{   //good night
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage(""); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","HowAreYou.mp3")>60)//5
{   //How are you
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage(""); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","WhatIsYourName.mp3")>60)//6
{   //What is your name?
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage(""); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","Hello.mp3")>60)//7
{   //Where is the bathroom?
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage(""); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","NiceToMeetYou.mp3")>60)//8
{   //Nice to meet you
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage(""); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","MNIMisty.mp3")>60)//9
{
    //My name is Misty 
    //this should display an image of the word translated on misty screen --- neeed to implement
    misty.DisplayImage(""); 
    //could also be an audio, not a big change
}
else if(compareAudio("audio1.wav","Hard.mp3")>60)//10
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
/*
TODO: 
    1 make better audios, for all 10 with Henriques voice. Next,
    should we make audios with diferent voices to make it more accurate? 
    2 think about what the average between audios should be.
    3 upload the images of the translations or audios. 
    4 start thinking about the definition of the translation medium
*/
