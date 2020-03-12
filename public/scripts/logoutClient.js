const logout = function() {
  $("#logout").click(e => {
    e.preventDefault();

    fetchAndRenderQuizzes();

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
