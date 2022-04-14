//This is a SHELL FOR MISTY TO PLAY TIC TAC TOE WITH AI/ANOTHER MISTY
misty.Set("StateOfGame",["_","_","_","_","_","_","_","_","_"], false);


misty.Set("CurrentPlayer", "player1", false);
misty.Set("ActiveGame", true, false);
misty.Set("Player1_Won", false, false); //set to Player1Won or Player2Wond depending on victor
misty.Set("TieGame", false, false);
misty.Set("Comp1Turn", false, false);
misty.Set("Comp2Turn",false, false);
misty.Set("Move", "", false);
misty.Set("p1win", false, false);
misty.Set("p2win", false, false);
misty.Set("DrawGame", false,false);
Reset_Board();
//misty.DisplayLayerImage("Otoe4.png", "OtoeLayer4");

//testit();
misty.DisplayLayerImage("BlankBoard2.png", "MyBoard");

//DEFAULT OPACITIES SET TO 0 BECAUSE THE BOARD IS BLANK!
//THESE WILL BE SET TO ONE AFTER THE AI/ROBOT UPDATES SELECTION IN DASHBOARD
//THERE IS A BOOL TO SET TO VISIBLE WHICH WE MAY SIMPLY SET TO TRUE INSTEAD OF 
//UPDATING OPACITY HONESTLY
//misty.SetImageDisplaySettings(string layer, bool revertToDefault, bool deleted, 
//bool visible, double opacity, int width, int height, string stretch, bool placeontop
//int rotation, string horizontalAlignment, string verticalAlignment, int prePausems,
//int postPauseMS);
misty.Debug("we are stepping through 1");
//going to make each picture an even square for the board
misty.SetImageDisplaySettings("MyBoard", null, false, true, 1.0,480,272, "UniformToFill",true,  0, "Center", "Center", 0,0 );
misty.Debug("we are stepping through 2");
misty.Pause(1000);



GameStart();

