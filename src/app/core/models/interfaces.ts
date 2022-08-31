import { FormControl } from '@angular/forms';

export type QuestionsTypes = 'single' | 'multiple' | 'open';

export interface Answer {
  value: string;
}

export interface QuestionCard {
  id: number;
  type?: QuestionsTypes;
  question: string;
  single: Answer[];
  singleValue?: number;
  multiple: Answer[];
  multipleValue?: number[];
  isOpen: boolean;
  openAnswerValue?: string;
  date: number;
  isAnswered: boolean;
  answerDate?: number;
}

export interface CardValidator {
  isValid: boolean;
  id: number;
}

export interface AnswerCheckboxFormValue {
  text: string;
  inp: boolean;
}

export interface AnswerRadioFormValue {
  text: string;
  radio: boolean;
}

export interface MultipleQuestionFormArray {
  text: FormControl<string | null>;
  input: FormControl<string | null>;
}

export interface SingleQuestionFormArray {
  text: FormControl<string | null>;
  radio: FormControl<string | null>;
}
