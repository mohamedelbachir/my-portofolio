export async function GET() {
  return new Response(
    JSON.stringify({
      msg: "hello world",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
