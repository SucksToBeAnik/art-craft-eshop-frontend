"use client";

import { actionGetMyBoughtProducts } from "@/actions";
import { useEffect, useState } from "react";
import Image from "next/image";

const MyProductPage = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function getMyProducts() {
      const res = await actionGetMyBoughtProducts();

      if (res.data) {
        setProducts(res.data);
      }
    }

    getMyProducts();
  }, []);

  return (
    <>
      {!products ? (
        <p>Laoding...</p>
      ) : (
        <>
          {products.length === 0 ? (
            <p>You have not bought any products yet.</p>
          ) : (
            <div>
              <h1 className="text-center text-2xl my-4 font-bold">Products Canvas</h1>

              <div className="grid grid-cols-4 gap-8">
                {products.map((prod, idx) => {
                  return <div key={idx} className=" border rounded shadow p-4">
                    <h1 className="text-center mb-2 font-semibold">{prod.name}</h1>
                    <Image src={"/painting.jpg"} alt="Product Image" width={300} height={300} />
                    <p className="text-center p-1 rounded border-2 border-black text-xs mt-4 text-black shadow">Bought at ${Math.floor(prod.price - (prod.price * (prod.discount / 100)))}</p>
                  </div>;
                })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyProductPage;
