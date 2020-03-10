// Post score
const storeScore = function() {
  let data = null;
  $.ajax({
    type: "POST",
    url: "/api/scores",
    data: data,
    success: () => {}
  });
};

// Get scores
const getScores = function(quiz) {
  $.ajax({
    type: "GET",
    url: `/api/scores/${quiz.user_id}/${quiz.id}`,
    success: renderScores
  }
  );
};


