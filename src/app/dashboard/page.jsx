"use client";

import { getCurrentUser } from "@/actions";
import AdminDashboard from "@/components/dashboard/adminDashboard";
import CustomerDashboard from "@/components/dashboard/customerDashboard";
import SellerDashboard from "@/components/dashboard/sellerDashboard";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [panel, setPanel] = useState('CUSTOMER')

  useEffect(() => {
    async function getUser() {
      const res = await getCurrentUser();
      if (res) setUser(res);
    }
    getUser();
  }, []);


  return <>{user ? <div className="p-4">
    <h1 className="text-2xl text-center font-semibold mt-4 mb-16">Welcome to your dashboard <span className="bg-blue-400 text-white px-2 py-1 rounded">{user.full_name}</span></h1>
    <div className="grid grid-cols-3 gap-4 mb-12">
        <div onClick={()=>setPanel('CUSTOMER')} className={`col-span-1 p-2 cursor-pointer ${panel === "CUSTOMER" && 'border-b-2 border-r-2 rounded border-blue-400'}`}>Customer Dashboard</div>
        <div onClick={()=>setPanel('SELLER')} className={`cursor-pointer p-2 ${panel === "SELLER" && 'border-b-2 border-r-2 rounded border-blue-400'} `}>Seller Dashboard</div>
        {user.is_admin && <div className={`col-span-1 p-2 cursor-pointer ${panel === "ADMIN" && 'border-b-2 border-r-2 rounded border-blue-400'}`} onClick={()=>setPanel('ADMIN')}>Admin Dashboard</div>}
    </div>
    <div>
        {panel === "CUSTOMER" && <CustomerDashboard userId={user.user_id} />}
        {panel === "SELLER" && <SellerDashboard userId={user.user_id} />}
        {panel === "ADMIN" && <AdminDashboard />}
    </div>
  </div> : <h1>Loading...</h1>}</>;
};

export default DashboardPage;
