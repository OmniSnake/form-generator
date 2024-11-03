import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-select',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './test-select.component.html',
  styleUrls: ['./test-select.component.scss'],
})
export class TestSelectComponent {
  @Input() label: string = '';
  @Input() choices: string[] = [];       
  @Input() description?: string;
  @Input() required?: boolean = false;
  @Input() control!: FormControl;
}