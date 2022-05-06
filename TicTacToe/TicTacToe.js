/*
    Goal: Misty simulates tic-tac-toe game on her display
    process: The misty.DisplayLaterImage() built in method is used to stack Xs and Os on a blank 9 tile board.
             The animation is supposed to give the impression that the AI is thinking about the move it is making.
             Both functions that control computer1 and computer2s move use the math.floor method to determine
             which tile to select on a given turn granted the tile hasn't already been taken. The skill tracks
             the state of the board throughout the game and will end in player 1 or player 2s win if one has a
             winning combination at any point in the game. The game can also end in a draw if all tiles are
             selected without a winner. After the game ends, the end game sequence animation plays for 10 seconds
             and then the board and all tiles are cleared off the screen. 
             Instead of simulating a game, this skill was originally supposed to play tic-tac-toe with another
             misty robot by communicating directly through our dashboard. 
             To implement this we were to take three variables and send them to the dashboard using a 
             registered event depending on whos turn it was.
             The dashboard was going to hold the players turn, active game state, and the board state.
             Each robot was going to use an event to check the dashboard every couple seconds to determine
             if it was their turn yet. If it is their turn, the game is still active, and the board state is different
             from the last time it was their turn, then that player would make their move then send the contents
             of those three variables back to the dashboard so the next robot could make their move until game ends.
*/
/*
Below is the function we tried to imploy that would return data from the POST and GET API calls to our Misty dashboard.
We were only able to successfully execute the POST API call. 
When we use the GET API call no technique for converting the read in data was successful.
We tried parsing and json.stringify the data passed back into this skill.. 
it always came back undefined or as [object Object].
At the time the project was finished, the bodacious battle bots could not find any information to assist them with the GET API call
function _catch_turn(data)
{
    let plzwork1 = JSON.stringify(data.Result.ResponseObject.Data);
    let ohgod = JSON.parse(plzwork1);
    misty.Debug("the contents of the JSON is = "+ ohgod);
    misty.Debug("the contents of the JSON is = "+ ohgod.playerturn);
    misty.Debug("the contents of the JSON is = "+ ohgod.activegame);
    misty.Debug("the contents of the JSON is = "+ ohgod.boardstate);

    //also try this!!!!!
    misty.Debug("contents of the json are =" + ohgod["playerturn"] 
    + " activegame = " + ohgod["activegame"] + " board state = " + ohgod["boardstate"]);
    let baba = data.json();//TEST THIS
    misty.Debug("the json back is .. " + baba);
    misty.Debug("the json back is .. " + baba.playerturn);
    misty.Debug("the json back is .. " + baba.activegame);
    misty.Debug("the json back is .. " + baba.boardstate);
    misty.Debug("YYAYYAYAYA THIS IS IT 1" + baba[0].playerturn);
    let boom = JSON.parse(baba);
    misty.Debug("attempt at parse = " + boom);
    misty.Debug("attempt at parse = " + boom.playerturn);
    misty.Debug("attempt at parse = " + boom.activegame);
    misty.Debug("attempt at parse = " + boom.boardstate);
    misty.Debug("attempt at parse = " + boom[0]);
    misty.Debug("attempt at parse = " + boom[0].playerturn);
    let chow = JSON.stringify(boom);
    misty.Debug("attempt at jsonstringify = " + chow);
    let dada = JSON.parse(data);
    let dada2 = JSON.parse(data.Result.ResponseObject.Data);
    //const obj = JSON.parse(data.Result.ResponseObject.Data);
   // misty.Debug("contents of stuff1 = " + JSON.stringify(data.Result));
   // misty.Debug("Data caught = " +    obj.playerturn + obj + obj.boardstate);
  //  misty.Set("playerturn", JSON.stringify(data), false);
}

//DASHBOARD FUNCTIONALITY TEST

function postIt(playerturn, isgameactive, board){
var arguments = JSON.stringify({
    
    "playerturn": playerturn,
    "activegame": isgameactive,
    "boardstate": board
});

misty.SendExternalRequest("POST", "http://10.154.29.50:7700/api/SetTaskInfo", null, null,JSON.stringify(arguments), false, false, null, "application/json","{}");
misty.Pause(5000);
//misty.SendExternalRequest("GET", "http://localhost:7700/api/GetTaskInfo", null, null, null, false, false, null, "application/json", "catch_turn");

//var thegame = JSON.parse(arguments);
//misty.Debug("first val .. " + JSON.stringify(JSON.parse(thegame)));
}

postIt(misty.Get("playerturn"), misty.Get("ActiveGame"), misty.Get("StateOfGame")); // this is needed when sending updated board to dashboard
//misty.Pause(5000);
misty.SendExternalRequest("GET", "http://localhost:7700/api/GetTaskInfo", null, null, null, false, false, null, "application/json", "_catch_turn");

*/
//Define global set variables to use within functions
misty.Set("StateOfGame",["_","_","_","_","_","_","_","_","_"], false);
misty.Set("ActiveGame", true, false); //is the game currently active or not
misty.Set("Player1_Won", false, false); //set to Player1Won or Player2Wond depending on victor
misty.Set("TieGame", false, false); //if the game is a draw, update to true
misty.Set("Comp1Turn", false, false); //true or false depending if its computer 1 or 2s turn
misty.Set("Comp2Turn",false, false);
misty.Set("Move", "", false); // Hold an X or O that will be placed in the selected tile
misty.Set("p1win", false, false);
misty.Set("p2win", false, false);
misty.Set("DrawGame", false,false);
Reset_Board(); //Reset the game board..this is necessary here if you end the skill prematurely..
misty.DisplayLayerImage("BlankBoard2.png", "MyBoard"); //output blank 9 tile board to misty screen

