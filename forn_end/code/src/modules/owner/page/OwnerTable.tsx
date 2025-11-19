import React from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableSortLabel, Collapse, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useFetchOwner } from "../hook/useFetchOwner";
import type { IOwnerItem } from "../interface/Owner.interface";
import LoadingTable from "../../../shared/components/loading/LoadingTable";
import EditIcon from "../../../assets/svg/icon/Edit.svg";
import DeleteOutlinedIcon from "../../../assets/svg/icon/DeleteOutlined.svg";

import {
    createOwnerColumns,
    useOwnerSort,
    BranchDetails,
} from "../components/Table/TableOwner";
import OwnerPagination from "./OwnerPagination";
import type { ITextPopup } from '../../../shared/components/popup/PopupConfirm.interface';
import { useSetAtom, type SetStateAction } from 'jotai';
import { flashAlertAtom } from '../../../shared/components/constants/OptionsAtom';


export interface IOwnerTableProps {
    setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void;
    owner: IOwnerItem[]
    reload: () => void
    loading_owner: boolean
    total_owner: number
};

const OwnerTable: React.FunctionComponent<IOwnerTableProps> = ({
    setConfirmPopup,
    loading_owner,
    owner,
    reload,
    total_owner
}) => {
    const navigate = useNavigate();
    const setFlash = useSetAtom(flashAlertAtom);
    // const { owner, loading_owner, total_owner, reload } = useFetchOwner();
    const [openRows, setOpenRows] = React.useState<Record<string, boolean>>({});
    // sort hook (state + handler)
    const { orderBy, order, handleSort } = useOwnerSort();

    // columns จาก factory (ส่ง deps จากแม่)
    const columns = React.useMemo(
        () =>
            createOwnerColumns({
                openRows,
                setOpenRows,
                navigate,
                EditIconSrc: EditIcon,
                DeleteIconSrc: DeleteOutlinedIcon,
                setConfirmPopup,
                setFlash,
                reload
            }),
        [openRows, setOpenRows, navigate]
    );
    return (
        <Paper sx={{ width: "100%", overflow: "hidden", m: "auto" }}>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader aria-label="owners">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth, backgroundColor: 'background.paper' }}>
                                    {"sortable" in column && column.sortable ? (
                                        <TableSortLabel
                                            active={orderBy === (column.id as keyof IOwnerItem)}
                                            direction={orderBy === column.id ? order : "desc"}
                                            onClick={() => handleSort(column.id as keyof IOwnerItem)}
                                            sx={{ ".MuiTableSortLabel-icon": { opacity: 1 } }}
                                        >
                                            <Typography variant="h6" component="span">
                                                {column.label}
                                            </Typography>
                                        </TableSortLabel>
                                    ) : (
                                        <Typography variant="h6">{column.label}</Typography>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading_owner ? (
                            <TableRow>
                                {/* <LoadingDisplay /> */}
                                <TableCell colSpan={columns.length} align="center">
                                    <LoadingTable open={loading_owner} />
                                </TableCell>
                            </TableRow>
                        ) : owner?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    <Typography variant="h6">{"ไม่พบข้อมูล"}</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            owner.map((row) => (
                                <React.Fragment key={row.id}>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.render(row)}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={columns.length} sx={{ py: 0 }}>
                                            <Collapse in={openRows[row.id]} timeout="auto" unmountOnExit>
                                                <BranchDetails branches={row.branches || []} />
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <OwnerPagination total={total_owner} />
        </Paper>
    )
};

export default OwnerTable;
