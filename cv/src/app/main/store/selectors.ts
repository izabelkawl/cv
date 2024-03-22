import { createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/types/appState.interface';

export const selectFeature = (state: AppStateInterface) => state.info;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading,
);

export const infoSelector = createSelector(
  selectFeature,
  (state) => state?.info,
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error,
);