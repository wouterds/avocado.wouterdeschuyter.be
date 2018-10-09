//@flow
import { all } from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import images from './Images/sagas';

export default function*(): Saga<void> {
  yield all([...images]);
}
