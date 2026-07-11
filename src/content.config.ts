import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    // Optional: a post can omit it to drop the list-card blurb; the page's
    // meta description then falls back to SITE.description.
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    // Local paths are base-prefixed automatically (see BlogPost.astro); full https:// URLs pass through unchanged.
    heroImage: z.string().optional(),
    // Tags become /blog/tags/<tag>/ path segments, so #, ?, and / (URL
    // fragment/query/path-separator delimiters) would silently produce a
    // broken or wrong link rather than a build error — reject them here
    // instead. Array-level transform dedupes so a repeated tag can't
    // double-count on the tags index or double-render as a chip.
    tags: z
      .array(
        z
          .string()
          .regex(
            /^[^#?/]+$/,
            "tags must be non-empty and can't contain #, ?, or / (breaks tag-page URLs)",
          ),
      )
      .default([])
      .transform((tags) => [...new Set(tags)]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
