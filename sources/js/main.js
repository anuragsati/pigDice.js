var playerName = [document.getElementById('playerOneName'), document.getElementById('playerTwoName')];
var playerScore = [document.getElementById('playerOneScore'), document.getElementById('playerTwoScore')];
var playerCurScore = [document.getElementById('playerOneCurScore'), document.getElementById('playerTwoCurScore')];
var diceFaces = ['fas h1 fa-dice-one display-1','fas h1 display-1 fa-dice-two','fas h1 display-1 fa-dice-three','fas h1 display-1 fa-dice-four','fas display-1 h1 fa-dice-five','fas display-1 h1 fa-dice-six']
var chance = 0;
var gameStatus = true;

function rollDice(){            //get random values from dice
    var dicePlace = document.getElementById('dice');
    var randomValue = Math.floor(Math.random()*6)+1;
    createDice(randomValue);

    if(randomValue == '1'){
        reserCurScoreToNull();
        changePlayer();
    }
    else{
        appendCurScore(randomValue);
    }
}

function createDice(randomValue){
    var dicePos = document.getElementById('dice');
    dicePos.innerHTML = "";                 //removing all childs
    var diceDiv = document.createElement('i');
    diceDiv.setAttribute('class', diceFaces[randomValue-1]);

    dicePos.appendChild(diceDiv);
}

function appendCurScore(randomValue){           //append dice value(random) to currnet score
    getPlayer();
    var curScoreDiv = playerCurScore[chance];
    var curScore = curScoreDiv.innerHTML;
    var newCurScore = +curScore + +randomValue;     //parsing string to integers
    curScoreDiv.innerHTML = newCurScore;
}

function changePlayer(){        //change the player

    appendCurScoreToTotalScore();
    reserCurScoreToNull();
    removeRedDot();
    displayResult();
    chance++;
    insertRedDot();
}

function hold(){            //what to do when hold is pressed
    changePlayer();
}

function appendCurScoreToTotalScore(){      //appends cur score to total score
    getPlayer();
    playerScore[chance].innerHTML = +playerScore[chance].innerHTML + +playerCurScore[chance].innerHTML;
}

function reserCurScoreToNull(){     //resets current score to zero when player is changed
    getPlayer();
    playerCurScore[chance].innerHTML = '0';
}

function insertRedDot(){        //inserts red dot
    getPlayer();
    var redDot = document.createElement('i');
    redDot.setAttribute('class', 'ml-2 fa fa-circle text-danger p-0 m-0');
    redDot.setAttribute('id', 'dot')
    redDot.setAttribute('aira-hidden', 'true');
    playerName[chance].appendChild(redDot);

    if(gameStatus == false)
        removeRedDot();
}

function removeRedDot(){        //removes red dot
    getPlayer();
    playerName[chance].lastElementChild.remove();
}

function getPlayer(){
    if(chance & 1){     //odd = player 2
        chance = 1;
    }
    else{           //even = player 1
        chance = 0;
    }
}

function displayResult(){
    getPlayer();
    if(+playerScore[chance].innerHTML >= 100){
        playerName[chance].innerHTML = 'WINNER!!!';
        document.getElementById('rollButton').setAttribute('onclick', ' ');
        document.getElementById('holdButton').setAttribute('onclick', ' ');  
        gameStatus = false;
    }
}

function loadNewGame(){
    playerScore[0].innerHTML = '0';
    playerScore[1].innerHTML = '0';
    playerCurScore[0].innerHTML = '0';
    playerCurScore[1].innerHTML = '0';
    playerName[0].innerHTML = 'PLAYER 1';
    playerName[1].innerHTML = 'PLAYER 2';
    document.getElementById('dice').innerHTML = "";     //removing all childs
    document.getElementById('rollButton').setAttribute('onclick', 'rollDice()');
    document.getElementById('holdButton').setAttribute('onclick', 'hold()');  
    gameStatus = true;
    chance = 0;
    insertRedDot();
}   