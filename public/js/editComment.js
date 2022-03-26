const updateCommentButtonEl = document.querySelectorAll(".commentUpdateButton");
const deleteCommentButtonEl = document.querySelectorAll(".commentDeleteButton");
const cancelUpdateButtonEl = document.querySelectorAll(".cancelUpdateButton");
const saveCommentButtonEl = document.querySelectorAll(".saveCommentButton");
const confirmCommentButtonEl = document.querySelectorAll(
  ".confirmCommentButton"
);
const commentBodyEl = document.querySelectorAll(".comment-text");

for (let i = 0; i < updateCommentButtonEl.length; i++) {
  const element = updateCommentButtonEl[i];
  element.addEventListener("click", (event) => {
    event.preventDefault();
    saveCommentButtonEl[i].classList.remove("hidden");
    cancelUpdateButtonEl[i].classList.remove("hidden");
    deleteCommentButtonEl[i].classList.add("hidden");
    updateCommentButtonEl[i].classList.add("hidden");
    commentBodyEl[i].classList.add("hidden");
    const commentTextArea = document.createElement("textarea");
    commentTextArea.setAttribute("id", "updatedComment");
    commentTextArea.value =
      event.target.parentElement.parentElement.querySelector(
        ".comment-text"
      ).innerText;
    commentTextArea.setAttribute("maxLength", "255");
    commentTextArea.setAttribute(
      "onfocus",
      'this.style.height = "";this.style.height = this.scrollHeight + "px"'
    );
    commentTextArea.style.maxHeight = "100%";
    event.target.parentElement.parentElement
      .querySelector(".comment-body")
      .appendChild(commentTextArea);
    document
      .getElementById("updatedComment")
      .addEventListener("keyup", (e) => {
        if (e.target.value.length > 0) {
          saveCommentButtonEl[i].disabled = false;
        } else {
          saveCommentButtonEl[i].disabled = true;
        }
      });
  });
}

for (let i = 0; i < deleteCommentButtonEl.length; i++) {
  const element = deleteCommentButtonEl[i];
  element.addEventListener("click", (event) => {
    event.preventDefault();
    confirmCommentButtonEl[i].classList.remove("hidden");
    cancelUpdateButtonEl[i].classList.remove("hidden");
    updateCommentButtonEl[i].classList.add("hidden");
    deleteCommentButtonEl[i].classList.add("hidden");
  });
}

for (let i = 0; i < confirmCommentButtonEl.length; i++) {
  const element = confirmCommentButtonEl[i];
  element.addEventListener("click", async (event) => {
    event.preventDefault();
    const response = await fetch(
      `/api/comments/${element.dataset.comment_id}`,
      {
        method: "DELETE",
        body: "",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      window.location.reload();
    } else {
      alert(response.statusText);
    }
  });
}

for (let i = 0; i < cancelUpdateButtonEl.length; i++) {
  const element = cancelUpdateButtonEl[i];
  element.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.reload();
  });
}

for (let i = 0; i < saveCommentButtonEl.length; i++) {
  const element = saveCommentButtonEl[i];
  element.addEventListener("click", async (event) => {
    const updatedComment = document.querySelector("#updatedComment").value;
    event.preventDefault();
    const response = await fetch(
      `/api/comments/${element.dataset.comment_id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          comment: updatedComment,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      window.location.reload();
    } else {
      alert(response.statusText);
    }
  });
}
