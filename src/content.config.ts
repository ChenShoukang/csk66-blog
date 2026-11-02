import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    // 下面的可选字段按分类使用：作者/导演/音乐人、年份、评分（0-5）、外链、视频
    author: z.string().optional(),
    year: z.coerce.number().optional(),
    rating: z.coerce.number().min(0).max(5).optional(),
    link: z.string().optional(),
    video: z.string().optional(),
    poster: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    desc: z.string(),
    tech: z.array(z.string()).default([]),
    year: z.coerce.number().optional(),
    link: z.string().optional(),
    repo: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// 由 scripts/sync-kok-help.mjs 从 kok 仓库同步的文档（目前只有 kok 帮助中心）。
const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, works, projects, docs };
