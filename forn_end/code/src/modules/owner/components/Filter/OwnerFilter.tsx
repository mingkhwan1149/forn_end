import React, { useCallback, type JSX } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { searchStateOwner } from "../../hook/Atom";
import { useFetchOwnerType } from "../../hook/useFetchOwner";
import type { IFilterOwnerType } from "../../interface/OwnerType.interface";

// ---- types ----
export type FilterKey = "owner_type_id" | "food_type_id" | "userType";

export const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "owner_type_id", label: "ประเภทร้านค้า" },
    { key: "food_type_id", label: "ประเภทอาหาร" },
    { key: "userType", label: "ประเภทผู้ใช้งาน" },
];

const commonSx = { width: 250, bgcolor: "white" } as const;

// ---- custom hook ที่ประกอบ hooks ภายใน แล้วคืน renderers ออกไปใช้ที่แม่ ----
// export function useOwnerFilterRenderers() {
//   const { owner_type } = useFetchOwnerType();       // ✅ hook ใช้ได้ตรงนี้
//   const [, setSearchState] = useAtom(searchStateOwner);

//   const filterRenderers = React.useMemo<
//     Record<FilterKey, (label: string) => JSX.Element>
//   >(
//     () => ({
//       owner_type_id: (label) => (
//         <Autocomplete<IFilterOwnerType>
//           options={owner_type ?? []}
//           getOptionLabel={(o) => o.name}
//           isOptionEqualToValue={(o, v) => o.id === v.id}
//           onChange={(_, v) =>
//             setSearchState((prev) => ({
//               ...prev,
//               owner_type_id: v?.id ?? "", // เก็บ id
//             }))
//           }
//           renderInput={(p) => <TextField {...p} placeholder={`${label} ทั้งหมด`} />}
//           sx={commonSx}
//         />
//       ),
//       food_type_id: (label) => (
//         <Autocomplete<IFilterOwnerType>
//           options={FoodTypeFilter}
//           getOptionLabel={(o) => o.name}
//           isOptionEqualToValue={(o, v) => o.code === v.code}
//           onChange={(_, v) =>
//             setSearchState((prev) => ({
//               ...prev,
//               food_type_id: v?.code ?? "",
//             }))
//           }
//           renderInput={(p) => <TextField {...p} placeholder={`${label} ทั้งหมด`} />}
//           sx={commonSx}
//         />
//       ),
//       userType: (label) => (
//         <Autocomplete<IFilterOwnerType>
//           options={UserTypeFilter}
//           onChange={(_, v) =>
//             setSearchState((prev) => ({
//               ...prev,
//               userType: v ?? "",
//             }))
//           }
//           renderInput={(p) => <TextField {...p} placeholder={`${label} ทั้งหมด`} />}
//           sx={commonSx}
//         />
//       ),
//     }),
//     [owner_type, setSearchState]
//   );

//   const renderBox = React.useCallback(
//     (f: { key: FilterKey; label: string }) => (
//       <Box key={f.key}>{filterRenderers[f.key](f.label)}</Box>
//     ),
//     [filterRenderers]
//   );

//   return { FILTERS, renderBox };
// }


// components/Filter/OwnerFilter.tsx
export function useOwnerFilterRenderers() {
    const { owner_type, food_type, user_type } = useFetchOwnerType();
    const [, setSearchState] = useAtom(searchStateOwner);

    const FILTERS: { key: "owner_type_id" | "food_type_id" | "user_type_id"; label: string }[] = [
        { key: "owner_type_id", label: "ประเภทร้านค้า" },
        { key: "food_type_id", label: "ประเภทอาหาร" },
        { key: "user_type_id", label: "ประเภทผู้ใช้งาน" },
    ];
    const commonSx = { width: "100%", bgcolor: "white" } as const;

    const renderBox = useCallback((f: { key: typeof FILTERS[number]["key"]; label: string }) => {
        if (f.key === "owner_type_id") {
            return (
                <Autocomplete<IFilterOwnerType>
                    options={owner_type}
                    getOptionLabel={(o) => o.name}
                    isOptionEqualToValue={(o, v) => o.id === v.id}
                    onChange={(_, v) => setSearchState(p => ({ ...p, owner_type_id: v?.id ?? "" }))}
                    renderInput={(p) => <TextField {...p} placeholder={`${f.label} ทั้งหมด`} />}
                    sx={commonSx}
                />
            );
        }
        if (f.key === "food_type_id") {
            return (
                <Autocomplete<IFilterOwnerType>
                    options={food_type}
                    getOptionLabel={(o) => o.name}
                    isOptionEqualToValue={(o, v) => o.id === v.id}
                    onChange={(_, v) => setSearchState(p => ({ ...p, food_type_id: v?.id ?? "" }))}
                    renderInput={(p) => <TextField {...p} placeholder={`${f.label} ทั้งหมด`} />}
                    sx={commonSx}
                />
            );
        }
        return (
            <Autocomplete<IFilterOwnerType>
                options={user_type}
                getOptionLabel={(o) => o.name}
                isOptionEqualToValue={(o, v) => o.id === v.id}
                onChange={(_, v) => setSearchState(p => ({ ...p, user_type_id: v?.id ?? "" }))}
                renderInput={(p) => <TextField {...p} placeholder={`${f.label} ทั้งหมด`} />}
                sx={commonSx}
            />
        );
    }, [owner_type, food_type, user_type, setSearchState]);

    return { FILTERS, renderBox };
}