import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-test-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './test-input.component.html',
  styleUrl: './test-input.component.scss'
})
export class TestInputComponent {

    @Input() label: string = '';          
    @Input() placeholder: string = '';
    @Input() description?: string;    
    @Input() required?: boolean = false;
    @Input() control!: FormControl; 
    @Input() addable = false;  
}
