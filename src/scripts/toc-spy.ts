import { generateSlug } from "@utils/generate-slug";

const articleEl = document.querySelector("article");
const allH2Tags = articleEl?.querySelectorAll(
  "h2"
) as NodeListOf<HTMLHeadingElement>;
const ulEl = document?.querySelector("#toc-list") as HTMLUListElement;

// Build TOC
allH2Tags?.forEach((tag) => {
  if (!tag.textContent) return;

  const id = generateSlug(tag.textContent);
  tag.setAttribute("id", id);

  const liEl = document.createElement("li");
  const aEl = document.createElement("a");

  aEl.href = `#${id}`;
  aEl.textContent = tag.textContent;

  liEl.classList.add("toc-h2");
  liEl.append(aEl);
  ulEl.append(liEl);
});

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: "0% 0% 0%",
  threshold: 0,
};

// Track which headings are currently visible
const visibleHeadings = new Set<string>();
let lastVisibleId: string | null = null;

const observeHTags = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    if (!id) return;

    if (entry.isIntersecting) {
      visibleHeadings.add(id);
    } else {
      // Track the last heading that scrolled upward
      const rect = entry.target.getBoundingClientRect();
      if (rect.top < 0) {
        lastVisibleId = id;
      }
      visibleHeadings.delete(id);
    }
  });

  updateActiveTocLinks();
}, options);

function updateActiveTocLinks() {
  const allTocLinks = document.querySelectorAll(
    "#toc-list li a"
  ) as NodeListOf<HTMLAnchorElement>;

  // If we have visible headings, highlight them all
  if (visibleHeadings.size > 0) {
    allTocLinks.forEach((link) => {
      const id = link.getAttribute("href")?.substring(1);
      if (id && visibleHeadings.has(id)) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    // Update last visible to the last one in the set
    lastVisibleId = Array.from(visibleHeadings).pop() || null;
  }
  // Fallback: if no headings visible (tall section), keep last one highlighted
  else if (lastVisibleId) {
    allTocLinks.forEach((link) => {
      const id = link.getAttribute("href")?.substring(1);
      if (id === lastVisibleId) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }
}

// Observe all headings
allH2Tags?.forEach((tag) => {
  observeHTags.observe(tag);
});
