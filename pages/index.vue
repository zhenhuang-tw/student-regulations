<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-8 text-center">台灣學生自治法規整合平台</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(group, orgId) in groupedRegulations" :key="orgId" class="border rounded-lg shadow-md hover:shadow-lg transition bg-white overflow-hidden">
        <div class="bg-blue-600 text-white p-4">
          <h2 class="text-xl font-bold">{{ group.orgName }}</h2>
        </div>
        
        <div class="p-4">
          <ul class="space-y-2">
            <li v-for="reg in group.regulations" :key="reg.stem" class="flex justify-between items-center border-b pb-1 last:border-0">
              <span class="text-gray-700 font-medium">{{ reg.title }}</span>
              <NuxtLink 
                :to="reg.path"
                class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
              >
                檢視
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 取得所有法規資料
const { data: allRegulations } = await useAsyncData('home-regulations', () => {
  return queryCollection('regulations')
    .select('title', 'organizationName', 'path', 'stem', 'version')
    .order('version', 'DESC') // 先按日期降序，確保下面過濾時先抓到最新的
    .all()
})

// 資料處理：依照組織分組，並過濾出每個法規的「最新版本」
const groupedRegulations = computed(() => {
  if (!allRegulations.value) return {}

  const groups: Record<string, any> = {}

  allRegulations.value.forEach(item => {
    // 假設路徑結構為 /regulations/org-id/reg-id/version
    // item.stem 會類似 "regulations/ntpu-su/constitution/2025-02-17"
    const parts = item.stem.split('/')
    if (parts.length < 4) return // 結構不對則跳過

    const orgId = parts[1]
    const regId = parts[2]

    if (!groups[orgId]) {
      groups[orgId] = {
        orgName: item.organizationName,
        regulations: [] // 這裡存放該組織處理過的法規清單
      }
    }

    // 檢查這個法規是否已經被加入過 (因為我們已按日期降序，第一個遇到的一定是最新版)
    const exists = groups[orgId].regulations.find((r: any) => r.regId === regId)
    if (!exists) {
      groups[orgId].regulations.push({
        title: item.title,
        regId: regId,
        path: item.path, // 連結到最新版的路徑
        latestVersion: item.version
      })
    }
  })

  return groups
})
</script>