/*jshint esversion: 8 (useful for testing purposes, needs version 8 for async functions)*/
const img = document.getElementById('daynight');
const restartButton = document.getElementById('restart-btn');
const inputButton = document.getElementById('input-btn');
const maxQuestions = 10;

let questions = [];
let index = 0;
let correctAnswer;
let currentQuestion;
let questionNumber = 1;
let finalScore;

//Event Listeners
img.addEventListener('click', changeColourScheme);
inputButton.addEventListener('click', getUserName);
restartButton.addEventListener('click', replay);

//function to choose dark-mode
function changeColourScheme() {
    var element = document.body;
    element.classList.toggle('dark-mode');
    // Save data to sessionStorage
    localStorage.setItem('element', 'dark-mode');
}

changeColourScheme();

//Function to get the username from the user for use in the welcome message and it will be
//stored in session
function getUserName() {
    let username = document.querySelector('#username').value.trim();       
    sessionStorage.setItem('username', username);
    //When name is submitted, clears the field, user can still change name till start button is pressed
    //Allows numbers too, because it's user's choice what they want to be called.
    document.getElementById('username').value = '';
    //Welcome message to the user, if username not given it still welcomes the user
    document.getElementById('welcomeText').innerHTML = 'Welcome ' + username + ' to Quiz-Lite!';   
}

getUserName();

