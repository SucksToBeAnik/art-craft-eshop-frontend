"use client";

import {
  actionGetCartList,
  actionAddProductToCart,
  actionCreateCart,
} from "@/actions";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Toast from "./toast";
import Link from "next/link";

const Cart = ({ onShowCart, productId }) => {
  const [carts, setCarts] = useState([]);
  const [cartProducts, setCartProducts] = useState({});
  const [pending, setPending] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setPending(true);
    async function getCarts() {
      const res = await actionGetCartList();

      if (res.data) {
        setCarts(res.data);
        for (const cart of res.data) {
          const cartId = cart.cart_id;
          setCartProducts((prev) => {
            return {
              ...prev,
              [cartId]: cart.products,
            };
          });
        }
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

  async function handleAddProductToCart(cartId) {
    const res = await actionAddProductToCart(cartId, productId);
    if (res.data) {
      setToast((prev) => {
        return { ...prev, message: "Product added to Cart", type: "success" };
      });

      setCartProducts((prev) => {
        return {
          ...prev,
          [cartId]: res.data.products,
        };
      });
    }
    if (res.error) {
      setToast((prev) => {
        return { ...prev, message: res.error, type: "error" };
      });
    }
  }

  async function handleCreateCart() {
    const res = await actionCreateCart();
    if (res.data) {
      setCarts((prev) => {
        return [...prev, res.data];
      });

      setCartProducts((prev) => {
        return {
          ...prev,
          [res.data.cart_id]: res.data.products,
        };
      });
    }

    if (res.error) {
      setToast((prev) => {
        return { ...prev, message: res.error, type: "error" };
      });
    }
  }

  console.log(cartProducts);

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
                      {cartProducts[cart.cart_id].length ? null : (
                        <p className="text-sm col-span-3">No products added to cart</p>
                      )}
                      {cartProducts[cart.cart_id].map((prod, idx) => {
                        return (
                          <p
                            key={idx}
                            className="col-span-1 bg-white text-black p-1 rounded text-xs font-light"
                          >
                            {prod.name}
                          </p>
                        );
                      })}
                    </div>
                    <div className="flex justify-between items-center w-full mt-2">
                      <button
                        onClick={() => handleAddProductToCart(cart.cart_id)}
                        className="border-b-2 text-sm border-b-black"
                      >
                        Add this Product
                      </button>
                      <Link
                        href={`/carts/${cart.cart_id}`}
                        className="border-b-2 text-sm border-b-black"
                      >
                        View Cart
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={handleCreateCart}
              className="w-3/4 bg-white text-black my-2 border-2 p-2 rounded block mx-auto"
            >
              Create New Cart
            </button>

            {toast && (
              <div className="absolute bottom-2 right-2">
                <Toast
                  toggleShowToast={() => setToast(null)}
                  type={toast.type}
                  message={toast.message}
                />
              </div>
            )}
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
