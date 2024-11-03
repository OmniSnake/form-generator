import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './test-checkbox.component.html',
  styleUrls: ['./test-checkbox.component.scss'],
})
export class TestCheckboxComponent {
  @Input() label: string = '';
  @Input() description?: string;
  @Input() required?: boolean = false;
  @Input() options: string[] = [];
  @Input() control!: FormControl;
}