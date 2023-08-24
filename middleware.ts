import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register");

    if (req.nextUrl.pathname.startsWith("/api")) {
      if (!isAuth) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
      return null;
    }

    // if there authenticated and there a new user we redirected to setup profile
    if (isAuth && token.newUser) {
      // Without this it causes a inifinte redirects.  So, if we are on /profile, we don't redirect back to /profile
      if (req.nextUrl.pathname.startsWith("/account")) {
        return null;
      }
      return NextResponse.redirect(new URL("/account", req.url));
    }

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return null;
    }
    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = ["/*"];
