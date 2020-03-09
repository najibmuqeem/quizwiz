/*
|_________________________________________________________________
| All the functions used to render items on the page dynamically  |
|_________________________________________________________________|
|
*/

/*
|
| AUXILIARY FUNCTIONS AND VARIABLES
|
|___________________________________________
*/

// Holds all the questions and options for a quiz
let quizData;

// Holds current question's options
let currentOptions;

// Keeps track of the question number during a quiz
let questionNumber = 0;

// Escapes unsafe characters and returns safe html. To prevent XSS
const escape = str => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/*
|
| BUILDING FUNCTIONS
|
|___________________________________________
*/

// Builds rows of quizzes to be used in renderQuizzes
const buildQuizRows = quizzes => {
  let quizRows = `
  <div class="tile is-ancestor">
  `;

  quizzes = quizzes.filter(quiz => quiz.is_public);

  quizzes.forEach((quiz, index, quizzes) => {
    if (index % 3 === 0 && index !== 0) {
      quizRows += `
      </div>
      <div class="tile is-ancestor">
      `;
    }

    quizRows += `
      <div class="tile is-parent">
        <article class="tile is-child box" style="background-image: linear-gradient(180deg, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0) 100%), url(${escape(
          quiz.picture_url
        )});" onclick="fetchSingleQuiz(${quiz.id})">
          <p class="title">${escape(quiz.title)}</p>
          <p class="subtitle">${escape(quiz.description)}</p>
          <div class="content">
            <p>${escape(quiz.number_of_questions)} questions</p>
          </div>
        </article>
      </div>
    `;

    if (index === quizzes.length - 1) {
      quizRows += `
      </div>
      `;
    }
  });

  return quizRows;
};

// Builds a quiz question page with associated options
const buildQuestionPage = questionAndOptions => {
  $("html").addClass("quiz-background");

  let questionPage = `
  <!-- Question header -->
  <section class="hero question">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title is-2 has-text-white">
          ${escape(questionAndOptions[0].question)}
        </h1>
      </div>
    </div>
  </section>

  <div class="tile is-ancestor has-text-centered">
  `;

  questionAndOptions.forEach((element, index, array) => {
    questionPage += `
    <div class="tile is-parent">
      <article class="tile is-child box option">
        <p class="title">${element.option}</p>
      </article>
    </div>
    `;

    if (index === array.length - 1) {
      questionPage += `
      </div>
      `;
    }
  });

  questionPage += `
  <div class="content has-text-right is-size-3">
    <p>
      Question <strong>${++questionNumber}</strong> of <strong>${
    questionAndOptions[0].number_of_questions
  }</strong>
    </p>
  </div>
  `;

  if (questionNumber === questionAndOptions[0].number_of_questions) {
    questionNumber = 0;
  }

  return questionPage;
};

// Builds the starting quiz page
const buildQuiz = function(quiz) {
  let singleQuiz = `
  <main class="section">
    <section class="container quiz-background start-end-quiz has-text-centered">
      <!-- Quiz info -->
      <h1 class="title is-1 has-text-white ">
        ${escape(quiz.title)}
      </h1>
      <p class="is-size-3 has-text-black">${escape(quiz.description)}</p>
      <p class="is-size-4"><em><span class="total-question-number">${escape(quiz.number_of_questions)}</span> Questions</em></p>

      <!-- Start button -->
      <a class="button is-primary is-inverted is-large" onclick="fetchQuizData(${quiz.id})">
        <strong>Start Quiz</strong>
      </a>

      <!-- Previous scores -->
      <div class="previous-attempts">
        <h3 class="title is-4 has-text-white">Your previous attempts at this quiz:</h3>
        <ul class="is-size-4">
        </ul>
      </div>
    </section>
  </main>
    `;

  return singleQuiz;
};

// Builds the dark navbar which is used in starting quiz and taking quiz (question) pages
const buildDarkNavbar = () => {
  return `
  <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <h1 class="title is-1 has-text-info"><i class="far fa-times-circle"></i></h1>
      </a>
    </div>
  </nav>
  `
};

/*
|
| RENDERING FUNCTIONS
|
|___________________________________________
*/

// Renders quizzes into <main> element
const renderQuizzes = function(quizzes) {
  $("#home").append(buildQuizRows(quizzes));
};

// Renders a question and associated options
const renderQuestion = (questionAndOptions) => {
  if (questionAndOptions.length === 0) {
    console.log('zerooo');
    return;
  }

  const divisionPoint = questionAndOptions[0].number_of_answers;

  currentOptions = questionAndOptions.slice(0, divisionPoint);
  $("main")
    .empty()
    .append(buildQuestionPage(currentOptions));

  quizData = questionAndOptions.slice(divisionPoint);
}

// Renders single quiz start page
const renderQuiz = function(quiz) {
  $('body').empty();
  $('body').append(buildDarkNavbar());
  $('body').append(buildQuiz(quiz));
};
// To render scores for a user
const renderScores = function(scores) {
  for (let scoreObject of scores) {
    $(".previous-attempts > ul").append(`<li>${scoreObject.score}/5</li>`);
  }
};
