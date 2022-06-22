
import config from 'config';

import axios from 'axios';



const updateHistory = async(data) => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await axios.post(config.baseApiHost+'api/history', data);

    console.log(response);

    return response;
}

const getHistoryById = async(data) => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await axios.get(config.baseApiHost+'api/findById?id='+data);

    console.log(response);

    return response;
}





export {updateHistory,getHistoryById};