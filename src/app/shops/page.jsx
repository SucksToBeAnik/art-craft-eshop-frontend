import { getShops } from "@/actions/shops_action";
import { RxAvatar } from "react-icons/rx";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import Link from "next/link";

import Image from "next/image";

const ShopsPage = async () => {
  const shops = await getShops();
  const renderedShops = shops.map((shop) => {
    return (
      <div
        key={shop.shop_id}
        className="rounded shadow-md col-span-1 p-4 bg-blue-400 text-white flex flex-col"
      >
        <div className="flex-1">
          <div className="flex justify-between items-center gap-2">
            <h1 className="text-2xl font-semibold text-center uppercase">
              {shop.name}
            </h1>

            <div className="flex gap-1 justify-center items-center">
              <RxAvatar className="text-2xl" />
              <span>{shop.owner.full_name}</span>
            </div>
          </div>
          <p className="bg-white p-1 text-sm text-black rounded shadow inline-block mt-4">
            Launched on {shop.launch_date.slice(0, 10)}
          </p>

          <Image
            src={"/shop.jpg"}
            height={300}
            width={300}
            className="w-full rounded my-4"
            alt="Shop Image"
          />

          <p className="text-lg">
            {shop.description
              ? shop.description
              : "This shop has no description"}
          </p>

          {shop.location && (
            <p className="text-md">
              You can find us at
              <span className="font-semibold"> {shop.location}</span>{" "}
            </p>
          )}
        </div>

        <div className="flex justify-center items-center mt-4">
          <Link
            href={`/shops/${shop.shop_id}`}
            className="bg-white text-black rounded-md shadow-md p-2 inline-block w-full text-center text-md font-semibold"
          >
            VISIT SHOP
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-7xl w-3/4 mx-auto bg-clip-text bg-gradient-to-b from-blue-800 to-blue-400 text-transparent font-bold">
            Launch your very own custom shop today! 
          </h1>
          <h2 className="text-5xl w-3/4 mx-auto mt-6 text-gray-500">
          Or get inspired by the ones
            set by thousands of sellers!
          </h2>
          <Link href={"/shops/new"} className="mx-auto mt-12 bg-blue-400 rounded text-white p-4 text-xl uppercase">Launch Now</Link>
          <a href={"#shops"} className="block w-full my-8">
            <IoArrowDownCircleOutline className="text-4xl font-semibold mx-auto animate-bounce" />
          </a>
        </div>
      </div>
      <div id="shops" className="grid grid-cols-3 gap-4 min-h-screen py-8">
        {renderedShops}
      </div>
      ;
    </div>
  );
};

export default ShopsPage;
