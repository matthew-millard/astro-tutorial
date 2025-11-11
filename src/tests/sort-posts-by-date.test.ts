import { sortPostsByDate } from "@utils/sort-posts-by-date";
import type { CollectionEntry } from "astro:content";
import { describe, expect, it } from "vitest";

describe("sortPostsByDate", () => {
  it("sorts posts from newest to oldest", () => {
    const unsortedPosts: CollectionEntry<"blog">[] = [
      {
        id: "post-1.md",
        data: {
          title: "Middle Post",
          pubDate: new Date("2024-06-15"),
          description: "This is the middle post",
          author: "Matt Millard",
          image: {
            url: "/images/post-1.jpg",
            alt: "Post 1 image",
          },
          tag: "JavaScript",
        },
        collection: "blog",
      },
      {
        id: "post-2.md",
        data: {
          title: "Newest Post",
          pubDate: new Date("2024-12-01"),
          description: "This is the newest post",
          author: "Matt Millard",
          image: {
            url: "/images/post-2.jpg",
            alt: "Post 2 image",
          },
          tag: "TypeScript",
        },
        collection: "blog",
      },
      {
        id: "post-3.md",
        data: {
          title: "Oldest Post",
          pubDate: new Date("2024-01-10"),
          description: "This is the oldest post",
          author: "Matt Millard",
          image: {
            url: "/images/post-3.jpg",
            alt: "Post 3 image",
          },
          tag: "CSS",
        },
        collection: "blog",
      },
      {
        id: "post-4.md",
        data: {
          title: "Spring Post",
          pubDate: new Date("2024-03-20"),
          description: "This is a spring post",
          author: "Matt Millard",
          image: {
            url: "/images/post-4.jpg",
            alt: "Post 4 image",
          },
          tag: "React",
        },
        collection: "blog",
      },
      {
        id: "post-5.md",
        data: {
          title: "Fall Post",
          pubDate: new Date("2024-09-05"),
          description: "This is a fall post",
          author: "Matt Millard",
          image: {
            url: "/images/post-5.jpg",
            alt: "Post 5 image",
          },
          tag: "Node.js",
        },
        collection: "blog",
      },
      {
        id: "post-6.md",
        data: {
          title: "Early Post",
          pubDate: new Date("2024-02-14"),
          description: "This is an early post",
          author: "Matt Millard",
          image: {
            url: "/images/post-6.jpg",
            alt: "Post 6 image",
          },
          tag: "HTML",
        },
        collection: "blog",
      },
    ];

    const expectedSorted: CollectionEntry<"blog">[] = [
      unsortedPosts[1], // Newest: 2024-12-01
      unsortedPosts[4], // Fall: 2024-09-05
      unsortedPosts[0], // Middle: 2024-06-15
      unsortedPosts[3], // Spring: 2024-03-20
      unsortedPosts[5], // Early: 2024-02-14
      unsortedPosts[2], // Oldest: 2024-01-10
    ];

    expect(sortPostsByDate(unsortedPosts)).toEqual(expectedSorted);
  });

  it("handles an empty array", () => {
    const emptyPosts: CollectionEntry<"blog">[] = [];
    expect(sortPostsByDate(emptyPosts)).toEqual([]);
  });

  it("handles a single post", () => {
    const singlePost: CollectionEntry<"blog">[] = [
      {
        id: "single-post.md",
        data: {
          title: "Single Post",
          pubDate: new Date("2024-05-01"),
          description: "The only post",
          author: "Matt Millard",
          image: {
            url: "/images/single.jpg",
            alt: "Single post image",
          },
          tag: "JavaScript",
        },
        collection: "blog",
      },
    ];
    expect(sortPostsByDate(singlePost)).toEqual(singlePost);
  });

  it("handles posts with the same date", () => {
    const postsWithSameDate: CollectionEntry<"blog">[] = [
      {
        id: "post-a.md",
        data: {
          title: "Post A",
          pubDate: new Date("2024-05-01"),
          description: "First post",
          author: "Matt Millard",
          image: {
            url: "/images/a.jpg",
            alt: "Post A image",
          },
          tag: "JavaScript",
        },
        collection: "blog",
      },
      {
        id: "post-b.md",
        data: {
          title: "Post B",
          pubDate: new Date("2024-05-01"),
          description: "Second post",
          author: "Matt Millard",
          image: {
            url: "/images/b.jpg",
            alt: "Post B image",
          },
          tag: "TypeScript",
        },
        collection: "blog",
      },
      {
        id: "post-c.md",
        data: {
          title: "Post C",
          pubDate: new Date("2024-06-01"),
          description: "Third post",
          author: "Matt Millard",
          image: {
            url: "/images/c.jpg",
            alt: "Post C image",
          },
          tag: "CSS",
        },
        collection: "blog",
      },
    ];

    const result = sortPostsByDate(postsWithSameDate);

    // Post C should be first (newest)
    expect(result[0].id).toBe("post-c.md");

    // Posts A and B should maintain their relative order (stable sort)
    expect(result[1].id).toBe("post-a.md");
    expect(result[2].id).toBe("post-b.md");
  });

  it("does not mutate the original array", () => {
    const originalPosts: CollectionEntry<"blog">[] = [
      {
        id: "post-1.md",
        data: {
          title: "Post 1",
          pubDate: new Date("2024-06-01"),
          description: "Description",
          author: "Matt Millard",
          image: {
            url: "/images/1.jpg",
            alt: "Post 1",
          },
          tag: "JavaScript",
        },
        collection: "blog",
      },
      {
        id: "post-2.md",
        data: {
          title: "Post 2",
          pubDate: new Date("2024-01-01"),
          description: "Description",
          author: "Matt Millard",
          image: {
            url: "/images/2.jpg",
            alt: "Post 2",
          },
          tag: "TypeScript",
        },
        collection: "blog",
      },
    ];

    const originalFirstId = originalPosts[0].id;
    sortPostsByDate(originalPosts);

    // Original array should remain unchanged
    expect(originalPosts[0].id).toBe(originalFirstId);
  });
});
