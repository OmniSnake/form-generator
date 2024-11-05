import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-test-checkbox',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './test-checkbox.component.html',
  styleUrls: ['./test-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCheckboxComponent {
  @Input() label: string = '';
  @Input() description?: string;
  @Input() required?: boolean = false;
  @Input() options: string[] = [];
  @Input() control!: FormArray;

// Метод для проверки, выбран ли конкретный вариант
public isOptionSelected(option: string): boolean {
  return this.control?.value.includes(option) ?? false;
}

// Метод для обработки изменений в чекбоксах
public onCheckboxChange(option: string, event: Event): void {
  const checkbox = event.target as HTMLInputElement;
  if (checkbox.checked) {
    this.control.push(new FormControl(option));
  } else {
    const index = this.control.controls.findIndex(control => control.value === option);
    if (index !== -1) {
      this.control.removeAt(index);
    }
  }
}
}