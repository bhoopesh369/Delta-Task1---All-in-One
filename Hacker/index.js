

var level = 1;
var score = 0;
var Max = 0;

var MaxScore;
MaxScore = window.localStorage.getItem("MaxScore");
document.querySelector(".MaxScore").innerHTML = "Max Score: " + MaxScore;


var gamePattern = [];
var playerPattern = [];
var inGame = false;

var mins = 0 ;
var secs ; 

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
    },300);
}

function previousTileEffects(){
    var t=0;
    document.getElementById("timer").innerHTML= '00:00';
    level++;
    document.querySelector("h2").innerHTML = "Level " + level;
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
    //clearPreviosTileEffects();
    clearTimer();
    MaxScore = window.localStorage.getItem("MaxScore");
    document.querySelector(".MaxScore").innerHTML = "Max Score: " + MaxScore;

    playerPattern=[];
    var rand = Math.floor(Math.random() *36) + 1;
    gamePattern.push(''+rand);
    playSound2();
    tileEffects(rand);
    
    secs = 5*(gamePattern.length - 1) + 10;
    timeer();
}

function GameisOver(){
    //clearPreviosTileEffects();
    document.querySelector("body").classList.add("game-over");
      document.querySelector("h2").innerHTML = "Press Any Key to Restart" ;
      clearTimer();
      gameOverSound();
      setTimeout(function () {
        alert("Game Over");
      }, 230);

}

function restart(){
    Max = window.localStorage.getItem("MaxScore");
    if(score>Max){
        window.localStorage.setItem("MaxScore" , score);
    }
    document.querySelector(".MaxScore").innerHTML = "Max Score: " + Max;
    playerPattern=[];
    gamePattern=[];
    level=1;
    inGame = false;
}

document.addEventListener('keypress',function(){
    if (!inGame) {
        playerPattern=[];
        gamePattern=[];
        document.querySelector("body").classList.remove("game-over");
        var levelhtml = "Level " + level;
        score = 0;
        document.getElementById("timer").innerHTML= '00:00';
        document.querySelector("h3").innerHTML = "Score : " + score ;
        document.querySelector("h2").innerHTML = levelhtml;
        nextTile();
        inGame = true;
        
    }
  });

 function handleClick(itr) {

    if (gamePattern[itr] === playerPattern[itr]) {
      playSound();
      //scoring based on the amount of time left.  
      score = score + secs +1;  
      document.querySelector("h3").innerHTML = "Score : " + score ;
      if (playerPattern.length === gamePattern.length){  
        clearTimer();
        previousTileEffects();
        setTimeout(function () {
            nextTile();
        }, (gamePattern.length + 1)*1000);
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
    var userChosenTile = this.id;
    playerPattern.push(userChosenTile);

    //tileEffects(userChosenTile);
    handleClick(playerPattern.length-1);
 }


