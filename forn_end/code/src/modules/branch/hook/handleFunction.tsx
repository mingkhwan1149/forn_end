import type { UseFormClearErrors, UseFormGetValues, UseFormSetError, UseFormSetValue } from "react-hook-form";
import type { IBranchItem } from "../interface/Branch.interface";
import type { ITextPopup } from "../../../shared/components/popup/PopupConfirm.interface";
import type { NavigateFunction } from "react-router";
import type { ITextAlert } from "../../../shared/components/message/Alert.interface";
import { useCallback, useMemo, useState } from "react";
import { debounce } from "@mui/material";
import { CreateBranch, DeleteBranchByOne, getCheckUsername, UpdateBranch } from "../service/BranchApi";
import { IOwnerItemDefault, type IOwnerItem } from "../../owner/interface/Owner.interface";
import { nanoid } from 'nanoid';
import type { SetStateAction } from "jotai";

export function useCheckUsername(
  setValue: UseFormSetValue<IBranchItem>,
  setError: UseFormSetError<IBranchItem>,
  clearErrors: UseFormClearErrors<IBranchItem>,
  delay = 800
) {
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const doCheckUsername = useMemo(
    () =>
      debounce(async (raw: string) => {
        const username = (raw ?? '').trim();

        // ถ้าว่าง → ล้าง error และไม่ต้อง call API
        if (!username) {
          clearErrors('username');
          setValue('username', '');
          return;
        }

        setIsCheckingUsername(true);
        try {
          const res = await getCheckUsername(username);

          if (res.is_duplicate) {
            setError('username', { message: 'username ถูกใช้งานแล้ว' });
          } else {
            clearErrors('username');
            setValue('username', username);
          }
        } catch (e) {
          // fallback เงียบ ๆ หรือจะแจ้ง error ก็ได้
          setError('username', { message: 'ไม่สามารถตรวจสอบอีเมลได้' });
        } finally {
          setIsCheckingUsername(false);
        }
      }, delay),
    [clearErrors, delay, setError, setValue]
  );

  return { checkUsername: doCheckUsername, isCheckingUsername };
}

// ====== Hook จัดการ password / confirm_password ======
export function usePasswordFields(
  getValues: UseFormGetValues<IBranchItem>,
  setValue: UseFormSetValue<IBranchItem>,
  minLen = 8
) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const toggleShowPassword = useCallback(() => setShowPassword((v) => !v), []);
  const toggleShowConfirm = useCallback(() => setShowConfirmPassword((v) => !v), []);

  const handlePasswordChange = useCallback(
    (field: 'password' | 'confirm_password', value: string) => {
      // อัปเดตค่าใน RHF
      setValue(field as any, value as any);

      const pwd = field === 'password' ? value : (getValues('password') ?? ('' as any));
      const cfm = field === 'confirm_password' ? value : (getValues('confirm_password') ?? ('' as any));

      // validate ความยาว
      setPasswordError(!pwd || pwd.trim().length < minLen);

      // validate ตรงกัน (เช็คเมื่อมีการกรอก)
      const shouldCheckMatch = !!cfm || !!pwd;
      setPasswordConfirmError(shouldCheckMatch && !!cfm && pwd !== cfm);
    },
    [getValues, setValue, minLen]
  );

  return {
    // state
    showPassword,
    showConfirmPassword,
    passwordError,
    passwordConfirmError,
    // actions
    toggleShowPassword,
    toggleShowConfirm,
    handlePasswordChange,
  };
}
// ====== Hook จัดการ password / confirm_password ======
export function usePINFields(
  getValues: UseFormGetValues<IBranchItem>,
  setValue: UseFormSetValue<IBranchItem>,
  pinLength = 6 // ✅ ความยาว PIN (เช่น 6 หลัก)
) {
  const [showPIN, setShowPIN] = useState(false);
  const [showConfirmPIN, setShowConfirmPIN] = useState(false);

  const [pinError, setPinError] = useState(false);
  const [pinConfirmError, setPinConfirmError] = useState(false);

  const toggleShowPIN = useCallback(() => setShowPIN((v) => !v), []);
  const toggleShowConfirmPIN = useCallback(() => setShowConfirmPIN((v) => !v), []);

  const handlePINChange = useCallback(
    (field: "pin" | "confirm_pin", value: string) => {
      // อัปเดตค่าใน React Hook Form
      setValue(field as any, value as any);

      const pin = field === "pin" ? value : getValues("pin") ?? "";
      const confirm = field === "confirm_pin" ? value : getValues("confirm_pin") ?? "";

      // ✅ validate ความยาว (ต้องครบ pinLength ตัว)
      setPinError(!pin || pin.trim().length < pinLength);

      // ✅ validate ว่า PIN ตรงกัน
      const shouldCheckMatch = !!pin || !!confirm;
      setPinConfirmError(shouldCheckMatch && !!confirm && pin !== confirm);
    },
    [getValues, setValue, pinLength]
  );

  return {
    // state
    showPIN,
    showConfirmPIN,
    pinError,
    pinConfirmError,
    // actions
    toggleShowPIN,
    toggleShowConfirmPIN,
    handlePINChange,
  };
}

export const handleErrorSubmit = async (element: any) => {
  console.log("errorZod", element);
};

