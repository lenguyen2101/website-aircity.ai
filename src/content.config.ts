import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        publishDate: z.coerce.date(),
        author: z.string().default('AirCity Team'),
        category: z.enum(['technology', 'insights', 'product', 'news', 'press', 'updates']).default('insights'),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        featured: z.boolean().default(false),
        source: z.string().optional(),
        source_url: z.string().url().optional(),
    }),
});

export const collections = { blog };
