/*
Displays different messages based on how many times misty detected and recognized the face, creating a relationship with the person
*/
// Syntax
//misty.Set(string key, string value, [bool longTermStorage], [string skillUniqueId], [int prePauseMs], [int postPauseMs]);

//should comment next line after doing the setup, which should be only the first time running this code 
misty.Set("name", 0, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
//misty.Debug(misty.Get("name"));
function _registerFaceRec() 
{
    // Cancels any face recognition that's currently underway
    misty.StopFaceRecognition();
    // Starts face recognition
    misty.StartFaceRecognition();
    // If a FaceRecognition event includes a "Label" property,
    // then Misty invokes the _FaceRec callback function.
    misty.AddPropertyTest("FaceRec", "Label", "exists", "", "string");
    // Registers for FaceRecognition events. Sets eventName to FaceRec,
    // debounceMs to 1000, and keepAlive to false.
    misty.RegisterEvent("FaceRec", "FaceRecognition", 1000, false);
}
//set the faces that misty already recognizes
function setUp()
{
   misty.Set("henrique", 100, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
   misty.Set("pablo", 0, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
   misty.Set("luke", 0, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
   misty.Set("drblythe", 0, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
   misty.Set("gabriela", 0, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
   misty.Set("drj", 0, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
   misty.Set("anikko", 0, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
   misty.Set("person", 0, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
}
//if its the first time assign the string name 
if(misty.Get("name")==0)
{
   setUp();
   misty.Set("name", 1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
}

//method that will recognize the faces and display messages
function _FaceRec(data) 
{
   
    var faceDetected = data.PropertyTestResults[0].PropertyParent.Label;
    
    misty.Debug("Misty sees " + faceDetected);

    //if misty detects Henrique's face
    if (faceDetected == "Henrique") //need work on the messages
    {
        //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
        //display an image 
        misty.DisplayImage("e_Joy.jpg");
        //if misty recognized his face less than 100 times 
        if(misty.Get("henrique")>=0 && misty.Get("henrique")<=99)
        {
        //display personalized message to henrique based on the 10 interactions
        misty.Set("henrique", misty.Get("henrique")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        //play an audio message
        misty.PlayAudio("henrique10.mp3") ;
        }
        //if misty recognized his face less than 1000 times
        else if(misty.Get("henrique")>=100 && misty.Get("henrique")<=999)
        {
        //display personalized message to henrique based on the 10 interactions
        misty.Set("henrique", misty.Get("henrique")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        misty.PlayAudio("henrique100.mp3");
        }
        //if misty recognized his face less than 10000 times
        else if(misty.Get("henrique")>=1000 && misty.Get("henrique")<=9999)
        {//relationship is getting pretty big, should not just be a message
        //display personalized message to henrique based on the 10 interactions
        misty.Set("henrique", misty.Get("henrique")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        misty.PlayAudio("henrique1000.mp3");
        misty.DisplayImage("henrique.jpeg");
        misty.Pause(3000);
        misty.DisplayImage("e_Joy.jpg");
        }
        //if misty recognized his face less than 10000 times
        else if(misty.Get("henrique")>=10000)
        {//relationship is getting pretty big, should not just be a message
        //display personalized message to henrique based on the 10 interactions
        misty.Set("henrique", misty.Get("henrique")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        misty.DisplayVideo("/yay.mp4");
        misty.PlayAudio("henrique1000.mp3");
        misty.DisplayImage("henrique.jpeg");
        misty.Pause(3000);
        misty.DisplayImage("e_Joy.jpg");
        }
    }
    if (faceDetected == "Pablo") 
    {
       //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
       misty.DisplayImage("e_Joy.jpg");
       //if misty recognized his face less than 100 times
       if(misty.Get("pablo")>=0 && misty.Get("pablo")<=99)
       {
       //display personalized message to pablo based on the 10 interactions
       misty.Set("pablo", misty.Get("pablo")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("pablo10.mp3");
       }
       //if misty recognized his face less than 1000 times
       if(misty.Get("pablo")>=100 && misty.Get("pablo")<=999)
       {
       //display personalized message to pablo based on the 10 interactions
       misty.Set("pablo", misty.Get("pablo")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("pablo100.mp3");
       }
       //if misty recognized his face less than 10000 times
       if(misty.Get("pablo")>=1000 && misty.Get("pablo")<=9999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to pablo based on the 10 interactions
       misty.Set("pablo", misty.Get("pablo")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("pablo1000.mp3");
       }
       if(misty.Get("pablo")>=10000)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to pablo based on the 10 interactions
       misty.Set("pablo", misty.Get("pablo")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.DisplayVideo("/yay.mp4");
       misty.PlayAudio("pablo10000.mp3");
       }
        
    }
    if (faceDetected == "Luke") 
    {
       //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
       misty.DisplayImage("e_Joy.jpg");
       //if misty recognized his face less than 100 times
       if(misty.Get("luke")>=0 && misty.Get("luke")<=99)
       {
       //display personalized message to luke based on the 10 interactions
       misty.Set("luke", misty.Get("luke")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("luke10.mp3");
       }
       //if misty recognized his face less than 1000 times
       if(misty.Get("luke")>=100 && misty.Get("luke")<=999)
       {
       //display personalized message to luke based on the 10 interactions
       misty.Set("luke", misty.Get("luke")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("luke100.mp3");
       }
       //if misty recognized his face less than 10000 times
       if(misty.Get("luke")>=1000 && misty.Get("luke")<=9999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to luke based on the 10 interactions
       misty.Set("luke", misty.Get("luke")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("luke1000.mp3");
       }
       if(misty.Get("luke")>=10000)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to luke based on the 10 interactions
       misty.Set("luke", misty.Get("luke")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.DisplayVideo("/yay.mp4");
       misty.PlayAudio("luke10000.mp3");
       }
        
    }
    if (faceDetected == "DrBlythe") 
    {
       //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
       misty.DisplayImage("e_Joy.jpg");
       //if misty recognized his face less than 100 times
       if(misty.Get("drblythe")>=0 && misty.Get("drblythe")<=99)
       {
       //display personalized message to drblythe based on the 10 interactions
       misty.Set("drblythe", misty.Get("drblythe")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("drblythe10.mp3");
       }
       
       if(misty.Get("drblythe")>=100)
       {
       //display personalized message to drblythe based on the 10 interactions
       misty.Set("drblythe", misty.Get("drblythe")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("drblythe100.mp3");
       }
        
    }
    if (faceDetected == "Gabriela") 
    {
       //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
       misty.DisplayImage("e_Joy.jpg");
       //if misty recognized her face less than 100 times
       if(misty.Get("gabriela")>=0 && misty.Get("gabriela")<=99)
       {
       //display personalized message to gabriela based on the 10 interactions
       misty.Set("gabriela", misty.Get("gabriela")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("gabriela10.mp3");
       }
       //if misty recognized his face less than 1000 times
       if(misty.Get("gabriela")>=100 && misty.Get("gabriela")<=999)
       {
       //display personalized message to gabriela based on the 10 interactions
       misty.Set("gabriela", misty.Get("gabriela")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("gabriela100.mp3");
       }
       //if misty recognized her face less than 10000 times
       if(misty.Get("gabriela")>=1000 && misty.Get("gabriela")<=9999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to gabriela based on the 10 interactions
       misty.Set("gabriela", misty.Get("gabriela")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("gabriela1000.mp3");
       misty.DisplayImage("gabriela.jpeg");
       misty.Pause(3000);
       misty.DisplayImage("e_Joy.jpg")
       }
       if(misty.Get("gabriela")>=10000)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to gabriela based on the 10 interactions
       misty.Set("gabriela", misty.Get("gabriela")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.DisplayVideo("/yay.mp4");
       misty.PlayAudio("gabriela10000.mp3");
       misty.DisplayImage("gabriela.jpeg");
       misty.Pause(3000);
       misty.DisplayImage("e_Joy.jpg");
       }
        
    }
    if (faceDetected == "DrJ") 
    {
       //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
       misty.DisplayImage("e_Joy.jpg");

       if(misty.Get("drj")>=0 && misty.Get("drj")<=99)
       {
       //display personalized message to drj based on the 10 interactions
       misty.Set("drj", misty.Get("drj")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("drj10.mp3");
       }
       if(misty.Get("drj")>=100 && misty.Get("drj")<=999)
       {
       //display personalized message to drj based on the 10 interactions
       misty.Set("drj", misty.Get("drj")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("drj100.mp3");
       }
       /* I left the following part as a comment. Dr. J should tell us how she 
       wants misty to react in this ocasions, and then we will provide the code for it.
       if(misty.Get("drj")>=1000 && misty.Get("drj")<=9999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to drj based on the 10 interactions
       misty.Set("drj", misty.Get("drj")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("drj")>=10000 && misty.Get("drj")<=99999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to drj based on the 10 interactions
       misty.Set("drj", misty.Get("drj")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }*/
        
    }
    if (faceDetected == "Anikko") 
    {
       //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
       misty.DisplayImage("e_Joy.jpg");
       if(misty.Get("anikko")>=0 && misty.Get("anikko")<=99)
       {
       //display personalized message to anikko based on the 10 interactions
       misty.Set("anikko", misty.Get("anikko")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("anikko10.mp3");
       }
       if(misty.Get("anikko")>=100 && misty.Get("anikko")<=999)
       {
       //display personalized message to anikko based on the 10 interactions
       misty.Set("anikko", misty.Get("anikko")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("anikko100.mp3");
       }
       if(misty.Get("anikko")>=1000 && misty.Get("anikko")<=9999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to anikko based on the 10 interactions
       misty.Set("anikko", misty.Get("anikko")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("anikko1000.mp3");
       }
       if(misty.Get("anikko")>=10000)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to anikko based on the 10 interactions
       misty.Set("anikko", misty.Get("anikko")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       misty.PlayAudio("anikko10000.mp3");
       }
        
    }
    /* this makes misty detect and learn people that she already knows pretty often, small bug..........perhaphs another skill would wokrk best for this
    if (faceDetected == "unknown person") 
    {
        misty.ChangeLED(255, 0, 0);//changeto red 
        misty.DisplayImage("e_Contempt.jpg");
        //then misty should learn new faces
        //maybe? need to make a way to differ different names for this person
        var name = "person";
        var worked = misty.StartFaceTraining(name);
        while(!worked)
            worked = misty.StartFaceTraining(name);
        misty.PlayAudio("/audios/unknown.mp3");
    }
    if(faceDetected == "person")
    {
        //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
        misty.DisplayImage("e_Joy.jpg");
        if(misty.Get("person")>=0)
        {
        //display personalized message to person based on the 10 interactions
        misty.Set("person", misty.Get("person")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        misty.PlayAudio("/audios/person/person10.mp3");
        }
    }*/
    misty.Debug("henrique"+misty.Get("henrique"));
    misty.Debug("pablo"+misty.Get("pablo"));
    misty.Debug("luke"+misty.Get("luke"));
    misty.Debug("drblythe"+misty.Get("drblythe"));
    misty.Debug("gabi"+misty.Get("gabriela"));
    misty.Debug("drj"+misty.Get("drj"));
    misty.Debug("anikko"+misty.Get("anikko"));
    misty.Debug("person"+misty.Get("person"));
    misty.Debug("name"+misty.Get("name"));
    misty.RegisterTimerEvent("registerFaceRec", 3000, true);
}

misty.RegisterTimerEvent("registerFaceRec", 3000, false);
// pretty much done. 
// still needs:
      // commenting 
      // maybe change/add relationships?
      //fix images --- get images to everybody
      // train everyone's face