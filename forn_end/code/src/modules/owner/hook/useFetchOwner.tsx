import { useEffect, useState } from "react";
import { getAllOwner, getFoodOwnerType, getOwnerByOne, getOwnerType, getUserOwnerType } from "../service/OwnerApi";
import { useAtom } from "jotai";
import { OwnerState, searchStateOwner } from "./Atom";
import { IOwnerItemDefault, type IOwnerItem } from "../interface/Owner.interface";
import * as R from 'ramda';
import Swal from "sweetalert2";
import type { IFilterOwnerType } from "../interface/OwnerType.interface";
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { OwnerZod } from "../../../shared/components/FieldValidation";
import { EnumFileNameExcel, EnumSheetNameExcel } from "../../../shared/components/Enum";
import dayjs from "dayjs";
import { Workbook } from "exceljs";
import { HeaderExcelOwner } from "../../../shared/components/HeaderExcelShare";

// export const useFetchOwner = () => {
//     const [searchState] = useAtom(searchStateOwner);
//     const [owner, setOwner] = useState<IOwnerItem[]>([]);
//     const [loading_owner, setLoading_owner] = useState(true);
//     const [total_owner, setTotal_owner] = useState<number>(0)

//     useEffect(() => {

//         (async () => {
//             let res = await getAllOwner(searchState)
//             console.log('res', res);
//             if (R.isEmpty(res) || R.isNil(res)) {
//                 await Swal.fire({
//                     title: `ไม่พบข้อมูล`,
//                     text: `เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข`,
//                     icon: 'warning',
//                     confirmButtonColor: '#3085d6',
//                     confirmButtonText: 'OK',
//                 });
//                 setOwner([])
//                 setTotal_owner(0)
//                 return;
//             }
//             setTotal_owner(res.total_rows)
//             setOwner(res.rows);

//         })().finally(() => setLoading_owner(false))


//     }, [searchState]);

//     return { owner, loading_owner, total_owner };
// };

export const useFetchOwner = () => {
    const [searchState] = useAtom(searchStateOwner);
    const [owner, setOwner] = useState<IOwnerItem[]>([]);
    const [loading_owner, setLoading_owner] = useState(true);
    const [total_owner, setTotal_owner] = useState<number>(0);
    const [version, setVersion] = useState(0);

    const reload = () => setVersion(v => v + 1); // เรียกดึงใหม่

    useEffect(() => {
        let cancelled = false;

        const run = async () => {
            setLoading_owner(true);
            try {
                // กัน cache เล็กน้อย (ทางเลือก)
                const res = await getAllOwner(searchState);

                if (cancelled) return;

                const rows = res?.rows ?? [];
                const total = Number(res?.total_rows ?? res?.total_rows ?? rows.length);

                setOwner(rows);
                setTotal_owner(Number.isFinite(total) ? total : 0);
            } finally {
                if (!cancelled) setLoading_owner(false);
            }
        };

        run();
        return () => { cancelled = true; };
    }, [searchState, version]);

    return { owner, loading_owner, total_owner, reload };
};

export function useFetchOwnerType() {
    const [owner_type, setOwner] = useState<IFilterOwnerType[]>([]);
    const [food_type, setFood] = useState<IFilterOwnerType[]>([]);
    const [user_type, setUser] = useState<IFilterOwnerType[]>([]);
    const [loading, setLoading] = useState(true);
    const [problems, setProblems] = useState<string[]>([]);

    useEffect(() => {
        let mounted = true;
        (async () => {
            const [o, f, u] = await Promise.all([getOwnerType(), getFoodOwnerType(), getUserOwnerType()]);
            if (!mounted) return;

            const issues: string[] = [];
            const chk = (name: string, data: any[]) => {
                if (!Array.isArray(data) || data.length === 0) issues.push(`${name}: ไม่มีข้อมูล`);
            };
            chk("owner_type", o); chk("food_type", f); chk("user_type", u);

            setOwner(Array.isArray(o) ? o : []);
            setFood(Array.isArray(f) ? f : []);
            setUser(Array.isArray(u) ? u : []);
            setProblems(issues);
        })().finally(() => mounted && setLoading(false));
        return () => { mounted = false; };
    }, []);

    return { owner_type, food_type, user_type, loading_owner_type: loading, problems };
}

