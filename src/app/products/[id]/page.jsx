"use client";

import { useEffect, useState } from "react";
import { actionGetSingleProduct } from "@/actions";
import { RiCoinsLine } from "react-icons/ri";
import Image from "next/image";

const SingleProductPage = ({ params }) => {
  const [product, setProduct] = useState({});
  const [pending, setPending] = useState(true);
  const [productFound, setProductFound] = useState(true);

  useEffect(() => {
    async function getProduct() {
      const res = await actionGetSingleProduct(params.id);
      if (res.data) {
        setProduct(res.data);
      } else {
        setProductFound(false);
      }

      setPending(false);
    }
    getProduct();
  }, [params.id]);

  return (
    <>
      {pending ? (
        <p>Loading...</p>
      ) : (
        <>
          {productFound ? (
            <div className="w-3/4 mx-auto border rounded p-4">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-center text-3xl font-bold">
                  {product?.name}
                </h1>

                <div className="flex items-center justify-center gap-2">
                  <div className="flex justify-center items-center gap-1 bg-blue-400 p-2 rounded shadow text-white">
                    <RiCoinsLine />
                    <p>{product?.price}</p>
                  </div>
                  <p className="p-2 rounded bg-blue-400 text-white uppercase">
                    {product.available ? "available" : "not available"}
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-start gap-4 mb-8">
                <Image
                  src={"/painting.jpg"}
                  alt="Product Image"
                  width={500}
                  height={500}
                  className="shadow rounded"
                />
                <p className="text-xl">{product.description}</p>
              </div>

              <div className="flex justify-between items-center w-3/4 mx-auto">
                <button className="border-2 border-blue-400 p-2 rounded shadow">
                  Add to Favourite
                </button>
                <button className="border-2 border-blue-400 p-2 rounded shadow">
                  Add to Cart
                </button>
              </div>
            </div>
          ) : (
            <p>There is no such Product</p>
          )}
        </>
      )}
    </>
  );
};

export default SingleProductPage;
