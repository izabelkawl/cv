import { Pipe, PipeTransform } from '@angular/core';
import { InfoKeys } from '@app/base-layout/base-layout.interface';

@Pipe({ name: 'phonePipe', standalone: true })
export class PhonePipe implements PipeTransform {
  transform(value: any, key: InfoKeys, hidden: boolean) {
    return hidden && key === 'phone' && value
      ? value
          .split('')
          .map((x: string, index: number) => {
            return index > 9 && index < 13 ? '*' : x;
          })
          .join('')
      : value;
  }
}
