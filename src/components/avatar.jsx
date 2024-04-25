"use client";

import { RxAvatar } from "react-icons/rx";
import { RiCoinsLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";
import Link from "next/link";
import { CiCircleCheck } from "react-icons/ci";
import { switchUserType } from "@/actions";
import { MdOutlineDashboard } from "react-icons/md";

function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

const Avatar = ({ user, callback_fn }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    if (isEmpty(user)) {
      setUserType(null);
    } else {
      setUserType(user.user_type);
    }
  }, [user]);

  async function handleSwitch() {
    const switchedType = await switchUserType();
    if (switchedType) setUserType(switchedType);
  }

  return (
    <div
      className="h-8 w-8 rounded-full shadow-2xl cursor-pointer relative"
      onClick={() => {
        setModalOpen((prev) => !prev);
      }}
    >
      <RxAvatar
        className={`w-full h-full ${
          isEmpty(user) ? "text-red-400" : "text-blue-400"
        }`}
      />

      {modalOpen &&
        (isEmpty(user) ? (
          <div className="absolute left-1/2 -translate-x-1/2 p-3 rounded mt-6 border-2 z-20 bg-gray-100 shadow-md space-y-4 cursor-default">
            <Link
              href={"/auth/login"}
              className="flex gap-2 items-center justify-center border-2 border-blue-400 cursor-pointer rounded p-2"
            >
              <FaSignInAlt className="text-xl" />
              <span>SiginIn</span>
            </Link>
          </div>
        ) : (
          <div className="absolute left-1/2 -translate-x-1/2 p-3 rounded mt-6 border-2 z-20 bg-gray-100 shadow-md space-y-4 cursor-default">
            <div className="flex gap-2 items-center justify-start">
              <CiCircleCheck className="text-xl text-emerald-600" />
              <p className="text-emerald-600">{userType}</p>
              <AiOutlineUserSwitch
                onClick={handleSwitch}
                className="ml-auto border-2 rounded-full p-1 w-8 h-8 shadow cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center">
              <Link href={"/dashboard"} className="flex gap-2 justify-center items-center text-emerald-600 border-b-2 border-b-emerald-600">
                <MdOutlineDashboard />
                <span>Dashboard</span>
              </Link>
              <div className="flex gap-2 items-center justify-start">
                <RiCoinsLine className="text-xl" />
                <p>{user.balance}</p>
              </div>
            </div>

            <div className="flex gap-2 items-center justify-start">
              <MdEmail className="text-xl" />
              <p>{user.email}</p>
            </div>
            <div
              onClick={callback_fn}
              className="flex gap-2 items-center justify-center border-2 border-red-400 cursor-pointer rounded p-2"
            >
              <BiLogOutCircle className="text-xl" />
              <button>Logout</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Avatar;
