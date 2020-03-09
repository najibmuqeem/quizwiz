// Get quizzes
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
const fetchSingleQuiz = function(id) {
  $.ajax({
    type: "GET",
    url: `/api/quizzes/${id}`,
    success: (data) => {
      renderQuiz(data);
      getScores(data);

    },
    dataType: "json"
  });
};
