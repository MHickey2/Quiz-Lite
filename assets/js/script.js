var answers = [];
var questions = [];
var userName;
var quiz;
var index = 0;
var correctAnswer;
var selectedChoice;
var amount = 10;
var currentQuestion;
var category = 8;
var difficultyLevel;
var questionNumber =1; 
var maxQuestions=10;
var soundcorrect = new Audio("/assets/audio/correct.mp3");
var soundwrong = new Audio("/assets/audio/wrong.mp3");

//window.onload = getQuestions()


async function getQuestions() {
   // Fetch 10 questions from API from general knowledge category
//fetch("https://opentdb.com/api.php?amount=15&category=${questionId}&difficulty=${difficulty}&type=multiple`")
    //pass variable to question variable line2
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`);
    questions = await response.json()
}

function getNextQuestion() {
    //getCurrent question
    currentQuestion = questions.results[index]
    console.log("current question",currentQuestion)
    //put correct answers in list with incorrect answers
    correctAnswer = questions.results[index].correct_answer;
    
    console.log("this is currentQuestion.correct_answer",currentQuestion.correct_answer);
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
    questionNumber++;  
}

function startGame() {
    //Use Start button to begin the game
    let startButton = document.getElementById("start-btn");
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


//check if answers are correct or not
function checkAnswers() {
    let button1 = document.getElementById("answer1");
    button1.addEventListener("click", event => {
        //console.log("This is the correctAnswer:", correctAnswer)
        //console.log("This is the selectedChoice:", selectedChoice)
        //console.log("This is the value:", event.target.innerText) 
        //console.log(button1.innerHTML)       

        if (button1.innerHTML === correctAnswer) {
            alert("you are correct");           
            showCorrectAnswer()
            button1.style.background = "green";           
            incrementScore();                
        } else {
            alert("you are incorrect");           
            showCorrectAnswer()
            button1.style.background = "red";           
            incrementWrongAnswer();           
        }
    })

    let button2 = document.getElementById("answer2");
    button2.addEventListener("click", event => {

        if (button2.innerHTML === correctAnswer) {
            alert("you are correct");
            showCorrectAnswer()
            button2.style.background = "green";           
            incrementScore();              
        } else {
            alert("you are incorrect");
            showCorrectAnswer()
            button2.style.background = "red";           
            incrementWrongAnswer();          
        }
    })

    let button3 = document.getElementById("answer3");
    button3.addEventListener("click", event => {
        setTimeout(() => {
            text.classList.remove( 'clicked' )
         active = false;
      }, 500)
        

        if (button3.innerHTML === correctAnswer) {
            alert("you are correct");
            showCorrectAnswer()
            button3.style.background = "green";           
            incrementScore();             
        } else {
            alert("you are incorrect");
            showCorrectAnswer()
            button3.style.background = "red";           
            incrementWrongAnswer();           
        }
    })

    let button4 = document.getElementById("answer4");
    button4.addEventListener("click", event => {

        if (button4.innerHTML === correctAnswer) {
            alert("you are correct");
            showCorrectAnswer()
            button4.style.background = "green";            
            incrementScore();             
        } else {
            alert("you are incorrect");
            showCorrectAnswer()
            button4.style.background = "red";            
            incrementWrongAnswer();              
        }
    })         
}

//show the question number to the user    
function showProgress() {    
    let questionNumber = document.getElementById("next-btn");
    questionNumber = partseInt(document.getElementById("progress").innerText);
    document.getElementById("progress").innerText = questionNumber+1;      
}

//audio for alerting users if they got correct or wrong answer
function playMusic() {

if ((button1.innerHTML === correctAnswer) || (button2.innerHTML === correctAnswer) || (button3.innerHTML === correctAnswer) || (button4.innerHTML === correctAnswer))
{
    //document.getElementById('music1').this.correct.play();
    soundcorrect.play()    
}
else
{
    //document.getElementById('music2').this.wrong.play(); 
    soundwrong.play()  
}
}

//show the correct answer to the user, before moving to next question
function showCorrectAnswer() {    
    document.getElementById("verify-answer").innerHTML = currentQuestion.correct_answer;
    console.log(correctAnswer);
}
     
    let nextButton = document.getElementById("next-btn");
    nextButton.addEventListener("click", getNextQuestion => {
        document.getElementById(button1).backgroundColor = "rgb(102, 95, 95, 0.3)";
        document.getElementById("verify-answer").innerHTML = "";          
})

//Scoring for the Game, increment score when there is a correct answer from the question asked
function incrementScore() {
    let oldScore = parseInt(document.getElementById("correct").innerText);
    document.getElementById("correct").innerText = ++oldScore;    
    index++;
}

//Scoring for the Game, increments wrongscore when there is an incorrect answer from the question asked
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;    
    index++;
}

//Get username of the user and send to welcome message on game page
document.getElementById("submitname").onClick = function() {
    var userName = document.getElementById("username").value;
    console.log("Hello", userName);
    document.getElementById("welcomeText").innerText = "Welcome, " + `${userName}` + "!";
}


//When the quiz is over the score is shown to the user
function showFinalScore() {
    if (currentQuestion === maxQuestions) {
        alert("you have scored:", oldscore)
        console.log("you have scored:",oldscore)
        showScores()
    }
}

showScores()
userScore = 5;

function showScores() {
    let finalScore = oldScore;
    //final scores to be displayed to user
    let userScore = document.getElementById("correct");
    userScore.innerHTML = finalScore;
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
