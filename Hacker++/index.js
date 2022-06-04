
var level = 1;
var score = 0;
var Max = 0;
var BossCount = 0;

var MaxScore1 = 0;
MaxScore1 = window.localStorage.getItem("MaxScore1");
document.querySelector(".MaxScore").innerHTML = "Max Score: " + MaxScore1;


var gamePattern = [];
var playerPattern = [];
var inGame = false;

var mins = 0 ;
var secs; 

var myInterval;
var intId;

function timeer(val){
    function updateTime(){
        
        const min = Math.floor(secs/60);
        let sec = secs % 60;
        secs--;
        if(secs<0){
            timeleft.style.color = "yellow";
            timeleft.innerHTML = "00:00";
            GameisOver();  
            restart();
        } 
        if(sec>=10){
          timeleft.innerHTML =  '0'+min + ':' + sec;
        }
        else{
          timeleft.innerHTML =  '0'+min + ':0' + sec;
        }
    }

    timeleft = document.getElementById("timer");

    myInterval = setInterval(updateTime,1000);

}    

function clearTimer(){
    clearInterval(myInterval);
}
    
function playSound(){
    var aud = new Audio("sounds/scifi.mp3");
    aud.play();
}

function playSound2(){
    var aud = new Audio("sounds/juxb.mp3");
    aud.play();
}

function gameOverSound(){
    var aud = new Audio("sounds/wrong.mp3");
    aud.play();
}



function tileEffects(tile){
    var activeTile = document.getElementById(tile);
    activeTile.classList.add("pressed");
    setTimeout(function(){
        activeTile.classList.remove('pressed');
    },200);
}

function previousTileEffects(){
    var t=0;
    document.getElementById("timer").innerHTML= '00:00';
    level++;
    //document.querySelector("h2").innerHTML = "Level " + level;
    function effects(){
      var activeTile = document.getElementById(gamePattern[t]);
      playSound2();
      activeTile.classList.add("pressed");
      setTimeout(function(){
        activeTile.classList.remove('pressed');
      },250);
      t++;
      if(t>= gamePattern.length){

          clearPreviosTileEffects();
      }
    }
    intId = setInterval(effects,1000);  
    
}
function clearPreviosTileEffects(){
    clearInterval(intId);
}

function nextTile(){
    MaxScore1 = window.localStorage.getItem("MaxScore1");
    document.querySelector(".MaxScore").innerHTML = "Max Score: " + MaxScore1;
    playerPattern=[];
    
}

function GameisOver(){
    
    document.querySelector("body").classList.add("game-over");
      document.querySelector("h2").innerHTML = "Press Any Key to Restart" ;
      clearTimer();
      gameOverSound();
      setTimeout(function () {
        alert("Game Over");
      }, 230);
    BossCount = 0;
}

function restart(){
    Max = window.localStorage.getItem("MaxScore1");
    if(score>Max){
        window.localStorage.setItem("MaxScore1" , score);
    }
    document.querySelector(".MaxScore").innerHTML = "Max Score: " + Max;
    playerPattern=[];
    gamePattern=[];
    level=1;
    inGame = false;
    BossCount = 0;
}

document.addEventListener('keypress',function(){
    if (!inGame) {
        playerPattern=[];
        gamePattern=[];
        document.querySelector("body").classList.remove("game-over");
        //var levelhtml = "Level " + level;
        score = 0;
        document.getElementById("timer").innerHTML= '00:00';
        document.querySelector("h3").innerHTML = "Score : " + score ;
        document.querySelector("h2").innerHTML = "Boss Turn";
        nextTile();
        inGame = true;
        
    }
  });

 function handleClick(itr) {

    if (gamePattern[itr] === playerPattern[itr]) {
      playSound();
      score = score + secs +1;  
      document.querySelector("h3").innerHTML = "Score : " + score ;
      if (playerPattern.length === gamePattern.length){  
        clearTimer();
        BossCount++;
        
        document.querySelector("h2").innerHTML = "Boss Turn";
        nextTile();
        
      }
    } 
    else {
      GameisOver();  
      restart();
    }
}


for(var n=0;n<36;n++){
      document.querySelectorAll(".btn")[n].addEventListener("click", gameMain); 
    
}

function gameMain(){


    if(BossCount%2 == 0){
        clearTimer();
        var bossChosenTile = this.id;
        gamePattern.push(bossChosenTile);
        playSound2();
        document.querySelector("h2").innerHTML = "Player's Turn";
        tileEffects(bossChosenTile);
        secs = 5*(gamePattern.length - 1) + 10;
        timeer();
        BossCount++;

    }
    else{
        var userChosenTile = this.id;
        playerPattern.push(userChosenTile);

        tileEffects(userChosenTile);
        handleClick(playerPattern.length-1);
    }
    
 }


