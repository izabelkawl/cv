export type ButtonTypes = 'mat-buttons' | 'mat-raised-button' | 'mat-flat-button' | undefined;

export type ColorTypes = 'primary' | undefined;

export interface IButton {
  id?: string;
  name: string; 
  color?: ColorTypes;
  className?: string;
  type?: ButtonTypes;
  basicColor?: boolean;
  animate?: boolean;
}