"use client";

import { actionGetShopsByOwnerId, actionDeleteShopById } from "@/actions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa6";

const SellerDashboard = ({ userId }) => {
  const [shops, setShops] = useState([]);
  const [deletePending, setDeletePending] = useState(false);

  async function handleDeleteShop(shopId) {
    setDeletePending(true);
    const deleted = await actionDeleteShopById(shopId);
    if (deleted) {
      setShops((prev) => {
        return prev.filter((shop) => shop.shop_id !== shopId);
      });
    }

    setDeletePending(false)
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
      {shops.length ? (
        <div>
          <h1 className="text-xl font-bold mb-4">
            You own {shops.length} shops
          </h1>
          <div className="grid grid-cols-4 gap-4">
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
        <h1>Loading...</h1>
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
    <div className="col-span-1 bg-blue-100 rounded shadow py-2 px-4 relative">
      <h1 className="text-lg font-semibold mb-2">{shop.name}</h1>
      <div className="flex justify-between items-center">
        <Link
          className="border border-blue-400 p-1 rounded flex justify-center items-center gap-1"
          href={`/shops/${shop.shop_id}`}
        >
          <FaRegEye />
          Visit
        </Link>
        <button
          onClick={handleShowDelete}
          className="flex justify-center items-center gap-1 border border-red-400 p-1 rounded"
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
            className="rounded border-2 py-1 px-2 text-sm border-white mx-auto w-20 flex justify-center items-center gap-1 cursor-pointer"
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
