(() => {
  function toggleMenu() {
    const hamburgerMenu = document.getElementById("menu-btn");
    const hamburgerLines = document.querySelector("#hamburger");
    const cross = document.querySelector("#cross");
    const searchLogo = document.querySelector('#search');
    const headerContainer = document.querySelector(".header-container");
    const logo = document.querySelector(".logoImg");
    const body = document.querySelector("body");
    const menu = document.getElementById("mobile-menu");

    hamburgerMenu.addEventListener("click", () => {
      hamburgerMenu.classList.toggle("active");
      menu.classList.toggle("show");
      if (hamburgerMenu.classList.contains("active")) {
        menu.classList.remove("hidden");
        hamburgerLines.classList.add("hidden");
        cross.classList.remove("hidden");
        searchLogo.classList.remove("hidden");
        logo.style.filter = "brightness(0) invert(0)";

        headerContainer.style.backgroundColor = "var(--red)";
        body.style.overflow = "hidden";
        hamburgerMenu.style.display = "flex"
      } else {
        menu.classList.add("hidden");
        hamburgerLines.classList.remove("hidden");

        hamburgerLines.style.fill = "white";
        cross.classList.add("hidden");
        searchLogo.classList.add("hidden");

        logo.style.filter = "";

        headerContainer.style.backgroundColor = "black";
        body.style.overflow = "";
        hamburgerMenu.style.display = "block"

      }
    });
  }
  toggleMenu();
})();
