import type { KVNamespace, PagesFunction } from "@cloudflare/workers-types";

interface Env {
  TOPICS_KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  
  // Extract subject and topic from URL: /data/physics/gravity.json
  const parts = url.pathname.split('/').filter(Boolean); // ["data", "physics", "gravity.json"]
  
  if (parts.length < 3) return new Response("Invalid Path", { status: 400 });

  const subject = parts[1];
  const topic = parts[2].replace('.json', '');

  // Your specific KV format: topic:subject:topic
  const kvKey = `topic:${subject}:${topic}`;

  try {
    const value = await context.env.TOPICS_KV.get(kvKey);

    if (!value) {
      return new Response(JSON.stringify({ error: `Key ${kvKey} not found` }), { 
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(value, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response("KV Binding Error", { status: 500 });
  }
};