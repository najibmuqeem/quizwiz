const logout = function() {

  $("#logout").click((e) => {

    e.preventDefault();
    console.log('logout');

  $.ajax({
      type:"POST",
      url:"/api/logout",
      data: {},
      success: (data) => console.log(data),
      dataType: "json"

    });
  });
};


$(() => {
  logout();
});
