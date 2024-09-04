import type { APIRoute } from "astro";
import { db } from "@/firebase/app.ts";
import { get, ref, runTransaction } from "firebase/database";


export const POST: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);

  const slug = params.get("slug");

  if (!slug) {
    return new Response("Not found", { status: 404 });
  }

  const viewsRef = ref(db, `views/${slug}`);

  try {
    const transactionResult = await runTransaction(viewsRef, (currentViews) => {
      if (currentViews === null) {
        return 1; // Initialize to 1 if no views exist
      } else {
        return currentViews + 1; // Increment the current view count
      }
    });

    if (transactionResult.committed) {
      const val = transactionResult.snapshot.val()
      return new Response(
        JSON.stringify({
          total: val > 2 ? val - 1 : val,
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
    console.error('Error updating views:', error);
    return new Response(
      JSON.stringify({
        message: error?.message,
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

  const viewsRef = ref(db, `views/${slug}`);

  try {
    const snapshot = await get(viewsRef);
    let totalViews = 0;
    if (snapshot.exists()) {
      totalViews = snapshot.val()
      //console.log(snapshot.val());
    }

    return new Response(
      JSON.stringify({
        total: totalViews,
      }),
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (error: any) {
    console.error('Error retrieving views:', error);
    return new Response(
      JSON.stringify({
        message: error?.message,
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
};
