import { getHistoryById } from 'api/adminApi';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_UPDATED_PRODUCT_DETAIL_VERSION, SET_PRODUCT_DETAILS_BY_VERSION } from 'store/actions';
import BasicTable from 'views/cve/basicTable';


const ProductRevisionModalContent = ({setOpen}) => {
    const productDetails = useSelector(state => state.product.productDetails);
    const [tableData, setTableData] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        
        fetchData();

    },[]);

    const fetchData = async () => {
        const response = await getHistoryById(productDetails.niah_product_id);

        setTableData(response.data.data);
    }

    const onSelect = (row) => {
        
        dispatch({type:SET_PRODUCT_DETAILS_BY_VERSION, 
            data:row.revision});

        setOpen(false);
       
    }

    const columns = [{field:"username",title:"User"},
                     {field:"revision",title:"Revision"},
                    {field:"type",title:"Type"},
                    {field:"id",title:"Niah Id"},
                    {field:"status",title:"Status"},
                    {field:"lastupdated",title:"Last Updated"},
                   
                                        ];
    return (
        <BasicTable columns = {columns} rows={tableData} title="Vulnerabilities" onSelect = {onSelect} />  
    )
}

export default ProductRevisionModalContent;