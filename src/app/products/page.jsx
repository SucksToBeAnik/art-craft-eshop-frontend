"use client";
import { actionGetFeaturedProducts } from "@/actions";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RiCoinsLine } from "react-icons/ri";




const ProductsPage = () => {
  const [shopWithProducts, setShopWithProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const res = await actionGetFeaturedProducts();

      console.log(res);
      if (res.data) {
        setShopWithProducts(res.data);
      }
    }

    getProducts();
  }, []);

  return (
    <div>
      <h1 className="text-6xl my-4 text-center">Products</h1>
      <div className="w-3/4 mx-auto flex flex-col gap-8">
        {shopWithProducts.map((shop, idx) => {
          return (
            <div key={idx} className="bg-blue-200 rounded-xl shadow-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{shop.name}</h1>
                <Link
                  href={`/shops/${shop.id}`}
                  className="border-b-2 border-b-black uppercase"
                >
                  Visit Shop
                </Link>
              </div>
              <div>
                {shop.products.length !== 0 ? (
                  <ShopFeaturedProducts products={shop.products} />
                ) : (
                  <p>This shop has no featured prodcuts</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;

function ShopFeaturedProducts({ products }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((prod, idx) => {
        return (
          <div key={idx} className="shadow rounded p-2 col-span-1 bg-white">
            <div className="flex justify-between mb-2">
              <h1 className="text-xl font-semibold">{prod.name}</h1>

              <div className="flex justify-center items-center gap-1">
              <RiCoinsLine />
              <p>{prod.price}</p>
              </div>
            </div>

            <p className="p-1 text-xs rounded shadow bg-stone-800 text-white inline-block mb-1">{prod.available ? "available": "not available"}</p>
            <p className="text-sm font-light mb-3">{prod.description}</p>

            <Link href={`/products/${prod.product_id}`} className="mx-auto w-28 block uppercase border-b-2 border-b-black text-center">See Product</Link>
          </div>
        );
      })}
    </div>
  );
}
