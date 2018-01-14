//Initial object with words to learn
let wordsToLearn = {
    понедельник:'Monday',
    вторник:'Tuesday',
    среда:'Wednesday',
    четверг:'Thursday',
    пятница:'Friday',
    суббота:'Saturday',
    воскресень:'Sunday'
};

//array for shuffled keys, needs to be global
let shuffledWords;

//A function that shuffles keys of an object an results in a array
function shuffleWords(inputObject){
    shuffledWords = Object.keys(inputObject);
    shuffledWords.sort(function() { return 0.5 - Math.random() });
}

//variable to iterate among loops, needs to be global
let elem = 0;

//Variable to store the number of correct responses
let correctAnswersCount = 0;

//Initial definition
function init(){
    shuffleWords(wordsToLearn);
    inputLine.setAttribute("style","visibility: none");
    play(elem);
}

//Function that asks questions
function play(elem){
        question.innerHTML = "Как будет на английском слово \"" + shuffledWords[elem] + "\"?";
        respond.innerHTML = "Check";
        document.getElementById("answer").focus();
        respond.setAttribute("onclick", "checkValue(" + elem + ")");
}

//Function that check if the user entered the translation correctly
function checkValue(elem) {
    result.setAttribute("style", "visibility: none");
    if (document.getElementById('answer').value != "") {
        if (document.getElementById('answer').value.toLowerCase() === wordsToLearn[shuffledWords[elem]].toLowerCase()) {
            result.setAttribute("style", "font-weight: bold; color: green");
            result.innerHTML = "You are correct!";
            correctAnswersCount++;
        }
        else {
            result.setAttribute("style", "font-weight: bold; color: red");
            result.innerHTML = "You are wrong. Correct spelling is \"" + wordsToLearn[shuffledWords[elem]] + "\".";
        }
        respond.innerHTML = "Next";
        respond.setAttribute("onclick", "next(" + elem + ")");
    }
    else {
        result.innerHTML = "Please enter something.";
        play(elem);
    }
}

//The function that processes next element logic
function next(elem){
    if (elem++ < shuffledWords.length-1) {
        answer.value = "";
        result.setAttribute("style","visibility: hidden");
        play(elem);
    }
    else {
        question.innerHTML = "Игра закончена";
        inputLine.setAttribute("style","visibility: hidden");
        respond.setAttribute("style","visibility: hidden");
        result.innerHTML = "Твои результаты:<br>правильно " + correctAnswersCount +
            "<br>неправильно " + (shuffledWords.length - correctAnswersCount);
    }
}

//Code to check input value on enter, not just on button click
document.getElementById("answer")
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("respond").click();
        }
    });
