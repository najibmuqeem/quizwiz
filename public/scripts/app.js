$(() => {

  // Open/close nav menu when navbar-burger is clicked
  // For mobile only
  $('.navbar-burger').click(() => {
    $('.navbar-burger').toggleClass('is-active');
    $('.navbar-menu').toggleClass('is-active');
  });

  fetchAndRenderQuizzes();
});
