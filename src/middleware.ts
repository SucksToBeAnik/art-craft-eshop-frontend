import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/shops","/products","/search","/dashboard"];

export default async function middleware(
  request: NextRequest,
  response: NextResponse
) {
  for (const path of protectedRoutes) {
    // console.log(request.nextUrl.pathname.startsWith('/shops'));
    if (request.nextUrl.pathname.startsWith(path)) {
      const token = cookies().get("token");
      if (token) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token.value}`);
        try {
          const res = await fetch(`${process.env.API_URL}/auth/me`, {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          });
          if (res.status === 401) {
            cookies().delete("token");
            return NextResponse.redirect(
              request.nextUrl.origin.concat(
                `/auth/login?redirect=${request.nextUrl.pathname}`
              )
            );
          }
        } catch (error) {
          return NextResponse.redirect(
            request.nextUrl.origin.concat(
              `/auth/login?redirect=${request.nextUrl.pathname}`
            )
          );
        }
      } else {
        return NextResponse.redirect(
          request.nextUrl.origin.concat(
            `/auth/login?redirect=${request.nextUrl.pathname}`
          )
        );
      }
    }
  }
}

// end of if

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
