import { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { AutoFixHighOutlined } from '@mui/icons-material';
import AddProduct from 'views/product/addProduct';
import AddNewCVE from 'views/cve/addNewCVE';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const CVE = Loadable(lazy(() => import('views/cve')));
const CVEDetail = Loadable(lazy(() => import('views/cve/cveDetails')));

const Product = Loadable(lazy(() => import('views/product')));
const ProductDetail = Loadable(lazy(() => import('views/product/productDetail')));

// ==============================|| MAIN ROUTING ||============================== //

const ProtectedRoutes = () => {
    const authentication = useSelector((state) => state.authentication);

    return authentication.authenticated ? MainRoutes : ErrorRoute;
};

const ErrorRoute = {
    path: '/error',
    element: <AuthLogin3 />
};

const MainRoutes = {
    path: '',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },
        {
            path: '/utils/util-typography',
            element: <UtilsTypography />
        },
        {
            path: '/utils/util-color',
            element: <UtilsColor />
        },
        {
            path: '/utils/util-shadow',
            element: <UtilsShadow />
        },
        {
            path: '/icons/tabler-icons',
            element: <UtilsTablerIcons />
        },
        {
            path: '/icons/material-icons',
            element: <UtilsMaterialIcons />
        },
        {
            path: '/cve',
            element: <CVE />
        },
        {
            path: '/cvedetails',
            element: <CVEDetail />
        },
        {
            path: '/product',
            element: <Product />
        },
        {
            path: '/productdetails',
            element: <ProductDetail />
        },
        {
            path: '/addproduct',
            element: <AddProduct />
        },
        {
            path: '/addcve',
            element: <AddNewCVE />
        }
    ]
};

export default MainRoutes;
