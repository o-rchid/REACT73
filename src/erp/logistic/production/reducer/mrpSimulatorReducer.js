//MRP 모의전개
export const MRPSIMULATOR_START = 'src/erp/logistic/production/reducer/MRPSIMULATOR';
export const MRPSIMULATOR_SUCCESS = 'src/erp/logistic/production/reducer/MRPSIMULATOR_SUCCESS';
export const MRPSIMULATOR_FAILURE = 'src/erp/logistic/production/reducer/MRPSIMULATOR_FAILURE';

const initialState = {
    MrpSimulatorList: []
};

const mrpsimulatorlist = (state = initialState, action) => {
    switch (action.type) {
        case MRPSIMULATOR_SUCCESS:
            return {
                ...state,
                MrpSimulatorList: action.payload.gridRowJson
            };
        case MRPSIMULATOR_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default mrpsimulatorlist;
