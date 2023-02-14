import { combineReducers } from 'redux';
import gatherlist from 'erp/logistic/production/reducer/gatherReducer';
import mpsReducer from 'erp/logistic/production/reducer/mpsReducer';
import mrpReducer from 'erp/logistic/production/reducer/mrpReducer';
import mrpsimulatorlist from 'erp/logistic/production/reducer/mrpSimulatorReducer';

const ProductionReducerCombine = combineReducers({
    gatherlist,
    mpsReducer,
    mrpReducer,
    mrpsimulatorlist
});

export default ProductionReducerCombine;
