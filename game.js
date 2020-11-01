const question = document.getElementById('question');
const choices  = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score'); 
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

scoreText.innerHTML = 0;

let questionCounter = 0;
let score           = 0;
let availableQuestions = [];
let currentQuestion = {};
let acceptingAnswers = false;


let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple")
.then((res) =>{
    return res.json();
})
.then((loadedQuestions) =>{
   questions = loadedQuestions.results.map((loadedQuestion) =>{
        const formattedQuestion = {
            question : loadedQuestion.question,
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {
            formattedQuestion["choice"+ (index+1)] = choice;
        });

        return formattedQuestion;
    });
        
       
       startgame();
    })
.catch(er =>{
    console.error(er);
});

//constants
const CORRECT_BONUS = 10;
const MAX_QUESTION  = 5;

startgame = () =>{

    questionCounter = 0;
    score           = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
    
};

getNewQuestion = () =>{

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTION){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign('endgame.html');
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTION}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100 }%`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
    
    choices.forEach((choice) => {

       const number = choice.dataset['number'];
       choice.innerText = currentQuestion["choice" + number]; 
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

};

choices.forEach((choice) => {

    choice.addEventListener('click',(e) =>{

        if(!acceptingAnswers) return;
        
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        const classToApply = 

        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if(classToApply === "correct"){
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion(); 
        }, 1000);

    });
});

incrementScore = num => {
    score+=num;
    scoreText.innerText = score;
}




