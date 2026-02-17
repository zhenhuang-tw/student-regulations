<template>
  <div class="h-screen flex flex-col">
    <header class="bg-gray-800 text-white p-4 shadow">
      <NuxtLink to="/" class="hover:text-gray-300">← 返回首頁</NuxtLink>
      <span class="mx-2">|</span>
      <span class="font-bold">{{ page?.organizationName }} - {{ page?.title }}</span>
    </header>

    <main class="flex-1 overflow-hidden">
      <div v-if="page" class="grid grid-cols-12 h-full">
        
        <aside class="col-span-2 bg-gray-50 border-r p-4 overflow-y-auto">
          <div class="mb-6">
            <h3 class="text-sm uppercase text-gray-500 font-bold mb-2">法規資訊</h3>
            <p><strong>版本：</strong> {{ page.version }}</p>
            <p><strong>狀態：</strong> 
              <span :class="{'text-green-600': page.status === 'effective', 'text-red-600': page.status === 'abolished'}">
                {{ page.status === 'effective' ? '現行有效' : '非現行版本' }}
              </span>
            </p>
          </div>

          <div>
            <h3 class="text-sm uppercase text-gray-500 font-bold mb-2">歷史版本</h3>
            <ul class="space-y-1">
              <li v-for="ver in historyVersions" :key="ver.path">
                <NuxtLink 
                  :to="ver.path" 
                  class="block px-2 py-1 rounded text-sm"
                  :class="route.path === ver.path ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'"
                >
                  {{ ver.version }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </aside>

        <section class="col-span-8 p-8 overflow-y-auto bg-white article-content">
          <h1 class="text-3xl font-bold mb-6 text-center">{{ page.title }}</h1>
          
          <ContentRenderer :value="page">
             <template #p="{ children }">
              <p class="mb-4 leading-relaxed text-lg text-justify text-gray-800 law-paragraph">
                <span v-for="(child, index) in children" :key="index">
                    <span v-if="typeof child === 'string'" v-html="formatLawText(child)"></span>
                    <span v-else>{{ child }}</span>
                 </span>
              </p>
            </template>
            <template #h1> <h1 class="text-2xl font-bold my-4"> <slot /> </h1> </template>
            <template #h2> <h2 class="text-xl font-bold my-3 border-b pb-2"> <slot /> </h2> </template>
          </ContentRenderer>
        </section>

        <aside class="col-span-2 bg-gray-50 border-l p-4 overflow-y-auto">
          <h3 class="text-sm uppercase text-gray-500 font-bold mb-4">目錄</h3>
          <nav>
            <ul class="space-y-2 text-sm">
              <li v-for="link in page.body?.toc?.links" :key="link.id">
                <a :href="`#${link.id}`" class="text-gray-600 hover:text-blue-600 block truncate">
                  {{ link.text }}
                </a>
                 <ul v-if="link.children" class="pl-4 mt-1 space-y-1">
                   <li v-for="subLink in link.children" :key="subLink.id">
                      <a :href="`#${subLink.id}`" class="text-gray-500 hover:text-blue-600 block truncate text-xs">
                        {{ subLink.text }}
                      </a>
                   </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>

      </div>
      <div v-else class="p-10 text-center text-gray-500">
        載入中或找不到該法規...
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { path } = route

// 1. 抓取當前頁面內容
const { data: page } = await useAsyncData(path, () => {
  return queryCollection('regulations').path(path).first()
})

// 2. 抓取同一個法規的所有歷史版本
// 我們需要解析路徑來知道當前是哪個組織、哪個法規
// 假設路徑：/regulations/ntpu-su/constitution/2025-02-17
const historyVersions = computedAsync(async () => {
  if (!page.value) return []
  
  // 取得父資料夾路徑 (即法規 ID 層級)
  const currentStem = page.value.stem
  const parentPath = currentStem.substring(0, currentStem.lastIndexOf('/'))

  // 查詢所有開頭路徑符合該法規 ID 的檔案
  return await queryCollection('regulations')
    .where('stem', 'LIKE', `${parentPath}%`)
    .select('version', 'path')
    .order('version', 'DESC')
    .all()
})

// 輔助函式：簡單的前端字串取代，將 "第 x 條" 加粗
// 注意：這只適用於純文字節點，若 Markdown 解析後結構複雜可能需要 Rehype
function formatLawText(text: string) {
  const regex = /(^|\s)(第\s*[0-9０-９一二三四五六七八九十百]+\s*條)/g
  return text.replace(regex, '$1<strong class="font-black text-black">$2</strong>')
}

// 需要引入 computedAsync 因為我們在 setup 裡使用了 async query 依賴 page.value
import { computedAsync } from '@vueuse/core' 
</script>

<style scoped>
/* 針對 Markdown 內容的額外樣式 */
.article-content :deep(h1), 
.article-content :deep(h2), 
.article-content :deep(h3) {
  scroll-margin-top: 20px; /* 錨點定位偏移 */
}
</style>