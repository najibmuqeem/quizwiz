// Get quizzes
const fetchQuizzes = function() {
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
    data: data
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

// Function to render quizzes
const renderQuizzes = function(quizzes) {
  console.log("rendered", quizzes);
};

// render specific quiz
const renderQuiz = function(quiz) {};
