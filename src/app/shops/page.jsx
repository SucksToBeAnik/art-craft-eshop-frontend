import { getShops } from "@/actions/shops_action";
import { RxAvatar } from "react-icons/rx";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import Link from "next/link";

import Image from "next/image";

const ShopsPage = async () => {
  const shops = await getShops();

  let renderedShops = null;

  if (shops) {
    renderedShops = shops.map((shop) => {
      return (
        <div
          key={shop.shop_id}
          className="rounded shadow-md col-span-1 p-4 bg-blue-500 text-white flex flex-col"
        >
          <div className="h-full">
            <h1 className="text-xl font-semibold uppercase">
              {shop.name}
            </h1>
            <div className="flex justify-start items-center gap-2 mt-4">
              <div className="flex gap-1 justify-center items-center bg-white p-1 text-sm text-black rounded shadow">
                <RxAvatar className="text-2xl" />
                <span>{shop.owner.full_name}</span>
              </div>
              <p className="bg-white p-1 text-sm text-black rounded shadow inline-block">
                Launched on {shop.launch_date.slice(0, 10)}
              </p>
            </div>

            <Image
              src={"/shop.jpg"}
              height={300}
              width={300}
              className="w-full rounded my-4"
              alt="Shop Image"
            />

            <p className="text-md font-semibold line-clamp-3 pl-2 border-l-2">
              {shop.description
                ? shop.description
                : "This shop has no description"}
            </p>

            {shop.location && (
              <p className="text-sm pl-2 border-l-2">
                You can find us at
                <span className="font-semibold"> {shop.location}</span>{" "}
              </p>
            )}
          </div>

          <div className="flex justify-center items-center mt-1">
            <Link
              href={`/shops/${shop.shop_id}`}
              className="bg-white text-black rounded-md shadow-md py-2 inline-block w-full text-center text-sm font-semibold mt-4"
            >
              VISIT SHOP
            </Link>
          </div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-7xl w-3/4 mx-auto bg-clip-text bg-gradient-to-b from-blue-800 to-blue-400 text-transparent font-bold">
            Launch your very own custom shop today!
          </h1>
          <h2 className="text-5xl w-3/4 mx-auto mt-6 text-gray-500">
            Or get inspired by the ones set by thousands of sellers!
          </h2>
          <Link
            href={"/shops/new"}
            className="mx-auto mt-12 bg-blue-400 rounded text-white p-4 text-xl uppercase"
          >
            Launch Now
          </Link>
          <a href={"#shops"} className="block w-full my-8">
            <IoArrowDownCircleOutline className="text-4xl font-semibold mx-auto animate-bounce" />
          </a>
        </div>
      </div>
      <div id="shops" className="grid grid-cols-3 gap-8 min-h-[550px] py-8">
        {renderedShops}
      </div>
    </div>
  );
};

export default ShopsPage;
