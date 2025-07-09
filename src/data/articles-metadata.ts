export interface Article {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  altText: string;
  createdAt: string;
  updatedAt: null | string;
  estimatedReadTime: string;
}

export const articles: Article[] = [
  {
    title: 'CSS in JavaScript',
    slug: 'css-in-javascript',
    description: 'Explore the evolution of CSS-in-JS solutions and their impact on modern web development.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    altText: 'Code editor showing JavaScript and CSS code',
    createdAt: 'May 24th, 2025',
    updatedAt: null,
    estimatedReadTime: '5 min read',
  },
  {
    title: 'Hide navigation bar on scroll',
    slug: 'hide-navigation-bar-on-scroll',
    description: 'Learn how to implement a smooth navigation bar that hides on scroll for better user experience.',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    altText: 'Laptop showing a website with navigation bar',
    createdAt: 'March 14th 2024',
    updatedAt: 'March 15th 2024',
    estimatedReadTime: '3 min read',
  },
  {
    title: 'Understanding React Server Components',
    slug: 'understanding-react-server-components',
    description: "A deep dive into React Server Components and how they're changing the way we build web applications.",
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    altText: 'React logo and server architecture diagram',
    createdAt: 'March 13th 2024',
    updatedAt: 'March 14th 2024',
    estimatedReadTime: '8 min read',
  },
];
