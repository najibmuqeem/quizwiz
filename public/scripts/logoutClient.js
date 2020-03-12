const logout = function() {
  $("#logout").click(e => {
    e.preventDefault();

    fetchAndRenderQuizzes(${currentUserID});

    $.ajax({
      type: "POST",
      url: "/api/logout",
      data: {},
      dataType: "json"
    });
  });
};

$(() => {
  logout();
});
