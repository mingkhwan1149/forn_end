import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import type { FieldErrors, UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import type { IOwnerItem } from '../../interface/Owner.interface';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ENUM } from '../../../../shared/components/Enum';
import { useCheckEmail, usePasswordFields } from '../../hook/handleFunction';
import PasswordOwner from '../Password/PasswordOwner';

export interface IUserOwnerProps {
    getValues: UseFormGetValues<IOwnerItem>
    setValue: UseFormSetValue<IOwnerItem>;
    errors: FieldErrors<IOwnerItem>;
    watch: UseFormWatch<IOwnerItem>;
    setError: UseFormSetError<IOwnerItem>
    clearErrors: UseFormClearErrors<IOwnerItem>
    actype: string;
};

const UserOwner: React.FunctionComponent<IUserOwnerProps> = ({
    getValues,
    setValue,
    errors,
    actype,
    setError,
    clearErrors
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // ✅ ใช้ hook เช็คอีเมลแบบ debounce
    const { checkEmail, isCheckingEmail } = useCheckEmail(setValue, setError, clearErrors, 800);
    // ✅ ใช้ hook รหัสผ่าน (ย้ายออกจากคอมโพเนนต์แล้ว)
    const {
        showPassword,
        showConfirmPassword,
        passwordError,
        passwordConfirmError,
        toggleShowPassword,
        toggleShowConfirm,
        handlePasswordChange,
    } = usePasswordFields(getValues, setValue, 8);

    return (
        <>
            <PasswordOwner getValues={getValues} setValue={setValue} isOpen={isOpen} setIsOpen={setIsOpen} />
            <Grid container spacing={2} p={4}>
                <Grid size={12}>
                    <Typography variant='h5'>{'ข้อมูลร้านค้า'}</Typography>
                </Grid>
                <Grid size={12}>
                    <Stack direction="row" spacing={1} >
                        <TextField
                            label="อีเมล"
                            fullWidth
                            value={getValues('email') || ''}
                            onChange={(e) => {
                                const v = e.target.value;
                                setValue('email', v);
                                checkEmail(v);
                            }}
                            error={!!errors?.email}
                            helperText={errors?.email?.message || ' '}
                            slotProps={{
                                input: {
                                    endAdornment: isCheckingEmail ? (
                                        <InputAdornment position="end">
                                            <CircularProgress size={16} />
                                        </InputAdornment>
                                    ) : undefined,
                                }
                            }}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }} >
                        {actype === 'create' ? (
                            <>
                                <TextField
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
                                        formHelperText: {
                                            // ถ้าต้องการปรับสไตล์ helper text
                                            // sx: { color: 'text.secondary' }
                                        },
                                    }}
                                    // ถ้าคุณมี error state ภายนอก
                                    error={passwordError || !!errors?.password}
                                    helperText={
                                        errors?.password?.message // ถ้า zod มี error จะใช้ข้อความนี้ก่อน
                                            ? errors.password.message
                                            : passwordError // ถ้าไม่มี error จาก zod แต่ state error ภายในเป็น true
                                                ? "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
                                                : " "
                                    }
                                    value={getValues('password') || ''}
                                    onChange={(e) => handlePasswordChange('password', e.target.value)}
                                />

                                <TextField
                                    label="ยืนยันรหัสผ่าน (Confirm Password)"
                                    fullWidth
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={toggleShowConfirm} edge="end" aria-label="toggle confirm password visibility">
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            inputProps: {
                                                minLength: 8,
                                                type: showConfirmPassword ? 'text' : 'password',
                                            },
                                        },
                                    }}
                                    error={passwordConfirmError || !!errors?.confirm_password}
                                    helperText={
                                        errors?.confirm_password?.message // ถ้า zod มี error จะใช้ข้อความนี้ก่อน
                                            ? errors.confirm_password.message
                                            : passwordConfirmError // ถ้าไม่มี error จาก zod แต่ state error ภายในเป็น true
                                                ? "รหัสผ่านไม่ตรงกัน"
                                                : " "
                                    }
                                    value={getValues('confirm_password') || ''}
                                    onChange={(e) => handlePasswordChange('confirm_password', e.target.value)}
                                />
                            </>
                        ) : (
                            <>
                                <Stack >
                                    <Typography variant='subtitle1' sx={{ mb: 1, mt: 1 }}>
                                        {'รหัสผ่าน (Password) '}
                                    </Typography>
                                    <Button variant="contained" onClick={() => setIsOpen(true)}>
                                        {'เปลี่ยนรหัสผ่าน'}
                                    </Button>
                                </Stack>
                            </>
                        )}
                    </Stack>
                    <Stack marginTop={1} >
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label"> <Typography variant='subtitle1' sx={{ mb: 1, mt: 1 }}>
                                {'สถานะการใช้งาน'}
                            </Typography></FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={getValues("active_type")}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    const act = event.target.value;
                                    setValue("active_type", Number(act));
                                }}
                            >
                                {ENUM.OPTION_ACTIVE.map((ac: any) => (
                                    <FormControlLabel
                                        key={ac.value}
                                        value={ac.value}
                                        control={<Radio />}
                                        label={
                                            <Typography variant='h6'>
                                                {ac.label}
                                            </Typography>
                                        }
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        {/* <Typography variant='subtitle1' sx={{ mb: 1, mt: 1 }}>
                            {'สถานะการใช้งาน'}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="อีเมล"
                                fullWidth
                                value={getValues('email') || ''}
                                onChange={(e) => setValue('email', e.target.value)}
                                error={!!errors?.email}
                                helperText={errors?.email?.message || ''}
                            />
                        </Stack> */}
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
};

export default UserOwner;