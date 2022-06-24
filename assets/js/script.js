let answers = [];
let questions = [];
let quiz;
let index = 0;
let correctAnswer;
let selectedChoice;
let amount = 20;
let currentQuestion;
let category = 8;
let difficulty = "easy";
let questionNumber = 1;
let maxQuestions = 10;
let soundcorrect = new Audio("/audio/correct.mp3");
let soundwrong = new Audio("/audio/wrong.mp3");
let lastQuestion = questions.length - 1;
let username;
localStorage.setItem("username", username);
let finalScore;
let timer;
let timeLeft = 60;



function myFunction() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

// Fetch 10 questions from API from general knowledge category
async function getQuestions() {

    //pass variable to question variable line2
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=11&difficulty=${difficulty}&type=multiple`);
    questions = await response.json();
}

function getNextQuestion() {

    if (questionNumber == [questions.results.length]) {
        if (confirm("Game Over!")) {
            showFinalScore();
        } else {
            return;
            //hideButton()
        }
    }

    document.getElementById("progress").innerText = `Question ${questionNumber}/${maxQuestions}`;
    ++questionNumber;
    //getCurrent question
    currentQuestion = questions.results[index];
    console.log("current question", currentQuestion);
    //put correct answers in list with incorrect answers
    correctAnswer = questions.results[index].correct_answer;
    console.log("this is currentQuestion.correct_answer", currentQuestion.correct_answer);
    let choices = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer);    
    choices.sort();
    console.log(correctAnswer);
    console.log("These are choices", choices);

    document.getElementById("category").innerHTML = ' Category:' + currentQuestion.category;
    document.getElementById("difficulty").innerHTML = ' Difficulty: ' + currentQuestion.difficulty;
    document.getElementById("question").innerHTML = ' Question:' + currentQuestion.question;
    document.getElementById("answer1").innerHTML = choices[0];
    document.getElementById("answer2").innerHTML = choices[1];
    document.getElementById("answer3").innerHTML = choices[2];
    document.getElementById("answer4").innerHTML = choices[3];

   

    //Functions dealing with the timer for the Quiz    
    timer = setInterval(updateTimer, 1000);
    updateTimer();

    function updateTimer() {
        timeLeft = timeLeft - 1;
        if (timeLeft >= 0)
            document.getElementById("time-keeper").innerHTML = timeLeft;
       
    }
}


function startGame() {
    //Use Start button to show the gaming area
    let startButton = document.getElementById("start-btn");
    startButton.classList.add("hide"); 
    document.getElementById("scoreText").innerText = "";   
    startButton.addEventListener("click", startGame => {
        const targetDiv = document.getElementById("hidden");
        targetDiv.style.display = "block";
    });
}


function choiceListeners() {
    //get all choice buttons
    const choices = document.querySelectorAll('.choice-container');
    //iterate over the choices
    choices.forEach(choice => {
        //for each choice add a click event listener, pass the event to the callback function
        choice.addEventListener("click", event => {
            //event target is the one that is clicked 
            var value = event.target.innerText;
            console.log(value);
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
    var button1 = document.getElementById("answer1");
    button1.addEventListener("click", event => {
        //console.log("This is the correctAnswer:", correctAnswer)
        //console.log("This is the selectedChoice:", selectedChoice)
        //console.log("This is the value:", event.target.innerText)
        //console.log(button1.innerHTML)

        if (button1.innerHTML === correctAnswer) {
            button1.style.background = "green";
            alert("you are correct");
            showCorrectAnswer();
            incrementScore();

        } else {
            button1.style.background = "red";
            alert("you are incorrect");
            showCorrectAnswer();
            incrementWrongAnswer();
        }
    });

    var button2 = document.getElementById("answer2");
    button2.addEventListener("click", event => {

        if (button2.innerHTML === correctAnswer) {
            button2.style.background = "green";
            alert("you are correct");
            showCorrectAnswer();
            incrementScore();
        } else {
            button2.style.background = "red";
            alert("you are incorrect");
            showCorrectAnswer();
            incrementWrongAnswer();
        }
    });

    var button3 = document.getElementById("answer3");
    button3.addEventListener("click", event => {

        if (button3.innerHTML === correctAnswer) {
            button3.style.background = "green";
            alert("you are correct");
            showCorrectAnswer();
            incrementScore();
        } else {
            button3.style.background = "red";
            alert("you are incorrect");
            showCorrectAnswer();
            incrementWrongAnswer();
        }
    });

    var button4 = document.getElementById("answer4");
    button4.addEventListener("click", event => {

        if (button4.innerHTML === correctAnswer) {
            button4.style.background = "green";
            alert("you are correct");
            showCorrectAnswer();
            incrementScore();
        } else {
            button4.style.background = "red";
            alert("you are incorrect");
            showCorrectAnswer();
            incrementWrongAnswer();
        }
    });

}

//The answer choices and correct answer are removed in order to display new choices
function reset() {
    document.getElementById("verify-answer").innerHTML = "";
      
    var elements = document.getElementsByClassName('option'); // get all elements
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "grey";
    }
}

/* Function to Play sound ons answer choice*/
var options = document.addEventListener("options", function (event) {
    playMusic(event);

});

//audio for alerting users if they got correct or wrong answer, not functional yet
/*function playMusic() {
//var options= document.getElementsByClassName("options");
  /*  options.addEventListener("click", event => {
    if (button1.innerHTML === correctAnswer || button2.innerHTML === correctAnswer || button3.innerHTML === correctAnswer || button4.innerHTML === correctAnswer) {
        soundcorrect.play();
        alert("pos sound called");
    } else {            
            soundwrong.play();
            alert("neg sound called");
           }
    })    
}

playMusic()*/

//show the correct answer to the user, before moving to next question
function showCorrectAnswer() {
    document.getElementById("verify-answer").innerHTML = correctAnswer;
    console.log(correctAnswer);
}

//The user can click on next to see the next question       
let nextButton = document.getElementById("next-btn");
nextButton.addEventListener("click", getNextQuestion => {
    console.log("new question shown");
    reset();
});

//Scoring for the Game, increment score when there is a correct answer from the question asked
function incrementScore() {
    let oldScoreR = parseInt(document.getElementById("correct").innerText);
    document.getElementById("correct").innerText = ++oldScoreR;
    finalScore = parseInt(document.getElementById("correct").innerText);
    index++;
}

//Scoring for the Game, increments wrongscore when there is an incorrect answer from the question asked
function incrementWrongAnswer() {
    let oldScoreW = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScoreW;
    index++;
}

//hide next button when there are no questions left in the game
function hideButton() {
    var x = document.getElementById("nextButton");
    if (questionNumber == 10) {
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "block";
    }
}


//user can select the difficulty level for the game
difficulty = () => {
    if (easy.checked) {
        difficulty = 'easy';
    } else if (medium.checked) {
        difficulty = 'medium';
    } else if (hard.checked) {
        difficulty = 'hard';
    }
};

function closepopup() {
    document.getElementById("alertbox").style.display = "none";
  }
  
  
  function openpopup() {  
    document.getElementById("alertbox").style.display = "inline-block";
  }

//When the quiz is over the score is shown to the user  
//final scores to be displayed to user on ending the game 
function showFinalScore() {
   // if (questionNumber == [questions.results.length]) {             
       // openpopup();
        //final scores to be displayed to user
        document.getElementById("scoreText").innerText = "You have scored, " + `${finalScore}` + "!";
        let closingMessage = document.getElementById("closing-message");
        if (finalScore == 0) {
            closingMessage.innerHTML = "ahem....well, a little practise and you'll soon get there";
        } else if (finalScore < 3) {
            closingMessage.innerHTML = "Maybe quizzing is not your forte, have you tried Sudoku";
        } else if (finalScore < 6) {
            closingMessage.innerHTML = "Better luck next time, I'm sure you will get there";
        } else if (finalScore < 9) {
            closingMessage.innerHTML = "So close, but no cigar, next time you will be the winner";
        } else if (finalScore == 10) {
            closingMessage.innerHTML = "You have achieved greatness";
        }
    }

// Save data to sessionStorage
sessionStorage.setItem('score', 'finalScore');
let data = sessionStorage.getItem('score');


showFinalScore();


//First set the date
/*function getUserName() {
    var now = new Date();
    now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
      
    if ((!username) || (username == 'null'));
    document.getElementById("submitname").onClick = function () {
        username = document.getElementById("username").value;
        setcookie("username", username, now);
        if (username) {
            document.write(username);             
        }
        console.log("Hello", username);
        document.getElementById("welcomeText").innerText = "Welcome, " + `${username}` + "!";
    }

}*/

//Get username of the user and send to welcome message on game page

/*function getUserName() {  
let submitbutton.getElementById("submitname").click = event =>{
    username = document.getElementById("username").value;
    console.log("Hello", username);
    document.getElementById("welcomeText").innerHTML = "Welcome, " + `${username}` + "!";

}
}*/

function replay(){
    location.reload();
}