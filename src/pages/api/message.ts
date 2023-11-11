import type { APIContext } from "astro";
import { sendMessage } from "../../lib/message";

export async function POST(context: APIContext): Promise<Response> {
  const body: Body = await context.request.json();
  sendMessage(body.username, body.body);
  return new Response(null);
}

interface Body {
  username: string;
  body: string;
}
