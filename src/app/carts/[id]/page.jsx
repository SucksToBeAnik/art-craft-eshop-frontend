"use client";

import {
  actionGetSingleCartById,
  actionOrderProductsFromCart,
  actionRemoveProductFromCart,
} from "@/actions";
import { IoCloseCircleOutline } from "react-icons/io5";

import { useEffect, useState } from "react";
import Toast from "@/components/toast";
import Link from "next/link";

const SingleCartPage = ({ params }) => {
  const { id } = params;
  const [cart, setCart] = useState(null);
  const [cartPrice, setCartPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function getSingleCart() {
      const res = await actionGetSingleCartById(id);

      if (res.data) {
        setCart(res.data);
        setProducts(res.data.products);

        setCartPrice(res.data.total_price);
      }

      if (res.error) {
        setToast((prev) => {
          return { ...prev, message: res.error, type: "error" };
        });
      }
    }

    getSingleCart();
  }, [id]);


  async function handleRemoveFromCart(productId) {
    const res = await actionRemoveProductFromCart(id, productId);

    if (res.data) {
      setProducts((prev) => {
        return products.filter((prod) => prod.product_id !== productId);
      });

      setCartPrice(res.data.total_price)
    }
    if (res.error) {
      setToast((prev) => {
        return { ...prev, message: res.error, type: "error" };
      });
    }
  }

  async function handleOrderFromCart() {
    const res = await actionOrderProductsFromCart(id);
    if (res) {
      if (res?.error) {
        setToast((prev) => {
          return { ...prev, message: res.error, type: "error" };
        });
      }
    }
  }

  return (
    <>
      {!cart ? (
        <p>Loading...</p>
      ) : (
        <div className="w-3/5 mt-40 mx-auto p-4 rounded shadow">
          <h1 className="text-xl font-bold mb-2">Cart ID: {cart.cart_id}</h1>
          <p className="mb-4 text-md font-semibold">Total Price: {cartPrice}</p>
          <div className="grid grid-cols-3 gap-2">
            {!products.length && (
              <div className="pl-4 border-l-2">
                <p className="text mb-1">Cart is empty</p>
                
              </div>
            )}
            {products.map((prod, idx) => {
              return (
                <div
                  key={idx}
                  className="col-span-1 p-2 bg-blue-100 rounded-sm"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <h1>{prod.name}</h1>
                      <p>{prod.price}</p>
                    </div>
                    <IoCloseCircleOutline
                      onClick={() => handleRemoveFromCart(prod.product_id)}
                      className="text-xl cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-20 items-center mt-8">
            <button
              onClick={handleOrderFromCart}
              className="border-b-2 border-b-black p-2 cursor-pointer disabled:rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={products.length === 0}
            >
              Order Now
            </button>

            <Link href={"/products"} className="p-2 border-b-2 border-b-black">Add More Products</Link>
          </div>

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
