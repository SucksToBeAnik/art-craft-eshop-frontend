"use server";
import { cookies } from "next/headers";

export async function actionDeleteShopByName(formState, formData) {
  const shopName = formData.get("shopName");

  try {
    const token = cookies().get("token");
    const header = new Headers();
    header.append("Authorization", `Bearer ${token.value}`);

    const res = await fetch(`${process.env.API_URL}/shops/name/${shopName}`, {
      method: "DELETE",
      headers: header,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.detail[0].msg);
    }

    return {
      data: "Shop Deleted",
      error: null,
      random: Math.random()
    };
  } catch (error) {
    return {
      data: null,
      error: error.toString(),
      random:Math.random()
    };
  }
}
export async function actionDeleteProductByName(formState, formData) {
  const productName = formData.get("productName");

  try {
    const token = cookies().get("token");
    const header = new Headers();
    header.append("Authorization", `Bearer ${token.value}`);

    const res = await fetch(`${process.env.API_URL}/products/name/${productName}`, {
      method: "DELETE",
      headers: header,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.detail[0].msg);
    }

    return {
      data: "Product Deleted",
      error: null,
      random: Math.random()
    };
  } catch (error) {
    return {
      data: null,
      error: error.toString(),
      random:Math.random()
    };
  }
}
