//@flow
import { call, fork, takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { API_ENDPOINT, IMAGE_LOCATION } from 'config';
import type { Image } from './types';
import { FETCH, fetchSuccess, fetchError } from './actions';

function* fetchFlow() {
  try {
    const response = yield call(axios.get, API_ENDPOINT);

    if (response.status !== 200) {
      throw new Error(`unexpected response code: ${response.status}`);
    }

    const images: Image[] = response.data.map(data => {
      const { name: filename, size } = data;
      const url = `${IMAGE_LOCATION}/${filename}`;
      const date = new Date(parseInt(filename.split('.')[0]) * 1000);

      return { filename, url, size, date };
    });

    yield put(fetchSuccess(images));
  } catch (error) {
    yield put(fetchError());
  }
}

function* fetchFlowWatcher() {
  yield takeEvery(FETCH, fetchFlow);
}

export default [fork(fetchFlowWatcher)];
