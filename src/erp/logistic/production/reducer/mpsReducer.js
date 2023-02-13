const SEARCH_MPS_LIST_SUCCESS = 'src/erp/logistic/Saga/SEARCH_MPS_SUCCESS';

//MPS 등록 가능한 수주 조회
export const SEARCH_MPS_AVILABLE_START = 'src/erp/logistic/production/reducer/SEARCH_MPS_AVILABLE';
export const SEARCH_MPS_AVILABLE_SUCCESS = 'src/erp/logistic/production/reducer/SEARCH_MPS_AVILABLE_SUCCESS';
export const SEARCH_MPS_AVILABLE_FAILURE = 'src/erp/logistic/production/reducer/SEARCH_MPS_AVILABLE_FAILURE';

//MPS 등록
export const MPS_REGISTER_START = '';

const initialState = {
    MrpList: [],
    ContractList: [],
    error: ''
};

const mpsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_MPS_LIST_SUCCESS:
            return {
                ...state,
                MrpList: action.payload.gridRowJson
            };
        case SEARCH_MPS_AVILABLE_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case SEARCH_MPS_AVILABLE_SUCCESS:
            return {
                ...state,
                ContractList: action.payload.gridRowJson
            };
        default:
            return state;
    }
};

export default mpsReducer;
