"use client";

import { getShopById } from "@/actions";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RiCoinsLine } from "react-icons/ri";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { IoArrowDownCircleOutline } from "react-icons/io5";

const ShopPage = ({ params }) => {
  const [shop, setShop] = useState({});
  const [products, setProducts] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    async function getShop() {
      const data = await getShopById(params.id);
      setShop(data);
      setProducts((prev) => [...prev, ...data.products]);
      setPending(false);
    }
    getShop();
  }, [params.id]);

  return (
    <>
      {pending ? (
        <p>Loading...</p>
      ) : (
        <div className="p-4">
          <h1 className="text-4xl text-center">Welcome to {shop.name}</h1>

          <div className="grid grid-cols-2 gap-8 px-4 py-12 min-h-full">
            <Image
              src={"/shop.jpg"}
              width={600}
              height={600}
              alt="Shop Image"
              className="rounded shadow"
            />

            <div className="col-span-1 space-y-4">
              <div className="flex justify-start gap-4 items-center">
                <p className="bg-blue-400 text-white rounded shadow p-2 inline-block">
                  Total products{" "}
                  <span className="px-2 py-1 bg-white text-blue-400 rounded-xl text-sm font-semibold">
                    {products.length}
                  </span>
                </p>

                <div className="flex cursor-pointer justify-center items-center gap-1 border-b-2 border-blue-400 p-2 rounded shadow-md">
                  <CiCirclePlus className="text-2xl font-semibold" />
                  <button className="">Add Product</button>
                </div>
              </div>
              <p className="text-md text-gray-500">{shop.description}</p>
            </div>

            <div className="col-span-2">

            <a href={"#shopProducts"} className="block w-full my-8 mx-auto">
              <IoArrowDownCircleOutline className="text-4xl font-semibold mx-auto animate-bounce" />
            </a>
            </div>

          </div>

          <div id="shopProducts" className="grid grid-cols-3 gap-6">
            {products.map((product) => {
              return <ShopProduct key={product.product_id} product={product} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

const ShopProduct = ({ product }) => {
  return (
    <div className="shadow-xl rounded-xl col-span-1 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">{product.name}</h1>
        <div className="flex justify-center items-center gap-1 bg-blue-400 rounded p-1 text-white">
          <RiCoinsLine className="text-xl" />
          <p>{product.price}</p>
        </div>
      </div>

      <Image
        src={"/product.jpg"}
        alt="General Product Image"
        height={300}
        width={400}
      />

      <div className="rounded shadow bg-blue-400 text-white p-4 pt-8">
        <span className="bg-white text-blue-400 p-2 rounded shadow mr-4">
          {product.product_type}
        </span>
        <span className="bg-white text-blue-400 p-2 rounded shadow">
          {product.available ? "AVAILABLE" : "NOT AVAILABLE"}
        </span>

        <p className="mt-6 mb-2">{product.description}</p>
      </div>

      <div className="flex justify-between items-center mt-8 px-8">
        <Link
          className="p-2 border-b-2 border-blue-400"
          href={`/products/${product.product_id}`}
        >
          DETAILS
        </Link>

        <div className="flex justify-center items-center gap-1 p-2 border-b-2 border-blue-400 cursor-pointer">
          <CiShoppingCart className="text-xl" />
          <button>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
