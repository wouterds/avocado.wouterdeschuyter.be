//@flow
import { createSelector } from 'reselect';
import type { State } from './reducer';
import type { Image } from './types';
import { sumBy } from 'lodash';
import { isAfter, isBefore } from 'date-fns';

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

export const getAveragedOutImages = createSelector(
  [getImages],
  (images: Image[]) => {
    const averageSize = sumBy(images, 'size') / images.length;

    return images.filter(image => image.size > averageSize);
  },
);

export const getAveragedOutImagesBetweenFactory = (from: Date, to: Date) =>
  createSelector(
    [getAveragedOutImages],
    (images: Image[]) =>
      images.filter(
        image => isAfter(image.date, from) && isBefore(image.date, to),
      ),
  );

export const getHasData = createSelector(
  [getImages],
  (images: Image[]) => images.length > 0,
);
