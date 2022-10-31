import { useEffect, useState } from 'react';

// material-ui
import { Grid, Skeleton } from '@mui/material';

// project imports
import IndevCard from './IndevCard';
import PopularCard from './PopularCard';
import RfqCard from './RfqCard';
import QaPassCard from './QaPassCard';
import ReleaseCard from './ReleaseCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import { useSelector } from 'react-redux';
import ToggleDashboard from './ToggleDashboard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const dashboardData = useSelector((state) => state.dashboard.data);
    const dashboardType = useSelector((state) => state.dashboard.currentDashboard);

    useEffect(() => {
        if (dashboardType != 'loading') {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [dashboardType]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={6} md={8} sm={12} xs={12} margin="auto">
                        <ToggleDashboard />
                    </Grid>
                </Grid>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <IndevCard isLoading={isLoading} data={dashboardData.summary.indev} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <RfqCard isLoading={isLoading} data={dashboardData.summary.rfq} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <QaPassCard isLoading={isLoading} data={dashboardData.summary.qapass} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <ReleaseCard isLoading={isLoading} data={dashboardData.summary.release} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    {dashboardData.indev?.length > 0 ? (
                        <Grid item xs={12} sm={6} md lg>
                            <PopularCard type="indev" isLoading={isLoading} label="Indev" data={dashboardData.indev} />
                        </Grid>
                    ) : null}
                    {dashboardData.rfq?.length > 0 ? (
                        <Grid item xs={12} sm={6} md lg>
                            <PopularCard type="rfq" isLoading={isLoading} label="Ready for QA" data={dashboardData.rfq} />
                        </Grid>
                    ) : null}
                    {dashboardData.qapass?.length > 0 ? (
                        <Grid item xs={12} sm={6} md lg>
                            <PopularCard type="qapass" isLoading={isLoading} label="QA Pass" data={dashboardData.qapass} />
                        </Grid>
                    ) : null}
                    {dashboardData.release?.length > 0 ? (
                        <Grid item xs={12} sm={6} md lg>
                            <PopularCard type="release" isLoading={isLoading} label="Ready for Release" data={dashboardData.release} />
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
