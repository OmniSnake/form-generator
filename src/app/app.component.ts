import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestCheckboxComponent } from "./components/test-checkbox/test-checkbox.component";
import { TestInputComponent } from "./components/test-input/test-input.component";
import { TestNumberComponent } from "./components/test-number/test-number.component";
import { TestSelectComponent } from "./components/test-select/test-select.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestCheckboxComponent, TestInputComponent, TestNumberComponent, TestSelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'form-generator';
}
