// 冒險主題系統的 TypeScript 類型定義

export interface AdventureThemeData {
  metadata: {
    title: string;
    description: string;
    version: string;
    created: string;
    language: string;
  };  adventure_themes: {
    [key: string]: AdventureThemeType;
  };
  templates: {
    adventure_profile: AdventureProfile;
  };
  examples: {    sample_adventurers: SampleAdventurer[];
  };
}

export interface AdventureThemeType {
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

export interface AdventureProfile {
  basic_info: {
    name: string;
    adventure_type: string;
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

export interface SampleAdventurer {
  name: string;
  description: string;
  adventure_type: string;
  primary_goal: string;
  key_abilities: string[];
  key_weaknesses: string[];
}

// 冒險主題類型的字符串聯合類型
export type AdventureThemeTypes = 'duty' | 'influence' | 'knowledge' | 'prodigious_ability' | 'relic' | 'uncanny_being';

// 冒險主題相關的常數
export const ADVENTURE_THEME_TYPES = {
  DUTY: 'duty',
  INFLUENCE: 'influence',
  KNOWLEDGE: 'knowledge',
  PRODIGIOUS_ABILITY: 'prodigious_ability',
  RELIC: 'relic',
  UNCANNY_BEING: 'uncanny_being'
} as const;
