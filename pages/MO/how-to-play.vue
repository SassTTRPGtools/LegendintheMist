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
            <Icon name="lucide:cpu" class="w-5 h-5 mr-2 text-cyan-400" />
            如何遊玩 - 都市異景
          </h1>
          <div class="w-6"></div> <!-- Spacer -->
        </div>
      </div>
    </div>    <!-- Main Content -->
    <div class="px-4 py-6 relative z-10">
      <!-- Desktop Layout -->
      <div class="hidden lg:grid lg:grid-cols-3 lg:gap-6 max-w-7xl mx-auto">        <!-- 第一欄：核心概念 + 狀態 + 同行羈絆 -->
        <div class="space-y-6">
          <!-- 標籤系統 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-cyan-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-cyan-600 to-purple-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:tag" class="w-5 h-5 mr-2" />
                本遊戲以「標籤」為核心
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-300 leading-relaxed mb-4">
                標籤是簡短描述，說明角色的現狀，並在行動時提供力度（或減弱）影響力。
              </p>
              <div class="bg-cyan-900/30 p-3 rounded-lg border border-cyan-500/30">
                <p class="text-cyan-300 text-sm">
                  <strong>例如：</strong>敏銳感官、驅靈術、↡不被信任
                </p>
              </div>
            </div>
          </div>

          <!-- 主題 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-purple-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:circuit-board" class="w-5 h-5 mr-2" />
                主題
              </h2>
            </div>            <div class="p-4 space-y-4">
              <p class="text-gray-300">每位角色有四個主題，每個主題包含：</p>
              
              <div class="space-y-3">
                <div class="p-3 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400">
                  <h4 class="font-semibold text-cyan-200 mb-2">能力標籤</h4>
                  <ul class="text-cyan-300 text-sm space-y-1">
                    <li>• 正面標籤，能提升行動強度</li>
                    <li>• 可暫時刪劃（///）使用，直到恢復為止</li>
                  </ul>
                </div>

                <div class="p-3 bg-red-900/30 rounded-lg border-l-4 border-red-400">
                  <h4 class="font-semibold text-red-200 mb-2">↡弱點標籤</h4>
                  <ul class="text-red-300 text-sm space-y-1">
                    <li>• 負面標籤，會降低行動強度</li>
                    <li>• 使用後可讓主題獲得「改進」</li>
                  </ul>
                </div>

                <div class="p-3 bg-purple-900/30 rounded-lg border-l-4 border-purple-400">
                  <h4 class="font-semibold text-purple-200 mb-2">動機</h4>
                  <div class="text-purple-300 text-sm space-y-1">
                  <div>
                    <span class="font-semibold text-purple-100">自我：</span>
                    <span>深信不疑的信念（身分）</span>
                  </div>
                  <div>
                    <span class="font-semibold text-purple-100">神話：</span>
                    <span>必須遵守的超自然要求（儀式）</span>
                  </div>
                  <div>
                    <span class="font-semibold text-purple-100">癢處：</span>
                    <span>強迫性的行為模式（癢處）</span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 故事標籤 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-yellow-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-yellow-600 to-orange-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:file-text" class="w-5 h-5 mr-2" />
                故事標籤
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-300 mb-4">暫時性標籤，可正面或負面</p>
              <div class="bg-yellow-900/30 p-3 rounded-lg mb-4 border border-yellow-500/30">
                <p class="text-yellow-300 text-sm">
                  <strong>例如：</strong>士兵 或 有利地形
                </p>
              </div>
              <ul class="text-gray-400 text-sm space-y-2">
                <li>• 用完後會被刪劃///</li>
                <li>• 隨時間過期</li>
                <li>• 記錄於背包（若屬於你）或一般的追蹤卡上</li>
              </ul>
            </div>
          </div>

          <!-- 狀態 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-red-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-red-600 to-pink-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:activity" class="w-5 h-5 mr-2" />
                狀態
              </h2>
            </div>
            <div class="p-4 space-y-4">
              <p class="text-gray-300">描述身體／精神狀況的標籤，有等級 1（輕微）至 6（致命）</p>
              <div class="bg-red-900/30 p-3 rounded-lg border border-red-500/30">
                <p class="text-red-300 text-sm">
                  <strong>例如：</strong>受傷-3、欣喜-2
                </p>
              </div>
              <div class="space-y-3">
                <div class="p-2 bg-gray-700/50 rounded border border-gray-600/30">
                  <strong class="text-gray-200">堆疊：</strong>
                  <span class="text-gray-400 text-sm">若再次獲得相同狀態，將等級升高</span>
                </div>
                <div class="p-2 bg-gray-700/50 rounded border border-gray-600/30">
                  <strong class="text-gray-200">減弱：</strong>
                  <span class="text-gray-400 text-sm">將所有標記向左移（降級），低於1則移除</span>
                </div>
                <div class="p-2 bg-gray-700/50 rounded border border-gray-600/30">
                  <strong class="text-gray-200">閾值：</strong>
                  <span class="text-gray-400 text-sm">達5即為極限，6則表示角色被擊倒、死亡或轉化</span>
                </div>
              </div>
            </div>          </div>
        </div><!-- 第二欄：遊戲機制（擲骰檢定、消耗力度、挑戰、反應） -->
        <div class="space-y-6">
          <!-- 擲骰檢定 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-blue-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:dice-6" class="w-5 h-5 mr-2" />
                擲骰檢定
              </h2>
            </div>
            <div class="p-4 space-y-4">
              <div class="p-3 bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                <h4 class="font-semibold text-blue-200 mb-2">計算力度</h4>
                <p class="text-blue-300 text-sm mb-3">引用與角色、目標、環境有關的標籤與狀態：</p>
                <ul class="text-blue-300 text-sm space-y-1">
                  <li>• 每個正面／負面標籤：+/-1 力度</li>
                  <li>• 燃燒標籤：+3 力度（使用後劃掉）</li>
                  <li>• 最佳狀態與最差狀態等級：+/- 該等級</li>
                  <li>• 規模：+4/-4（+/- 規模差額的力度或狀態層數）</li>
                </ul>
              </div>
              <div class="p-3 bg-cyan-900/30 rounded-lg border-l-4 border-cyan-400">
                <h4 class="font-semibold text-cyan-200 mb-2">擲兩顆六面骰（2d6）並加上力度</h4>
                <div class="space-y-2">
                  <div class="p-2 bg-green-900/40 rounded border border-green-500/30">
                    <span class="font-semibold text-green-200">10+：</span>
                    <span class="text-green-300 text-sm">成功</span>
                  </div>
                  <div class="p-2 bg-yellow-900/40 rounded border border-yellow-500/30">
                    <span class="font-semibold text-yellow-200">7–9：</span>
                    <span class="text-yellow-300 text-sm">成功，但有後果</span>
                  </div>
                  <div class="p-2 bg-red-900/40 rounded border border-red-500/30">
                    <span class="font-semibold text-red-200">6-：</span>
                    <span class="text-red-300 text-sm">失敗，有後果</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 消耗力度 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-orange-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-orange-600 to-amber-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:zap" class="w-5 h-5 mr-2" />
                消耗力度
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-300 mb-3">你的行動成功後，使用力度來造成以下效果：</p>
              <div class="space-y-2">
                <div class="p-2 bg-orange-900/30 rounded border border-orange-500/30">
                  <span class="font-semibold text-orange-200">增加、刪除、恢復標籤：</span>
                  <span class="text-orange-300 text-sm">2 力度</span>
                </div>
                <div class="p-2 bg-red-900/30 rounded border border-red-500/30">
                  <span class="font-semibold text-red-200">賦予或減少一個狀態：</span>
                  <span class="text-red-300 text-sm">1 力度／每等級</span>
                </div>
                <div class="p-2 bg-blue-900/30 rounded border border-blue-500/30">
                  <span class="font-semibold text-blue-200">揭示一個有價值的資訊：</span>
                  <span class="text-blue-300 text-sm">1 力度</span>
                </div>
                <div class="p-2 bg-green-900/30 rounded border border-green-500/30">
                  <span class="font-semibold text-green-200">附加額外效果：</span>
                  <span class="text-green-300 text-sm">1 力度</span>
                </div>
                <div class="p-2 bg-purple-900/30 rounded border border-purple-500/30">
                  <span class="font-semibold text-purple-200">建立單次性故事標籤：</span>
                  <span class="text-purple-300 text-sm">至少1力度</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 挑戰 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-red-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-red-600 to-pink-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:shield" class="w-5 h-5 mr-2" />
                挑戰
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-300 mb-3">敵人、障礙、危機——這些會阻撓角色或其目標</p>
              <div class="space-y-3">
                <div class="p-3 bg-red-900/30 rounded-lg border border-red-500/30">
                  <h4 class="font-semibold text-red-200 mb-2">克服方式</h4>
                  <ul class="text-red-300 text-sm space-y-1">
                    <li>• 擲骰成功（快速方式）</li>
                    <li>• 累積狀態讓挑戰達到閾值（例如：重傷-4、驅逐-2、說服-3）</li>
                  </ul>
                </div>
                <div class="p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
                  <h4 class="font-semibold text-yellow-200 mb-2">威脅機制</h4>
                  <p class="text-yellow-300 text-sm">
                    挑戰會在設定中提出「威脅」，並在行動中造成後果
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 反應 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-indigo-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:shield-check" class="w-5 h-5 mr-2" />
                反應
              </h2>
            </div>
            <div class="p-4 space-y-4">
              <p class="text-gray-300 mb-3">如果敘事者允許，角色可在承受後果前使用反應：</p>
              <div class="p-3 bg-indigo-900/30 rounded-lg border-l-4 border-indigo-400">
                <h4 class="font-semibold text-indigo-200 mb-2">力度消耗</h4>
                <ul class="text-indigo-300 text-sm space-y-1">
                  <li>• 每 1 力度減少後果1等級</li>
                  <li>• 若是燃燒標籤則需花費 2 力度</li>
                </ul>
              </div>
              <div class="p-3 bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                <h4 class="font-semibold text-blue-200 mb-2">描述動作後擲骰</h4>
                <div class="space-y-2">
                  <div class="p-2 bg-green-900/40 rounded border border-green-500/30">
                    <span class="font-semibold text-green-200">10+：</span>
                    <span class="text-green-300 text-sm">可額外獲得1點力度</span>
                  </div>
                  <div class="p-2 bg-yellow-900/40 rounded border border-yellow-500/30">
                    <span class="font-semibold text-yellow-200">7–9：</span>
                    <span class="text-yellow-300 text-sm">僅花費現有力度</span>
                  </div>
                  <div class="p-2 bg-red-900/40 rounded border border-red-500/30">
                    <span class="font-semibold text-red-200">6-：</span>
                    <span class="text-red-300 text-sm">完全承受後果</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        <!-- 第三欄：遊戲流程 + 角色成長 -->
        <div class="space-y-6">
          <!-- 遊戲流程 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-purple-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:play" class="w-5 h-5 mr-2" />
                遊戲流程
              </h2>
            </div>
            <div class="p-4 space-y-6">
              <!-- 場景進行循環 -->
              <div class="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                <div class="flex items-center justify-center space-x-4 text-purple-200 font-semibold mb-3">
                  <span>設定</span>
                  <Icon name="lucide:arrow-right" class="w-4 h-4" />
                  <span>行動</span>
                  <Icon name="lucide:arrow-right" class="w-4 h-4" />
                  <span>結果</span>
                </div>                <p class="text-purple-300 text-sm text-center">
                  重複遊戲循環，直到情勢被贏得、失敗、擱置，或場景結束。然後進入下一場景。
                </p>
              </div>

              <!-- 設定 -->
              <div class="p-3 bg-gray-700/50 rounded-lg border border-gray-600/30">
                <h4 class="font-semibold text-gray-200 mb-2 flex items-center">
                  <Icon name="lucide:settings" class="w-4 h-4 mr-2" />
                  設定
                </h4>
                <p class="text-gray-300 text-sm mb-2">由敘事者執行，內容包含：</p>
                <ul class="text-gray-400 text-xs space-y-1">
                  <li>• （重新）描述場景</li>
                  <li>• 突出本場景的重要性（關鍵賭注）</li>
                  <li>• 引入挑戰</li>
                  <li>• 引發威脅（透過挑戰觸發的行動）</li>
                  <li>• 向玩家提出「你怎麼做？」，並讓某位角色進入聚光燈焦點</li>
                </ul>
              </div>

              <!-- 行動 -->
              <div class="p-3 bg-orange-900/30 rounded-lg border border-orange-500/30">
                <h4 class="font-semibold text-orange-200 mb-2 flex items-center">
                  <Icon name="lucide:sword" class="w-4 h-4 mr-2" />
                  行動
                </h4>
                <p class="text-orange-300 text-sm mb-2">被聚焦的角色描述自己的行動。敘事者選擇用以下哪種方式決定結果：</p>
                <div class="space-y-1">
                  <div class="p-1 bg-green-900/40 rounded text-xs border border-green-500/30">
                    <span class="font-semibold text-green-200">簡單：</span>
                    <span class="text-green-300">敘事者決定</span>
                  </div>
                  <div class="p-1 bg-yellow-900/40 rounded text-xs border border-yellow-500/30">
                    <span class="font-semibold text-yellow-200">快速：</span>
                    <span class="text-yellow-300">骰子檢定</span>
                  </div>
                  <div class="p-1 bg-red-900/40 rounded text-xs border border-red-500/30">
                    <span class="font-semibold text-red-200">詳細：</span>
                    <span class="text-red-300">骰子＋花費力度</span>
                  </div>
                </div>
              </div>

              <!-- 結果 -->              <div class="p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
                <h4 class="font-semibold text-yellow-200 mb-2 flex items-center">
                  <Icon name="lucide:alert-triangle" class="w-4 h-4 mr-2" />
                  結果
                </h4>
                <p class="text-yellow-300 text-sm mb-2">敘事者可以根據以下情況帶來「後果」：</p>
                <ul class="text-yellow-400 text-xs space-y-1 mb-2">
                  <li>• 威脅被忽視（挑戰行動成真）</li>
                  <li>• 角色的行動（擲骰）造成後果</li>
                  <li>• 敘事者觸發角色的弱點標籤（該角色標記一次成長）</li>
                </ul>
                <div class="bg-yellow-900/40 p-2 rounded text-xs border border-yellow-500/30">
                  <span class="font-semibold text-yellow-200">後果形式：</span>
                  <span class="text-yellow-300">敘事性描述、增加／刪劃標籤、賦予／減少狀態</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 角色成長 -->
          <div class="bg-gray-800 rounded-xl shadow-lg border border-blue-500/30 overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-600 to-blue-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:trending-up" class="w-5 h-5 mr-2" />
                角色成長
              </h2>
            </div>
            <div class="p-4 space-y-4">
              <div class="p-3 bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
                <h4 class="font-semibold text-blue-200 mb-2">改進</h4>
                <p class="text-blue-300 text-sm">當使用弱點標籤時，標記一次改進。累計3次後，該主題可獲得一項「新能力標籤」或「主題專長」</p>
              </div>
              <div class="p-3 bg-orange-900/30 rounded-lg border-l-4 border-orange-400">
                <h4 class="font-semibold text-orange-200 mb-2">衰變</h4>
                <p class="text-orange-300 text-sm">當「動機」身份、儀式、癢處被違反時，標記一次衰變。累計3次後，該主題會被替換</p>
              </div>
              <div class="p-3 bg-green-900/30 rounded-lg border-l-4 border-green-400">
                <h4 class="font-semibold text-green-200 mb-2">演化</h4>
                <p class="text-green-300 text-sm">當獲得//改進以及失去//「主題」、前三個「能力標籤」任一、額外「弱點標籤」、「主題專長」時，都能夠標記一點演化。</p>
              </div>
              <div class="p-3 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <p class="text-purple-300 text-sm">
                  <strong>演化時刻：</strong>當演化累積滿5點時，可進行「演化時刻」。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Layout -->
      <div class="lg:hidden max-w-md mx-auto space-y-6">        <!-- 核心概念手機版 -->
        <div class="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-500/30 overflow-hidden">
          <div class="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:cpu" class="w-5 h-5 mr-2" />
              核心概念
            </h2>
          </div>
          <div class="p-4 space-y-4">
            <!-- 標籤系統 -->
            <div>
              <h3 class="font-semibold text-cyan-200 mb-2 flex items-center">
                <Icon name="lucide:tag" class="w-4 h-4 mr-2 text-cyan-400" />
                標籤系統
              </h3>
              <p class="text-cyan-300 text-sm mb-2">
                標籤是簡短描述，說明角色的現狀，並在行動時提供力度影響力。
              </p>
              <div class="bg-cyan-900/30 p-2 rounded text-sm text-cyan-300 border border-cyan-500/30">
                例如：增強義肢、網路成癮、↡系統不穩定、被監控
              </div>
            </div>

            <hr class="border-cyan-500/30">

            <!-- 主題 -->
            <div>
              <h3 class="font-semibold text-purple-200 mb-2 flex items-center">
                <Icon name="lucide:circuit-board" class="w-4 h-4 mr-2 text-purple-400" />
                主題
              </h3>
              <p class="text-purple-300 text-sm mb-3">每位角色有四個主題，每個主題包含：</p>
              
              <div class="space-y-2">
                <div class="p-2 bg-cyan-900/30 rounded-lg border-l-3 border-cyan-400">
                  <span class="font-semibold text-cyan-200 text-sm">能力標籤</span>
                  <p class="text-cyan-300 text-xs">正面標籤，能提升行動強度</p>
                </div>
                <div class="p-2 bg-red-900/30 rounded-lg border-l-3 border-red-400">
                  <span class="font-semibold text-red-200 text-sm">↡弱點標籤</span>
                  <p class="text-red-300 text-xs">負面標籤，會降低行動強度</p>
                </div>
                <div class="p-2 bg-purple-900/30 rounded-lg border-l-3 border-purple-400">
                    <span class="font-semibold text-purple-200 text-sm">動機</span>
                    <ul class="text-purple-300 text-xs space-y-1 mt-1">
                    <li>
                      <span class="font-semibold text-purple-100">自我：</span>
                      <span>深信不疑的信念（身分）</span>
                    </li>
                    <li>
                      <span class="font-semibold text-purple-100">神話：</span>
                      <span>必須遵守的超自然要求（儀式）</span>
                    </li>
                    <li>
                      <span class="font-semibold text-purple-100">癢處：</span>
                      <span>強迫性的行為模式（癢處）</span>
                    </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 遊戲機制手機版 -->
        <div class="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl border border-orange-500/30 overflow-hidden">
          <div class="bg-gradient-to-r from-orange-600 to-red-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:cog" class="w-5 h-5 mr-2" />
              遊戲機制
            </h2>
          </div>
          <div class="p-4 space-y-4">
            <!-- 狀態 -->
            <div>
              <h3 class="font-semibold text-red-300 mb-2 flex items-center">
                <Icon name="lucide:activity" class="w-4 h-4 mr-2 text-red-400" />
                狀態
              </h3>
              <p class="text-red-300 text-sm mb-2">
                描述身體／精神狀況的標籤，有等級 1（輕微）至 6（致命）
              </p>
              <div class="bg-red-900/30 p-2 rounded text-sm text-red-300 border border-red-500/30 mb-2">
                例如：系統過載-3、賽博精神病-2
              </div>
              <div class="text-xs text-red-400 space-y-1">
                <div><strong>堆疊：</strong>若再次獲得相同狀態，將等級升高</div>
                <div><strong>減弱：</strong>將所有標記向左移（降級）</div>
                <div><strong>閾值：</strong>達5即為極限，6則被擊倒、死亡或轉化</div>
              </div>
            </div>

            <hr class="border-orange-500/30">

            <!-- 角色成長 -->
            <div>
              <h3 class="font-semibold text-blue-300 mb-2 flex items-center">
                <Icon name="lucide:trending-up" class="w-4 h-4 mr-2 text-blue-400" />
                角色成長
              </h3>
              <div class="space-y-2 text-xs">
                <div class="p-2 bg-blue-900/30 rounded border border-blue-500/30">
                  <span class="font-semibold text-blue-300">改進：</span>
                  <span class="text-blue-400">使用弱點標籤時標記，累計3次獲得新能力標籤或主題專長</span>
                </div>
                <div class="p-2 bg-orange-900/30 rounded border border-orange-500/30">
                  <span class="font-semibold text-orange-300">衰變：</span>
                  <span class="text-orange-400">違背動機時標記，累計3次主題被替換</span>
                </div>
                <div class="p-2 bg-green-900/30 rounded border border-green-500/30">
                  <span class="font-semibold text-green-300">演化：</span>
                  <span class="text-green-400">獲得改進或失去主題要素時標記，累計5次可進行演化時刻</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 遊戲流程手機版 -->
        <div class="bg-black/80 backdrop-blur-sm rounded-xl shadow-2xl border border-purple-500/30 overflow-hidden">          <div class="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:play" class="w-5 h-5 mr-2" />
              遊戲流程
            </h2>
          </div>
          <div class="p-4 space-y-4">
            <!-- 場景循環 -->
            <div>
              <div class="bg-purple-900/30 p-3 rounded-lg mb-3 border border-purple-500/30">
                <div class="flex items-center justify-center space-x-2 text-purple-300 font-semibold text-sm">
                  <span>設定</span>
                  <Icon name="lucide:arrow-right" class="w-3 h-3" />
                  <span>行動</span>
                  <Icon name="lucide:arrow-right" class="w-3 h-3" />
                  <span>結果</span>
                </div>
              </div>
                <div class="space-y-3">
                <div class="p-3 bg-gray-800/50 rounded-lg border border-gray-600/30">
                  <h4 class="font-semibold text-gray-200 text-sm mb-1">設定</h4>
                  <p class="text-gray-300 text-xs mb-2">敘事者執行，內容包含：</p>
                  <ul class="text-gray-400 text-xs space-y-1">
                    <li>• 描述都市場景、突出數位重要性</li>
                    <li>• 引入企業威脅、系統挑戰</li>
                    <li>• 讓某位角色進入聚光燈焦點</li>
                  </ul>
                </div>
                <div class="p-3 bg-orange-900/30 rounded-lg border border-orange-500/30">
                  <h4 class="font-semibold text-orange-300 text-sm mb-1">行動</h4>
                  <p class="text-orange-400 text-xs mb-2">角色描述行動，敘事者決定處理方式：</p>
                  <div class="space-y-1">
                    <div class="text-xs">
                      <span class="font-semibold text-green-400">簡單：</span>
                      <span class="text-green-500">敘事者決定</span>
                    </div>
                    <div class="text-xs">
                      <span class="font-semibold text-yellow-400">快速：</span>
                      <span class="text-yellow-500">骰子檢定</span>
                    </div>
                    <div class="text-xs">
                      <span class="font-semibold text-red-400">詳細：</span>
                      <span class="text-red-500">骰子＋花費力度</span>
                    </div>
                  </div>
                </div>
                <div class="p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
                  <h4 class="font-semibold text-yellow-300 text-sm mb-1">結果</h4>
                  <p class="text-yellow-400 text-xs mb-2">敘事者根據情況帶來後果：</p>
                  <ul class="text-yellow-400 text-xs space-y-1">
                    <li>• 系統威脅被忽視（挑戰行動成真）</li>
                    <li>• 角色行動造成數位後果</li>
                    <li>• 觸發弱點標籤（標記成長）</li>
                  </ul>
                  <div class="mt-2 p-2 bg-yellow-900/40 rounded text-xs border border-yellow-500/30">
                    <span class="font-semibold text-yellow-300">後果形式：</span>
                    <span class="text-yellow-400">敘事描述、標籤變化、狀態變化，角色可反應</span>
                  </div>
                </div>
              </div>
            </div>            <hr class="border-cyan-500/30">

            <!-- 故事標籤 -->
            <div>
              <h3 class="font-semibold text-yellow-300 mb-2 flex items-center">
                <Icon name="lucide:file-text" class="w-4 h-4 mr-2 text-yellow-400" />
                故事標籤
              </h3>
              <p class="text-yellow-400 text-sm mb-2">暫時性標籤，可正面或負面</p>
              <div class="bg-yellow-900/30 p-2 rounded text-sm text-yellow-300 border border-yellow-500/30 mb-2">
                例如：駭客 或 有利網路位置
              </div>
              <div class="text-xs text-yellow-400 space-y-1">
                <div>• 用完後會被刪劃///</div>
                <div>• 隨時間過期</div>
                <div>• 記錄於背包或追蹤卡上</div>
              </div>            </div>

            <hr class="border-cyan-500/30">

            <!-- 挑戰 -->
            <div>
              <h3 class="font-semibold text-red-300 mb-2 flex items-center">
                <Icon name="lucide:shield" class="w-4 h-4 mr-2 text-red-400" />
                挑戰
              </h3>
              <p class="text-red-400 text-sm mb-2">企業特工、防火牆、系統崩潰——這些會阻撓角色或其目標</p>
              <div class="space-y-1 text-xs">
                <div class="p-2 bg-red-900/30 rounded border border-red-500/30">
                  <span class="font-semibold text-red-300">克服方式：</span>
                  <span class="text-red-400">擲骰成功或累積狀態讓挑戰達到閾值</span>
                </div>
                <div class="p-2 bg-yellow-900/30 rounded border border-yellow-500/30">
                  <span class="font-semibold text-yellow-300">威脅：</span>
                  <span class="text-yellow-400">挑戰會在設定中提出威脅，在行動中造成後果</span>
                </div>
              </div>
            </div>

            <hr class="border-cyan-500/30">            <!-- 擲骰檢定 -->            <div>
              <h3 class="font-semibold text-blue-300 mb-2 flex items-center">
                <Icon name="lucide:dice-6" class="w-4 h-4 mr-2 text-blue-400" />
                擲骰檢定
              </h3>
              <div class="space-y-2 text-xs">
                <div class="bg-blue-900/30 p-2 rounded border border-blue-500/30">
                  <div class="font-semibold text-blue-300 mb-1">計算力度：</div>
                  <ul class="text-blue-400 space-y-1">
                    <li>• 正面／負面標籤：+/-1 力度</li>
                    <li>• 燃燒標籤：+3 力度（使用後劃掉）</li>
                    <li>• 最佳／最差狀態等級：+/- 該等級</li>
                    <li>• 規模：+4/-4（+/- 規模差額的力度或狀態層數）</li>
                  </ul>
                </div>
                <div class="bg-green-900/30 p-2 rounded border border-green-500/30">
                  <div class="font-semibold text-green-300 mb-1">擲兩顆六面骰（2d6）+ 力度</div>
                  <ul class="text-green-400 space-y-1">
                    <li>• 10+：成功</li>
                    <li>• 7-9：成功，但有後果</li>
                    <li>• 6-：失敗，有後果</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr class="border-cyan-500/30">

            <!-- 消耗力度 -->
            <div>
              <h3 class="font-semibold text-orange-300 mb-2 flex items-center">
                <Icon name="lucide:zap" class="w-4 h-4 mr-2 text-orange-400" />
                消耗力度
              </h3>
              <p class="text-orange-400 text-sm mb-2">行動成功後，使用力度來造成以下效果：</p>
              <div class="space-y-1 text-xs">
                <div class="p-2 bg-orange-900/30 rounded border border-orange-500/30">
                  <span class="font-semibold text-orange-300">增加、刪除、恢復標籤：</span>
                  <span class="text-orange-400">2 力度</span>
                </div>
                <div class="p-2 bg-red-900/30 rounded border border-red-500/30">
                  <span class="font-semibold text-red-300">賦予或減少狀態：</span>
                  <span class="text-red-400">1 力度／每等級</span>
                </div>
                <div class="p-2 bg-blue-900/30 rounded border border-blue-500/30">
                  <span class="font-semibold text-blue-300">揭示資訊或附加效果：</span>
                  <span class="text-blue-400">1 力度</span>
                </div>
                <div class="p-2 bg-purple-900/30 rounded border border-purple-500/30">
                  <span class="font-semibold text-purple-300">建立單次性故事標籤：</span>
                  <span class="text-purple-400">至少1力度</span>
                </div>
              </div>
            </div>

            <hr class="border-cyan-500/30">

            <!-- 反應 -->
            <div>
              <h3 class="font-semibold text-indigo-300 mb-2 flex items-center">
                <Icon name="lucide:shield-check" class="w-4 h-4 mr-2 text-indigo-400" />
                反應
              </h3>
              <p class="text-indigo-400 text-sm mb-2">如果敘事者允許，角色可在承受後果前使用反應：</p>
              <div class="space-y-2 text-xs">
                <div class="bg-indigo-900/30 p-2 rounded border border-indigo-500/30">
                  <div class="font-semibold text-indigo-300 mb-1">力度消耗：</div>
                  <ul class="text-indigo-400 space-y-1">
                    <li>• 每 1 力度減少後果 1 等級</li>
                    <li>• 燃燒標籤需花費 2 力度</li>
                  </ul>
                </div>
                <div class="bg-blue-900/30 p-2 rounded border border-blue-500/30">
                  <div class="font-semibold text-blue-300 mb-1">描述動作後擲骰：</div>
                  <ul class="text-blue-400 space-y-1">
                    <li>• 10+：可額外獲得 1 點力度</li>
                    <li>• 7-9：僅花費現有力度</li>
                    <li>• 6-：完全承受後果</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 頁面標題
useHead({
  title: '如何遊玩 - 都市異景'
})
</script>

<style scoped>
/* 自定義滾動條 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #06b6d4;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0891b2;
}

/* 卡片懸停效果 */
.bg-black {
  transition: all 0.2s ease-in-out;
}

.bg-black:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.2);
}
</style>
