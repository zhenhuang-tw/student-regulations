// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxt/content'
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-TW',
        'data-color-mode': '' // 用於配合 color-mode 套件
      },
      title: '臺灣學生自治規章典藏',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '蒐集台灣各校學生自治組織規章，包含歷史版本。' }
      ],
      link: [
        // 注意：這裡的路徑必須配合下方的 baseURL 修改
        // 如果 baseURL 是 /student-regulations/，這裡也要加上
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/student-regulations/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/student-regulations/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/student-regulations/favicon-16x16.png' },
        { rel: 'manifest', href: '/student-regulations/site.webmanifest' },
        { rel: 'icon', type: 'image/x-icon', href: '/student-regulations/favicon.ico' }
      ]
    },
    // 用於 GitHub Pages 的 Repo 名稱，確保這裡與 GitHub Repository 名稱一致
    baseURL: '/student-regulations/'
  },

  // 為了靜態生成 (SSG)，啟用 SSR，這樣 nuxt generate 才能產出 HTML
  ssr: true,

  nitro: {
    // 使用 github_pages preset 會自動建立 .nojekyll 檔案，避免 _nuxt 資料夾被忽略
    preset: 'github_pages',
    prerender: {
      crawlLinks: true, // 確保爬蟲抓取所有連結頁面
      failOnError: false, // 容許部分資源錯誤（如外部圖片）而不中斷部署
    }
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },
  css: [
    '~/assets/css/main.css', // Ensure your main CSS is included
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: '2025-02-17' // 確保 Content V3 相容性日期
})