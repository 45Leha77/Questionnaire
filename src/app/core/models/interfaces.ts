import { FormControl, FormGroup } from '@angular/forms';
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
  updateCardByForm: (form: FormGroup<any>) => void;
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
