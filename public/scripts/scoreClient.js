// Post score
const createQuiz = function() {
  let data = null;
  $.ajax({
    type: "POST",
    url: "/quizzes",
    data: data,
    success: postTest;
  }
  );
};
