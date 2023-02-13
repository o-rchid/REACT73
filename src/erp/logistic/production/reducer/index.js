import { combineReducers } from 'redux';
import gatherlist from 'erp/logistic/production/reducer/gatherReducer';
import mpsReducer from 'erp/logistic/production/reducer/mpsReducer';
import mrplist from 'erp/logistic/production/reducer/mrpReducer';
import mrpsimulatorlist from 'erp/logistic/production/reducer/mrpSimulatorReducer';

const ProductionReducerCombine = combineReducers({
    gatherlist,
    mpsReducer,
    mrplist,
    mrpsimulatorlist
});

export default ProductionReducerCombine;
