import config from 'config';

import axios from 'axios';

const fetchDashboardCVEData = async () => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await axios.get(config.baseApiHost + '/api/v1/dashboard/vuln');

    console.log(response);

    return response;
};

const fetchDashboardProductsData = async () => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await axios.get(config.baseApiHost + '/api/v1/dashboard/product');

    console.log(response);

    return response;
};

export { fetchDashboardCVEData, fetchDashboardProductsData };
