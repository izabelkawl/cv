import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'linkPipe', standalone: true })
export class LinkPipe implements PipeTransform {
  transform(value: string) {
    if (!value) return '';

    const { length } = value.split('/');

    return length > 1 ? `@${value.split('/')[length - 1]}` : value;
  }
}
