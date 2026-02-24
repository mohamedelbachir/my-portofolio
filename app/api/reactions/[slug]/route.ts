import { z } from "zod";
import { NextResponse } from "next/server";
import { getSessionId } from "@/helpers/server";
import { getReactionsBy, setReaction } from "@/lib/meta";
import { MAX_REACTIONS_PER_SESSION } from "@/constants/app";
import {
  ContentType,
  ReactionType,
} from "@/types";

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
    const type = z.nativeEnum(ReactionType).parse(body.type);
    const count = z.number().parse(body.count || 1);
    const section = z.string().nullish().parse(body.section);

    // get current user reactions count
    const reactionsDetailUser = await getReactionsBy(slug, sessionId);
    const reactionKey = typeof type === 'number' ? ReactionType[type] : type;
    const currentCount = reactionsDetailUser[reactionKey] || 0;

    if (currentCount < MAX_REACTIONS_PER_SESSION) {
      // ensure that the count is not 0 and has not exceeded the maximum limit
      const quota = Math.min(
        Math.max(1, count),
        MAX_REACTIONS_PER_SESSION - currentCount,
      );

      await setReaction({
        slug,
        contentType,
        contentTitle,
        sessionId,
        type,
        count: quota,
        section: section ?? "",
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