// 統一主題系統的 TypeScript 類型定義

// 基礎介面
export interface Metadata {
  title: string;
  description: string;
  version: string;
  created: string;
  language: string;
}

export interface QuestionItem {
  id: string;
  question: string;
}

export interface ThemeQuestions {
  background: string[];
  ability_tags: QuestionItem[];
  weakness_tags: QuestionItem[];
}

export interface BaseThemeType {
  theme: string;
  title: string;
  concept: string;
  questions: ThemeQuestions;
  mission_concepts: string[];
}

// 起源主題系統
export interface OriginThemeType extends BaseThemeType {}

export interface SampleOrigin {
  name: string;
  type: string; // 目前都是 "circumstance"
  ability_tags: string[];
  weakness_tags: string[];
  origin_story: string;
}

export interface OriginProfile {
  name: string;
  background: string;
  tags: string[];
  relationships: string[];
  goals: string[];
}

export interface OriginThemeData {
  metadata: Metadata;
  origins: {
    [key: string]: OriginThemeType;
  };
  templates: {
    origin_profile: OriginProfile;
  };
  examples: {
    sample_characters: SampleOrigin[];
  };
}

// 冒險主題系統
export interface AdventureThemeType extends BaseThemeType {}

export interface SampleAdventurer {
  name: string;
  adventure_type: string;
  motivation: string;
  ability_tags: string[];
  weakness_tags: string[];
  adventure_story: string;
}

export interface AdventureProfile {
  name: string;
  motivation: string;
  goal: string;
  obstacles: string[];
  resources: string[];
}

export interface AdventureThemeData {
  metadata: Metadata;
  adventure_themes: {
    [key: string]: AdventureThemeType;
  };
  templates: {
    adventure_profile: AdventureProfile;
  };
  examples: {
    sample_adventurers: SampleAdventurer[];
  };
}

// 偉業主題系統
export interface GreatnessThemeType extends BaseThemeType {}

export interface SampleHero {
  name: string;
  greatness_type: string;
  greatness: string;
  ability_tags: string[];
  weakness_tags: string[];
  hero_story: string;
}

export interface GreatnessProfile {
  name: string;
  greatness: string;
  legacy: string;
  challenges: string[];
  supporters: string[];
}

export interface GreatnessThemeData {
  metadata: Metadata;
  greatness_themes: {
    [key: string]: GreatnessThemeType;
  };
  templates: {
    greatness_profile: GreatnessProfile;
  };
  examples: {
    sample_heroes: SampleHero[];
  };
}

// 主題系統類型
export type SystemType = 'origin' | 'adventure' | 'greatness';

export interface SystemData {
  origin: OriginThemeData | null;
  adventure: AdventureThemeData | null;
  greatness: GreatnessThemeData | null;
}

// 可用主題項目
export interface AvailableTheme {
  key: string;
  theme: string;
  title: string;
}

// 選中的主題資料
export type SelectedThemeData = OriginThemeType | AdventureThemeType | GreatnessThemeType;

// 範例角色聯合類型
export type SampleCharacter = SampleOrigin | SampleAdventurer | SampleHero;

// 主題系統常數
export const THEME_SYSTEMS = {
  ORIGIN: 'origin' as const,
  ADVENTURE: 'adventure' as const,
  GREATNESS: 'greatness' as const,
} as const;

export const THEME_SYSTEM_LABELS = {
  [THEME_SYSTEMS.ORIGIN]: '起源主題 (Origin Themes)',
  [THEME_SYSTEMS.ADVENTURE]: '冒險主題 (Adventure Themes)',
  [THEME_SYSTEMS.GREATNESS]: '偉業主題 (Greatness Themes)',
} as const;
