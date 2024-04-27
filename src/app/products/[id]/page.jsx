"use client";

import { useEffect, useState } from "react";
import { actionGetSingleProduct } from "@/actions";
import { RiCoinsLine } from "react-icons/ri";
import { CiStar } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { actionAddProductToFavourites } from "@/actions";
import Toast from "@/components/toast";
import Cart from "@/components/cart";

import Image from "next/image";
import Link from "next/link";

const SingleProductPage = ({ params }) => {
  const [product, setProduct] = useState({});
  const [pending, setPending] = useState(true);
  const [productFound, setProductFound] = useState(true);
  const [showCart, setShowCart] = useState(false)
  
  const [toast, setToast] = useState(null)



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

  async function handleAddFavourite(){
    const res = await actionAddProductToFavourites(params.id)
    if(res.data){
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
      {pending ? (
        <p>Loading...</p>
      ) : (
        <>
          {productFound ? (
            <div className="w-3/5 mx-auto rounded p-4 shadow-xl min-h-full">
              <div className="flex justify-between items-center mb-1">
                <h1 className="text-center text-2xl font-bold">
                  {product?.name}
                </h1>

                <div className="flex items-center justify-center gap-2 text-sm">
                  {product?.discount !== 0 && <p className="p-1 pr-2 bg-green-500 rounded text-white shadow">{product?.discount}% SALE</p>}
                  
                  <div className="flex justify-center items-center gap-1 bg-blue-400 p-1 rounded shadow text-white">
                    <RiCoinsLine />
                    <p>{product?.price}</p>
                  </div>
                  <p className="p-1 rounded bg-blue-400 text-white uppercase">
                    {product.available ? "available" : "not available"}
                  </p>
                </div>
              </div>
              <p className="text-sm mb-10 pl-2 ml-4 border-l-2">Belongs to <Link className="border-b-2 border-b-black font-semibold" href={`/shops/${product.owner_shop_id}`}>{product.owner_shop.name}</Link></p>

              <div className="flex justify-between items-start gap-4 mb-8">
                <Image
                  src={"/painting.jpg"}
                  alt="Product Image"
                  width={400}
                  height={400}
                  className=""
                />
                <p className="">{product.description || "This product has no description"}</p>
              </div>

              <div className="flex justify-between items-center w-3/4 mx-auto mb-8 relative">
                <div onClick={handleAddFavourite} className="border-2 cursor-pointer border-blue-400 p-2 rounded shadow flex justify-center items-center gap-2">
                  <CiStar />
                  <span>Add to Favourite</span>
                </div>
                <div onClick={()=>setShowCart(true)} className="border-2 cursor-pointer border-blue-400 p-2 rounded shadow flex justify-center items-center gap-2">
                  <CiShoppingCart />
                  <span>Add to Cart</span>
                </div>

                {showCart && <div className="absolute -right-[465px] -top-[415px]">{<Cart productId={params.id} onShowCart={setShowCart} />}</div>}


              </div>

              {toast && <div className="absolute bottom-2 right-2"><Toast toggleShowToast={()=>setToast(null)} type={toast.type} message={toast.message} /></div>}
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
