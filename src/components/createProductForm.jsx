"use client";
import FieldInput from "./fieldInput";
import TextAreaInput from "./textAreaInput";

import { IoCloseCircleOutline } from "react-icons/io5";
import { useFormState } from "react-dom";
import { actionCreateProduct } from "@/actions";
import SubmitButton from "./submit-button";
import FieldError from "./fieldError";

const CreateProductForm = ({ shopId, handleCloseForm }) => {
  
  const [formState, action] = useFormState(
    actionCreateProduct.bind(null, shopId),
    {
      errors: {},
    }
  );

  let formError = null;
  if (formState) formError = formState.errors?._form?.join(", ");

  return (
    <form
      action={action}
      className="flex flex-col gap-2 py-2 px-8 rounded shadow-md w-full relative z-40 bg-zinc-100 border-2"
    >
      <IoCloseCircleOutline
        className="absolute right-2 top-2 text-2xl cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleCloseForm();
        }}
      />
      <h1 className="text-2xl mb-2 text-center">Add a new Product</h1>

      <div className="flex flex-col gap-1 mb-1">
        <label htmlFor="productName">Product Name</label>
        <FieldInput
          name={"productName"}
          type={"text"}
          required={true}
          placeholder={"Name of the product"}
        />
      </div>
      <div className="flex flex-col gap-2 mb-1">
        <label htmlFor="price">Price</label>
        <FieldInput
          name={"price"}
          type={"number"}
          required={true}
          placeholder={"Price of the product"}
        />
      </div>

      <div className="flex flex-col gap-2 mb-1">
        <label htmlFor="description">Description</label>
        <TextAreaInput
          name={"description"}
          placeholder={"Tell more about the product"}
          required={false}
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-2 mb-1">
        <label htmlFor="manufacturer">Manfacturer</label>
        <FieldInput
          name={"manufacturer"}
          type={"text"}
          required={true}
          placeholder={"Creator of the work"}
        />
      </div>
      <div className="flex gap-1 justify-center items-center">
        <FieldInput
          name={"discount"}
          type={"number"}
          required={false}
          placeholder={"Discount Percentage"}
        />
        <select
          className="p-2 rounded shadow"
          id="productType"
          name="productType"
        >
          <option value={"ARTWORK"}>ARTWORK</option>
          <option value={"SCULPTURE"}>SCULPTURE</option>
          <option value={"OTHER"}>OTHER</option>
        </select>
      </div>

      {formError && <FieldError error={formError} />}

      <SubmitButton name={"Save"} />
    </form>
  );
};

export default CreateProductForm;
