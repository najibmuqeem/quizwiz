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
        <article class="tile is-child box" style="background-image: linear-gradient(180deg, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0) 100%), url(${escape(quiz.picture_url)});" onclick="fetchSingleQuiz(${quiz.id})">
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
  console.log(quizRows);
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
  console.log("rendered",quizzes);
  $('main').append(buildQuizRows(quizzes));
};



// render specific quiz
const renderQuiz = function(quiz) {
  // Render single quiz
  $('main').replaceWith(buildQuiz(quiz));

};

// To build quiz interface for user
const buildQuiz = function(quiz) {
  let singleQuiz = `<section class="container quiz-background start-end-quiz has-text-centered">

   <!-- Quiz info -->
   <h1 class="title is-1 has-text-white ">
     ${quiz.title}
   </h1>
   <p class="is-size-3 has-text-black">${quiz.description}</p>
   <p class="is-size-4"><em><span class="total-question-number">${quiz.number_of_questions}</span> Questions</em></p>

   <!-- Start button -->
   <a class="button is-primary is-inverted is-large" href="./take-quiz.html">
     <strong>Start Quiz</strong>
   </a>

   <!-- Previous scores -->
   <div class="previous-attempts">
     <h3 class="title is-4 has-text-white">Your previous attempts at this quiz:</h3>
     <ul class="is-size-4">
      </ul>
   </div>

 </section>`;
  return singleQuiz;

};

// To render scores for a user
const renderScores = function(scores) {
  for (let scoreObject of scores) {
    $(".previous-attempts > ul").append(`<li>${scoreObject.score}/5</li>`);
  }
};
