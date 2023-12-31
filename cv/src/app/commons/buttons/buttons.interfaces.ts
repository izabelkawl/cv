export type ButtonTypes = 'mat-buttons' | 'mat-raised-button' | 'mat-flat-button' | undefined;

export type ColorTypes = 'primary' | undefined;

export interface IButton {
  id?: string | undefined;
  name: string; 
  color?: ColorTypes;
  className?: string;
  type?: ButtonTypes;
  animate?: boolean;
}