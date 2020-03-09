// Gets individual quizzes to show on home page
const fetchAndRenderQuizzes = function() {
  $.ajax({
    type: "GET",
    url: "/api/quizzes",
    success: renderQuizzes,
    dataType: "json"
  });
};

// Post quiz
const createQuiz = function(data) {
  $.ajax({
    type: "POST",
    url: "/api/quizzes",
    data: data,
    success: data => {
      document.getElementById("quiz-id").innerHTML = data[0].id;
    },
    dataType: "json"
  });
};

// Get single quiz
const fetchSingleQuiz = function() {
  $.ajax({
    type: "GET",
    url: "/api/quizzes/:id",
    success: renderQuiz,
    dataType: "json"
  });
};

// Gets all the questions for a specific quiz
const fetchQuestions = (quizId) => {
  $.ajax({
    type: "GET",
    url: `/api/questions/${quizId}`,
    success: questions => {
      questions.forEach(question => {
        fetchOptions(question);
      });
    },
    dataType: "json"
  })
};

// Gets all the options for a question
const fetchOptions = (question) => {
  $.ajax({
    type: "GET",
    url: `/api/options/${question.id}`,
    success: options => quizQuestionsAndOptions.push(question, options),
    dataType: "json"
  })
};
