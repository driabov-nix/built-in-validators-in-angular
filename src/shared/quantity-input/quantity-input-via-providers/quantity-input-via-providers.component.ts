import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
} from '@angular/forms';
import { QuantityValidators } from '../validators/quantity.validators';

@Component({
  selector: 'app-quantity-input-via-providers',
  templateUrl: './quantity-input-via-providers.component.html',
  styleUrls: ['./quantity-input-via-providers.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: QuantityInputViaProvidersComponent,
      multi: true,
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: QuantityInputViaProvidersComponent,
      multi: true,
    },
  ],
})
export class QuantityInputViaProvidersComponent
  implements ControlValueAccessor, Validator, OnChanges
{
  @Input() min = 0;
  @Input() max = Number.MAX_SAFE_INTEGER;

  private validatorChange = () => {};
  private onChange: (value: number) => void = () => {};
  private onTouched = () => {};

  value = '';

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

  registerOnChange(fn: (value: number) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  writeValue(value: number) {
    this.value = `${value}`;
  }

  ngOnChanges() {
    if (this.validatorChange) {
      this.validatorChange();
    }
  }

  setValue(value: string | number) {
    this.value = `${value}`;
    const valueNumber = Number(value);
    if (this.onChange) {
      this.onChange(valueNumber);
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }

  increment() {
    this.setValue(Number(this.value) + 1);
  }

  decrement() {
    this.setValue(Number(this.value) - 1);
  }

  onBlurred() {
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
