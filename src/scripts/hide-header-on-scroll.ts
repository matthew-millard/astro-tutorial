const header = document.querySelector("#header");

let previousScrollY = window.scrollY;
let isProgrammaticScroll = false;

function handleScroll() {
  if (isProgrammaticScroll) {
    isProgrammaticScroll = false;
    return;
  }

  const currentScrollY = window.scrollY;

  if (previousScrollY > 64 && currentScrollY > previousScrollY) {
    // Scrolling down
    header?.setAttribute("data-hidden", "true");
  } else if (currentScrollY < previousScrollY) {
    // Scrolling up
    header?.removeAttribute("data-hidden");
  }

  previousScrollY = currentScrollY;
}

document.addEventListener("scroll", () => {
  requestAnimationFrame(handleScroll);
});

// Listen for mobile menu close
document.addEventListener("mobileMenuClosed", () => {
  isProgrammaticScroll = true;
});
