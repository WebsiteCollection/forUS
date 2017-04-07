(function() {
  var questions = [{
    question: "What effect did the Brown decision have on the Civil Rights Movement?",
    choices: ["It upheld Plessy v. Ferguson", 
              "It overturned Plessy v. Ferguson", 
              "It upheld Roe v. Wade", 
              "It overturned Dred Scott v. Sandford"],
    correctAnswer: 1
  }, {
    question: "Which best describes the relationship between the US and USSR during the Cold War?",
    choices: ["Always engaged in military and political rivalry", 
              "Completely isolated from each other", 
              "Maintained friendship and diplomacy", 
              "Fluctuated between indirect conflict and mutual coexistence"],
    correctAnswer: 3
  }, {
    question: "Which best describes President Reagan's economic policies?",
    choices: ["Supply side economic", 
              "The Fair Deal",
              "Stagflation",
              "Shrinkflation"],
    correctAnswer: 0
  }, {
    question: "What caused the collapse of the USSR?",
    choices: ["Increased political and military pressure from US",  
              "Political reforms and rebellions", 
              "Economic problem", 
              "All of the Above"],
    correctAnswer: 3
  }, {
    question: "What was a key demand of the Chicano movement during the 1960s?",
    choices: ["Restoration of all lands ceded to the US", 
              "Increased recognition of Chicano culture", 
              "End of social and political discrimination", 
              "All of the above"],
    correctAnswer: 3
  }, {
    question: "What led to the 9/11 attack?",
    choices: ["Diplomatic alignments and religious conflict",
              "Economic recession and rebellions",
              "American political and military intervention in the Middle East",
              "All of the above"],
    correctAnswer: 2
  }, {
    question: "Why did President Eisenhower criticize the growth of military-industrial complex?",
    choices: ["It gained too much political influence",
              "It failed to defend the nation from entering WWII",
              "It forced industries to build weapons instead of consumer goods",
              "It laid off workers"],
    correctAnswer: 0
  }, {
    question: "Which best characterizes Johnson’s Great Society?",
    choices: ["A conservative program to defeat the USSR and promote capitalism",
              "A liberal program to reform domestic issues and increase spending",
              "A conservative program to reduce the power of the government",
              "A liberal program to increase military spending and beat USSR"],
    correctAnswer: 1
  }, {
    question: "What was President Reagan’s approach to the Cold War?",
    choices: ["He continued Nixon’s detente policy",
              "He rejected detente and have more aggressive policies",
              "He kept the US out of the Cold War",
              "He continued to contain communism and decreased military spending"],
    correctAnswer: 1
  }, {
    question: "The Tet Offensive of 1968?",
    choices: ["Was depicted in American news media and a major victory",
              "Was a victory for North Vietnamese forces",
              "Led to belief that Vietnam War was unwinnable",
              "Brought an end to the war"],
    correctAnswer: 2
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
    var incorrect = 0;

    total.append('Incorrect: Question ');
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
        incorrect++;
      }
      else {
        incorrect++;
        total.append(incorrect + ' ');
      }
    }
    
    total.append('<br><br>You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' correct!');
    return total;
  }
})();