import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './reducers/customizationReducer';
import authReducer from './reducers/authReducer';
import cveReducer from './reducers/cveReducer';
import ProductReducer from './reducers/productReducer';
import dashboardReducer from './reducers/dashboardReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    authentication: authReducer,
    cve: cveReducer,
    product: ProductReducer,
    dashboard: dashboardReducer
});

export default reducer;
