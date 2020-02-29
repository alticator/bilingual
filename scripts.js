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
var timer = new rect(10, 40, 20, 20, blueGradient);
var timerText = new textObj("Timer", 15, 60, "20vh Arial", "#00D0FF", "left");
var wordId = random(0, database.pronouns.english.length);
var wordContainer = new rect(40, -10, 20, 5, "#00D0FF");
var word = new textObj("Error", 50, -10, "3vh Arial", "white", "center");
updateWord();
document.addEventListener("keydown", keyPress);
var score = 0;
speed = 0.1;
word.Yv = speed;
timePaused = false;

function add(character) {
    document.getElementById("input").value += character;
}

function keyPress(event) {
    if (event.key == "Enter") {
        checkAnswer();
    }
}

function correct() {
    score++;
    document.getElementById("input").value = "";
    timePaused = true;
    word.Yv = 0;
    word.Xv = 5;
    wordContainer.Xv = 5;
    setTimeout(correctTwo, 1000);
}

function correctTwo() {
    word.Yv = speed;
    word.Xv = 0;
    wordContainer.Xv = 0;
    word.x = 50;
    word.y = 0;
    wordContainer.x = 40;
    timer.width -= 5;
    updateWord();
    timePaused = false;
}

function incorrect() {
    score++;
    document.getElementById("input").value = "";
    timePaused = true;
    word.string = "Incorrect";
    word.color = "red";
    word.Yv = 0;
    setTimeout(incorrectTwo, 1000);
}

function incorrectTwo() {
    word.Xv = -5;
    wordContainer.Xv = -5;
    setTimeout(incorrectThree, 1000);
}

function incorrectThree() {
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
    if (gameType == "pronouns") {
        if (questionType == 1) {
            if (getInput() == database.pronouns.french[wordId]) {
                correct();
            }
            else {
                incorrect();
            }
        }
        if (questionType == 2) {
            if (getInput() == database.pronouns.englishSecondary[wordId] || getInput() == database.pronouns.english[wordId]) {
                correct();
            }
            else {
                incorrect();
            }
        }
    }
    else if (gameType == "living") {
        if (questionType == 1) {
            if (getInput() == database.living.french[wordId]) {
                correct();
            }
            else {
                incorrect();
            }
        }
        if (questionType == 2) {
            if (getInput() == database.living.englishSecondary[wordId] || getInput() == database.living.english[wordId]) {
                correct();
            }
            else {
                incorrect();
            }
        }
    }
    else if (gameType == "verbs") {
        if (questionType == 1) {
            if (getInput() == database.verbs.french[wordId]) {
                correct();
            }
            else {
                incorrect();
            }
        }
        if (questionType == 2) {
            if (getInput() == database.verbs.englishSecondary[wordId] || getInput() == database.verbs.english[wordId]) {
                correct();
            }
            else {
                incorrect();
            }
        }
    }
    else if (gameType == "family") {
        if (questionType == 1) {
            if (getInput() == database.family.french[wordId]) {
                correct();
            }
            else {
                incorrect();
            }
        }
        if (questionType == 2) {
            if (getInput() == database.family.englishSecondary[wordId] || getInput() == database.family.english[wordId]) {
                correct();
            }
            else {
                incorrect();
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
    else if (gameType == "verbs") {
        if (questionType == 1) {
            wordId = random(0, database.verbs.english.length);
            word.string = database.verbs.english[wordId];
        }
        else if (questionType == 2) {
            wordId = random(0, database.verbs.french.length);
            word.string = database.verbs.french[wordId];
        }
    }
    else if (gameType == "family") {
        if (questionType == 1) {
            wordId = random(0, database.family.english.length);
            word.string = database.family.english[wordId];
        }
        else if (questionType == 2) {
            wordId = random(0, database.family.french.length);
            word.string = database.family.french[wordId];
        }
    }
}

function gameOver() {
    clearInterval(gameLoop);
    clearObjects();
    new textObj("Game Over", 50, 50, "36px Arial", "#00D0FF", "center");
    var panel = document.getElementById("container");
    panel.parentNode.removeChild(panel);
}

function game() {
    document.getElementById("scoreBoard").innerHTML = score;
    wordContainer.x = word.x - 10;
    wordContainer.y = word.y - 3.5;
    document.getElementById("input").focus();
    if (word.y > 100) {
        document.getElementById("input").value = "";
        updateWord();
        word.y = 0;
    }
    if (objectCollision(timer, goal)) {
        gameOver();
    }
    if (timePaused == false) {
        timer.width += 0.02;
    }
    updateAll();
}