import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './test-checkbox.component.html',
  styleUrls: ['./test-checkbox.component.scss'],
})
export class TestCheckboxComponent {
  @Input() label: string = '';
  @Input() description?: string;
  @Input() required?: boolean = false;
  @Input() control!: FormControl;
}