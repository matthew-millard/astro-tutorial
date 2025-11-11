import type { CollectionEntry } from "astro:content";

export function sortPostsByDate(posts: CollectionEntry<"blog">[]) {
  return posts.toSorted(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}
