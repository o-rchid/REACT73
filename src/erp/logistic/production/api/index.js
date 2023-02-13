import axios from 'api/logiApi'; //'http://localhost:9102'

export const searchMpsList = (param) =>
    axios.get('/production/searchMpsInfo', {
        params: {
            startDate: param.payload.startDate,
            endDate: param.payload.endDate
        }
    });

export const searchMrpList = (param) =>
    axios.get('/logistics/production/openMrp', {
        params: {
            mpsNoListStr: param.payload.mpsNoListStr
        }
    });

export const mrpInsert = (param) =>
    axios.put(
        '/logistics/production/registerMrp',
        {
            mrpRegisterDate: param.payload.mrpRegisterDate,
            batchList: param.payload.batchList
        },
        { headers: { 'Content-Type': 'application/json' } }
    );

export const searchGetMpsList = (param) =>
    axios.get('/logistics/production/getMrpList', {
        params: {
            mrpGatheringStatusCondition: param.payload.mrpGatheringStatusCondition
        }
    });

export const searchGatherList = (param) =>
    axios.put('/logistics/production/getMrpGatheringList', {
        mrpNoList: param.payload.mrpNoList
    });

export const gatherInsert = (param) =>
    axios.put(
        '/logistics/production/registerMrpGathering',
        {
            mrpGatheringRegisterDate: param.payload.mrpGatheringRegisterDate,
            batchList: param.payload.batchList,
            mrpNoAndItemCodeList: param.payload.mrpNoAndItemCodeList
        },
        { headers: { 'Content-Type': 'application/json' } }
    );

//-------MPS-------
export const searchContractDetailInMpsAvailable = (action) =>
    axios.get('/production/mps/contractdetail-available', {
        params: {
            startDate: action.param.startDate,
            endDate: action.param.endDate,
            searchCondition: action.param.searchCondition
        }
    });

export const convertContractDetailToMps = (action) =>
    axios.post('http://localhost:9102/production/mps/contractdetail', { newMps: action.param.newMps });
//------------------
