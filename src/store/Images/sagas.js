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

      const year = filename.substr(0, 4);
      const month = filename.substr(4, 2);
      const day = filename.substr(6, 2);
      const hour = filename.substr(8, 2);
      const minute = filename.substr(10, 2);
      const time = new Date(`${year}-${month}-${day} ${hour}:${minute} UTC`);

      const url = `${IMAGE_LOCATION}/${filename}`;

      return { filename, url, size, time };
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
