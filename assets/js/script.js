var answers = [];
var questions = [];
var userName;
var questionNumber;
var quiz;
var index = 0;
var correctAnswer;
var selectedChoice;


async function getQuestions() {
    //pass variable to question variable line2
    const response = await fetch(`https://opentdb.com/api.php?amount=10`);
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

startButton = document.getElementById("start-btn");

function startGame() {
    
    const targetDiv = document.getElementById("hidden");
    targetDiv.style.display = "block";
}

function choiceListeners() {
    //get all choice buttons
    const choices = document.querySelectorAll('.choice-container');
    //iterate over the choices
    choices.forEach(choice => {
        //for each choice add a click event listener, pass the event to the callback function
        choice.addEventListener("click", event => {
            //event target is the one that is clicked 
            const value = event.target.innerText;
            console.log(value)

        })
    })
}

async function init() {
    await getQuestions();
    getNextQuestion(0);
    startGame();
    choiceListeners();
    //checkAnswers();

}

init()




function checkAnswers() {
    

    let button1 = document.getElementById("answer1");
    button1.addEventListener("click", event => {
        const selectedChoice = e.target
        

        if (selectedChoice === correctAnswer.value) {
            alert("you are correct");
            button1.style.background = "green";
            // incrementScore();
        } else {
            alert("you are incorrect");
            button1.style.background = "red";
            // incrementWrongAnswer();
        } 
        init()   
    })

}

/*choices.forEach(choice => {
    //for each choice add a click event listener, pass the event to the callback function
    choice.addEventListener("click", event => {
        if (!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset('questions')
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if (classToApply === "correct"){
            alert("your are right")
        } else alert("you are wrong")
    })
}) */   
        



//Get username of the user and send to welcome message on game page

//Username for the game

document.getElementById("submitname").onclick = function(){
    var userName = document.getElementById("username").value;
    console.log("Hello", userName);
    document.getElementById("welcomeText").innerText = "Welcome, " + `${userName}` + "!";
}

//difficulty level for the game


