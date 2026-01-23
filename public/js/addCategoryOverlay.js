const backdrop = document.querySelector("#edit-backdrop");
const formContainer = document.querySelector(".edit-game-overlay");
const addButton = document.querySelector(".add-new.category");
const cancelButton = document.querySelector("#cancel-edit");

function openEdit() {
  page.inert = true;
  backdrop.hidden = false;
  page.classList.toggle("blur");
}

function closeEdit() {
  page.inert = false;
  backdrop.hidden = true;
  page.classList.toggle("blur");
}

addButton.addEventListener("click", () => {
  openEdit();
});

cancelButton.addEventListener("click", () => {
  closeEdit();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && backdrop.hidden === false) {
    closeEdit();
  }
});

backdrop.addEventListener("click", (e) => {
  if (!formContainer.contains(e.target)) {
    closeEdit();
  }
});
