const userButtonsEl = document.querySelector("#userButtons");
const updateButtonEl = document.querySelector("#updateButton");
const deleteButtonEl = document.querySelector("#deleteButton");
const saveButtonEl = document.querySelector("#saveButton");
const cancelButtonEl = document.querySelector("#cancelButton");
const confirmButtonEl = document.querySelector("#confirmButton");
const deleteConfirmationEl = document.querySelector("#deleteConfirmation");
const titleValue = document.querySelector(".title").innerText;
const postValue = document.querySelector(".post-body").children[0].innerText;
const postHeader = document.querySelector(".post-header");
const postBody = document.querySelector(".post-Body");
let updatePostText;

updateButtonEl.addEventListener("click", (event) => {
  //title and post-body become inputs with values == title and post-body innerText
  updateButtonEl.classList.add("hidden");
  deleteButtonEl.classList.add("hidden");
  saveButtonEl.classList.remove("hidden");
  cancelButtonEl.classList.remove("hidden");
  const titleInput = document.createElement("input");
  const postTextArea = document.createElement("textarea");

  titleInput.setAttribute("id", "newTitle");
  postTextArea.setAttribute("id", "updatePostText");
  titleInput.value = titleValue;
  postTextArea.value = postValue;
  postTextArea.setAttribute("maxLength", "5000");
  postTextArea.setAttribute(
    "onfocus",
    'this.style.height = "";this.style.height = this.scrollHeight + "px"'
  );
  postTextArea.style.maxHeight = "100%";

  titleInput.classList.add("title");

  postHeader.children[0].classList.add("hidden");
  postHeader.children[1].classList.add("hidden");
  postBody.children[0].classList.add("hidden");

  postHeader.appendChild(titleInput);
  postBody.appendChild(postTextArea);
  updatePostText = document.getElementById("updatePostText");
  updatePostText.addEventListener("keydown", (event) => {
    if (updatePostText.value.length >= 50) {
      saveButtonEl.removeAttribute("disabled");
    } else {
      saveButtonEl.setAttribute("disabled", "disabled");
    }
  })
  updatePostText.addEventListener("click", (event) => {
    if (updatePostText.value.length >= 50) {
      saveButtonEl.removeAttribute("disabled");
    } else {
      saveButtonEl.setAttribute("disabled", "disabled");
    }
  })
});

//if the save button is clicked send put
saveButtonEl.addEventListener("click", async (event) => {
  event.preventDefault();
  const title = document.querySelector("#newTitle").value;
  const post = document.querySelector("#updatePostText").value;
  if (title && post) {
    const response = await fetch(`/api/posts/${event.target.dataset.postid}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        post,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.reload();
    } else {
      alert(response.statusText);
    }
  }
});
//if the cancel button is clicked reload the page
cancelButtonEl.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.reload();
});
//if the delete button is clicked ask for confirmation
deleteButtonEl.addEventListener("click", (event) => {
  event.preventDefault();
  deleteConfirmationEl.classList.remove("hidden");
  confirmButtonEl.classList.remove("hidden");
  cancelButtonEl.classList.remove("hidden");
  updateButtonEl.classList.add("hidden");
  deleteButtonEl.classList.add("hidden");
});
//if confirm button clicked then send delete
confirmButtonEl.addEventListener("click", async (event) => {
  event.preventDefault();
  const response = await fetch(`/api/posts/${confirmButtonEl.dataset.postid}`, {
    method: "DELETE",
    body: "",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    window.location.replace("/");
  } else {
    alert(response.statusText);
  }
});



