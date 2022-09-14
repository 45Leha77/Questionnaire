import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageMode } from 'src/app/core/enums/page-mode';
import { CardValidator, CardForm } from 'src/app/core/models/interfaces';

@Directive()
export class CardBase {
  @Input() public mode: string = PageMode.list;
  @Output() public change = new EventEmitter<CardValidator>();
  public fb: FormBuilder = new FormBuilder();

  public form: FormGroup<CardForm> = this.fb.group({
    answers: this.fb.array([]),
  });
}
