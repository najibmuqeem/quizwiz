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
    e.stopPropagation();

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

    $("#create-quiz").hide();

    const quiz = {
      title,
      description,
      picture_url,
      number_of_questions,
      is_public,
      user_id: 1
    };

    const quiz_id = createQuiz(quiz);

    let html = ``;

    for (let i = 1; i <= number_of_questions; i++) {
      html += `
              <div class="field">
                <label class="label">Question ${i}</label>
                <div class="control">
                  <input type="text" class="input question" />
                </div>
              </div>`;
      for (let j = 1; j <= number_of_options; j++) {
        if (j === 1) {
          html += `
                  <div class="field">
                    <label class="label">Option ${j}</label>
                    <div class="control">
                      <input type="text" class="input correct option" placeholder="Correct option"/>
                    </div>
                  </div>`;
        } else {
          html += `
                  <div class="field">
                    <label class="label">Option ${j}</label>
                    <div class="control">
                      <input type="text" class="input option" placeholder="Incorrect option" />
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
              <span id="quiz-id">${quiz_id}</span>
            </div>`;
    $("#questions").append(html);
  });

  // submit questions
  $("#questions").on("submit", e => {
    e.preventDefault();

    const number_of_questions = $(".question").length;
    const number_of_options = $(".option").length;
    const quiz_id = Number($("#quiz-id").val());

    let is_correct = false;
    let question = "";
    let options = [];
    let counter = 1;

    for (let i = 0; i < number_of_questions; i++) {
      question = $(".question")[i].val();
      let question_id = addQuestionToQuiz(quiz_id, question);
      for (
        let j = counter - 1;
        j < (counter * number_of_options) / number_of_questions;
        j++
      ) {
        if ($(".option")[j].hasClass("correct")) {
          is_correct = true;
        } else {
          is_correct = false;
        }
        options.push($(".option")[j].val());
        addOptionToQuestion(question_id, options[j], is_correct);
      }
      options = [];
      counter += number_of_options / number_of_questions;
    }
  });
});
