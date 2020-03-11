const logout = function() {
  $("#logout").click(e => {
    e.preventDefault();

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
