"use client";

import { actionDeleteProduct, getShopById } from "@/actions";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RiCoinsLine } from "react-icons/ri";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import CreateProductForm from "@/components/createProductForm";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

const ShopPage = ({ params }) => {
  const [shop, setShop] = useState({});
  const [products, setProducts] = useState([]);
  const [pending, setPending] = useState(true);
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [deletePending, setDeletePending] = useState(false);

  useEffect(() => {
    async function getShop() {
      const data = await getShopById(params.id);
      if (data) setShop(data);

      if (data) {
        if (data?.products) setProducts((prev) => [...data.products]);
      }
      setPending(false);
    }
    getShop();
  }, [params.id]);

  function handleProductCreateForm() {
    setProductFormOpen((prev) => {
      return !prev;
    });
  }

  async function handleDeleteProduct(id) {
    setDeletePending(true);
    const deleted = await actionDeleteProduct(id);
    if (deleted) {
      setProducts((prev) => {
        const newProducts = prev.filter((product) => product.product_id !== id);

        console.log(newProducts);
        return newProducts;
      });
    }

    setDeletePending(false);
  }

  return (
    <>
      {pending ? (
        <p>Loading...</p>
      ) : (
        <div className="p-4">
          <h1 className="text-3xl text-center font-bold mb-2">
            Welcome to {shop?.name}
          </h1>
          <h3 className="text-xl text-center font-normal mb-6">
            I am {shop?.owner?.full_name}. Owner of this shop.
          </h3>

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

                <div className="relative">
                  <div
                    onClick={handleProductCreateForm}
                    className="flex cursor-pointer justify-center items-center gap-1 border-b-2 border-blue-400 p-2 rounded shadow-md"
                  >
                    <CiCirclePlus className="text-2xl font-semibold" />
                    <button className="">Add Product</button>
                  </div>

                  <div
                    className={`absolute -top-20 left-36 w-96 rounded ${
                      !productFormOpen && "hidden"
                    }`}
                  >
                    {productFormOpen && (
                      <CreateProductForm
                        shopId={params.id}
                        handleCloseForm={handleProductCreateForm}
                      />
                    )}
                  </div>
                </div>
              </div>
              <p className="text-md text-gray-500">{shop?.description}</p>

              <div className="flex justify-start items-center gap-2">
                {shop?.website && (
                  <span className="p-1 text-sm rounded bg-blue-400 text-white">
                    {shop?.website}
                  </span>
                )}
                {shop?.location && (
                  <span className="p-1 text-sm rounded bg-blue-400 text-white">
                    {shop?.location}
                  </span>
                )}
              </div>
            </div>

            <div className="col-span-2">
              <a href={"#shopProducts"} className="block w-full my-8 mx-auto">
                <IoArrowDownCircleOutline className="text-4xl font-semibold mx-auto animate-bounce" />
              </a>
            </div>
          </div>

          <div id="shopProducts" className="grid grid-cols-3 gap-6">
            {products.map((product, idx) => {
              return (
                <ShopProduct
                  key={idx}
                  product={product}
                  onDeleteProduct={() =>
                    handleDeleteProduct(product.product_id)
                  }
                  pending={deletePending}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

const ShopProduct = ({ product, onDeleteProduct, pending }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleShowDeleteConfirm() {
    setShowDeleteConfirm((prev) => !prev);
  }

  function handleDelete() {
    onDeleteProduct();
  }

  useEffect(() => {
    if (!pending) {
      setShowDeleteConfirm(false);
    }
  }, [pending]);

  return (
    <div className="shadow-xl rounded-xl col-span-1 p-4 border">
      <div className="flex justify-between items-start mb-2">
        <h1 className="text-xl font-semibold">{product.name}</h1>

        <div className="flex justify-center items-center gap-2 text-sm">
          {product?.discount !== 0 && (
            <p className="p-1 pr-2 bg-green-500 rounded text-white shadow">
              {product?.discount}% SALE
            </p>
          )}
          <div className="flex justify-center items-center gap-1 bg-blue-400 rounded p-1 text-white">
            <RiCoinsLine className="text-sm" />
            <p>{product.price}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2 mb-4">
        <span className="bg-blue-200 rounded text-xs p-1">
          {product.product_type}
        </span>
        <p className="text-sm">
          manufactured by <span className="italic">{product.manufacturer}</span>
        </p>
      </div>

      <Image
        src={"/painting.jpg"}
        alt="General Product Image"
        height={300}
        width={400}
      />

      <p className="my-4 pl-5 border-l-2">
        {product.description || "This product has no description"}
      </p>

      <div className="flex justify-between items-center mt-8 relative">
        <Link
          className="p-2 border-b-2 border-blue-400"
          href={`/products/${product.product_id}`}
        >
          DETAILS
        </Link>

        <span className="bg-white text-blue-400 p-2 rounded shadow">
          {product.available ? "AVAILABLE" : "NOT AVAILABLE"}
        </span>
        <FaRegTrashCan
          onClick={handleShowDeleteConfirm}
          className="inline-block absolute rounded-full p-2 text-4xl cursor-pointer bg-blue-400 text-white font-bold border-2 left-1/2 -translate-x-8 bottom-0"
        />

        {showDeleteConfirm && (
          <div className="absolute p-2 rounded shadow bg-red-400 text-white bottom-12 left-4 z-20 space-y-2">
            <p>Are you sure you want to delete this product?</p>
            <div
              onClick={handleDelete}
              className="flex gap-2 justify-center items-center bg-white p-1 rounded text-sm text-red-400 w-full cursor-pointer"
            >
              <button>Confirm</button>
              {pending && <FaSpinner className="animate-spin" />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
