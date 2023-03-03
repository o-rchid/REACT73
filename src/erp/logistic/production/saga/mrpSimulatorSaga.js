import { takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';

const INSERT_MRP_LIST_REQUEST = 'src/erp/logistic/Saga/INSERT_MRP_LIST';
const SEARCH_MRP_LIST_REQUEST = 'src/erp/logistic/Saga/SEARCH_MRP';

//MRP 모의전개
const MRPSIMULATOR_START = 'src/erp/logistic/production/reducer/MRPSIMULATOR';

export const searchMrpList = createAction(SEARCH_MRP_LIST_REQUEST);
export const MrpRegisterList = createAction(INSERT_MRP_LIST_REQUEST);

const searchMrpListSaga = createRequestSaga(SEARCH_MRP_LIST_REQUEST, api.searchMrpList);
const mrpInsertSaga = createRequestSaga(INSERT_MRP_LIST_REQUEST, api.mrpInsert);
const mrpSimulatorSaga = createRequestSaga(MRPSIMULATOR_START, api.mrpSimulator);

export default function* mrpsimulatorlist() {
    yield takeEvery(SEARCH_MRP_LIST_REQUEST, searchMrpListSaga);
    yield takeEvery(INSERT_MRP_LIST_REQUEST, mrpInsertSaga);
    yield takeEvery(MRPSIMULATOR_START, mrpSimulatorSaga);
}
