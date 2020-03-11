// Gets individual quizzes to show on home page
const fetchAndRenderQuizzes = function() {
  $.ajax({
    type: "GET",
    url: "/api/quizzes",
    success: renderQuizzes,
    dataType: "json"
  });
};

// Get user given username
const getUserWithUsername = function(username) {
  $.ajax({
    type: "GET",
    url: "/api/users",
    data: username,
    success: data => {},
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
    success: data => {
      renderQuiz(data);
    },
    dataType: "json"
  });
};

// Get a random quiz
const getRandomQuiz = function() {
  $.ajax({
    type: "GET",
    url: "/api/quizzes/random",
    success: data => {
      renderQuiz(data);
    },
    dataType: "json"
  });
};

// Get a single quiz, for rendering share result page
const fetchQuizToShare = (quizId, username, score) => {
  $.ajax({
    type: "GET",
    url: `/api/quizzes/${quizId}`,
    success: quizData => {
      renderShareResultPage(quizData, username, score);
    },
    dataType: "json"
  });
};

// Get all the questions and options for a quiz
const fetchQuizData = quizId => {
  $.ajax({
    type: "GET",
    url: `/api/questions/${quizId}`,
    success: data => {
      quizData = data;
      renderQuestion(quizData);
    },
    dataType: "json"
  });
};

// Removes quiz from database
const removeQuiz = quiz_id => {
  $.ajax({
    type: "DELETE",
    url: `/api/quizzes/delete/${quiz_id}`,
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

  questionElem.find(".optionInput").each(function() {
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
