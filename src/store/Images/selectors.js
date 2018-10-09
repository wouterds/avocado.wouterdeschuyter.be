//@flow
import { createSelector } from 'reselect';
import type { State } from './reducer';
import type { Image } from './types';

export const selectSettings = (state: Object) => state.images;

export const getIsLoading = createSelector(
  [selectSettings],
  (state: State) => state.isLoading,
);

export const getHasError = createSelector(
  [selectSettings],
  (state: State) => state.hasError,
);

export const getImages = createSelector(
  [selectSettings],
  (state: State) => state.images,
);

export const getHasData = createSelector(
  [getImages],
  (images: Image[]) => images.length > 0,
);
