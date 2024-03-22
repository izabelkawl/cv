import { createReducer, on } from '@ngrx/store';
import { InfoStateInterface } from '../main.interface';
import * as InfoActions from './action';

export const initialState: InfoStateInterface = {
  isLoading: false,
  info: undefined,
  error: null,
};

export const reducers = createReducer(
  initialState,
  on(InfoActions.getInfo, (state) => ({ ...state, isLoading: true })),
  on(InfoActions.getInfoSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    info: action.info,
  })),
  on(InfoActions.getInfoFaillure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
