var questionCounter = 0;
var selecterAnswer;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;

var questionArray = [
  questions[0] = "What was Jason Voorhees' original mask?",
  questions[1] = "In what movie did Johnny Depp make his acting debut?",
  questions[2] = "Michael Myers received a roundhouse kick from which famous rapper?",
  questions[3] = "Which horror movie featured a member from pop-group New Kids on the Block?"
];

for (var i = 0; i < questions.length; i++) {
  $('#mainArea').text(questions[i]);
}

var answerArray = [
  answers[0] = "Clown Mask", "Potato Sack", "Hockey Mask", "A Sheet with Holes for Eyes",
  answers[1] = "Hellraiser", "Gremlins", "The Lost Boys", "A Nightmare on Elm Street",
  answers[2] = "Vanilla Ice", "2Pac", "Busta Rhymes", "The Entire Wu-Tang Clan",
  answers[3] = "Saw 2", "I Know What You Did Last Summer", "Urban Legend", "Scream"
];

for (var i = 0; i < answers.length; i++) {
  var button = $('<button>');
  button.text(answers[i]);
  button.appendTo('#buttons');
}

var imageArray = [
  imageArray[0] = "<img class='center-block' src='/TriviaGame/assets/images/FT13.gif'>",
  imageArray[1] = "<img class='center-block' src='/TriviaGame/assets/images/NES.gif'>",
  imageArray[2] = "<img class='center-block' src='/TriviaGame/assets/images/brroundhouse.gif'>",
  imageArray[3] = "<img class='center-block' src='/TriviaGame/assets/images/Saw2.gif'>"
];

for (var i = 0; i < imageArray.length; i++) {
  var button = $('<button>');
  $('#result').text(imageArray[i]);
  button.appendTo('#result');
}

var correctAnswers = [
  correctAnswers[0] = "B. Potato Sack",
  correctAnswers[1] = "D. A Nightmare on Elm Street",
  correctAnswers[2] = "C. Busta Rhymes",
  correctAnswers[3] = "A. Saw 2"
];

for (var i = 0; i < correctAnswers.length; i++) {
  $('#result').text(correctAnswers[i]);
}


  function openingPage() {
    openScreen = "<button>DO NOT ENTER</button>";
    $("#start-button").append(openScreen);
  };

  openingPage();

  $("body").on("click", "#start-button", function (event) {
    event.preventDefault();

    generateQuestions();

    timerWrapper();

  });

  $("body").on("click", "#buttons", function (event) {

    selectedAnswer = $(this).text();
    if (selectedAnswer === correctAnswers[questionCounter]) {
      clearInterval(theClock),
        generateWin()
    } else {
      clearInterval(theClock),
        generateLoss()
    };

    $("body").on("click", ".reset-button", function (event) {
      clickSound.play();
      resetGame();
    });

    function timeoutLoss() {
      unansweredTally++;
      gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='/assets/images/x.gif'>";
      $("#start-button").text(gameHTML);
      setTimeout(wait, 3000);
    };

    function generateWin() {
      correctTally++;
      gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
      $("#mainArea").text(gameHTML);

      setTimeout(wait, 3000);
    };

    function generateLoss() {
      incorrectTally++;
      gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='/assets/images/x.gif'>";
      $("#mainArea").text(gameHTML);
      setTimeout(wait, 3000);
    };


    function generateQuestions() {
      gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
      $("#buttons").text(gameHTML);
    };

    function wait() {

      questionCounter < 4 ?
        (questionCounter++ ,
          generateQuestions(),
          counter = 30,
          timerWrapper()) :

        (finalScreen())
    };

    function timerWrapper() {
      theClock = setInterval(thirtySeconds, 1000);
      function thirtySeconds() {
        if (counter === 0) {
          clearInterval(theClock);
          timeoutLoss();
        }
        if (counter > 0) {
          counter--;
        }
        $("#timer").text(counter);
      }
    };

    function finalScreen() {
      gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
      $("#mainArea").text(gameHTML);
    };

    function resetGame() {
      questionCounter = 0;
      correctTally = 0;
      incorrectTally = 0;
      unansweredTally = 0;
      counter = 30;
      generateQuestions();
      timerWrapper();
    };

