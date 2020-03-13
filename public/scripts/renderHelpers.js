/*
|________________________________________________________________________________________
| Functions used to render new pages dynamically, using functions from builderHelpers.js |
|________________________________________________________________________________________|
|
*/

// Renders quizzes into <main> element
const renderQuizzes = function(quizzes) {
  currentScore = 0;
  questionNumber = 0;
  $("html").removeClass("quiz-background");
  $("body")
    .empty()
    .append(buildNavbar())
    .append(buildFeaturedHero());

  $("main").append(buildQuizRows(quizzes));
  if (loggedInUser) {
    $(".navbar-start")
      .append(`<a id="my-quizzes" class="navbar-item" onclick="fetchAndRenderUserQuizzes(${currentUserID})">
       My Quizzes
     </a>`);
  } else {
    $("#my-quizzes").hide();
  }
};

// Renders user quizzes into <main> element
const renderUserQuizzes = function(quizzes) {
  currentScore = 0;
  questionNumber = 0;
  $("html").removeClass("quiz-background");
  $("body")
    .empty()
    .append(buildNavbar())
    .append(buildMyHero());

  $("main").append(buildUserQuizRows(quizzes));
  if (loggedInUser) {
    $(".navbar-start")
      .append(`<a id="my-quizzes" class="navbar-item" onclick="fetchAndRenderUserQuizzes(${currentUserID})">
       My Quizzes
     </a>`);
  } else {
    $("#my-quizzes").hide();
  }
};

// Renders a question and associated options
const renderQuestion = questionAndOptions => {
  questionAndOptions.sort((a, b) => a.question_id - b.question_id);

  if (questionAndOptions.length === 1) {
    const quizInfo = {
      id: questionAndOptions[0].quiz_id,
      user_id: questionAndOptions[0].user_id,
      title: questionAndOptions[0].title,
      number_of_questions: questionAndOptions[0].number_of_questions
    };
    renderEndPage(quizInfo);
    return;
  }

  const divisionPoint = questionAndOptions[0].number_of_answers;
  currentOptions = questionAndOptions.slice(0, divisionPoint);

  shuffle(currentOptions);

  $("html").addClass("quiz-background");

  $("nav").remove();
  $("body").prepend(buildDarkNavbar());

  $("main")
    .empty()
    .append(buildQuestionPage(currentOptions));

  if (quizData.length === divisionPoint) {
    quizData.length = 1;
  } else {
    quizData = questionAndOptions.slice(divisionPoint);
  }

  // Timer for each question
  const correctAnswer = currentOptions.filter(option => option.is_correct)[0]
    .option;
  timer(10000, correctAnswer);
};

// Renders single quiz start page
const renderQuiz = function(quiz) {
  $("body")
    .empty()
    .append(buildDarkNavbar())
    .append(buildQuiz(quiz));

  if (currentUserID === quiz.user_id || currentUserID === 3) {
    $(".start-end-quiz").append(
      `<button id="delete-quiz" class="button is-large is-danger is-inverted is-light" onclick="removeQuiz(${quiz.id});fetchAndRenderQuizzes(${currentUserID})">Delete Quiz</button>`
    );
  }

  getScores({ user_id: currentUserID, id: quiz.id });
  getHighScore(currentUserID, quiz.id);
};

// Renders scores for a specific user
const renderScores = function(scores) {
  if (scores.length === 0) {
    $(
      ".previous-attempts"
    )[0].innerHTML = `<h3 class="title is-4 has-text-white">You haven't taken this quiz yet!</h3>
      <ul class="is-size-4"></ul>`;
  }

  for (let scoreObject of scores) {
    $(".previous-attempts > ul").append(
      `<li>${scoreObject.score}/${scoreObject.number_of_questions}</li>`
    );
  }
};

// Renders high score for a specific user
const renderHighScore = function(score) {
  $(".previous-attempts > ul").append(
    `<h4 class="title-is-4 has-text-white">Your high score:</h4> <li>${score.score}/${score.number_of_questions}</li>`
  );
};

// Renders the end page shown after user completes a quiz
const renderEndPage = quizData => {
  $("html").removeClass("quiz-background");
  $("body")
    .empty()
    .append(buildNavbar())
    .append(buildEndPage(quizData));

  getScores({ user_id: currentUserID, id: quizData.id });
  getHighScore(currentUserID, quiz.id);
};

// Renders the page that shows another user's result of a quiz
const renderShareResultPage = (quiz, username, score) => {
  $("body")
    .append(buildNavbar())
    .append(buildShareResultPage(quiz.id, quiz.title, username, score));
};

// Renders quiz creation form
const renderQuizForm = () => {
  $("body")
    .empty()
    .append(buildNavbar())
    .append(buildQuizInfoForm());

  if (loggedInUser) {
    $(".navbar-start")
      .append(`<a id="my-quizzes" class="navbar-item" onclick="fetchAndRenderUserQuizzes(${currentUserID})">
       My Quizzes
     </a>`);
  } else {
    $("#my-quizzes").hide();
  }
};

// Renders the elements (username, logout button, my quizzes button) to be shown when a user is logged in
const userLoggedIn = function(data) {
  loggedInUser = data.username;
  currentUserID = data.id;

  if (loggedInUser) {
    const loggedIn = `<div  id="loggedIn" class="columns is-vcentered">
    <p>Welcome, ${loggedInUser} <span id="current-user-id">${currentUserID}</span> </p>  &nbsp; <button id="logoutButton" class="button is-primary" action="renderLoginNav()">Logout</button>

    </div>
  </div>`;
    $("#loginFormContainer").replaceWith(loggedIn);
    $(".navbar-start")
      .append(`<a id="my-quizzes" class="navbar-item" onclick="fetchAndRenderUserQuizzes(${currentUserID})">
       My Quizzes
     </a>`);
  } else {
    $("#my-quizzes").hide();
  }
};

//Renders the elements (login form, login button) to be shown when a user is not logged in
const renderLoginNav = function() {
  const loginNav = `
  <div class="buttons" id="loginNav">
    <div id="loginFormContainer">
      <form class="columns is-vcentered" id="loginForm">
        <input required="required" id="username" type="text" class="input" placeholder="username">
        <button class="button is-primary" id="login" type="submit">Login</button>
        </form>
    </div>
  </div>
`;
  $("#loggedIn").replaceWith(loginNav);
  loggedInUser = null;
  currentUserID = null;
};
