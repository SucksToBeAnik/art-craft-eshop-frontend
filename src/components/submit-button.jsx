"use client";

import { FaSpinner } from "react-icons/fa";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ name }) => {
  let {pending} = useFormStatus();

  return (
    <button
      type="submit"
      className="p-2 my-3 rounded shadow border-2 border-blue-400 text-black"
    >
      <span className="pr-2">{name}</span>
      {pending && <FaSpinner className="animate-[spin_2s_linear_infinite] inline-block text-xl" />}
    </button>
  );
};

export default SubmitButton;
