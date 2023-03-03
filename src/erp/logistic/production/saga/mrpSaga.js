import { takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';

const SEARCH_MRP_GETMRPLIST_REQUEST = 'src/erp/logistic/Saga/SEARCH_MRP_GETMRPLIST';
const SEARCH_MRP_START = 'src/erp/logistic/production/reducer/SEARCH_MPS';
const INSERT_MRP_START = 'src/erp/logistic/production/reducer/INSERT_MRP';

const searchGetMpsListSaga = createRequestSaga(SEARCH_MRP_GETMRPLIST_REQUEST, api.searchGetMpsList);
const searchMpsListSaga = createRequestSaga(SEARCH_MRP_START, api.searchMpsList);
const insertMrpListSaga = createRequestSaga(INSERT_MRP_START, api.mrpInsert);

export default function* mrplist() {
    yield takeEvery(SEARCH_MRP_GETMRPLIST_REQUEST, searchGetMpsListSaga);
    yield takeEvery(SEARCH_MRP_START, searchMpsListSaga);
    yield takeEvery(INSERT_MRP_START, insertMrpListSaga);
}
