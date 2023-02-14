export const SEARCH_MRP_GETMRPLIST_SUCCESS = 'src/erp/logistic/Saga/SEARCH_MRP_GETMRPLIST_SUCCESS';

//MPS 조회
export const SEARCH_MRP_START = 'src/erp/logistic/production/reducer/SEARCH_MPS';
export const SEARCH_MRP_SUCCESS = 'src/erp/logistic/production/reducer/SEARCH_MPS_SUCCESS';
export const SEARCH_MRP_FAILURE = 'src/erp/logistic/production/reducer/SEARCH_MPS_FAILURE';

const initialState = {
    MrpGetList: [],
    MrpList: []
};

const mrplist = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_MRP_GETMRPLIST_SUCCESS:
            return {
                ...state,
                MrpGetList: action.payload.gridRowJson
            };
        case SEARCH_MRP_SUCCESS:
            return {
                ...state,
                MrpList: action.payload.gridRowJson
            };
        case SEARCH_MRP_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default mrplist;
