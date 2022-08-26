export type QuestionsTypes = 'single' | 'multiple' | 'open' | '';

export interface Answer {
  value: string;
}

export interface QuestionCard {
  id: number;
  type: QuestionsTypes;
  question: string;
  single: Answer[];
  singleValue?: number;
  multiple: Answer[];
  multipleValue?: number[];
  open: boolean;
  openAnswerValue?: string;
  date: number;
  answered: boolean;
  answerDate?: number;
}

export interface CardValidator {
  isValid: boolean;
  id: number;
}
