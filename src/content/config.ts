import { defineCollection, z } from 'astro:content';

const sharedSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  tag: z.string().default('Localization'),
  image: z.string().optional(),
});

const blog = defineCollection({ type: 'content', schema: sharedSchema });
const blogFr = defineCollection({ type: 'content', schema: sharedSchema });

export const collections = { blog, 'blog-fr': blogFr };
