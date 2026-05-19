// Email subscription endpoint .. V1 stub
//
// V1: logs new emails to the dev console.
// When Klaviyo credentials land, POST to Klaviyo's
// /client/subscriptions endpoint with the list ID.

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const email =
    typeof payload === "object" && payload !== null && "email" in payload
      ? String((payload as { email: unknown }).email ?? "").trim()
      : "";

  const looksValid =
    email.length >= 5 &&
    email.length <= 254 &&
    email.includes("@") &&
    email.includes(".");

  if (!looksValid) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  console.log("[subscribe] new lead:", email);
  return Response.json({ ok: true });
}
