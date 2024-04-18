import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-full min-w-screen grid grid-cols-2 p-4">
      <div className="col-span-1 flex flex-col justify-center items-center">
        <h1 className="text-7xl bg-clip-text bg-gradient-to-b from-blue-800 to-blue-400 text-transparent font-bold mb-8 p-2">
          Welcome to Art & Craft Eshop!
        </h1>

        <p className="text-2xl font-semibold text-gray-500">
          We sell the most trending arts and crafts by the most creative of
          people at reasonable price.
        </p>
      </div>

      <div className="col-span-1 flex justify-center items-center">
        <Image
          src="/hero.jpg"
          alt="A shop image"
          width={500}
          height={500}
          className=""
        />
      </div>

      <div className="col-span-2 flex gap-8 justify-center items-center text-xl">
        <Link href={"/shops"} className="border-b-2 border-blue-400 p-2 rounded shadow">Visit Shops</Link>
        <Link href={"/products"} className="border-b-2 border-blue-400 p-2 rounded shadow">Find Products</Link>
      </div>
    </div>
  );
};

export default Page;
