export async function onRequest({ env, request }) {
  const url = new URL(request.url);
  const topic = url.searchParams.get("topic");

  let value = await env.TOPICS_KV.get(topic);

  //Fallback
  if (!value) {
    value = await env.TOPICS_KV.get("default");
  }

  return new Response(value || "{}", {
    headers: { "Content-Type": "application/json" }
  });
}
