import { getHistoryById } from 'api/adminApi';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CVE_DETAILS_BY_VERSION } from 'store/actions';
import BasicTable from './basicTable';

const RevisionModalContent = ({setOpen}) => {
    const cvedetails = useSelector(state => state.cve.cvedetails);
    const [tableData, setTableData] = useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        
        fetchData();

    },[]);

    const fetchData = async () => {
        const response = await getHistoryById(cvedetails.niahid);

        setTableData(response.data.data);
    }

    const onSelect = (row) => {
        dispatch({type:SET_CVE_DETAILS_BY_VERSION, 
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

export default RevisionModalContent;