// Post score
const storeScore = function(quiz_id, user_id, score) {
  $.ajax({
    type: "POST",
    url: "/api/scores",
    data: { quiz_id, user_id, score }
  });
};

// Get scores
const getScores = function(quiz) {
  $.ajax({
    type: "GET",
    url: `/api/scores/${quiz.user_id}/${quiz.id}`,
    success: renderScores
  });
};
