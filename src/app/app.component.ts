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
    console.log('this.form', this.form);
    console.log('this.form.controls', this.form.controls);
    this.formConfig = this.formConfigService.getFormConfig(); //TODO: RxJS Obs
    this.buildForm();
  }

  public buildForm(): void {
    this.formConfig!.forEach(field => {  
      console.log('field: ', field);
      console.log('field.addable: ', field.addable);

      if (field.type === 'checkbox') {
        this.form.addControl(field.fieldName, this.fb.array([]));
      } else if (field.addable) {
        this.form.addControl(field.fieldName, this.fb.array([new FormControl('', field.required ? Validators.required : [])]));
      } else {
        this.form.addControl(field.fieldName, new FormControl('', field.required ? Validators.required : []));
      }
    });
    console.log('buildForm this.form', this.form);
    console.log('buildForm this.form.controls', this.form.controls);
  }

  public getFormControl(controlName: string): FormControl | null{
    console.log('controlName:', controlName);
    console.log('getFormControl this.form:', this.form);
    const control = this.form.get(controlName);
    //const control: FormControl = this.form.controls[controlName];

    console.log('getFormControl:', control);
    //if (!(control instanceof FormControl)) { throw new Error('control содержит null'); }
    return control instanceof FormControl ? control : null;
  }

  public getFormArray(controlName: string): FormArray {
    const control = this.form.get(controlName);
    return control instanceof FormArray ? control : this.fb.array([]);
  }

  public addField(controlName: string): void {
    const formArray = this.getFormArray(controlName);
    if (formArray) {
      formArray.push(new FormControl(''));
    }
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
