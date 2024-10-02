import { AfterViewInit, Component } from '@angular/core';
import { ExplodingStarComponent } from './exploding-star/exploding-star.component';
import { StarComponent } from './star/star.component';
import { SkinnyStarComponent } from './skinny-star/skinny-star.component';
import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss',
  standalone: true,
  imports: [
    ExplodingStarComponent,
    StarComponent,
    SkinnyStarComponent,
    NgClass,
    NgIf,
    NgTemplateOutlet,
  ],
})
export class StarsComponent implements AfterViewInit {
  #stars?: NodeListOf<Element>;

  public iterate: {
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
    this.#stars = document.querySelectorAll('.star');
    this.#stars.forEach((item: any) => {
      item.onanimationend = () => {
        item.classList.remove('animate-star');
      };
    });
  }

  public hideStar(index: number): void {
    this.iterate[index].hidden = true;
  }

  public addAnimation(index: number) {
    if (this.#stars) {
      const { classList } = this.#stars?.[index] || {};
      classList.add('animate-star');
    }
  }

  public getTransparentColor(colored: boolean): string {
    return colored ? 'var(--white)' : 'transparent';
  }

  private randomValue(number: number): number {
    return Math.floor(Math.random() * number);
  }
}
