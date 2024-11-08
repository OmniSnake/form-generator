import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormArray, CheckboxRequiredValidator, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-test-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './test-input.component.html',
  styleUrl: './test-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestInputComponent {

    @Input() label: string | null = '';          
    @Input() placeholder: string = '';
    @Input() description?: string;    
    @Input() required = false;
    @Input() addable = false;
    @Input() control!: FormControl;
    @Input() maxLength: number = 10;
    }
    
