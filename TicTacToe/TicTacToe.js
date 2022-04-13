//This is a SHELL FOR MISTY TO PLAY TIC TAC TOE WITH AI/ANOTHER MISTY
misty.Set("StateOfGame",["","", "", "", "", "", "", "", ""], false);

//testit();
misty.DisplayLayerImage("BlankBoard2.png", "MyBoard");
misty.DisplayLayerImage("Xtoe.png", "XtoeLayer1");
misty.DisplayLayerImage("Xtoe2.png", "XtoeLayer2");
misty.DisplayLayerImage("Xtoe3.png", "XtoeLayer3");
misty.DisplayLayerImage("Xtoe4.png", "XtoeLayer4");
misty.DisplayLayerImage("Xtoe5.png", "XtoeLayer5");
misty.DisplayLayerImage("Xtoe6.png", "XtoeLayer6");
misty.DisplayLayerImage("Xtoe7.png", "XtoeLayer7");
misty.DisplayLayerImage("Xtoe8.png", "XtoeLayer8");
misty.DisplayLayerImage("Xtoe9.png", "XtoeLayer9");

misty.DisplayImage("Otoe.png", "OtoeLayer1");
misty.DisplayImage("Otoe2.png", "OtoeLayer2");
misty.DisplayImage("Otoe3.png", "OtoeLayer3");
misty.DisplayImage("Otoe4.png", "OtoeLayer4");
misty.DisplayImage("Otoe5.png", "OtoeLayer5");
misty.DisplayImage("Otoe6.png", "OtoeLayer6");
misty.DisplayImage("Otoe7.png", "OtoeLayer7");
misty.DisplayImage("Otoe8.png", "OtoeLayer8");
misty.DisplayImage("Otoe9.png", "OtoeLayer9");



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
//misty.Pause(5000);



misty.SetImageDisplaySettings("XtoeLayer1", false, false, false, 1.0, 110, 110, "Uniform", true, 0, "Left", "Top", 0,0 );


misty.SetImageDisplaySettings("XtoeLayer2", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Center", "Top", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer3", false, false, false, 1.0, 110, 110, "Uniform", true, 0, "Right", "Top", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer4", false, false, false, 1.0, 110, 75, "Uniform", true, 0, "Left", "Center", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer5", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Center", "Center", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer6", false, false, false, 1.0, 120, 75, "Uniform", true, 0, "Right", "Center", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer7", false, false, false, 1.0, 110, 85, "Uniform", true, 0, "Left", "Bottom", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer8", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Center", "Bottom", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer9", false, false, false, 1.0, 110, 85, "Uniform", true, 0, "Right", "Bottom", 0,0 );

//misty.Pause(5000);

