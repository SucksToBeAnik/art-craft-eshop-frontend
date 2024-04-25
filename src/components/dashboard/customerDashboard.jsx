"use client";

import { useEffect, useState } from "react";
import { actionGetFavouriteAndBoughtProducts } from "@/actions";
import Link from "next/link";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegPaperPlane } from "react-icons/fa";

const CustomerDashboard = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    async function getDetails() {
      const res = await actionGetFavouriteAndBoughtProducts(userId);

      if (res.data) setUserDetails(res.data);
    }
    getDetails();
  }, [userId]);

  console.log(userDetails);

  return (
    <>
      {!userDetails ? (
        <h1>Loading...</h1>
      ) : (
        <div className="">
          <h1 className="font-bold mb-4">
            You have bought total {userDetails.bought_products.length} products
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 p-4 border-l-2">
              <h1 className="mb-4 font-semibold">Your Favourite Products</h1>
              <div className="space-y-2">
                {userDetails.favourite_products.map((prod, idx) => {
                  return (
                    <div
                      key={idx}
                      className="p-1 rounded border flex justify-between items-center"
                    >
                      <div>
                        <p>{prod.name} </p>
                        <p className="italic font-light text-sm">
                          by {prod.manufacturer}
                        </p>
                      </div>

                      <Link
                        className="border-b-2 border-b-blue-400"
                        href={`products/${prod.product_id}`}
                      >
                        Details
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-span-1 p-4 border-l-2">
              <h1 className="mb-4 font-semibold">Your Carts</h1>
              <div className="space-y-2">
                {userDetails.carts.map((cart, idx) => {
                  return (
                    <div
                      key={idx}
                      className="p-1 rounded border flex justify-between items-center"
                    >
                      <div>
                        <p>Cart ID: {cart.cart_id}</p>
                        <p className="text-sm italic font-light">
                          Created at {cart.created_at.slice(0, 10)}
                        </p>
                      </div>

                      <div className="flex justify-center items-center gap-4">
                        <div className="flex justify-center items-center gap-1 border-b-2 border-b-blue-400 cursor-pointer">
                          <FaRegPaperPlane />
                          <button className="">Order</button>
                        </div>
                        <div className="flex justify-center items-center gap-1 border-b-2 border-b-blue-400 cursor-pointer">
                          <FaRegTrashCan />
                          <button>Delete</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerDashboard;
