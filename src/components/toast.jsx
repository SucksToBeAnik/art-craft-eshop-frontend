"use client";

import { IoCloseCircleOutline } from "react-icons/io5";

const Toast = ({ message, type, toggleShowToast }) => {

  return (
    <>
      
        <div className={`p-2 rounded text-sm shadow text-white ${type === 'error' && 'bg-red-400'} ${type === 'success'  && 'bg-emerald-500'} w-full`}>
          <p className="p-2 pr-4">{message}</p>
          <IoCloseCircleOutline
            onClick={toggleShowToast}
            className="inline-block absolute right-0 top-0 text-2xl cursor-pointer"
          />
        </div>
      
    </>
  );
};

export default Toast;
