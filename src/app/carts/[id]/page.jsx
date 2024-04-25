"use client";

import { actionGetSingleCartById } from "@/actions";
import { IoCloseCircleOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import Toast from "@/components/toast";

const SingleCartPage = ({ params }) => {
  const { id } = params;
  const [cart, setCart] = useState(null);
  const [cartPrice, setCartPrice] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function getSingleCart() {
      const res = await actionGetSingleCartById(id);

      if (res.data) {
        setCart(res.data);

        let price = 0
        if (res.data.products.length) {
          for (const prod of res.data.products) {
            price += prod.price
          }
          setCartPrice(price)
        }

      }

      if (res.error) {
        setToast((prev) => {
          return { ...prev, message: res.error, type: "error" };
        });
      }
    }

    getSingleCart();
  }, [id]);

  return (
    <>
      {!cart ? (
        <p>Loading...</p>
      ) : (
        <div className="w-3/5 mt-40 mx-auto p-4 rounded shadow relative">
          <h1 className="text-xl font-bold mb-2">Cart ID: {cart.cart_id}</h1>
          <p className="mb-4 text-md font-semibold">Total Price: {cartPrice}</p>
          <div className="grid grid-cols-3 gap-2">
            {cart.products.map((prod, idx) => {
              return (
                <div
                  key={idx}
                  className="col-span-1 p-2 bg-blue-100 rounded-sm"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <h1>{prod.name}</h1>
                      <p>{prod.price}</p>
                    </div>
                    <IoCloseCircleOutline className="text-xl cursor-pointer" />
                  </div>
                </div>
              );
            })}
          </div>

          <button className="block w-24 mt-8 mx-auto border-2 border-black rounded p-2">Order Now</button>

          {toast && (
            <div className="absolute bottom-1 right-1">
              <Toast
                message={toast.message}
                type={toast.type}
                toggleShowToast={() => setToast(null)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SingleCartPage;
