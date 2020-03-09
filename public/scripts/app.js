$(() => {
  // Open/close nav menu when navbar-burger is clicked
  // For mobile only
  $(".navbar-burger").click(() => {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  fetchAndRenderQuizzes();

  //submit quiz
  $("#create-quiz").on("submit", e => {
    e.preventDefault();

    const title = $("#create-quiz")[0].title.value;
    const description = $("#create-quiz")[0].description.value;
    const picture_url = $("#create-quiz")[0].picture.value;
    let is_public;
    if ($("#public").prop("checked")) {
      is_public = true;
    } else {
      is_public = false;
    }
    const number_of_questions = $("#create-quiz")[0].questions.value;
    const number_of_options = $("#create-quiz")[0].options.value;
    const quiz = {
      title,
      description,
      picture_url,
      number_of_questions,
      is_public,
      user_id: 1
    };

    clearInputValues();

    $("#create-quiz").hide();

    createQuiz(quiz);

    $("#questions").append(createHTML(number_of_questions, number_of_options));
  });

  // submit questions
  $("#questions").on("submit", e => {
    e.preventDefault();

    const number_of_answers = $(".option").length / $(".question").length;
    const quiz_id = Number($("#quiz-id")[0].innerText);

    $(".question-container").each(function(i) {
      let $this = $(this);
      $(this)
        .find(".question")
        .each(function(i) {
          addQuestion($this, quiz_id, $(this)[0].value, number_of_answers);
        });
    });
  });

  // Checks if user chose correct answer, increments score accordingly, goes to next question
  $('body').on('click', '.option', () => {
    const userAnswer = event.target.innerText;
    const correctAnswer = currentOptions.filter(option => option.is_correct)[0].option;

    if (userAnswer === correctAnswer) {
      currentScore++;
    }

    $('.option').filter(function() {
      return $(this).children().text() === userAnswer;
    }).css('backgroundColor', 'red');

    $('.option').filter(function() {
      return $(this).children().text() === correctAnswer;
    }).css('backgroundColor', 'green');

    $('.option').css('pointer-events', 'none');

    setTimeout(() => {
      renderQuestion(quizData);
    }, 1000);
  });

});

// Keeps score of current quiz
let currentScore = 0;

const clearInputValues = function() {
  $("input").val("");
  $("textarea").val("");
  $("#public").prop("checked", false);
};

const createHTML = function(number_of_questions, number_of_options) {
  let html = ``;

  for (let i = 1; i <= number_of_questions; i++) {
    html += `<div class="question-container">
                <div class="field">
                  <label class="label">Question ${i}</label>
                  <div class="control">
                    <input type="text" id="question${i}" class="input question" />
                  </div>
                </div>`;
    for (let j = 1; j <= number_of_options; j++) {
      if (j === 1) {
        html += `
                    <div class="field">
                      <label class="label">Option ${j}</label>
                      <div class="control">
                        <input type="text" id="option${j}" class="input correct option" placeholder="Correct option"/>
                      </div>
                    </div>`;
      } else {
        html += `
                    <div class="field">
                      <label class="label">Option ${j}</label>
                      <div class="control">
                        <input type="text" id="option${j}" class="input option" placeholder="Incorrect option" />
                      </div>
                    </div>`;
      }
    }
    html += `</div><br>`;
  }

  html += `
              <div class="field is-grouped">
                <div class="control">
                  <button id="submit-questions" class="button is-primary">Submit</button>
                  <button class="button is-link is-light">Cancel</button>
                </div>
              </div>
              <div>
                Quiz ID:
                <span id="quiz-id"></span>
              </div>
            `;

  return html;
};
