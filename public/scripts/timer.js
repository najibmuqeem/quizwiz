const timer = function(allottedTime) {
  let startTime = Date.now();
  let displaystring = "";
  let allottedTimeCopy = allottedTime;
  // Setting the initial value of timer
  const hours = allottedTime / (1000 * 60 * 60);
  allottedTime %= (1000 * 60 * 60);
  const minutes = allottedTimeCopy / (1000 * 60);
  allottedTimeCopy %= (1000 * 60);
  const seconds = allottedTimeCopy / 1000;

  if (hours >= 1) {
    displaystring += Math.round(hours);
  } else {
    displaystring += 0;
  }

  if (minutes >= 1) {
    displaystring += ":" + Math.round(minutes);
  } else {
    displaystring += ":" + 0;
  }

  if (seconds >= 1) {
    displaystring += ":" + Math.round(seconds);
  } else {
    displaystring += ":" + 0;
  }

  // Initial display of time
  if (!clickTrack) {
    $("#timerHeading").text(displaystring);
    $("#timerHeading").css({color:'white'});
  }
  // Updating timer after each second
  const t = setInterval(() => {
    let currentTime = Date.now();
    let usedTime = currentTime - startTime;
    displaystring = "";
    let remainingTime = allottedTime - usedTime;

    const hours = remainingTime / (1000 * 60 * 60);
    remainingTime %= (1000 * 60 * 60);
    const minutes = remainingTime / (1000 * 60);
    remainingTime %= (1000 * 60);
    const seconds = remainingTime / 1000;
    if (hours >= 1) {
      displaystring += Math.round(hours);
    } else {
      displaystring += 0;
    }
    if (minutes >= 1) {
      displaystring += ":" + Math.round(minutes);
    } else {
      displaystring += ":" + 0;
    }
    if (seconds >= 0.5) {  // To avoid the time taken for computing the other statements in milli seconds
      displaystring += ":" + Math.round(seconds);
    } else {
      displaystring += ":" + 0;
    }

    // clear timer and go to next question
    if (usedTime >= allottedTime && !clickTrack) {
      $("#timerHeading").text(displaystring);
      clearTimeout(t);
      renderQuestion(quizData);
      return;
    }

    //clear timer
    if (clickTrack) {
      clearTimeout(t);
      clickTrack = false;
      return;
    }

    // Displaying time
    $("#timerHeading").text(displaystring);
    $("#timerHeading").css({color:'white'});
  }, 1000);
};
