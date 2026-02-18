<template>
  <div class="container mx-auto px-4 py-6 lg:py-8">
    
    <!-- 1. Breadcrumb 麵包屑導航 -->
    <nav v-if="page" class="text-sm mb-6 text-slate-500 dark:text-slate-400 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-2">
      <NuxtLink to="/" class="hover:text-lake-600 dark:hover:text-lake-400 transition-colors">
        所有組織
      </NuxtLink>
      <span>/</span>
      <span class="font-medium text-slate-700 dark:text-slate-300">{{ page.belongsTo }}</span>
      <span>/</span>
      <span class="font-medium text-slate-700 dark:text-slate-300">{{ page.shortTitle }}</span>
      <span>/</span>
      <span class="text-lake-600 dark:text-lake-400 font-bold truncate">{{ toRocDate(page.version) }}版本</span>
    </nav>

    <!-- 主要內容區塊 -->
    <div v-if="page" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- 2. 左欄：法規資訊 -->
      <aside class="col-span-1 lg:col-span-3 lg:sticky lg:top-24 order-1">
        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
          <div class="mb-6">
            <h3 class="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mb-3">
              基本資訊
            </h3>
            
            <div class="space-y-3">
              <div>
                <span class="text-sm text-slate-500 dark:text-slate-400 block">條文日期</span>
                <span class="font-medium text-slate-700 dark:text-slate-200">{{ toRocDate(page.version) }}</span>
              </div>
              
              <div>
                <span class="text-sm text-slate-500 dark:text-slate-400 block mb-1">狀態</span>
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium"
                  :class="page.isCurrent === 'true' 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                    : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'"
                >
                  <span class="w-1.5 h-1.5 rounded-full mr-2" :class="page.isCurrent === 'true' ? 'bg-emerald-500' : 'bg-rose-500'"></span>
                  {{ page.isCurrent === 'true' ? '本網站已知最新版本' : '已知歷史版本' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 歷史版本 -->
          <div class="border-t border-slate-100 dark:border-slate-700 pt-4">
            <h3 class="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mb-3">
              歷次修訂
            </h3>
            <ul class="space-y-1 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <li v-for="ver in historyVersions" :key="ver.path">
                <NuxtLink 
                  :to="ver.path" 
                  class="block px-3 py-2 rounded-lg text-sm transition-all duration-200"
                  :class="route.path === ver.path 
                    ? 'bg-lake-50 dark:bg-lake-900/20 text-lake-700 dark:text-lake-300 font-medium border border-lake-100 dark:border-lake-800' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'"
                >
                  {{ toRocDate(ver.version) }}
                  <span v-if="route.path === ver.path" class="text-xs ml-1 opacity-70">(瀏覽中)</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <!-- 3. 中間欄：法規內文 -->
      <section class="col-span-1 lg:col-span-7 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 md:p-10 shadow-sm min-h-[50vh] order-2">
        <h1 class="text-xl md:text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white leading-tight">
          {{ page.fullTitle }}
        </h1>
        
        <ContentRenderer :value="page" :components="mapComponents" />

      </section>

      <!-- 4. 右欄：目錄 -->
      <aside class="hidden lg:block lg:col-span-2 lg:sticky lg:top-24 order-3">
        <div class="bg-slate-50/50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-100 dark:border-slate-700/50 backdrop-blur-sm">
          <h3 class="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mb-3 pl-2">
            章節目錄
          </h3>
          <nav class="max-h-[70vh] overflow-y-auto custom-scrollbar">
            <ul class="space-y-1 text-sm">
              <li v-for="link in page.body?.toc?.links" :key="link.id">
                <a 
                  :href="`#${link.id}`" 
                  class="block py-1.5 px-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-lake-700 dark:hover:text-lake-300 transition-colors truncate"
                >
                  {{ link.text }}
                </a>
                <ul v-if="link.children" class="pl-3 mt-1 space-y-1 border-l border-slate-200 dark:border-slate-700 ml-2">
                  <li v-for="subLink in link.children" :key="subLink.id">
                    <a 
                      :href="`#${subLink.id}`" 
                      class="block py-1 px-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-xs text-slate-500 dark:text-slate-500 hover:text-lake-600 dark:hover:text-lake-300 truncate"
                    >
                      {{ subLink.text }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

    </div>

    <!-- 錯誤狀態 -->
    <div v-else class="flex flex-col items-center justify-center min-h-[50vh] text-slate-500 dark:text-slate-400">
      <h1 class="text-2xl font-bold text-rose-600 dark:text-rose-400">法規參數錯誤！</h1>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computedAsync } from '@vueuse/core'
import { h, type VNode } from 'vue' // 引入渲染函數 h 與型別

const route = useRoute()
const { path } = route
const { toRocDate } = useRocDate() // 引入日期中文化+民國紀年工具

// 1. 抓取當前頁面內容
const { data: page } = await useAsyncData(path, () => {
  return queryCollection('regulations').path(path).first()
})

// 2. 抓取歷史版本
const historyVersions = computedAsync(async () => {
  if (!page.value) return []
  const currentStem = page.value.stem
  if (!currentStem) return []
  const parentPath = currentStem.substring(0, currentStem.lastIndexOf('/'))
  return await queryCollection('regulations')
    .where('stem', 'LIKE', `${parentPath}%`)
    .select('version', 'path')
    .order('version', 'DESC')
    .all()
})

// 3. 設定頁面 Meta
useHead({
  title: () => page.value 
    ? `${page.value.fullTitle}（${toRocDate(page.value.version)}版本）` 
    : '法規參數錯誤'
})

// ==========================================
// 4. 自定義渲染元件 (解決標題樣式與條號加粗問題)
// ==========================================

// 定義 Regex：抓取行首的「第 X 條」、「第 X 條之 Y」，並包含後方「（...）」或「【...】」的要旨
// 使用 ^ 鎖定開頭，確保不抓取內文中引用的條號
const lawRegex = /(^\s*第\s*[0-9０-９一二三四五六七八九十百]+\s*條(?:之\s*[0-9０-９一二三四五六七八九十百]+)?(?:\s*[（【][^）】]*[）】])?)/g

// 定義要傳給 ContentRenderer 的元件映射表
const mapComponents = {
  // 覆寫 H1
  h1: (props: any, { slots }: any) => h(
    'h1', 
    { 
      ...props, 
      class: 'text-2xl font-bold mt-10 mb-6 text-slate-900 dark:text-slate-100 flex items-center gap-2' 
    }, 
    [
      h('span', { class: 'w-1 h-8 bg-lake-500 rounded-full shrink-0' }), // 湖水色裝飾條
      slots.default?.()
    ]
  ),

  // 覆寫 H2 (保留 props 以確保 id 錨點功能正常)
  h2: (props: any, { slots }: any) => h(
    'h2', 
    { 
      ...props, 
      class: 'text-xl font-bold mt-8 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2 text-slate-800 dark:text-slate-200' 
    }, 
    slots.default?.()
  ),
  
  // 覆寫 H3
  h3: (props: any, { slots }: any) => h(
    'h3',
    {
      ...props,
      class: 'text-lg font-bold mt-6 mb-3 text-slate-800 dark:text-slate-300'
    },
    slots.default?.()
  ),

  // 覆寫 Paragraph (P) - 處理條號加粗的核心邏輯
  p: (props: any, { slots }: any) => {
    // 取得 Slot 中的所有子節點
    const children = slots.default?.()
    
    // 處理子節點的函數
    const processChildren = (nodes: any[]) => {
      if (!nodes) return []
      return nodes.map((node) => {
        // 情況 A: 節點本身就是字串 (Vue 有時會這樣傳)
        if (typeof node === 'string') {
          const newText = node.replace(lawRegex, '<strong class="font-black text-slate-900 dark:text-slate-50 text-lg">$1</strong>')
          if (newText !== node) {
            return h('span', { innerHTML: newText })
          }
          return node
        }
        
        // 情況 B: 節點是 VNode，且 children 是字串 (最常見的情況)
        if (node && typeof node.children === 'string') {
          const originalText = node.children
          const newText = originalText.replace(lawRegex, '<strong class="font-black text-slate-900 dark:text-slate-50 text-lg">$1</strong>')
          
          // 如果有變更，回傳一個新的 span 包裹 innerHTML
          if (newText !== originalText) {
             return h('span', { innerHTML: newText })
          }
        }
        
        // 其他情況 (例如連結、圖片)，原樣回傳
        return node
      })
    }

    return h(
      'p', 
      { 
        ...props, 
        class: 'mb-5 leading-8 text-lg text-justify text-slate-700 dark:text-slate-300 break-words' 
      }, 
      processChildren(children)
    )
  }
}
</script>

<style scoped>
/* 自定義 Scrollbar 微調 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #475569;
}

/* 確保錨點定位時不會被 Sticky Header 擋住 */
:deep(h1), :deep(h2), :deep(h3) {
  scroll-margin-top: 100px;
}
</style>