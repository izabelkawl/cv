import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export const changeLanguage = trigger('changeLanguage', [
  state('pl', style({ opacity: 1, transform: 'scale(1)' })),
  state('en', style({ opacity: 1, transform: 'scale(1)' })),
  transition('pl <=> en', [
    animate(
      '0.3s ease-in-out',
      style({ opacity: 0.9, transform: 'scale(1.01)' })
    ),
    animate('0.3s ease-in-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
]);
