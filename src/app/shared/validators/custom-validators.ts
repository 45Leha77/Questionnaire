import { AbstractControl, ValidationErrors } from '@angular/forms';
import { AnswerFormValue, AnswerRadioFormValue } from '../../models/interfaces';

export function validateCheckBox(
  multipleArray: AbstractControl
): ValidationErrors | null {
  if (!multipleArray.value.length) {
    return null;
  }
  const isAnyCheckboxChecked = multipleArray.value.filter(
    (control: AnswerFormValue) => !!control.inp
  ).length
    ? true
    : false;

  return isAnyCheckboxChecked ? null : { multipleCheckboxRequireOne: true };
}

export function validateRadioButton(
  singleArray: AbstractControl
): ValidationErrors | null {
  if (!singleArray.value.length) {
    return null;
  }
  const isAnyCheckboxChecked = singleArray.value.filter(
    (control: AnswerRadioFormValue) => !!control.radio
  ).length
    ? true
    : false;
  return isAnyCheckboxChecked ? null : { multipleCheckboxRequireOne: true };
}
