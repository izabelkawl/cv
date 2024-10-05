import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phonePipe', standalone: true })
export class PhonePipe implements PipeTransform {
  transform(value: any, hide: boolean) {
    return hide && value
      ? value
          .split('')
          .map((x: string, index: number) => {
            return index > 3 && index < 7 ? '*' : x;
          })
          .join('')
      : value;
  }
}
