import { addMessageListener } from "../../lib/message";
import { encodeBase64 } from "oslo/encoding";

export async function GET() {
  const textEncoder = new TextEncoder();
  let unsubscribe: () => void;

  const stream = new ReadableStream({
    start(controller) {
      unsubscribe = addMessageListener((message) => {
        let body = JSON.stringify({
          username: message.username,
          body: message.body,
          timestamp: Math.floor(message.date.getTime() / 1000),
        });
        body = encodeBase64(new TextEncoder().encode(body));
        controller.enqueue(textEncoder.encode(body + "\n"));
      });
    },
    cancel() {
      unsubscribe();
    },
  });
  return new Response(stream, {
    headers: {
      "X-Content-Type-Options": "nosniff",
      "Content-Type": "application/json; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
