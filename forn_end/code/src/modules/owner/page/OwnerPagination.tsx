import { Stack, Pagination, PaginationItem, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { searchStateOwner } from "../hook/Atom";

// 👉 import ไอคอน SVG
import ArrowBackIcon from "../../../assets/svg/icon/arrow_back_icon.svg";
import ArrowForwardIcon from "../../../assets/svg/icon/arrow_forward_icon.svg";

type Props = {
    total: number; // total_owner
};

export default function OwnerPagination({ total }: Props) {
    const [search, setSearch] = useAtom(searchStateOwner);

    const pageCount = Math.max(1, Math.ceil(total / search.limit));
    const page = search.page;

    const goPage = (p: number) => {
        setSearch((prev) => ({ ...prev, page: p }));
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            spacing={2}
            sx={{
                py: 1,
                "& .MuiPaginationItem-root.Mui-selected": {
                    color: "#000",
                    borderRadius: 1.5,
                },
            }}
        >
            <Pagination
                count={pageCount}
                page={page}
                onChange={(_, p) => goPage(p)}
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        slots={{
                            previous: () => (
                                <>
                                    <img
                                        src={ArrowBackIcon}
                                        alt="ก่อนหน้า"
                                        style={{ marginRight: 4 }}
                                    />
                                    <Typography>
                                        {'ก่อนหน้า'}
                                    </Typography>
                                </>
                            ),
                            next: () => (
                                <>
                                    <Typography>
                                        {'ถัดไป'}
                                    </Typography>
                                    <img
                                        src={ArrowForwardIcon}
                                        alt="ถัดไป"
                                        style={{ marginLeft: 4 }}
                                    />
                                </>
                            ),
                        }}
                    />
                )}
            />
        </Stack>
    );
}