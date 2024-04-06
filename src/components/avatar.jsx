"use client";

import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const Avatar = ({ email, image, callback_fn }) => {
  const [modalOpen, setModalOpen] = useState(false);

  

  return (
    <div
      className="h-8 w-8 rounded-full shadow-2xl cursor-pointer relative"
      onClick={() => setModalOpen((prev) => !prev)}
    >
      {image ? (
        <Image src={image} fill alt="Avatar image" />
      ) : (
        <RxAvatar className="w-full h-full text-blue-400" />
      )}

      {modalOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 p-3 rounded mt-4 border-2 z-20 bg-gray-100 shadow-md space-y-4 cursor-default">
          <div className="flex gap-2 items-center justify-start">
            <MdEmail className="text-xl" />
            <p>{email}</p>
          </div>
          <div className="flex gap-2 items-center justify-start">
            <BiLogOutCircle className="text-xl" />
            <button onClick={callback_fn}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
