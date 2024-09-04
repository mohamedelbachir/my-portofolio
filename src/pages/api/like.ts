import type { APIRoute } from "astro";
import { db } from "@/firebase/app.ts";
import { get, ref, runTransaction } from "firebase/database";
type Error = {
  error: {
    message: string;
  }
}
export const POST: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const slug = params.get("slug");
  const action = params.get("action");

  if (!slug || !action || !['add', 'remove'].includes(action)) {
    return new Response("Bad Request", { status: 400 });
  }

  const likesRef = ref(db, `likes/${slug}`);

  try {
    const transactionResult = await runTransaction(likesRef, (currentLikes) => {
      if (currentLikes === null) {
        return action === "add" ? 1 : 0;
      } else {
        return action === "add" ? currentLikes + 1 : Math.max(currentLikes - 1, 0);
      }
    });

    if (transactionResult.committed) {
      return new Response(
        JSON.stringify({
          totalLikes: transactionResult.snapshot.val(),
        }),
        {
          status: 200,
          statusText: "OK",
        }
      );
    } else {
      throw new Error("Transaction not committed.");
    }
  } catch (error: any) {
    console.error('Error updating likes:', error);
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const slug = params.get("slug");

  if (!slug) {
    return new Response("Not found", { status: 404 });
  }

  const likesRef = ref(db, `likes/${slug}`);

  try {
    const snapshot = await get(likesRef);
    let totalLikes = 0;
    if (snapshot.exists()) {
      totalLikes = snapshot.val()
      //console.log(snapshot.val());
    }

    return new Response(
      JSON.stringify({
        total: totalLikes,
      }),
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (error: any) {
    console.error('Error retrieving like:', error);
    return new Response(
      JSON.stringify({
        message: error?.message || "",
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
};
