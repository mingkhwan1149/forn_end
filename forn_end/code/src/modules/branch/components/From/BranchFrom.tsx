import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { TextPopupDefault, type ITextPopup } from '../../../../shared/components/popup/PopupConfirm.interface';
import { useBranchsFromFetch } from '../../hook/useFetchBranch';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { handleErrorSubmit, onClickDeleteBranch, onSubmitBranch } from '../../hook/handleFunction';
import DetailBranch from './DetailBranch';
import AddressBranch from './AddressBranch';
import LoadingDisplayLast from '../../../../shared/components/loading/LoadingDisplayLast';
import UserBranch from './UserBranch';
import { useModalHeader } from '../../../../shared/components/layouts/ModalHeaderContext';
import { useAtom, useSetAtom } from 'jotai';
import { OwnerState } from '../../../owner/hook/Atom';
import { confirmPopupAtom, flashAlertAtom } from '../../../../shared/components/constants/OptionsAtom';

export interface IBranchFromProps { };

const BranchFrom: React.FunctionComponent<IBranchFromProps> = props => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate()
    const [owner, setOwner] = useAtom(OwnerState);
    const setFlash = useSetAtom(flashAlertAtom);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const { setTitle, setActions } = useModalHeader();
    const {
        handleSubmit,
        setValue,
        watch,
        getValues,
        errors,
        loading,
        actype,
        setError,
        clearErrors
    } = useBranchsFromFetch(id ?? "0");

    const headerButtons = useMemo(() => {
        // ✅ เงื่อนไขสำหรับ create
        if (actype === "create") {
            const buttons = [
                <Button
                    key="submit"
                    type="submit"
                    form="branch-from"
                    variant="contained"
                >
                    <Typography variant="button">{"บันทึก"}</Typography>
                </Button>,
                <Button
                    key="cancel"
                    variant="contained"
                    color="warning"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <Typography variant="button">{"ยกเลิก"}</Typography>
                </Button>,
            ];

            // ✅ ถ้า id เป็น temp ให้เพิ่มปุ่มลบ
            if (id?.startsWith("tmp_")) {
                buttons.push(
                    <Button
                        key="delete"
                        variant="contained"
                        color="error"
                        onClick={() =>
                            onClickDeleteBranch({
                                getValues,
                                navigate,
                                id,
                                setOwner,
                                owner,
                                setFlash,
                                setConfirmPopup
                            })
                        }
                    >
                        <Typography variant="button">{"ลบ"}</Typography>
                    </Button>
                );
            }
            return buttons;
        }

        // ✅ เงื่อนไขสำหรับ edit ปกติ (id จริง)
        if (actype === "edit") {
            return [

                <Button
                    key="submit"
                    type="submit"
                    form="branch-from"
                    variant="contained"
                >
                    <Typography variant="button">{"บันทึกการแก้ไข"}</Typography>
                </Button>,
                <Button
                    key="cancel"
                    variant="contained"
                    color="warning"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <Typography variant="button">{"ยกเลิก"}</Typography>
                </Button>,
                <Button
                    key="delete"
                    variant="contained"
                    color="error"
                    onClick={() =>
                        onClickDeleteBranch({
                            setConfirmPopup,
                            getValues,
                            navigate,
                            id,
                            setOwner,
                            owner,
                            setFlash
                        })
                    }
                >
                    <Typography variant="button">{"ลบสาขา"}</Typography>
                </Button>,
            ];
        }

        return [];
    }, [actype, id, navigate, setOwner]);

    useEffect(() => {
        setActions(headerButtons);
    }, [setTitle, setActions, headerButtons]);

    const firstFieldRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        firstFieldRef.current?.focus();
        // กันทุกเคส: ขึ้นไปบนสุดด้วย
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, []);

    // 🔥 ตรงนี้คือจุดแสดง Loading ก่อนข้อมูลมาครบ
    if (loading) {
        return (
            <>
                <LoadingDisplayLast loading={loading} />
            </>
        );
    }
    return (
        <>
            {/* <PopupConfirm open={dataSubmitted} popupValue={textPopup} /> */}
            <form
                id='branch-from'
                onSubmit={handleSubmit(
                    () => onSubmitBranch({
                        getValues,
                        navigate,
                        id,
                        setOwner,
                        owner,
                        setFlash,
                        setConfirmPopup
                    }),
                    handleErrorSubmit
                )}
            >
                <Stack spacing={1}>
                    <DetailBranch
                        getValues={getValues}
                        setValue={setValue}
                        watch={watch}
                        errors={errors}
                        actype={actype}
                    />
                    <Divider
                        sx={{
                            backgroundColor: 'var(--Schemes-Outline-Variant, #C0C8CB)',
                            height: '4px', // ความหนา
                        }}
                    />
                    <AddressBranch
                        getValues={getValues}
                        setValue={setValue}
                        watch={watch}
                        errors={errors}
                        actype={actype}
                    />

                    <Divider
                        sx={{
                            backgroundColor: 'var(--Schemes-Outline-Variant, #C0C8CB)',
                            height: '4px', // ความหนา
                        }}
                    />

                    <UserBranch
                        getValues={getValues}
                        setValue={setValue}
                        watch={watch}
                        errors={errors}
                        actype={actype}
                        setError={setError}
                        clearErrors={clearErrors}
                    />



                    {/* <Button type="submit" variant="outlined">
                        บันทึก
                    </Button> */}
                </Stack>
            </form>
        </>
    )
};

export default BranchFrom;