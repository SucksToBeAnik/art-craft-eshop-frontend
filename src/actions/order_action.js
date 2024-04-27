'use server'

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export async function actionOrderProductsFromCart(cartId){
    try {
      const token = cookies().get("token");
      const header = new Headers();
      header.append("Authorization", `Bearer ${token.value}`);
  
      const res = await fetch(`${process.env.API_URL}/orders/new/${cartId}`,{
          method:"POST",
          headers:header
      })
      const data = await res.json()

  
  
      if(!res.ok) throw new Error(data.detail[0].msg)
  
      
    } catch (error) {
      return {
          data: null,
          error: error.toString()
      }
    }

    revalidatePath("/products/me","layout")
    redirect("/products/me")
  }