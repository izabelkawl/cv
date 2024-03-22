import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss',
})
export class StarsComponent implements AfterViewInit {
  @Input() config?: any[];

  array?: NodeListOf<Element>;

  iterate: {
    iconType: number;
    colored: boolean;
    size: string;
    hidden: boolean;
  }[] = new Array(180).fill(null).map(() => {
    return {
      iconType: this.randomValue(3),
      colored: !!this.randomValue(2),
      size: (this.randomValue(4) ?? '') + '0px',
      hidden: false,
    };
  });

  ngAfterViewInit(): void {
    this.array = document.querySelectorAll('.star');
    this.array.forEach((item: any) => {
      item.onanimationend = () => {
        item.classList.remove('animate-star');
      };
    });
  }

  hideStar(index: number): void {
    this.iterate[index].hidden = true;
  }

  addAnimaton(index: number) {
    if (this.array) {
      const { classList } = this.array?.[index] || {};
      classList.add('animate-star');
    }
  }

  setTransparenColor(colored: boolean): string {
    return colored ? 'var(--white)' : 'transparent';
  }

  randomValue(number: number): number {
    return Math.floor(Math.random() * number);
  }
}
