import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-number',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './test-number.component.html',
  styleUrls: ['./test-number.component.scss'],
})
export class TestNumberComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() description?: string;
  @Input() required?: boolean = false;
  @Input() control!: FormControl;
}