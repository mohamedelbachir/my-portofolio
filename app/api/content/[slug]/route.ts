import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getSessionId } from "@/helpers/server";
import {
  getContentMeta,
  getReactions,
  getReactionsBy,
  getSectionMeta,
} from "@/lib/meta";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const parsedSlug = z.string().parse(slug);
    //console.log({ parsedSlug });
    const sessionId = getSessionId(req);
    //console.log({ sessionId });
    const meta = await getContentMeta(parsedSlug);
    //console.log({ meta });
    const metaSection = await getSectionMeta(parsedSlug);
    //console.log({ metaSection });
    const reactionsDetail = await getReactions(parsedSlug);
    //console.log({ reactionsDetail });
    const reactionsDetailUser = await getReactionsBy(parsedSlug, sessionId);
    //console.log({ reactionsDetailUser });
    const reactionsSum =
      (reactionsDetail.AMAZED || 0) +
      (reactionsDetail.CLAPPING || 0) +
      (reactionsDetail.THINKING || 0);

    return NextResponse.json({
      meta: {
        shares: meta.shares,
        views: meta.views,
        reactions: reactionsSum,
        reactionsDetail,
      },
      metaUser: {
        reactionsDetail: reactionsDetailUser,
      },
      metaSection,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
