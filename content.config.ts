// content.config.ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    regulations: defineCollection({
      type: 'page', // page 類型會自動處理路徑
      source: 'regulations/**/*.md', // 讀取規則
      schema: z.object({
        fullTitle: z.string(),
        shortTitle: z.string(),
        note: z.string(),
        isCurrent: z.string().default('true'),
        source: z.string(),
        belongsTo: z.string(),
        versionOf: z.string(),
        version: z.string(), // YYYY-MM-DD
      })
    })
  }
})