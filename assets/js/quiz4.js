(function() {
  var questions = [{
    question: "What sectional differences between the North and South influenced the rise of the Free Soil party?",
    choices: ["The continuation of slavery", 
              "The population difference", 
              "The growing religious differences and ethnic backgrounds", 
              "The growing economic differences resulting from industrialization"],
    correctAnswer: 3
  }, {
    question: "What was the attitude of the Republican Party towards the Civil War?",
    choices: ["They supported it because they wanted to give slaves equality", 
              "They supported it because the Union could not be dissolved", 
              "They opposed it because slavery was permissible", 
              "They opposed it because it favored the state’s rights"],
    correctAnswer: 1
  }, {
    question: "Why was the Emancipation Proclamation of 1863 so significant?",
    choices: ["It authorized racial integration in the military", 
              "It abolished slavery in the nation",
              "It added the abolition of slavery to the Northern war goals",
              "It simply reaffirmed the abolition of slavery"],
    correctAnswer: 2
  }, {
    question: "How did the women’s rights activist react to the 15th Amendment?",
    choices: ["They supported it because it allowed women to vote as well",  
              "They opposed it because it refused to ban gender discrimination", 
              "The amendment fractured the women’s rights movement", 
              "They ignored it because they only concern with their suffrage"],
    correctAnswer: 2
  }, {
    question: "What impact did the Transcontinental Railroad have on Native Americans and the people living in the West?",
    choices: ["It increased cultural and political pressure", 
              "It brought prosperity as railroad companies paid money for their land", 
              "It allowed them to travel freely", 
              "It brought prosperity because more farmers traded with them"],
    correctAnswer: 0
  }, {
    question: "What was a solution to inequality as suggested by the “Gospel of Wealth”?",
    choices: ["Poor people must pray to become wealthy",
              "Benefactors should use their wealth to help the poor",
              "Wealthy individual must serve as role model",
              "Religious revival must occur to end sin and provide equality"],
    correctAnswer: 0
  }, {
    question: "What is the purpose behind the Chinese Exclusion Act?",
    choices: ["To reduce transportation of opium into America",
              "To fight against the Chinese as they attacked the US Navy",
              "To stop Chinese influence in industry and religion",
              "To reduce economic competition for the Nativists"],
    correctAnswer: 3
  }, {
    question: "Which of the following did the immigrants from southern and eastern Europe NOT support during the late 19th century?",
    choices: ["They supported religious tolerance",
              "They supported temperance laws",
              "They supported diversity and continuation of native languages",
              "They supported traditional cuisine and other customs"],
    correctAnswer: 1
  }, {
    question: "What statement best describe Indian tribes in the late 19th century?",
    choices: ["They had been destroyed by the military forces",
              "They were still strong political, military, and cultural forces that resisted intervention",
              "The US no longer treated them as sovereign units and forced to intervene",
              "The US treated them as sovereign units and kept their reservations/land"],
    correctAnswer: 2
  }, {
    question: "What effects did Reconstruction have on the legal rights of freedmen living in the South?",
    choices: ["It had little benefits because of poor execution",
              "It had some benefits because it forced freedman to work",
              "It had many benefits because all slave owners were imprisoned",
              "It had many benefits because it gave freedman jobs"],
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