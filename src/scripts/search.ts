const input = document.querySelector('#search-input') as HTMLInputElement;
const ul = document.querySelector('#list-of-articles') as HTMLUListElement;
const a = ul.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;

function moveFocusToSearch(e: KeyboardEvent) {
  if (e.metaKey && e.key === 'k') {
    input?.focus();
  }
}

function handleSearch() {
  const query = input.value.toUpperCase();

  for (let i = 0; i < a.length; i++) {
    let p = a[i].querySelectorAll('p')[0] as HTMLParagraphElement;

    if (p.innerHTML.toUpperCase().indexOf(query) > -1) {
      a[i].style.display = '';
    } else {
      a[i].style.display = 'none';
    }
  }
}

document.addEventListener('keydown', e => moveFocusToSearch(e));
input.addEventListener('keyup', handleSearch);
