import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestCheckboxComponent } from "./components/test-checkbox/test-checkbox.component";
import { TestInputComponent } from "./components/test-input/test-input.component";
import { TestNumberComponent } from "./components/test-number/test-number.component";
import { TestSelectComponent } from "./components/test-select/test-select.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { FormConfigService } from './services/form-config.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TestCheckboxComponent,
    TestInputComponent,
    TestNumberComponent,
    TestSelectComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  constructor(private fb: FormBuilder, private formConfigService: FormConfigService) {
    this.form = this.fb.group({});
  }

  public title = 'form-generator';

  public form: FormGroup;
  public formConfig?: any[];
  
  public ngOnInit(): void {
    this.formConfig = this.formConfigService.getFormConfig(); //TODO: RxJS Obs
    this.buildForm();
  }

  public buildForm(): void {
    this.formConfig!.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      if (field.type === 'checkbox') {
        this.form.addControl(field.label, this.fb.array([]));
      } else {
        this.form.addControl(field.label, this.fb.control('', validators));
      };
    });
  }

  public getFormControl(controlName: string): FormControl | null {
    const control = this.form.get(controlName);
    return control instanceof FormControl ? control : null; // TODO: Поймать ошибку на null
  }

  public getFormArray(controlName: string): FormArray {
    return this.form.get(controlName) as FormArray;
  }

  public get checkboxList(): FormArray {
    return this.form.get('checkbox') as FormArray;
  }


  public onCheckboxChange(option: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkboxList.push(new FormControl(option));
    } else {
      const index = this.checkboxList.controls.findIndex(control => control.value === option);
      if (index !== -1) {
        this.checkboxList.removeAt(index);
      }
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      console.log('Form data:', this.form.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
