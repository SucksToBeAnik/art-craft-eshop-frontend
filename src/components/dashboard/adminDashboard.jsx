import FieldInput from "../fieldInput";
import SubmitButton from "../submit-button";
import { useFormState } from "react-dom";
import { actionDeleteShopByName, actionDeleteProductByName } from "@/actions";
import Toast from "../toast";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [shopFormState, shopAction] = useFormState(actionDeleteShopByName, {
    data: null,
    error: null,
    random: null,
  });
  const [productFormState, productAction] = useFormState(
    actionDeleteProductByName,
    {
      data: null,
      error: null,
      random: null,
    }
  );

  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (shopFormState.data) {
      setToast((prev) => {
        return { ...prev, message: shopFormState.data, type: "success" };
      });
    }
    if (shopFormState.error) {
      setToast((prev) => {
        return { ...prev, message: shopFormState.error, type: "error" };
      });
    }
    if (productFormState.data) {
      setToast((prev) => {
        return { ...prev, message: productFormState.data, type: "success" };
      });
    }
    if (productFormState.error) {
      setToast((prev) => {
        return { ...prev, message: productFormState.error, type: "error" };
      });
    }
  }, [
    shopFormState.data,
    shopFormState.error,
    shopFormState.random,
    productFormState.data,
    productFormState.error,
    productFormState.random,
  ]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-1 border-l-2 p-2 pl-4">
        <h1 className="text-md font-semibold mb-4">Delete Shops</h1>

        <form action={shopAction}>
          <div className="flex justify-center items-center gap-2">
            <FieldInput
              name={"shopName"}
              required={true}
              placeholder={"Enter a Shop name to delete"}
            />
            <SubmitButton name={"Delete"} />
          </div>
        </form>
      </div>

      <div className="col-span-1 border-l-2 p-2 pl-4">
        <h1 className="text-md font-semibold mb-4">Delete Products</h1>

        <form action={productAction}>
          <div className="flex justify-center items-center gap-2">
            <FieldInput
              name={"productName"}
              required={true}
              placeholder={"Enter a Product name to delete"}
            />
            <SubmitButton name={"Delete"} />
          </div>
        </form>
      </div>

      {toast && (
        <div className="absolute bottom-1 right-1">
          <Toast
            message={toast.message}
            type={toast.type}
            toggleShowToast={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
