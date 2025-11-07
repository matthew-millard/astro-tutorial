import slug from "slug";

interface Options extends slug.Options {}

export function generateSlug(str: string, options?: Options): string {
  return slug(str, options);
}
