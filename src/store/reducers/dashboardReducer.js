import * as actionTypes from '../actions';

const initalState = {
    currentDashboard: 'loading',
    data: {
        indev: [],
        qapass: [],
        release: [],
        rfg: [],
        summary: {}
    }
};

const dashboardReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.SET_DASHBOARD_DATA:
            return {
                ...state,
                data: action.data
            };

        case actionTypes.SET_DASHBOARD_TYPE:
            return {
                ...state,
                currentDashboard: action.data
            };

        default:
            return state;
    }
};

export default dashboardReducer;
