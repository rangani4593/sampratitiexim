import { connection } from "next/server";

/*
  The server's clock, for the launch gate: visitors with a wrong device clock must not
  be held behind the countdown after launch. connection() keeps this out of prerendering
  so every request gets the current time.
*/
export async function GET() {
  await connection();
  return Response.json({ now: Date.now() }, { headers: { "Cache-Control": "no-store" } });
}
