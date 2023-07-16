import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  Validators,
} from '@angular/forms';
import { QuantityValidators } from './quantity.validators';

@Directive({
  selector:
    'quantity-input-via-inject[formControl], quantity-input-via-inject[formControlName]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: QuantityInputValidatorsDirective,
      multi: true,
    },
  ],
})
export class QuantityInputValidatorsDirective implements Validator {
  @Input() min = 0;
  @Input() max = Number.MAX_SAFE_INTEGER;

  private validatorChange = () => {};

  validate(control: AbstractControl<number>) {
    const validator = Validators.compose([
      QuantityValidators.quantity,
      QuantityValidators.min(this.min),
      QuantityValidators.max(this.max),
    ]);
    return validator ? validator(control) : null;
  }

  registerOnValidatorChange(fn: () => void) {
    this.validatorChange = fn;
  }

  ngOnChanges() {
    if (this.validatorChange) {
      this.validatorChange();
    }
  }
}
