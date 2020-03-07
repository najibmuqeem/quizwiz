/*
*
All the functions used to render items on the page dynamically
*
*/

// Escapes unsafe characters and returns safe html. To prevent XSS
const escape = str => {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Render quizzes into <main> element
const renderQuizzes = function(quizzes) {
  console.log("rendered",quizzes);

  const allQuizzes = `
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <a href=""><p class="title">${escape(quizzes[0].title)}</p></a>
        <p class="subtitle">Who is Leonardo da Vinci?</p>
        <div class="content">
          <p>5 questions</p>
        </div>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">History Quiz</p>
        <p class="subtitle">When did World War 2 happen?</p>
        <div class="content">
          <p>5 questions</p>
        </div>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">Football Quiz</p>
        <p class="subtitle">Who won the 34th Super Bowl?</p>
        <div class="content">
          <p>5 questions</p>
        </div>
      </article>
    </div>
  </div>

  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">Movie Quiz</p>
        <p class="subtitle">How many Oscars did Meryl Streep win?</p>
        <div class="content">
          <p>5 questions</p>
        </div>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">Tennis Quiz</p>
        <p class="subtitle">How old was Roger Federer when he won his second Grand Slam?</p>
        <div class="content">
          <p>5 questions</p>
        </div>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">Music Quiz</p>
        <p class="subtitle">What does the fox say?</p>
        <div class="content">
          <p>5 questions</p>
        </div>
      </article>
    </div>
  </div>
  `

  $('main').append(allQuizzes);
};



// render specific quiz
const renderQuiz = function(quiz) {

};
