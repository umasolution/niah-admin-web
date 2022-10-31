import react, { useEffect, useState } from 'react';
// material-ui
import { Button, LinearProgress, Pagination, PaginationItem, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { fetchCVEs, fetchCVE } from '../../api/cveApi';
import BasicTable from './basicTable';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_NEW_CVE, SET_CVE_DATA, SET_SELECTED_CVE } from 'store/actions';
import { useLocation, useNavigate } from 'react-router';
import cvedetail from 'store/data/cvedetailsdata';
import SearchBar from 'views/search';
import { getHistoryById, updateHistory } from 'api/adminApi';

const CVE = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cve = useSelector((state) => state.cve);
    const username = useSelector((state) => state.authentication.username);

    const [pageIndex, setPageIndex] = useState(1);

    const [isLoading, setLoading] = useState(false);

    const [rowLimit, setRowLimit] = useState(50);

    const [total, setTotal] = useState(1000);

    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        if (!location?.state?.fromViewAll) {
            fetchCVES();
        }
    }, []);

    const fetchCVES = async (queryparams = '') => {
        const resp = await fetchCVEs(queryparams);
        setLoading(false);
        setTotal(resp?.data?.total);
        setRowLimit(resp?.data?.rowlimit);
        dispatch({ type: SET_CVE_DATA, data: resp?.data });
    };

    const onEdit = async (row) => {
        setLoading(true);

        console.log('asd', row.data_id);
        const cve = await fetchCVE({ cve_id: row.data_id });

        const zeroAvailable = updateZerothVersionIfNot(row);

        setLoading(false);

        dispatch({ type: SET_SELECTED_CVE, data: cve.data });

        navigate('/cvedetails');
    };

    const updateZerothVersionIfNot = async (cveDetails) => {
        let response = await getHistoryById(cveDetails.niahid);

        if (response.data.data.length == 0) {
            return await updateHistory({
                type: 'CVE',
                id: cveDetails.niahid,
                status: cveDetails.vuln_status == null ? 'base' : cveDetails.vuln_status,
                lastupdated: new Date(),
                revision: 0
            });
        } else {
            return 'zero available';
        }
    };

    const onAddCVE = () => {
        dispatch({ type: ADD_NEW_CVE });
        navigate('/addcve');
    };

    const onPaginate = (event, value) => {
        setLoading(true);
        const offset = value * 50 + 1;
        fetchCVES('offset=' + offset + '&limit=50');
    };

    const handlPageChange = (event, value) => {
        onPaginate(event, value);
        setPageIndex(value);
    };

    return (
        <MainCard title="Vulnerabilities">
            <SearchBar
                data={cve.searchCriteria}
                type="cve"
                setLoading={setLoading}
                setTotal={setTotal}
                isFromViewAll={location?.state?.fromViewAll}
            />

            <Button variant="contained" style={{ margin: '3px' }} onClick={onAddCVE}>
                Add CVE
            </Button>

            {isLoading ? (
                <LinearProgress style={{ margin: '15px', width: '100%' }} />
            ) : (
                <BasicTable columns={cve.columns} rows={cve.rows} title="Vulnerabilities" onEdit={onEdit} />
            )}

            <Pagination style={{ float: 'right' }} count={total} page={pageIndex} rowsPerPage={rowLimit} onChange={handlPageChange} />
        </MainCard>
    );
};

export default CVE;
