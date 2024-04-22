"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { getCurrentUser } from "@/actions";
import Avatar from "./avatar";
import { useSearchParams } from "next/navigation";
import { actionLogutUser } from "@/actions";
import { FaSpinner } from "react-icons/fa";
import { Suspense } from "react";

const navLinks = {
  Shops: "/shops",
  Products: "/products",
};

const NavbarComponent = () => {
  const searchParams = useSearchParams();
  const isActive = searchParams.get("active") === "true";

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    await actionLogutUser();
    setUser({});
  }

  useEffect(() => {
    async function getUser() {
      setIsLoading(true);
      const user_data = await getCurrentUser();
      if (user_data) {
        setUser(user_data);
      }
      setIsLoading(false);
    }
    getUser();
  }, [isActive]);

  const renderedNavLinks = useMemo(() => {
    const navLinkArray = [];
    Object.keys(navLinks).forEach((linkName) => {
      const linkUrl = navLinks[linkName];
      const linkComponent = (
        <Link
          key={linkUrl}
          href={linkUrl}
          className="p-2 rounded bg-transparent border-2 border-blue-400 text-blue-400"
        >
          {linkName}
        </Link>
      );

      navLinkArray.push(linkComponent);
    });

    return navLinkArray;
  }, []);

  return (
    <div className="flex flex-row p-4 justify-between items-center gap-2 shadow-md rounded my-4">
      <div>
        <Link href={"/"}>
          <HiOutlineShoppingBag className="text-5xl text-white rounded-full p-2 bg-blue-400 shadow-md" />
        </Link>
      </div>

      <div className="flex gap-12 justify-center items-center w-full grow">
        {renderedNavLinks}
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

      {isLoading ? (
        <FaSpinner className="animate-[spin_2s_linear_infinite] inline-block text-xl w-8" />
      ) : (
        <Avatar user={user} callback_fn={handleLogout} />
      )}

      {/* For mobile screen */}
      <div className="hidden"></div>
    </div>
  );
};

const Navbar = () => {
  return (
    <Suspense>
      <NavbarComponent />
    </Suspense>
  );
};

export default Navbar;
