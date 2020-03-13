/*
|_____________________________________________________________________
| Functions used to build html code which is used by renderHelpers.js |
|                                                                     |
| Auxiliary variables and functions used throughout the application   |
|_____________________________________________________________________|
|
*/

/*
|
| AUXILIARY FUNCTIONS AND VARIABLES
|
|___________________________________________
*/

// Keeps track of logged in user
let loggedInUser;

// Keeps track of logged in user's ID
let currentUserID;

// Holds all the questions and options for a quiz
let quizData;

// Holds current question's options
let currentOptions;

// Keeps track of the question number during a quiz
let questionNumber = 0;

// Keeps score of current quiz
let currentScore = 0;

// Escapes unsafe characters and returns safe html. To prevent XSS
const escape = str => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Shuffles any array, used while displaying options during a quiz
const shuffle = function(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Sets cancel button to true to stop the timer
const setCancelButton = function() {
  cancelButton = true;
};

// Resets flags used by timer.js, when a quiz starts
const setFlags = function() {
  cancelButton = false;
  clickTrack = false;
};

/*
|
| BUILDING FUNCTIONS
|
|___________________________________________
*/

// Builds the form used to register a new quiz (first page while creating new quiz)
const buildQuizInfoForm = () => {
  return `
  <main class="section">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            Quiz Creation
          </h1>
          <h2 class="subtitle">
            Unleash your imagination.
          </h2>
        </div>
      </div>
    </section>

    <form id="create-quiz" class="has-text-centered">
        <div class="field">
          <label class="label is-large">Title</label>
          <div class="control">
            <input
              name="title"
              id="title"
              class="input"
              type="text"
              required="required"
              placeholder="E.g. Sea Creatures"
            />
          </div>
        </div>

        <div class="field">
          <label class="label is-large">Description</label>
          <div class="control">
            <input
              name="description"
              id="description"
              class="input"
              required="required"
              placeholder="Tell us about your quiz!"
            ></input>
          </div>
        </div>

        <div class="field">
          <label class="label is-large">Picture</label>
          <div class="control">
            <input
              name="picture"
              id="picture-url"
              type="text"
              class="input"
              placeholder="URL of a relevant image"
            />
          </div>
        </div>

        <div class="field">
          <label class="label is-large">Number of questions</label>
          <div class="control">
            <input
              name="questions"
              id="num-questions"
              type="number"
              class="input"
              placeholder="1 to Infinity"
              required="required"
              min="1" />
          </div>
        </div>

        <div class="field">
          <label class="label is-large">Number of options per question</label>
          <div class="control">
            <input
              name="options"
              id="num-options"
              type="number"
              class="input"
              placeholder="2 to Infinity"
              required="required"
              min="2" />
          </div>
        </div>

        <div class="field">
          <label class="label is-large">Public?</label>
          <div class="control has-text-centered">
              <input
                name="public"
                id="public"
                type="checkbox"
                checked />
          </div>
        </div>

        <div class="field is-grouped">
          <div class="control has-text-centered">
            <button id="submit-quiz" class="button is-large is-primary">
              Submit
            </button>
            <button id="cancel-quiz" class="button is-large is-link is-light">
              Cancel
            </button>
          </div>
        </div>
  </main>
  `;
};

// Builds question creation form after a new quiz is created (second page while creating new quiz)
const buildQuizQuestionsForm = function(
  number_of_questions,
  number_of_options
) {
  let quizQuestionsForm = ``;

  for (let i = 1; i <= number_of_questions; i++) {
    quizQuestionsForm += `
    <div class="question-container">
      <div class="field">
        <label class="label is-large question-label">Question ${i}</label>
        <div class="control">
          <input type="text" required="required" id="question${i}" class="input question" />
        </div>
      </div>`;

    for (let j = 1; j <= number_of_options; j++) {
      if (j === 1) {
        quizQuestionsForm += `
        <div class="field">
          <label class="label is-large">Option ${j}</label>
          <div class="control">
            <input type="text" required="required" id="option${j}" class="input correct optionInput" placeholder="Correct option"/>
          </div>
        </div>`;
      } else {
        quizQuestionsForm += `
        <div class="field">
          <label class="label is-large">Option ${j}</label>
          <div class="control">
            <input type="text" required="required" id="option${j}" class="input optionInput" placeholder="Incorrect option" />
          </div>
        </div>`;
      }
    }

    quizQuestionsForm += `</div><br>`;
  }

  quizQuestionsForm += `
  <div class="field is-grouped">
    <div class="control submit-buttons has-text-centered">
      <button id="submit-questions" class="button is-primary is-large">Submit</button>
    </div>
  </div>
  <div>
    Quiz ID:
    <span id="quiz-id"></span>
  </div>
  `;

  return quizQuestionsForm;
};

// Builds rows of quizzes to be used in renderQuizzes (used in home page)
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

// Builds rows of user quizzes to be used in renderUserQuizzes
const buildUserQuizRows = quizzes => {
  let quizRows = `
  <div class="tile is-ancestor">
  `;

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

// Builds a quiz question page with associated options (while taking the quiz)
const buildQuestionPage = questionAndOptions => {
  let questionPage = `
  <!-- Question header -->

  <section class="hero question">

    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="is-size-1" id="timerHeading"><h1>
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

  return questionPage;
};

// Builds the starting quiz page (when you click on quiz, before starting it)
const buildQuiz = function(quiz) {
  let singleQuiz = `
  <main class="section">
    <section class="container quiz-background start-end-quiz has-text-centered">
      <!-- Quiz info -->
      <h1 class="title is-1 has-text-white ">
        ${escape(quiz.title)}
      </h1>
      <p class="is-size-3 has-text-black">${escape(quiz.description)}</p>
      <p class="is-size-4"><em><span class="total-question-number">${escape(
        quiz.number_of_questions
      )}</span> Questions</em></p>

      <!-- Start/share button -->
      <a class="button is-primary is-inverted is-large" onclick="setFlags();fetchQuizData(${
        quiz.id
      })">
        <strong>Start Quiz</strong>
      </a>
      <a class="button is-primary is-inverted is-outlined is-large share-button" data-clipboard-text="Check out this awesome quiz on https://quizwizz.herokuapp.com/?quiz=${
        quiz.id
      }">
        <strong>Share This Quiz</strong>
      </a>


    `;

  if (loggedInUser) {
    singleQuiz += `<!-- Previous scores -->
      <div class="previous-attempts">
        <h3 class="title is-4 has-text-white">Your most recent attempts at this quiz:</h3>
        <ul class="is-size-4">
        </ul>
      </div>
    </section>
  </main>`;

    let qid = quiz.id;
    let uid = currentUserID;
    setTimeout(() => {
      getHighScore(uid, qid);
    }, 20);
    $("#my-quizzes").show();
  } else {
    singleQuiz += `<!-- Previous scores -->
      <div class="previous-attempts">
        <h3 class="title is-4 has-text-white">Please log in to keep track of your scores.</h3>
        <ul class="is-size-4">
        </ul>
      </div>
    </section>
  </main>`;
    $("#my-quizzes").hide();
  }

  return singleQuiz;
};

// Builds the end page shown after quiz ends
const buildEndPage = quizInfo => {
  let endHTML = `
  <main class="section">

    <section class="container quiz-end-background start-end-quiz has-text-centered">

      <!-- Quiz info -->
      <h1 class="title is-1 has-text-white ">
        You completed ${quizInfo.title}!
      </h1>
      <p class="is-size-3 has-text-black">You scored ${currentScore}/${quizInfo.number_of_questions}</p>

      <!-- Share/Home button -->
      <a class="button is-primary is-inverted is-large share-button" data-clipboard-text="See if you can beat me on this quiz: https://quizwizz.herokuapp.com/?quiz=${quizInfo.id}&user=${loggedInUser}&score=${currentScore}/${quizInfo.number_of_questions}">
        <strong>Share Your Result</strong>
      </a>
      <a class="button is-primary is-inverted is-outlined is-large" onclick="fetchAndRenderQuizzes(${currentUserID})">
        <strong>Back To Home</strong>
      </a>

  `;
  if (loggedInUser) {
    endHTML += `<!-- Previous scores -->
      <div class="previous-attempts">
        <h3 class="title is-4 has-text-white">Your most recent attempts at this quiz:</h3>
        <ul class="is-size-4">
        </ul>
      </div>
    </section>

  </main>`;
    storeScore(quizInfo.id, currentUserID, currentScore);
    let qid = quizInfo.id;
    let uid = currentUserID;
    setTimeout(() => {
      getHighScore(uid, qid);
    }, 20);
    $("#my-quizzes").show();
  } else {
    endHTML += `<!-- Previous scores -->
      <div class="previous-attempts">
        <h3 class="title is-4 has-text-white">Please log in to keep track of your score!</h3>
        <ul class="is-size-4">
        </ul>
      </div>
    </section>
  </main>`;
    $("#my-quizzes").hide();
  }
  questionNumber = 0;
  currentScore = 0;
  return endHTML;
};

// Builds the page that's shown when a user shares the result of their attempt
const buildShareResultPage = (quizId, quizName, username, score) => {
  return `
  <main class="section">

    <section class="container quiz-end-background start-end-quiz has-text-centered">

      <!-- Quiz info -->
      <h1 class="title is-1 has-text-white ">
        ${escape(username)} completed ${escape(quizName)}!
      </h1>
      <p class="is-size-3 has-text-black">They scored ${escape(
        score
      )}<br>See if you can beat their score!</p>

      <!-- Share/Home button -->
      <a class="button is-primary is-inverted is-large" onclick="fetchQuizData(${escape(
        quizId
      )})">
        <strong>Take This Quiz</strong>
      </a>
      <a class="button is-primary is-inverted is-outlined is-large" onclick="fetchAndRenderQuizzes(${currentUserID})">
        <strong>Home Page</strong>
      </a>

    </section>

  </main>
  `;
};

// Builds the light colored navbar which is used in home etc.
const buildNavbar = () => {
  let navHTML = `
  <nav
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <!-- Brand logo and nav burger -->
    <div class="navbar-brand">
      <a class="navbar-item" onclick="fetchAndRenderQuizzes(${currentUserID})">
        <img src="../docs/logo.png" alt="quiz-wiz-logo">
      </a>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <!-- Left side nav items -->
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" onclick="fetchAndRenderQuizzes(${currentUserID})">
          Home
        </a>

        <a class="navbar-item" onclick="renderQuizForm()">
          Create Your Own Quiz
        </a>

        <a class="navbar-item" onclick="getRandomQuiz()">
          Random Quiz
        </a>
      </div>
      `;

  if (loggedInUser) {
    navHTML += `<div class="navbar-item" id="loggedIn">

        <p>Welcome, ${loggedInUser} <span id="current-user-id">${currentUserID}</span> </p> &nbsp; <button id="logoutButton" class="button is-primary is-light" action="renderLoginNav()">Logout</button>
         </div>
       </div>`;
    $("#my-quizzes").show();
  } else {
    navHTML += `<!-- Right side nav items -->
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" id="loginNav">
              <div id="loginFormContainer">
                <form class="columns is-vcentered" id="loginForm">
                  <input required="required" id="username" type="text" class="input" placeholder="username">
                  <button class="button is-primary" id="login" type="submit">Login</button>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>`;
    $("#my-quizzes").hide();
  }
  return navHTML;
};

// Builds the dark navbar which is used in starting quiz and taking quiz pages
const buildDarkNavbar = () => {
  return `
  <nav class="navbar is-dark is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" onclick="setCancelButton();fetchAndRenderQuizzes(${currentUserID});">
        <h1 class="title is-1 has-text-info"><i class="far fa-times-circle"></i></h1>
      </a>
    </div>
  </nav>
  `;
};

// Builds the hero section that says 'featured quizzes';
const buildFeaturedHero = () => {
  return `
  <main id="home" class="section">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            Featured Quizzes
          </h1>
          <h2 class="subtitle">
            Do you have what it takes to answer these questions?
          </h2>
        </div>
      </div>
    </section>
  </main>
  `;
};

// Builds the hero section that says 'my quizzes;
const buildMyHero = () => {
  return `
  <main id="home" class="section">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            My Quizzes
          </h1>
          <h2 class="subtitle">
            How tough are your own quizzes?
          </h2>
        </div>
      </div>
    </section>
  </main>
  `;
};
