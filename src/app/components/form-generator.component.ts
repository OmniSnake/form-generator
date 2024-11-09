import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FieldsConfig } from '../models/fields-config';
import { TestCheckboxComponent } from "../components/test-checkbox/test-checkbox.component";
import { TestInputComponent } from "../components/test-input/test-input.component";
import { TestNumberComponent } from "../components/test-number/test-number.component";
import { TestSelectComponent } from "../components/test-select/test-select.component";
import { TestForm } from '../models/test-form.model'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TestCheckboxComponent,
    TestInputComponent,
    TestNumberComponent,
    TestSelectComponent,
  ],
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit {

  @Input() formConfig!: FieldsConfig[];

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadFormData();
  }

  public buildForm(): void {
    this.formConfig.forEach(field => {
      if (field.type === 'checkbox') {
        this.form.addControl(
          field.fieldName,
          this.fb.array([], field.required ? Validators.required : [])
        );
      } else if (field.addable) {
        const controlArray = this.fb.array(
          [new FormControl('', field.required ? Validators.required : [])],
          field.required ? Validators.required : []
        );
        this.form.addControl(field.fieldName, controlArray);
      } else {
        this.form.addControl(
          field.fieldName,
          new FormControl('', field.required ? Validators.required : [])
        );
      }
    });
  }

  public getFormControl(controlName: string): FormControl | null {
    const control = this.form.get(controlName);
    return control instanceof FormControl ? control as FormControl : null;
  }

  public getFormArray(controlName: string): FormArray | null {
    const control = this.form.get(controlName);
    return control instanceof FormArray ? control as FormArray : null;
  }

  public getFormControlFromArray(controlName: string, index: number): FormControl | null {
    const formArray = this.getFormArray(controlName);
    if (formArray && formArray.at(index) instanceof FormControl) {
      return formArray.at(index) as FormControl;
    }
    return null;
  }

  public addField(controlName: string, maxLength?: number): void {
    const formArray = this.getFormArray(controlName);
    if (formArray) {
      if (maxLength === undefined || formArray.length < maxLength) {
        formArray.push(new FormControl(''));
      } else {
        console.warn('Максимальное количество полей достигнуто');
      }
    }
  }

  public removeField(controlName: string, index: number): void {
    const formArray = this.getFormArray(controlName);
    if (formArray) {
      formArray.removeAt(index);
      if (formArray.length === 0) {
        formArray.push(new FormControl(''));
      }
    }
  }

  public patchFormData(formData: { [key: string]: any }): void {
    this.formConfig.forEach((field: FieldsConfig) => {
      const fieldName = field.fieldName;
      const fieldValue = formData[fieldName];
  
      const control = this.form.get(fieldName);
  
      if (fieldValue !== undefined && fieldValue !== null) {
        if (control instanceof FormControl) {
          control.patchValue(fieldValue);
        } else if (control instanceof FormArray) {
          control.clear();
  
          const valuesArray = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
  
          valuesArray.forEach((value: any) => {
            control.push(new FormControl(value));
          });
        }
      } else if (control instanceof FormArray && control.length === 0) {
        control.push(new FormControl(''));
      }
    });
  }

  public getFormArrayLength(controlName: string): number {
    const formArray = this.getFormArray(controlName);
    return formArray ? formArray.length : 0;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const testForm: TestForm = this.buildTestForm();
      console.log('%cЭто тестовое сообщение. Производится отправка формы. testForm: ', 'color: green; font-weight: bold;', testForm);

      this.apiService.postFormData(testForm)
        .subscribe({
          next: response => {
            console.log('Форма успешно отправлена на сервер.', response);
          },
          error: error => {
            console.error('Ошибка при отправке формы:', error);
          }
        });
    } else {
      console.error('Форма недействительна');
      this.form.markAllAsTouched();
    }
  }

  public applyModifiers(choices: string[], modifiers: any): string[] {
    if (modifiers) {
      if (modifiers.exclude) {
        choices = choices.filter(choice => !modifiers.exclude.includes(choice));
      }
      if (modifiers.include) {
        choices = choices.concat(modifiers.include);
      }
    }
    return choices;
  }

  private buildTestForm(): TestForm {
    const formValue = this.form.value;
    const testForm: TestForm = {};

    Object.keys(formValue).forEach(key => {
      testForm[key] = formValue[key];
    });

    return testForm;
  }

  private loadFormData(): void {
    this.apiService.getFormData().subscribe({
      next: (data) => {
        this.patchFormData(data);
      },
      error: (error) => {
        console.error('Ошибка при получении данных формы:', error);
      }
    });
  }
}