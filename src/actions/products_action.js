"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "./auth_action";

export async function actionCreateProduct(shopId, formState, formData) {
  try {
    const token = cookies().get("token");
    const header = new Headers();
    header.append("Authorization", `Bearer ${token.value}`);
    header.append("Content-Type", "application/json");

    const res = await fetch(`${process.env.API_URL}/products/new`, {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        name: formData.get("productName"),
        description: formData.get("description"),
        manufacturer: formData.get("manufacturer"),
        price: formData.get("price"),
        discount: formData.get("discount") || null,
        product_type: formData.get("productType"),
        owner_shop_id: shopId,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.detail[0]?.msg);
    }
  } catch (error) {
    return {
      errors: {
        _form: [error.toString()],
      },
    };
  }

  revalidatePath(`/shops/${shopId}`, "page");
  redirect(`/products`);
}

export async function actionGetFeaturedProducts(page, formState) {
  let skip;
  page === 1 ? (skip = 0) : (skip = page * 5);
  try {
    const res = await fetch(
      `${process.env.API_URL}/shops?limit=5&skip=${skip}`
    );

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();

    console.log(data);
  } catch (error) {
    return {
      data: [],
      error: error.toString(),
    };
  }
}

export async function actionDeleteProduct(id) {
  try {
    const user = await getCurrentUser();
    const token = cookies().get("token");
    const header = new Headers();
    header.append("Authorization", `Bearer ${token.value}`);

    if (user) {
      const res = await fetch(
        `${process.env.API_URL}/products/${id}?owner_id=${user.user_id}`,
        {
          method: "delete",
          headers: header,
        }
      );

      if (!res.ok) throw new Error("Something went wrong");
      return true;
    } else {
      throw new Error("You are not logged in!");
    }
  } catch (error) {
    return false;
  }
}
