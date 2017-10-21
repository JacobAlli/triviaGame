//grab DOM elements
var startBtn = $("#startBtn");

var timerModal = $('.timerModal');

var mainModal = $('.mainModal');

var landingPageContent = $('.landingpage-content');

var currentQuestion = $('.modalHeader');

var answerSection = $('.modalContent');

var questionIndex = 0;

var time = 30;

var isTimeUp = false;

var timeInterval;

var amountCorrect = 0;
var amountWrong = 0;

var triviaQuestions = [
    {
        prompt: "How many colors in the rainbow?",
        answers: {
            0: "8",
            1: "6",
            2: "7",
            3: "9"
        },
        correct: "7"
    },

    {
        prompt: "How many points does a compass have?",
        answers: {
            0: "5",
            1: "37",
            2: "45",
            3: "32"
        },
        correct: "32"
    },
    {
        prompt: "Japanese word for goodbye?",
        answers: {
            0: "Sayonara",
            1: "onaka",
            2: "tegami",
            3: "sushi"
        },
        correct: "Sayonara"
    },
    {
        prompt: "what was the hit game Rocket League's predecessor?",
        answers: {
            0: "Car Soccer League",
            1: "Soccar",
            2: "Supersonic Acrobatic Rocket Powered Battle Cars",
            3: "Rocket Squad"
        },
        correct: "Supersonic Acrobatic Rocket Powered Battle Cars"
    }
];

//click event listener for start btn that displays questions and timer
startBtn.on('click', displayModals);
startBtn.on('click', startTimer);
startBtn.on('click', generateNextQuestion);
startBtn.on('click', generateAnswerButtons);

$(document).on('click', '.answerBtn', judgeAnswer);





//function to display modals

function displayModals(){
    mainModal.css('display', 'block');
    timerModal.css('display', 'block');
    startBtn.css('display', 'none');
    landingPageContent.css('display', 'none');
};

function startTimer(){
    time = 30;
    timeInterval = setInterval(function(){
        time--;
        timerModal.html(time);
        if(time === 0){
            clearInterval(timeInterval);
            isTimeUp = true;
            amountWrong++
            displayCorrectAnswer();
            questionIndex++;
            if(questionIndex <= triviaQuestions.length-1){
                setTimeout(function(){
                    generateNextQuestion();
                    generateAnswerButtons();
                    startTimer();
                },5000)
            }
            else{
                displayResults();
            }
        }
    },1000);
};

function generateAnswerButtons(){
    if(questionIndex <= triviaQuestions.length-1){
        answerSection.empty();
        for(i=0; i < 4; i++){
            var newBtn = $('<button>');
            newBtn.addClass('answerBtn');
            newBtn.addClass('btn');
            newBtn.attr('data-name', triviaQuestions[questionIndex].answers[i])
            newBtn.html(triviaQuestions[questionIndex].answers[i]);
            answerSection.append(newBtn);
        }
    }

};

function generateNextQuestion(){
    if(questionIndex <= triviaQuestions.length-1){
        currentQuestion.empty();
        currentQuestion.html(triviaQuestions[questionIndex].prompt);
    }
};

function displayCorrectAnswer(){
    answerSection.html("Sorry...THE CORRECT ANSWER IS: " +triviaQuestions[questionIndex].correct);
};

function displayResults(){
    currentQuestion.html("RESULTS");
    answerSection.html("Correct: "+ amountCorrect + "<br>" + "Wrong: " + amountWrong);
};

function judgeAnswer(){
    console.log($(this).attr("data-name"));

    if($(this).attr("data-name") === triviaQuestions[questionIndex].correct){
        answerSection.html("YAY YOU GOT IT")
        clearInterval(timeInterval);
        amountCorrect++
        questionIndex++;
        if(questionIndex <= triviaQuestions.length-1){
                setTimeout(function(){
                    generateNextQuestion();
                    generateAnswerButtons();
                    startTimer();
                },5000)
            }
            else{
                displayResults();}

    }
    else{
        clearInterval(timeInterval);
        displayCorrectAnswer();
        amountWrong++
        questionIndex++;
        if(questionIndex <= triviaQuestions.length-1){
                setTimeout(function(){
                    generateNextQuestion();
                    generateAnswerButtons();
                    startTimer();
                },5000)
            }
            else{
                displayResults();}

    }
};

