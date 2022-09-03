import { FormGroup } from '@angular/forms';
import { CardType } from '../enums/card-type';
import {
  Answer,
  AnswerCheckboxFormValue,
  AnswerRadioFormValue,
  MultipleQuestionCard,
  OpenQuestionCard,
  QuestionCard,
  SingleQuestionCard,
} from '../models/interfaces';

const cardType = CardType;

export class CardFactory {
  public type?: CardType;
  public id: number = 0;
  public question: string = '';
  public date: number = 0;
  public isAnswered: boolean = false;
  public answerDate?: number;
  public createCard(options: QuestionCard): QuestionCard {
    this.type = options.type;
    switch (this.type) {
      case cardType.single:
        return new SingleQuestionCardFactory(options as SingleQuestionCard);
      case cardType.multiple:
        return new MultipleQuestionCardFactory(options as MultipleQuestionCard);
      case cardType.open:
        return new OpenQuestionCardFactory(options as OpenQuestionCard);
      default:
        throw Error('Wrong card type');
    }
  }
}

export class SingleQuestionCardFactory
  extends CardFactory
  implements SingleQuestionCard
{
  public single: Answer[] = [];
  public singleValue?: number;
  constructor(options: SingleQuestionCard) {
    super();
    this.id = options.id;
    this.date = options.date;
    this.type = options.type;
    this.question = options.question;
    this.single = options.single;
  }
  public updateCardByForm(form: FormGroup): void {
    this.question = form.value.question;
    this.single = form.value.singles.map(
      (singleData: { text: AnswerRadioFormValue }) => ({
        value: singleData.text,
      })
    );
  }
}

class MultipleQuestionCardFactory
  extends CardFactory
  implements MultipleQuestionCard
{
  public multiple: Answer[] = [];
  public multipleValue?: number[];
  constructor(options: MultipleQuestionCard) {
    super();
    this.id = options.id;
    this.date = options.date;
    this.type = options.type;
    this.question = options.question;
    this.multiple = options.multiple;
  }
  public updateCardByForm(form: FormGroup): void {
    this.question = form.value.question;
    this.multiple = form.value.multiples.map(
      (multipleData: { text: AnswerCheckboxFormValue }) => ({
        value: multipleData.text,
      })
    );
  }
}

export class OpenQuestionCardFactory
  extends CardFactory
  implements OpenQuestionCard
{
  public openAnswerValue?: string;
  constructor(options: OpenQuestionCard) {
    super();
    this.id = options.id;
    this.date = options.date;
    this.type = options.type;
    this.question = options.question;
    this.openAnswerValue = options.openAnswerValue;
  }
  public updateCardByForm(form: FormGroup): void {
    this.question = form.value.question;
  }
}
