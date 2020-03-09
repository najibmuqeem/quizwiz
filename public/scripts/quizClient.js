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

// Post question to quiz
const addQuestion = function(
  questionElem,
  quiz_id,
  question,
  number_of_answers
) {
  $.ajax({
    type: "POST",
    url: "/api/questions",
    data: { quiz_id, question, number_of_answers },
    success: data => {
      addOptions(questionElem, data.id, number_of_answers);
    },
    dataType: "json"
  });
};

const addOptions = function(questionElem, question_id, number_of_answers) {
  let options = [];
  let is_correct = [];

  questionElem.find(".option").each(function(i) {
    options.push($(this)[0].value);

    if ($(this)[0].className.includes("correct")) {
      is_correct.push(true);
    } else {
      is_correct.push(false);
    }
  });

  for (let i = 0; i < number_of_answers; i++) {
    addOptionToQuestion(question_id, options[i], is_correct[i]);
  }
};

// Post option to question
const addOptionToQuestion = function(question_id, option, is_correct) {
  $.ajax({
    type: "POST",
    url: "/api/options",
    data: { question_id, option, is_correct },
    dataType: "json"
  });
};
