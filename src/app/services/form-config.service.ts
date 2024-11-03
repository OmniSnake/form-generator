import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  public getFormConfig() {
    return [
      { type: 'input', label: 'Имя', description: 'Введите ваше полное имя', required: true },
      { type: 'select', label: 'Место рождения', choices: ['Москва', 'Санкт-Петербург', 'Сочи'], required: false },
      { type: 'number', label: 'Возраст', description: 'Введите ваш возраст', required: true },
      { type: 'checkbox', label: 'Навыки', required: false, options: ['Общение', 'Вождение', 'Программирование', 'Оперное пение', 'Управление вертолетом'] }
    ];
  }
}