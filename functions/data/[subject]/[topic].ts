// functions/data/[subject]/[topic].ts

interface Env {
  // This MUST match the 'binding' name in wrangler.toml exactly
  "topic-data": KVNamespace; 
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const parts = url.pathname.split('/').filter(Boolean);

  if (parts.length < 3) return new Response("Invalid Path", { status: 400 });

  const subject = parts[1]; // Removed .toLowerCase()
  const topic = parts[2].replace('.json', ''); // Removed .toLowerCase()

  const kvKey = `topic:${subject}:${topic}`;

  console.log(`[KV Debug] Looking for Key: "${kvKey}"`);

  try {
    // Ensure this binding name matches your wrangler.toml exactly
    const value = await context.env["topic-data"].get(kvKey);

    if (!value) {
      // Brute force list to terminal
      const list = await context.env["topic-data"].list();
      console.log("[KV Debug] Found these keys in KV:", list.keys.map(k => k.name));
      
      return new Response(JSON.stringify({ error: "Key Not Found", searched: kvKey }), { status: 404 });
    }

    return new Response(value, { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response("KV Error: " + e.message, { status: 500 });
  }
};