import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const ua = userAgent(req);

  if (req.nextUrl.pathname.startsWith("/chats")) {
    // This logic is only applied to /about
    console.log("chats");
  }
  if (ua?.isBot) {
    // return new Response("Plz don't be a bot. Be human.", { status: 403 });
    console.log("이유저는 봇 입니다.");
  }

  if (!req.url.includes("/api")) {
    if (
      !req.url.includes("/enter") &&
      !req.url.includes("/user/me/confirm") &&
      !req.cookies.get("carrotSession")
    ) {
      NextResponse.redirect(`${req.nextUrl.origin}/enter`);
    }
  }
  // return NextResponse.json({ ok: true });
}

// import { NextRequest, NextResponse, userAgent } from "next/server";

// export function middleware(request: NextRequest) {
//   const { device } = userAgent(request);
//   const viewport = device.type === "mobile" ? "mobile" : "desktop";

//   request.nextUrl.searchParams.set("viewport", viewport);
//   return NextResponse.rewrite(request.nextUrl);
// }
