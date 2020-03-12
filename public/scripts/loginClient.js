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
};

$(() => {
  login();
});
