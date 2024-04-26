"use client";

import { FaSpinner } from "react-icons/fa";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ name }) => {
  let {pending} = useFormStatus();

  return (
    <button
      type="submit"
      className="p-2 my-3 rounded shadow border-2 border-blue-400 text-black flex justify-center items-center gap-1"
    >
      <span className="text-md">{name}</span>
      {pending && <FaSpinner className="animate-[spin_2s_linear_infinite] inline-block text-md" />}
    </button>
  );
};

export default SubmitButton;
