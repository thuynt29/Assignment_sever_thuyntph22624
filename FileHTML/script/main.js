// validation form login
const inputUsername = document.querySelector(".user");
const inputPassword = document.querySelector(".mk");
const btnLogin = document.querySelector(".mt-3");

// validation form login

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputUsername.value === "" || inputPassword.value === "") {
    alert("vui lòng không để trống");
  } else {
    const user = JSON.parse(localStorage.getItem(inputUsername.value));
    if (
      user.username === inputUsername.value &&
      user.password === inputPassword.value
    ) {
      alert("Đăng Nhập Thành Công");
      window.location.href = "/views/list.ejs";
    } else {
      alert("Đăng Nhập Thất Bại");
    }
  }
});