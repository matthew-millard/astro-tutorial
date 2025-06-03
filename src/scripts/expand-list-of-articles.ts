const button = document.querySelector('#expand-collapse-list-of-articles-button') as HTMLButtonElement;
const listOfArticles = document.querySelector('#list-of-articles') as HTMLUListElement;
const searchInput = document.querySelector('#search-input') as HTMLInputElement;

function expandArticleList() {
  listOfArticles.setAttribute('data-expanded', 'true');
  button.setAttribute('data-expanded', 'true');
}

function collapseArticleList() {
  listOfArticles.removeAttribute('data-expanded');
  button.setAttribute('data-expanded', 'false');
}

function handleExpandCollapseArticles(e: FocusEvent | MouseEvent) {
  if (e.type === 'click' && listOfArticles.hasAttribute('data-expanded')) {
    collapseArticleList();
  } else {
    expandArticleList();
  }
}

button.addEventListener('click', e => handleExpandCollapseArticles(e));
searchInput.addEventListener('focus', e => handleExpandCollapseArticles(e));
