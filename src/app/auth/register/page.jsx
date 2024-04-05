"use client";

import SubmitButton from "@/components/submit-button";
import Input from "@/components/Input";
import * as actions from "@/actions";
import { useFormState } from "react-dom";
import FieldError from "@/components/fieldError";

const Register = () => {
  const [formState, action] = useFormState(actions.registerUser, {
    errors: {},
  });

  const nameError = formState.errors.fullname?.join(", ");
  const emailError = formState.errors.email?.join(", ");
  const passwordError = formState.errors.password?.join(", ");
  const formError = formState.errors._form?.join(", ");

  return (
    <div className="flex justify-center items-center min-w-screen mt-20">
      <form
        action={action}
        className="flex flex-col gap-2 p-4 rounded shadow-md w-full md:w-2/4"
      >
        <h1 className="text-4xl text-center font-bold my-4">
          Register Account
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="fullname">Full name</label>
          <Input
            name={"fullname"}
            type={"text"}
            placeholder={"Your full name"}
          />
          <FieldError error={nameError} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <Input name={"email"} type={"email"} placeholder={"Your email"} />
          <FieldError error={emailError} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <Input
            name={"password"}
            type={"password"}
            placeholder={"Your password"}
          />
          <FieldError error={passwordError} />
        </div>

        <SubmitButton name={"Sign Up"} />
        <FieldError error={formError} />
      </form>
    </div>
  );
};

export default Register;
