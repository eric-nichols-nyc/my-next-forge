import { NextResponse } from "next/server";
import aj from "@/lib/arcjet";

export async function middleware(request: Request) {
  const decision = await aj.protect(request);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Too many requests", reason: "rate_limit" },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: "Forbidden", reason: decision.reason },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
