
import config from 'config';

import axios from 'axios';



const fetchCVEs = async(queryParam) => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await axios.get(config.baseApiHost+'api/vuln/list?'+queryParam);

    console.log(response);

    return response;
}

const fetchCVE = async(data) => {
   // data.cve_id = 'CVE-2021-0004'; // Hard coded for now

    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    
    const response = await axios.post(config.baseApiHost+'api/v1/get/cve', data);

    console.log(response);

    return response;
}

const saveUpdateCVE = async(data) => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;

    const response = await axios.post(config.baseApiHost+'api/v1/update/cve', data);

    console.log(response);

    return response;
}

const searchCVE = async(data) => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    
    const response = await axios.get(config.baseApiHost+'/api/vuln/list?'+data.queryParam);

    console.log(response);

    return response;
}

const addCVE = async(data) => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    
    const response = await axios.post(config.baseApiHost+'/api/v1/add/cve', data);

    console.log(response);

    return response;
}


export {fetchCVEs, fetchCVE, saveUpdateCVE, searchCVE, addCVE};