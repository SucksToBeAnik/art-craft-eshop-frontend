'use client'

import FieldInput from "@/components/fieldInput";
import SubmitButton from "@/components/submit-button";
import { actionLoginUser } from "@/actions";
import {useFormState} from "react-dom"
import FieldError from "@/components/fieldError";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


const Login = () => {
  const searchParams = useSearchParams()
  let redirectUrl = searchParams.get('redirect')

  console.log(redirectUrl);

  if(redirectUrl){
    redirectUrl = redirectUrl.concat('?active=true')
  }else{
    redirectUrl = "/?active=true"
  }

  const [formData, action] = useFormState(actionLoginUser,{
    redirect: redirectUrl,
    errors:{}
  })

  

  return (
    <div className="flex justify-center items-center min-w-screen mt-20">
      <form
        action={action}
        className="flex flex-col gap-2 p-4 rounded shadow-md w-full md:w-2/4"
      >
        <h1 className="text-4xl text-center font-bold my-4">Login</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <FieldInput name={"email"} type={"email"} placeholder={"Your email"} required={true} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <FieldInput
            name={"password"}
            type={"password"}
            placeholder={"Your password"}
            required={true}
          />
        </div>

        <SubmitButton name={"Login"} />
        <FieldError error={formData.errors?._form} />
      </form>
    </div>
  );
};


const LoginPage = ()=> {
  return (
    <Suspense>
      <Login />
    </Suspense>
  )
}

export default LoginPage;



