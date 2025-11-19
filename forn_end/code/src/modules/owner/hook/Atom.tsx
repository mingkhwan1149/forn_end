import { atom } from "jotai";
import { IOwnerItemDefault, type IOwnerItem, type ISearchContext } from "../interface/Owner.interface";
import type { IBranchItem } from "../../branch/interface/Branch.interface";


export const searchStateOwner = atom<ISearchContext>({
    owner_search: '',
    owner_type_id: '',
    user_type_id: '',
    food_type_id: '',
    sort: '',
    page: 1,
    limit: 20,
});

export const OwnerState = atom<IOwnerItem>(IOwnerItemDefault);
export const BranchState = atom<IBranchItem>();

