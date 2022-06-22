import react, { useEffect, useState } from 'react';
// material-ui
import { Button, LinearProgress, Pagination, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import {fetchProductsApi,fetchProductApi} from '../../api/productApi';
import BasicTable from 'views/cve/basicTable';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PRODUCT, SET_PRODUCT_DATA, SET_SELECTED_PROUDCT } from 'store/actions';
import { useNavigate } from 'react-router';
import cvedetail from 'store/data/cvedetailsdata';
import SearchBar from 'views/search';
import { getHistoryById, updateHistory } from 'api/adminApi';

// ==============================|| SAMPLE PAGE ||============================== //

const Product = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const product = useSelector(state=>state.product);
    const [isLoading, setLoading] = useState(false);
    const username = useSelector(state => state.authentication.username);

    
    const [pageIndex, setPageIndex] = useState(1);

    const [rowLimit, setRowLimit] = useState(50);

    const [total, setTotal] = useState(1000);

    useEffect(() => {
        setLoading(true);
        fetchProducts();
    },[])

    const fetchProducts = async(queryparam)=>{
        const resp = await fetchProductsApi(queryparam);
        setLoading(false);
        dispatch({type:SET_PRODUCT_DATA, data:resp.data})
    }

    const onEdit = async(row) => {
       setLoading(true);

       const cve = await fetchProductApi({product_id:row.niah_product_id});

       const zeroAvailable = updateZerothVersionIfNot(row)

       setLoading(false);

       dispatch({type:SET_SELECTED_PROUDCT, data:cve.data})
       
       
       navigate('/niah/main/productdetails');
    }

    

    const updateZerothVersionIfNot = async(productDetails) => {
        let response = await getHistoryById(productDetails.niah_product_id);

        if(response.data.data.length == 0){
            return await updateHistory({
                                          
                                            type : 'Product', 
                                            id : productDetails.niah_product_id, 
                                            status : productDetails.vuln_status == null ? 'base' :  productDetails.vuln_status, 
                                            lastupdated : new Date(), 
                                            revision : 0
                                    });
           
        }else{
            return "zero available"
        }
    }

    const addProduct = () => {
        dispatch({type: ADD_PRODUCT});
        navigate('/niah/main/addproduct');
    }

    const onPaginate = (event, value) => {
        setLoading(true);
        const offset = (value*50)+1;
        fetchProducts('offset='+offset+'&limit=50')
    }

    const handlPageChange = (event, value) => {
        onPaginate(event, value);
        setPageIndex(value);
      }

    return (
        <MainCard title="Products">
            <SearchBar data={product.searchCriteria} type='product' setLoading = {setLoading}/>
            <Button variant ='contained' style={{margin:'3px'}} onClick= {addProduct}>Add Product</Button>
            {
                isLoading ? <LinearProgress style={{ margin: "15px", width: "100%" }} /> :
                <BasicTable columns = {product.columns} rows={product.rows} title="Vulnerabilities" onEdit = {onEdit}/>
            }

            <Pagination style = {{float : 'right'}} 
                        count = {total} 
                        page = {pageIndex} 
                        rowsPerPage = {rowLimit}
                        onChange={handlPageChange} />
           
        </MainCard>
    )

};

export default Product;
