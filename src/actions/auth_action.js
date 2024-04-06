"use server";

import axios from "axios";
import { AxiosError } from "axios";
import { z } from "zod";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { revalidatePath } from "next/cache";

axios.defaults.baseURL = process.env.API_URL;

const createUserSchema = z
  .object({
    fullname: z.string().min(3),
    email: z.string().email(),
    password: z
      .string()
      .min(5, "Password should at least be 5 characters long."),
  })
  .refine(
    (data) => {
      const sp_chars = ["@", "#", "$", "&", "!"];
      let count = 0;

      for (const i of data.password) {
        if (sp_chars.includes(i)) {
          count += 1;
        }
      }
      if (count > 0) {
        return true;
      } else {
        return false;
      }
    },
    {
      message:
        "Your password should contain atleast one of the following special characters: [@, #, $, &, !]",
      path: ["password"],
    }
  );

export async function registerUser(formState, formData) {
  const fullname = formData.get("fullname");
  const email = formData.get("email");
  const password = formData.get("password");

  const result = createUserSchema.safeParse({
    fullname,
    email,
    password,
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await axios({
      method: "post",
      url: "/auth/register",
      data: {
        full_name: fullname,
        email: email,
        password: password,
      },
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.data?.detail) {
        return {
          errors: {
            _form: [err.response.data.detail[0].msg],
          },
        };
      }

      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  redirect("/auth/login");
}

// login action
export async function actionLoginUser(formState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await axios.postForm("/auth/login", {
      username: email,
      password: password,
    });


    const token = response?.data?.access_token;

    if (token) {
      const decoded_data = jwtDecode(token);
      cookies().set("token", token, {
        expires: decoded_data.exp * 1000 + 1000 * 60 * 60 * 6,
      });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      

      if (err.response?.data?.detail) {
        return {
          errors: {
            _form: [err.response.data.detail[0].msg],
          },
        };
      }

      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  redirect(formState.redirect);
}




export async function getCurrentUser() {
  const token = cookies().get("token");

  if (token) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.value}`);
    try {
      const res = await fetch(`${process.env.API_URL}/auth/me`, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      });

      if (res.status === 401) {
        cookies().delete("token");
        return null;
      }

      const user = await res.json();
      revalidatePath("/");
      return user;
    } catch (error) {
      return null;
    }
  }
}

export async function actionLogutUser() {
  cookies().delete("token");
  redirect("/");
}
