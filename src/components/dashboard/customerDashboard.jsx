"use client";

import { useEffect, useState } from "react";
import { actionDeleteCartById, actionGetFavouriteAndBoughtProducts } from "@/actions";
import Link from "next/link";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import Toast from "../toast";

const CustomerDashboard = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [carts, setCarts] = useState([])
  const [toast, setToast] = useState(null)

  useEffect(() => {
    async function getDetails() {
      const res = await actionGetFavouriteAndBoughtProducts(userId);

      if (res.data) {
        
        setUserDetails(res.data)
        setCarts(res.data.carts)
      };
    }
    getDetails();
  }, [userId]);


  async function handleDeleteCart(cartId){
    const res = await actionDeleteCartById(cartId)
    if(res.data){
      setCarts(prev=>{
        return prev.filter((cart)=> cart.cart_id !== cartId)
      })

      setToast(prev=>{
        return {...prev,message:res.data, type:'success'}
      })
    }
    if(res.error){
      setToast(prev=>{
        return {...prev,message:res.error, type:'error'}
      })
    }
  }

  return (
    <>
      {!userDetails ? (
        <h1>Loading...</h1>
      ) : (
        <div className="">
          <div className="mb-4 flex justify-start items-center gap-1">
          <h1 className="font-bold">
            You have bought total {userDetails.bought_products.length} products. See them
          </h1>
          <Link href={"/products/me"} className="border-b-2 border-b-black font-semibold">here</Link>
          </div>
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
                {carts.map((cart, idx) => {
                  return (
                    <div key={idx} className="p-1 rounded border">
                      <div className="flex justify-between items-start">
                        <div>
                          <p>Cart ID: {cart.cart_id}</p>
                          <p className="text-sm italic font-light">
                            Created at {cart.created_at.slice(0, 10)}
                          </p>
                        </div>

                        <div className="flex justify-center items-center gap-4">
                          <Link href={`/carts/${cart.cart_id}`} className="flex justify-center items-center gap-1 border-b-2 border-b-blue-400 cursor-pointer">
                            <CiShoppingCart />
                            <p className="">
                              View Cart
                            </p>
                          </Link>
                          <div onClick={()=>handleDeleteCart(cart.cart_id)} className="flex justify-center items-center gap-1 border-b-2 border-b-blue-400 cursor-pointer">
                            <FaRegTrashCan />
                            <button>Delete</button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-start items-center gap-1">
                        {cart.products.map((prod, idx) => {
                          return (
                            <p
                              key={idx}
                              className="p-1 rounded bg-blue-100 text-xs"
                            >
                              {prod.name}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {toast && <div className="absolute bottom-2 right-2"><Toast message={toast.message} type={toast.type} toggleShowToast={()=>setToast(null)} /> </div>}
        </div>
      )}
    </>
  );
};

export default CustomerDashboard;
