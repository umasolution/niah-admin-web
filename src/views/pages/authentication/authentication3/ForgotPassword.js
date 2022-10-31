import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Divider, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import { useState } from 'react';
import { resetPassword } from 'api/authApis';

// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const ForgotPassword = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const [errorMsg, setErrorMsg] = useState('');
    const [credentials, setCredentials] = useState({ username: '', password: '', newpassword: '' });

    const resetCreds = async () => {
        const response = await resetPassword(credentials.password, credentials.newpassword);

        if (response.data.status == 'fail') {
            setErrorMsg('Credentials cannot be updated !');
        } else if (response.data.status == 'ok') {
            setErrorMsg('Password has been resetted !');
        }
    };

    const onChangeCredentials = (key, value) => {
        setErrorMsg('');
        setCredentials({ ...credentials, [key]: value });
    };

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Admin Portal
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Reset your password
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                        <TextField
                                            label="Username"
                                            style={{ margin: '10px' }}
                                            value={credentials.username}
                                            onChange={(e) => onChangeCredentials('username', e.target.value)}
                                        />
                                        <TextField
                                            label="Old Password"
                                            style={{ margin: '10px' }}
                                            type="password"
                                            value={credentials.password}
                                            onChange={(e) => onChangeCredentials('password', e.target.value)}
                                        />
                                        <TextField
                                            label="New Pasword"
                                            style={{ margin: '10px' }}
                                            type="password"
                                            value={credentials.newpassword}
                                            onChange={(e) => onChangeCredentials('newpassword', e.target.value)}
                                        />
                                        <Button
                                            variant="contained"
                                            disabled={!(credentials.password != '' && credentials.newpassword != '')}
                                            onClick={resetCreds}
                                        >
                                            Reset Password
                                        </Button>
                                        <Typography variant="subtitle1" sx={{ textDecoration: 'none', color: 'red' }}>
                                            {errorMsg}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography component={Link} to="/register" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                                Don&apos;t have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default ForgotPassword;
