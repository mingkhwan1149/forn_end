// --- utils/http.ts (ไฟล์เดียวกับที่คุณวางไว้) ---
import axios from "axios";
import { alertError } from "../components/swal";
import { ENUM_VERSION } from "../components/Enum";

export const HOST_SERVER = `${import.meta.env.VITE_API_DOMAIN}/api`;

console.log("[ENV] VITE_IMAGE_VERSION ENUM_VERSION=", ENUM_VERSION);
console.log("[ENV] VITE_API_DOMAIN HOST_SERVER=", HOST_SERVER);

const instance = axios.create({
  baseURL: HOST_SERVER,
});

instance.interceptors.request.use(
  (config) => {
    // ตั้งเป็น JSON เป็นค่าเริ่มต้น (ถ้าเป็น multipart ให้ override ตอนเรียก api.post เอง)
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --------- ส่วนสำคัญ 1: unwrap ตรวจ status ถ้า error ให้โยนด้วย err_code ----------
function unwrap<T>(payload: any): T {
  // ถ้ามี status (รูปแบบที่ backend ห่อ)
  if (payload && typeof payload === "object" && payload.status) {
    const { code, description, err_code } = payload.status ?? {};

    // 2xx/200 = success → คืน data เลย
    if (Number(code) === 200 || Number(code) === 201) {
      return (payload.data as T) ?? (undefined as unknown as T);
    }

    // ไม่ใช่ 200 → โยน error โดยใช้ err_code ถ้ามี
    const message =
      err_code ||
      description ||
      "Unknown Error (non-200 status from backend)";
    const e = new Error(message);
    // แนบ raw payload ไว้เผื่อดีบัก
    (e as any).__backend = payload;
    throw e;
  }

  // ไม่มี status → อาจเป็น JSON แบน (เช่น อัปโหลดรูป) → คืนตรง ๆ
  return payload as T;
}

// --------- ส่วนสำคัญ 2: แสดงผล error จาก Axios/Backend ให้ดึง err_code เมื่อมี ----------
const handleError = (error: any) => {
  // โครงยอดนิยมจาก backend: { status: { err_code, code, description }, data: {} }
  const errCodeFromBackend =
    error?.response?.data?.status?.err_code ||
    error?.response?.data?.message;

  const message =
    errCodeFromBackend ||
    error?.message ||
    "Unknown Error";

  alertError(message);
  throw error; // ส่งต่อให้ caller ถ้าต้องการจับต่อ
};

export const api = {
  get: async <T>(url: string, config = {}): Promise<T> => {
    try {
      const res = await instance.get(url, config);
      return unwrap<T>(res.data);
    } catch (err) {
      handleError(err);
      throw err;
    }
  },

  post: async <T>(url: string, data?: any, config = {}): Promise<T> => {
    try {
      const res = await instance.post(url, data, config);
      return unwrap<T>(res.data);
    } catch (err) {
      handleError(err);
      throw err;
    }
  },

  put: async <T>(url: string, data?: any, config = {}): Promise<T> => {
    try {
      const res = await instance.put(url, data, config);
      return unwrap<T>(res.data);
    } catch (err) {
      handleError(err);
      throw err;
    }
  },

  patch: async <T>(url: string, data?: any, config = {}): Promise<T> => {
    try {
      const res = await instance.patch(url, data, config);
      return unwrap<T>(res.data);
    } catch (err) {
      handleError(err);
      throw err;
    }
  },

  delete: async <T>(url: string, config = {}): Promise<T> => {
    try {
      const res = await instance.delete(url, config);
      return unwrap<T>(res.data);
    } catch (err) {
      handleError(err);
      throw err;
    }
  },
};