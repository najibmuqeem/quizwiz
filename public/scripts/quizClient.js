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
// Post question to quiz
const addQuestion = function(quiz_id, question, number_of_answers) {
  $.ajax({
    type: "POST",
    url: "/api/questions",
    data: { quiz_id, question, number_of_answers },
    success: data => {
      addOptions(data.id, number_of_answers);
    },
    dataType: "json"
  });
};

const addOptions = function(question_id, number_of_answers) {
  let options = [];
  for (const option of $(".option")) {
    options.push(option.value);
  }
  for (let i = 1; i <= number_of_answers; i++) {
    if ($(`#option${i}`).hasClass("correct")) {
      is_correct = true;
    } else {
      is_correct = false;
    }
    addOptionToQuestion(question_id, options[i], is_correct);
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
}};
