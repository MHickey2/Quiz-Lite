//modals to get user categories and difficulty levels
const modal = document.querySelector('#modal');
const openModal = document.querySelector('.open-button');
const closeModal = document.querySelector('.close-button');
const modal2 = document.querySelector('#modal2');
const openModal2 = document.querySelector('.open-button2');
const closeModal2 = document.querySelector('.close-button2');
const maxQuestions = 10;
let answers = [];
let questions = [];
let index = 0;
let correctAnswer;
let currentQuestion;
var category;
var difficulty;
let questionNumber = 1;
//let soundcorrect = new Audio("/audio/correct.mp3");
//let soundwrong = new Audio("/audio/wrong.mp3");
let finalScore;
let timer;
let timeLeft = 60;

/*function getUserName() {
    let username = prompt("Enter a username");
    if (username != '') {
        // Save data to sessionStorage
        sessionStorage.setItem('username', username);
        document.getElementById('welcomeText').innerHTML = 'Welcome ' + username + ' to Quiz-Lite';
    } else {
        alert('Username cannot be blank!');
    }
}*/
//Function to get user name and welcome them personally to the game
function getUserName() {
    let username = '';
    let alreadyShownPrompt = false;
    while (!username) {
        username = prompt('Enter your username:').trim().toLowerCase();
        if (alreadyShownPrompt){
            alert('username can not be blank!');
            
        }
        alreadyShownPrompt = true
    }
    sessionStorage.setItem('username', username);
    const welcomeText = document.getElementById('welcomeText');
    document.getElementById('welcomeText').innerHTML = 'Welcome ' + username + ' to Quiz-Lite';
}

getUserName();

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

const img =document.getElementById('daynight');
img.addEventListener('click', changeColourScheme)

//function to choose dark-mode
function changeColourScheme() {
    var element = document.body;
    element.classList.toggle('dark-mode');
}

changeColourScheme();

// Save data to sessionStorage
localStorage.setItem('element', 'dark-mode');
//let theme = localStorage.getItem('element');

const categoryButton =document.getElementById('category-btn');
categoryButton.addEventListener('click', getCategory);

//function to get category
function getCategory() {
    let categorylevel = document.forms[0];
    category='';
    let i;

    for (i = 0; i < categorylevel.length; i++) {
        if (categorylevel[i].checked) {
            category = categorylevel[i].value;
        }
    }
    // Save data to sessionStorage
    sessionStorage.setItem('category', category);
   // document.getElementById("resultsCategory").value = "You have chosen:" + category;
    document.getElementById("resultsCategory").value ='You have chosen:' + `${category}`;
      
}

getCategory();

const difficultyButton = document.getElementById('difficulty-btn');
difficultyButton.addEventListener('click', getDifficultyLevel);

//function to get difficulty level
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
    //document.getElementById('resultsDifficulty').value = 'You have chosen:' + difficulty;
    document.getElementById("resultsDifficulty").value ='You have chosen, ' + `${difficulty}`;
        
}

getDifficultyLevel();

// Fetch 10 questions from API from general knowledge category
async function getQuestions() {       
    console.log(category);
    console.log(difficulty);  

    //pass variable to question variable line2
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`);
  //const response = await fetch(`https://opentdb.com/api.php?amount=10&category=11&difficulty=hard&type=multiple`);
    questions = await response.json();
}

//Function to get next question, but also test to see if there is a next question 
//to get, if not the game is over
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

    //Functions dealing with the timer for the Quiz    
    timer = setInterval(updateTimer, 1000);
    updateTimer();

    function updateTimer() {
        timeLeft = timeLeft - 1;
        if (timeLeft >= 0)
            document.getElementById('time-keeper').innerHTML = timeLeft;
    }
}

