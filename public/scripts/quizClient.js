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
// Renders question # 1 to start the quiz
const fetchQuestions = () => {
  $.ajax({
    type: "GET",
    url: "/api/questions/:id",
    success: renderQuestion(1),
    dataType: "json"
  })
}
