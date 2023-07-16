import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { QuantityInputValidatorsDirective } from '../validators/quantity-input-validators.directive';

@Component({
  selector: 'app-quantity-input-via-inject',
  templateUrl: './quantity-input-via-inject.component.html',
  styleUrls: ['./quantity-input-via-inject.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
  hostDirectives: [
    { directive: QuantityInputValidatorsDirective, inputs: ['min', 'max'] },
  ],
})
export class QuantityInputViaInjectComponent implements ControlValueAccessor {
  private readonly _ngControl = inject(NgControl, { optional: true });
  private onChange: (value: number) => void = () => {};
  private onTouched = () => {};

  value = '';

  constructor() {
    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
    }
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
