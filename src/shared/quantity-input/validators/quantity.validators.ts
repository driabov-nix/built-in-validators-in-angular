import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class QuantityValidators {
  static quantity(
    control: AbstractControl<number | null>
  ): ValidationErrors | null {
    const value = control.value;
    if (typeof value !== 'number') {
      return null;
    }

    if (isNaN(value) || !Number.isInteger(value)) {
      return { quantity: true };
    }

    return null;
  }

  static min(min: number = 0): ValidatorFn {
    return (
      control: AbstractControl<number | null>
    ): ValidationErrors | null => {
      const value = control.value;
      if (typeof value !== 'number' || isNaN(value)) {
        return null;
      }

      if (value < min) {
        return { min: true };
      }

      return null;
    };
  }

  static max(max: number = Number.MAX_SAFE_INTEGER): ValidatorFn {
    return (
      control: AbstractControl<number | null>
    ): ValidationErrors | null => {
      const value = control.value;

      if (typeof value !== 'number' || isNaN(value)) {
        return null;
      }

      if (value > max) {
        return { max: true };
      }

      return null;
    };
  }
}
