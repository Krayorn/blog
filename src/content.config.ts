import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const turnSchema = (image) => z.object({
    secondary_missions: z.array(z.string()),
    content: z.array(
      z.union([
        z.object({ type: z.literal('image'), src: image(), alt: z.string() }),
        z.object({ type: z.literal('text'), content: z.string() }),
        z.object({ type: z.literal('quote'), content: z.string(), source: z.string() })
      ])
    ),
    score: z.array(z.object({ source: z.string(), value: z.number() }))
});

const playerSchema = z.object({
  name: z.string(),
  faction: z.string(),
  detachment: z.string(),
  list: z.array(z.object({
    name: z.string(),
    number: z.number().optional(),
    equipment: z.array(z.string()),
    points: z.number()
  }))
});

const battleReportCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/battle_report' }),
  schema: ({ image }) => z.object({
    tags: z.array(z.string()),
    title: z.string(),
    pubDate: z.coerce.date(),
    date: z.string(),
    description: z.string(),
    game_data: z.object({
      points: z.number(),
      attacker: playerSchema,
      defender: playerSchema,
      primary_mission: z.string(),
      deployment: z.string(),
      introduction: z.string(),
      conclusion: z.string()
    }),
    rounds: z.array(
        z.object({
            attacker: turnSchema(image),
            defender: turnSchema(image)
        }),
    )
  }),
});

const cardCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/cards' }),
})

const blogColletion = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
})

export const collections = {
  battle_report: battleReportCollection,
  cards: cardCollection,
  blog: blogColletion,
};