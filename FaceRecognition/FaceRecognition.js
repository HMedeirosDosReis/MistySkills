// Syntax
//misty.Set(string key, string value, [bool longTermStorage], [string skillUniqueId], [int prePauseMs], [int postPauseMs]);


//misty.Set("name", 9, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
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


function _FaceRec(data) 
{
   
    var faceDetected = data.PropertyTestResults[0].PropertyParent.Label;
    
    misty.Debug("Misty sees " + faceDetected);

    
    if (faceDetected == "Henrique") //need work on the messages
    {
        //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
        misty.DisplayImage("e_Joy.jpg");
        if(misty.Get("henrique")>=10 && misty.Get("henrique")<=99)
        {
        //display personalized message to henrique based on the 10 interactions
        misty.Set("henrique", misty.Get("henrique")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        }
        if(misty.Get("henrique")>=100 && misty.Get("henrique")<=999)
        {
        //display personalized message to henrique based on the 10 interactions
        misty.Set("henrique", misty.Get("henrique")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        }
        if(misty.Get("henrique")>=1000 && misty.Get("henrique")<=9999)
        {//relationship is getting pretty big, should not just be a message
        //display personalized message to henrique based on the 10 interactions
        misty.Set("henrique", misty.Get("henrique")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        }
        if(misty.Get("henrique")>=10000 && misty.Get("henrique")<=99999)
        {//relationship is getting pretty big, should not just be a message
        //display personalized message to henrique based on the 10 interactions
        misty.Set("henrique", misty.Get("henrique")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        }
    }
    if (faceDetected == "Pablo") 
    {
       //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
       misty.DisplayImage("e_Joy.jpg");
       if(misty.Get("pablo")>=10 && misty.Get("pablo")<=99)
       {
       //display personalized message to pablo based on the 10 interactions
       misty.Set("pablo", misty.Get("pablo")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("pablo")>=100 && misty.Get("pablo")<=999)
       {
       //display personalized message to pablo based on the 10 interactions
       misty.Set("pablo", misty.Get("pablo")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("pablo")>=1000 && misty.Get("pablo")<=9999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to pablo based on the 10 interactions
       misty.Set("pablo", misty.Get("pablo")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("pablo")>=10000 && misty.Get("pablo")<=99999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to pablo based on the 10 interactions
       misty.Set("pablo", misty.Get("pablo")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
        
    }
    if (faceDetected == "Luke") 
    {
       //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
       misty.DisplayImage("e_Joy.jpg");
       if(misty.Get("luke")>=10 && misty.Get("luke")<=99)
       {
       //display personalized message to luke based on the 10 interactions
       misty.Set("luke", misty.Get("luke")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("luke")>=100 && misty.Get("luke")<=999)
       {
       //display personalized message to luke based on the 10 interactions
       misty.Set("luke", misty.Get("luke")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("luke")>=1000 && misty.Get("luke")<=9999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to luke based on the 10 interactions
       misty.Set("luke", misty.Get("luke")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("luke")>=10000 && misty.Get("luke")<=99999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to luke based on the 10 interactions
       misty.Set("luke", misty.Get("luke")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
        
    }
    if (faceDetected == "drblythe") 
    {
       //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
       misty.DisplayImage("e_Joy.jpg");
       if(misty.Get("drblythe")>=10 && misty.Get("drblythe")<=99)
       {
       //display personalized message to drblythe based on the 10 interactions
       misty.Set("drblythe", misty.Get("drblythe")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("drblythe")>=100 && misty.Get("drblythe")<=999)
       {
       //display personalized message to drblythe based on the 10 interactions
       misty.Set("drblythe", misty.Get("drblythe")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("drblythe")>=1000 && misty.Get("drblythe")<=9999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to drblythe based on the 10 interactions
       misty.Set("drblythe", misty.Get("drblythe")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("drblythe")>=10000 && misty.Get("drblythe")<=99999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to drblythe based on the 10 interactions
       misty.Set("drblythe", misty.Get("drblythe")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
        
    }
    if (faceDetected == "gabriela") 
    {
       //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
       misty.DisplayImage("e_Joy.jpg");
       if(misty.Get("gabriela")>=10 && misty.Get("gabriela")<=99)
       {
       //display personalized message to gabriela based on the 10 interactions
       misty.Set("gabriela", misty.Get("gabriela")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("gabriela")>=100 && misty.Get("gabriela")<=999)
       {
       //display personalized message to gabriela based on the 10 interactions
       misty.Set("gabriela", misty.Get("gabriela")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("gabriela")>=1000 && misty.Get("gabriela")<=9999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to gabriela based on the 10 interactions
       misty.Set("gabriela", misty.Get("gabriela")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("gabriela")>=10000 && misty.Get("gabriela")<=99999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to gabriela based on the 10 interactions
       misty.Set("gabriela", misty.Get("gabriela")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
        
    }
    if (faceDetected == "drj") 
    {
       //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
       misty.DisplayImage("e_Joy.jpg");
       if(misty.Get("drj")>=10 && misty.Get("drj")<=99)
       {
       //display personalized message to drj based on the 10 interactions
       misty.Set("drj", misty.Get("drj")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("drj")>=100 && misty.Get("drj")<=999)
       {
       //display personalized message to drj based on the 10 interactions
       misty.Set("drj", misty.Get("drj")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("drj")>=1000 && misty.Get("drj")<=9999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to drj based on the 10 interactions
       misty.Set("drj", misty.Get("drj")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("drj")>=10000 && misty.Get("drj")<=99999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to drj based on the 10 interactions
       misty.Set("drj", misty.Get("drj")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
        
    }
    if (faceDetected == "anikko") 
    {
       //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
       misty.DisplayImage("e_Joy.jpg");
       if(misty.Get("anikko")>=10 && misty.Get("anikko")<=99)
       {
       //display personalized message to anikko based on the 10 interactions
       misty.Set("anikko", misty.Get("anikko")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("anikko")>=100 && misty.Get("anikko")<=999)
       {
       //display personalized message to anikko based on the 10 interactions
       misty.Set("anikko", misty.Get("anikko")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("anikko")>=1000 && misty.Get("anikko")<=9999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to anikko based on the 10 interactions
       misty.Set("anikko", misty.Get("anikko")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
       if(misty.Get("anikko")>=10000 && misty.Get("anikko")<=99999)
       {//relationship is getting pretty big, should not just be a message
       //display personalized message to anikko based on the 10 interactions
       misty.Set("anikko", misty.Get("anikko")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
       }
        
    }
    if (faceDetected == "unknown person") 
    {
        misty.ChangeLED(255, 0, 0);//changeto red 
        misty.DisplayImage("e_Contempt.jpg");
        //then misty should learn new faces
        //need to make a way to differ different names for this person
        var name = "person";
        var worked = misty.StartFaceTraining(name);
        while(!worked)
            worked = misty.StartFaceTraining(name);
    }
    if(faceDetected == "person")
    {
        //if(misty.Get("name")==```null```?) something that tells that this is the first time using the variable
        misty.DisplayImage("e_Joy.jpg");
        if(misty.Get("person")>=10 && misty.Get("person")<=99)
        {
        //display personalized message to person based on the 10 interactions
        misty.Set("person", misty.Get("person")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        }
        if(misty.Get("person")>=100 && misty.Get("person")<=999)
        {
        //display personalized message to person based on the 10 interactions
        misty.Set("person", misty.Get("person")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        }
        if(misty.Get("person")>=1000 && misty.Get("person")<=9999)
        {//relationship is getting pretty big, should not just be a message
        //display personalized message to person based on the 10 interactions
        misty.Set("person", misty.Get("person")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        }
        if(misty.Get("person")>=10000 && misty.Get("person")<=99999)
        {//relationship is getting pretty big, should not just be a message
        //display personalized message to person based on the 10 interactions
        misty.Set("person", misty.Get("person")+1, true, "2f378334-4caf-4af8-9cd4-d9ae3d06304c", 1,1);
        }
    }
    misty.RegisterTimerEvent("registerFaceRec", 5000, false);
}

misty.RegisterTimerEvent("registerFaceRec", 5000, false)