require("../css/_style.css");

const menuBurger = document.querySelector(".menu");

menuBurger.addEventListener("click", () => {
  menuBurger.classList.toggle("active-mobile-menu");
});
