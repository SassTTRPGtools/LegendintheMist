# Origin Themes Sample Characters 結構文件

## 當前 origin-themes.json 中的 sample_characters 結構

### 資料結構
```json
{
  "examples": {
    "sample_characters": [
      {
        "name": "角色名稱",
        "type": "circumstance", // 固定為 circumstance，對應 Circumstance 主題
        "ability_tags": [
          "能力標籤1",
          "能力標籤2",
          // ... 更多能力標籤
        ],
        "weakness_tags": [
          "弱點標籤1",
          "弱點標籤2", 
          // ... 更多弱點標籤
        ],
        "origin_story": "角色的故事句"
      }
    ]
  }
}
```

### 欄位說明
- `name`: 角色名稱（字串）
- `type`: 主題類型，目前所有角色都是 "circumstance"
- `ability_tags`: 能力標籤陣列，包含角色的各種能力、技能、資源等
- `weakness_tags`: 弱點標籤陣列，包含角色的各種弱點、限制、問題等
- `origin_story`: 角色的故事句或主要目標描述

### 當前角色列表
1. **村政代表** - 地方領袖角色
2. **逃亡者** - 通緝犯角色
3. **苦力勞工** - 底層勞動者角色
4. **沒落貴族** - 落魄貴族角色
5. **棄民** - 社會邊緣人角色
6. **酒館鬥士** - 酒館常客角色

### 注意事項
- 所有角色的 `type` 都是 "circumstance"，對應 Circumstance 主題
- 能力標籤可能包含工具、技能、關係、資源、台詞等
- 弱點標籤通常反映角色的社會處境或個人限制
- 故事句表達角色的主要願望或人生目標

### 與其他主題系統的差異
- Adventure 主題使用 `adventure_type` 和 `sample_adventurers`
- Greatness 主題使用 `greatness_type` 和 `sample_heroes`
- Origin 主題目前只有 Circumstance 類型的角色範例
