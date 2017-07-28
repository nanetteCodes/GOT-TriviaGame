// objects variable holding questions and answers
var triviaQuestions = [{
  question:"Which knight of Westeros is known as the Kingslayer?", 
  answerList:["Jamie Lannister", "Euron Greyjoy","Robert Stark","Jon Snow"], 
  answer: 0}, //Jamie Lannister

  {question:'What piece of fencing advice did Jon Snow give to Arya Stark? "Stick them with the…"', 
  answerList:["Prickly end","Sharp end","Futtocks end","Pointy end"], 
  answer: 3}, //Pointy end
  
  {question:'Who said, "It\'s not easy being drunk all the time. Everyone would do it if it were easy"?', 
  answerList:["Bronn","Dumbledore","Tyrion Lannister","King Robert"], 
  answer: 2}, //Tyrion Lannister

  {question:'Who said, "Some day I\'m gonna put a sword through your eye and out the back of your skull"?', 
  answerList:["Theon Greyjoy","Shae","Arya Stark", "Gregor Clegane"], 
  answer: 2}, //Arya Stark

  {question:"Who was the mastermind who plotted to kill King Joffrey?", 
  answerList:["Sir Mixalot","Littlefinger","Olenna Tyrell", "Melisandre"], 
  answer: 1}, //Littlefinger

  {question:'Which house’s motto is “Fire and Blood”?', 
  answerList:["Greyjoy","Martel","Targaryen", "Stark"], 
  answer: 2}, //Targaryen

  {question:"How are Jon Snow and Daenerys Targaryen related?", 
  answerList:["Jon is her cousin","Jon is her half-brother","Jon is her uncle", "Jon is her nephew"], 
  answer: 3}, //Jon is her nephew

  {question:"What did Daenerys name her three dragons?", 
  answerList:["Grogon, Brogon, Mrogon","Drogon, Viserion, Rhaegal","Carserion, Ragna, Apep","Pete, Toothless, Elliott"], 
  answer: 1}, //Drogon, Viserion, Rhaegal

  {question:"What was the name of Robb Stark's direwolf?", 
  answerList:["Grey Wind","Silver Eye","Lady", "Lassy"], 
  answer: 0}, //Grey Wind

  {question:"Fibrodysplasia ossificans progressiva is the name of a real-life disease that inspired this Game of Thrones illness.", 
  answerList:["Leprosy","Greyscale","Black Death", "Tetanus"], 
  answer: 1}, //Greyscale

  {question:"What is The Hound scared of?", 
  answerList:["water","commitment","clowns", "fire"], 
  answer: 3}, //fire

  {question: "What is Ned Starks real first name?",
  answerList:["James","Eddard","Jory", "Edward"], 
  answer: 1}, //Eddard

  {question: "Who is the son of Lord Commander of the Knights Watch?",
  answerList:["Jory","Ser Jorah","Jeon", "Mance Rayder"], 
  answer: 1}]; //Ser Jorah

  //variables
  var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13'];
  var currentQuestion; var correctAnswer; var incorrectAnswer; var seconds; var time; var answered; var userSelect;
  var messages = {
  correct: "Correct!",
  incorrect: "Wrong!",
  endTime: "Out of time!",
  finished: "Score"
  }

  $('#startBtn').on('click', function(){
    $(this).hide();
    newGame();
  });

  $('#startOverBtn').on('click', function(){
    $(this).hide();
    newGame();
  });

  function newGame(){
    $('#finalMessage').empty();
    $('#correctAnswers').empty();
    $('#incorrectAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    nextQ();
  }

  function nextQ(){
    $('#message').empty();
    $('#correctedAnswer').empty();
    $('#gif').empty();
    answered = true;

  //sets up new questions & answerList
  $('#currentQuestion').html('<h2 style="color:brown;">' +'Question #'+(currentQuestion+1)+'/'+triviaQuestions.length + '</h2>');
  $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
  for(var i = 0; i < 4; i++){
    var choices = $('<div>');
    choices.html('<h3 style="color:saddlebrown;">' + triviaQuestions[currentQuestion].answerList[i] + '</h3>');
    choices.attr({'data-index': i });
    choices.addClass('thisChoice');
    $('.answerList').append(choices);
  }
  countdown();
  //clicking an answer will pause the time and setup answerPage
  $('.thisChoice').on('click',function(){
    userSelect = $(this).data('index');
    clearInterval(time);
    answerPage();
  });
}

function countdown(){
  seconds = 15;
  $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
  answered = true;
  //sets timer to go down
  time = setInterval(showCountdown, 1000);
}

function showCountdown(){
  seconds--;
  $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
  if(seconds < 1){
    clearInterval(time);
    answered = false;
    answerPage();
  }
}

function answerPage(){
  $('#currentQuestion').empty();
  $('.thisChoice').empty(); //Clears question page
  $('.question').empty();

  var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
  var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
  $('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');

  //checks to see correct or incorrect
  if((userSelect == rightAnswerIndex) && (answered == true)){
    correctAnswer++;
    $('#message').html(messages.correct);
  } else if((userSelect != rightAnswerIndex) && (answered == true)){
    incorrectAnswer++;
    $('#message').html(messages.incorrect);
    $('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
  } 
  
  if(currentQuestion == (triviaQuestions.length-1)){
    setTimeout(scoreboard, 5000)
  } else{
    currentQuestion++;
    setTimeout(nextQ, 5000);
  } 
}
 
function scoreboard(){
  $('#timeLeft').empty();
  $('#message').empty();
  $('#correctedAnswer').empty();
  $('#gif').empty();
  $('#finalMessage').html(messages.finished);
  $('#correctAnswers').html("Correct Answers: " + correctAnswer);
  $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
  $('#startOverBtn').addClass('reset');
  $('#startOverBtn').show();
  $('#startOverBtn').html('Try Again');
}

var myAudio = new Audio("GameOfThrones.mp3");
myAudio.loop = true;
myAudio.play();
