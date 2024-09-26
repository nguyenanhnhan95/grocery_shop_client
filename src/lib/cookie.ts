import {  NextResponse } from "next/server";

export const removeCookie=(res:NextResponse,key:string)=>{
    res.cookies.set(key, '', {
        httpOnly: true,
        secure: true,
        expires: new Date(0),  
        path: '/',
      });
}