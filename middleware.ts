import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const ua = userAgent(req);

  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.get("carrotSession")) {
      return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
    }
  }

  // if (!req.url.includes("/api") && !req.nextUrl.pathname.startsWith("/enter")) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/enter";
  //   return NextResponse.rewrite(url);
  // }

  // if (req.nextUrl.pathname.startsWith("/chats")) {
  //   // This logic is only applied to /about
  //   console.log("chats");
  // }
  // if (ua?.isBot) {
  //   // return new Response("Plz don't be a bot. Be human.", { status: 403 });
  //   console.log("이유저는 봇 입니다.");
  // }

  console.log("api", req.url.includes("/api"));
  console.log("enter", req.url.includes("/enter"));
  console.log("req.cookies.get(", req.cookies.get("carrotSession"));
  console.log(
    "===============================미들웨어================================="
  );

  // if (!req.nextUrl.pathname.startsWith("/enter")) {
  //   return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
  // }
  // if (!req.url.includes("/api")) {
  //   if (!req.url.includes("/enter") && !req.cookies.get("carrotSession")) {
  //     return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
  //   }
  // }
}
export const config = {
  matcher: ["/", "/enter"],
};

// export const config = {
//   matcher: "/about/:path*",
// };
//  return NextResponse.rewrite(new URL('/about-2', request.url))

// import { NextRequest, NextResponse, userAgent } from "next/server";

// export function middleware(request: NextRequest) {
//   const { device } = userAgent(request);
//   const viewport = device.type === "mobile" ? "mobile" : "desktop";

//   request.nextUrl.searchParams.set("viewport", viewport);
//   return NextResponse.rewrite(request.nextUrl);
// }
