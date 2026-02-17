<template>
  <div :class="{ 'dark': isDark }">
    <div class="min-h-screen transition-colors duration-300 bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 font-sans">
      
      <header class="fixed top-0 left-0 right-0 z-50 border-b border-lake-200/50 dark:border-lake-800/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-all duration-300">
        <div class="container mx-auto px-4 h-16 flex items-center justify-between">
          
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-lake-400 to-lake-600 flex items-center justify-center text-white shadow-lg shadow-lake-500/20 group-hover:shadow-lake-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.472V5.512c0-.26-.11-.52-.346-.664A9.706 9.706 0 0018 3c-2.12 0-4.067.653-5.25 1.886v15.75z" />
              </svg>
            </div>
            <h1 class="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-lake-600 to-lake-800 dark:from-lake-300 dark:to-lake-500">
              臺灣學生自治規章典藏
            </h1>
          </NuxtLink>

          <div class="flex items-center gap-4">
            <!--<div class="hidden md:flex items-center relative">
              <input 
                type="text" 
                placeholder="搜尋法規..." 
                class="bg-slate-100 dark:bg-slate-800 border-none rounded-full py-1.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-lake-400 transition-all w-48 focus:w-64 placeholder-slate-400"
              >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 absolute right-3 text-slate-400">
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
              </svg>
            </div>-->

            <button 
              @click="toggleTheme" 
              class="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-lake-600 dark:text-lake-300 focus:outline-none focus:ring-2 focus:ring-lake-400"
              :title="isDark ? '切換至亮色模式' : '切換至暗色模式'"
            >
              <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main class="pt-20 min-h-[calc(100vh-4rem)]">
        <NuxtPage />
      </main>

      <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 mt-auto py-8 text-center">
        <p class="text-slate-500 text-sm">
          &copy; {{ new Date().getFullYear() }} 臺灣學生自治規章典藏.
        </p>
        <p class="text-xs text-lake-500 mt-2 font-mono"><a href="https://github.com/huang-zane/student-regulations" class="text-lake-500">GitHub</a></p>
      </footer>

    </div>
  </div>
</template>

<script setup lang="ts">
// 亮暗色模式邏輯
const isDark = ref(false)

onMounted(() => {
  // 1. 檢查 localStorage 是否有儲存的偏好
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
  } else {
    // 2. 如果沒有，檢查系統偏好 (prefers-color-scheme)
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // 初始化 HTML class
  updateHtmlClass()
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  updateHtmlClass()
}

// 同步更新 html tag 的 class (Tailwind 'class' 模式需要)
const updateHtmlClass = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<style>
/* 全域轉場設定，讓頁面切換更滑順 */
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

/* 自定義捲軸樣式，符合「湖水」主題 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent; 
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1; /* slate-300 */
  border-radius: 4px;
}
.dark ::-webkit-scrollbar-thumb {
  background: #334155; /* slate-700 */
}
::-webkit-scrollbar-thumb:hover {
  background: #14b8a6; /* lake-500 */
}
</style>