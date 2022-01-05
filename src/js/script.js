document.addEventListener("DOMContentLoaded", function () {
  const menuBurger = document.querySelector(".menu");

  menuBurger.addEventListener("click", () => {
    menuBurger.classList.toggle("active-mobile-menu");
  });
});
