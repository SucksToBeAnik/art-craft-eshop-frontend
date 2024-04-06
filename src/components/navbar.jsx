"use client";

export const dynamic = 'force-dynamic'

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { getCurrentUser } from "@/actions";
import Avatar from "./avatar";
import { useSearchParams } from "next/navigation";
import {actionLogutUser} from "@/actions"
import { FaSpinner } from "react-icons/fa";
import { Suspense } from "react";



const navLinks = {
  Shops: "/shops",
  Products: "/products",
};

function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}


const NavbarComponent = () => {
  const searchParams = useSearchParams()
  const isActive = searchParams.get('active') === 'true'

  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  async function handleLogout(){
    await actionLogutUser()
    setUser({})
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

      {isLoading ? <FaSpinner className="animate-[spin_2s_linear_infinite] inline-block text-xl" /> : isEmpty(user) ? (
        <div className="flex gap-2 justify-center items-center">
          <Link
            href={"/auth/login"}
            className="p-2 rounded shadow bg-blue-400 text-zinc-200"
          >
            SignIn
          </Link>

          <Link
            href="/auth/register"
            className="p-2 rounded shadow border-2 border-blue-400 text-stone-900"
          >
            SignUp
          </Link>
        </div>
      ) : (
        <Avatar email={user.email} image={user.image} callback_fn={handleLogout} />
      )}

      {/* For mobile screen */}
      <div className="hidden"></div>
    </div>
  );
};


const Navbar = ()=> {
  return (
    <Suspense>
      <NavbarComponent />
    </Suspense>
  )
}

export default Navbar;



