<template>
  <div class="min-h-screen bg-gray-900 pb-8 relative overflow-hidden">
    <!-- 賽博龐克網格背景 -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px); background-size: 20px 20px;"></div>
    </div>
    
    <!-- Header -->
    <div class="bg-gray-800 shadow-lg border-b border-cyan-500/30 relative z-10">
      <div class="px-4 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/MO" class="text-cyan-300 hover:text-cyan-100 transition-colors">
            <Icon name="lucide:arrow-left" class="w-6 h-6" />
          </NuxtLink>
          <h1 class="text-xl font-bold text-cyan-100 flex items-center">
            <Icon name="lucide:user-plus" class="w-5 h-5 mr-2 text-cyan-400" />
            角色創建指南 - 都市異景
          </h1>
          <div class="w-6"></div> <!-- Spacer -->
        </div>
      </div>
    </div>    <!-- Main Content -->
    <div class="px-4 py-6 relative z-10">
      <!-- Desktop Layout -->
      <div class="hidden lg:grid lg:grid-cols-3 lg:gap-6 max-w-7xl mx-auto">
        <!-- 第一欄：核心概念與快速開始 -->
        <div class="space-y-6">
          <!-- 角色創建核心概念 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-cyan-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-cyan-600 to-purple-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:lightbulb" class="w-5 h-5 mr-2" />
                核心概念
              </h2>
            </div>
            <div class="p-4 space-y-4">
              <div class="bg-cyan-900/30 p-4 rounded-lg border-l-4 border-cyan-400">
                <h3 class="font-semibold text-cyan-200 mb-2">角色創建原理</h3>
                <p class="text-cyan-300 text-sm">
                  你可以創造出任何你能想像的角色，方法是：用標籤來描述他們。
                </p>
              </div>
              
              <div class="bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-400">
                <h3 class="font-semibold text-blue-200 mb-2">每個角色需要</h3>
                <ul class="text-blue-300 text-sm space-y-1">
                  <li>• 四個主題</li>
                  <li>• 每個主題包含：能力標籤、弱點標籤、使命</li>
                  <li>• 一個背包標籤</li>
                </ul>
              </div>

              <div class="bg-yellow-900/30 p-4 rounded-lg border-l-4 border-yellow-400">
                <h3 class="font-semibold text-yellow-200 mb-2">如何選擇主題</h3>                <p class="text-yellow-300 text-sm mb-2">
                  選擇主題的關鍵在於——你想突顯角色哪一個面向？哪些是他在故事開端最重要的特質？
                </p>
                <p class="text-yellow-400 text-xs">
                  記住，這些主題可能會隨著劇情發展而改變，讓故事聚焦在你角色的新面向上。
                </p>
              </div>
            </div>
          </div>


          <!-- 賽博龐克角色建議 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-purple-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
              <h2 class="text-lg font-bold text-white flex items-center">
                <Icon name="lucide:cpu" class="w-4 h-4 mr-2" />
                賽博龐克角色建議
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-300 text-sm mb-3">在都市異景中，你可以從以下選擇四個主題：</p>
              <div class="space-y-2 text-sm">
                <div class="p-2 bg-purple-900/30 rounded border border-purple-500/30">
                  <span class="font-semibold text-purple-200">增強改造：</span>
                  <span class="text-purple-300">你的身體或心智改造</span>
                </div>
                <div class="p-2 bg-blue-900/30 rounded border border-blue-500/30">
                  <span class="font-semibold text-blue-200">前沿科技：</span>
                  <span class="text-blue-300">你掌握的高科技裝備</span>
                </div>
                <div class="p-2 bg-cyan-900/30 rounded border border-cyan-500/30">
                  <span class="font-semibold text-cyan-200">賽博空間：</span>
                  <span class="text-cyan-300">你在虛擬世界的能力</span>
                </div>
                <div class="p-2 bg-orange-900/30 rounded border border-orange-500/30">
                  <span class="font-semibold text-orange-200">無人機群：</span>
                  <span class="text-orange-300">你控制的自動化裝置</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 第二欄：兩種主要方法 -->
        <div class="space-y-6">

          <!-- 最簡單的方法 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-green-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:zap" class="w-5 h-5 mr-2" />
                最簡單的方法
              </h2>
              <p class="text-green-100 text-sm mt-1">直接寫下來</p>
            </div>
            <div class="p-4">
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex-shrink-0">1</span>
                  <p class="text-gray-300 text-sm">想好你的四個主題，並為每個主題寫下一個能力標籤</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex-shrink-0">2</span>
                  <p class="text-gray-300 text-sm">為每個主題再加上兩個能力標籤與一個弱點標籤</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex-shrink-0">3</span>
                  <p class="text-gray-300 text-sm">為每個主題寫下一項使命，並選擇一個主題類型</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex-shrink-0">4</span>
                  <p class="text-gray-300 text-sm">創建一個背包標籤</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 最細緻的方法 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-purple-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:book-open" class="w-5 h-5 mr-2" />
                最細緻的方法
              </h2>
              <p class="text-purple-100 text-sm mt-1">回答主題問題</p>
            </div>
            <div class="p-4">
              <p class="text-gray-300 text-sm mb-4">賽博龐克主題包含一組引導問題，幫助你一步步建立角色的概念與內容。</p>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <span class="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full flex-shrink-0">1</span>
                  <p class="text-gray-300 text-sm">選擇四種主題類型（可以重複選擇同一類型）</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full flex-shrink-0">2</span>
                  <p class="text-gray-300 text-sm">回答每個主題中的問題，來創建標籤</p>
                </div>                <div class="flex items-start space-x-3">
                  <span class="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full flex-shrink-0">3</span>
                  <div class="text-gray-300 text-sm">
                    <p class="mb-1">每個主題的第一題（粗體）<span class="text-red-400 font-semibold">必答</span>，然後選擇其中任兩題來建立能力標籤</p>
                    <p class="text-gray-400 text-xs">可重複題目</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full flex-shrink-0">4</span>
                  <p class="text-gray-300 text-sm">額外選擇一題弱點標籤問題來建立該主題的弱點標籤</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full flex-shrink-0">5</span>
                  <p class="text-gray-300 text-sm">使用主題內建建議與指引來寫下該主題的使命</p>
                </div>
                <div class="flex items-start space-x-3">
                  <span class="inline-flex items-center justify-center w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full flex-shrink-0">6</span>
                  <p class="text-gray-300 text-sm">選擇適合賽博龐克世界的背包標籤</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 混合使用 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-orange-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-orange-600 to-red-600 p-4">
              <h2 class="text-lg font-bold text-white flex items-center">
                <Icon name="lucide:shuffle" class="w-4 h-4 mr-2" />
                混合使用
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-300 text-sm mb-3">你也可以混合使用以上方法，舉例來說：</p>
              <div class="space-y-2">
                <div class="p-2 bg-orange-900/30 rounded border-l-3 border-orange-400">
                  <p class="text-orange-300 text-sm">使用典型賽博角色起手，但改用主題問題創造標籤</p>
                </div>
                <div class="p-2 bg-red-900/30 rounded border-l-3 border-red-400">
                  <p class="text-red-300 text-sm">或混用主題工具和主題問題來創造標籤</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 第三欄：檢查清單與指引 -->
        <div class="space-y-6">
          <!-- 創建檢查清單 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-red-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-red-600 to-pink-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:check-square" class="w-5 h-5 mr-2" />
                角色創建檢查清單
              </h2>
            </div>
            <div class="p-4 space-y-4">
              <div class="p-3 bg-green-900/30 rounded-lg border-l-4 border-green-400">
                <h4 class="font-semibold text-green-200 mb-2 flex items-center">
                  <Icon name="lucide:check" class="w-4 h-4 mr-2" />
                  能力標籤應該有用
                </h4>
                <p class="text-green-300 text-sm">請自問：「這個標籤可以支援哪些行動？」</p>
              </div>

              <div class="p-3 bg-red-900/30 rounded-lg border-l-4 border-red-400">
                <h4 class="font-semibold text-red-200 mb-2 flex items-center">
                  <Icon name="lucide:alert-triangle" class="w-4 h-4 mr-2" />
                  弱點標籤應該具有限制性
                </h4>
                <p class="text-red-300 text-sm">請自問：「這個標籤會妨礙哪些行動？」或「這標籤什麼時候會讓我的角色陷入麻煩？」</p>
              </div>              <div class="p-3 bg-gray-700/50 rounded-lg border-l-4 border-cyan-400">
                <h4 class="font-semibold text-cyan-100 mb-2 flex items-center">
                  <Icon name="lucide:cpu" class="w-4 h-4 mr-2" />
                  標籤應該符合賽博龐克風格
                </h4>
                <div class="space-y-1 text-xs">
                  <div><span class="font-semibold text-cyan-200">增強改造：</span> <span class="text-gray-200">身體或心智的科技強化</span></div>
                  <div><span class="font-semibold text-purple-200">前沿科技：</span> <span class="text-gray-200">高科技裝備與工具</span></div>
                  <div><span class="font-semibold text-blue-200">賽博空間：</span> <span class="text-gray-200">虛擬世界的能力</span></div>
                  <div><span class="font-semibold text-orange-200">無人機群：</span> <span class="text-gray-200">自動化裝置控制</span></div>
                </div>
              </div>

              <div class="p-3 bg-purple-900/30 rounded-lg border-l-4 border-purple-400">
                <h4 class="font-semibold text-purple-200 mb-2 flex items-center">
                  <Icon name="lucide:target" class="w-4 h-4 mr-2" />
                  使命應該明確
                </h4>
                <div class="text-purple-300 text-sm space-y-1">
                  <p>大多數的使命會落入以下類型：</p>
                  <div class="text-xs space-y-1 ml-2">
                    <div>• <span class="font-semibold">願望：</span>你渴望或追求的目標</div>
                    <div>• <span class="font-semibold">信念：</span>你所相信並努力維護的真理</div>
                    <div>• <span class="font-semibold">家園：</span>你致力守護或維繫的地方或人</div>
                    <div>• <span class="font-semibold">問題：</span>你渴望了解的一個大哉問</div>
                  </div>
                </div>
              </div>

              <div class="p-3 bg-yellow-900/30 rounded-lg border-l-4 border-yellow-400">
                <h4 class="font-semibold text-yellow-200 mb-2 flex items-center">
                  <Icon name="lucide:users" class="w-4 h-4 mr-2" />
                  與說書人達成共識
                </h4>
                <p class="text-yellow-300 text-sm">請討論每個標籤的意義與使用方式，事先約定好什麼時候可以使用它們。</p>
              </div>

              <div class="p-3 bg-indigo-900/30 rounded-lg border-l-4 border-indigo-400">
                <h4 class="font-semibold text-indigo-200 mb-2 flex items-center">
                  <Icon name="lucide:tag" class="w-4 h-4 mr-2" />
                  標記標籤的廣度
                </h4>
                <div class="text-indigo-300 text-sm space-y-2">
                  <div>
                    <span class="font-semibold">廣泛標籤：</span>如「駭客」、「改造人」、「企業特工」
                    <p class="text-xs text-indigo-400">適用範圍大，但通常需要額外檢定</p>
                  </div>
                  <div>
                    <span class="font-semibold">具體標籤：</span>如「神經插槽」、「光學迷彩」
                    <p class="text-xs text-indigo-400">可直接使用，但只能在特定情境中發揮</p>
                  </div>
                  <p class="text-xs text-indigo-400 italic">理想上應該混搭使用</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 使命指引 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-amber-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-amber-600 to-orange-600 p-4">
              <h2 class="text-lg font-bold text-white flex items-center">
                <Icon name="lucide:compass" class="w-4 h-4 mr-2" />
                你的使命是你的旅程
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-300 text-sm mb-3">
                在遊戲中，說書人會挑戰你的使命，並為你提供成長機會，迫使你的角色做出抉擇、捨棄或成長。
              </p>
              <div class="bg-amber-900/30 p-3 rounded-lg border border-amber-500/30">
                <p class="text-amber-300 text-sm">
                  你選擇的使命會決定你希望探索哪些故事路線。
                </p>
              </div>
            </div>
          </div>

          <!-- 快速連結 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-gray-600/30 overflow-hidden">
            <div class="bg-gradient-to-r from-gray-500 to-slate-600 p-4">
              <h2 class="text-lg font-bold text-white flex items-center">
                <Icon name="lucide:external-link" class="w-4 h-4 mr-2" />
                相關資源
              </h2>
            </div>
            <div class="p-4 space-y-2">              <NuxtLink to="/LitM/character-reference" 
                class="block p-2 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                <div class="flex items-center text-blue-700">
                  <Icon name="lucide:scroll-text" class="w-4 h-4 mr-2" />
                  <span class="text-sm font-medium">角色創建參考</span>
                </div>
                <p class="text-blue-600 text-xs mt-1">查看主題書問題與範例</p>
              </NuxtLink>
              
              <NuxtLink to="/LitM/how-to-play" 
                class="block p-2 bg-green-50 rounded hover:bg-green-100 transition-colors">
                <div class="flex items-center text-green-700">
                  <Icon name="lucide:book-open" class="w-4 h-4 mr-2" />
                  <span class="text-sm font-medium">如何遊玩</span>
                </div>
                <p class="text-green-600 text-xs mt-1">了解遊戲規則與機制</p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Layout -->
      <div class="lg:hidden max-w-md mx-auto space-y-6">
        <!-- 核心概念手機版 -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gradient-to-r from-emerald-500 to-green-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:lightbulb" class="w-5 h-5 mr-2" />
              角色創建核心
            </h2>
          </div>
          <div class="p-4 space-y-4">
            <div class="bg-emerald-50 p-3 rounded-lg border-l-4 border-emerald-400">
              <p class="text-emerald-700 text-sm">
                你可以創造出任何你能想像的角色，方法是：用標籤（tags）來描述他們。
              </p>
            </div>
            
            <div class="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
              <h4 class="font-semibold text-blue-800 mb-2">每個角色需要</h4>
              <ul class="text-blue-700 text-sm space-y-1">
                <li>• 四個主題（Themes）</li>
                <li>• 每個主題：能力標籤、弱點標籤、使命</li>
                <li>• 一個背包標籤</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 三種創建方法手機版 -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:layers" class="w-5 h-5 mr-2" />
              三種創建方法
            </h2>
          </div>
          <div class="p-4 space-y-4">
            <!-- 最簡單 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:zap" class="w-4 h-4 mr-2 text-green-500" />
                最簡單：直接寫下來
              </h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-start space-x-2">
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex-shrink-0">1</span>
                  <p class="text-gray-700">想好四個主題，每個寫下一個能力標籤</p>
                </div>
                <div class="flex items-start space-x-2">
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex-shrink-0">2</span>
                  <p class="text-gray-700">每個主題再加兩個能力標籤與一個弱點標籤</p>
                </div>
                <div class="flex items-start space-x-2">
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex-shrink-0">3</span>
                  <p class="text-gray-700">為每個主題寫下使命，選擇主題類型</p>
                </div>
                <div class="flex items-start space-x-2">
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex-shrink-0">4</span>
                  <p class="text-gray-700">創建背包標籤</p>
                </div>
              </div>
            </div>

            <hr class="border-gray-200">

            <!-- 最快速 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:rocket" class="w-4 h-4 mr-2 text-blue-500" />
                最快速：選典型角色
              </h3>
              <p class="text-gray-600 text-sm mb-2">典型角色就像角色食譜</p>
              <div class="space-y-2 text-sm">
                <div class="flex items-start space-x-2">
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex-shrink-0">1</span>
                  <p class="text-gray-700">選擇典型角色，寫下三個主題</p>
                </div>
                <div class="flex items-start space-x-2">
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex-shrink-0">2</span>
                  <p class="text-gray-700">從清單挑選第四個主題</p>
                </div>
                <div class="flex items-start space-x-2">
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex-shrink-0">3</span>
                  <p class="text-gray-700">使用主題工具選標籤與使命</p>
                </div>
              </div>
            </div>

            <hr class="border-gray-200">

            <!-- 最細緻 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:book-open" class="w-4 h-4 mr-2 text-purple-500" />
                最細緻：回答主題書問題
              </h3>
              <p class="text-gray-600 text-sm mb-2">問題引導建立主題概念</p>
              <div class="space-y-2 text-sm">
                <div class="flex items-start space-x-2">
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-purple-500 text-white text-xs font-bold rounded-full flex-shrink-0">1</span>
                  <p class="text-gray-700">選擇四種主題類型</p>
                </div>
                <div class="flex items-start space-x-2">
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-purple-500 text-white text-xs font-bold rounded-full flex-shrink-0">2</span>
                  <p class="text-gray-700">回答問題創建標籤</p>
                </div>
                <div class="flex items-start space-x-2">
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-purple-500 text-white text-xs font-bold rounded-full flex-shrink-0">3</span>
                  <p class="text-gray-700">第一題（粗體）<span class="text-red-600 font-semibold">必答</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 檢查清單手機版 -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gradient-to-r from-red-500 to-pink-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:check-square" class="w-5 h-5 mr-2" />
              創建檢查清單
            </h2>
          </div>
          <div class="p-4 space-y-3">
            <div class="p-2 bg-green-50 rounded-lg border-l-3 border-green-400">
              <h4 class="font-semibold text-green-800 text-sm mb-1">能力標籤應該有用</h4>
              <p class="text-green-700 text-xs">自問：這個標籤可以支援哪些行動？</p>
            </div>

            <div class="p-2 bg-red-50 rounded-lg border-l-3 border-red-400">
              <h4 class="font-semibold text-red-800 text-sm mb-1">弱點標籤應該具有限制性</h4>
              <p class="text-red-700 text-xs">自問：這個標籤會妨礙哪些行動？</p>
            </div>

            <div class="p-2 bg-blue-50 rounded-lg border-l-3 border-blue-400">
              <h4 class="font-semibold text-blue-800 text-sm mb-1">標籤應該與主題威能相符</h4>
              <div class="text-xs space-y-1">
                <div><span class="font-semibold text-purple-700">偉業：</span>宏大氣魄</div>
                <div><span class="font-semibold text-orange-700">冒險：</span>超凡脫俗</div>
                <div><span class="font-semibold text-green-700">起源：</span>平凡寫實</div>
              </div>
            </div>

            <div class="p-2 bg-purple-50 rounded-lg border-l-3 border-purple-400">
              <h4 class="font-semibold text-purple-800 text-sm mb-1">使命應該明確</h4>
              <p class="text-purple-700 text-xs">願望、信念、家園、問題</p>
            </div>

            <div class="p-2 bg-yellow-50 rounded-lg border-l-3 border-yellow-400">
              <h4 class="font-semibold text-yellow-800 text-sm mb-1">與說書人達成共識</h4>
              <p class="text-yellow-700 text-xs">討論標籤意義與使用方式</p>
            </div>
          </div>
        </div>

        <!-- 相關資源手機版 -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gradient-to-r from-gray-500 to-slate-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:external-link" class="w-5 h-5 mr-2" />
              相關資源
            </h2>
          </div>
          <div class="p-4 space-y-3">            <NuxtLink to="/LitM/character-reference" 
              class="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div class="flex items-center text-blue-700 mb-1">
                <Icon name="lucide:scroll-text" class="w-4 h-4 mr-2" />
                <span class="font-medium">角色創建參考</span>
              </div>
              <p class="text-blue-600 text-sm">查看主題書問題與範例</p>
            </NuxtLink>
            
            <NuxtLink to="/LitM/how-to-play" 
              class="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div class="flex items-center text-green-700 mb-1">
                <Icon name="lucide:book-open" class="w-4 h-4 mr-2" />
                <span class="font-medium">如何遊玩</span>
              </div>
              <p class="text-green-600 text-sm">了解遊戲規則與機制</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 頁面標題
useHead({
  title: '角色創建指南 - 迷霧傳奇'
})
</script>

<style scoped>
/* 自定義滾動條 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* 卡片懸停效果 */
.bg-white {
  transition: all 0.2s ease-in-out;
}

.bg-white:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* 連結懸停效果 */
a:hover {
  transform: translateY(-1px);
}
</style>
