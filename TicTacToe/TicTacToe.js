//This is a SHELL FOR MISTY TO PLAY TIC TAC TOE WITH AI/ANOTHER MISTY
misty.Set("StateOfGame",["X","X", "X", "X", "X", "X", "X", "X", "X"], false);

testit();
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
/*
misty.DisplayImage("Otoe.png", "OtoeLayer1");
misty.DisplayImage("Otoe2.png", "OtoeLayer2");
misty.DisplayImage("Otoe3.png", "OtoeLayer3");
misty.DisplayImage("Otoe4.png", "OtoeLayer4");
misty.DisplayImage("Otoe5.png", "OtoeLayer5");
misty.DisplayImage("Otoe6.png", "OtoeLayer6");
misty.DisplayImage("Otoe7.png", "OtoeLayer7");
misty.DisplayImage("Otoe8.png", "OtoeLayer8");
misty.DisplayImage("Otoe9.png", "OtoeLayer9");

*/

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



misty.SetImageDisplaySettings("XtoeLayer1", false, false, true, 1.0, 110, 110, "Uniform", true, 0, "Left", "Top", 0,0 );


misty.SetImageDisplaySettings("XtoeLayer2", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Top", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer3", false, false, true, 1.0, 110, 110, "Uniform", true, 0, "Right", "Top", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer4", false, false, true, 1.0, 110, 75, "Uniform", true, 0, "Left", "Center", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer5", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Center", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer6", false, false, true, 1.0, 120, 75, "Uniform", true, 0, "Right", "Center", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer7", false, false, true, 1.0, 110, 85, "Uniform", true, 0, "Left", "Bottom", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer8", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Bottom", 0,0 );

misty.SetImageDisplaySettings("XtoeLayer9", false, false, true, 1.0, 110, 85, "Uniform", true, 0, "Right", "Bottom", 0,0 );

misty.Pause(5000);

misty.SetImageDisplaySettings("XtoeLayer1", null, true);
misty.Debug("we are stepping through 4");
misty.Pause(2000);

misty.SetImageDisplaySettings("XtoeLayer2", null, true);
misty.Debug("we are stepping through 5");
misty.Pause(2000);

misty.SetImageDisplaySettings("XtoeLayer3", null, true);
misty.Debug("we are stepping through 6");
misty.Pause(2000);

misty.SetImageDisplaySettings("XtoeLayer4", null, true);
misty.Debug("we are stepping through 7");
misty.Pause(2000);

misty.SetImageDisplaySettings("XtoeLayer5", null, true);
misty.Debug("we are stepping through 8");
misty.Pause(2000);

misty.SetImageDisplaySettings("XtoeLayer6", null, true);
misty.Debug("we are stepping through 9");
misty.Pause(2000);

misty.SetImageDisplaySettings("XtoeLayer7", null, true);
misty.Debug("we are stepping through 10");
misty.Pause(2000);

misty.SetImageDisplaySettings("XtoeLayer8", null, true);
misty.Debug("we are stepping through 3");
misty.Pause(2000);

misty.SetImageDisplaySettings("XtoeLayer9", null, true);
misty.Debug("we are stepping through 3");
misty.Pause(2000);
//delete the photo
misty.SetImageDisplaySettings("MyBoard", null, true);
misty.Debug("we are stepping through delete the whole board");
//the Os will be visible as well after I test that all Xs are correctly formatted and fitted on the board
misty.SetImageDisplaySettings("OtoeLayer1", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Left", "Top", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer2", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Center", "Top", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer3", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Right", "Top", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer4", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Left", "Center", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer5", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Center", "Center", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer6", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Right", "Center", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer7", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Left", "Bottom", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer1", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Center", "Bottom", 0,0 );
misty.SetImageDisplaySettings("OtoeLayer1", false, false, false, 1.0, 90, 70, "Uniform", true, 0, "Right", "Bottom", 0,0 );
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
misty.Set("CurrentPlayer", "player1");
misty.Set("ActiveGame", true, false);
misty.Set("Player1_Won", "", false); //set to Player1Won or Player2Wond depending on victor
misty.Set("TieGame", "", false);

misty.Set("WinningCondition",   
[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
], false); //save the winning combinations

misty.Set("PlayerSelected", "", false);

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
*/

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



//BLANKING EVERYTHING OUT TO MAKE SURE THE PHOTOS DISPLAY CURRECTLY FIRST
/*





function Start_Tic_Tac_Toe()
{
    let ActiveGame = true //probably more useful once i can get games to restart after game over
    let currentPlayer = "player";
    let StateOfGame = ["", "", "", "", "", "", "", "", ""];

    //Dispaly tie game if the game is a tie
    //Display Player 1 or 2 one depending on which side one
    //Display game over sign for a few seconds before ending skill/restarting game
    //Maybe start new game if button is clicked withing 5-10 seconds after game is over.misty/
    //otherwise tally of won/loss games is scored then robot should say I won the series + num of games one 
    // + " out of" num games played - end skill and board
    //also need to allow program to know who won/loss/tie

    const Player1_Won = "Player1Won";

    const Player2_Won = "Player2Won";
    const TieGame = "Tie";

    //This function will determine when a picture file will be visible which is updated every turn
    const winningCondition = 
    //array that stores all the winning combinations
    [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
}

function CellPlayed(){
    const CurrentCells = misty.Get("StateOfGame");

}
function HandleTheResults()
{
    let roundWon = false
    let WC = misty.Get("WinningCondition");
    let CurrentState = misty.Get("StateOfGame");
    let fullBoardNotDraw = false;
    for(let i = 0; i <=8; i++)
    {
        //TESTING PURPOSES PRINT OUT THE CURRENT VALUES OF THE GAME STATE ARRAY
    misty.Debug("The Current array values 1-9" + CurrentState[i] + " | ");
    }
    for(let i = 0; i <=7; i++){
        const winCondition = WC[i];
        let a = CurrentState[WC[0]];
        let b = CurrentState[WC[1]];
        let c = CurrentState[WC[2]];
        if(a === '' || b === '' || c === '')
        {
            continue;
        }
        if(a === b && b === c)// if three Os are read or three Xs are read in any direction = round one a,b,c = O/X
        {
            roundWon = true;
            fullBoardNotDraw = true; // don't allow the draw picture to display even when won game takes all spaces
            break;
        }

    }
    if(roundWon){
        misty.DisplayImage("Player1wins.png","youwin1"); // this will be updated to reflect robot 1 or two
        misty.SetImageDisplaySettings("youwin1", false, false, true, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );
        //playAudio("misty1/2 wins")
        misty.Pause(4000);
        //make the pplayerwon image not visable 
        misty.SetImageDisplaySettings("youwin1", false, false, false, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );

        misty.DisplayImage("Gameover.png", "ItsDone");
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );
        misty.Set("ActiveGame", false, false); //game is no longer active
    }
    let roundDraw = !CurrentState.includes("");
    //just gonna hard code if includes doesn't work
    if(CurrentState[0] != "" && CurrentState[1] != "" && CurrentState[2] != "" && CurrentState[3] != "" &&
    CurrentState[4] != "" && CurrentState[5] != "" && CurrentState[6] != "" && CurrentState[7] != "" && CurrentState[8] != ""
    && fullBoardNotDraw == false)
    {
        misty.DisplayImage("TieGame.png","Draw"); // this will be updated to reflect robot 1 or two
        misty.SetImageDisplaySettings("Draw", false, false, true, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );
        misty.Pause(4000);
        //make the pplayerwon image not visable 
        misty.SetImageDisplaySettings("Draw", false, false, false, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );

        misty.DisplayImage("Gameover.png", "ItsDone");
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);//have the game over blink in and out a few times
        misty.SetImageDisplaySettings("ItsDone", false, false, false, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );
        misty.Pause(1000);
        misty.SetImageDisplaySettings("ItsDone", false, false, true, 1.0, 300, 152, none, true, 0, "Center", "Center", 0,0 );
        misty.Set("ActiveGame", false, false); //game is no longer active
    }
    //nextComputerMove(){}
}

//FOR NOW THE BOTH COMPUTER WILL BE DUMB AND ONLY SELECT RANDOM SPACES GRANTED THEY ARE AVAILABLE
//IF TIME PERMITS I WANT TO ADD SOME TYPE OF AI/ALGORITHM BUT I DON'T WANT IT OPTIMIZED BECAUSE
//THAT MAY LEAD TO DRAWS EVERY GAME.
//POSSIBLY IMPLEMENT MINIMAX ALGORITHM
function GameStart(){
    //play audio game is going to start
    var chosetilep1;
    misty.Pause(3000);
    var isActive = misty.Get("ActiveGame");
    while(isActive == true)
    {
        misty.Debug("WE ARE INSIDE GAMESTART LOOP YEPEEE");
        //MAY USE API FOR MISTY TO SPEAK SELECTED TILE
        //EITHER THAT OR I HAVE TO UPLOAD 9 AUDIO FILES
        //AND SET UP 9 IF ELSE STATEMENTS BLEH
        //playaudio()
        Computer1Move();

        chosentile1 = Computer1Move();
        misty.Debug("The tile currently selected is " + chosentile1);
        //speakit = "I select tile " + chosentile.toString();
        //speakthetext(speakit);
        misty.Pause(3000);
        if(chosetilep1 == 0)
        {
            //this is where we will make a selection visible on the board
            misty.SetImageDisplaySettings("XtoeLayer1", false, false, true, 1.0, 130, 130, none, true, 0, "Left", "Top", 0,0 );

        }
        else if(chosentilep1 == 1)
        {
            misty.SetImageDisplaySettings("XtoeLayer2", false, false, true, 1.0, 130, 130, none, true, 0, "Center", "Top", 0,0 );

        }
        else if(chosetilep1 == 2)
        {
            misty.SetImageDisplaySettings("XtoeLayer3", false, false, true, 1.0, 130, 130, none, true, 0, "Right", "Top", 0,0 );

        }
        else if(chosetilep1 == 3)
        {
            misty.SetImageDisplaySettings("XtoeLayer4", false, false, true, 1.0, 130, 130, none, true, 0, "Left", "Center", 0,0 );

        }
        else if(chosetilep1 == 4)
        {
            misty.SetImageDisplaySettings("XtoeLayer5", false, false, true, 1.0, 130, 130, none, true, 0, "Center", "Center", 0,0 );

        }
        else if(chosetilep1 == 5)
        {
            misty.SetImageDisplaySettings("XtoeLayer6", false, false, true, 1.0, 130, 130, none, true, 0, "Right", "Center", 0,0 );

        }
        else if(chosetilep1 == 6)
        {
            misty.SetImageDisplaySettings("XtoeLayer7", false, false, true, 1.0, 130, 130, none, true, 0, "Left", "Bottom", 0,0 );

        }
        else if(chosetilep1 == 7)
        {
            misty.SetImageDisplaySettings("XtoeLayer8", false, false, true, 1.0, 130, 130, none, true, 0, "Center", "Bottom", 0,0 );

        }
        else if(chosetilep1 == 8)
        {
            misty.SetImageDisplaySettings("XtoeLayer9", false, false, true, 1.0, 130, 130, none, true, 0, "Right", "Bottom", 0,0 );

        }


        //check to see if the game is a win or draw for player X
        HandleTheResults();
        //if-elses for computer2 next




        //after all that make sure the game isn't over again
    }
}
function Computer1Move()
{
    tempArray = [0,1,2,3,4,5,6,7,8]; //this may have to just be curly braces IDK
    tempArray2 = [];
    tempArray3 = [];
    var st1,st2;
    vel = 8
    TheNewArray = [];
    currBoard = misty.Get("StateOfGame");
    move = Math.floor(Math.random() * vel);
    ispicked = true;
    while(ispicked == true)
    {
        misty.Debug("the current tile selected is unavailabe..try again");
        if(currBoard[move] == "")
        {
            ispicked = false;
            currBoard[move] = "X";
            misty.Set("StateOfGame", currBoard, false ); //update board state with computer 1 selection
            return move;
        }
        else if(currBoard[move] != "" )
        {
            //need to place chosen item at back of line then update line
            tempArray4 = [];
            tempArray4[move] = tempArray[move];
            TheNewArray = tempArray;
            st1 = tempArray[i];

                //currBoard[i] = tempArray[i] ;
            for(i = move; i <= 8; i++)
            {
                //currBoard[i] = tempArray[i] ;
                if(move != 8){
                    st2 = tempArray[move+1];
                    TheNewArray[i] = st2;
                }
            }
            TheNewArray[8] = st1;
            //make sure the random array select is selecting 
            vel = vel-1;
            move = Math.floor(Math.random() * vel);

        }
    }
}

function Computer2Move(){

}
*/