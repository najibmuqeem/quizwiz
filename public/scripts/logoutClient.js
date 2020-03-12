const logout = function() {
  // on logout
  $("body").on("click", "#logoutButton", function(e) {
    e.preventDefault();

    fetchAndRenderQuizzes(currentUserID);
    $("#my-quizzes").hide();
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
  logout();
});
