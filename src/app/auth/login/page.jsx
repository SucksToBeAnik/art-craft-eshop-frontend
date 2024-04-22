'use client'

import FieldInput from "@/components/fieldInput";
import SubmitButton from "@/components/submit-button";
import { actionLoginUser } from "@/actions";
import {useFormState} from "react-dom"
import FieldError from "@/components/fieldError";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";


const LoginPage = () => {
  const searchParams = useSearchParams()
  let redirectUrl = searchParams.get('redirect')

  if(redirectUrl !== undefined && redirectUrl !== null){
    redirectUrl = redirectUrl.concat('?active=true')
  }else{
    redirectUrl = "/?active=true"
  }

  const [formData, action] = useFormState(actionLoginUser.bind(null, redirectUrl),{
    errors:{}
  })

  return (
    <div className="flex justify-center items-center my-20">
      <form
        action={action}
        className="flex flex-col gap-2 py-4 px-8 rounded shadow-md w-full md:w-2/4"
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
        <FieldError error={formData?.errors?._form} />

        <div className="flex gap-1 mx-auto text-md">
          <p>Do not have an account?</p>
          <p>Create an account <Link href={"/auth/register"} className="border-b-2 border-blue-400 text-blue-400">Here</Link></p>
        </div>
      </form>
    </div>
  );
};


// const LoginPage = ()=> {
//   return (
//     <Suspense>
//       <Login />
//     </Suspense>
//   )
// }

export default LoginPage;



