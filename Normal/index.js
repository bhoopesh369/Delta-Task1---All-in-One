
var started = true;
var level = 0;

var gamePattern = [];
var playerPattern = [];

function playSound(){
    var aud = new Audio("Sounds/scifi.mp3");
    aud.play();
}

function gameOverSound(){
    var aud = new Audio("Sounds/wrong.mp3");
    aud.play();
}

function playSound2(){
    var aud = new Audio("Sounds/scifi2.mp3");
    aud.play();
}

function tileEffects(tile){
    var activeTile = document.getElementById(tile);
    activeTile.classList.add("pressed");
    setTimeout(function(){
        activeTile.classList.remove('pressed');
    },200);
}
function nextTile(){
    var rand = Math.floor(Math.random() *16) + 1;
    gamePattern.push(''+rand);
    tileEffects(rand);
    playSound2();
}

var intId;
function previousTileEffects(){
    var t=0;
    //document.getElementById("timer").innerHTML= '00:00';
    //level++;
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

document.addEventListener('keypress',function(){
    if(started == true){
       started = false;
       nextTile();
    }
    

    function handleClick(){
       var userChosenTile = this.id;
       playerPattern.push(userChosenTile);
       //tileEffects(userChosenTile);
       var temp=[];
       for(let z=0 ; z<gamePattern.length;z++){
           temp.push(gamePattern[z]);
       }
       console.log(temp);
       console.log(playerPattern);
       console.log(gamePattern);
       
       var gameProgress = 0;

       for(i=0;i<playerPattern.length;i++){

        if(temp.includes(playerPattern[i])){   
            playSound();
            //temp.pop(playerPattern[i]);
            const index = temp.indexOf(playerPattern[i]);
            if (index > -1) {
                temp.splice(index, 1); 
            }
            console.log(temp);
            gameProgress+=1 ;
        }
        else {
            gameOverSound();
            document.querySelector("body").classList.add("game-over");
            var z = 1;
            if(level==0){
                z = 0;
            }
            document.querySelector("h2").innerHTML = "your score is : " + 10* Math.pow(2,level) * z;
            setTimeout(GameOver,250);
          }
      
       }


       function GameOver(){ 
        alert("Game Over");
        location.reload(true); 
      }


       var Temp2 = [], Temp3 = [];
       
       for(var g of gamePattern){
           Temp2.push(g);
       }
       for(var p of gamePattern){
           Temp3.push(p);
       }


       Temp2.sort();
       Temp3.sort();
    
       if(JSON.stringify(Temp3) === JSON.stringify(Temp2) && gameProgress == Temp2.length){
           level++;
           var levelhtml = "Level " + level;
           document.querySelector("h2").innerHTML = levelhtml;
           previousTileEffects();
           setTimeout(nextTile, (gamePattern.length + 1)*1000);
           playerPattern=[];
       }

    }

    for(var n=0;n<16;n++){
        document.querySelectorAll(".btn")[n].addEventListener("click",handleClick);  
       }

});

