import { takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';

const SEARCH_MPS_LIST_REQUEST = 'src/erp/logistic/Saga/SEARCH_MPS';
const SEARCH_MPS_AVILABLE_START = 'src/erp/logistic/production/reducer/SEARCH_MPS_AVILABLE';

export const searchMpsList = createAction(SEARCH_MPS_LIST_REQUEST);

const searchMpsListSaga = createRequestSaga(SEARCH_MPS_LIST_REQUEST, api.searchMpsList);
const searchMpsAvailableSaga = createRequestSaga(SEARCH_MPS_AVILABLE_START, api.searchContractDetailInMpsAvailable);

export default function* mpslist() {
    yield takeEvery(SEARCH_MPS_LIST_REQUEST, searchMpsListSaga);
    yield takeEvery(SEARCH_MPS_AVILABLE_START, searchMpsAvailableSaga);
}
