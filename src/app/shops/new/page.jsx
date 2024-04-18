'use client'

import { createShop } from "@/actions";
import {useFormState} from "react-dom"
import FieldInput from "@/components/fieldInput";
import FieldError from "@/components/fieldError";
import SubmitButton from "@/components/submit-button";

const CreateShopPage = () => {
  const [formState, action] = useFormState(createShop, {
    errors: {}
  })

  const formError = formState.errors._form?.join(', ')


  return (
    <div className="flex justify-center items-center mt-10 mb-20">
      <form
        action={action}
        className="flex flex-col gap-2 py-4 px-8 rounded shadow-md w-full md:w-2/4"
      >
        <h1 className="text-4xl text-center font-bold my-4">
          Create a Shop
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="shopName">Shop Name</label>
          <FieldInput type="text" name="shopName" placeholder="Give your shop an unique name" required={true} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <textarea className="rounded focus:outline-none border p-2" type="text" rows={4} name="description" placeholder="Tell us more about your shop" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="location">Location</label>
          <FieldInput type="text" name="location" placeholder="Where is your shop situated" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="website">Website</label>
          <FieldInput type="url" name="website" placeholder="Add an external link if any" />
        </div>

        <SubmitButton name={"Create Shop"} />
        {formError && <FieldError error={formError} />}
      </form>
    </div>
  );
};

export default CreateShopPage;
