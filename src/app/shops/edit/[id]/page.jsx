"use client";

import FieldInput from "@/components/fieldInput";
import SubmitButton from "@/components/submit-button";
import TextAreaInput from "@/components/textAreaInput";
import { actionUpdateShopById, getShopById } from "@/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import Toast from "@/components/toast";

const ShopEditPage = ({ params }) => {
  const { id } = params;
  const [toast, setToast] = useState(null);
  const [shop, setShop] = useState(null);

  const [formState, action] = useFormState(
    actionUpdateShopById.bind(null, id),
    {
      error: null,
    }
  );

  useEffect(() => {
    async function getShop() {
      const res = await getShopById(id);

      if (res) setShop(res);
    }
    getShop();
  }, [id]);

  useEffect(() => {
    if (formState.error) {
      setToast((prev) => {
        return {
          message: formState.error,
          type: "error",
        };
      });
    }
  }, [formState.error]);

  return (
    <>
      {!shop ? (
        <p>Loading...</p>
      ) : (
        <div className="w-3/4 mx-auto p-4 relative">
          <h1 className="text-2xl text-center font-bold mb-8 uppercase">
            Give your shop a new look
          </h1>

          <form
            action={action}
            className="w-3/4 mx-auto space-y-4 shadow-md p-4 rounded"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="pl-2 border-l-4">
                Shop Name
              </label>
              <FieldInput
                name={"name"}
                placeholder={"A new name maybe?"}
                required={false}
                type={"text"}
                defaultValue={shop.name}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="pl-2 border-l-4">
                Description
              </label>
              <TextAreaInput
                name={"description"}
                placeholder={"Say something about your shop"}
                required={false}
                rows={4}
                defaultValue={shop.description}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="pl-2 border-l-4">
                Location
              </label>
              <FieldInput
                name={"location"}
                placeholder={"Where is your shop located?"}
                required={false}
                type={"text"}
                defaultValue={shop.location}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="pl-2 border-l-4">
                Website
              </label>
              <FieldInput
                name={"website"}
                placeholder={"www.test.com"}
                required={false}
                type={"text"}
                defaultValue={shop.website}
              />
            </div>

            <SubmitButton name={"Update Shop"} />
          </form>

          {toast && (
            <div className="absolute bottom-8 -right-64">
              <Toast
                toggleShowToast={() => setToast(null)}
                type={toast.type}
                message={toast.message}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopEditPage;
