import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { CardType } from '../enums/card-type';

export interface Answer {
  value: string;
}

export interface CommonQuestionCard {
  id: number;
  type?: CardType;
  question: string;
  date: number;
  isAnswered: boolean;
  answerDate?: number;
  updateCardByForm: (form: FormGroup) => void;
}

export interface SingleQuestionCard extends CommonQuestionCard {
  single: Answer[];
  singleValue?: number;
}

export interface MultipleQuestionCard extends CommonQuestionCard {
  multiple: Answer[];
  multipleValue?: number[];
}

export interface OpenQuestionCard extends CommonQuestionCard {
  openAnswerValue?: string;
}

export type QuestionCard =
  | SingleQuestionCard
  | MultipleQuestionCard
  | OpenQuestionCard;

export interface CardValidator {
  isValid: boolean;
  id: number;
}

export interface AnswerCheckboxFormValue {
  text: string;
  input: boolean;
}

export interface AnswerRadioFormValue {
  text: string;
  radio: boolean;
}

export interface MultipleQuestionFormArray<T = string, I = string> {
  text: FormControl<T | null>;
  input: FormControl<I | null>;
}

export interface SingleQuestionFormArray<T = string, R = string> {
  text: FormControl<T | null>;
  radio: FormControl<R | null>;
}

export interface CardForm {
  answers: FormArray;
}
