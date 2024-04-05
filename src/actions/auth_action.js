"use server";

import axios from "axios";
import { AxiosError } from "axios";
import { z } from "zod";
import { redirect } from "next/navigation";

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
      url: process.env.API_URL.concat("/auth/users/new"),
      data: {
        full_name: fullname,
        email: email,
        password: password,
      },
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response.data?.detail) {
        return {
          errors: {
            _form: [err.response.data?.detail[0].msg],
          },
        };
      }

      return {
        errors: {
          _form: [err.message],
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
