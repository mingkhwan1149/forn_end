import { Box, Button, Grid, Grow, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SearchOrder from '../../../shared/components/search/SearchOrder';
import { useNavigate } from 'react-router-dom';
import { handleCreate, useHandleChangeSearch } from '../hook/handleFunction';
import { useAtom } from 'jotai';
import { searchStateOwner } from '../hook/Atom';
import DownloadIcon from '../../../assets/svg/icon/download.svg'
import ArrowDownloadIcon from '../../../assets/svg/icon/arrow_download.svg'
import { NumericFormat } from 'react-number-format';
import OwnerTable from './OwnerTable';
import { useFetchOwner } from '../hook/useFetchOwner';
import { useOwnerFilterRenderers } from '../components/Filter/OwnerFilter';
import { TextPopupDefault, type ITextPopup } from '../../../shared/components/popup/PopupConfirm.interface';
import { confirmPopupAtom } from '../../../shared/components/constants/OptionsAtom';
import LoadingDisplayLast from '../../../shared/components/loading/LoadingDisplayLast';
export interface IOwnerListPageProps { };

const OwnerListPage: React.FunctionComponent<IOwnerListPageProps> = props => {
    const navigate = useNavigate()
    const [searchState] = useAtom(searchStateOwner);
    const [, setConfirmPopup] = useAtom(confirmPopupAtom);
    const [showAll, setShowAll] = useState(false);
    const { owner, total_owner, loading_owner, reload } = useFetchOwner();
    const { FILTERS, renderBox } = useOwnerFilterRenderers();
    const { handleChangeSearch } = useHandleChangeSearch(800);
    const [dataSubmitted, setDataSubmitted] = useState(false);
    const [textPopup, setTextPopup] = useState<ITextPopup>(TextPopupDefault);
    const [isLoadData, setIsLoadData] = useState(false);
    if (isLoadData) {
        return (
            <>
                <LoadingDisplayLast loading={isLoadData} />
            </>
        );
    }
    return (
        <>
            <Box sx={{ mb: 2 }}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    alignItems={'center'}
                >
                    {/* หัวข้อ */}
                    <Typography variant="h5" sx={{ flexShrink: 0 }}>
                        {"บัญชีผู้ใช้งาน "}
                        <NumericFormat value={total_owner} displayType="text" thousandSeparator />
                        {" รายการ"}
                    </Typography>

                    {/* กลุ่มปุ่ม */}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            width: { xs: "100%", md: "auto" },
                            ml: { md: 2 },
                        }}
                        alignItems="center"
                    >
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleCreate(navigate)}>
                            <Typography variant='button'>
                                {"สร้างบัญชี"}
                            </Typography>
                        </Button>

                        <Button variant="contained" sx={{ bgcolor: '#FAFAFA' }} onClick={() => handleCreate(navigate)}>
                            <img src={DownloadIcon} />
                        </Button>
                    </Stack>
                </Stack>
            </Box>
            <Grid container marginTop={2} >
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
                    <SearchOrder searchValue={searchState.owner_search} handleChangeSearch={(e: any) => {
                        const sear = e.target.value;
                        console.log('SearchOrder', sear)
                        handleChangeSearch(sear); // ✅ ใช้งานแบบเดิม
                    }} />
                </Grid>
            </Grid>
            <Grid container marginTop={2} sx={{ mt: 2 }} spacing={1}>
                {FILTERS.map((f, idx) => (
                    <Grid
                        size={{ xs: 12, sm: 12, md: 4 }}
                        key={f.key}
                    >
                        {renderBox(f)}
                    </Grid>
                ))}
            </Grid>
            <Grid container marginTop={2}>
                <OwnerTable
                    owner={owner}
                    loading_owner={loading_owner}
                    setConfirmPopup={setConfirmPopup}
                    reload={reload}
                    total_owner={total_owner}
                />
            </Grid>
        </>
    )
};

export default OwnerListPage;