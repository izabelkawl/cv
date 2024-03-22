import { createAction, props } from '@ngrx/store';

export const getInfo = createAction('[Info] Get Info');

export const getInfoSuccess = createAction(
  '[Info] Get Info sucess',
  props<{ info: any }>(),
);

export const getInfoFaillure = createAction(
  '[Info] Get Info failure',
  props<{ error: string }>(),
);
