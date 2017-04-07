(function() {
  var questions = [{
    question: "What region was affected by the spread of Maize?",
    choices: ["Northwest", 
              "Northeast", 
              "South", 
              "Southwest"],
    correctAnswer: 3
  }, {
    question: "What was NOT a reason for the Spanish Conquest?",
    choices: ["Gold", 
              "Gifts", 
              "God", 
              "Glory"],
    correctAnswer: 1
  }, {
    question: "What impact did the Spanish colonists bring to the Indians?",
    choices: ["The spread of disease killed 90% Indians", 
              "They brought African slaves over",
              "They brought crops such as potatoes",
              "No impact"],
    correctAnswer: 0
  }, {
    question: "Which two European nations developed a good trading relationship with the Native Americans?",
    choices: ["English and French",  
              "Dutch and Spanish", 
              "Spanish and French", 
              "French and Dutch"],
    correctAnswer: 3
  }, {
    question: "Who was kicked out of the Puritan society and formed his or her own State?",
    choices: ["Anne Hutchinson, who established Maryland", 
              "Hester Prynne, who established Massachusetts", 
              "Roger Williams, who established Rhode Island", 
              "William Penn, who established Pennsylvania"],
    correctAnswer: 2
  }, {
    question: "What event led by indentured servants changed the nation?",
    choices: ["Bacon’s Rebellion",
              "King Philip’s War",
              "Pueblo Revolt",
              "Shays' Rebellion"],
    correctAnswer: 0
  }, {
    question: "What is NOT is a way the English tried to tighten control on the colonies?",
    choices: ["Mercantilism",
              "Pass the Navigation Acts",
              "Establish the Iroquois Confederacy",
              "Establish the Dominion of New England"],
    correctAnswer: 2
  }, {
    question: "What is the reason for the start of Great Awakening?",
    choices: ["To restore the declining economy after British collected taxes",
              "To revive the current religious state because people focus too much on material wealth",
              "To attract more religious followers in the New World",
              "The greater production of Bibles"],
    correctAnswer: 1
  }, {
    question: "Why was slavery more prevalent in the South than the North?",
    choices: ["Southern colonies relied more on labor for crops",
              "The religious North didn’t want slaves",
              "Slaves died in colder climates",
              "Slaves could performed better on farmland"],
    correctAnswer: 0
  }, {
    question: "Which best describes how Britain ruled the colonies prior to mid-1700s?",
    choices: ["Colonies were neglected but praised",
              "Rules were rarely enforced so the colonies benefitted from it",
              "Isolated the colonies from each other",
              "Stopped trading with the colonies"],
    correctAnswer: 1
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