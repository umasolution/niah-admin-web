import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './reducers/customizationReducer';
import authReducer from './reducers/authReducer';
import cveReducer from './reducers/cveReducer';
import ProductReducer from './reducers/productReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    authentication : authReducer,
    cve : cveReducer,
    product : ProductReducer
});

export default reducer;
