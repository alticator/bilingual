function getData(id) {
    return document.getElementById(id).innerHTML;
}

function getInput() {
    return document.getElementById("input").value.toLowerCase();
}

var blueGradient = ctx.createLinearGradient(0, 0, window.innerWidth, 0);
blueGradient.addColorStop(0, "blue");
blueGradient.addColorStop(1, "aqua");

var gameType = getData("game-type");
var gameLoop = setInterval(game, 20);
var questionType = 1;
var goal = new rect(90, 40, 10, 20, "red");
var timer = new rect(10, 40, 0, 20, blueGradient);
var timerText = new textObj("Timer", 15, 60, "20vh Arial", "#00D0FF", "left");
var wordId = random(0, database.pronouns.english.length);
var wordContainer = new rect(40, -10, 20, 5, "#00D0FF");
var word = new textObj("Database Error", 50, -10, "3vh Arial", "white", "center");
updateWord();
document.addEventListener("keydown", keyPress);
var score = 0;
speed = 0.075;
word.Yv = speed;
var timePaused = false;
var livesLeft = 5;
var animationFontSize = 3;
var fontSizePlus = 0;
var livesLeftBoard = new rect(-100, 10, 60, 60, "#00D0FF");
var incorrectLabel = new textObj("Lives Left:", -100, 20, "3vh Arial", "white", "center");
var correctAnswerLabel = new textObj("Database Error", -100, 15, "3vh Arial", "white", "center");
var incorrectDigitOne = new textObj("5", -100, 50, "20vh Arial", "white", "center");
var incorrectDigitTwo = new textObj("5", -100, 50, "20vh Arial", "white", "center");
var wordNumber = 0;
var stage = 0;
var stageTextContainer = new rect(-100, 10, 60, 60, "#00D0FF");
var stageText = new textObj("Error", -100, 40, "5vh Arial", "white", "center");
var containerTitle = new textObj("Message", -100, 15, "3vh Arial", "white", "center")
nextStage();

function add(character) {
    document.getElementById("input").value += character;
}

function keyPress(event) {
    if (event.key == "Enter") {
        checkAnswer();
    }
}

function nextStage() {
    timePaused = true;
    word.Yv = 0;
    wordNumber = 0;
    stage++;
    stageTextContainer.x = 20;
    containerTitle.x = 50;
    stageText.string = "Stage " + stage;
    stageText.x = 50;
    speed += 0.025;
    setTimeout(function() {
        stageTextContainer.x = -100;
        containerTitle.x = -100;
        stageText.x = -100;
        updateWord();
        timePaused = false;
        word.Yv = speed;
    }, 1000);
}

function correct() {
    score++;
    document.getElementById("input").value = "";
    timePaused = true;
    word.Yv = 0;
    fontSizePlus = 0.5;
    setTimeout(correctTwo, 100);
}

function correctTwo() {
    fontSizePlus = -0.5;
    setTimeout(correctThree, 100);
}

function correctThree() {
    word.Yv = speed;
    word.Xv = 0;
    wordContainer.Xv = 0;
    word.x = 50;
    word.y = 0;
    wordContainer.x = 40;
    fontSizePlus = 0;
    animationFontSize = 3;
    timer.width -= 5;
    if (wordNumber < 6) {
        updateWord();
    }
    else {
        nextStage();
    }
    timePaused = false;
}

function incorrect() {
    livesLeft--;
    document.getElementById("input").value = "";
    timePaused = true;
    livesLeftBoard.x = 20;
    incorrectLabel.x = 50;
    if (questionType == 1) {
        correctAnswerLabel.string = "Correct Answer: " + eval("database." + gameType + ".french[wordId]");
    }
    else if (questionType == 2) {
        correctAnswerLabel.string = "Correct Answer: " + eval("database." + gameType + ".english[wordId]");
    }
    correctAnswerLabel.x = 50;
    incorrectDigitOne.string = livesLeft + 1;
    incorrectDigitOne.x = 50;
    word.Yv = 0;
    setTimeout(incorrectTwo, 500);
}

function incorrectTwo() {
    incorrectDigitOne.Yv = 8;
    setTimeout(incorrectThree, 800);
}

function incorrectThree() {
    incorrectDigitOne.Yv = 0;
    incorrectDigitOne.x = -100;
    incorrectDigitOne.y = 50;
    incorrectDigitTwo.string = livesLeft;
    incorrectDigitTwo.x = 50;
    setTimeout(incorrectFour, 500);
}

function incorrectFour() {
    livesLeftBoard.x = -100;
    incorrectLabel.x = -100;
    correctAnswerLabel.x = -100;
    incorrectDigitTwo.x = -100;
    word.color = "white";
    word.Yv = speed;
    word.Xv = 0;
    wordContainer.Xv = 0;
    word.x = 50;
    word.y = 0;
    wordContainer.x = 40;
    updateWord();
    timePaused = false;
}

function checkAnswer() {
    if (questionType == 1) {
        if (getInput() == eval("database." + gameType + ".french[wordId].toLowerCase()")) {
            correct();
        }
        else {
            incorrect();
        }
    }
    if (questionType == 2) {
        if (getInput() == eval("database." + gameType + ".englishSecondary[wordId].toLowerCase()") || getInput() == eval("database." + gameType + ".english[wordId].toLowerCase()")) {
            correct();
        }
        else {
            incorrect();
        }
    }
}

function updateWord() {
    questionType = random(1, 3)
    if (questionType == 1) {
        wordId = random(0, eval("database." + gameType + ".english.length"));
        word.string = eval("database." + gameType + ".english[wordId]");
    }
    else if (questionType == 2) {
        wordId = random(0, eval("database." + gameType + ".french.length"));
        word.string = eval("database." + gameType + ".french[wordId]");
    }
    wordNumber++;
}

function gameOver() {
    clearInterval(gameLoop);
    clearObjects();
    new rect(20, 20, 60, 60, "rgba(255, 255, 255, 0.6)");
    new textObj("Message", 50, 25, "3vh Arial", "white", "center");
    new textObj("Game Over", 50, 50, "5vh Arial", "white", "center");
    var panel = document.getElementById("container");
    panel.parentNode.removeChild(panel);
}

function game() {
    document.getElementById("scoreBoard").innerHTML = score;
    document.getElementById("livesLeft").innerHTML = livesLeft;
    document.getElementById("stage").innerHTML = stage;
    wordContainer.x = word.x - 10;
    wordContainer.y = word.y - 3.5;
    document.getElementById("input").focus();
    if (word.y > 100) {
        document.getElementById("input").value = "";
        updateWord();
        word.y = 0;
        livesLeft--;
        incorrect();
    }
    if (objectCollision(timer, goal) || livesLeft < 1) {
        gameOver();
    }
    if (timePaused == false) {
        timer.width += 0.03;
    }
    animationFontSize += fontSizePlus;
    word.font = animationFontSize + "vh Arial";
    updateAll();
}