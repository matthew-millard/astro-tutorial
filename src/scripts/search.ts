const input = document.querySelector('#search-input') as HTMLInputElement;
const ul = document.querySelector('#list-of-articles') as HTMLUListElement;
const a = ul.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
const noResultsMessage = ul.querySelector('.no-results-message') as HTMLParagraphElement;

function moveFocusToSearch(e: KeyboardEvent) {
  if ((e.metaKey && e.key === 'k') || (e.ctrlKey && e.key === 'k')) {
    input?.focus();
  }
}

function handleSearch() {
  const query = input.value.toUpperCase();
  let searchResults = 0;

  if (noResultsMessage.classList.contains('show-message')) {
    noResultsMessage.classList.toggle('show-message');
  }

  for (let i = 0; i < a.length; i++) {
    let p = a[i].querySelectorAll('p')[0] as HTMLParagraphElement;

    if (p.innerHTML.toUpperCase().indexOf(query) > -1) {
      a[i].style.display = '';
      searchResults++;
    } else {
      a[i].style.display = 'none';
    }
  }

  if (!searchResults) {
    noResultsMessage.classList.add('show-message');
  }
}

document.addEventListener('keydown', e => moveFocusToSearch(e));
input.addEventListener('keyup', handleSearch);
