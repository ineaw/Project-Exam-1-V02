const openImage = document.querySelectorAll(".modal-button");
const visible = "is-visible";

/* Iterate over object and add modal */

for (const img of openImage) {
  img.addEventListener("click", function () {
    const modal = this.dataset.open;
    document.getElementById(modal).classList.add(visible);
  });
}

/* Close by clicking outside image */

document.addEventListener("click", (e) => {
  if (e.target === document.querySelector(".post-modal.is-visible")) {
    document.querySelector(".post-modal.is-visible").classList.remove(visible);
  }
});

/* Close with escape button */

document.addEventListener("keyup", (e) => {
  if (e.key === "Escape" && document.querySelector(".post-modal.is-visible")) {
    document.querySelector(".post-modal.is-visible").classList.remove(visible);
  }
});
