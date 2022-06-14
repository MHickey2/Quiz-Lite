var answers = [];
var questions = [];
var userName;
var questionNumber;
var quiz;
var index = 0;
var correctAnswer;
var selectedChoice;
var amount=20;
var questionNumber;

window.onload = getQuestions()


async function getQuestions() {
    //pass variable to question variable line2
    const response = await fetch(`https://opentdb.com/api.php?amount=20&category=11&difficulty=hard&type=multiple`);
    questions = await response.json()
}

function getNextQuestion(index) {
    //getCurrent question
    const currentQuestion = questions.results[index]
    //put correct answers in list with incorrect answers
    correctAnswer = currentQuestion.correct_answer;
    let choices = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer);
    choices.sort(() => Math.random() - 5);

    document.getElementById("category").innerHTML = ' Category:' + currentQuestion.category
    document.getElementById("difficulty").innerHTML = ' Difficulty: ' + currentQuestion.difficulty
    document.getElementById("question").innerHTML = ' Question:' + currentQuestion.question
    document.getElementById("answer1").innerHTML = choices[0]
    document.getElementById("answer2").innerHTML = choices[1]
    document.getElementById("answer3").innerHTML = choices[2]
    document.getElementById("answer4").innerHTML = choices[3]
}

function startGame() {   
//Use Start button to begin the game
    let startButton = document.getElementById("start-btn");
    startButton.addEventListener("click", startGame => { 
    const targetDiv = document.getElementById("hidden");
    targetDiv.style.display = "block";
    showProgress()
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




function checkAnswers() {        
    let button1 = document.getElementById("answer1");
    button1.addEventListener("click", event => {        
    //selectedChoice = event.target.innerHTML;

        //console.log("This is the correctAnswer:", correctAnswer)
        //console.log("This is the selectedChoice:", selectedChoice)
        //console.log("This is the value:", event.target.innerText) 
        //console.log(button1.innerHTML)       

        if (button1.innerHTML === correctAnswer) {
            alert("you are correct");
            button1.style.background = "green";
            incrementScore() 
                      
                                 
        } else {
            alert("you are incorrect");
            button1.style.background = "red";
            incrementWrongAnswer()            
        }                          
    })

    let button2 = document.getElementById("answer2");
    button2.addEventListener("click", event => {               

        if (button2.innerHTML === correctAnswer) {
            alert("you are correct");
            button2.style.background = "green";
            incrementScore();
        } else {
            alert("you are incorrect");
            button2.style.background = "red";            
            incrementWrongAnswer();                      
        }                
    })

    let button3 = document.getElementById("answer3");
    button3.addEventListener("click", event => {
        
        if (button3.innerHTML === correctAnswer) {
            alert("you are correct");
            button3.style.background = "green";
            incrementScore();
        } else {
            alert("you are incorrect");
            button3.style.background = "red";
            incrementWrongAnswer();                      
        }               
    })

    let button4 = document.getElementById("answer4");
    button4.addEventListener("click", event => {
                
        if (button4.HTML === correctAnswer) {
            alert("you are correct");
            button4.style.background = "green";
            incrementScore();
        } else {
            alert("you are incorrect");
            button4.style.background = "red";
            incrementWrongAnswer();                        
        } 
                           
    })
    getNextQuestion()   
}


function showCorrectAnswer() {
        button1.style.background = "green";        
    }
    
function showProgress() {
        questionNumber = document.getElementById("progress").innerText;
        document.getElementById("progress").innerText = ++questionNumber; 
        
    }

//Scoring for the Game, increments score when there is a correct answer from the question asked
function incrementScore() {
    let oldScore = parseInt(document.getElementById("correct").innerText);
    document.getElementById("correct").innerText = ++oldScore;   
}

//Scoring for the Game, increments wrongscore when there is an incorrect answer from the question asked
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;      
}

//Get username of the user and send to welcome message on game page
document.getElementById("submitname").onclick = function(){
    var userName = document.getElementById("username").value;
    console.log("Hello", userName);
    document.getElementById("welcomeText").innerText = "Welcome, " + `${userName}` + "!";
}

//difficulty level for the game


