$(() => {
  // Open/close nav menu when navbar-burger is clicked
  // For mobile only
  $(".navbar-burger").click(() => {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // fetchAndRenderQuizzes();

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

    $("#description").val("");
    $("#picture-url").val("");
    $("#title").val("");
    $("#num-questions").val("");
    $("#num-options").val("");
    $("#public").prop("checked", false);

    $("#create-quiz").hide();

    const quiz = {
      title,
      description,
      picture_url,
      number_of_questions,
      is_public,
      user_id: 1
    };

    let html = ``;

    createQuiz(quiz);

    for (let i = 1; i <= number_of_questions; i++) {
      html += `
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
      html += `<br>`;
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
    $("#questions").append(html);
  });

  // submit questions
  $("#questions").on("submit", e => {
    e.preventDefault();

    const number_of_answers = $(".option").length / $(".question").length;
    const quiz_id = Number($("#quiz-id")[0].innerText);

    for (const question of $(".question")) {
      addQuestion(quiz_id, question.value, number_of_answers);
    }
  });
});
