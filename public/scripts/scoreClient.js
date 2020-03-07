// Post score
const createQuiz = function() {
  let data = null;
  $.ajax({
    type: "POST",
    url: "/scores",
    data: data,
    success: postTest;
  }
  );
};
