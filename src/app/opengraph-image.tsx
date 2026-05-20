import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

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

  const logoBuffer = fs.readFileSync(
    path.join(process.cwd(), "public/brand/h30-logo-icon.png"),
  );
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#08081A",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "DM Sans",
          overflow: "hidden",
        }}
      >
        {/* strong violet bloom top-left */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-80px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(140, 70, 215, 0.75) 0%, rgba(91, 46, 140, 0) 65%)",
            display: "flex",
          }}
        />
        {/* fire bloom bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-60px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(240, 59, 92, 0.65) 0%, rgba(139, 26, 31, 0) 65%)",
            display: "flex",
          }}
        />
        {/* navy mid */}
        <div
          style={{
            position: "absolute",
            top: "80px",
            right: "100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(60, 110, 200, 0.45) 0%, rgba(31, 58, 110, 0) 65%)",
            display: "flex",
          }}
        />

        {/* top row: logo + url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="H30"
            style={{ height: "40px", width: "auto" }}
          />
          <span
            style={{
              fontSize: "13px",
              color: "#F03B5C",
              letterSpacing: "5px",
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

        {/* eyebrow */}
        <span
          style={{
            fontSize: "16px",
            color: "rgba(244,241,230,0.55)",
            fontWeight: 500,
            letterSpacing: "0.05em",
            marginBottom: "20px",
            fontFamily: "DM Sans",
            position: "relative",
          }}
        >
          You built the audience.
        </span>

        {/* headline stack */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            lineHeight: 0.92,
          }}
        >
          <span
            style={{
              fontSize: "118px",
              fontWeight: 800,
              color: "#F4F1E6",
              letterSpacing: "-0.035em",
              fontFamily: "DM Sans",
            }}
          >
            Your fans.
          </span>
          <span
            style={{
              fontSize: "118px",
              fontWeight: 800,
              color: "#F4F1E6",
              letterSpacing: "-0.035em",
              fontFamily: "DM Sans",
            }}
          >
            Your platform.
          </span>
          <span
            style={{
              fontSize: "118px",
              fontWeight: 800,
              color: "#F03B5C",
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
            marginTop: "40px",
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              color: "rgba(244,241,230,0.4)",
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
