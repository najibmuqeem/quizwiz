const login = function() {

  $("#login").click((e) => {

    e.preventDefault();
    const userName = $("#username").val();
    console.log('username:', userName);
  $.ajax({
      type:"POST",
      url:"/api/login",
      data: {userName},
      success: (data) => console.log(data),
      dataType: "json"

    });
  });
};


$(() => {
  login();
});
