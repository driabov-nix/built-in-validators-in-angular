import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuantityInputViaProvidersComponent } from '../../shared/quantity-input/quantity-input-via-providers/quantity-input-via-providers.component';

@Component({
  selector: 'app-providers-based',
  templateUrl: './providers-based.component.html',
  styleUrls: ['./providers-based.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuantityInputViaProvidersComponent,
  ],
  standalone: true,
})
export class ProvidersBasedComponent {
  control = new FormControl(0);
  min = 0;
  max = 5;
}
