"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { actionFetchProductsByTerm } from "@/actions";
import { Suspense } from "react";
import Link from "next/link";

const ProductsSearch = () => {
  const params = useSearchParams();
  const term = params.get("term");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function searchProducts() {
      const res = await actionFetchProductsByTerm(term);
      if (res.data) {
        setProducts(res.data);
      }
    }

    if (term && term.length >= 3) {
      searchProducts();
    }
  }, [term]);


  
  if (!term) {
    return (
      <div>
        <h1>No keywords to search</h1>
      </div>
    );
  } else if (term.length < 3) {
    return (
      <div>
        <h1>Search Keywords should at least be 3 characters long</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">
        Search results for{" "}
        <span className="text-blue-400 font-semibold">{term}</span>
      </h1>
      
      <div className="grid gap-2 grid-cols-4">
        {products.map((prod, idx) => {
          return (
            <div key={idx} className="p-2 rounded shadow col-span-1">
              <h1 className="mb-2 font-bold">{prod.name}</h1>
              <div className="flex justify-start gap-2 items-center">
                <p className="font-semibold uppercase p-1 bg-blue-400 text-white rounded inline-block text-xs">
                  {prod.available ? "available" : "not available"}
                </p>
                <p className="bg-blue-400 p-1 rounded text-white text-xs">{prod.price}</p>
              </div>

              <Link className="mx-auto w-20 mt-4 uppercase font-semibold text-lg text-center border-b-2 border-blue-400 text-blue-400 block" href={`/products/${prod.product_id}`}>Details</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProductSearchPage = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ProductsSearch />
    </Suspense>
  );
};

export default ProductSearchPage;
