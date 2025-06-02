const button = document.querySelector('#expand-collapse-list-of-articles-button') as HTMLButtonElement;
const listOfArticles = document.querySelector('#list-of-articles') as HTMLUListElement;

function handleClick() {
  if (listOfArticles.hasAttribute('data-expanded')) {
    listOfArticles.removeAttribute('data-expanded');
    button.setAttribute('data-expanded', 'false');
  } else {
    listOfArticles.setAttribute('data-expanded', 'true');
    button.setAttribute('data-expanded', 'true');
  }
}

button.addEventListener('click', handleClick);
