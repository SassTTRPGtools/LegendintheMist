// 起源主題系統的 TypeScript 類型定義

export interface OriginThemeData {
  metadata: {
    title: string;
    description: string;
    version: string;
    created: string;
    language: string;
  };  origins: {
    [key: string]: OriginThemeType;
  };
  templates: {
    origin_profile: OriginProfile;
  };
  examples: {    sample_origins: SampleOrigin[];
  };
}

export interface OriginThemeType {
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

export interface OriginProfile {
  basic_info: {
    name: string;
    origin_type: string;
    social_status: string;
    current_situation: string;
  };
  answers: {
    background_questions: Record<string, string>;
    ability_tags: Record<string, string>;
    weakness_tags: Record<string, string>;
  };
  selected_mission: string;
  custom_mission: string;
  notes: string;
}

export interface SampleOrigin {
  name: string;
  description: string;
  origin_type: string;
  social_status: string;
  key_abilities: string[];
  key_weaknesses: string[];
}

// 工具函數類型
export interface CharacterGenerator {  loadOriginData(): Promise<OriginThemeData>;
  createOrigin(profile: Partial<OriginProfile>): OriginProfile;
  saveOrigin(origin: OriginProfile): Promise<void>;
  loadOrigin(id: string): Promise<OriginProfile>;
}
