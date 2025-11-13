// This script is not being used.

const button = document.querySelector(
  "#expand-collapse-list-of-posts-button"
) as HTMLButtonElement;
const listOfPosts = document.querySelector(
  "#list-of-posts"
) as HTMLUListElement;
const searchInput = document.querySelector("#search-input") as HTMLInputElement;

function expandPostList() {
  listOfPosts.setAttribute("data-expanded", "true");
  button.setAttribute("data-expanded", "true");
  document.body.classList.add("no-scroll");
}

function collapsePostList() {
  listOfPosts.removeAttribute("data-expanded");
  button.setAttribute("data-expanded", "false");
  document.body.classList.remove("no-scroll");
}

function handleExpandCollapsePosts(e: FocusEvent | MouseEvent) {
  if (e.type === "click" && listOfPosts.hasAttribute("data-expanded")) {
    collapsePostList();
  } else {
    expandPostList();
  }
}

button.addEventListener("click", (e) => handleExpandCollapsePosts(e));
searchInput.addEventListener("focus", (e) => handleExpandCollapsePosts(e));
