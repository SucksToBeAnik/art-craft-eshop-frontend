"use client";

import { actionGetShopsByOwnerId, actionDeleteShopById } from "@/actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { HiPencilSquare } from "react-icons/hi2";
import { FaSpinner } from "react-icons/fa6";

const SellerDashboard = ({ userId }) => {
  const [shops, setShops] = useState();
  const [deletePending, setDeletePending] = useState(false);

  async function handleDeleteShop(shopId) {
    setDeletePending(true);
    const deleted = await actionDeleteShopById(shopId);
    if (deleted) {
      setShops((prev) => {
        return prev.filter((shop) => shop.shop_id !== shopId);
      });
    }

    setDeletePending(false);
  }

  useEffect(() => {
    async function getShops() {
      const res = await actionGetShopsByOwnerId(userId);

      if (res.data) setShops(res.data.shops);
    }

    getShops();
  }, [userId]);

  return (
    <>
      {!shops ? (
        <p>Laoding...</p>
      ) : (
        <>
          {shops.length ? (
            <div>
              <div className="flex justify-start items-center gap-1 mb-4 text-md">
              <h1 className="font-bold">
                You own {shops.length} shops. Launch
              </h1>
               <Link className="border-b-2 border-b-black font-semibold" href={"/shops/new"}>more?</Link>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {shops.map((shop, idx) => {
                  return (
                    <SellerShop
                      key={idx}
                      deletePending={deletePending}
                      onDeleteShop={() => handleDeleteShop(shop.shop_id)}
                      shop={shop}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
            <h1 className="text-md font-semibold mb-2">You do not own any shops</h1>
            <Link href={"/shops"} className="border-b-2 border-b-black">Go to Shops</Link>
            </div>
          )}
        </>
      )}
    </>
  );
};

const SellerShop = ({ shop, onDeleteShop, deletePending }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleShowDelete() {
    setShowDeleteConfirm((prev) => !prev);
  }

  useEffect(() => {
    if (!deletePending) {
      setShowDeleteConfirm(false);
    }
  }, [deletePending]);

  return (
    <div className="col-span-1 rounded border p-4 relative">
      <h1 className="font-semibold mb-4 text-md">{shop.name}</h1>
      <div className="flex justify-between items-center text-sm">
        <Link
          className="border-b-2 border-b-black flex justify-center items-center gap-1"
          href={`/shops/${shop.shop_id}`}
        >
          <FaRegEye />
          <span>Visit</span>
        </Link>

        <Link href={`/shops/edit/${shop.shop_id}`} className="border-b-2 border-b-black flex justify-center items-center gap-1">
          <HiPencilSquare />
          <span>Edit</span>
        </Link>

        <button
          onClick={handleShowDelete}
          className="flex justify-center items-center gap-1 border-b-2 border-b-black text-sm"
        >
          <FaRegTrashCan />
          Delete
        </button>
      </div>

      {showDeleteConfirm && (
        <div className="absolute z-20 p-4 pb-2 inset-0 bg-red-400 text-white rounded shadow">
          <p className="text-sm mb-1 text-center">
            Are sure you want to delete this shop?
          </p>
          <div
            onClick={onDeleteShop}
            className="rounded border-2 py-1 px-2 text-sm border-white mx-auto w-28 flex justify-center items-center gap-1 cursor-pointer"
          >
            <span>Confirm</span>
            {deletePending && <FaSpinner className="animate-spin text-xl" />}
          </div>
          <IoCloseCircleOutline
            onClick={() => {
              setShowDeleteConfirm(false);
            }}
            className="absolute top-1 right-0 text-xl cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
