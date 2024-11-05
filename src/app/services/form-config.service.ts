import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {

  public getFormConfig() {
    return [
      { type: 'input', fieldName: 'name', label: 'Имя', description: 'Введите ваше полное имя', required: true },
      { type: 'input', fieldName: 'footSize', label: 'Размер ноги', addable: true, maxLength: 12 },
      { type: 'select', fieldName: 'bornPlace', label: 'Место рождения', choices: ['Москва', 'Санкт-Петербург', 'Сочи'], required: false },
      { type: 'checkbox', fieldName: 'favoriteFood', label: 'Любимое блюдо', required: false, options: ['Хлеб', 'Яичница', 'Борщь', 'Котлеты с пюрешкой', 'Лазанья'] },
      { type: 'select', fieldName: 'university', label: 'Вуз', description: 'Введите ВУЗ', choices: ['ПНИПУ', 'МГУ', 'МТИ'], required: false },
      { type: 'number', fieldName: 'age', label: 'Возраст', description: 'Введите ваш возраст', required: true },
      { type: 'checkbox', fieldName: 'skills', label: 'Навыки', required: false, options: ['Общение', 'Вождение', 'Программирование', 'Оперное пение', 'Управление вертолетом'] }
    ];
  }
}