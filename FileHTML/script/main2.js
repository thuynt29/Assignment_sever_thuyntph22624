// validation form register and register user local storage
const ejs = require("ejs");
const inputUsernameRegister = document.querySelector(".user");
const inputPasswordRegister = document.querySelector(".mk");
const btnRegister = document.querySelector(".mt-3");

// validation form register and register user local storage

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputUsernameRegister.value === "" || inputPasswordRegister.value === "") {
    alert("vui lòng không để trống");
  } else {
    // array user
    const user = {
      username: inputUsernameRegister.value,
      password: inputPasswordRegister.value,
    };
    let json = JSON.stringify(user);
    localStorage.setItem(inputUsernameRegister.value, json);
    alert("Đăng Ký Thành Công");
  }
});