//Use the setimagedisplaysettings method to manipulate one particular image within a certain layer on misty display
//Parameters:
//misty.SetImageDisplaySettings(string layer, bool revertToDefault, bool deleted, 
//bool visible, double opacity, int width, int height, string stretch, bool placeontop
//int rotation, string horizontalAlignment, string verticalAlignment, int prePausems,
//int postPauseMS);
misty.SetImageDisplaySettings("MyBoard", null, false, true, 1.0,480,272, "UniformToFill",true,  0, "Center", "Center", 0,0 );
misty.Pause(1000);

GameStart(); //Start the game after the board has appeared on display

/************************************************ HANDLETHERESULTS FUNCTION ******************************************************** */
function HandleTheResults()
{
    let fullBoardDraw = false;
    let roundWon, roundLost = false
    CheckWinState(); //determine if a winning combination is on the board or if it is a draw
    misty.Pause(500);
    roundWon = misty.Get("p1win"); //if player 1 won
    roundLost = misty.Get("p2win"); //if player 2 won
    fullBoardDraw = misty.Get("DrawGame"); //draw game
   
    if(roundWon == true)
    {
        misty.PlayAudio("Iwin.mp3", 80); //play audio file that states player 1 won
        misty.DisplayLayerImage("Player1wins.png","youwin1"); //display image which shows that player 1 won the game
        misty.SetImageDisplaySettings("youwin1", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(5000);
        misty.SetImageDisplaySettings("youwin1", false, true);         //make the Player1wins.png image not visable 
        misty.DisplayLayerImage("GameOver2.png", "ItsDone");           //display game over image 
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
        misty.PlayAudio("ilost.mp3", 90); //play audio file that states player 1 lost
        misty.DisplayLayerImage("Player2wins.png","youwin2"); //display image which shows that player 2 won the game
        misty.SetImageDisplaySettings("youwin2", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(5000);
        misty.SetImageDisplaySettings("youwin2", false, true);  //make the Player2wins.png image not visable 
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

    else if(fullBoardDraw == true)
    {
        misty.PlayAudio("Draw.mp3", 80); //play audio which tells user the game was a draw
        misty.DisplayLayerImage("TieGame.png","Draw"); //display the tie game image
        misty.SetImageDisplaySettings("Draw", false, false, true, 1.0, 300, 152, "Uniform", true, 0, "Center", "Center", 0,0 );
        misty.Pause(4000);
        misty.SetImageDisplaySettings("Draw", false, true); //delete the tie game image

        misty.DisplayLayerImage("GameOver2.png", "ItsDone"); //display the game over image 
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
}
/*********************************************************************************************************************************** */
/**************************************** GAMESTART FUNCTION ********************************************************************** */
//FOR NOW THE BOTH COMPUTER WILL BE DUMB AND ONLY SELECT RANDOM SPACES GRANTED THEY ARE AVAILABLE
//Didn't have time TO ADD SOME TYPE OF AI/ALGORITHM
//POSSIBLY IMPLEMENT MINIMAX ALGORITHM 
//You may delete the math.floor method and replace with any algorithm of your choice to make misty make better choices
function GameStart()
{
    //play audio game is going to start
    misty.PlayAudio("GameStart.mp3", 40);
    misty.Pause(3000);
    while(misty.Get("ActiveGame") == true)
    {
        if(misty.Get("ActiveGame") == true)//only place next tile if the game isn't already over
        {
            //determine which tile to select for computer 2
            Computer2Move(); //COmputer two will always make the first move unless this code is switched up to pick player randomly
            misty.Pause(2000);
            chosentilep1 = misty.Get("Move");//the tile selected by computer 2
            if(chosentilep1 == 0)
            {
                //Display O in tile 1 if selected
                //this is where we will make a selection visible on the board
                misty.PlayAudio("c2tile1.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Otoe.png", "OtoeLayer1");
                misty.SetImageDisplaySettings("OtoeLayer1", false, false, true, 1.0, 110, 110, "Uniform", true, 0, "Left", "Top", 0,0 );
            }
            else if(chosentilep1 == 2)
            {
                //Display O in tile 2 if selected
                misty.PlayAudio("c2tile2.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Otoe2.png", "OtoeLayer2");
                misty.SetImageDisplaySettings("OtoeLayer2", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Top", 0,0 );
            }
            else if(chosentilep1 == 4)
            {
                //Display O in tile 3 if selected
                misty.PlayAudio("c2tile3.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Otoe3.png", "OtoeLayer3");
                misty.SetImageDisplaySettings("OtoeLayer3", false, false, true, 1.0, 110, 110, "Uniform", true, 0, "Right", "Top", 0,0 );
            }
            else if(chosentilep1 == 6)
            {
                //Display O in tile 4 if selected
                misty.PlayAudio("c2tile4.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Otoe4.png", "OtoeLayer4");
                misty.SetImageDisplaySettings("OtoeLayer4", false, false, true, 1.0, 110, 65, "Uniform", true, 0, "Left", "Center", 0,0 );
            }
            else if(chosentilep1 == 8)
            {
                //Display O in tile 5 if selected
                misty.PlayAudio("c2tile5.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Otoe5.png", "OtoeLayer5");
                misty.SetImageDisplaySettings("OtoeLayer5", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Center", 0,0 );
            }
            else if(chosentilep1 == 10)
            {
                //Display O in tile 6 if selected
                misty.PlayAudio("c2tile6.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Otoe6.png", "OtoeLayer6");
                misty.SetImageDisplaySettings("OtoeLayer6", false, false, true, 1.0, 115, 65, "Uniform", true, 0, "Right", "Center", 0,0 );
            }
            else if(chosentilep1 == 12)
            {
                //Display O in tile 7 if selected
                misty.PlayAudio("c2tile7.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Otoe7.png", "OtoeLayer7");
                misty.SetImageDisplaySettings("OtoeLayer7", false, false, true, 1.0, 110, 85, "Uniform", true, 0, "Left", "Bottom", 0,0 );
            }
            else if(chosentilep1 == 14)
            {
                //Display O in tile 8 if selected
                misty.PlayAudio("c2tile8.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Otoe8.png", "OtoeLayer8");
                misty.SetImageDisplaySettings("OtoeLayer8", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Bottom", 0,0 );
            }
            else if(chosentilep1 == 16)// 
            {
                //Display O in tile 9 f selected
                misty.PlayAudio("c2tile9.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Otoe9.png", "OtoeLayer9");
                misty.SetImageDisplaySettings("OtoeLayer9", false, false, true, 1.0, 110, 85, "Uniform", true, 0, "Right", "Bottom", 0,0 );
            }
        }
        if(misty.Get("ActiveGame") == true)
        {
            HandleTheResults(); //make sure the game isn't over yet and if it isnt, check the results of the current board state
        }
        misty.Pause(2000);
        if(misty.Get("ActiveGame") == true) //if the game is still active, player 1 will make its next move
        {
            Computer1Move(); //execute computer 1s tile selection
            misty.Pause(1000);
            if(chosentilep1 == 0)
            {
                //initiate radom response after selection, but don't actuall display it until after it is done
                //this is where we will make a selection visible on the board
                //Display X if tile 1 is selected
                randomResponse();
                misty.PlayAudio("tile1.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Xtoe.png", "XtoeLayer1");
                misty.SetImageDisplaySettings("XtoeLayer1", false, false, true, 1.0, 110, 110, "Uniform", true, 0, "Left", "Top", 0,0 );
            }
            else if(chosentilep1 == 2)// "",""   0,1,2   the commas count in the array for some reason
            {
                //Output random response and display X at tile 2 if selected
                randomResponse();
                misty.PlayAudio("tile2.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Xtoe2.png", "XtoeLayer2");
                misty.SetImageDisplaySettings("XtoeLayer2", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Top", 0,0 );
            }
            else if(chosentilep1 == 4)
            {
                //Output random response and display X at tile 3 if selected
                randomResponse();
                misty.PlayAudio("tile3.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Xtoe3.png", "XtoeLayer3");
                misty.SetImageDisplaySettings("XtoeLayer3", false, false, true, 1.0, 110, 110, "Uniform", true, 0, "Right", "Top", 0,0 );
            }
            else if(chosentilep1 == 6)
            {
                //Output random response and display X at tile 4 if selected
                randomResponse();
                misty.PlayAudio("tile4.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Xtoe4.png", "XtoeLayer4");
                misty.SetImageDisplaySettings("XtoeLayer4", false, false, true, 1.0, 110, 65, "Uniform", true, 0, "Left", "Center", 0,0 );
            }
            else if(chosentilep1 == 8)
            {
                //Output random response and display X at tile 5 if selected
                randomResponse();
                misty.PlayAudio("tile5.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Xtoe5.png", "XtoeLayer5");
                misty.SetImageDisplaySettings("XtoeLayer5", false, false, true, 1.0, 90, 65, "Uniform", true, 0, "Center", "Center", 0,0 );
            }
            else if(chosentilep1 == 10)
            {
                //Output random response and display X at tile 6 if selected
                randomResponse();
                misty.PlayAudio("tile6.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Xtoe6.png", "XtoeLayer6");
                misty.SetImageDisplaySettings("XtoeLayer6", false, false, true, 1.0, 115, 70, "Uniform", true, 0, "Right", "Center", 0,0 );
            }
            else if(chosentilep1 == 12)
            {
                //Output random response and display X at tile 7 if selected
                randomResponse();
                misty.PlayAudio("tile7.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Xtoe7.png", "XtoeLayer7");
                misty.SetImageDisplaySettings("XtoeLayer7", false, false, true, 1.0, 110, 85, "Uniform", true, 0, "Left", "Bottom", 0,0 );
            }
            else if(chosentilep1 == 14)
            {
                //Output random response and display X at tile 8 if selected
                randomResponse();
                misty.PlayAudio("tile8.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Xtoe8.png", "XtoeLayer8");
                misty.SetImageDisplaySettings("XtoeLayer8", false, false, true, 1.0, 90, 70, "Uniform", true, 0, "Center", "Bottom", 0,0 );
            }
            else if(chosentilep1 == 16)// 
            {
                //Output random response and display X at tile 9 if selected
                randomResponse();
                misty.PlayAudio("tile9.mp3", 60);
                misty.Pause(2000);
                misty.DisplayLayerImage("Xtoe9.png", "XtoeLayer9");
                misty.SetImageDisplaySettings("XtoeLayer9", false, false, true, 1.0, 110, 85, "Uniform", true, 0, "Right", "Bottom", 0,0 );
            }
        }
        if(misty.Get("ActiveGame") == true)  //check to see if the game is a win or draw 
        {
            HandleTheResults(); //only handleresutls if it hasn't already deemed the game is over
        }
        //after all that make sure the game isn't over again
    }
    misty.Pause(9000); //Wait a bit before the whole board and tiles are cleared from the display
    Reset_Board();
}
/*************************************************************************************************************************** */
/**************************************** COMPUTER1MOVE FUNCTION ****************************************************** */
function Computer1Move()
{
    var vel = 16;
    var Comp1Turn = "X"; //Player 1 uses Xs 
    var currBoard = misty.Get("StateOfGame"); // store the board state into temp
    var move = Math.floor(Math.random() * vel); //randomly select in from 0 - 16
    let ispicked = false;
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
            ispicked = true; //set the variable bool to true so the loop will end
            misty.Set("Move", move, false); //place the selected tile in the global variable
            UpdateStateOfGame(move, Comp1Turn); //update the board state 
        }
        else if(currBoard[move] == "X" || currBoard[move] == "O")
        {
            //need to REPLACE THIS RANDOM MOVE CHOOSER WITH AN AI... MINIMAX POSSIBLY
            //need to place chosen item at back of line then update line
            move = Math.floor(Math.random() * vel);
            misty.Pause(500); //may need pause for every invalid choice
        }
    }
}
/**************************************************************************************************************************** */
/**************************************************** COMPUTER2MOVE FUNCTION ************************************************ */
function Computer2Move()
{
    //logically for now computer 2 will work exactly like computer 1.... computer 2 
    //is supposed to be replaced by misty mountain robot updating there move in the dashboard tic tac toe board
    //until then computer 2 and 1 will face off.... no AI AS OF YET.. REALLY NEED ONE
    var vel = 16;
    var Comp2Turn = "O";
    let TheNewArray = [];
    var currBoard = misty.Get("StateOfGame");
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
        }
        else if(currBoard[move] == "X" || currBoard[move] == "O")
        {
            //need to place chosen item at back of line then update line
            /*
            WHAT YOU SEE BELOW WAS AN ATTEMPT TO OPTIMIZE THE MATH.FLOOR RANDOM INT SELECTOR
            BY TAKING OUT THE SELECTED INT AND PLACING IT AT THE BACK OF THE ARRAY AND THEN
            PUSHING ALL INDEXES TO THEIR LEFT ONE PLACE. THIS WAS SUPPOSED TO MAKE IT TO WHERE
            THE MATH.FLOOR METHOD WOULD NEVER SELECT A TILE THAT WAS ALREADY TAKE WHICH WOULD
            DECREASE THE RANDOM TIME IT TAKES TO MAKE A MOVE. AS IT STANDS NOW, IT WILL 
            SIMPLY KEEP RANDOMLY SELECTING TILE UNTIL IT FINDS TILE NOT ALREADY SELECTED
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
            misty.Pause(250);
        }
    }
}
/************************************************************************************************************************************* */

/*********************************************** RESET_BOARD FUNCTION ***************************************************************** */
function Reset_Board()
{
    //delete all images on misty display... if you add restart option you would simply take out the setting for deleting the board itself
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

    //delete the game over image
    misty.SetImageDisplaySettings("ItsDone", false, true);
}
/************************************************************************************************************************************* */
/********************** RANDOMRESPONSE FUNCTION *************************** */
function randomResponse()
{
    //SIMPLY SELECT ONE OF THE TWO RANDOM RESPONSE AND PLAY AS AUDIO
    var resp;
    resp = Math.floor(Math.random() * 2);
    switch(resp)
    { //random response everytime misty makes a move
        case 0:
            misty.PlayAudio("nicemove.mp3", 30);
            misty.Pause(3000);
            break;
        case 1:
            misty.PlayAudio("ropes.mp3", 30);
            misty.Pause(3000);
            break;
    }
}
/************************************************************************ */
/*********************************************** UPDATESTATEOFGAME FUNCTION ******************************************** */
function UpdateStateOfGame(move,turnof)
{
    //update state of game no matter whos turn it is
    //PICKS 1 - 9 HOLD THE CONTENTS OF TILES 1 - 9 FROM THE GLOBAL VARIABLE OF STATEOFGAME
    var pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9;
    var CurrentState = misty.Get("StateOfGame"); //get the contents of the board state
    pick1 = CurrentState[0];    //store contents of tile 1
    pick2 = CurrentState[2];    //store contents of tile 2
    pick3 = CurrentState[4];    //store contents of tile 3
    pick4 = CurrentState[6];    //store contents of tile 4
    pick5 = CurrentState[8];    //store contents of tile 5
    pick6 = CurrentState[10];   //store contents of tile 6
    pick7 = CurrentState[12];   //store contents of tile 7
    pick8 = CurrentState[14];   //store contents of tile 8
    pick9 = CurrentState[16];   //store contents of tile 9

    switch(move) //place X or O in tile 1 - 9 depending on selection
    {
        case 0:
            pick1 = turnof; //store either X or O depending on whos turn it is (x = player 1, o = player 2)
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9]; //place X or O in tile 1 depending on turn
            misty.Set("StateOfGame", CurrentState, false); //update the board state
            break;
        case 2:
            pick2 = turnof; //store either X or O depending on whos turn it is (x = player 1, o = player 2)
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9]; //place X or O in tile 2 depending on turn
            misty.Set("StateOfGame", CurrentState, false);
            break;
        case 4:
            pick3 = turnof; //store either X or O depending on whos turn it is (x = player 1, o = player 2)
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9]; //place X or O in tile 3 depending on turn
            misty.Set("StateOfGame", CurrentState, false);
            break;
        case 6:
            pick4 = turnof; //store either X or O depending on whos turn it is (x = player 1, o = player 2)
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9]; //place X or O in tile 4 depending on turn
            misty.Set("StateOfGame", CurrentState, false);
            break;
        case 8:
            pick5 = turnof; //store either X or O depending on whos turn it is (x = player 1, o = player 2)
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9]; //place X or O in tile 5 depending on turn
            misty.Set("StateOfGame", CurrentState, false);
            break;
        case 10:
            pick6 = turnof; //store either X or O depending on whos turn it is (x = player 1, o = player 2)
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9]; //place X or O in tile 6 depending on turn
            misty.Set("StateOfGame", CurrentState, false);
            break;
        case 12:
            pick7 = turnof; //store either X or O depending on whos turn it is (x = player 1, o = player 2)
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9]; //place X or O in tile 7 depending on turn
            misty.Set("StateOfGame", CurrentState, false);
            break;
        case 14:
            pick8 = turnof; //store either X or O depending on whos turn it is (x = player 1, o = player 2)
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9]; //place X or O in tile 8 depending on turn
            misty.Set("StateOfGame", CurrentState, false);
            break;
        case 16:
            pick9 = turnof; //store either X or O depending on whos turn it is (x = player 1, o = player 2)
            CurrentState = [pick1,pick2,pick3,pick4,pick5,pick6,pick7,pick8,pick9]; //place X or O in tile 9 depending on turn
            misty.Set("StateOfGame", CurrentState, false);
            break;
    }
} 
/******************************************************************************************************************************** */
/*************************************************** CHECKWINSTATE FUNCTION **************************************************** */
function CheckWinState()//add in whos turn it is
{
    /* 
        winning 
        combinations = 
        [0,2,4],
        [6,8,10],
        [12,14,16],
        [0,6,12],
        [2,8,14],
        [4,10,16],
        [0,8,16],
        [4,8,12] 
    */
    var curr1,curr2,curr3,curr4,curr5,curr6,curr7,curr8,curr9;
  // misty.Debug("WEARE INSIDE THE CHECKSTATE FUNCTION");
    var ActualBoardState = misty.Get("StateOfGame");
    curr1 = ActualBoardState[0]; //0 index = tile 1
    curr2 = ActualBoardState[2]; //1 index = tile 2
    curr3 = ActualBoardState[4];//2 index = tile 3
    curr4 = ActualBoardState[6];//3 index = tile 4
    curr5 = ActualBoardState[8];//4 index = tile 5
    curr6 = ActualBoardState[10];//5 index = tile 6
    curr7 = ActualBoardState[12];//6 index = tile 7
    curr8 = ActualBoardState[14];//7 index = tile 8
    curr9 = ActualBoardState[16];//8 index = tile 9

    //if the tiles within the potential winning combo aren't blank(_)
    if(curr1 != "_" && curr2 != "_" && curr3 != "_") // winning combo = [0,2,4]
    {
        misty.Debug("we are here o,2,4");
        if(curr1 == "O" && curr2 == "O" && curr3 == "O")
        {
            misty.Set("p2win", true, false);
        }
        else if(curr1 == "X" && curr2 == "X" && curr3 == "X")
        {
            misty.Set("p1win", true, false);
        }
    }
    if(curr4 != "_" && curr5 != "_" && curr6 != "_" ) //if the winning combo = [6,8,10]
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
    if(curr7 != "_" && curr8 != "_" && curr9 != "_") //if the winning combo = [12,14,16]
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
    if(curr1 != "_" && curr4 != "_" && curr7 != "_" ) //if the winning combo = [0,6,12]
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
    if(curr2 != "_" && curr5 != "_" && curr8 != "_") //if the winning combo = [2,8,14]
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
    if(curr3 != "_" && curr6 != "_" && curr9 != "_") //if the winning combo = [4,10,16]
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
    if(curr1 != "_" && curr5 != "_" && curr9 != "_") //if the winning combo = [0,8,16]
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
    if(curr3 != "_" && curr5 != "_" && curr7 != "_") //if the winning combo = [4,8,12]
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
    misty.Debug("we are about to see if the game is a draw!!!"); //the debugs in this function simply help you with its traversal
    if((ActualBoardState[0] == "X" || ActualBoardState[0] == "O") && (ActualBoardState[2] == "X" || ActualBoardState[2] == "O") && 
    (ActualBoardState[4] == "X" || ActualBoardState[4] == "O") && (ActualBoardState[6] == "X" || ActualBoardState[6] == "O") &&
    (ActualBoardState[8] == "X" || ActualBoardState[8] == "O") && (ActualBoardState[10] == "X" || ActualBoardState[10] == "O") &&
    (ActualBoardState[12] == "X" || ActualBoardState[12] == "O") && (ActualBoardState[14] == "X" || ActualBoardState[14] == "O") &&
    (ActualBoardState[16] == "X" || ActualBoardState[16] == "O") && misty.Get("p2win") == false && misty.Get("p1win") == false)
    {
        misty.Set("DrawGame", true,false); //set global draw variable boolean to true if game comes out as a draw
    }
} 