const login = function() {
  // on login
  $("body").on("submit", function(e) {
    e.preventDefault();
    const userName = $("#username").val();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: { userName },
      success: userLoggedIn,
      dataType: "json"
    });
  });
  // on logout
  $("body").on("click", "#logoutButton", function(e) {
    e.preventDefault();

    fetchAndRenderQuizzes(currentUserID);
    //return to main page, prevents clicking "my quizzes" and staying there after logging out

    $.ajax({
      type: "POST",
      url: "/api/logout",
      data: {},
      success: renderLoginNav,
      dataType: "json"
    });
  });
};

$(() => {
  login();
});