export const useOwnerFromFetch = (owner_id: string) => {
    const [loading, setLoading] = useState(true);
    const [actype, setActype] = useState("");
    const [owner] = useAtom(OwnerState);
    const {
        register, handleSubmit, reset, setValue, watch, getValues, control, setError, clearErrors,
        formState: { errors },
    } = useForm<IOwnerItem>({
        resolver: zodResolver(OwnerZod as any) as Resolver<IOwnerItem>,
        defaultValues: IOwnerItemDefault,
    });
    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                console.log('owner_id', owner_id)
                if (owner_id === '0') {
                    setActype('create')
                    // reset(owner);
                    const currentForm = getValues();
                    reset({ ...currentForm, ...(owner ?? {}), actype: 'create' });
                    setLoading(false);
                    return;
                }

                const getData = await getOwnerByOne(owner_id);
                console.log('getData', getData);

                if (R.isEmpty(getData) || R.isNil(getData)) {
                    await Swal.fire({
                        title: `ไม่พบข้อมูล`,
                        text: `เกิดข้อผิดพลาดบางอย่าง โปรดตรวจสอบก่อนแก้ไข`,
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK',
                    });
                    return;
                }
                setActype('edit')
                reset(getData);
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
                Swal.fire('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลได้', 'error');
            } finally {
                setLoading(false);
            }
        })();
    }, [owner_id, reset]);

    useEffect(() => {
        console.log('Valuse Set', getValues())
    }, [watch()])

    return {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        getValues,
        control,
        loading,
        errors,
        actype,
        setError,
        clearErrors
    };
};

export const ExportExcelFileOwner = async () => {
  try {
    const { owner } = useFetchOwner();
    const response = useFetchOwner()
    console.log("response", response)

    const fileName =
      owner.length > 0
        ? `${EnumFileNameExcel.owner_name}_${dayjs().format("DDMMYYYY")}.xlsx`
        : `${EnumFileNameExcel.owner_name}.xlsx`

    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet(EnumSheetNameExcel.owner_name_sheet)

    const headerRow = HeaderExcelOwner.map((column) => column.header) // ดึงค่า header จาก HeaderExcelOwner
    worksheet.addRow(headerRow).font = { bold: true }
    // กำหนดความกว้างของคอลัมน์ตามที่ระบุใน HeaderExcelOwner
    HeaderExcelOwner.forEach((column, index) => {
      worksheet.getColumn(index + 1).width = column.width // +1 เพราะคอลัมน์ใน Excel เริ่มจาก 1
    })
    // response.forEach((owner: IOwnerItem, ownerIndex: number) => {
    //   let isFirstBranch = true
    //   owner.branch?.forEach((branch: IBranchItem, _: number) => {
    //     const branch_start_date = dayjs
    //       .unix(branch.start_date)
    //       .format("DD/MM/YYYY")
    //     const branch_end_date = dayjs.unix(branch.end_date).format("DD/MM/YYYY")
    //     const branch_status =
    //       branch.status === 1 ? "เปิดการใช้งาน" : "ปิดการใช้งาน"
    //     const owner_status =
    //       owner.status === 1 ? "เปิดการใช้งาน" : "ปิดการใช้งาน"
    //     const rowData = [
    //       isFirstBranch ? ownerIndex + 1 : "",
    //       owner.owner_name || "-",
    //       owner.owner_code || "-",
    //       owner.owner_type || "-",
    //       owner.phone || "-",
    //       owner.branch?.find((b) => b.branch_id === owner.branch_id)
    //         ?.branch_name || "-",
    //       owner.email || "-",
    //       owner.username || "-",
    //       owner.lead_id || "-",
    //       owner.customer_id || "-",
    //       owner_status || "-",
    //       branch.branch_name || "-",
    //       branch.branch_code || "-",
    //       branch.branch_type || "-",
    //       branch.branch_address || branch.address?.address || "-",
    //       branch.merchant_id || "-",
    //       branch.phone || "-",
    //       branch.username || branch.account_information?.username || "-",
    //       branch.package_name || "-",
    //       branch_start_date || "-",
    //       branch_end_date || "-",
    //       branch_status || "-",
    //     ]

    //     const row = worksheet.addRow(rowData)

    //     // Change row color if it's the first branch of the owner
    //     if (isFirstBranch) {
    //       row.eachCell((cell) => {
    //         cell.fill = {
    //           type: "pattern",
    //           pattern: "solid",
    //           fgColor: { argb: "FFE1F5FE" }, // ฟ้าอ่อนมากขึ้น
    //         }
    //         cell.border = {
    //           top: { style: "thin", color: { argb: "000000" } }, // เส้นขอบด้านบนเป็นสีดำ
    //           left: { style: "thin", color: { argb: "000000" } }, // เส้นขอบด้านซ้ายเป็นสีดำ
    //           bottom: { style: "thin", color: { argb: "000000" } }, // เส้นขอบด้านล่างเป็นสีดำ
    //           right: { style: "thin", color: { argb: "000000" } }, // เส้นขอบด้านขวาเป็นสีดำ
    //         }
    //       })
    //       isFirstBranch = false // Set to false after first branch
    //     }
    //   })
    // })

    // Save Excel file
    const buffer = await workbook.xlsx.writeBuffer()

    // Create Blob and download file without using saveAs
    const blob = new Blob([buffer], { type: "application/octet-stream" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = fileName // Set the file name dynamically

    // Trigger the download by simulating a click
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link) // Clean up

    URL.revokeObjectURL(url) // Release memory
  } catch (error: any) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "ไม่สามารถโหลดข้อมูลได้",
      text: error.message || "An unexpected error occurred.",
    })
  }
}