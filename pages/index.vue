<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="text-center py-20">
      <!-- CTA Buttons -->
      <div class="mt-12 space-y-4">
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/character-reference"
            class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl inline-block"
          >
            角色創建參考
          </NuxtLink>
          <!-- <NuxtLink 
            to="/icons-test"
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl inline-block"
          >
            圖示測試
          </NuxtLink> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '迷霧傳奇 - 角色扮演遊戲系統',
  meta: [
    { name: 'description', content: '探索神秘世界，建立獨特角色，展開傳奇冒險' }
  ]
})
</script>
