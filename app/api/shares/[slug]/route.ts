import { z } from "zod";
import { NextResponse } from "next/server";
import { getSessionId } from "@/helpers/server";
import { getSharesBy, setShare } from "@/lib/meta";
import { MAX_SHARES_PER_SESSION } from "@/constants/app";
import { ContentType, ShareType } from "@/types";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const sessionId = getSessionId(req);

  try {
    const body = await req.json();
    const contentType = z.nativeEnum(ContentType).parse(body.contentType);
    const contentTitle = z.string().parse(body.contentTitle);
    const type = z.nativeEnum(ShareType).parse(body.type);
    const currentShares = await getSharesBy(slug, sessionId);

    if (currentShares < MAX_SHARES_PER_SESSION) {
      await setShare({
        slug,
        contentType,
        contentTitle,
        sessionId,
        type,
      });

      return NextResponse.json({ message: "Success" });
    }
    
    return NextResponse.json({ message: "Max limit reached" }, { status: 403 });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}