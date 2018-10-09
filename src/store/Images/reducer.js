//@flow
import { FETCH, FETCH_SUCCESS, FETCH_ERROR } from './actions';

export type State = {
  isLoading: boolean,
  hasError: boolean,
  images: Image[],
};

const EMPTY_STATE: State = {
  isLoading: false,
  hasError: false,
  images: [],
};

export default (state: State = EMPTY_STATE, action: Object) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case FETCH_SUCCESS:
      const { images } = payload;

      return {
        ...state,
        isLoading: false,
        hasError: false,
        images,
      };
    case FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    default:
      return state;
  }
};
