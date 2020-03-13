let clickTrack = false;
let cancelButton = false;
$(() => {
  // Trims spaces in username field
  $("body").on("change", "#username", () => {
    $("#username").val(
      $("#username")
        .val()
        .trim()
    );
  });

  // Grab any url query params. To be used when sharing quizzes
  $.urlParam = function(name) {
    const results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
      window.location.href
    );

    if (results) {
      return results[1];
    } else {
      return null;
    }
  };

  // Render a quiz result page if quiz, username, and score queries were in URL
  // Render a specific quiz page if only a quiz query was in the URL
  // Else, render home page
  if ($.urlParam("quiz") && $.urlParam("user") && $.urlParam("score")) {
    if ($.urlParam("user") === "undefined" || $.urlParam("user") === "null") {
      fetchQuizToShare($.urlParam("quiz"), "Your friend", $.urlParam("score"));
    } else {
      fetchQuizToShare(
        $.urlParam("quiz"),
        $.urlParam("user"),
        $.urlParam("score")
      );
    }
  } else if ($.urlParam("quiz")) {
    fetchSingleQuiz($.urlParam("quiz"));
  } else {
    fetchAndRenderQuizzes(currentUserID);
  }

  // Open/close nav menu when navbar-burger is clicked
  // For mobile only
  $("body").on("click", ".navbar-burger", () => {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Initiate .share-button elements as a clipboard object
  new ClipboardJS(".share-button");

  // Notify user when sharing info is copied to clipboard
  $("body").on("click", ".share-button", () => {
    alert("Copied to clipboard!\nPaste anywhere to share this quiz!");
  });

  // cancel quiz button
  $("body").on("click", "#cancel-quiz", e => {
    e.preventDefault();
    clearInputValues();
    fetchAndRenderQuizzes(currentUserID);
  });

  // cancel questions button
  $("body").on("click", "#cancel-questions", e => {
    e.preventDefault();
    removeQuiz(Number($("#quiz-id")[0].innerText));
    fetchAndRenderQuizzes(currentUserID);
  });

  // adds quiz to database and prepares page for receiving questions and options
  $("body").on("submit", "#create-quiz", e => {
    e.preventDefault();
    const form = $("#create-quiz")[0];
    const title = form.title.value;
    const description = form.description.value;
    const picture_url = form.picture.value;
    const number_of_questions = form.questions.value;
    const number_of_options = form.options.value;

    let is_public;
    $("#public").prop("checked") ? (is_public = true) : (is_public = false);
    let user_id;
    if ($("#current-user-id")[0]) {
      user_id = $("#current-user-id")[0].textContent;
    } else {
      alert(
        "Please log in to create quizzes and keep track of your quiz scores."
      );
      user_id = null;
      currentUserID = null;
      loggedInUser = null;
      $("#username").focus();
      return;
    }

    const quiz = {
      title,
      description,
      picture_url,
      number_of_questions,
      is_public,
      user_id
    };

    clearInputValues();

    $("#create-quiz").hide();
    $("#cancel-quiz").hide();

    createQuiz(quiz);

    $("main").append(
      `</form><form id="questions" class="has-text-centered"></form>`
    );
    $("#questions").append(
      buildQuizQuestionsForm(number_of_questions, number_of_options)
    );
    $(".submit-buttons").append(
      `<button id="cancel-questions" class="button is-large is-link is-light">Cancel</button>`
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

  // Checks if user chose correct answer, increments score accordingly, goes to next question
  $("body").on("click", ".option", () => {
    clickTrack = true; // Updating clickTrack when user selects an answer
    const userAnswer = event.target.innerText;
    const correctAnswer = currentOptions.filter(option => option.is_correct)[0]
      .option.trim();

    if (userAnswer === correctAnswer) {
      currentScore++;
    }

    $(".option")
      .filter(function() {
        return (
          $(this)
            .children()
            .text().trim() === userAnswer
        );
      })
      .css("backgroundColor", "#e74c3c");

    $(".option")
      .filter(function() {
        return (
          $(this)
            .children()
            .text().trim() === correctAnswer
        );
      })
      .css("backgroundColor", "#2ecc71");

    $(".option").css("pointer-events", "none");

    setTimeout(() => {
      renderQuestion(quizData);
    }, 1000);
  });
});

// clears user input
const clearInputValues = function() {
  $("input").val("");
  $("textarea").val("");
  $("#public").prop("checked", false);
};
