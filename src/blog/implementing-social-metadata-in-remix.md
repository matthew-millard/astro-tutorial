---
title: Implementing Social Metadata in Remix
pubDate: 2025-03-22
description: Learn how to add social media preview cards to your Remix app using Twitter Cards and Open Graph metadata. Make your links stand out on X, Facebook, LinkedIn, and other platforms with rich previews.
author: Matt Millard
image:
  {
    url: https://res.cloudinary.com/hospohub/image/upload/v1763657901/open-graph-protocol-demo_mupbhz.png,
    alt: Facebook post composer showing a rich preview card with Open Graph metadata,
  }
tag: Web development
---

# Implementing Social Metadata in Remix

When you share a link on social media, the difference between a plain URL and a rich preview card is night and day. Those attractive cards with images, titles, and descriptions don't happen by accident-they're powered by metadata in your HTML. In this guide, I'll show you how to implement social metadata in Remix so your content looks professional when shared on X, Facebook, LinkedIn, and other platforms.

## Understanding Social Metadata

Social media platforms read special `<meta>` tags from your HTML to generate preview cards. There are two main standards:

**Twitter Cards (X Cards)** - Created by Twitter (now X) for their platform  
**Open Graph Protocol** - Created by Facebook, widely adopted across platforms

The good news? These standards overlap significantly, so implementing both is straightforward. And with Remix's `meta` function, you can generate these tags dynamically based on your route data.

## Setting Up Twitter Cards

Twitter offers several card types. For blog posts, the **Summary Card with Large Image** works best because it showcases your featured image prominently.

### Required Twitter Card Tags

Here's how to implement Twitter Cards using Remix's `meta` function:

```javascript
// routes/blog.$slug.tsx

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    // Basic page metadata
    {
      title:
        `${data?.blogPost.title} | Matt Millard` || data?.frontmatter.title,
    },
    {
      name: "description",
      content: data?.blogPost.description || data?.frontmatter.description,
    },
    {
      name: "author",
      content: "Matt Millard",
    },

    // Twitter Card metadata
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: data?.blogPost.title || data?.frontmatter.title,
    },
    {
      name: "twitter:description",
      content: data?.blogPost.description || data?.frontmatter.description,
    },
    { name: "twitter:image", content: data?.blogPost.imageUrl },
    { name: "twitter:image:alt", content: data?.blogPost.altText },
  ];
};
```

**Breaking down the Twitter Card fields:**

- `twitter:card` - Specifies the card type (`summary_large_image` for featured images)
- `twitter:title` - The title shown in the preview card
- `twitter:description` - A brief description of the content
- `twitter:image` - URL to your featured image (must be publicly accessible)
- `twitter:image:alt` - Alt text for accessibility

The `meta` function receives data from your loader, making it easy to generate unique metadata for each blog post.

## Testing Your Twitter Cards

After deploying your changes, you'll want to verify everything looks correct. Unfortunately, Twitter's Card Validator was deprecated in 2023, but there are alternatives:

**Production Testing:**

1. Share your URL in the Twitter/X composer
2. The preview will appear automatically (you don't need to actually post)
3. Check that your image, title, and description display correctly

**Local Development Testing:**

Use [ngrok](https://ngrok.com/) to expose your local development server:

```bash
ngrok http 3000
```

Copy the generated ngrok URL and paste it into the Twitter composer to see your card preview with live data.

## Adding Open Graph Protocol

Open Graph metadata works similarly to Twitter Cards but is supported by Facebook, LinkedIn, Discord, and many other platforms. The protocols share a lot in common, so you're mostly extending what you've already built.

```javascript
// routes/blog.$slug.tsx

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  // Extract data from loader
  const title = data?.blogPost.title || data?.frontmatter.title;
  const description =
    data?.blogPost.description || data?.frontmatter.description;
  const imageUrl = data?.blogPost.imageUrl;
  const altText = data?.blogPost.altText;
  const publishedTime = data?.blogPost.createdAt;
  const modifiedTime = data?.blogPost.updatedAt;

  // Site constants
  const author = "Matt Millard";
  const siteName = "Matt Millard";

  // Build canonical URL
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? ENV.BASE_URL
      : "http://localhost:3000";
  const url = `${baseUrl}${location.pathname}`;

  return [
    // Basic metadata
    { title: `${title} | ${siteName}` },
    { name: "description", content: description },
    { name: "author", content: author },

    // Twitter Card metadata
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@_MattMillard" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: altText },

    // Open Graph metadata
    { property: "og:title", content: title },
    { property: "og:type", content: "article" },
    { property: "og:image", content: imageUrl },
    { property: "og:url", content: url },
    { property: "og:site_name", content: siteName },
    { property: "og:image:alt", content: altText },

    // Article-specific metadata
    { property: "article:published_time", content: publishedTime },
    { property: "article:modified_time", content: modifiedTime },
    { property: "article:author", content: author },
  ];
};
```

**Key Open Graph additions:**

- `og:type` - Content type (use `"article"` for blog posts, `"website"` for pages)
- `og:url` - Canonical URL of the page (built from location.pathname)
- `og:site_name` - Your site's name (appears in some platforms)
- `article:published_time` - When the article was first published
- `article:modified_time` - When the article was last updated

**Important note:** Open Graph tags use the `property` attribute instead of `name`. While many platforms are forgiving, using the correct attribute ensures maximum compatibility.

## Testing Open Graph Metadata

Different platforms render Open Graph metadata differently. Here's how to test:

**Facebook & LinkedIn:**

1. Use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. Enter your URL and click "Debug"
3. View how the preview will appear and check for errors
4. Click "Scrape Again" if you've updated metadata

**Discord:**

- Paste your URL in any Discord channel
- The preview appears immediately
- Discord caches aggressively, so updates may take time

**Slack:**

- Paste your URL in a message
- Slack shows the preview inline

## Best Practices

Here are some tips to get the most out of your social metadata:

**Image Requirements:**

- Minimum size: 1200x630 pixels
- Aspect ratio: 1.91:1 (ideal for most platforms)
- Format: JPG or PNG
- File size: Under 5MB
- Use absolute URLs (must be publicly accessible)

**Content Guidelines:**

- Keep titles under 60 characters
- Keep descriptions between 150-160 characters
- Write compelling copy that encourages clicks
- Always include alt text for accessibility

**Testing Checklist:**

- Test on multiple platforms before announcing
- Check mobile and desktop previews
- Verify images load quickly
- Ensure URLs are correct and accessible

## Key Takeaways

Implementing social metadata in Remix is straightforward with the `meta` function:

- Use Twitter Cards for X/Twitter platform
- Add Open Graph metadata for broader platform support
- Leverage Remix's loader data for dynamic metadata
- Use `property` for Open Graph tags, `name` for Twitter Cards
- Build canonical URLs using `location.pathname`
- Test thoroughly on multiple platforms before sharing

With proper social metadata, your content will stand out when shared, driving more engagement and traffic to your site. The investment in setting this up once pays dividends every time someone shares your content.
