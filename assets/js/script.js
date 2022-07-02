const img = document.getElementById('daynight');
const welcomeText = document.getElementById('welcomeText');
const modal = document.querySelector('#modal');
const openModal = document.querySelector('.open-button');
const closeModal = document.querySelector('.close-button');
const modal2 = document.querySelector('#modal2');
const openModal2 = document.querySelector('.open-button2');
const closeModal2 = document.querySelector('.close-button2');
const categoryButton = document.getElementById('category-btn');
const difficultyButton = document.getElementById('difficulty-btn');
const restartButton = document.getElementById('restart-btn');
const maxQuestions = 10;

let answers = [];
let questions = [];
let index = 0;
let correctAnswer;
let currentQuestion;
let questionNumber = 1;
let finalScore;
let timer;
let timeLeft = 60;
var category;
var difficulty;

img.addEventListener('click', changeColourScheme);
categoryButton.addEventListener('click', getCategory);
difficultyButton.addEventListener('click', getDifficultyLevel);
restartButton.addEventListener('click', replay);

//Function to get user name and welcome them personally to the game
function getUserName() {
    let username = '';
    //let alreadyShownPrompt = false;
    if (!username) {
        username = prompt('Enter your username:').trim().toLowerCase();        
    }
    sessionStorage.setItem('username', username);
    document.getElementById('welcomeText').innerHTML = 'Welcome ' + username + ' to Quiz-Lite!';
}

getUserName();

//function to choose dark-mode
function changeColourScheme() {
    var element = document.body;
    element.classList.toggle('dark-mode');
    // Save data to sessionStorage
    localStorage.setItem('element', 'dark-mode');
}

changeColourScheme();

//Modal for categories
openModal.addEventListener('click', () => {
    modal.showModal();
});

closeModal.addEventListener('click', () => {
    modal.close();
});

//Modal2 for difficulty
openModal2.addEventListener('click', () => {
    modal2.showModal();
});

closeModal2.addEventListener('click', () => {
    modal2.close();
});


//function to get category for the fetch API request
function getCategory() {
    let categorylevel = document.forms[0];
    category = '';
    let i;

    for (i = 0; i < categorylevel.length; i++) {
        if (categorylevel[i].checked) {
            category = categorylevel[i].value;
        }
    }
    // Save data to sessionStorage
    sessionStorage.setItem('category', category);
    document.getElementById("resultsCategory").value = 'You have chosen:' + `${category}`;
}

getCategory();

//function to get difficulty level for the fetch API request
function getDifficultyLevel() {
    let difficultylevel = document.forms[1];
    difficulty = '';
    let x;

    for (x = 0; x < difficultylevel.length; x++) {
        if (difficultylevel[x].checked) {
            difficulty = difficultylevel[x].value;
        }
    }
    // Save data to sessionStorage
    sessionStorage.setItem('difficulty', difficulty);
    document.getElementById("resultsDifficulty").value = 'You have chosen, ' + `${difficulty}`;
}

getDifficultyLevel();

// Fetch 10 questions from API from general knowledge category which includes all catergories, 
//and difficulty levels, catch all (default setting).
async function getQuestions() {   

    //pass variable to question variable line2
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`);
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
        const targetDiv4 = document.getElementById('verify-answer');
        targetDiv4.style.display = 'block';
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
            var value = event.target.innerText;
        });
    });
}

async function init() {  
    //getCategory();
    //getDifficultyLevel();  
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

//The answer choices and correct answer are removed in order to display new choices
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

//The user can click on next to see the next question       
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
    if (questionNumber > [questions.results.length]) {
        //final scores to be displayed to user                  
        targetDiv3.style.display = 'block';
        targetDiv4.style.display = 'none';
        document.getElementById('scoreText').innerText = 'You have scored, ' + `${finalScore}` + '!';
        let closingMessage = document.getElementById('closing-message');
        if (finalScore < 1) {
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
//let data = sessionStorage.getItem('score');

showFinalScore();

//Reloads the page, so the game can start again
function replay() {
    location.reload();
}

replay();