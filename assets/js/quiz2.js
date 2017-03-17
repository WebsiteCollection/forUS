(function() {
  var questions = [{
    question: "What consequence did the French and Indian War have in North America?",
    choices: ["The French Victory forced King George to resign", 
              "The British victory kicked out the French", 
              "The Native Americans were killed off", 
              "The colonies were torn apart"],
    correctAnswer: 1
  }, {
    question: "How did Great Britain try to pay off their debt?",
    choices: ["Enforced imperial policies and taxes", 
              "Sold royal treasures", 
              "Sold the colonies", 
              "Forced the colonies to loan money"],
    correctAnswer: 0
  }, {
    question: "How did colonists react to the Proclamation of 1763?",
    choices: ["Angered that the Natives were giving up land", 
              "Supportive because the French were expelled",
              "Did not care because they had too much land",
              "Angered and illegally settled past the line"],
    correctAnswer: 3
  }, {
    question: "How did the colonists feel about the Revolution?",
    choices: ["A majority didn't care",  
              "Only a minority opposed it", 
              "They were split between patriots and loyalists", 
              "A majority opposed it"],
    correctAnswer: 2
  }, {
    question: "Why is the Battle of Saratoga significant?",
    choices: ["It was a British victory that crushed the colonies", 
              "It was a colonial victory that prolonged the war", 
              "It was the first battle led by George Washington", 
              "It was a colonial victory that encouraged foreign support"],
    correctAnswer: 3
  }, {
    question: "What event led the Founders to change the Articles of Confederation?",
    choices: ["Whiskey Rebellion",
              "Shays' Rebellion",
              "Battle of Lexington and Concord",
              "Treaty of Paris"],
    correctAnswer: 1
  }, {
    question: "How did the Constitution address slavery?",
    choices: ["It was banned due to new ideals",
              "Explicitly stated and legal",
              "Included compromises that implicitly state it",
              "Included an entire article discussing it"],
    correctAnswer: 2
  }, {
    question: "What did the Federalists want?",
    choices: ["Strong state power",
              "Protection of individual rights",
              "The Constitution to be rewritten",
              "Strong central government"],
    correctAnswer: 3
  }, {
    question: "What role in politics did women play?",
    choices: ["Did not participate at all",
              "Participated in voting and other civic duties",
              "Perpetuated republican ideals",
              "Protested for voting rights"],
    correctAnswer: 2
  }, {
    question: "What was a result of the Whiskey Rebellion?",
    choices: ["Secured the authority of the government under the Constitution",
              "Made the Founders scrap the Articles of Confederation",
              "Led to the ratification of the Bill of Rights",
              "Severely injured many citizens, including George Washington"],
    correctAnswer: 0
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