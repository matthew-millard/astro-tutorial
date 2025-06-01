const input = document.querySelector('#search-input') as HTMLInputElement;
const ul = document.querySelector('#list-of-articles') as HTMLUListElement;
const a = ul.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>;
const noResultsMessage = ul.querySelector('.no-results-message') as HTMLParagraphElement;
const kbd = document.querySelector('.keyboard-shortcut') as HTMLElement;
const isMac = navigator.userAgent.toLowerCase().includes('mac');

function setOS() {
  kbd.setAttribute('data-is-macos', isMac.toString());
}

function handleSearchShortcut(e: KeyboardEvent) {
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

function handleFocus() {
  kbd.removeAttribute('data-is-macos');
}

document.addEventListener('keydown', e => handleSearchShortcut(e));
input.addEventListener('keyup', handleSearch);
input.addEventListener('focus', handleFocus);
input.addEventListener('blur', setOS);
setOS();
