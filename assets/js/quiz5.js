(function() {
  var questions = [{
    question: "What impact did automobile have on the American society during the 20th century?",
    choices: ["It caused the Great Depression as people went bankrupt", 
              "It had little effect because Model-T was cheap and everyone can buy it", 
              "It led to an increase in personal freedom and mobility", 
              "It encouraged more immigrant because of better transportation"],
    correctAnswer: 2
  }, {
    question: "Why did the status of women change in the 20th century?",
    choices: ["Women have the more jobs in the cities", 
              "Women were paid more because men went to war", 
              "Women gained economic and political freedom", 
              "Women have the ability to participate in the economy"],
    correctAnswer: 2
  }, {
    question: "What did the Progressive want to do during the 20th century?",
    choices: ["More government regulation", 
              "More monopolies and corporations",
              "Nothing because laissez-faire system is good",
              "More foreign relations and receive imports"],
    correctAnswer: 0
  }, {
    question: "What is the main goal of John Muir and the national park system?",
    choices: ["He advocated for money as national parks cost money",  
              "He thought the US have beautiful scenery", 
              "He advocated the use of more trees for building", 
              "He wanted to preserve the environment"],
    correctAnswer: 3
  }, {
    question: "How have African Americans changed after WWI?",
    choices: ["They earned civil rights because of their contribution to the war", 
              "Cultural rejuvenation because many moved to the North for jobs", 
              "Many were jailed due to their opposition", 
              "None - they made few contributions to the war"],
    correctAnswer: 1
  }, {
    question: "What impact did WWI have on free speech?",
    choices: ["None - people can freely expressive their oppositions",
              "Stimulated more debates and conflict",
              "The Espionage and Sedition Acts were passed",
              "People cannot have free speech at all during war times"],
    correctAnswer: 3
  }, {
    question: "How did the New Deal try to end the Great Depression?",
    choices: ["By increasing government regulations and spending",
              "By continuing laissez-faire government",
              "By redistributing the wealth of the monopolies",
              "By adapting communist ideals"],
    correctAnswer: 0
  }, {
    question: "What factor contributed to WWII?",
    choices: ["Rise of fascism",
              "Harsh punishment on Germany after WWI",
              "Japanese imperialism",
              "All of the above"],
    correctAnswer: 3
  }, {
    question: "Why did the Senate NOT approve the League of Nations?",
    choices: ["There will be too much work to organize it",
              "They want to be isolated",
              "They want domination, not collaboration",
              "They thought the Leagues of Nation cannot solve the problem"],
    correctAnswer: 1
  }, {
    question: "What factor caused and pushed for the start of the Spanish-American War?",
    choices: ["Yellow journalism",
              "Sinking of Maine",
              "Cuban independence",
              "All of the above"],
    correctAnswer: 3
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please choose an answer before moving on.');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'back' button
  $('#back').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p class="quizQuestion">').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul class="quizList">');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#back').show();
        } else if(questionCounter === 0){
          
          $('#back').hide();
          $('#next').show();
        }
      }else {
        var totalElem = displayTotal();
        quiz.append(totalElem).fadeIn();
        $('#next').hide();
        $('#back').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes total and returns a paragraph element to be displayed
  function displayTotal() {
    var total = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    total.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' correct!');
    return total;
  }
})();