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

// Escapes unsafe characters and returns safe html. To prevent XSS
const escape = str => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Holds all the questions and options for a quiz
// Has a value when user starts a quiz
let quizData;

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
        )});" onclick="alert('yes')">
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

// render specific quiz
const renderQuiz = function(quiz) {};

// Renders a question and associated options
const renderQuestion = (quizData) => {
  console.log(quizData);
};
