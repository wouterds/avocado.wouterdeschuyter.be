//@flow
import { createAction } from 'redux-actions';
import type { Images } from './types';

export const FETCH = 'Images/FETCH';
export const FETCH_SUCCESS = 'Images/FETCH_SUCCESS';
export const FETCH_ERROR = 'Images/FETCH_ERROR';

export const fetch = createAction(FETCH);

export const fetchSuccess = createAction(FETCH_SUCCESS, (images: Images) => ({
  images,
}));

export const fetchError = createAction(FETCH_ERROR);