function HandleTheResults()
{
    let fullBoardDraw = false;

    let roundWon, roundLost = false
    
    CheckWinState();
    misty.Pause(500);

    roundWon = misty.Get("p1win");
    roundLost = misty.Get("p2win");
    fullBoardDraw = misty.Get("DrawGame");
   
    if(roundWon == true)
    {
        misty.PlayAudio("Iwin.mp3", 90);
        misty.DisplayLayerImage("Player1wins.png","youwin1"); // this will be updated to reflect robot 1 or two
        misty.SetImageDisplaySettings("youwin1", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        //playAudio("misty1/2 wins")
        misty.Pause(5000);
        //make the pplayerwon image not visable 
        misty.SetImageDisplaySettings("youwin1", false, true);

        misty.DisplayLayerImage("GameOver2.png", "ItsDone");
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Set("ActiveGame", false, false); //game is no longer active
    }

    else if(roundLost == true)
    {
        misty.PlayAudio("ilost.mp3", 90);
        misty.DisplayLayerImage("Player2wins.png","youwin2"); // this will be updated to reflect robot 1 or two
        misty.SetImageDisplaySettings("youwin2", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        //playAudio("misty1/2 wins")
        misty.Pause(5000);
        //make the pplayerwon image not visable 
        misty.SetImageDisplaySettings("youwin2", false, true);

        misty.DisplayLayerImage("GameOver2.png", "ItsDone");
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Set("ActiveGame", false, false); //game is no longer active
    }

    //let roundDraw = !CurrentState.includes("");
    //just gonna hard code if includes doesn't work
    else if(fullBoardDraw == true)
    {
        misty.PlayAudio("Draw.mp3", 10);
        misty.DisplayLayerImage("TieGame.png","Draw"); // this will be updated to reflect robot 1 or two
        misty.SetImageDisplaySettings("Draw", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(4000);
        //make the pplayerwon image not visable/DELETE IT BECAUSE IT ISN'T NEEDED NOW 
        misty.SetImageDisplaySettings("Draw", false, true);

        misty.DisplayLayerImage("GameOver2.png", "ItsDone");
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Set("ActiveGame", false, false); //game is no longer active
    }
    //nextComputerMove(){}
}

//FOR NOW THE BOTH COMPUTER WILL BE DUMB AND ONLY SELECT RANDOM SPACES GRANTED THEY ARE AVAILABLE
//IF TIME PERMITS I WANT TO ADD SOME TYPE OF AI/ALGORITHM BUT I DON'T WANT IT OPTIMIZED BECAUSE
//THAT MAY LEAD TO DRAWS EVERY GAME.
//POSSIBLY IMPLEMENT MINIMAX ALGORITHM
function GameStart()
{
    //play audio game is going to start
    var chosentilep1;
    misty.PlayAudio("GameStart.mp3", 20);
    misty.Pause(3000);
    misty.Debug("WE ARE outside GAMESTART LOOP YEPEEE");


   // var isActive = misty.Get("ActiveGame");
    while(misty.Get("ActiveGame") == true)
    {
        misty.Debug("WE ARE INSIDE GAMESTART LOOP YEPEEE");
        //MAY USE API FOR MISTY TO SPEAK SELECTED TILE
        //EITHER THAT OR I HAVE TO UPLOAD 9 AUDIO FILES
        //AND SET UP 9 IF ELSE STATEMENTS BLEH
        //playaudio()
        misty.Debug("WE ARE after the computer2 move ");

 
        //If computer 1 turn execture computer 1 move else execute computer 2 move
/*
        if(misty.Get("Comp1Turn") == true)
        {
            //execute player 1s turn
            misty.Set("Comp2Turn")
        }
        else if(misty.Get("Comp2Turn") == true)
        {
            //execute player 2s turn
        }
        if(misty.Get(""))
        */
       
        if(misty.Get("ActiveGame") == true)//only place next tile if the game isn't already over
        {
            Computer2Move();
            misty.Pause(2000);

            chosentilep1 = misty.Get("Move");//may need to convert to string
            misty.Debug("player 2 turn first.. execute");
            misty.Debug("The tile currently selected is " + chosentilep1);

            if(chosentilep1 == 0)
            {
                //initiate radom response after selection, but don't actuall display it until after it is done
                //this is where we will make a selection visible on the board
                misty.Debug("we are in a chosen tile and it is the .." + chosentilep1);
                misty.DisplayLayerImage("Otoe.png", "OtoeLayer1");

                misty.SetImageDisplaySettings("OtoeLayer1", false, false, true, 1.0, 110, 110, "Uniform", true, 0, "Left", "Top", 0,0 );
            }
            else if(chosentilep1 == 2)// "",""   0,1,2   the commas count in the array for some reason
            {
                misty.Debug("we are in a chosen tile and it is the .." + chosentilep1);

                misty.DisplayLayerImage("Otoe2.png", "OtoeLayer2");

                misty.SetImageDisplaySettings("OtoeLayer2", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Top", 0,0 );


            }
            else if(chosentilep1 == 4)
            {
                
                misty.Debug("we are in a chosen tile and it is the .." + chosentilep1);
                misty.DisplayLayerImage("Otoe3.png", "OtoeLayer3");

                misty.SetImageDisplaySettings("OtoeLayer3", false, false, true, 1.0, 110, 110, "Uniform", true, 0, "Right", "Top", 0,0 );


            }
            else if(chosentilep1 == 6)
            {
                misty.Debug("we are in a chosen tile and it is the .." + chosentilep1);

                misty.DisplayLayerImage("Otoe4.png", "OtoeLayer4");

                misty.SetImageDisplaySettings("OtoeLayer4", false, false, true, 1.0, 110, 65, "Uniform", true, 0, "Left", "Center", 0,0 );

            }
            else if(chosentilep1 == 8)
            {
                
                misty.Debug("we are in a chosen tile and it is the .." + chosentilep1);
                misty.DisplayLayerImage("Otoe5.png", "OtoeLayer5");

                misty.SetImageDisplaySettings("OtoeLayer5", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Center", 0,0 );

            }
            else if(chosentilep1 == 10)
            {
                misty.Debug("we are in a chosen tile and it is the .." + chosentilep1);

                misty.DisplayLayerImage("Otoe6.png", "OtoeLayer6");

                misty.SetImageDisplaySettings("OtoeLayer6", false, false, true, 1.0, 115, 65, "Uniform", true, 0, "Right", "Center", 0,0 );

            }
            else if(chosentilep1 == 12)
            {
                misty.Debug("we are in a chosen tile and it is the .." + chosentilep1);
                misty.DisplayLayerImage("Otoe7.png", "OtoeLayer7");

                misty.SetImageDisplaySettings("OtoeLayer7", false, false, true, 1.0, 110, 85, "Uniform", true, 0, "Left", "Bottom", 0,0 );

            }
            else if(chosentilep1 == 14)
            {
            
                misty.Debug("we are in a chosen tile and it is the .." + chosentilep1);
                misty.DisplayLayerImage("Otoe8.png", "OtoeLayer8");

                misty.SetImageDisplaySettings("OtoeLayer8", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Bottom", 0,0 );

            }
            else if(chosentilep1 == 16)// 
            {
                
                misty.Debug("we are in a chosen tile and it is the .." + chosentilep1);
                misty.DisplayLayerImage("Otoe9.png", "OtoeLayer9");

                misty.SetImageDisplaySettings("OtoeLayer9", false, false, true, 1.0, 110, 85, "Uniform", true, 0, "Right", "Bottom", 0,0 );

            }
        }
//for now player 2 will always make the first move...misty
        misty.Debug("player 2 move done...now onto the next");
        if(misty.Get("ActiveGame") == true)
        {
            HandleTheResults(); //make sure the game isn't over yet
        }
        misty.Pause(2000);
        misty.Debug("After computer move one... is it done or next lines of code is already executing");
        if(misty.Get("ActiveGame") == true)
        {
            Computer1Move(); //execute next player move
            misty.Pause(2000);

            chosentilep1 = misty.Get("Move");//may need to convert to string
            misty.Debug("player 1 turn next.. execute");
            misty.Debug("The tile currently selected is " + chosentilep1);

            if(chosentilep1 == 0)
            {
                //initiate radom response after selection, but don't actuall display it until after it is done
                //this is where we will make a selection visible on the board
                randomResponse();
                misty.PlayAudio("tile1.mp3", 80);
                misty.Pause(1000);
                misty.DisplayLayerImage("Xtoe.png", "XtoeLayer1");

                
                misty.SetImageDisplaySettings("XtoeLayer1", false, false, true, 1.0, 110, 110, "Uniform", true, 0, "Left", "Top", 0,0 );


            }
            else if(chosentilep1 == 2)// "",""   0,1,2   the commas count in the array for some reason
            {
                randomResponse();
                misty.PlayAudio("tile2.mp3", 80);
                misty.Pause(1000);
                misty.DisplayLayerImage("Xtoe2.png", "XtoeLayer2");

                misty.SetImageDisplaySettings("XtoeLayer2", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Top", 0,0 );

            }
            else if(chosentilep1 == 4)
            {
                randomResponse();
                misty.PlayAudio("tile3.mp3", 80);
                misty.Pause(1000);
                misty.DisplayLayerImage("Xtoe3.png", "XtoeLayer3");

                misty.SetImageDisplaySettings("XtoeLayer3", false, false, true, 1.0, 110, 110, "Uniform", true, 0, "Right", "Top", 0,0 );

            }
            else if(chosentilep1 == 6)
            {
                randomResponse();
                misty.PlayAudio("tile4.mp3", 80);
                misty.Pause(1000);
                misty.DisplayLayerImage("Xtoe4.png", "XtoeLayer4");

                misty.SetImageDisplaySettings("XtoeLayer4", false, false, true, 1.0, 110, 65, "Uniform", true, 0, "Left", "Center", 0,0 );

            }
            else if(chosentilep1 == 8)
            {
                randomResponse();
                misty.PlayAudio("tile5.mp3", 80);
                misty.Pause(1000);
                misty.DisplayLayerImage("Xtoe5.png", "XtoeLayer5");


                misty.SetImageDisplaySettings("XtoeLayer5", false, false, true, 1.0, 90, 65, "Uniform", true, 0, "Center", "Center", 0,0 );

            }
            else if(chosentilep1 == 10)
            {
                randomResponse();
                misty.PlayAudio("tile6.mp3", 80);
                misty.Pause(1000);
                misty.DisplayLayerImage("Xtoe6.png", "XtoeLayer6");

                misty.SetImageDisplaySettings("XtoeLayer6", false, false, true, 1.0, 115, 70, "Uniform", true, 0, "Right", "Center", 0,0 );

            }
            else if(chosentilep1 == 12)
            {
                randomResponse();
                misty.PlayAudio("tile7.mp3", 80);
                misty.Pause(1000);
                misty.DisplayLayerImage("Xtoe7.png", "XtoeLayer7");

                misty.SetImageDisplaySettings("XtoeLayer7", false, false, true, 1.0, 110, 85, "Uniform", true, 0, "Left", "Bottom", 0,0 );

            }
            else if(chosentilep1 == 14)
            {
                randomResponse();
                misty.PlayAudio("tile8.mp3", 80);
                misty.Pause(1000);
                misty.DisplayLayerImage("Xtoe8.png", "XtoeLayer8");

                misty.SetImageDisplaySettings("XtoeLayer8", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Bottom", 0,0 );

            }
            else if(chosentilep1 == 16)// 
            {
                randomResponse();
                misty.PlayAudio("tile9.mp3", 80);
                misty.Pause(1000);
                misty.DisplayLayerImage("Xtoe9.png", "XtoeLayer9");

                misty.SetImageDisplaySettings("XtoeLayer9", false, false, true, 1.0, 110, 85, "Uniform", true, 0, "Right", "Bottom", 0,0 );

            }

        }
        //check to see if the game is a win or draw for player X
        if(misty.Get("ActiveGame") == true)
        {
            HandleTheResults(); //only handleresutls if it hasn't already deemed the game is over

        }

        //if-elses for computer2 next
        misty.Debug("we have made it past an iteration of choices..on to the next");
        misty.Pause(2000);



        //after all that make sure the game isn't over again
    }
    misty.Pause(10000); //Wait a bit before the whole board and tiles are cleared from the display
    Reset_Board();
}
function Computer1Move()
{

    let tempArray = [0,1,2,3,4,5,6,7,8]; //this may have to just be curly braces IDK
 
    var st1,st2;
    var vel = 16;
    var Comp1Turn = "X";
    let TheNewArray = [];
    var currBoard = misty.Get("StateOfGame");
    var move = Math.floor(Math.random() * vel);
    let ispicked = false;
    misty.Debug("INSIDE OF COMPUTER MOVE 1 HMMM");
    if(move == 1 || move == 3 || move == 5 || move == 7 || move == 9 || move == 11 || move == 13 || move == 15)
    {
        move = move + 1;// for whatever reason misty accounts for ,(commas) when using an array 
        //so we need to increment if the random selection in the array happens to be at an index
        //that posses a , 
    }
    while(ispicked == false)
    {
        if(move == 1 || move == 3 || move == 5 || move == 7 || move == 9 || move == 11 || move == 13 || move == 15)
        {
            move = move + 1;// for whatever reason misty accounts for ,(commas) when using an array 
            //so we need to increment if the random selection in the array happens to be at an index
            //that posses a , 
        }
        if(currBoard[move] != "X" && currBoard[move] != "O")
        {
            ispicked = true;
            misty.Set("Move", move, false);

            UpdateStateOfGame(move, Comp1Turn);

            misty.Debug("Tile " + move + "successfully inputted..moving on to next move.. current Stae of game value =" +currBoard[move]);
        }
        else if(currBoard[move] == "X" || currBoard[move] == "O")
        {
            misty.Debug("the current tile selected is unavailabe..trying again");
            //we need to REPLACE THIS RANDOM MOVE CHOOSER WITH AN AI... MINIMAX POSSIBLY
            //need to place chosen item at back of line then update line
            /*
            tempArray4 = [];
            tempArray4[move] = tempArray[move];
            TheNewArray = tempArray;
            st1 = tempArray[move];

                //currBoard[i] = tempArray[i] ;
                
            for(i = move; i <= 16; i+=2)//make sure we are incrementing by to account for the commas in the array
            {
                //currBoard[i] = tempArray[i] ;
                if(move != 16){
                    st2 = tempArray[move+2];// might have to deprecate value by same value increemented before next iteration
                    TheNewArray[i] = st2;
                }
            }
            TheNewArray[16] = st1;
            //make sure the random array select is selecting 
            vel = vel-1;
            */
            move = Math.floor(Math.random() * vel);
            //may need pause for every invalid choice
            //misty.Pause(500);

        }
    }
}

function Computer2Move()
{
    //logically for now computer 2 will work exactly like computer 1.... computer 2 
    //is supposed to be replaced by misty mountain robot updating there move in the dashboard tic tac toe board
    //until then computer 2 and 1 will face off.... no AI AS OF YET.. REALLY NEED ONE
    misty.Debug("INSIDECOMPUTER2MOVENOW");
    let CurrentState = misty.Get("StateOfGame");

    let tempArray = [0,1,2,3,4,5,6,7,8]; //this may have to just be curly braces IDK
   // tempArray2 = [];
    //tempArray3 = [];
    var st1,st2;
    var vel = 16;
    var Comp2Turn = "O";
    let TheNewArray = [];
    var currBoard = misty.Get("StateOfGame");
    var move = Math.floor(Math.random() * vel);
    let ispicked = false;
    misty.Debug("INSIDE OF COMPUTER MOVE 2 HMMM");

    

    if(move == 1 || move == 3 || move == 5 || move == 7 || move == 9 || move == 11 || move == 13 || move == 15)
    {
        move = move + 1;// for whatever reason misty accounts for ,(commas) when using an array 
        //so we need to increment if the random selection in the array happens to be at an index
        //that posses a , 
        misty.Debug("the first random num is.." + move)
    }
    while(ispicked == false)
    {
        if(move == 1 || move == 3 || move == 5 || move == 7 || move == 9 || move == 11 || move == 13 || move == 15)
        {
            move = move + 1;// for whatever reason misty accounts for ,(commas) when using an array 
            //so we need to increment if the random selection in the array happens to be at an index
            //that posses a , 
            misty.Debug("the number picked now is .. " + move);
        }
        if(currBoard[move] != "X" && currBoard[move] != "O")
        {

          
            
            ispicked = true;
            misty.Set("Move", move, false);
            UpdateStateOfGame(move, Comp2Turn);
            misty.Debug("Tile " + move + "successfully inputted..moving on to next move.. current Stae of game value =" +currBoard[move]);
        }
        else if(currBoard[move] == "X" || currBoard[move] == "O")
        {
            misty.Debug("the current tile selected is unavailabe..trying again");
            misty.Debug("and the current tile selected issss " + move)
            //need to place chosen item at back of line then update line
            /*
            tempArray4 = [];
            tempArray4[move] = tempArray[move];
            TheNewArray = tempArray;
            st1 = tempArray[move];

                //currBoard[i] = tempArray[i] ;
            for(i = move; i <= 16; i+=2)//make sure we are incrementing by to account for the commas in the array
            {
                //currBoard[i] = tempArray[i] ;
                if(move != 16){
                    st2 = tempArray[move+2];// might have to deprecate value by same value increemented before next iteration
                    TheNewArray[i] = st2;
                }
            }
            TheNewArray[16] = st1;
            */
            //make sure the random array select is selecting 
            //vel = vel-1;
            move = Math.floor(Math.random() * vel);
//aefaefaefa
        }
    }
}

function Reset_Board()
{
    //delete all images on misty display... when functionality for restart is added we won't delete board in this function!
    misty.SetImageDisplaySettings("MyBoard", null, true);
//Delete all Xs
    misty.SetImageDisplaySettings("XtoeLayer1", null, true);

    misty.SetImageDisplaySettings("XtoeLayer2", null, true);

    misty.SetImageDisplaySettings("XtoeLayer3", null, true);

    misty.SetImageDisplaySettings("XtoeLayer4", null, true);

    misty.SetImageDisplaySettings("XtoeLayer5", null, true);

    misty.SetImageDisplaySettings("XtoeLayer6", null, true);

    misty.SetImageDisplaySettings("XtoeLayer7", null, true);

    misty.SetImageDisplaySettings("XtoeLayer8", null, true);

    misty.SetImageDisplaySettings("XtoeLayer9", null, true);

    //Delete all potential Os
    misty.SetImageDisplaySettings("OtoeLayer1", null, true);

    misty.SetImageDisplaySettings("OtoeLayer2", null, true);

    misty.SetImageDisplaySettings("OtoeLayer3", null, true);

    misty.SetImageDisplaySettings("OtoeLayer4", null, true);

    misty.SetImageDisplaySettings("OtoeLayer5", null, true);

    misty.SetImageDisplaySettings("OtoeLayer6", null, true);

    misty.SetImageDisplaySettings("OtoeLayer7", null, true);

    misty.SetImageDisplaySettings("OtoeLayer8", null, true);

    misty.SetImageDisplaySettings("OtoeLayer9", null, true);

    //delete the rest of the images
    misty.SetImageDisplaySettings("ItsDone", false, true);

    //misty.SetImageDisplaySettings("youwin2", false, true);


}

function randomResponse()
{
    var resp;
    resp = Math.floor(Math.random() * 3);
    switch(resp)
    { //random response everytime misty makes a move
        case 0:
            misty.PlayAudio("ohno.mp3", 90);
            misty.Pause(3000);
            break;
        case 1:
            misty.PlayAudio("ropes.mp3", 90);
            misty.Pause(3000);

            break;
        case 2:
            misty.PlayAudio("nicemove.mp3", 90);
            misty.Pause(3000);

            break;
    }
}






function DetermineFirstMove()
{
    //will execute to randomly decide who goes first... NOT YET IMPLEMENTED
    var who;
    who = Math.floor(Math.random() * 2);
    switch(who){
        case 0:
            misty.Set("Comp1Turn", true, false);

            Computer1Move();
            break;
        case 1:
            misty.Set("Comp2Turn", true, false);

            Computer2Move();
            break;
    }
}

function UpdateStateOfGame(move,turnof)
{

    //update state of game no matter whos turn it is
    var pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9;
    CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9];
    var CurrentState = misty.Get("StateOfGame");
    pick1 = CurrentState[0];
    pick2 = CurrentState[2];
    pick3 = CurrentState[4];
    pick4 = CurrentState[6];
    pick5 = CurrentState[8];
    pick6 = CurrentState[10];
    pick7 = CurrentState[12];
    pick8 = CurrentState[14];
    pick9 = CurrentState[16];

    switch(move)
    {
        case 0:
            pick1 = turnof;
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9];
            misty.Set("StateOfGame", CurrentState, false);

        break;
        case 2:
            pick2 = turnof;
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9];
            misty.Set("StateOfGame", CurrentState, false);
        break;
        case 4:
            pick3 = turnof;
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9];
            misty.Set("StateOfGame", CurrentState, false);
        break;
        case 6:
            pick4 = turnof;
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9];
            misty.Set("StateOfGame", CurrentState, false);
        break;
        case 8:
            pick5 = turnof;
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9];
            misty.Set("StateOfGame", CurrentState, false);
        break;
        case 10:
            pick6 = turnof;
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9];
            misty.Set("StateOfGame", CurrentState, false);
        break;
        case 12:
            pick7 = turnof;
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9];
            misty.Set("StateOfGame", CurrentState, false);
        break;
        case 14:
            pick8 = turnof;
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9];
            misty.Set("StateOfGame", CurrentState, false);
        break;
        case 16:
            pick9 = turnof;
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9];
            misty.Set("StateOfGame", CurrentState, false);
        break;
 

    }
} //state of game array should be updated  we may need to print it here for testing


