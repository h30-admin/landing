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

  const apiKey = process.env.KLAVIYO_PRIVATE_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!apiKey || !listId) {
    console.error("[subscribe] Klaviyo env vars missing");
    return Response.json({ error: "Server configuration error" }, { status: 500 });
  }

  // Create or update the profile in Klaviyo
  const profileRes = await fetch("https://a.klaviyo.com/api/profiles/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Klaviyo-API-Key ${apiKey}`,
      revision: "2024-02-15",
    },
    body: JSON.stringify({
      data: {
        type: "profile",
        attributes: { email },
      },
    }),
  });

  let profileId: string;

  if (profileRes.status === 201) {
    const profileData = await profileRes.json();
    profileId = profileData.data.id;
  } else if (profileRes.status === 409) {
    // Profile already exists — extract ID from the conflict response
    const conflictData = await profileRes.json();
    profileId =
      conflictData?.errors?.[0]?.meta?.duplicate_profile_id ?? null;
    if (!profileId) {
      console.error("[subscribe] Unexpected 409 body", conflictData);
      return Response.json({ error: "Subscription failed" }, { status: 500 });
    }
  } else {
    const body = await profileRes.text();
    console.error("[subscribe] Profile create failed", profileRes.status, body);
    return Response.json({ error: "Subscription failed" }, { status: 500 });
  }

  // Add profile to the list
  const listRes = await fetch(
    `https://a.klaviyo.com/api/lists/${listId}/relationships/profiles/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        revision: "2024-02-15",
      },
      body: JSON.stringify({
        data: [{ type: "profile", id: profileId }],
      }),
    },
  );

  if (listRes.status !== 204) {
    const body = await listRes.text();
    console.error("[subscribe] List add failed", listRes.status, body);
    return Response.json({ error: "Subscription failed" }, { status: 500 });
  }

  console.log("[subscribe] Added to Klaviyo list:", email);
  return Response.json({ ok: true });
}
