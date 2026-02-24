import { z } from "zod";
import { NextResponse } from "next/server";
import { getSessionId } from "@/helpers/server";
import { getViewsBy, setView } from "@/lib/meta";
import { MAX_VIEWS_PER_SESSION } from "@/constants/app";
import { ContentType } from "@/types";

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
    const currentViews = await getViewsBy(slug, sessionId);

    if (currentViews < MAX_VIEWS_PER_SESSION) {
      await setView({
        slug,
        contentType,
        contentTitle,
        sessionId,
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