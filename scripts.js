function getData(id) {
    return document.getElementById(id).innerHTML;
}

function getInput() {
    return document.getElementById("input").value;
}

var gameType = getData("game-type");
new rect(0, 0, 100, 100, "#00D0FF");
var gameLoop = setInterval(game, 20);
var questionType = 1;
var goal = new rect(90, 40, 10, 20, "red");
var timer = new rect(0, 40, 20, 20, "blue");
var timerText = new textObj("Timer", 5, 60, "20vh Arial", "white", "left");
var wordId = random(0, database.pronouns.english.length);
var wordContainer = new rect(40, -10, 20, 10, "#00D0FF");
var word = new textObj("Loading...", 50, -10, "24px Arial", "white", "center");
updateWord();
document.addEventListener("keydown", keyPress);
var score = 0;
var scoreBoard = new textObj("Score: " + score, 10, 20, "24px Arial", "white", "left");
word.Yv = 0.25;

function keyPress(event) {
    if (event.key == "Enter") {
        checkAnswer();
    }
}

function correct() {
    score++;
    timer.width -= 5;
    updateWord();
    word.y = 0;
    document.getElementById("input").value = "";
}

function checkAnswer() {
    if (gameType == "pronouns") {
        if (questionType == 1) {
            if (getInput() == database.pronouns.french[wordId]) {
                correct();
            }
        }
        if (questionType == 2) {
            if (getInput() == database.pronouns.englishSecondary[wordId] || getInput() == database.pronouns.english[wordId]) {
                correct();
            }
        }
    }
    else if (gameType == "living") {
        if (questionType == 1) {
            if (getInput() == database.living.french[wordId]) {
                correct();
            }
        }
        if (questionType == 2) {
            if (getInput() == database.living.englishSecondary[wordId] || getInput() == database.living.english[wordId]) {
                correct();
            }
        }
    }
}

function updateWord() {
    questionType = random(1, 3)
    if (gameType == "pronouns") {
        if (questionType == 1) {
            wordId = random(0, database.pronouns.english.length);
            word.string = database.pronouns.english[wordId];
        }
        else if (questionType == 2) {
            wordId = random(0, database.pronouns.french.length);
            word.string = database.pronouns.french[wordId];
        }
    }
    else if (gameType == "living") {
        if (questionType == 1) {
            wordId = random(0, database.living.english.length);
            word.string = database.living.english[wordId];
        }
        else if (questionType == 2) {
            wordId = random(0, database.living.french.length);
            word.string = database.living.french[wordId];
        }
    }
}

function gameOver() {
    clearInterval(gameLoop);
    clearObjects();
    new textObj("Game Over", 50, 50, "36px Arial", "#00D0FF", "center");
}

function game() {
    scoreBoard.string = "Score: " + score;
    wordContainer.x = word.x - 10;
    wordContainer.y = word.y - 5;
    if (word.y > 100) {
        updateWord();
        word.y = 0;
    }
    if (objectCollision(timer, goal)) {
        gameOver();
    }
    timer.width += 0.05;
    updateAll();
}