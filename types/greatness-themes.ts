// 偉業主題系統的 TypeScript 類型定義

export interface GreatnessThemeData {
  metadata: {
    title: string;
    description: string;
    version: string;
    created: string;
    language: string;
  };
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

export interface GreatnessThemeType {
  theme: string;
  title: string;
  concept: string;
  questions: {
    background: string[];
    ability_tags: QuestionItem[];
    weakness_tags: QuestionItem[];
  };
  mission_concepts: string[];
}

export interface QuestionItem {
  id: string;
  question: string;
}

export interface GreatnessProfile {
  basic_info: {
    name: string;
    greatness_type: string;
    primary_goal: string;
    current_status: string;
  };
  answers: {
    background_questions: Record<string, string>;
    ability_tags: Record<string, string>;
    weakness_tags: Record<string, string>;
  };
  selected_mission: string;
  custom_mission: string;
  supporters: string[];
  obstacles: string[];
  notes: string;
}

export interface SampleHero {
  name: string;
  description: string;
  greatness_type: string;
  primary_goal: string;
  key_abilities: string[];
  key_weaknesses: string[];
}

// 偉業主題類型的字符串聯合類型
export type GreatnessThemeTypes = 'destiny' | 'dominion' | 'mastery' | 'monstrosity';

// 偉業主題相關的常數
export const GREATNESS_THEME_TYPES = {
  DESTINY: 'destiny',
  DOMINION: 'dominion',
  MASTERY: 'mastery',
  MONSTROSITY: 'monstrosity'
} as const;

// 輔助函數類型
export type GreatnessThemeTypeKey = keyof typeof GREATNESS_THEME_TYPES;
export type GreatnessThemeTypeValue = typeof GREATNESS_THEME_TYPES[GreatnessThemeTypeKey];
