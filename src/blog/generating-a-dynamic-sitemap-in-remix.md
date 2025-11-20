---
title: Generating a Dynamic Sitemap in Remix
pubDate: 2025-02-03
description: Learn how to build a dynamic sitemap in Remix using resource routes. Discover how to combine static pages with database-driven content, handle environment variables, and optimize caching for better SEO performance.
author: Matt Millard
image:
  {
    url: https://res.cloudinary.com/hospohub/image/upload/v1737593040/blog_generate_a_dynamic_sitemap_in_remix_vvf3hm.jpg,
    alt: Code snippet of a Remix loader function generating a sitemap.,
  }
tag: Web development
---

# Generating a Dynamic Sitemap in Remix

Search engines need to know what pages exist on your website to index them properly. A sitemap is an XML file that tells search engines about all your pages, when they were last updated, and how important they are. In this guide, I'll show you how to build a dynamic sitemap in Remix that automatically includes your static pages and database-driven content.

## Why You Need a Sitemap

A sitemap is essential for SEO. It helps search engines like Google discover and crawl your pages more efficiently, especially when:

- Your site has dynamic content that changes frequently
- Pages aren't well-connected through internal links
- Your site is new and has few external links

The sitemap protocol is defined at [sitemaps.org](https://sitemaps.org) and supported by all major search engines.

## Creating a Resource Route

Remix's resource routes are perfect for sitemaps because they return data instead of UI. Create a new file at `app/routes/[sitemap.xml].tsx`:

The square bracket syntax `[]` escapes the special character `.` in Remix's file-based routing. Alternatively, you could use `app/routes/sitemap[.]xml.tsx`. Both work identically. Learn more in the [Remix documentation](https://v2.remix.run/docs/file-conventions/routes#escaping-special-characters).

## Building the Loader Function

Resource routes use a loader function to handle requests. Let's start with a basic structure that returns an empty sitemap:

```javascript
export async function loader() {
  const sitemap = "";

  try {
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400", // Cache for 24 hours
      },
    });
  } catch (error) {
    console.error("Error generating Sitemap:", error);
    throw new Response("Internal server error", { status: 500 });
  }
}
```

**Key points:**

- Returns an XML string with `Content-Type: application/xml`
- Caches the sitemap for 24 hours with `Cache-Control`
- Handles errors gracefully with a 500 response

## Adding Static Pages

Let's understand the XML format before we generate it. A sitemap consists of URL entries with metadata about each page:

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://example.com/about/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.1</priority>
  </url>
  <url>
    <loc>https://example.com/blog/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

**Understanding the fields:**

- `loc` - The full URL of the page
- `lastmod` - When the page was last modified (YYYY-MM-DD format)
- `changefreq` - How often the page changes (daily, weekly, monthly, yearly)
- `priority` - Relative importance (0.0 to 1.0)

Now let's generate this dynamically using JavaScript:

```javascript
export async function loader() {
  // Define your static pages
  const staticPages = [
    { loc: "/", lastmod: "2025-01-15", changefreq: "weekly", priority: 0.7 },
    {
      loc: "/about/",
      lastmod: "2025-01-15",
      changefreq: "yearly",
      priority: 0.1,
    },
    {
      loc: "/blog/",
      lastmod: "2025-01-15",
      changefreq: "weekly",
      priority: 0.9,
    },
  ];

  // Set base URL based on environment
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL
      : "http://localhost:3000";

  // Generate XML from the array
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticPages
      .map(
        (page) => `
      <url>
        <loc>${baseUrl}${page.loc}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  try {
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    throw new Response("Internal server error", { status: 500 });
  }
}
```

By storing pages in an array, you can easily add new pages without touching the XML generation logic. If your site only has static pages, you're done!

## Including Dynamic Content

Most sites have dynamic content from a database. Let's add blog posts to the sitemap by fetching them from your database:

```javascript
import { prisma } from "~/.server/db";

export async function loader() {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.BASE_URL
      : "http://localhost:3000";

  // Static pages
  const staticPages = [
    { loc: "/", lastmod: "2025-01-15", changefreq: "weekly", priority: 0.7 },
    {
      loc: "/about/",
      lastmod: "2025-01-15",
      changefreq: "yearly",
      priority: 0.1,
    },
    {
      loc: "/blog/",
      lastmod: "2025-01-15",
      changefreq: "weekly",
      priority: 0.9,
    },
  ];

  // Fetch blog posts from database
  const blogPosts = await prisma.blogPost.findMany({
    select: { slug: true, updatedAt: true },
  });

  // Transform posts into sitemap format
  const dynamicPages = blogPosts.map((post) => ({
    loc: `/blog/${post.slug}/`,
    lastmod: post.updatedAt.toISOString().split("T")[0], // Format as YYYY-MM-DD
    changefreq: "monthly",
    priority: 0.8,
  }));

  // Combine all pages
  const allPages = [...staticPages, ...dynamicPages];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPages
      .map(
        (page) => `
      <url>
        <loc>${baseUrl}${page.loc}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
      </url>`
      )
      .join("")}
  </urlset>`;

  try {
    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=86400",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    throw new Response("Internal server error", { status: 500 });
  }
}
```

**The magic here:**

- Database query runs on each sitemap request
- `updatedAt` is converted to the required YYYY-MM-DD format
- Arrays are merged using spread syntax
- The same XML generation handles both static and dynamic pages

## Deployment and Environment Variables

Your sitemap needs different base URLs for development and production. Here's how to handle that properly.

### Setting Up Environment Variables

```javascript
const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL
    : "http://localhost:3000";
```

This pattern ensures the correct domain is used in each environment.

**Local Development:**

Create a `.env` file in your project root:

```bash
BASE_URL="http://localhost:3000"
```

Remember to add `.env` to your `.gitignore` to avoid committing secrets.

**Production Deployment:**

Set environment variables through your hosting platform. For example, on Fly.io:

```bash
flyctl secrets set BASE_URL="https://your-domain.com"
```

On platforms like Vercel or Netlify, use their dashboard or CLI to set environment variables.

### Optimizing Cache Strategy

The default `max-age=86400` (24 hours) works for most sites. Adjust based on your needs:

```javascript
// Update every hour for frequently changing content
"Cache-Control": "public, max-age=3600"

// Update every week for stable content
"Cache-Control": "public, max-age=604800"
```

Remember: search engines don't check sitemaps constantly, so aggressive caching is fine.

### Testing Your Sitemap

After deploying, verify your sitemap works:

1. Visit `https://yourdomain.com/sitemap.xml` in your browser
2. Use the [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
3. Submit it to Google Search Console
4. Check that all URLs are correctly formatted and accessible

## Key Takeaways

Building a dynamic sitemap in Remix is straightforward:

- Use resource routes to return XML responses
- Store static pages in an array for easy maintenance
- Fetch dynamic content from your database
- Combine arrays and generate XML with template literals
- Configure environment variables for different deployments
- Cache appropriately to reduce server load

With this setup, your sitemap automatically stays in sync with your content, helping search engines discover and index your pages efficiently.
