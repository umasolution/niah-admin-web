import { useEffect, useState } from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTheme } from '@emotion/react';
import { Card, styled } from '@mui/material';
import { fetchDashboardCVEData, fetchDashboardProductsData } from 'api/dashboardApi';
import { SET_DASHBOARD_DATA, SET_DASHBOARD_TYPE } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';

const ToggleButton = styled(MuiToggleButton)(({ selectedcolor }) => ({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: 'white',
        backgroundColor: selectedcolor
    },
    '&.MuiToggleButton-root': {
        padding: 2
    }
}));

export default function ToggleDashboard() {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [dashboardType, setDashboardType] = useState('CVE');

    const currentDashboard = useSelector((state) => state.dashboard.currentDashboard);

    const handleDashboardType = (event, newType) => {
        setDashboardType(newType);
        dispatch({ type: SET_DASHBOARD_TYPE, data: 'loading' });
        if (newType === 'Products') {
            fetchDashboardProducts(newType);
        } else {
            fetchDashboardCVES(newType);
        }
    };

    useEffect(() => {
        fetchDashboardCVES();
    }, []);

    const fetchDashboardCVES = async (type) => {
        const resp = await fetchDashboardCVEData();
        dispatch({ type: SET_DASHBOARD_TYPE, data: type });
        dispatch({ type: SET_DASHBOARD_DATA, data: resp?.data });
    };

    const fetchDashboardProducts = async (type) => {
        const resp = await fetchDashboardProductsData();
        dispatch({ type: SET_DASHBOARD_TYPE, data: type });
        dispatch({ type: SET_DASHBOARD_DATA, data: resp?.data });
    };

    return (
        <ToggleButtonGroup
            exclusive
            value={dashboardType}
            onChange={handleDashboardType}
            aria-label="text dashboardType"
            sx={{
                mb: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                boxShadow: 6
            }}
            disabled={currentDashboard === 'loading'}
        >
            <ToggleButton
                value="CVE"
                aria-label="left aligned"
                selectedcolor={theme.palette.secondary.dark}
                disabled={dashboardType === 'CVE'}
                fullWidth="true"
                style={{ fontSize: 18, minWidth: '50%' }}
            >
                <b>CVE</b>
            </ToggleButton>
            <ToggleButton
                value="Products"
                aria-label="centered"
                selectedcolor={theme.palette.primary.dark}
                disabled={dashboardType === 'Products'}
                fullWidth="true"
                style={{ fontSize: 18, minWidth: '50%' }}
            >
                <b>Products</b>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
