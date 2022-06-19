var answers = [];
var questions = [];
var quiz;
var index = 0;
var correctAnswer;
var selectedChoice;
var amount = 10;
var currentQuestion;
var category = 8;
var difficultyLevel;
var questionNumber = 1;
var maxQuestions = 10;
var soundcorrect = new Audio("/assets/audio/correct.mp3");
var soundwrong = new Audio("/assets/audio/wrong.mp3");
var lastQuestion = questions.length -1;


    


 //Get username of the user and send to welcome message on game page
 /*document.getElementById("submitname").onClick = function () {
    userName = document.getElementById("username").value;
    console.log("Hello", userName);
    document.getElementById("welcomeText").innerText = "Welcome, " + `${userName}` + "!";*/
//}

// Fetch 10 questions from API from general knowledge category
async function getQuestions() {
        
    //pass variable to question variable line2
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`);
    questions = await response.json()
}

function getNextQuestion() {
    //getCurrent question
    currentQuestion = questions.results[index]
    console.log("current question", currentQuestion)
    //put correct answers in list with incorrect answers
    correctAnswer = questions.results[index].correct_answer;
    console.log("this is currentQuestion.correct_answer", currentQuestion.correct_answer);
    let choices = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer);
    // choices.sort(() => Math.random() - 5);
    choices.sort();
    console.log(correctAnswer)
    console.log("These are choices", choices)

    document.getElementById("category").innerHTML = ' Category:' + currentQuestion.category
    document.getElementById("difficulty").innerHTML = ' Difficulty: ' + currentQuestion.difficulty
    document.getElementById("question").innerHTML = ' Question:' + currentQuestion.question
    document.getElementById("answer1").innerHTML = choices[0]
    document.getElementById("answer2").innerHTML = choices[1]
    document.getElementById("answer3").innerHTML = choices[2]
    document.getElementById("answer4").innerHTML = choices[3]

    document.getElementById("progress").innerText = `Question ${questionNumber}/${maxQuestions}`;
    ++questionNumber;
}

function startGame() {
    //Use Start button to begin the game
    let startButton = document.getElementById("start-btn");
    startButton.classList.add("hide");
    startButton.addEventListener("click", startGame => {
        const targetDiv = document.getElementById("hidden");
        targetDiv.style.display = "block";
    })
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
            console.log(value)
        })
    })
}

async function init() {
    await getQuestions();
    getNextQuestion(0);
    startGame();
    choiceListeners();

}
init()
checkAnswers()
showCorrectAnswer()
playMusic()
reset()

//check if answers are correct or not
function checkAnswers() {
    var button1 = document.getElementById("answer1");
    button1.addEventListener("click", event => {
        console.log("This is the correctAnswer:", correctAnswer)
        console.log("This is the selectedChoice:", selectedChoice)
        console.log("This is the value:", event.target.innerText) 
        console.log(button1.innerHTML)       

        if (button1.innerHTML === correctAnswer) {
            button1.style.background = "green";
            alert("you are correct");           
            showCorrectAnswer()            
            incrementScore();

        } else {
            button1.style.background = "red";
            alert("you are incorrect");
            showCorrectAnswer()           
            incrementWrongAnswer();
        }
    })

    var button2 = document.getElementById("answer2");
    button2.addEventListener("click", event => {

        if (button2.innerHTML === correctAnswer) {
            button2.style.background = "green";
            alert("you are correct");           
            showCorrectAnswer()           
            incrementScore();
        } else {
            button2.style.background = "red";
            alert("you are incorrect");
            showCorrectAnswer()            
            incrementWrongAnswer();
        }
    })

    var button3 = document.getElementById("answer3");
    button3.addEventListener("click", event => {

        if (button3.innerHTML === correctAnswer) {
            button3.style.background = "green";
            alert("you are correct");
            showCorrectAnswer()            
            incrementScore();
        } else {
            button3.style.background = "red";
            alert("you are incorrect");
            showCorrectAnswer()            
            incrementWrongAnswer();
        }
        playMusic()
    })

    var button4 = document.getElementById("answer4");
    button4.addEventListener("click", event => {

        if (button4.innerHTML === correctAnswer) {
            button4.style.background = "green";
            alert("you are correct");
            showCorrectAnswer()           
            incrementScore();
        } else {
            button4.style.background = "red";
            alert("you are incorrect");
            showCorrectAnswer()           
            incrementWrongAnswer();
        }
    })

    //The answer choices and correct answer are removed in order to display new choices
    function reset() {
        document.getElementById("verify-answer").innerHTML = "";
        var elements = document.getElementsByClassName('option'); // get all elements
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = "grey";
        }
    }

    //audio for alerting users if they got correct or wrong answer
    function playMusic() {
    var options= document.getElementsByClassName("options");
        options.addEventListener("click", event => {
        if (button1.innerHTML === correctAnswer) {
            soundcorrect.play()
        } else {
            if (button1.innerHTML === currentQuestion.incorrect_answers) {
                soundwrong.play()
            }
        }
    })
    }

    //show the correct answer to the user, before moving to next question
    function showCorrectAnswer() {
        document.getElementById("verify-answer").innerHTML = correctAnswer;
        console.log(correctAnswer);
    }

    //The user can click on next to see the next question       
    let nextButton = document.getElementById("next-btn");
    nextButton.addEventListener("click", getNextQuestion => {
        console.log("new question shown")
        reset()
    })

    /*let restartButton = document.getElementById("restart-btn");
    restartButton.addEventListener("click", _getQuestions => {
        console.log("Restarting Game")
        reset()
    })*/

    //Scoring for the Game, increment score when there is a correct answer from the question asked
    function incrementScore() {
        var oldScore = parseInt(document.getElementById("correct").innerText);
        document.getElementById("correct").innerText = ++oldScore;
        index++;
    }

    //Scoring for the Game, increments wrongscore when there is an incorrect answer from the question asked
    function incrementWrongAnswer() {
        var oldScore = parseInt(document.getElementById("incorrect").innerText);
        document.getElementById("incorrect").innerText = ++oldScore;
        index++;
    }

    function hideButton() {
        var x = document.getElementById("nextButton");
        if (maxQuestions === 10) {
            nextButton.style.display = "none";
        } else {
            nextButton.style.display = "block";
        }
    }

    

    //When the quiz is over the score is shown to the user
    function showFinalScore() {

        var lastQuestion = questions.length -1;
        oldScore = parseInt(document.getElementById("correct").innerText);
        if (lastQuestion.value === 10) {
            alert("you got " + oldScore + "/" + questions.length);
            console.log("you have scored:", oldScore)
            console.log(lastQuestion.value)
            showScores()
        }
    }    

    //final scores to be displayed to user on ending the game 
    function showScores() {        
        //final scores to be displayed to user
        let userScore = document.getElementById("correct").innerText;
        document.getElementById("scoreText").innerText = "You have scored, " + `${userScore}` + "!";
        let closingMessage = document.getElementById("closing-message");
        if (userScore == 0) {
            closingMessage.innerHTML = "ahem....well, a little practise and you'll soon get there";
        } else if (userScore < 3) {
            closingMessage.innerHTML = "Maybe quizzing is not your forte, have you tried Sudoku";
        } else if (userScore < 6) {
            closingMessage.innerHTML = "Better luck next time, I'm sure you will get there";
        } else if (userScore < 9) {
            closingMessage.innerHTML = "So close, but no cigar, next time you will be the winner";
        } else if (userScore == 10) {
            closingMessage.innerHTML = "You have achieved greatness";
        }
    }
}