function CheckWinState()//add in whos turn it is
{

    /* combinations = [0,2,4],
[6,8,10],
[12,14,16],
[0,6,12],
[2,8,14],
[4,10,16],
[0,8,16],
[4,8,12] */
    var curr1,curr2,curr3,curr4,curr5,curr6,curr7,curr8,curr9;
    /*
    var WinState1 = misty.Get("WinCondition1");
    var WinState2 = misty.Get("WinCondition1");
    var WinState3 = misty.Get("WinCondition1");
    var WinState4 = misty.Get("WinCondition1");
    var WinState5 = misty.Get("WinCondition1");
    var WinState6 = misty.Get("WinCondition1");
    var WinState7 = misty.Get("WinCondition1");
    var WinState8 = misty.Get("WinCondition1");
    */
   misty.Debug("WEARE INSIDE THE CHECKSTATE FUNCTION");
    var ActualBoardState = misty.Get("StateOfGame");
    curr1 = ActualBoardState[0]; //0
    curr2 = ActualBoardState[2]; //1
    curr3 = ActualBoardState[4];//2
    curr4 = ActualBoardState[6];//3
    curr5 = ActualBoardState[8];//4
    curr6 = ActualBoardState[10];//5
    curr7 = ActualBoardState[12];//6
    curr8 = ActualBoardState[14];//7
    curr9 = ActualBoardState[16];//8
    if(curr1 != "_" && curr2 != "_" && curr3 != "_")
    {
        misty.Debug("we are here o,2,4");
        if(curr1 == "O" && curr2 == "O" && curr3 == "O")
        {
            misty.Set("p2win", true, false);
        }
        else if(curr1 == "X" && curr2 == "X" && curr3 == "X")
        {
            misty.Set("p1win", true, false);
            misty.Debug("P1WONTHEGAME");
        }
    }
    if(curr4 != "_" && curr5 != "_" && curr6 != "_" )
    {
        misty.Debug("we are here 6,8,10");

        if(curr4 == "O" && curr5 == "O" && curr6 == "O")
        {
            misty.Set("p2win", true, false);
        }
        else if(curr4 == "X" && curr5 == "X" && curr6 == "X")
        {
            misty.Set("p1win", true, false);
        }
    }
    if(curr7 != "_" && curr8 != "_" && curr9 != "_")
    {
        misty.Debug("we are here 12,14,16");

        if(curr7 == "O" && curr8 == "O" && curr9 == "O")
        {
            misty.Set("p2win", true, false);
        }
        else if(curr7 == "X" && curr8 == "X" && curr9 == "X")
        {
            misty.Set("p1win", true, false);
        }
    }
    if(curr1 != "_" && curr4 != "_" && curr7 != "_" )
    {
        misty.Debug("we are here 0,6,12");

        if(curr1 == "O" && curr4 == "O" && curr7 == "O")
        {
            misty.Set("p2win", true, false);
        }
        else if(curr1 == "X" && curr4 == "X" && curr7 == "X")
        {
            misty.Set("p1win", true, false);
        }
    }
    if(curr2 != "_" && curr5 != "_" && curr8 != "_")
    {
        misty.Debug("we are here 2,8, 14");

        if(curr2 == "O" && curr5 == "O" && curr8 == "O")
        {
            misty.Set("p2win", true, false);
        }
        else if(curr2 == "X" && curr5 == "X" && curr8 == "X")
        {
            misty.Set("p1win", true, false);
        }
    }
    if(curr3 != "_" && curr6 != "_" && curr9 != "_")
    {
        misty.Debug("we are here 4,10,16");

        if(curr3 == "O" && curr6 == "O" && curr9 == "O")
        {
            misty.Set("p2win", true, false);
        }
        else if(curr3 == "X" && curr6 == "X" && curr9 == "X")
        {
            misty.Set("p1win", true, false);
        }
    }
    if(curr1 != "_" && curr5 != "_" && curr9 != "_")
    {
        misty.Debug("we are here 0,8,16");

        if(curr1 == "O" && curr5 == "O" && curr9 == "O")
        {
            misty.Set("p2win", true, false);
        }
        else if(curr1 == "X" && curr5 == "X" && curr9 == "X")
        {
            misty.Set("p1win", true, false);
        }
    }
    if(curr3 != "_" && curr5 != "_" && curr7 != "_")
    {
        misty.Debug("we are here 4,8,12");

        if(curr3 == "O" && curr5 == "O" && curr7 == "O")
        {
            misty.Set("p2win", true, false);
        }
        else if(curr3 == "X" && curr5 == "X" && curr7 == "X")
        {
            misty.Set("p1win", true, false);
        }
    }
    misty.Debug("we are about to see if the game is a draw!!!");

    if((ActualBoardState[0] == "X" || ActualBoardState[0] == "O") && (ActualBoardState[2] == "X" || ActualBoardState[2] == "O") &&
    (ActualBoardState[4] == "X" || ActualBoardState[4] == "O") && (ActualBoardState[6] == "X" || ActualBoardState[6] == "O")
    (ActualBoardState[8] == "X" || ActualBoardState[8] == "O") && (ActualBoardState[10] == "X" || ActualBoardState[10] == "O")
    (ActualBoardState[12] == "X" || ActualBoardState[12] == "O") && (ActualBoardState[14] == "X" || ActualBoardState[14] == "O")
    (ActualBoardState[16] == "X" || ActualBoardState[16] == "O") && misty.Get("p2win") == false && misty.Get("p1win") == false)
    {
        misty.Set("DrawGame", true,false);
    }
} // define 3 global variables for player1 2 and draw end game
