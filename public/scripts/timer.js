const timer = function(allottedTime, correctAnswer) {
  let startTime = Date.now();
  let displaystring = "";
  let allottedTimeCopy = allottedTime;
  const seconds = allottedTimeCopy / 1000;
  if (seconds >= 1) {
    displaystring += Math.round(seconds);
  } else {
    displaystring += 0;
  }
  // Initial display of time
  if (!clickTrack) {
    $("#timerHeading").text(displaystring);
    $("#timerHeading").css({ color: 'white' });
  }
  // Updating timer after each second
  const t = setInterval(() => {
    let currentTime = Date.now();
    let usedTime = currentTime - startTime;
    displaystring = "";
    let remainingTime = allottedTime - usedTime;
    const seconds = remainingTime / 1000;
    if (seconds >= 0.5) {  // To avoid the time taken for computing the other statements in milli seconds
      displaystring += Math.round(seconds);
    } else {
      displaystring += 0;
    }
    // clear timer and go to next question
    if (usedTime >= allottedTime && !clickTrack && !cancelButton) {
      $("#timerHeading").text(displaystring);
      clearTimeout(t);
      $(".option").css("pointer-events", "none");
      $(".option")
        .filter(function() {
          return (
            $(this)
              .children()
              .text() === correctAnswer
          );
        })
        .css("backgroundColor", "#f1c40f");
      setTimeout(() => {
        renderQuestion(quizData);
      }, 1500);
      return;
    }
    //clear timer
    if (clickTrack) {
      clearTimeout(t);
      clickTrack = false;
      return;
    }
    if (cancelButton) {
      clearTimeout(t);
      cancelButton = false;
      return;
    }
    // Displaying time
    $("#timerHeading").text(displaystring);
    $("#timerHeading").css({ color: 'white' });
    // Changing border color depending on time left
    if (Number(displaystring) < 3) {
      $("#timerHeading").css('border-image', 'linear-gradient(180deg, rgb(170, 47, 17), rgb(209, 15, 9)) 1');
    } else if (Number(displaystring) < 5) {
      $("#timerHeading").css('border-image', 'linear-gradient(180deg, rgb(170, 47, 17), rgb(221, 218, 40)) 1');
    } else if (Number(displaystring) < 7) {
      $("#timerHeading").css('border-image', 'linear-gradient(180deg, rgb(219, 207, 41), rgb(221, 218, 40)) 1');
    } else if (Number(displaystring) < 9) {
      $("#timerHeading").css('border-image', 'linear-gradient(180deg, rgb(219, 207, 41), rgb(27, 168, 69)) 1');
    }
  }, 1000);
};
