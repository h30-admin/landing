import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "H30 — Your fans. Your platform. Your revenue. Acquiring the future of media IP.";

export default async function OpenGraphImage() {
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
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* ambient gradient layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 18% 25%, rgba(140, 70, 215, 0.55) 0%, rgba(140, 70, 215, 0) 50%), radial-gradient(circle at 82% 85%, rgba(240, 59, 92, 0.45) 0%, rgba(240, 59, 92, 0) 48%), radial-gradient(circle at 70% 20%, rgba(60, 110, 200, 0.4) 0%, rgba(60, 110, 200, 0) 45%)",
          }}
        />

        {/* top row: logo + eyebrow tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline" }}>
            <span
              style={{
                fontSize: "48px",
                fontWeight: 900,
                color: "#F4F1E6",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              H30
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "#8896B8",
                marginLeft: "22px",
                letterSpacing: "5px",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Media Group
            </span>
          </div>

          <span
            style={{
              fontSize: "13px",
              color: "#F03B5C",
              letterSpacing: "6px",
              textTransform: "uppercase",
              fontWeight: 700,
              fontFamily: "ui-monospace, monospace",
            }}
          >
            The Sovereignty Engine
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
              fontSize: "32px",
              color: "#8896B8",
              fontWeight: 500,
              marginBottom: "16px",
              letterSpacing: "-0.01em",
            }}
          >
            You built the audience.
          </span>
          <span
            style={{
              fontSize: "120px",
              fontWeight: 900,
              color: "#F4F1E6",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
            }}
          >
            Your fans.
          </span>
          <span
            style={{
              fontSize: "120px",
              fontWeight: 900,
              color: "#F4F1E6",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
            }}
          >
            Your platform.
          </span>
          <span
            style={{
              fontSize: "120px",
              fontWeight: 900,
              color: "#F03B5C",
              lineHeight: 0.94,
              letterSpacing: "-0.035em",
            }}
          >
            Your revenue.
          </span>
        </div>

        {/* footer URL + tagline */}
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
              fontSize: "16px",
              color: "#8896B8",
              letterSpacing: "5px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            h30.live · Acquiring the future of media IP
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "#8896B8",
              letterSpacing: "5px",
              textTransform: "uppercase",
              fontWeight: 600,
              fontFamily: "ui-monospace, monospace",
            }}
          >
            00 / 07
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