//the Os will be visible as well after I test that all Xs are correctly formatted and fitted on the board
misty.SetImageDisplaySettings("OtoeLayer1", false, false, false, 1.0, 110, 110, "Uniform", true, 0, "Left", "Top", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer2", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Center", "Top", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer3", false, false, false, 1.0, 110, 110, "Uniform", true, 0, "Right", "Top", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer4", false, false, false, 1.0, 110, 75, "Uniform", true, 0, "Left", "Center", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer5", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Center", "Center", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer6", false, false, false, 1.0, 120, 75, "Uniform", true, 0, "Right", "Center", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer7", false, false, false, 1.0, 110, 85, "Uniform", true, 0, "Left", "Bottom", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer1", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Center", "Bottom", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer1", false, false, false, 1.0, 110, 85, "Uniform", true, 0, "Right", "Bottom", 0,0 );
//PIXEL VALUES WILL BE ADJUSTED ONCE I CAN SEE HOW THEY APPEAR ON THE BOARD -MAY NEED TO UPDATE BOARD SO EVERYTHING LOOKS EVEN

//may not need 9 separte pictures of the same file...misty



//WE WILL EITER DIPLAY ALL IMAGES SIMULTANEOUSLY OR SIMPLY CALL ONE AT A TIME
//WILL PROBABLY PLAY ONE AT A TIME BUT THIS WILL DO FOR NOW
//THESE DISPLAY SETTINGS WILL BE ALTERED TO CHANGE OPACITY TO 1 FROM 0
//TO DISPLAY TURN HAS BEEN TAKEN


//misty.PlayAudio("playtictactoe", 100);
//speakTheText("time to play tic tac toe");
//misty.Pause(4000);

//probably going to roll with global variables instead of defining from within the function
misty.Set("CurrentPlayer", "player1", false);
misty.Set("ActiveGame", true, false);
misty.Set("Player1_Won", false, false); //set to Player1Won or Player2Wond depending on victor
misty.Set("TieGame", false, false);
misty.Set("Comp1Turn", false, false);
misty.Set("Comp2Turn",false, false);
misty.Set("Move", "", false);

misty.Set("WinningCondition",   
[
    /* //what these values actually represent
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    */
    //same values but to work with the string array it needs to be like this
    [0,2,4],
    [6,8,10],
    [12,14,16],
    [0,6,12],
    [2,8,14],
    [4,10,16],
    [0,8,16],
    [4,8,12]
], false); //save the winning combinations

misty.Set("PlayerSelected", "", false);
/*
function testit()
{
i = 0;
 var CurrentState = misty.Get("StateOfGame");
let fullBoardNotDraw = false;
/*
while(i < 10)
{
    misty.Debug("WHILE LOOPS WORK CAN YOU BELIEVE THAT");
i++;
}


CurrentState = ["O","O","O","O","O","O", "O", "O","O"];
CurrentState[2] = "X";
CurrentState[4] = "X";

misty.Set("StateOfGame", CurrentState, false);
misty.Debug("Cur state = " + CurrentState[2] + " " + CurrentState[4]);
//var testarray = 
misty.Pause(2000);
misty.Debug("The Current array value 1 " + CurrentState[0] + " | index = " + i);

for(i = 0; i <=8; i++)
{
    //TESTING PURPOSES PRINT OUT THE CURRENT VALUES OF THE GAME STATE ARRAY
misty.Debug("The Current array values 1-9 " + CurrentState[i+2] + " | index = " + i);
// INDEX 0 ACTUALLY = 2, INDEX 2 =4 ... MAIN WAY TO ACCESS THE ARRAY FOR NOW
//WILL HAVE TO MAKE SURE ITS WELL DOCUMENTED...UPDATE ANY CODE TO ACCOMODATE FOR COMMAS ,
}


}
*/
//BLANKING EVERYTHING OUT TO MAKE SURE THE PHOTOS DISPLAY CURRECTLY FIRST



function CellPlayed()
{
    const CurrentCells = misty.Get("StateOfGame");

}
function HandleTheResults()
{
    let roundWon, roundLost = false
    let WC = misty.Get("WinningCondition");
    let CurrentState = misty.Get("StateOfGame");
    let fullBoardNotDraw = false;
    for(let i = 0; i <=16; i++)
    {
        //TESTING PURPOSES PRINT OUT THE CURRENT VALUES OF THE GAME STATE ARRAY
    misty.Debug("The Current array values 1-9" + CurrentState[i] + " | ");
    }
    //the multi dim array may even need ,s account for so if it doesn't use
    //for(let i = 0; i <=7; i++)
    //else use the following
    for(let i = 0; i <=14; i+2)
    {
        const winCondition = WC[i];
        misty.Debug("wincstatement executing.. " + winCondition); 
        //in the event that ,s have to be accounted for when reading in contents of array
        /*
        let a = CurrentState[winCondition[0]];
        let b = CurrentState[winCondition[1]];
        let c = CurrentState[winCondition[2]];
        */
        let a = CurrentState[winCondition[0]];
        let b = CurrentState[winCondition[2]];
        let c = CurrentState[winCondition[4]];
        if(a === '' || b === '' || c === '')
        {
            continue;
        }
        if(a === b && b === c)// if three Os are read or three Xs are read in any direction = round one a,b,c = O/X
        {
            if(a == "X")
            {
              roundWon = true;
              fullBoardNotDraw = true; // don't allow the draw picture to display even when won game takes all spaces
            }
            else if(a == "O")
            {
                roundLost = true;
                fullBoardNotDraw = true;
            }
            break;
        }

    }
    if(roundWon)
    {
        misty.PlayAudio("Iwin.mp3", 90);
        misty.DisplayImage("Player1wins.png","youwin1"); // this will be updated to reflect robot 1 or two
        misty.SetImageDisplaySettings("youwin1", false, false, true, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        //playAudio("misty1/2 wins")
        misty.Pause(4000);
        //make the pplayerwon image not visable 
        misty.SetImageDisplaySettings("youwin1", false, true);

        misty.DisplayImage("Gameover.png", "ItsDone");
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Set("ActiveGame", false, false); //game is no longer active
    }

    if(roundLost)
    {
        misty.PlayAudio("ilost.mp3", 90);
        misty.DisplayImage("Player2wins.png","youwin2"); // this will be updated to reflect robot 1 or two
        misty.SetImageDisplaySettings("youwin2", false, false, true, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        //playAudio("misty1/2 wins")
        misty.Pause(4000);
        //make the pplayerwon image not visable 
        misty.SetImageDisplaySettings("youwin2", false, true);

        misty.DisplayImage("Gameover.png", "ItsDone");
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Set("ActiveGame", false, false); //game is no longer active
    }

    //let roundDraw = !CurrentState.includes("");
    //just gonna hard code if includes doesn't work
    if(CurrentState[0] != "" && CurrentState[2] != "" && CurrentState[4] != "" && CurrentState[6] != "" &&
    CurrentState[8] != "" && CurrentState[10] != "" && CurrentState[12] != "" && CurrentState[14] != "" && CurrentState[16] != ""
    && fullBoardNotDraw == false)
    {
        misty.PlayAudio("Draw.mp3", 90);
        misty.DisplayImage("TieGame.png","Draw"); // this will be updated to reflect robot 1 or two
        misty.SetImageDisplaySettings("Draw", false, false, true, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(4000);
        //make the pplayerwon image not visable/DELETE IT BECAUSE IT ISN'T NEEDED NOW 
        misty.SetImageDisplaySettings("Draw", false, true);

        misty.DisplayImage("Gameover.png", "ItsDone");
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, "None", true, 0, "Center", "Center", 0,0 );
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
    var chosetilep1;
    misty.PlayAudio("GameStart.mp3", 90);
    misty.Pause(3000);
    var isActive = misty.Get("ActiveGame");
    while(misty.Get("ActiveGame") == true)
    {
        misty.Debug("WE ARE INSIDE GAMESTART LOOP YEPEEE");
        //MAY USE API FOR MISTY TO SPEAK SELECTED TILE
        //EITHER THAT OR I HAVE TO UPLOAD 9 AUDIO FILES
        //AND SET UP 9 IF ELSE STATEMENTS BLEH
        //playaudio()
        Computer2Move();

       // chosentile1 = misty.Get("Move");
      //  misty.Debug("The tile currently selected is " + chosentile1);
        //speakit = "I select tile " + chosentile.toString();
        //speakthetext(speakit);
        misty.Pause(3000);

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
       // HandleTheResults();
        if(misty.Get("ActiveGame") == true)//only place next tile if the game isn't already over
        {
            chosentile1 = misty.Get("Move");//may need to convert to string
            misty.Debug("player 2 turn first.. execute");
            misty.Debug("The tile currently selected is " + chosentile1);

            if(chosetilep1 == 0)
            {
                //initiate radom response after selection, but don't actuall display it until after it is done
                //this is where we will make a selection visible on the board
                
                misty.SetImageDisplaySettings("OtoeLayer1", false, false, true, 1.0, 130, 130, none, true, 0, "Left", "Top", 0,0 );

            }
            else if(chosentilep1 == 2)// "",""   0,1,2   the commas count in the array for some reason
            {
            
                misty.SetImageDisplaySettings("OtoeLayer2", false, false, true, 1.0, 130, 130, none, true, 0, "Center", "Top", 0,0 );

            }
            else if(chosetilep1 == 4)
            {
                

                misty.SetImageDisplaySettings("OtoeLayer3", false, false, true, 1.0, 130, 130, none, true, 0, "Right", "Top", 0,0 );

            }
            else if(chosetilep1 == 6)
            {
                

                misty.SetImageDisplaySettings("OtoeLayer4", false, false, true, 1.0, 130, 130, none, true, 0, "Left", "Center", 0,0 );

            }
            else if(chosetilep1 == 8)
            {
                

                misty.SetImageDisplaySettings("OtoeLayer5", false, false, true, 1.0, 130, 130, none, true, 0, "Center", "Center", 0,0 );

            }
            else if(chosetilep1 == 10)
            {
                

                misty.SetImageDisplaySettings("OtoeLayer6", false, false, true, 1.0, 130, 130, none, true, 0, "Right", "Center", 0,0 );

            }
            else if(chosetilep1 == 12)
            {
                

                misty.SetImageDisplaySettings("OtoeLayer7", false, false, true, 1.0, 130, 130, none, true, 0, "Left", "Bottom", 0,0 );

            }
            else if(chosetilep1 == 14)
            {
            

                misty.SetImageDisplaySettings("OtoeLayer8", false, false, true, 1.0, 130, 130, none, true, 0, "Center", "Bottom", 0,0 );

            }
            else if(chosetilep1 == 16)// 
            {
                

                misty.SetImageDisplaySettings("OtoeLayer9", false, false, true, 1.0, 130, 130, none, true, 0, "Right", "Bottom", 0,0 );

            }
        }
//for now player 2 will always make the first move...misty

        HandleTheResults(); //make sure the game isn't over yet

        Computer1Move(); //execute next player move
        if(misty.Get("ActiveGame") == true)
        {
            chosentile1 = misty.Get("Move");//may need to convert to string
            misty.Debug("player 1 turn next.. execute");
            misty.Debug("The tile currently selected is " + chosentile1);

            if(chosetilep1 == 0)
            {
                //initiate radom response after selection, but don't actuall display it until after it is done
                //this is where we will make a selection visible on the board
                randomResponse();
                misty.SetImageDisplaySettings("XtoeLayer1", false, false, true, 1.0, 130, 130, none, true, 0, "Left", "Top", 0,0 );

            }
            else if(chosentilep1 == 2)// "",""   0,1,2   the commas count in the array for some reason
            {
                randomResponse();
                misty.SetImageDisplaySettings("XtoeLayer2", false, false, true, 1.0, 130, 130, none, true, 0, "Center", "Top", 0,0 );

            }
            else if(chosetilep1 == 4)
            {
                randomResponse();

                misty.SetImageDisplaySettings("XtoeLayer3", false, false, true, 1.0, 130, 130, none, true, 0, "Right", "Top", 0,0 );

            }
            else if(chosetilep1 == 6)
            {
                randomResponse();

                misty.SetImageDisplaySettings("XtoeLayer4", false, false, true, 1.0, 130, 130, none, true, 0, "Left", "Center", 0,0 );

            }
            else if(chosetilep1 == 8)
            {
                randomResponse();

                misty.SetImageDisplaySettings("XtoeLayer5", false, false, true, 1.0, 130, 130, none, true, 0, "Center", "Center", 0,0 );

            }
            else if(chosetilep1 == 10)
            {
                randomResponse();

                misty.SetImageDisplaySettings("XtoeLayer6", false, false, true, 1.0, 130, 130, none, true, 0, "Right", "Center", 0,0 );

            }
            else if(chosetilep1 == 12)
            {
                randomResponse();

                misty.SetImageDisplaySettings("XtoeLayer7", false, false, true, 1.0, 130, 130, none, true, 0, "Left", "Bottom", 0,0 );

            }
            else if(chosetilep1 == 14)
            {
                randomResponse();

                misty.SetImageDisplaySettings("XtoeLayer8", false, false, true, 1.0, 130, 130, none, true, 0, "Center", "Bottom", 0,0 );

            }
            else if(chosetilep1 == 16)// 
            {
                randomResponse();

                misty.SetImageDisplaySettings("XtoeLayer9", false, false, true, 1.0, 130, 130, none, true, 0, "Right", "Bottom", 0,0 );

            }

        }
        //check to see if the game is a win or draw for player X
        HandleTheResults();
        //if-elses for computer2 next




        //after all that make sure the game isn't over again
    }
    misty.Pause(10000); //Wait a bit before the whole board and tiles are cleared from the display
    Reset_Board();
}
function Computer1Move()
{
    let tempArray = [0,1,2,3,4,5,6,7,8]; //this may have to just be curly braces IDK
    tempArray2 = [];
    tempArray3 = [];
    var st1,st2;
    var vel = 16;
    let TheNewArray = [];
    currBoard = misty.Get("StateOfGame");
    var move = Math.floor(Math.random() * vel);
    let ispicked = false;
    if(move == 1 || move == 3 || move == 5 || move == 7 || move == 9 || move == 11 || move == 13 || move == 15)
    {
        move = move + 1;// for whatever reason misty accounts for ,(commas) when using an array 
        //so we need to increment if the random selection in the array happens to be at an index
        //that posses a , 
    }
    while(ispicked == false)
    {
        if(currBoard[move] == "")
        {
            ispicked = true;
            currBoard[move] = "X";
            misty.Set("StateOfGame", currBoard, false ); //update board state with computer 1 selection
            misty.Set("Move", move, false);
            misty.Debug("Tile " + move + "successfully inputted..moving on to next move");
        }
        else if(currBoard[move] != "" )
        {
            misty.Debug("the current tile selected is unavailabe..trying again");

            //need to place chosen item at back of line then update line
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
            move = Math.floor(Math.random() * vel);

        }
    }
}

function Computer2Move()
{
    //logically for now computer 2 will work exactly like computer 1.... computer 2 
    //is supposed to be replaced by misty mountain robot updating there move in the dashboard tic tac toe board
    //until then computer 2 and 1 will face off.... no AI AS OF YET.. REALLY NEED ONE

    let tempArray = [0,1,2,3,4,5,6,7,8]; //this may have to just be curly braces IDK
    tempArray2 = [];
    tempArray3 = [];
    var st1,st2;
    var vel = 16;
    let TheNewArray = [];
    currBoard = misty.Get("StateOfGame");
    var move = Math.floor(Math.random() * vel);
    let ispicked = false;
    if(move == 1 || move == 3 || move == 5 || move == 7 || move == 9 || move == 11 || move == 13 || move == 15)
    {
        move = move + 1;// for whatever reason misty accounts for ,(commas) when using an array 
        //so we need to increment if the random selection in the array happens to be at an index
        //that posses a , 
    }
    while(ispicked == false)
    {
        if(currBoard[move] == "")
        {
            ispicked = true;
            currBoard[move] = "O";
            misty.Set("StateOfGame", currBoard, false ); //update board state with computer 1 selection
            misty.Set("Move", move, false);
            misty.Debug("Tile " + move + "successfully inputted..moving on to next move");
        }
        else if(currBoard[move] != "" )
        {
            misty.Debug("the current tile selected is unavailabe..trying again");

            //need to place chosen item at back of line then update line
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
            move = Math.floor(Math.random() * vel);

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