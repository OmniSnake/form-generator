import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-select',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './test-select.component.html',
  styleUrls: ['./test-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestSelectComponent {
  @Input() label: string = '';
  @Input() choices: string[] = [];       
  @Input() description?: string;
  @Input() required?: boolean = false;
  @Input() control!: FormControl;
  @Input() modifiers?: any;

  public selectedValue: string | null = null;
  public isDropdownOpen: boolean = false;
  public hoveredItem: string | null = null;

  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public selectChoice(choice: string): void {
    this.selectedValue = choice;
    this.control.setValue(choice);
    this.isDropdownOpen = false;
  }
}