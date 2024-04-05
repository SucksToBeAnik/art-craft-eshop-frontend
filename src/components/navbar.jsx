"use client";

import Link from "next/link";
import { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";

const navLinks = {
  Shops: "/shops",
  Products: "/products",
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-row p-4 justify-between items-center gap-2 shadow my-4 rounded">
      <div>
        <Link href={"/"}>
          <HiOutlineShoppingBag className="text-5xl text-white rounded-full p-2 bg-blue-400 shadow-md" />
        </Link>
      </div>
      <div>
        {Object.keys(navLinks).forEach((linkName) => {
          const linkUrl = navLinks[linkName];

          return (
            <Link
              href={linkUrl}
              className="p-2 shadow rounded bg-stone-900 text-zinc-200"
            >
              {linkName}
            </Link>
          );
        })}
      </div>

      <form className="flex justify-center items-center gap-2 -translate-x-24">
        <button type="submit" className="text-2xl">
          <CiSearch />
        </button>
        <input
          type="text"
          className="rounded focus:outline-none p-2 shadow"
          placeholder="Search shops, products..."
        />
      </form>

      <div className="flex gap-2 justify-center items-center">
        <button className="p-2 rounded shadow bg-blue-400 text-zinc-200">
          <Link href={"/auth/login"}>SignIn</Link>
        </button>
        <button className="p-2 rounded shadow border-2 border-blue-400 text-stone-900">
          <Link href="/auth/register">SignUp</Link>
        </button>
      </div>

      {/* For mobile screen */}
      <div className="hidden"></div>
    </div>
  );
};

export default Navbar;
