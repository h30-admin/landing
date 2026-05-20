import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "H30 — Your fans. Your platform. Your revenue. Acquiring the future of media IP.";

async function fetchGoogleFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&display=swap`,
    { headers: { "User-Agent": "Mozilla/5.0" } },
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format/)?.[1];
  if (!url) throw new Error(`Could not parse font URL for ${family} ${weight}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OpenGraphImage() {
  const [dmSans800, dmSans500] = await Promise.all([
    fetchGoogleFont("DM Sans", 800),
    fetchGoogleFont("DM Sans", 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#08081A",
          padding: "72px",
          position: "relative",
          fontFamily: "DM Sans",
        }}
      >
        {/* ambient gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 18% 25%, rgba(140, 70, 215, 0.55) 0%, rgba(140, 70, 215, 0) 50%), radial-gradient(circle at 82% 85%, rgba(240, 59, 92, 0.45) 0%, rgba(240, 59, 92, 0) 48%), radial-gradient(circle at 70% 20%, rgba(60, 110, 200, 0.4) 0%, rgba(60, 110, 200, 0) 45%)",
          }}
        />

        {/* top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "20px" }}>
            <span
              style={{
                fontSize: "52px",
                fontWeight: 800,
                color: "#F4F1E6",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                fontFamily: "DM Sans",
              }}
            >
              H30
            </span>
            <span
              style={{
                fontSize: "13px",
                color: "#8896B8",
                letterSpacing: "5px",
                textTransform: "uppercase",
                fontWeight: 500,
                fontFamily: "DM Sans",
              }}
            >
              Media Group
            </span>
          </div>

          <span
            style={{
              fontSize: "12px",
              color: "#F03B5C",
              letterSpacing: "6px",
              textTransform: "uppercase",
              fontWeight: 800,
              fontFamily: "DM Sans",
            }}
          >
            h30.live
          </span>
        </div>

        {/* spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* headline stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: "28px",
              color: "#8896B8",
              fontWeight: 500,
              marginBottom: "20px",
              letterSpacing: "-0.01em",
              fontFamily: "DM Sans",
            }}
          >
            You built the audience.
          </span>
          <span
            style={{
              fontSize: "116px",
              fontWeight: 800,
              color: "#F4F1E6",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
              fontFamily: "DM Sans",
            }}
          >
            Your fans.
          </span>
          <span
            style={{
              fontSize: "116px",
              fontWeight: 800,
              color: "#F4F1E6",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
              fontFamily: "DM Sans",
            }}
          >
            Your platform.
          </span>
          <span
            style={{
              fontSize: "116px",
              fontWeight: 800,
              color: "#F03B5C",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
              fontFamily: "DM Sans",
            }}
          >
            Your revenue.
          </span>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "48px",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: "14px",
              color: "#8896B8",
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontWeight: 500,
              fontFamily: "DM Sans",
            }}
          >
            Acquiring the future of media IP
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: dmSans800, weight: 800, style: "normal" },
        { name: "DM Sans", data: dmSans500, weight: 500, style: "normal" },
      ],
    },
  );
}
