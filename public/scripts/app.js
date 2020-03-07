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
    const pictureURL = $("#create-quiz")[0].picture.value;
    let isPublic;
    if ($("#public").prop("checked")) {
      isPublic = true;
    } else {
      isPublic = false;
    }
    const numQuestions = $("#create-quiz")[0].questions.value;
    const numOptions = $("#create-quiz")[0].options.value;

    $("#description").val("");
    $("#picture-url").val("");
    $("#title").val("");
    $("#num-questions").val("");
    $("#num-options").val("");

    $("#create-quiz").hide();

    const quiz = {
      title,
      description,
      pictureURL,
      numQuestions,
      isPublic,
      userID: 1
    };

    const quizID = createQuiz(quiz);

    let html = ``;

    for (let i = 1; i <= numQuestions; i++) {
      html += `
              <div class="field">
                <label class="label">Question ${i}</label>
                <div class="control">
                  <input type="text" class="input question" />
                </div>
              </div>`;
      for (let j = 1; j <= numOptions; j++) {
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
              <span id="quiz-id">${quizID}</span>
            </div>`;
    $("#questions").append(html);
  });

  // submit questions
  $("#questions").on("submit", e => {
    e.preventDefault();

    const numQuestions = $(".question").length;
    const numOptions = $(".option").length;
    const quizID = Number($("#quiz-id").val());

    let isCorrect = false;
    let question = "";
    let options = [];
    let counter = 1;

    for (let i = 0; i < numQuestions; i++) {
      question = $(".question")[i].val();
      let questionID = addQuestionToQuiz(quizID, question);
      for (
        let j = counter - 1;
        j < (counter * numOptions) / numQuestions;
        j++
      ) {
        if ($(".option")[j].hasClass("correct")) {
          isCorrect = true;
        } else {
          isCorrect = false;
        }
        options.push($(".option")[j].val());
        addOptionToQuestion(questionID, options[j], isCorrect);
      }
      options = [];
      counter += numOptions / numQuestions;
    }
  });
});
