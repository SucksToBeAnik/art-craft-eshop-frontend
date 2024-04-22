"use server";

import { cookies } from "next/headers";
import { getCurrentUser } from "./auth_action";
import axios, { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

axios.defaults.baseURL = process.env.API_URL;

export async function getShops() {
  try {
    const res = await axios({
      method: "get",
      url: "/shops",
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getShopById(id) {
  try {
    const res = await fetch(`${process.env.API_URL}/shops/${id}`, {
      method: "GET",
    });

    if (!res.ok) return null;

    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createShop(formState, formData) {
  const token = cookies().get("token");
  const header = new Headers();
  header.append("Authorization", `Bearer ${token.value}`);
  header.append("Content-Type", "application/json");

  const owner = await getCurrentUser();
  if (!owner) {
    redirect("/auth/login");
  }

  let data;

  try {
    const res = await fetch(`${process.env.API_URL}/shops/new`, {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        name: formData.get("shopName"),
        description: formData.get("description") || null,
        location: formData.get("location") || null,
        website: formData.get("location") || null,
        owner_id: owner.user_id,
      }),
    });

    data = await res.json();

    if (res.status !== 201) {
      return {
        errors: {
          _form: [data.detail[0].msg],
        },
      };
    }
  } catch (err) {
    return {
      errors: {
        _form: ["Something went wrong!"],
      },
    };
  }

  redirect(`/shops/${data.shop_id}`);
}
