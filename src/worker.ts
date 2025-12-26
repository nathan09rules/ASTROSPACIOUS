import type { KVNamespace } from "@cloudflare/workers-types";

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    // Match: /data/{subject}/{topic}.json
    const match = url.pathname.match(/^\/data\/([^/]+)\/([^/]+)\.json$/);

    if (!match) {
      return new Response("Not found", { status: 404 });
    }

    const [, subject, topic] = match;
    const key = `Topics:${subject}:${topic}`;

    const value = await env.TOPICS_KV.get(key);

    if (!value) {
      return new Response(
        JSON.stringify({
          sections: [{
            id: "error",
            title: "Content Not Found",
            content: `<p>No data for <code>${subject}/${topic}</code></p>`
          }]
        }),
        { headers: { "Content-Type": "application/json" }, status: 404 }
      );
    }

    return new Response(value, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300"
      }
    });
  }
};

interface Env {
  TOPICS_KV: KVNamespace;
}
