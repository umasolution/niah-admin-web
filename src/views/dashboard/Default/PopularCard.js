import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { MENU_OPEN, SET_PRODUCT_SEARCH_CRITERIA, SET_SEARCH_CRITERIA, SET_SELECTED_CVE, SET_SELECTED_PROUDCT } from 'store/actions';
import { fetchCVE } from 'api/cveApi';
import { fetchProductApi } from 'api/productApi';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ type, isLoading, label, data }) => {
    const theme = useTheme();

    const dashboardType = useSelector((state) => state.dashboard.currentDashboard);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleViewAll = () => {
        // Issue for the first time... dashboardType is still 'loading'
        if (dashboardType === 'CVE') {
            dispatch({ type: SET_SEARCH_CRITERIA, data: { index: 8, value: type } });
            dispatch({ type: MENU_OPEN, id: 'cve' });
            navigate('/cve', { state: { fromViewAll: true, vuln: type } });
        }
        if (dashboardType === 'Products') {
            dispatch({ type: SET_PRODUCT_SEARCH_CRITERIA, data: { index: 4, value: type } });
            dispatch({ type: MENU_OPEN, id: 'product' });
            navigate('/product', { state: { fromViewAll: true, vuln: type } });
        }
    };

    const handleClickItem = async (row) => {
        if (dashboardType === 'CVE') {
            console.log('asd...cve row: ', row);
            const cve = await fetchCVE({ niahid: row.niahid });
            dispatch({ type: MENU_OPEN, id: 'cve' });
            dispatch({ type: SET_SELECTED_CVE, data: cve.data });
            navigate('/cvedetails');
        }
        if (dashboardType === 'Products') {
            console.log('asd...product row: ', row);
            const cve = await fetchProductApi({ product_id: row.niah_product_id });
            dispatch({ type: MENU_OPEN, id: 'product' });
            dispatch({ type: SET_SELECTED_PROUDCT, data: cve.data });
            navigate('/productdetails');
        }
    };

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h3">{label}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                {data.map((vul, i) => {
                                    return (
                                        <>
                                            <Grid container direction="column" onClick={() => handleClickItem(vul)}>
                                                <Grid item>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="subtitle1" color="inherit">
                                                                {vul.id}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Avatar
                                                                variant="rounded"
                                                                sx={{
                                                                    width: 16,
                                                                    height: 16,
                                                                    borderRadius: '5px',
                                                                    backgroundColor:
                                                                        i % 2 == 0
                                                                            ? theme.palette.primary.light
                                                                            : theme.palette.secondary.light,
                                                                    color:
                                                                        i % 2 == 0
                                                                            ? theme.palette.primary.dark
                                                                            : theme.palette.secondary.dark,
                                                                    ml: 2,
                                                                    transform: 'scaleX(-1)'
                                                                }}
                                                            >
                                                                <ReplyIcon fontSize="small" color="inherit" />
                                                            </Avatar>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1" sx={{ color: 'grey.400', fontWeight: 'bold' }}>
                                                        {vul?.niahid ? vul?.niahid : vul?.niah_product_id}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ my: 1.5 }} />
                                        </>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button size="small" disableElevation onClick={handleViewAll}>
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