// Fetch 10 questions from API from general knowledge category which includes all catergories, 
//and difficulty levels.
async function getQuestions() {

    //pass variable to question variable line2
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=&difficulty=&type=multiple`);
    questions = await response.json();
}
//Function to get next question, but also test to see if there is a next question 
//to get, if not the game is over, and the next button is hidden
function getNextQuestion() {
    const nextButton = document.getElementById('next-btn');
    nextButton.addEventListener('click', getNextQuestion);
    if (questionNumber > [questions.results.length]) {
        if (confirm('Game Over!')) {
            showFinalScore();
            hideButton();
        } else {
            return;
        }
    }
    //lets the user knows what question they are on and how many questions are being asked (max:10)
    document.getElementById('progress').innerText = `Question ${questionNumber}/${maxQuestions}`;
    ++questionNumber;

    //getCurrent question
    currentQuestion = questions.results[index];
    //put correct answers in list with incorrect answers
    correctAnswer = questions.results[index].correct_answer;
    let choices = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer);
    choices.sort();
    
    //populates with information from the API fetch
    document.getElementById('category').innerHTML = 'Category:' + currentQuestion.category;
    document.getElementById('difficulty').innerHTML = 'Difficulty:' + currentQuestion.difficulty;
    document.getElementById('question').innerHTML = 'Question:' + currentQuestion.question;
    document.getElementById('answer1').innerHTML = choices[0];
    document.getElementById('answer2').innerHTML = choices[1];
    document.getElementById('answer3').innerHTML = choices[2];
    document.getElementById('answer4').innerHTML = choices[3];
}

//function to show the full game interface and hides the previous options and introductory text
function startGame() {
    //Use Start button to show the gaming area
    let startButton = document.getElementById('start-btn');
    startButton.classList.add('hide');
    document.getElementById('scoreText').innerText = '';
    startButton.addEventListener('click', startGame => {
        //shows the game itself
        const targetDiv = document.getElementById('hidden');
        targetDiv.style.display = 'block';
        //hides earlier section but keeps the welcome text
        const targetDiv2 = document.getElementById('hiddenStart');
        targetDiv2.style.display = 'none';
        //hides the final result screen till the game is over
        const targetDiv3 = document.getElementById('hiddenResults');
        targetDiv3.style.display = 'none';
        //The verification display is shown throughout game
        const targetDiv4 = document.getElementById('verify-answer');
        targetDiv4.style.display = 'block';
        //The start button is not shown after it is used, but restart is available
        startButton.style.display = 'none';
    });
}

//add event listeners to the answer buttons
function choiceListeners() {
    //get all choice buttons
    const choices = document.querySelectorAll('.choice-container');
    //iterate over the choices
    choices.forEach(choice => {
        //for each choice add a click event listener, pass the event to the callback function
        choice.addEventListener('click', event => {
            //event target is the one that is clicked 
            //var value = event.target.innerText;
        });
    });
}

async function init() {
    await getQuestions();
    startGame();
    getNextQuestion(0);
    choiceListeners();
    showFinalScore();
}
init();
checkAnswers();

//check if answers are correct or not
function checkAnswers() {
    var button1 = document.getElementById('answer1');
    button1.addEventListener('click', event => {

        if (button1.innerHTML === correctAnswer) {
            button1.style.background = 'green';
            showCorrectAnswer();
            incrementScore();
        } else {
            button1.style.background = 'red';
            showCorrectAnswer();
            incrementWrongAnswer();
        }
    });

    var button2 = document.getElementById('answer2');
    button2.addEventListener('click', event => {

        if (button2.innerHTML === correctAnswer) {
            button2.style.background = 'green';
            showCorrectAnswer();
            incrementScore();
        } else {
            button2.style.background = 'red';
            showCorrectAnswer();
            incrementWrongAnswer();
        }
    });

    var button3 = document.getElementById('answer3');
    button3.addEventListener('click', event => {

        if (button3.innerHTML === correctAnswer) {
            button3.style.background = 'green';
            showCorrectAnswer();
            incrementScore();
        } else {
            button3.style.background = 'red';
            showCorrectAnswer();
            incrementWrongAnswer();
        }
    });

    var button4 = document.getElementById('answer4');
    button4.addEventListener('click', event => {

        if (button4.innerHTML === correctAnswer) {
            button4.style.background = 'green';
            showCorrectAnswer();
            incrementScore();
        } else {
            button4.style.background = 'red';
            showCorrectAnswer();
            incrementWrongAnswer();
        }
    });
}

//The answer choices and correct answer are removed in order to display new choices reset to 
//original colour
function reset() {
    document.getElementById('verification-answer').innerHTML = '';
    var elements = document.getElementsByClassName('option'); // get all elements
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = 'grey';
    }
}

//show the correct answer to the user, before moving to next question
function showCorrectAnswer() {
    document.getElementById('verification-answer').innerHTML = correctAnswer;
}
//The user can click on the next button to see the next question       
let nextButton = document.getElementById('next-btn');
nextButton.addEventListener('click', getNextQuestion => {
    reset();
});

//Scoring for the Game, increment score when there is a correct answer from 
//the question asked
function incrementScore() {
    let oldScoreR = parseInt(document.getElementById('correct').innerText);
    document.getElementById('correct').innerText = ++oldScoreR;
    finalScore = parseInt(document.getElementById('correct').innerText);
    index++;
}

//Scoring for the Game, increments wrongscore when there is an incorrect answer 
//from the question asked
function incrementWrongAnswer() {
    let oldScoreW = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').innerText = ++oldScoreW;
    index++;
}

//hides next button when there are no questions left in the game
function hideButton() {
    document.getElementById('nextButton');
    if (questionNumber >= 10) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }
}
const targetDiv3 = document.getElementById('hiddenResults');
const targetDiv4 = document.getElementById('verify-answer');

//When the quiz is over the score is shown to the user  
//final scores to be displayed to user on ending the game 
function showFinalScore() {
    //Issue question number is higher than question length on initial start up
    //question lenght is o and question number set at 1, but when game starts problem is gone
    if (questionNumber > [questions.results.length]) {
        //final scores and message is displayed to the user                  
        targetDiv3.style.display = 'block';
        //verification display is removed
        targetDiv4.style.display = 'none';
        document.getElementById('scoreText').innerText = 'You have scored, ' + `${finalScore}` + '!';
        let closingMessage = document.getElementById('closing-message');
        if (finalScore == 0) {
            closingMessage.innerHTML = "Maybe quizzing is not your forte, have you tried Sudoku?";
        } else if (finalScore < 3) {
            closingMessage.innerHTML = "ahem...well, just a little practise needed.";
        } else if (finalScore < 6) {
            closingMessage.innerHTML = "Better luck next time, I'm rooting for you!";
        } else if (finalScore < 9) {
            closingMessage.innerHTML = 'So close, but no cigar, you will be a winner!';
        } else if (finalScore == 10) {
            closingMessage.innerHTML = 'You have achieved greatness, well done!';
        }
    }
}

// Save data to sessionStorage
sessionStorage.setItem('score', 'finalScore');

showFinalScore();

//Reloads the page, so the game can start again
function replay() {
    location.reload();
}

replay();