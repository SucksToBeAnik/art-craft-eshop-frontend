"use server";
import { cookies } from "next/headers";

export async function actionGetCartList() {
  try {
    const token = cookies().get("token");
    const header = new Headers();
    header.append("Authorization", `Bearer ${token.value}`);

    const res = await fetch(`${process.env.API_URL}/carts`, {
      headers: header,
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.details[0].msg);

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.toString(),
    };
  }
}

export async function actionGetSingleCartById(cartId){
    try {
        const token = cookies().get("token");
        const header = new Headers();
        header.append("Authorization", `Bearer ${token.value}`);
    
        const res = await fetch(`${process.env.API_URL}/carts/${cartId}`, {
          headers: header,
        });
    
        const data = await res.json();

    
        if (!res.ok) throw new Error(data.details[0].msg);
    
        return {
          data,
          error: null,
        };
      } catch (error) {
        console.log(error);
        return {
          data: null,
          error: error.toString(),
        };
      }
}

export async function actionAddProductToCart(cartId, productId) {
  try {
    const token = cookies().get("token");
    const header = new Headers();
    header.append("Authorization", `Bearer ${token.value}`);

    const res = await fetch(`${process.env.API_URL}/carts/${cartId}/add/${productId}`,{
        method:"PUT",
        headers:header
    })
    const data = await res.json()


    if(!res.ok) throw new Error(data.detail[0].msg)

    return {
        data,
        error: null
    }
  } catch (error) {
    console.log(error);
    return {
        data: null,
        error: error.toString()
    }
  }
}

export async function actionCreateCart(){
  try {
    const token = cookies().get("token");
    const header = new Headers();
    header.append("Authorization", `Bearer ${token.value}`);

    const res = await fetch(`${process.env.API_URL}/carts/new`,{
        method:"POST",
        headers:header
    })
    const data = await res.json()

    if(!res.ok) throw new Error(data.detail[0].msg)

    return {
      data,
      error: null
    }
  } catch (error) {
    return {
      data:null,
      error: error.toString()
    }
  }
}


export async function actionDeleteCartById(cartId){
  try {
    const token = cookies().get("token");
    const header = new Headers();
    header.append("Authorization", `Bearer ${token.value}`);

    const res = await fetch(`${process.env.API_URL}/carts/${cartId}`,{
        method:"DELETE",
        headers:header
    })

    if(!res.ok) {
      const data= await res.json()
      throw new Error(data.detail[0].msg)
    }

    return {
      data:'Cart Deleted',
      error: null
    }
  } catch (error) {
    return {
      data:null,
      error: error.toString()
    }
  }
}


export async function actionRemoveProductFromCart(cartId,productId){
  try {
    const token = cookies().get("token");
    const header = new Headers();
    header.append("Authorization", `Bearer ${token.value}`);

    const res = await fetch(`${process.env.API_URL}/carts/${cartId}/remove/${productId}`,{
        method:"PATCH",
        headers:header
    })
    const data = await res.json()


    if(!res.ok) throw new Error(data.detail[0].msg)

    return {
        data,
        error: null
    }
  } catch (error) {
    console.log(error);
    return {
        data: null,
        error: error.toString()
    }
  }
}
