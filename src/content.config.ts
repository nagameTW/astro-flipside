import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// A real calendar date. YAML parses an unquoted `2026-07-13` straight to a
// Date; a quoted string is accepted too — but `new Date("2026-02-30")`
// silently rolls over to Mar 2 (wrong post order, no build error), so a
// string input is round-trip checked against its own Y-M-D and rejected if
// they disagree. A Date input (the common case) passes straight through.
const calendarDate = z.union([z.date(), z.string()]).transform((v, ctx) => {
  const d = v instanceof Date ? v : new Date(v);
  if (Number.isNaN(d.getTime())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `not a valid date: ${JSON.stringify(v)}`,
    });
    return z.NEVER;
  }
  const iso = typeof v === "string" && /^(\d{4})-(\d{2})-(\d{2})/.exec(v);
  if (
    iso &&
    (d.getUTCFullYear() !== +iso[1] ||
      d.getUTCMonth() + 1 !== +iso[2] ||
      d.getUTCDate() !== +iso[3])
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `not a real calendar date: ${v}`,
    });
    return z.NEVER;
  }
  return d;
});

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1, "title cannot be empty"),
      // Optional: a post can omit it to drop the list-card blurb; the page's
      // meta description then falls back to SITE.description.
      description: z.string().optional(),
      pubDate: calendarDate,
      updatedDate: calendarDate.optional(),
      // A path relative to the post file (e.g. "./cover.jpg") — the image
      // ships through astro:assets (responsive srcset, webp, real
      // dimensions), same as relative images in the post body.
      heroImage: image().optional(),
      // Tags become /blog/tags/<tag>/ path segments, so #, ?, and / (URL
      // fragment/query/path-separator delimiters) would silently produce a
      // broken or wrong link rather than a build error — reject them here.
      // Each tag is trimmed first (so "music" and "music " can't survive as
      // two tags), which also turns a whitespace-only tag into "" and trips
      // the non-empty regex. The array-level transform then dedupes.
      tags: z
        .array(
          z
            .string()
            .transform((t) => t.trim())
            .pipe(
              z
                .string()
                .regex(
                  /^[^#?/]+$/,
                  "tags must be non-empty and can't contain #, ?, or / (breaks tag-page URLs)",
                ),
            ),
        )
        .default([])
        .transform((tags) => [...new Set(tags)]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
