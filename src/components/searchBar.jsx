"use client";

import { useSearchParams } from "next/navigation";
import { searchByTerm } from "@/actions";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const searchParams = useSearchParams();


  return (
    <form className="mr-6 relative" action={searchByTerm}>
      <select name="item" id="item" className="absolute rounded p-2 w-20 h-10">
        <option value={"products"}>Product</option>
        <option value={"shops"}>Shops</option>
      </select>
      <input
        type="text"
        name="term"
        id="term"
        defaultValue={searchParams.get("term") || ""}
        className="rounded focus:outline-none p-2 shadow w-80 pl-24"
        placeholder="Search shops, products..."
      />

      <button type="submit" className="absolute right-2 top-2 text-2xl">
        <CiSearch />
      </button>
    </form>
  );
};

export default SearchBar;
