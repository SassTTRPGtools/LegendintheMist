<template>
  <div class="p-8 bg-slate-800 min-h-screen">
    <h1 class="text-white text-2xl mb-8">SpecialtyTooltip 測試</h1>
    
    <div class="space-y-4">
      <!-- 基本測試 -->
      <div class="bg-slate-700 p-4 rounded">
        <h2 class="text-white text-lg mb-4">基本測試</h2>
        <SpecialtyTooltip
          name="測試專長"
          description="這是一個測試專長的描述，用來驗證懸浮提示是否正常工作。"
        >
          <span class="inline-flex items-center px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs cursor-help border border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400/50 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-200">
            測試專長
          </span>
        </SpecialtyTooltip>
      </div>
      
      <!-- 多個專長測試 -->
      <div class="bg-slate-700 p-4 rounded">
        <h2 class="text-white text-lg mb-4">多個專長測試</h2>
        <div class="flex flex-wrap gap-2">
          <SpecialtyTooltip
            v-for="(specialty, index) in testSpecialties"
            :key="index"
            :name="specialty.name"
            :description="specialty.description"
          >
            <span class="inline-flex items-center px-2 py-1 bg-amber-600/20 text-amber-300 rounded text-xs cursor-help border border-amber-500/30 hover:bg-amber-500/30 hover:border-amber-400/50 hover:text-amber-200 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-200">
              {{ specialty.name }}
            </span>
          </SpecialtyTooltip>
        </div>
      </div>
      
      <!-- 空值測試 -->
      <div class="bg-slate-700 p-4 rounded">
        <h2 class="text-white text-lg mb-4">空值測試</h2>
        <SpecialtyTooltip
          name=""
          description=""
        >
          <span class="inline-flex items-center px-2 py-1 bg-red-600/20 text-red-300 rounded text-xs cursor-help border border-red-500/30">
            空專長（應該不顯示提示）
          </span>
        </SpecialtyTooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const testSpecialties = ref([
  {
    name: '深度客製化',
    description: '選擇你裝備主題中的一件物品。每次休整時，你可新增一個代表該物品特定功能或附加效果的裝備標籤，此標籤可於特定條件或用途下使用。'
  },
  {
    name: '全套設備',
    description: '選擇街頭目錄中的一個類別。你現在擁有該類別所有標籤，並能在裝備裝載時任意啟用。可多次選擇不同類別。'
  },
  {
    name: '額外複製',
    description: '每場遊戲一次，你可複製一個非唯一物品的裝備標籤，分別給隊友或盟友使用，自己仍保有該標籤。'
  }
])
</script>
