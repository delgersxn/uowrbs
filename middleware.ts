import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseReqResClient } from "./lib/supabase/server-client";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createSupabaseReqResClient(request, response);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  const { data: staff } = await supabase
    .from("staff")
    .select("role")
    .eq("id", user?.id)
    .single();

  // protects the "/login" route from authenticated users
  if (user && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/student/booking", request.url));
  }

  // protects the "/student" routes and its sub-routes
  if (!user && request.nextUrl.pathname.startsWith("/student")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // protects the "/student" routes and its sub-routes
  if (!user && request.nextUrl.pathname.startsWith("/staff")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // protects the "/staff" route and its sub-routes from non-staff users
  if (user && request.nextUrl.pathname.startsWith("/staff")) {
    if (staff?.role !== "staff") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  // protects the "/student" route and its sub-routes from staff users
  if (user && request.nextUrl.pathname.startsWith("/student")) {
    if (staff?.role === "staff") {
      return NextResponse.redirect(new URL("/staff/rooms", request.url));
    } else if (staff?.role === "admin") {
      return NextResponse.redirect(new URL("/admin/rooms", request.url));
    }
  }

  if (user && request.nextUrl.pathname.startsWith("/admin")) {
    if (staff?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/student/:path*",
    "/staff/:path*",
    "/login/:path*",
    "/admin/:path*",
  ],
};