//function to show the game interface
function startGame() {
    //Use Start button to show the gaming area
    let startButton = document.getElementById('start-btn');
    startButton.classList.add('hide');
    document.getElementById('scoreText').innerText = '';
    startButton.addEventListener('click', startGame => {
        const targetDiv = document.getElementById('hidden');
        targetDiv.style.display = 'block';
        const targetDiv2 = document.getElementById('hiddenStart');
        targetDiv2.style.display = 'none';
        const targetDiv3 = document.getElementById('hiddenResults');
        targetDiv3.style.display = 'none';
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
    await getQuestions();
    getNextQuestion(0);
    showFinalScore();
    startGame();
    choiceListeners();
}
init();
checkAnswers();

//check if answers are correct or not
function checkAnswers() {
    var button1 = document.getElementById('answer1');
    button1.addEventListener('click', event => {

        if (button1.innerHTML === correctAnswer) {
            button1.style.background = 'green';
            alert('you are correct');
            showCorrectAnswer();
            incrementScore();
        } else {
            button1.style.background = 'red';
            alert('you are incorrect');
            showCorrectAnswer();
            incrementWrongAnswer();
        }
    });

    var button2 = document.getElementById('answer2');
    button2.addEventListener('click', event => {

        if (button2.innerHTML === correctAnswer) {
            button2.style.background = 'green';
            alert('you are correct');
            showCorrectAnswer();
            incrementScore();
        } else {
            button2.style.background = 'red';
            alert('you are incorrect');
            showCorrectAnswer();
            incrementWrongAnswer();
        }
    });

    var button3 = document.getElementById('answer3');
    button3.addEventListener('click', event => {

        if (button3.innerHTML === correctAnswer) {
            button3.style.background = 'green';
            alert('you are correct');
            showCorrectAnswer();
            incrementScore();
        } else {
            button3.style.background = 'red';
            alert('you are incorrect');
            showCorrectAnswer();
            incrementWrongAnswer();
        }
    });

    var button4 = document.getElementById('answer4');
    button4.addEventListener('click', event => {

        if (button4.innerHTML === correctAnswer) {
            button4.style.background = 'green';
            alert('you are correct');
            showCorrectAnswer();
            incrementScore();
        } else {
            button4.style.background = 'red';
            alert('you are incorrect');
            showCorrectAnswer();
            incrementWrongAnswer();
        }
    });
}

//The answer choices and correct answer are removed in order to display new choices
function reset() {
    document.getElementById('verify-answer').innerHTML = '';
    var elements = document.getElementsByClassName('option'); // get all elements
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = 'grey';
    }
}

//show the correct answer to the user, before moving to next question
function showCorrectAnswer() {
    document.getElementById('verify-answer').innerHTML = correctAnswer;   
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

//hide next button when there are no questions left in the game
function hideButton() {
    document.getElementById('nextButton');
    if (questionNumber >= 10) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'block';
    }
}

const targetDiv3 = document.getElementById('hiddenResults');
        
        
//When the quiz is over the score is shown to the user  
//final scores to be displayed to user on ending the game 
function showFinalScore() {
    if (questionNumber > [questions.results.length]) {        
        //final scores to be displayed to user
        targetDiv3.style.display = 'block';
        document.getElementById('scoreText').innerText = 'You have scored, ' + `${finalScore}` + '!';
        let closingMessage = document.getElementById('closing-message');
        if (finalScore == 0) {
            closingMessage.innerHTML = "ahem....well, a little practise and you'll soon get there";
        } else if (finalScore < 3) {
            closingMessage.innerHTML = 'Maybe quizzing is not your forte, have you tried Sudoku';
        } else if (finalScore < 6) {
            closingMessage.innerHTML = "Better luck next time, I'm sure you will get there";
        } else if (finalScore < 9) {
            closingMessage.innerHTML = 'So close, but no cigar, next time you will be the winner';
        } else if (finalScore == 10) {
            closingMessage.innerHTML = 'You have achieved greatness';
        }
    }
}

// Save data to sessionStorage
sessionStorage.setItem('score', 'finalScore');
//let data = sessionStorage.getItem('score');

showFinalScore();

const restartButton = document.getElementById('restart-btn');
restartButton.addEventListener('click', replay);

//Reloads the page, so the game can start again
function replay() {
    location.reload();
    console.log("Reload called")
}



    

