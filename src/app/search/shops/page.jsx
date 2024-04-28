"use client";


import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { actionFetchShopsByTerm } from "@/actions";
import { Suspense } from "react";
import Link from "next/link";

const ShopsSearch = () => {
  const params = useSearchParams();
  const term = params.get("term");


  const [shops, setShops] = useState([]);

  useEffect(() => {
    async function searchShops() {
      const res = await actionFetchShopsByTerm(term);
      console.log(res);
      if (res.data) {
        setShops(res.data);
      }
    }

    if (term && term.length >= 3) {
      console.log('test');
      searchShops();
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

      <div className="grid grid-cols-4 gap-4">
        {shops.map((shop, idx) => {
          return (
            <div key={idx} className="col-span-1 p-2 rounded-xl border">
              <h1 className="font-bold">{shop.name}</h1>
              <p className="font-semibold mb-2">Launched on {shop.launch_date.slice(0,10)}</p>
              <p>{shop.description}</p>
              <Link className="mx-auto w-20 mt-4 uppercase font-semibold text-lg text-center border-b-2 border-blue-400 text-blue-400 block" href={`/shops/${shop.shop_id}`}>Visit</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ShopsSearchPage = () => {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ShopsSearch />
    </Suspense>
  );
};

export default ShopsSearchPage;
