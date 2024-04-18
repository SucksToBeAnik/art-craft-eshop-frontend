'use server'

import axios from "axios";
axios.defaults.baseURL = process.env.API_URL;


export async function getShops(){
    try{
        const res = await axios({
            method:"get",
            url:"/shops"
        })
        return res.data
    }catch(err){
        console.log(err);
    }
}