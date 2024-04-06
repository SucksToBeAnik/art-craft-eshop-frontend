import { create } from "zustand";

export const shopStore = create((set)=>({
    activeStatus: false,
    setActiveStatus: (status)=> set(()=>({activeStatus:status}))
}))

