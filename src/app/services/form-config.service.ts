import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  public getFormConfig() {
    return [
      { type: 'input', label: 'Имя', description: 'Введите ваше полное имя', required: true },
      {type: 'input',label: 'Навык',addable: true},
      { type: 'select', label: 'Место рождения', choices: ['Москва', 'Санкт-Петербург', 'Сочи'], required: false },
      { type: 'checkbox', label: 'Любимое блюдо', required: false, options: ['Хлеб', 'Яичница', 'Борщь', 'Котлеты с пюрешкой', 'Лазанья'] },
      { type: 'select', label: 'Вуз', description: 'Введите ВУЗ', choices: ['ПНИПУ', 'МГУ', 'МТИ'], required: false },
      { type: 'number', label: 'Возраст', description: 'Введите ваш возраст', required: true },
      { type: 'checkbox', label: 'Навыки', required: false, options: ['Общение', 'Вождение', 'Программирование', 'Оперное пение', 'Управление вертолетом'] }
    ];
  }
}