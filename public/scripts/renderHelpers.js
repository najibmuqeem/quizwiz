/*
|_________________________________________________________________
| All the functions used to render items on the page dynamically  |
|_________________________________________________________________|
|
*/

/*
|
| AUXILIARY FUNCTIONS
|
|___________________________________________
*/

// Escapes unsafe characters and returns safe html. To prevent XSS
const escape = str => {
  const div = document.createElement('div');
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
const buildQuizRows = (quizzes) => {
  let quizRows = `
  <div class="tile is-ancestor">
  `;

  quizzes = quizzes.filter(quiz => quiz.is_public)

  quizzes.forEach((quiz, index, quizzes) => {
    if (index % 3 === 0 && index !== 0) {
      quizRows += `
      </div>
      <div class="tile is-ancestor">
      `;
    }

    quizRows += `
      <div class="tile is-parent">
        <a><article class="tile is-child box" style="background-image: linear-gradient(180deg, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0) 100%), url(${escape(quiz.picture_url)});">
          <p class="title">${escape(quiz.title)}</p>
          <p class="subtitle">${escape(quiz.description)}</p>
          <div class="content">
            <p>${escape(quiz.number_of_questions)} questions</p>
          </div>
        </article></a>
      </div>
    `;

    if (index === quizzes.length - 1) {
      quizRows += `
      </div>
      `
    }
  });

  return quizRows;
}

/*
|
| RENDERING FUNCTIONS
|
|___________________________________________
*/

// Renders quizzes into <main> element
const renderQuizzes = function(quizzes) {
  console.log("rendered",quizzes);
  $('main').append(buildQuizRows(quizzes));
};



// render specific quiz
const renderQuiz = function(quiz) {

};
