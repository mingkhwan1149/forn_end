import { z, ZodType } from 'zod';


//===========Owner===============
export const OwnerZod = z.object({
    owner_name: z.string().min(1, { message: 'กรุณาใส่เจ้าของร้าน' }),
    branch_name: z.string().min(1, { message: 'กรุณาเลือกสาขาหลัก' }),
    email: z.string().min(1, { message: 'กรุณากรอก E-mail' }),
    phone: z.string().min(1, { message: 'กรุณากรอกเบอร์โทรศัพท์' }),
    user_type_id: z.string().min(1, { message: 'กรุณาเลือกประเภทผู้ใช้งาน' }),
    owner_type_names: z.array(z.string()).min(1, { message: "กรุณาเลือกประเภทร้านค้าอย่างน้อย 1 อย่าง" }),
    food_type_names: z.array(z.string()).min(1, { message: "กรุณาเลือกประเภทอาหารอย่างน้อย 1 อย่าง" }),
    branches: z.array(z.object({
        id: z.string(),  // กำหนดรูปแบบข้อมูลของ branch แต่ละตัว
        branch_name: z.string()
    })).min(1, { message: 'กรุณาเพิ่มอย่างน้อย 1 สาขา' }),
    password: z.string().optional().or(z.literal('')),
    confirm_password: z.string().optional().or(z.literal('')),
    actype: z.enum(['create', 'edit']).optional(),
}).superRefine((data, ctx) => {
    if (data.actype === 'create') {
        // ต้องใส่รหัสผ่าน และยาว >= 8
        if (!data.password || data.password.trim().length < 8) {
            ctx.addIssue({
                code: "custom",
                path: ['password'],
                message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
            });
        }
        // ต้องใส่ยืนยันรหัสผ่าน
        if (!data.confirm_password || data.confirm_password.trim().length < 8) {
            ctx.addIssue({
                code: "custom", // ✅ ใช้ string literal แทน
                path: ["password"],
                message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
            });
        }
        // ต้องตรงกัน
        if ((data.password ?? '') !== (data.confirm_password ?? '')) {
            ctx.addIssue({
                code: "custom",
                path: ['confirm_password'],
                message: 'รหัสผ่านไม่ตรงกัน',
            });
        }
    }
})

export const BranchTypeZod = z.object({
    id: z.string().min(1, { message: 'กรุณาเลือกประเภทสาขา' }),
});
export const BranchZod = z.object({
    branch_name: z.string().min(1, { message: 'กรุณาใส่ชื่อสาขา' }),
    // branch_type: (BranchTypeZod),
    branch_type: z.object({
        id: z.string().min(1, { message: "กรุณาเลือกประเภทสาขา" }),
    }),
    username: z.string().min(1, { message: 'กรุณาระบุชื่อบัญชีผู้ใช้ (Username)' }),
    // package_id: z.string().min(1, { message: 'กรุณาเลือกแพ็คเกจ' }),
    password: z.string().optional().or(z.literal('')),
    confirm_password: z.string().optional().or(z.literal('')),
    actype: z.enum(['create', 'edit']).optional(),
}).superRefine((data, ctx) => {
    if (data.actype === 'create') {
        // ต้องใส่รหัสผ่าน และยาว >= 8
        if (!data.password || data.password.trim().length < 8) {
            ctx.addIssue({
                code: "custom",
                path: ['password'],
                message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร',
            });
        }
        // ต้องใส่ยืนยันรหัสผ่าน
        if (!data.confirm_password || data.confirm_password.trim().length < 8) {
            ctx.addIssue({
                code: "custom", // ✅ ใช้ string literal แทน
                path: ["password"],
                message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
            });
        }
        // ต้องตรงกัน
        if ((data.password ?? '') !== (data.confirm_password ?? '')) {
            ctx.addIssue({
                code: "custom",
                path: ['confirm_password'],
                message: 'รหัสผ่านไม่ตรงกัน',
            });
        }
    }
});

