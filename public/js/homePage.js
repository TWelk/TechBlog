let postContainers = document.querySelectorAll(".post-container");

let toPostPage = (event) => {
  event.preventDefault();

  const postId = event.currentTarget.dataset.postid;
  document.location.replace(`/posts/${postId}`);
};

for (let i = 0; i < postContainers.length; i++) {
  const element = postContainers[i];
  element.addEventListener("click", toPostPage);
}
