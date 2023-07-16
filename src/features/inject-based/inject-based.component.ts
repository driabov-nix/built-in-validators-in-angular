import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuantityInputViaInjectComponent } from '../../shared/quantity-input/quantity-input-via-inject/quantity-input-via-inject.component';

@Component({
  selector: 'app-inject-based',
  templateUrl: './inject-based.component.html',
  styleUrls: ['./inject-based.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuantityInputViaInjectComponent,
  ],
  standalone: true,
})
export class InjectBasedComponent {
  control = new FormControl(0);
  min = 0;
  max = 5;
}
