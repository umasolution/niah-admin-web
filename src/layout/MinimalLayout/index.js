import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// project imports
import Customization from '../Customization';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {

    const authentication = useSelector((state) => state.authentication);
    const navigate = useNavigate();

    useEffect(()=>{
        

        if(authentication.authenticated && window.location.pathname == '/niah/login'){
            navigate('/niah/main');
        }


    }, [])
    return <>
        <Outlet />
        <Customization />
    </>
}

export default MinimalLayout;
