<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pb-8">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="px-4 py-6">
        <div class="flex items-center justify-between">          <NuxtLink to="/LitM" class="text-gray-600 hover:text-gray-800 transition-colors">
            <Icon name="lucide:arrow-left" class="w-6 h-6" />
          </NuxtLink>
          <h1 class="text-xl font-bold text-gray-900 flex items-center">
            <Icon name="lucide:book-open" class="w-5 h-5 mr-2" />
            如何遊玩
          </h1>
          <div class="w-6"></div> <!-- Spacer -->
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="px-4 py-6">
      <!-- Desktop Layout -->
      <div class="hidden lg:grid lg:grid-cols-3 lg:gap-6 max-w-7xl mx-auto">        <!-- 第一欄：核心概念 + 狀態 + 同行羈絆 -->
        <div class="space-y-6">
          <!-- 標籤系統 -->
          <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:tag" class="w-5 h-5 mr-2" />
                本遊戲以「標籤」為核心
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-700 leading-relaxed mb-4">
                標籤是簡短描述，說明角色的現狀，並在行動時提供力度（或減弱）影響力。
              </p>
              <div class="bg-green-50 p-3 rounded-lg">
                <p class="text-green-800 text-sm">
                  <strong>例如：</strong>英俊、沉睡咒語、↡舊傷、被魅惑
                </p>
              </div>
            </div>
          </div>

          <!-- 主題 -->
          <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:layers" class="w-5 h-5 mr-2" />
                主題
              </h2>
            </div>
            <div class="p-4 space-y-4">
              <p class="text-gray-700">每位英雄有四個主題，每個主題包含：</p>
              
              <div class="space-y-3">
                <div class="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <h4 class="font-semibold text-green-800 mb-2">能力標籤</h4>
                  <ul class="text-green-700 text-sm space-y-1">
                    <li>• 正面標籤，能提升行動強度</li>
                    <li>• 可暫時刪劃（///）使用，直到恢復為止</li>
                  </ul>
                </div>

                <div class="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <h4 class="font-semibold text-red-800 mb-2">↡弱點標籤</h4>
                  <ul class="text-red-700 text-sm space-y-1">
                    <li>• 負面標籤，會降低行動強度</li>
                    <li>• 使用後可讓主題獲得「成長」</li>
                  </ul>
                </div>

                <div class="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                  <h4 class="font-semibold text-purple-800 mb-2">使命</h4>
                  <p class="text-purple-700 text-sm">
                    為主題提供一個目標或動機，是你想捍衛或實現的理想
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 故事標籤 -->
          <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div class="bg-gradient-to-r from-yellow-500 to-orange-500 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:scroll" class="w-5 h-5 mr-2" />
                故事標籤
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-700 mb-4">暫時性標籤，可正面或負面</p>
              <div class="bg-yellow-50 p-3 rounded-lg mb-4">
                <p class="text-yellow-800 text-sm">
                  <strong>例如：</strong>士兵 或 有利地形
                </p>
              </div>
              <ul class="text-gray-600 text-sm space-y-2">
                <li>• 用完後會被刪劃///</li>
                <li>• 隨時間過期</li>
                <li>• 記錄於背包（若屬於你）或一般的追蹤卡上</li>
              </ul>
            </div>
          </div>

          <!-- 狀態 -->
          <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div class="bg-gradient-to-r from-red-500 to-pink-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:heart" class="w-5 h-5 mr-2" />
                狀態
              </h2>
            </div>
            <div class="p-4 space-y-4">
              <p class="text-gray-700">描述身體／精神狀況的標籤，有等級 1（輕微）至 6（致命）</p>
              <div class="bg-red-50 p-3 rounded-lg">
                <p class="text-red-800 text-sm">
                  <strong>例如：</strong>受傷-3、欣喜-2
                </p>
              </div>
              <div class="space-y-3">
                <div class="p-2 bg-gray-50 rounded">
                  <strong class="text-gray-800">堆疊：</strong>
                  <span class="text-gray-600 text-sm">若再次獲得相同狀態，將等級升高</span>
                </div>
                <div class="p-2 bg-gray-50 rounded">
                  <strong class="text-gray-800">減弱：</strong>
                  <span class="text-gray-600 text-sm">將所有標記向左移（降級），低於1則移除</span>
                </div>
                <div class="p-2 bg-gray-50 rounded">
                  <strong class="text-gray-800">閾值：</strong>
                  <span class="text-gray-600 text-sm">達5即為極限，6則表示角色被擊倒、死亡或轉化</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 同行羈絆 -->
          <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div class="bg-gradient-to-r from-teal-500 to-cyan-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:users" class="w-5 h-5 mr-2" />
                同行羈絆
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-700 mb-4">一個所有英雄都可使用的「共享主題」</p>
              <div class="space-y-3">
                <div class="p-2 bg-green-50 rounded">
                  <strong class="text-green-800">能力標籤：</strong>
                  <span class="text-green-700 text-sm">單次使用（會被刪劃///，不可燃燒）</span>
                </div>
                <div class="p-2 bg-red-50 rounded">
                  <strong class="text-red-800">↡弱點標籤：</strong>
                  <span class="text-red-700 text-sm">可用來進行「提升」</span>
                </div>
                <div class="p-2 bg-blue-50 rounded">
                  <strong class="text-blue-800">關係標籤：</strong>
                  <span class="text-blue-700 text-sm">每位英雄彼此間擁有的正面／負面故事標籤。可在「露營」時重新建立</span>
                </div>
              </div>
            </div>
          </div>
        </div>        <!-- 第二欄：遊戲機制（擲骰檢定、消耗力度、挑戰、反應） -->
        <div class="space-y-6">
          <!-- 擲骰檢定 -->
          <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:dice-6" class="w-5 h-5 mr-2" />
                擲骰檢定
              </h2>
            </div>
            <div class="p-4 space-y-4">
              <div class="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h4 class="font-semibold text-blue-800 mb-2">計算力度</h4>
                <p class="text-blue-700 text-sm mb-3">引用與英雄、目標、環境有關的標籤與狀態：</p>
                <ul class="text-blue-700 text-sm space-y-1">
                  <li>• 每個正面／負面標籤：+/-1 力度</li>
                  <li>• 燃燒標籤：+3 力度（使用後劃掉）</li>
                  <li>• 最佳狀態與最差狀態等級：+/- 該等級</li>
                  <li>• 如果「得勢／失勢」，力度會 +3/-3（極端情況是 +/-6）</li>
                </ul>
                <p class="text-blue-700 text-sm mt-2 font-semibold">
                  每使用一個弱點標籤，就標記一次成長
                </p>
              </div>
              <div class="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <h4 class="font-semibold text-green-800 mb-2">擲兩顆六面骰（2d6）並加上力度</h4>
                <div class="space-y-2">
                  <div class="p-2 bg-green-100 rounded">
                    <span class="font-semibold text-green-800">10+：</span>
                    <span class="text-green-700 text-sm">成功</span>
                  </div>
                  <div class="p-2 bg-yellow-100 rounded">
                    <span class="font-semibold text-yellow-800">7–9：</span>
                    <span class="text-yellow-700 text-sm">成功，但有後果</span>
                  </div>
                  <div class="p-2 bg-red-100 rounded">
                    <span class="font-semibold text-red-800">6-：</span>
                    <span class="text-red-700 text-sm">失敗，有後果</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 消耗力度 -->
          <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div class="bg-gradient-to-r from-orange-500 to-amber-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:zap" class="w-5 h-5 mr-2" />
                消耗力度
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-700 mb-3">你的行動成功後，使用力度來造成以下效果：</p>
              <div class="space-y-2">
                <div class="p-2 bg-orange-50 rounded">
                  <span class="font-semibold text-orange-800">增加、刪除、恢復標籤：</span>
                  <span class="text-orange-700 text-sm">2 力度</span>
                </div>
                <div class="p-2 bg-red-50 rounded">
                  <span class="font-semibold text-red-800">賦予或減少一個狀態：</span>
                  <span class="text-red-700 text-sm">1 力度／每等級</span>
                </div>
                <div class="p-2 bg-blue-50 rounded">
                  <span class="font-semibold text-blue-800">揭示一個有價值的資訊：</span>
                  <span class="text-blue-700 text-sm">1 力度</span>
                </div>
                <div class="p-2 bg-green-50 rounded">
                  <span class="font-semibold text-green-800">附加額外效果：</span>
                  <span class="text-green-700 text-sm">1 力度</span>
                </div>
                <div class="p-2 bg-purple-50 rounded">
                  <span class="font-semibold text-purple-800">建立單次性故事標籤：</span>
                  <span class="text-purple-700 text-sm">至少1力度</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 挑戰 -->
          <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div class="bg-gradient-to-r from-red-600 to-pink-700 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:shield" class="w-5 h-5 mr-2" />
                挑戰
              </h2>
            </div>
            <div class="p-4">
              <p class="text-gray-700 mb-3">敵人、障礙、危機——這些會阻撓英雄或其目標</p>
              <div class="space-y-3">
                <div class="p-3 bg-red-50 rounded-lg">
                  <h4 class="font-semibold text-red-800 mb-2">克服方式</h4>
                  <ul class="text-red-700 text-sm space-y-1">
                    <li>• 擲骰成功（快速方式）</li>
                    <li>• 累積狀態讓挑戰達到閾值（例如：重傷-4、驅逐-2、說服-3）</li>
                  </ul>
                </div>
                <div class="p-3 bg-yellow-50 rounded-lg">
                  <h4 class="font-semibold text-yellow-800 mb-2">威脅機制</h4>
                  <p class="text-yellow-700 text-sm">
                    挑戰會在設定中提出「威脅」，並在行動中造成後果
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 反應 -->
          <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:shield-check" class="w-5 h-5 mr-2" />
                反應
              </h2>
            </div>
            <div class="p-4 space-y-4">
              <p class="text-gray-700 mb-3">如果敘事者允許，英雄可在承受後果前使用反應：</p>
              <div class="p-3 bg-indigo-50 rounded-lg border-l-4 border-indigo-400">
                <h4 class="font-semibold text-indigo-800 mb-2">力度消耗</h4>
                <ul class="text-indigo-700 text-sm space-y-1">
                  <li>• 每 1 力度減少後果1等級</li>
                  <li>• 若是燃燒標籤則需花費 2 力度</li>
                </ul>
              </div>
              <div class="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h4 class="font-semibold text-blue-800 mb-2">描述動作後擲骰</h4>
                <div class="space-y-2">
                  <div class="p-2 bg-green-100 rounded">
                    <span class="font-semibold text-green-800">10+：</span>
                    <span class="text-green-700 text-sm">可額外獲得1點力度</span>
                  </div>
                  <div class="p-2 bg-yellow-100 rounded">
                    <span class="font-semibold text-yellow-800">7–9：</span>
                    <span class="text-yellow-700 text-sm">僅花費現有力度</span>
                  </div>
                  <div class="p-2 bg-red-100 rounded">
                    <span class="font-semibold text-red-800">6-：</span>
                    <span class="text-red-700 text-sm">完全承受後果</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>        <!-- 第三欄：遊戲流程 + 英雄成長 -->
        <div class="space-y-6">
          <!-- 遊戲流程 -->
          <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div class="bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:play" class="w-5 h-5 mr-2" />
                遊戲流程
              </h2>
            </div>
            <div class="p-4 space-y-6">
              <!-- 場景進行循環 -->
              <div class="bg-purple-50 p-4 rounded-lg">
                <div class="flex items-center justify-center space-x-4 text-purple-800 font-semibold mb-3">
                  <span>設定</span>
                  <Icon name="lucide:arrow-right" class="w-4 h-4" />
                  <span>行動</span>
                  <Icon name="lucide:arrow-right" class="w-4 h-4" />
                  <span>結果</span>
                </div>
                <p class="text-purple-700 text-sm text-center">
                  重複遊戲循環，直到情勢被贏得、失敗、擱置，或場景結束。然後進入下一場景或進行露營。
                </p>
              </div>

              <!-- 設定 -->
              <div class="p-3 bg-gray-50 rounded-lg">
                <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                  <Icon name="lucide:settings" class="w-4 h-4 mr-2" />
                  設定
                </h4>
                <p class="text-gray-700 text-sm mb-2">由敘事者執行，內容包含：</p>
                <ul class="text-gray-600 text-xs space-y-1">
                  <li>• （重新）描述場景</li>
                  <li>• 突出本場景的重要性（關鍵賭注）</li>
                  <li>• 引入挑戰</li>
                  <li>• 引發威脅（透過挑戰觸發的行動）</li>
                  <li>• 向玩家提出「你怎麼做？」，並讓某位英雄進入聚光燈焦點</li>
                </ul>
              </div>

              <!-- 行動 -->
              <div class="p-3 bg-orange-50 rounded-lg">
                <h4 class="font-semibold text-orange-800 mb-2 flex items-center">
                  <Icon name="lucide:sword" class="w-4 h-4 mr-2" />
                  行動
                </h4>
                <p class="text-orange-700 text-sm mb-2">被聚焦的英雄描述自己的行動。敘事者選擇用以下哪種方式決定結果：</p>
                <div class="space-y-1">
                  <div class="p-1 bg-green-100 rounded text-xs">
                    <span class="font-semibold text-green-800">簡單：</span>
                    <span class="text-green-700">敘事者決定</span>
                  </div>
                  <div class="p-1 bg-yellow-100 rounded text-xs">
                    <span class="font-semibold text-yellow-800">快速：</span>
                    <span class="text-yellow-700">骰子檢定</span>
                  </div>
                  <div class="p-1 bg-red-100 rounded text-xs">
                    <span class="font-semibold text-red-800">詳細：</span>
                    <span class="text-red-700">骰子＋花費力度</span>
                  </div>
                </div>
              </div>

              <!-- 結果 -->
              <div class="p-3 bg-yellow-50 rounded-lg">
                <h4 class="font-semibold text-yellow-800 mb-2 flex items-center">
                  <Icon name="lucide:alert-triangle" class="w-4 h-4 mr-2" />
                  結果
                </h4>
                <p class="text-yellow-700 text-sm mb-2">敘事者可以根據以下情況帶來「後果」：</p>
                <ul class="text-yellow-600 text-xs space-y-1 mb-2">
                  <li>• 威脅被忽視（挑戰行動成真）</li>
                  <li>• 英雄的行動（擲骰）造成後果</li>
                  <li>• 敘事者觸發英雄的弱點標籤（該英雄標記一次成長）</li>
                </ul>
                <div class="bg-yellow-100 p-2 rounded text-xs">
                  <span class="font-semibold text-yellow-800">後果形式：</span>
                  <span class="text-yellow-700">敘事性描述、增加／刪劃標籤、賦予／減少狀態</span>
                </div>
              </div>

              <!-- 露營 -->
              <div class="p-3 bg-green-50 rounded-lg">
                <h4 class="font-semibold text-green-800 mb-2 flex items-center">
                  <Icon name="lucide:tent" class="w-4 h-4 mr-2" />
                  露營
                </h4>
                <p class="text-green-700 text-sm mb-2">敘事者會讓故事標籤過期。每位英雄選擇 2 個活動（若有後果則選 3 項）：</p>
                <div class="space-y-1">
                  <div class="p-1 bg-green-100 rounded text-xs">
                    <span class="font-semibold text-green-800">休息：</span>
                    <span class="text-green-700">恢復狀態與刪劃標籤</span>
                  </div>
                  <div class="p-1 bg-blue-100 rounded text-xs">
                    <span class="font-semibold text-blue-800">反思：</span>
                    <span class="text-blue-700">選一主題標記一次成長</span>
                  </div>
                  <div class="p-1 bg-purple-100 rounded text-xs">
                    <span class="font-semibold text-purple-800">行動：</span>
                    <span class="text-purple-700">不擲骰，花力度以獲得效果</span>
                  </div>
                </div>
                <div class="bg-teal-100 p-2 rounded text-xs mt-2">
                  <span class="text-teal-800 font-semibold">額外活動：</span>
                  <span class="text-teal-700">恢復同行羈絆標籤，或建立新的關係標籤</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 英雄成長 -->
          <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-500 to-blue-600 p-4">
              <h2 class="text-xl font-bold text-white flex items-center">
                <Icon name="lucide:trending-up" class="w-5 h-5 mr-2" />
                英雄成長
              </h2>
            </div>
            <div class="p-4 space-y-4">
              <div class="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h4 class="font-semibold text-blue-800 mb-2">成長</h4>
                <p class="text-blue-700 text-sm">當使用弱點標籤時，標記一次成長。累計3次後，該主題可獲得一項「新能力標籤」</p>
              </div>
              <div class="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                <h4 class="font-semibold text-orange-800 mb-2">捨棄</h4>
                <p class="text-orange-700 text-sm">當違背或放棄使命時，標記一次捨棄。累計3次後，該主題會被替換</p>
              </div>
              <div class="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                <h4 class="font-semibold text-green-800 mb-2">里程碑</h4>
                <p class="text-green-700 text-sm">達成任務關鍵目標時，標記一次里程碑。累計3次後，該主題會進化</p>
              </div>
              <div class="p-3 bg-purple-50 rounded-lg">
                <p class="text-purple-700 text-sm">
                  <strong>承諾：</strong>主題被取代或進化後，會獲得承諾，可用於啟動「圓滿時刻」
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Layout -->
      <div class="lg:hidden max-w-md mx-auto space-y-6">
        <!-- 核心概念手機版 -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:book" class="w-5 h-5 mr-2" />
              核心概念
            </h2>
          </div>
          <div class="p-4 space-y-4">
            <!-- 標籤系統 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:tag" class="w-4 h-4 mr-2 text-green-500" />
                標籤系統
              </h3>
              <p class="text-gray-700 text-sm mb-2">
                標籤是簡短描述，說明角色的現狀，並在行動時提供力度影響力。
              </p>
              <div class="bg-green-50 p-2 rounded text-sm text-green-800">
                例如：英俊、沉睡咒語、↡舊傷、被魅惑
              </div>
            </div>

            <hr class="border-gray-200">

            <!-- 主題 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:layers" class="w-4 h-4 mr-2 text-blue-500" />
                主題
              </h3>
              <p class="text-gray-700 text-sm mb-3">每位英雄有四個主題，每個主題包含：</p>
              
              <div class="space-y-2">
                <div class="p-2 bg-green-50 rounded-lg border-l-3 border-green-400">
                  <span class="font-semibold text-green-800 text-sm">能力標籤</span>
                  <p class="text-green-700 text-xs">正面標籤，能提升行動強度</p>
                </div>
                <div class="p-2 bg-red-50 rounded-lg border-l-3 border-red-400">
                  <span class="font-semibold text-red-800 text-sm">↡弱點標籤</span>
                  <p class="text-red-700 text-xs">負面標籤，會降低行動強度</p>
                </div>
                <div class="p-2 bg-purple-50 rounded-lg border-l-3 border-purple-400">
                  <span class="font-semibold text-purple-800 text-sm">使命</span>
                  <p class="text-purple-700 text-xs">為主題提供目標或動機</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 遊戲機制手機版 -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gradient-to-r from-red-500 to-pink-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:cog" class="w-5 h-5 mr-2" />
              遊戲機制
            </h2>
          </div>
          <div class="p-4 space-y-4">
            <!-- 狀態 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:heart" class="w-4 h-4 mr-2 text-red-500" />
                狀態
              </h3>
              <p class="text-gray-700 text-sm mb-2">
                描述身體／精神狀況的標籤，有等級 1（輕微）至 6（致命）
              </p>
              <div class="bg-red-50 p-2 rounded text-sm text-red-800 mb-2">
                例如：受傷-3、欣喜-2
              </div>
              <div class="text-xs text-gray-600 space-y-1">
                <div><strong>堆疊：</strong>若再次獲得相同狀態，將等級升高</div>
                <div><strong>減弱：</strong>將所有標記向左移（降級）</div>
                <div><strong>閾值：</strong>達5即為極限，6則被擊倒</div>
              </div>
            </div>

            <hr class="border-gray-200">

            <!-- 英雄成長 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:trending-up" class="w-4 h-4 mr-2 text-indigo-500" />
                英雄成長
              </h3>
              <div class="space-y-2 text-xs">
                <div class="p-2 bg-blue-50 rounded">
                  <span class="font-semibold text-blue-800">成長：</span>
                  <span class="text-blue-700">使用弱點標籤時標記，累計3次獲得新能力標籤</span>
                </div>
                <div class="p-2 bg-orange-50 rounded">
                  <span class="font-semibold text-orange-800">捨棄：</span>
                  <span class="text-orange-700">違背使命時標記，累計3次主題被替換</span>
                </div>
                <div class="p-2 bg-green-50 rounded">
                  <span class="font-semibold text-green-800">里程碑：</span>
                  <span class="text-green-700">達成關鍵目標時標記，累計3次主題進化</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 遊戲流程手機版 -->
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div class="bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <Icon name="lucide:play" class="w-5 h-5 mr-2" />
              遊戲流程
            </h2>
          </div>
          <div class="p-4 space-y-4">
            <!-- 場景循環 -->
            <div>
              <div class="bg-purple-50 p-3 rounded-lg mb-3">
                <div class="flex items-center justify-center space-x-2 text-purple-800 font-semibold text-sm">
                  <span>設定</span>
                  <Icon name="lucide:arrow-right" class="w-3 h-3" />
                  <span>行動</span>
                  <Icon name="lucide:arrow-right" class="w-3 h-3" />
                  <span>結果</span>
                </div>
              </div>
                <div class="space-y-3">
                <div class="p-3 bg-gray-50 rounded-lg">
                  <h4 class="font-semibold text-gray-800 text-sm mb-1">設定</h4>
                  <p class="text-gray-600 text-xs mb-2">敘事者執行，內容包含：</p>
                  <ul class="text-gray-600 text-xs space-y-1">
                    <li>• 描述場景、突出重要性</li>
                    <li>• 引入挑戰、引發威脅</li>
                    <li>• 讓某位英雄進入聚光燈焦點</li>
                  </ul>
                </div>
                <div class="p-3 bg-orange-50 rounded-lg">
                  <h4 class="font-semibold text-orange-800 text-sm mb-1">行動</h4>
                  <p class="text-orange-600 text-xs mb-2">英雄描述行動，敘事者決定處理方式：</p>
                  <div class="space-y-1">
                    <div class="text-xs">
                      <span class="font-semibold text-green-700">簡單：</span>
                      <span class="text-green-600">敘事者決定</span>
                    </div>
                    <div class="text-xs">
                      <span class="font-semibold text-yellow-700">快速：</span>
                      <span class="text-yellow-600">骰子檢定</span>
                    </div>
                    <div class="text-xs">
                      <span class="font-semibold text-red-700">詳細：</span>
                      <span class="text-red-600">骰子＋花費力度</span>
                    </div>
                  </div>
                </div>
                <div class="p-3 bg-yellow-50 rounded-lg">
                  <h4 class="font-semibold text-yellow-800 text-sm mb-1">結果</h4>
                  <p class="text-yellow-600 text-xs mb-2">敘事者根據情況帶來後果：</p>
                  <ul class="text-yellow-600 text-xs space-y-1">
                    <li>• 威脅被忽視（挑戰行動成真）</li>
                    <li>• 英雄行動造成後果</li>
                    <li>• 觸發弱點標籤（標記成長）</li>
                  </ul>
                  <div class="mt-2 p-2 bg-yellow-100 rounded text-xs">
                    <span class="font-semibold text-yellow-800">後果形式：</span>
                    <span class="text-yellow-700">敘事描述、標籤變化、狀態變化，英雄可反應</span>
                  </div>
                </div>
              </div>
            </div>            <hr class="border-gray-200">

            <!-- 故事標籤 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:scroll" class="w-4 h-4 mr-2 text-yellow-500" />
                故事標籤
              </h3>
              <p class="text-gray-700 text-sm mb-2">暫時性標籤，可正面或負面</p>
              <div class="bg-yellow-50 p-2 rounded text-sm text-yellow-800 mb-2">
                例如：士兵 或 有利地形
              </div>
              <div class="text-xs text-gray-600 space-y-1">
                <div>• 用完後會被刪劃///</div>
                <div>• 隨時間過期</div>
                <div>• 記錄於背包或追蹤卡上</div>
              </div>
            </div>

            <hr class="border-gray-200">

            <!-- 同行羈絆 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:users" class="w-4 h-4 mr-2 text-teal-500" />
                同行羈絆
              </h3>
              <p class="text-gray-700 text-sm mb-2">一個所有英雄都可使用的「共享主題」</p>
              <div class="space-y-1 text-xs">
                <div class="p-2 bg-green-50 rounded">
                  <span class="font-semibold text-green-800">能力標籤：</span>
                  <span class="text-green-700">單次使用（會被刪劃///，不可燃燒）</span>
                </div>
                <div class="p-2 bg-red-50 rounded">
                  <span class="font-semibold text-red-800">↡弱點標籤：</span>
                  <span class="text-red-700">可用來進行「提升」</span>
                </div>
                <div class="p-2 bg-blue-50 rounded">
                  <span class="font-semibold text-blue-800">關係標籤：</span>
                  <span class="text-blue-700">每位英雄彼此間的正面／負面故事標籤</span>
                </div>
              </div>
            </div>

            <hr class="border-gray-200">

            <!-- 挑戰 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:shield" class="w-4 h-4 mr-2 text-red-500" />
                挑戰
              </h3>
              <p class="text-gray-700 text-sm mb-2">敵人、障礙、危機——這些會阻撓英雄或其目標</p>
              <div class="space-y-1 text-xs">
                <div class="p-2 bg-red-50 rounded">
                  <span class="font-semibold text-red-800">克服方式：</span>
                  <span class="text-red-700">擲骰成功或累積狀態讓挑戰達到閾值</span>
                </div>
                <div class="p-2 bg-yellow-50 rounded">
                  <span class="font-semibold text-yellow-800">威脅：</span>
                  <span class="text-yellow-700">挑戰會在設定中提出威脅，在行動中造成後果</span>
                </div>
              </div>
            </div>

            <hr class="border-gray-200">            <!-- 擲骰檢定 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:dice-6" class="w-4 h-4 mr-2 text-blue-500" />
                擲骰檢定
              </h3>
              <div class="space-y-2 text-xs">
                <div class="bg-blue-50 p-2 rounded">
                  <div class="font-semibold text-blue-800 mb-1">計算力度：</div>
                  <ul class="text-blue-700 space-y-1">
                    <li>• 正面／負面標籤：+/-1 力度</li>
                    <li>• 燃燒標籤：+3 力度（使用後劃掉）</li>
                    <li>• 最佳／最差狀態等級：+/- 該等級</li>
                    <li>• 得勢／失勢：+3/-3（極端：+/-6）</li>
                  </ul>
                  <p class="text-blue-700 mt-2">每使用一個弱點標籤，就標記一次成長</p>
                </div>
                <div class="bg-green-50 p-2 rounded">
                  <div class="font-semibold text-green-800 mb-1">擲兩顆六面骰（2d6）+ 力度</div>
                  <ul class="text-green-700 space-y-1">
                    <li>• 10+：成功</li>
                    <li>• 7-9：成功，但有後果</li>
                    <li>• 6-：失敗，有後果</li>
                  </ul>
                </div>
              </div>
            </div><hr class="border-gray-200">

            <!-- 消耗力度 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:zap" class="w-4 h-4 mr-2 text-orange-500" />
                消耗力度
              </h3>
              <p class="text-gray-700 text-sm mb-2">行動成功後，使用力度來造成以下效果：</p>
              <div class="space-y-1 text-xs">
                <div class="p-2 bg-orange-50 rounded">
                  <span class="font-semibold text-orange-800">增加、刪除、恢復標籤：</span>
                  <span class="text-orange-700">2 力度</span>
                </div>
                <div class="p-2 bg-red-50 rounded">
                  <span class="font-semibold text-red-800">賦予或減少狀態：</span>
                  <span class="text-red-700">1 力度／每等級</span>
                </div>
                <div class="p-2 bg-blue-50 rounded">
                  <span class="font-semibold text-blue-800">揭示資訊或附加效果：</span>
                  <span class="text-blue-700">1 力度</span>
                </div>
                <div class="p-2 bg-purple-50 rounded">
                  <span class="font-semibold text-purple-800">建立單次性故事標籤：</span>
                  <span class="text-purple-700">至少1力度</span>
                </div>
              </div>
            </div>

            <hr class="border-gray-200">

            <!-- 反應 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:shield-check" class="w-4 h-4 mr-2 text-indigo-500" />
                反應
              </h3>
              <p class="text-gray-700 text-sm mb-2">如果敘事者允許，英雄可在承受後果前使用反應：</p>
              <div class="space-y-2 text-xs">
                <div class="bg-indigo-50 p-2 rounded">
                  <div class="font-semibold text-indigo-800 mb-1">力度消耗：</div>
                  <ul class="text-indigo-700 space-y-1">
                    <li>• 每 1 力度減少後果 1 等級</li>
                    <li>• 燃燒標籤需花費 2 力度</li>
                  </ul>
                </div>
                <div class="bg-blue-50 p-2 rounded">
                  <div class="font-semibold text-blue-800 mb-1">描述動作後擲骰：</div>
                  <ul class="text-blue-700 space-y-1">
                    <li>• 10+：可額外獲得 1 點力度</li>
                    <li>• 7-9：僅花費現有力度</li>
                    <li>• 6-：完全承受後果</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr class="border-gray-200">            <!-- 露營 -->
            <div>
              <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                <Icon name="lucide:tent" class="w-4 h-4 mr-2 text-green-500" />
                露營
              </h3>
              <p class="text-gray-700 text-sm mb-2">敘事者會讓故事標籤過期。每位英雄選擇 2 個活動（若有後果則選 3 項）：</p>
              <div class="space-y-1 text-xs">
                <div class="p-2 bg-green-50 rounded">
                  <span class="font-semibold text-green-800">休息：</span>
                  <span class="text-green-700">恢復狀態與刪劃標籤（敘事者決定）</span>
                </div>
                <div class="p-2 bg-blue-50 rounded">
                  <span class="font-semibold text-blue-800">反思：</span>
                  <span class="text-blue-700">選一主題標記一次成長</span>
                </div>
                <div class="p-2 bg-purple-50 rounded">
                  <span class="font-semibold text-purple-800">行動：</span>
                  <span class="text-purple-700">不擲骰，花力度以獲得效果或進行檢定</span>
                </div>
              </div>
              <p class="text-gray-600 text-xs mt-2">
                英雄也可以恢復同行羈絆主題中的標籤，或與另一位英雄建立新的關係標籤（1位英雄最多1位同伴）
              </p>
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
  title: '如何遊玩 - 迷霧傳奇'
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
</style>
