const closeBtn = document.querySelector(".close-nav");
const openBtn = document.querySelector(".open-nav");
const nav = document.querySelector(".nav-content");

/* Open Navigation */

openBtn.addEventListener("click", () => {
  nav.classList.add("navigation-open");
});

/* Close Navigation */

closeBtn.addEventListener("click", () => {
  nav.classList.remove("navigation-open");
});
