import React, { useCallback, useState } from 'react';
import { Box, Button, Card, Checkbox, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import * as R from 'ramda';
import { Navigate } from 'react-router';
import { AppRoutes } from '../../../router/router';
import { useAuth } from '../hook/useAuth';
import { styled } from '@mui/styles';
import Logo from '../../../assets/image/LogoSg.png'
import type { ILoginAdminBody } from '../interface/Login.interface';
import { useForm } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export interface ILoginPageProps { }


const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
    const { getAuthToken, handleLogin } = useAuth();
    // const {
    //     register,
    //     handleSubmit,
    //     getValues,
    //     setValue
    // } = useForm<ILoginAdminBody>()

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = useCallback(() => setShowPassword((v) => !v), []);

    if (R.isNotEmpty(getAuthToken())) {
        return <Navigate to={AppRoutes.default} replace />;
    }

    return (
        <Container
            maxWidth="xs"
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
                // border: '1px solid green'
            }}
        >
            <Grid
                container
                gap={2}
                sx={{
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '2px 3px 5px 2px rgba(188, 188, 188 )'
                }}
            >
                <Grid container sx={{ justifyContent: 'center' }}>
                    <img width={'300'} src={Logo} />
                </Grid>
                <Typography sx={{ fontSize: 18 }}>
                    Please log in to continue
                </Typography>
                <form onSubmit={handleLogin}>
                    <Grid container gap={2}>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                {/* <TextField
                                    value={getValues('username') || ''}
                                    onChange={(e) => setValue('username', e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    label="Username"
                                /> */}
                            </Grid>
                            <Grid size={12}>
                                {/* <TextField
                                    label="รหัสผ่าน (Password)"
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={toggleShowPassword} edge="end" aria-label="toggle password visibility">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                minLength: 8,
                                                type: showPassword ? 'text' : 'password',
                                            },
                                        },
                                    }}
                                    value={getValues('password') || ''}
                                    onChange={(e) => setValue('password', e.target.value)}
                                /> */}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            <Typography fontSize={18}>Log in</Typography>
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Container>
    );
};

export default LoginPage;
