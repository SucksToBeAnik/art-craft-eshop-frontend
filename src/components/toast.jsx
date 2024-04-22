"use client";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const Toast = ({ message }) => {
  const [showToast, setShowToast] = useState(true);

  return (
    <>
      {showToast ? (
        <div className="absolute bottom-0 right-0">
          <div className="flex justify-between p-2 rounded shadow bg-blue-400 text-white">
            <p>{message}</p>
            <IoCloseCircleOutline onClick={()=>setShowToast(prev=>!prev)} className="inline-block absolute" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Toast;
