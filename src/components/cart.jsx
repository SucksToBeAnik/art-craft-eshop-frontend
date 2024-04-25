"use client";

import { actionGetCartList, actionAddProductToCart } from "@/actions";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Toast from "./toast";
import Link from "next/link";

const Cart = ({ onShowCart, productId }) => {
  const [carts, setCarts] = useState([]);
  const [pending, setPending] = useState(false);
  const [toast, setToast] = useState(null);


  useEffect(() => {
    setPending(true);
    async function getCarts() {
      const res = await actionGetCartList();

      if (res.data) {
        setCarts(res.data);
      }
      if (res.error) {
        setToast((prev) => {
          return { ...prev, message: res.error, type: "error" };
        });
      }

      setPending(false);
    }

    getCarts();
  }, []);


  async function handleAddProductToCart(cartId){
    const res = await actionAddProductToCart(cartId, productId)
    if(res.data){
        setToast(prev=>{
            return {...prev,message:"Product added to Cart",type:"success"}
        })
    }
    if(res.error){
        setToast(prev=>{
            return {...prev,message:res.error,type:"error"}
        })
    }
  }

  return (
    <div className="w-[350px] min-h-[500px] rounded p-2 shadow bg-blue-200 text-black relative">
      <h1 className="my-2 font-bold">Your Carts</h1>

      <>
        {pending ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p className="text-sm">
              {!carts.length && "You have not created any carts yet"}
            </p>
            {carts.map((cart, idx) => {
              return (
                <div
                  key={idx}
                  className="flex flex-col gap-2 items-start justify-center"
                >
                  <div className="flex flex-col justify-start items-start p-2 rounded shadow w-full">
                    <p className="mb-2">
                      cart 0{idx + 1}{" "}
                      <span className="text-xs italic font-light">
                        last upadated on {cart.updated_at.slice(0, 10)}
                      </span>
                    </p>
                    <div className="grid grid-cols-3 gap-1 mb-2">
                        {cart.products.map((prod,idx)=>{
                            return <p key={idx} className="col-span-1 bg-white text-black p-1 rounded text-xs font-light">{prod.name}</p>
                        })}
                    </div>
                    <div className="flex justify-between items-center w-full mt-2">
                      <button onClick={()=>handleAddProductToCart(cart.cart_id)} className="border-b-2 text-sm border-b-black">
                        Add this Product
                      </button>
                      <Link href={`/carts/${cart.cart_id}`} className="border-b-2 text-sm border-b-black">
                        Order Now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            <button className="w-3/4 bg-white text-black my-2 border-2 p-2 rounded block absolute bottom-0 left-12">
              Create New Cart
            </button>

            {toast && <div className="absolute bottom-2 right-2"><Toast toggleShowToast={()=>setToast(null)} type={toast.type} message={toast.message} /></div>}
          </div>
        )}
      </>

      <IoCloseCircleOutline
        className="absolute top-1 right-1 cursor-pointer text-xl"
        onClick={() => onShowCart(false)}
      />
    </div>
  );
};

export default Cart;
