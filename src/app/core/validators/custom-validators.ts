import { AbstractControl, ValidationErrors } from '@angular/forms';
import {
  AnswerCheckboxFormValue,
  AnswerRadioFormValue,
} from '../models/interfaces';

export function validateCheckBox(
  multipleArray: AbstractControl
): ValidationErrors | null {
  if (!multipleArray.value.length) {
    return null;
  }
  const isAnyCheckboxChecked: number = multipleArray.value.filter(
    (control: AnswerCheckboxFormValue) => control.input
  ).length;
  return isAnyCheckboxChecked ? null : { multipleCheckboxRequireOne: true };
}

export function validateRadioButton(
  singleArray: AbstractControl
): ValidationErrors | null {
  if (!singleArray.value.length) {
    return null;
  }
  const isAnyRadioChecked: number = singleArray.value.filter(
    (control: AnswerRadioFormValue) => control.radio
  ).length;
  return isAnyRadioChecked ? null : { multipleCheckboxRequireOne: true };
}
