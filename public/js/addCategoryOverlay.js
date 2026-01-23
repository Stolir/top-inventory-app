const editGameOverlayBackdrop = document.querySelector("#edit-backdrop");
const editGameOverlay = document.querySelector(".edit-game-overlay");
const updateBtn = document.getElementById("updateGame");
const cancelBtn = document.querySelector("#cancel-edit");

if (updateBtn) {
  updateBtn.addEventListener("click", () => {
    openEdit();
  });
}

cancelBtn.addEventListener("click", () => {
  closeEdit();
});

function openEdit() {
  page.inert = true;
  editGameOverlayBackdrop.hidden = false;
  page.classList.toggle("blur");
}

function closeEdit() {
  page.inert = false;
  editGameOverlayBackdrop.hidden = true;
  page.classList.toggle("blur");
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && editGameOverlayBackdrop.hidden === false) {
    closeEdit();
  }
});

editGameOverlayBackdrop.addEventListener("click", (e) => {
  if (!editGameOverlay.contains(e.target)) {
    closeEdit();
  }
});

// Choices library multiple select config
const tagsSelect = new Choices("#tags-select", { removeItemButton: true });
const developersSelect = new Choices("#developers-select", {
  removeItemButton: true,
});

// All games page
const addNewBtn = document.querySelector(".add-new.game");

if (addNewBtn) {
  addNewBtn.addEventListener("click", () => {
    openEdit();
  });
}
