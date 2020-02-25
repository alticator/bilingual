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
var wordId = random(0, database.pronouns.english.length);
var word = new textObj(database.pronouns.english[wordId], 50, -10, "24px Arial", "white", "center");
document.addEventListener("keydown", keyPress);
var score = 0;
var scoreBoard = new textObj("Score: " + score, 10, 10, "24px Arial", "white", "left");
word.Yv = 0.25;

function keyPress(event) {
    if (event.key == "Enter") {
        checkAnswer();
    }
}

function checkAnswer() {
    if (gameType == "pronouns") {
        if (questionType == 1) {
            if (getInput() == database.pronouns.french[wordId]) {
                score++;
                updateWord();
                word.y = 0;
                document.getElementById("input").value = "";
            }
        }
        if (questionType == 2) {
            if (getInput() == database.pronouns.englishSecondary[wordId] || getInput() == database.pronouns.english[wordId]) {
                score++;
                updateWord();
                word.y = 0;
                document.getElementById("input").value = "";
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
}

function game() {
    scoreBoard.string = "Score: " + score;
    if (word.y > 100) {
        updateWord();
        word.y = 0;
    }
    updateAll();
}