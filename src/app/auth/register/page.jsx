"use client";

import SubmitButton from "@/components/submit-button";
import FieldInput from "@/components/fieldInput";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import FieldError from "@/components/fieldError";
import Link from "next/link";

const Register = () => {
  const [formState, action] = useFormState(actions.registerUser, {
    errors: {},
  });

  const nameError = formState.errors.fullname?.join(", ");
  const emailError = formState.errors.email?.join(", ");
  const passwordError = formState.errors.password?.join(", ");
  const formError = formState.errors._form?.join(", ");

  return (
    <div className="flex justify-center items-center mt-10 mb-20">
      <form
        action={action}
        className="flex flex-col gap-2 py-4 px-8 rounded shadow-md w-full md:w-2/4"
      >
        <h1 className="text-4xl text-center font-bold my-4">
          Register Account
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="fullname">Full name</label>
          <FieldInput
            name={"fullname"}
            type={"text"}
            placeholder={"Your full name"}
          />
          <FieldError error={nameError} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <FieldInput name={"email"} type={"email"} placeholder={"Your email"} />
          <FieldError error={emailError} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <FieldInput
            name={"password"}
            type={"password"}
            placeholder={"Your password"}
          />
          <FieldError error={passwordError} />
        </div>

        <SubmitButton name={"Sign Up"} />
        <FieldError error={formError} />

        <div className="flex gap-1 mx-auto text-md">
          <p>Already have an account?</p>
          <p>Login <Link href={"/auth/login"} className="border-b-2 border-blue-400 text-blue-400">Here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Register;
