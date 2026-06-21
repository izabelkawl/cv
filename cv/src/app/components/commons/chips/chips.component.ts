import { Component, OnInit } from '@angular/core';
import { Colors, SessionStorageKeys } from '@app/shared/enums/variables';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  standalone: true,
})
export class ChipsComponent implements OnInit {
  public hue = 215;
  public lightness = 50;
  public customColor = '#141f49';
  public invalidHex = false;

  ngOnInit(): void {
    try {
      this.initializeColor();
    } catch (e) {}
  }

  public onHexInput(value: string): void {
    this.customColor = value;
    this.invalidHex = !this.isHexColor(value);

    if (!this.invalidHex) {
      const hsl = this.hexToHsl(value);
      if (hsl) {
        this.hue = Math.round(hsl.h);
        this.lightness = Math.round(hsl.l);
      }
      this.applyColor(value);
    }
  }

  public onHueChange(value: number | string): void {
    const hue = typeof value === 'number' ? value : parseFloat(value);
    if (!Number.isFinite(hue)) {
      return;
    }

    this.hue = Math.min(360, Math.max(0, Math.round(hue)));
    const hex = this.hslToHex(this.hue, 100, this.lightness);
    this.customColor = hex;
    this.invalidHex = false;
    this.applyColor(hex);
  }

  public onLightnessChange(value: number | string): void {
    const lightness = typeof value === 'number' ? value : parseFloat(value);
    if (!Number.isFinite(lightness)) {
      return;
    }

    this.lightness = Math.min(100, Math.max(0, Math.round(lightness)));
    const hex = this.hslToHex(this.hue, 100, this.lightness);
    this.customColor = hex;
    this.invalidHex = false;
    this.applyColor(hex);
  }

  private initializeColor(): void {
    const savedHex = sessionStorage?.getItem(SessionStorageKeys.CHIPS_HEX);
    const basicColor = getComputedStyle(document.body)
      .getPropertyValue(Colors.BASIC)
      .trim();
    const color = savedHex && this.isHexColor(savedHex)
      ? savedHex
      : basicColor || this.customColor;

    this.customColor = color;
    this.invalidHex = !this.isHexColor(color);

    if (!this.invalidHex) {
      const hsl = this.hexToHsl(color);
      if (hsl) {
        this.hue = Math.round(hsl.h);
        this.lightness = Math.round(hsl.l);
      }
      this.applyColor(color);
    }
  }

  private applyColor(hex: string): void {
    document.documentElement.style.setProperty(Colors.BASIC, hex);
    sessionStorage?.setItem(SessionStorageKeys.CHIPS_HEX, hex);
  }

  public isHexColor(value: string): boolean {
    return /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value?.trim() ?? '');
  }

  private hexToHsl(hex: string): { h: number; s: number; l: number } | null {
    if (!this.isHexColor(hex)) {
      return null;
    }

    const normalized = hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;

    const r = parseInt(normalized.slice(1, 3), 16) / 255;
    const g = parseInt(normalized.slice(3, 5), 16) / 255;
    const b = parseInt(normalized.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;

    if (delta !== 0) {
      s = delta / (1 - Math.abs(2 * l - 1));

      switch (max) {
        case r:
          h = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
          break;
        case g:
          h = ((b - r) / delta + 2) * 60;
          break;
        case b:
          h = ((r - g) / delta + 4) * 60;
          break;
      }
    }

    return { h, s: s * 100, l: l * 100 };
  }

  private hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
    } else if (h >= 120 && h < 180) {
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      b = c;
    } else {
      r = c;
      b = x;
    }

    const toHex = (value: number): string => {
      const hex = Math.round((value + m) * 255).toString(16).padStart(2, '0');
      return hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  private hexToHue(hex: string): number | null {
    if (!this.isHexColor(hex)) {
      return null;
    }

    const normalized = hex.length === 4
      ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
      : hex;
    const r = parseInt(normalized.slice(1, 3), 16) / 255;
    const g = parseInt(normalized.slice(3, 5), 16) / 255;
    const b = parseInt(normalized.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    if (delta === 0) {
      return 0;
    }

    let hue = 0;
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }

    hue = Math.round(hue * 60);
    if (hue < 0) {
      hue += 360;
    }

    return hue;
  }
}
