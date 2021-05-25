/*$(".btn").click(function(){
    $(this).addClass("highlight");
});

//if the same code had to be written in js then
for(var i=0; i<4; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click",function(){
        this.classList.add("highlight");
    });
}*/

//user clicked pattern array
var userClickedPattern = [];

//an empty array where pattern will be saved
var gamePattern = [];

//an array of the button colors
var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;

//gives us the next button in the pattern and pushes it in the array of pattern
function nextSequence(){
    //we need to first convert user Clicked Pattern to an empty array.
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber  = Math.floor(4*Math.random());
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //flash animation in jquery
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //audio to be played with the animation
    playsound(randomChosenColor);
}

//if a user clicks a butto  it is identifies and is pushed to the userChosen colour array.
$(".btn").click(function(e){
    var userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

//function for playing sound based on the button clicked
function playsound(id){
    var audio = new Audio("sounds/" + id + ".mp3");
    audio.play();
}

//for adding animation to user click and next sequence
function animatePress(currentColour){
    var activeButton = $("#" + currentColour);
    activeButton.addClass("pressed");
    setTimeout(function(){
        activeButton.removeClass("pressed");
    },100);
}

//if key is pressed next sequence is called
$(document).keydown(function(){
    if(level==0)
        nextSequence();
});

function checkAnswer(currentLevel){
    //check if it it same as the system defined pattern
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel] ){
        // console.log("Success");
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        // console.log("wrong");
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text( "Game Over, Press Any Key to Restart" );
        restartGame();
    }
}

function restartGame(){
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
}