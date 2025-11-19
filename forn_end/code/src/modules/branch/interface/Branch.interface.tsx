import type { IFilterBranchType } from "./BranchType.interface";

// ข้อมูลที่อยู่สาขา
export interface IAddressBranch {
  id: string;
  address_line: string;     // ที่อยู่รวม
  house_number: string;     // บ้านเลขที่
  sub_district_id: number;     // ตำบล / แขวง
  district_id: number;         // อำเภอ / เขต
  province_id: number;         // จังหวัด
  sub_district_name: string;     // ตำบล / แขวง
  district_name: string;         // อำเภอ / เขต
  province_name: string;         // จังหวัด
  zip_code: string;      // รหัสไปรษณีย์
  latitude: number;         // ละติจูด
  longitude: number;        // ลองจิจูด
  google_place_id: string | null;
  google_maps_url: string | null;
}


export interface IBranchItem {
  id: string;
  temp_id?: string;   
  branch_name: string;
  branch_code: string;
  branch_type_id: string;
  branch_latitude: number;
  branch_longitude: number;
  business_info_id: string;
  business_info: string ; // ถ้ารู้โครงสร้างให้แทนที่ unknown
  owner_id: string;             // รหัสเจ้าของ
  name: string;                 // ชื่อสาขา
  address_id: string;           // รหัสที่อยู่
  address: IAddressBranch;            // ข้อมูลที่อยู่
  username: string;             // ชื่อผู้ใช้สำหรับระบบ
  branch_type: IFilterBranchType;     // ประเภทสาขา
  active_type: number;          // สถานะการใช้งาน (เช่น 0=ปิด, 1=เปิด)
  pos_id: string | null;        // รหัส POS ถ้ามี
  image: string;                // ลิงก์รูปภาพสาขา
  is_branch_main: boolean;      // เป็นสาขาหลักหรือไม่
  contacts: any[];              // รายชื่อผู้ติดต่อ (เปลี่ยน any เป็น interface ถ้ารู้โครงสร้าง)
  opening_hours: any[];         // เวลาเปิดทำการ (เปลี่ยน any เป็น interface ถ้ารู้โครงสร้าง)
  package_id: string;
  password: string;
  confirm_password: string;
  pin: string;
  confirm_pin: string;
  branch_house_number: string;
  sub_district_id: number;     // ตำบล / แขวง
  district_id: number;         // อำเภอ / เขต
  province_id: number; 
  branch_postcode: string;
  merchant_id: string;
  active_name: string;
  main_package: string;
  add_on_package: string;
  package_type: string;
  start_date: string;
  end_date: string;
  duration: number;
  payment_status: string;
  actype?: 'create' | 'edit';
}


export const IBranchItemDefault: IBranchItem = {
  id: "",
  branch_name: "",
  branch_code: "",
  branch_type_id: "",
  branch_latitude: 0,
  branch_longitude: 0,
  package_id: "",
  is_branch_main: false,
  image: "",
  username: "",
  password: "",
  branch_house_number: "",
  branch_postcode: "",
  merchant_id: "",
  active_name: "",
  active_type: 1,
  main_package: "",
  add_on_package: "",
  package_type: "",
  start_date: "",
  end_date: "",
  duration: 0,
  payment_status: "",
  business_info_id: "",
  business_info: "",
  owner_id: "",
  name: "",
  address_id: "",
  address: {
    id: "",
    address_line: "",
    house_number: "",
    zip_code: "",
    latitude: 0,
    longitude: 0,
    google_place_id: null,
    google_maps_url: null,
    sub_district_id: 0,
    district_id: 0,
    province_id: 0,
    sub_district_name: "",
    district_name: "",
    province_name: ""
  },
  branch_type: {
    id: "",
    name: "",
    code: ""
  },
  pos_id: null,
  contacts: [],
  opening_hours: [],
  confirm_password: "",
  pin: '',
  confirm_pin: "",
  temp_id: "",
  sub_district_id: 0,
  district_id: 0,
  province_id: 0
}