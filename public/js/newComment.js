const comment = document.getElementById('comment');
const comment_submit = document.querySelector("#comment_submit");

comment.addEventListener("keyup", (e) => {
  if (comment.value.length > 0) {
    comment_submit.disabled = false;
  } else {
    comment_submit.disabled = true;
  }
})

comment_submit.addEventListener("click", async (event) => {
  event.preventDefault();

  const postId = comment_submit.dataset.postid;
  const comment = document.querySelector("#comment").value;
  if (comment) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        postId,
        comment,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.redirected) {
      window.location = "/login";
    } else if (response.ok) {
      window.location.reload();
    } else {
      alert(response.statusText);
    }
  }
});
