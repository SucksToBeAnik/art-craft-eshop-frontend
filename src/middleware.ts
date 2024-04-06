import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(
  request: NextRequest,
  response: NextResponse
) {
  const token = cookies().get("token");
  if (token) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.value}`);
    try {
      const res = await fetch(
        `${process.env.API_URL}/auth/me`,
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        }
      );
      if (res.status === 401) {
        cookies().delete('token')
        return NextResponse.redirect(
          request.nextUrl.origin.concat(`/auth/login?redirect=${request.nextUrl.pathname}`)
        );
      }
    } catch (error) {
      return request.nextUrl.origin.concat(`/auth/login?redirect=${request.nextUrl.pathname}`)
    }
  } else {
    return NextResponse.redirect(
      request.nextUrl.origin.concat(`/auth/login?redirect=${request.nextUrl.pathname}`)
    );
  }
  // end of if
}

export const config = {
  matcher: ["/shops"],
};
