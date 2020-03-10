$(() => {

  // Grab any url query params. To be used when sharing quizzes
  $.urlParam = function(name){
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);

    if (results) {
      return results[1];
    } else {
      return null;
    }
  }

  // Render a specific quiz page if a quiz query was in the URL
  // Otherwise, render home page
  if ($.urlParam('quiz')) {
    fetchSingleQuiz($.urlParam('quiz'));
  } else {
    fetchAndRenderQuizzes();
  }

  // Open/close nav menu when navbar-burger is clicked
  // For mobile only
  $("body").on("click", ".navbar-burger", () => {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Initiate .share-button elements as a clipboard object
  new ClipboardJS('.share-button');

  // Notify user when sharing info is copied to clipboard
  $('body').on('click', '.share-button', () => {
    alert('Copied to clipboard!\nPaste anywhere to share this quiz!');
  })

  // cancel quiz button
  $("body").on("click", "#cancel-quiz", e => {
    e.preventDefault();
    clearInputValues();
    fetchAndRenderQuizzes();
  });

  // cancel questions button
  $("body").on("click", "#cancel-questions", e => {
    e.preventDefault();
    removeQuiz(Number($("#quiz-id")[0].innerText));
    fetchAndRenderQuizzes();
  });


  $("body").on("submit", "#create-quiz", e => {
    e.preventDefault();
    const form = $("#create-quiz")[0];

    const title = form.title.value;
    const description = form.description.value;
    const picture_url = form.picture.value;
    const number_of_questions = form.questions.value;
    const number_of_options = form.options.value;
    let is_public;
    if ($("#public").prop("checked")) {
      is_public = true;
    } else {
      is_public = false;
    }

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
    $("#cancel-quiz").hide();

    createQuiz(quiz);

    $('main').append(`</form><form id="questions"></form>`);
    $("#questions").append(buildQuizQuestionsForm(number_of_questions, number_of_options));
    $(".buttons").append(
      `<button id="cancel-questions" class="button is-link is-light">Cancel</button>`
    );
  });

  // submit questions
  $("body").on("submit", "#questions", e => {
    e.preventDefault();

    const number_of_answers = $(".optionInput").length / $(".question").length;
    const quiz_id = Number($("#quiz-id")[0].innerText);

    $(".question-container").each(function() {
      let $questionElem = $(this);
      $(this)
        .find(".question")
        .each(function() {
          addQuestion(
            $questionElem,
            quiz_id,
            $(this)[0].value,
            number_of_answers
          );
        });
    });
    fetchSingleQuiz(quiz_id);
  });

  // cancel quiz button
  $("#cancel-quiz").click(e => {
    e.preventDefault();
    clearInputValues();
  });

  // cancel questions button, doesn't work yet
  // $("#cancel-questions").click(e => {
  //   e.preventDefault();
  //   removeQuiz(Number($("#quiz-id")[0].innerText));
  //   $("#questions").hide();
  //   $("#create-quiz").show();
  // });

  // Checks if user chose correct answer, increments score accordingly, goes to next question
  $("body").on("click", ".option", () => {
    const userAnswer = event.target.innerText;
    const correctAnswer = currentOptions.filter(option => option.is_correct)[0]
      .option;

    if (userAnswer === correctAnswer) {
      currentScore++;
    }

    $(".option")
      .filter(function() {
        return (
          $(this)
            .children()
            .text() === userAnswer
        );
      })
      .css("backgroundColor", "#e74c3c");

    $(".option")
      .filter(function() {
        return (
          $(this)
            .children()
            .text() === correctAnswer
        );
      })
      .css("backgroundColor", "#2ecc71");

    $(".option").css("pointer-events", "none");

    setTimeout(() => {
      renderQuestion(quizData);
    }, 1000);
  });
});

const clearInputValues = function() {
  $("input").val("");
  $("textarea").val("");
  $("#public").prop("checked", false);
};