export const onClickDeleteBranch = ({
  getValues,
  navigate,
  id,
  setOwner,
  owner,
  setFlash,
  setConfirmPopup
}: {
  getValues: UseFormGetValues<IBranchItem>;
  navigate: NavigateFunction;
  id?: string;
  setOwner: React.Dispatch<React.SetStateAction<IOwnerItem>>;
  owner: IOwnerItem;
  setFlash: (f: ITextAlert | null) => void;
  setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void;
}) => {
  setConfirmPopup({
    type: 'normal',
    title: 'ท่านต้องการลบบัญชีสาขา',
    content: 'กดยืนยันหากต้องการลบบัญชีสาขา บัญชีสาขาที่ลบไม่สามารถนำกลับมาได้',
    onClose: () => setConfirmPopup(null),
    onConfirm: async () => {
      await handleDelete({
        getValues,
        navigate,
        id,
        setOwner,
        owner,
        setFlash
      })
    },
    confirmText: 'ยืนยัน',
    cancelText: 'ยกเลิก',
  });
};

export const handleDelete = async ({
  getValues,
  navigate,
  id,
  setOwner,
  setFlash
}: {
  getValues: UseFormGetValues<IBranchItem>;
  navigate: NavigateFunction;
  id?: string;
  setOwner: React.Dispatch<React.SetStateAction<IOwnerItem>>;
  owner: IOwnerItem;
  setFlash: (f: ITextAlert | null) => void;
}) => {
  try {
    if (id?.startsWith('tmp_')) {
      setOwner(prev => {
        // if (!prev) return prev;
        return {
          ...prev,
          branches: (prev.branches ?? []).filter(b => b.temp_id !== id),
        };
      });
      setFlash({
        type_severity: 'success',
        title: '',
        content: 'ลบบัญชีสาขาผู้ใช้งานข้อมูลสำเร็จ!!!',
      });
      navigate(-1);
    }
    else {
      const Id = getValues('id')
      console.log('DeleteBranchByOne', Id)
      const res = await DeleteBranchByOne(Id);
      setFlash({
        type_severity: 'success',
        title: '',
        content: 'ลบบัญชีสาขาผู้ใช้งานข้อมูลสำเร็จ!!!',
      });
      navigate(-1);
    }
  } catch (error) {
  } finally {
  }
};

export const onSubmitBranch = ({
  getValues,
  navigate,
  id,
  setOwner,
  owner,
  setFlash,
  setConfirmPopup
}: {
  getValues: UseFormGetValues<IBranchItem>;
  navigate: NavigateFunction;
  id?: string;
  setOwner: React.Dispatch<React.SetStateAction<IOwnerItem>>;
  owner: IOwnerItem;
  setFlash: (f: ITextAlert | null) => void;
  setConfirmPopup: (update: SetStateAction<ITextPopup | null>) => void;
}) => {
  console.log('setConfirmPopup', setConfirmPopup)
  setConfirmPopup({
    type: 'normal',
    title: 'ยืนยันการบันทึกสาขา',
    content: 'โปรดตรวจสอบความถูกต้อง และกดยืนยันหากต้องการที่จะบันทึกสาชา',
    onClose: () => { setConfirmPopup(null); },
    onConfirm: async () => {
      await saveHandlerBranch({
        getValues,
        navigate,
        id,
        setOwner,
        owner,
        setFlash
      })
    },
    confirmText: 'ยืนยัน',
    cancelText: 'ยกเลิก',
  });
};

const saveHandlerBranch = async ({
  getValues,
  navigate,
  id,
  setOwner,
  owner,
  setFlash
}: {
  getValues: UseFormGetValues<IBranchItem>;
  navigate: NavigateFunction;
  id?: string;
  setOwner: React.Dispatch<React.SetStateAction<IOwnerItem>>;
  owner: IOwnerItem;
  setFlash: (f: ITextAlert | null) => void;
}) => {
  console.log('saveHandlerBranch')
  const tempId = 'tmp_' + nanoid(); // ตัวระบุชั่วคราว
  const formBranch = getValues()
  console.log("id", id)
  console.log("formBranch", formBranch)
  try {
    if (id === '0') {
      setOwner(prev => ({
        ...(prev ?? IOwnerItemDefault),
        branches: [
          ...(prev?.branches ?? []),
          { ...formBranch, id: '', temp_id: tempId }
        ],
      }));
      setFlash({
        type_severity: 'success',
        title: '',
        content: 'การสร้างสาขาสำเร็จ',
      });
      navigate(-1);
    }
    else if (id === '1') {
      // CreateBranch
      const payload = {
        ...formBranch,
        owner_id: owner?.id || "", // ใช้ owner.id ถ้ามี
      };
      const resp = await CreateBranch(payload);
      setFlash({
        type_severity: 'success',
        title: '',
        content: 'การสร้างสาขาสำเร็จ',
      });
      navigate(-1);
    }
    else if (id?.startsWith('tmp_')) {
      setOwner(prev => {
        // if (!prev) return prev;
        return {
          ...prev,
          branches: (prev.branches ?? []).map(b =>
            b.temp_id === id
              ? {
                // คง temp tag และ id เดิมไว้
                ...b,
                ...formBranch,
                id: b.id ?? '',          // กันหลุดเป็น undefined
                temp_id: b.temp_id,      // คงไว้เพื่อหาแก้ไขรอบต่อไปได้
              }
              : b
          ),
        };
      });

      setFlash({
        type_severity: 'success',
        title: '',
        content: 'การบันทึกการแก้ไขสาขาสำเร็จ',
      });
      navigate(-1);
    }
    else {
      const resp = await UpdateBranch(formBranch);
      setOwner(IOwnerItemDefault)
      setFlash({
        type_severity: 'success',
        title: '',
        content: 'การบันทึกการแก้ไขสาขาสำเร็จ',
      });
      navigate(-1);
    }
  } catch (err) {
  } finally {
    // optional
  }
};
