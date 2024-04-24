"use server";
import { redirect } from "next/navigation";

export async function searchByTerm(formData) {
  const item = formData.get("item");
  let term = formData.get("term") || '';

  redirect(`/search/${item}?term=${term}`);
}



export async function actionFetchProductsByTerm(term){
    try{
        const res = await fetch(`${process.env.API_URL}/search/products/${term}`)
        if(!res.ok) throw new Error(res.statusText)

        const data = await res.json()

        return {
            data,
            error: null
        }
    }catch(error){
        return {
            data: null,
            error: error.toString()
        }
    }
}

export async function actionFetchShopsByTerm(term){
    try{
        const res = await fetch(`${process.env.API_URL}/search/shops/${term}`)
        if(!res.ok) throw new Error(res.statusText)

        const data = await res.json()
        return {
            data,
            error: null
        }
    }catch(error){
        return {
            data: null,
            error: error.toString()
        }
    }
}
