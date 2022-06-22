
import config from 'config';

import axios from 'axios';



const fetchProductsApi = async(queryparam) => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await axios.get(config.baseApiHost+'api/product/list?'+queryparam);

    console.log(response);

    return response;
}

const fetchProductApi = async(data) => {
   // data.product_id = 'NIAH-ADV-NVD-sgx_dcap-intel'; // Hard coded for now

    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    
    const response = await axios.post(config.baseApiHost+'api/v1/get/product', data);

    console.log(response);

    return response;
}

const saveUpdateProduct = async(data) => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    
    const response = await axios.post(config.baseApiHost+'api/v1/update/product', data);

    console.log(response);

    return response;
}


const searchProduct = async(data) => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    
    const response = await axios.get(config.baseApiHost+'/api/product/list?'+data.queryParam);

    console.log(response);

    return response;
}


const addProduct = async(data) => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    
    const response = await axios.post(config.baseApiHost+'/api/v1/add/product', data);

    console.log(response);

    return response;
}


export {fetchProductsApi, fetchProductApi, saveUpdateProduct, searchProduct, addProduct};