import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'addzero'})
export class Addzero implements PipeTransform {
  transform(value: number): string | number {
    if (value <= 9) {
      return `0${value}`;
    } else {
      return value;
    }
  }
}
