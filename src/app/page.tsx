"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV_SECTIONS = [
  { num: "01", label: "Shift", href: "#shift" },
  { num: "02", label: "Problem", href: "#problem" },
  { num: "03", label: "Platform", href: "#platform" },
  { num: "04", label: "Engine", href: "#engine" },
  { num: "05", label: "Team", href: "#team" },
  { num: "06", label: "Partners", href: "#partners" },
];

export default function Home() {
  return (
    <main className="relative isolate">
      <AmbientGradients />
      <SiteNav />
      <Hero />
      <SeismicShift />
      <PartnerMarquee />
      <ProblemSection />
      <EmailCapture />
      <SolutionSection />
      <EngineSection />
      <TeamSection />
      <PartnershipsSection />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}

function AmbientGradients() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // spotlight drifts diagonally across the viewport as you scroll
  const spotTop = useTransform(scrollY, [0, 4000], ["18vh", "85vh"]);
  const spotLeft = useTransform(scrollY, [0, 4000], ["48vw", "12vw"]);
  const spotScale = useTransform(scrollY, [0, 2000, 4000], [1, 1.25, 1]);

  return (
    <div className="ambient-stage" aria-hidden="true">
      <div className="ambient-glow ambient-glow--violet-top" />
      <div className="ambient-glow ambient-glow--navy-mid" />
      <div className="ambient-glow ambient-glow--fire-spark" />
      <div className="ambient-glow ambient-glow--ember-low" />
      <div className="ambient-glow ambient-glow--violet-deep" />
      <motion.div
        className="ambient-spotlight"
        style={
          reduce
            ? { top: "40vh", left: "30vw" }
            : { top: spotTop, left: spotLeft, scale: spotScale }
        }
      />
      <div className="ambient-grain" />
    </div>
  );
}

function SiteNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cream/5 backdrop-blur-md bg-ground/60">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 flex items-center justify-between py-4 md:py-5">
        <a href="#top" className="flex items-center">
          <Image
            src="/brand/h30-logo-icon.png"
            alt="H30 Media Group"
            width={158}
            height={44}
            priority
            className="block"
          />
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {NAV_SECTIONS.map((s) => (
            <li key={s.num}>
              <a
                href={s.href}
                className="group flex items-baseline gap-2 text-cream/85 hover:text-cream transition-colors"
              >
                <span className="font-mono text-[10px] text-mute group-hover:text-fire transition-colors">
                  {s.num}
                </span>
                <span className="text-sm font-medium tracking-wide">
                  {s.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#cta"
          className="text-[11px] font-semibold tracking-[0.18em] uppercase border border-cream/40 text-cream px-4 py-2 hover:bg-cream hover:text-ground transition-colors"
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const fadeUp = (delay: number) =>
    reduce
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease },
        };

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col px-6 md:px-12 pt-28 pb-10"
    >
      {/* top slot */}
      <motion.div
        className="flex items-start justify-between text-mute"
        {...fadeUp(0)}
      >
        <div className="text-[10px] tracking-[0.28em] uppercase font-medium">
          <span className="font-mono text-fire mr-2">00</span>
          The sovereignty engine
        </div>
        <div className="hidden md:block text-[10px] tracking-[0.28em] uppercase font-medium text-right max-w-[20ch] leading-relaxed">
          Built by the people behind
          <br />
          TSN .. UFC Canada .. GMP
        </div>
      </motion.div>

      {/* middle slot */}
      <div className="flex-1 flex items-center mt-12 md:mt-0">
        <div className="mx-auto max-w-[1440px] w-full">
          <h1 className="font-display tracking-[-0.025em] leading-[0.94]">
            <motion.span
              className="block text-[clamp(1.25rem,2.4vw,2rem)] font-medium text-mute mb-4 tracking-tight"
              {...fadeUp(0.1)}
            >
              You built the audience.
            </motion.span>
            <motion.span
              className="block text-[clamp(2.5rem,8vw,8.5rem)] font-extrabold text-cream"
              {...fadeUp(0.25)}
            >
              Your fans.
            </motion.span>
            <motion.span
              className="block text-[clamp(2.5rem,8vw,8.5rem)] font-extrabold text-cream"
              {...fadeUp(0.4)}
            >
              Your platform.
            </motion.span>
            <motion.span
              className="block text-[clamp(2.5rem,8vw,8.5rem)] font-extrabold text-fire"
              {...fadeUp(0.55)}
            >
              Your revenue.
            </motion.span>
          </h1>

          <motion.div
            className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12"
            {...fadeUp(0.8)}
          >
            <p className="text-lg md:text-xl text-cream/80 leading-relaxed max-w-xl">
              H30 builds the direct-to-fan platforms creators should
              have owned all along. We run them. We grow them. You
              keep your audience.
            </p>

            <a
              href="#cta"
              className="cta-double group self-start md:self-end relative inline-flex items-center gap-3 bg-cream text-ground px-6 py-4 text-sm font-semibold tracking-[0.12em] uppercase shrink-0 overflow-hidden transition-colors hover:bg-fire hover:text-cream"
            >
              <span className="cta-double__label relative">
                <span className="cta-double__primary">Book a discovery call</span>
                <span
                  aria-hidden="true"
                  className="cta-double__ghost"
                >
                  Book a discovery call
                </span>
              </span>
              <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* bottom slot */}
      <motion.div
        className="mt-12 flex items-end justify-between text-mute"
        {...fadeUp(1.0)}
      >
        <a
          href="#shift"
          className="group flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase font-medium hover:text-cream transition-colors"
        >
          <span className="font-mono text-fire">01</span>
          <span>The seismic shift</span>
          <motion.span
            className="text-base leading-none"
            animate={
              reduce
                ? undefined
                : { y: [0, 4, 0] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            &darr;
          </motion.span>
        </a>
        <span className="hidden md:inline-block text-[10px] tracking-[0.28em] uppercase font-medium font-mono">
          h30.live
        </span>
      </motion.div>
    </section>
  );
}

type MarqueePartner = {
  name: string;
  src?: string;
  width?: number;
  height?: number;
};

const PARTNERS: MarqueePartner[] = [
  { name: "Rolling Stone", src: "/partners/rolling-stone.svg", width: 3000, height: 671 },
  { name: "Billboard", src: "/partners/billboard.png", width: 3840, height: 810 },
  { name: "Topfan", src: "/partners/topfan.webp", width: 1000, height: 1000 },
  { name: "Notorious Productions" },
  { name: "Meteor 17", src: "/partners/meteor-17.webp", width: 200, height: 242 },
  { name: "Warner Music", src: "/partners/warner-music.png", width: 1000, height: 434 },
  { name: "CBS", src: "/partners/cbs.png", width: 960, height: 278 },
  { name: "Fogo.TV", src: "/partners/fogo.png", width: 596, height: 380 },
  { name: "Arthouse Media Group", src: "/partners/arthouse.png", width: 215, height: 144 },
];

function PartnerMarquee() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const loop = [...PARTNERS, ...PARTNERS];

  return (
    <section
      id="footprint"
      className="relative border-t border-cream/10 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <motion.div
          className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-14 md:mb-20"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease }}
        >
          <div className="md:col-span-5">
            <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-mute mb-6">
              The footprint
            </p>
            <p className="font-display font-extrabold text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] tracking-[-0.035em] text-cream">
              100M<span className="text-fire">+</span>
            </p>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg md:text-xl text-cream/80 leading-relaxed max-w-xl">
              Monthly fans reached through{" "}
              <span className="text-cream font-medium">Rolling Stone</span>
              {" "}and{" "}
              <span className="text-cream font-medium">Billboard</span>
              {" "}alone. H30&apos;s partner network compounds that number
              across sports, music, and entertainment.
            </p>
            <p className="mt-6 text-[11px] tracking-[0.28em] uppercase font-medium text-mute">
              Hover the strip below to pause it
            </p>
          </div>
        </motion.div>
      </div>

      <div className="marquee-shell" aria-label="H30 partner network">
        <div className="marquee-track">
          {loop.map((partner, i) => (
            <span key={`${partner.name}-${i}`} className="marquee-item">
              {partner.src && partner.width && partner.height ? (
                <span className="marquee-item__logo">
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className="marquee-item__logo-img"
                    sizes="200px"
                  />
                </span>
              ) : (
                <span className="marquee-item__label">{partner.name}</span>
              )}
              <span className="marquee-sep" aria-hidden="true">
                &#9679;
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

type StatBlockProps = {
  stat: string;
  label: string;
  note: string;
};

function StatBlock({ stat, label, note }: StatBlockProps) {
  return (
    <motion.div
      className="border-t border-cream/15 pt-6"
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <p className="font-display font-extrabold text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-cream mb-4">
        {stat}
      </p>
      <p className="text-base md:text-lg font-medium text-cream mb-3">
        {label}
      </p>
      <p className="text-sm text-cream/65 leading-relaxed">{note}</p>
    </motion.div>
  );
}

function SeismicShift() {
  const reduce = useReducedMotion();

  return (
    <section
      id="shift"
      className="relative px-6 md:px-12 py-24 md:py-32 border-t border-cream/10"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-mute mb-6">
            <span className="font-mono text-fire mr-2">01</span>
            The seismic shift
          </p>
          <h2 className="font-display font-extrabold text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.025em] text-cream mb-12 md:mb-20 max-w-5xl">
            The infrastructure is{" "}
            <span className="text-fire">being replaced.</span>
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 md:gap-12"
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, margin: "-120px" }}
          variants={{
            show: { transition: { staggerChildren: 0.15 } },
          }}
        >
          <StatBlock
            stat="$800B+"
            label="Creator economy by early 2030s"
            note="Up from $250B in 2023. The fastest growing media segment in the world."
          />
          <StatBlock
            stat="95%"
            label="Of creators building direct-to-fan"
            note="Moving off ad-dependent platforms. Owning the audience, owning the upside."
          />
          <StatBlock
            stat="$145B+"
            label="Legacy media consolidation"
            note="UMG $64.4B. Warner Bros / Paramount $81B. The old infrastructure absorbed in 24 months."
          />
        </motion.div>
      </div>
    </section>
  );
}

type ProblemStatProps = {
  number: string;
  label: string;
  sub?: string;
};

function ProblemStat({ number, label, sub }: ProblemStatProps) {
  return (
    <div>
      <p className="font-display font-extrabold text-[clamp(2rem,4vw,3.5rem)] text-cream leading-none tracking-[-0.025em] mb-3">
        {number}
      </p>
      <p className="text-sm font-medium text-cream/85">{label}</p>
      {sub && <p className="text-xs text-mute mt-1">{sub}</p>}
    </div>
  );
}

function ProblemSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="problem"
      className="relative px-6 md:px-12 py-24 md:py-32 border-t border-cream/10"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className="mb-14 md:mb-20"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-mute mb-6">
            <span className="font-mono text-fire mr-2">02</span>
            The problem
          </p>
          <h2 className="font-display font-extrabold text-[clamp(2.5rem,7vw,7rem)] leading-[0.92] tracking-[-0.025em] text-cream max-w-5xl">
            Platform <span className="text-fire">feudalism.</span>
          </h2>
        </motion.div>

        <motion.p
          className="font-display font-extrabold text-[clamp(1.75rem,3.8vw,3.25rem)] leading-[1.04] tracking-[-0.015em] text-cream mb-14 md:mb-20 max-w-5xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.1 }}
        >
          Creators do 100% of the work for{" "}
          <span className="text-mute">a fraction of the value.</span>
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-14 md:mb-20 pt-12 border-t border-cream/15"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
        >
          <ProblemStat number="1.0M" label="Followers built" />
          <ProblemStat
            number="3.5%"
            label="Organic reach"
            sub="35K views per post"
          />
          <ProblemStat
            number="23%"
            label="Feed is ads"
            sub="Up from 11% in 2020"
          />
          <ProblemStat
            number="1 : 3"
            label="Ad-to-post ratio"
            sub="On algorithmic feeds"
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-12 gap-10 md:gap-14 mb-14 md:mb-20"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
        >
          <p className="md:col-span-6 text-base md:text-lg text-cream/80 leading-relaxed">
            You don&apos;t own the data. You don&apos;t own the community.
            You don&apos;t own the IP. One algorithm update erases years
            of growth.
          </p>
          <p className="md:col-span-6 text-base md:text-lg text-cream/80 leading-relaxed">
            The rent gets steeper every quarter. Reach drops. Ad inventory
            climbs. The platforms compound while the talent that built
            them rents the audience back.
          </p>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-cream font-medium leading-snug max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.25 }}
        >
          This is platform feudalism in numbers.{" "}
          <span className="text-fire">H30 builds the off-ramp.</span>
        </motion.p>
      </div>
    </section>
  );
}

function EmailCapture() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || !email.includes("@") || email.length < 5) {
      setErrorMsg("Drop a real email please.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something glitched. Try again in a moment.");
    }
  }

  return (
    <section className="relative px-6 md:px-12 py-24 md:py-28 border-t border-cream/10 bg-deeper/60">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className="grid md:grid-cols-12 gap-10 md:gap-14 items-end"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="md:col-span-6">
            <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-mute mb-6">
              The brief
            </p>
            <h2 className="font-display font-extrabold text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.98] tracking-[-0.025em] text-cream mb-5">
              Not ready to talk?{" "}
              <span className="text-mute">Get the read instead.</span>
            </h2>
            <p className="text-base md:text-lg text-cream/75 leading-relaxed max-w-xl">
              Once a quarter, H30 sends the brief on platform feudalism,
              consolidation moves, and the creators making the jump. No
              spam, no funnel pressure.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "submitting") setStatus("idle");
                  setErrorMsg(null);
                }}
                placeholder="you@yourdomain.com"
                disabled={status === "submitting" || status === "success"}
                aria-label="Email address"
                className="flex-1 px-5 py-4 bg-transparent border border-cream/30 text-cream placeholder:text-mute/70 focus:outline-none focus:border-cream transition-colors text-base disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="px-6 py-4 bg-cream text-ground text-sm font-semibold tracking-[0.12em] uppercase hover:bg-fire hover:text-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                {status === "submitting"
                  ? "Sending..."
                  : status === "success"
                    ? "On the list"
                    : "Subscribe"}
              </button>
            </div>

            <div className="mt-4 min-h-[1.5rem]">
              {status === "success" && (
                <p className="text-sm text-cream/85">
                  You&apos;re on the list. The next brief lands in ~90 days.
                </p>
              )}
              {status === "error" && errorMsg && (
                <p className="text-sm text-fire">{errorMsg}</p>
              )}
            </div>

            <p className="text-[10px] tracking-[0.28em] uppercase text-mute mt-2 font-mono">
              Klaviyo wiring pending .. submissions log to console for now
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

const CREATOR_FRAMES = [
  {
    src: "/topfan/triple-spur-band.png",
    name: "Triple Spur Band",
    industry: "Country music",
    location: "Nashville, TN",
    features:
      "Subscriptions. Merchandise. Live shows. Leaderboards. VIP offers. Paid DMs. Newsletters. All branded as theirs, all owned by them.",
  },
  {
    src: "/topfan/bonded-wealth.png",
    name: "Bonded Wealth",
    industry: "Finance podcast",
    location: "Indianapolis, IN",
    features:
      "Same engine. White-labeled in navy and gold for a husband-wife wealth advisory show. Podcasts, video series, e-books, sponsored ads they control.",
  },
  {
    src: "/topfan/sienna-brooks.png",
    name: "Sienna Brooks",
    industry: "Wellness coach",
    location: "Denver, CO",
    features:
      "Same engine. Coral and rose for a personal trainer's coaching practice. Newsletter, podcast, premium plans, store, follow-back socials.",
  },
];

type CreatorFrame = (typeof CREATOR_FRAMES)[number];

function SolutionSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="platform"
      className="relative border-t border-cream/10 px-6 md:px-12 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className="mb-16 md:mb-24"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-mute mb-6">
            <span className="font-mono text-fire mr-2">03</span>
            The platform
          </p>
          <h2 className="font-display font-extrabold text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.025em] text-cream max-w-5xl mb-6">
            Same engine.{" "}
            <span className="text-fire">Infinite skins.</span>
          </h2>
          <p className="text-base md:text-lg text-cream/75 leading-relaxed max-w-2xl">
            Three creators. Three industries. Three brand palettes. One
            platform. H30 builds it, runs it, and makes it work for each.
          </p>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {CREATOR_FRAMES.map((frame, i) => (
            <CreatorRow
              key={frame.name}
              frame={frame}
              index={i + 1}
              total={CREATOR_FRAMES.length}
              reverse={i % 2 === 1}
              reduce={reduce}
            />
          ))}
        </div>

        <motion.p
          className="text-xl md:text-2xl text-cream font-medium leading-snug mt-20 md:mt-28 max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          Same engine. Three industries.{" "}
          <span className="text-fire">Talent owns it.</span>
        </motion.p>
      </div>
    </section>
  );
}

function CreatorRow({
  frame,
  index,
  total,
  reverse,
  reduce,
}: {
  frame: CreatorFrame;
  index: number;
  total: number;
  reverse: boolean;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className="grid md:grid-cols-12 gap-8 md:gap-12 items-center"
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <div
        className={`md:col-span-7 ${reverse ? "md:order-2" : "md:order-1"}`}
      >
        <Image
          src={frame.src}
          alt={`${frame.name} on Topfan`}
          width={1200}
          height={900}
          sizes="(max-width: 768px) 90vw, 55vw"
          className="w-full h-auto"
          priority={index === 1}
        />
      </div>
      <div
        className={`md:col-span-5 ${reverse ? "md:order-1" : "md:order-2"}`}
      >
        <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-fire mb-3">
          0{index} / 0{total} .. {frame.industry}
        </p>
        <h3 className="font-display font-extrabold text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] text-cream mb-2">
          {frame.name}
        </h3>
        <p className="text-sm font-medium text-mute tracking-wide mb-5">
          {frame.location}
        </p>
        <p className="text-base md:text-lg text-cream/85 leading-relaxed max-w-md">
          {frame.features}
        </p>
      </div>
    </motion.div>
  );
}

const ENGINE_SERVICES = [
  {
    title: "Onboarding & migration",
    body: "Move creators off legacy platforms onto their own ecosystem. Set up the Topfan stack, port the data, brand the surface, ship it live.",
  },
  {
    title: "Content strategy",
    body: "Editorial direction, format experiments, programming calendars. We figure out what to publish, when, and why it lands.",
  },
  {
    title: "Monetization architecture",
    body: "Subscription tiers, merch, live drops, paid DMs, sponsor integration. The economy underneath the audience, designed deliberately.",
  },
  {
    title: "Audience growth",
    body: "Cross-platform funnel and partner amplification through Rolling Stone, Billboard, and the agency network. Volume meets ownership.",
  },
  {
    title: "Production",
    body: "Original content built with Notorious, Meteor 17, and Fogo.TV. Award-winning teams, on demand, with the IP staying with the talent.",
  },
  {
    title: "Capital and deals",
    body: "Investor introductions. M&A advisory. Built by people who took companies to Nasdaq, TSXV, and CSE.",
  },
];

function EngineSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id="engine"
      className="relative border-t border-cream/10 px-6 md:px-12 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className="mb-16 md:mb-20 max-w-5xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-mute mb-6">
            <span className="font-mono text-fire mr-2">04</span>
            The engine
          </p>
          <h2 className="font-display font-extrabold text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.025em] text-cream mb-6">
            Topfan ships the tech.{" "}
            <span className="text-fire">H30 ships everything else.</span>
          </h2>
          <p className="text-base md:text-lg text-cream/75 leading-relaxed max-w-2xl">
            The platform is the floor. The work that gets a creator from zero
            to owning their audience is the building. H30 is the building.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
          {ENGINE_SERVICES.map((service, i) => (
            <EngineCard
              key={service.title}
              index={i + 1}
              title={service.title}
              body={service.body}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EngineCard({
  index,
  title,
  body,
  reduce,
}: {
  index: number;
  title: string;
  body: string;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className="border-t border-cream/15 pt-6"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.08 }}
    >
      <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-fire mb-4">
        04.{String(index).padStart(2, "0")}
      </p>
      <h3 className="font-display font-bold text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.15] text-cream mb-4">
        {title}
      </h3>
      <p className="text-base text-cream/75 leading-relaxed">{body}</p>
    </motion.div>
  );
}

const TEAM_MEMBERS = [
  {
    initials: "JD",
    name: "Jesse Dylan",
    role: "Executive Chairman",
    credentials:
      "TSN · XM Satellite Radio Canada · Citytv · Stingray · UFC Canada · Nasdaq · TSXV · CSE",
    bio: "Multi-generational media innovator. Launched TSN and XM Satellite Radio Canada. Led Citytv, Stingray, and Viewers Choice. Brought UFC to Canada. Built multiple publicly listed companies.",
  },
  {
    initials: "CC",
    name: "Craig Conley",
    role: "President of Sports",
    credentials:
      "UFC · NHL · NFL · NBA · NASCAR · Niner Sports",
    bio: "Founder, Niner Sports. Produced every live televised UFC event for 24 years. Manages elite talent across UFC, NHL, NFL, NBA, NASCAR — Charles Barkley, Alex Pereira, Bruce Buffer, Jon Anik.",
  },
  {
    initials: "ST",
    name: "Stephen Tapp",
    role: "President",
    credentials:
      "TSN · XM Satellite Radio Canada · Citytv · Stingray · UFC Canada",
    bio: "Launched TSN and XM Satellite Radio Canada. Led Citytv, Stingray, Viewers Choice. Brought UFC to Canada. Deep expertise in global content distribution.",
  },
  {
    initials: "MW",
    name: "Mike Wekerle",
    role: "Capital Markets",
    credentials: "GMP Securities · GMPIM · Fiera Capital",
    bio: "Co-founded GMP Securities. Built GMPIM to nearly $1B AUM before sale to Fiera Capital. One of Canada's most celebrated capital markets veterans.",
  },
  {
    initials: "AB",
    name: "Andy Barroway",
    role: "Senior Advisor, Sports Business",
    credentials: "NHL · Arizona Coyotes · Hedge fund",
    bio: "Distinguished hedge fund magnate. Former owner of the Arizona Coyotes (NHL). Proven track record in sports investment.",
  },
];

const PLATFORM_PARTNERS = [
  {
    initials: "JK",
    name: "Jeffrey Kohn",
    role: "Founder, Topfan",
    credentials: "Topfan · NASA · Oracle · Sun Microsystems · RH Donnelley",
    bio: "Founded Topfan in 2015 after two decades at NASA Mission Control, Sun Microsystems, and Oracle as a Distinguished Enterprise Architect. Built the Direct-to-Fan and Fan Relationship Management technology now powering H30's creators. Puts first-party fan data back in talent's hands.",
  },
];

function TeamSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id="team"
      className="relative border-t border-cream/10 px-6 md:px-12 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className="mb-16 md:mb-20 max-w-5xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-mute mb-6">
            <span className="font-mono text-fire mr-2">05</span>
            The team
          </p>
          <h2 className="font-display font-extrabold text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.025em] text-cream mb-6">
            The architects{" "}
            <span className="text-fire">of giants.</span>
          </h2>
          <p className="text-base md:text-lg text-cream/75 leading-relaxed max-w-2xl">
            The people who built the platforms creators are now leaving.
            Now they&apos;re building the ones that replace them.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {TEAM_MEMBERS.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} reduce={reduce} />
          ))}
        </div>

        <motion.div
          className="mt-20 md:mt-24 pt-12 border-t border-cream/15"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-start">
            <div className="lg:col-span-1">
              <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-fire mb-4">
                In partnership with
              </p>
              <h3 className="font-display font-extrabold text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.05] text-cream mb-3">
                Platform partner.
              </h3>
              <p className="text-sm text-cream/70 leading-relaxed max-w-sm">
                Topfan is the white-labeled engine underneath every H30 creator.
                Jeff built it.
              </p>
            </div>

            {PLATFORM_PARTNERS.map((member, i) => (
              <TeamCard
                key={member.name}
                member={member}
                index={i}
                reduce={reduce}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TeamCard({
  member,
  index,
  reduce,
}: {
  member: (typeof TEAM_MEMBERS)[number];
  index: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className="group"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.08 }}
    >
      <TeamPortrait initials={member.initials} />
      <div className="mt-6">
        <h3 className="font-display font-extrabold text-2xl leading-tight text-cream mb-1">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-fire tracking-wide uppercase mb-4">
          {member.role}
        </p>
        <p className="text-sm text-cream/75 leading-relaxed mb-4">
          {member.bio}
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute leading-relaxed">
          {member.credentials}
        </p>
      </div>
    </motion.div>
  );
}

function TeamPortrait({ initials }: { initials: string }) {
  return (
    <div className="aspect-[4/5] relative bg-gradient-to-br from-deeper via-ground to-navy/30 border border-cream/10 flex items-center justify-center overflow-hidden">
      <span className="font-display font-extrabold text-[clamp(3rem,6vw,5rem)] text-cream/55 tracking-tight">
        {initials}
      </span>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ground to-transparent pointer-events-none" />
      <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.24em] uppercase text-mute">
        B&W portrait pending
      </div>
    </div>
  );
}

const PARTNERSHIPS = [
  {
    name: "Topfan",
    tag: "Platform",
    description:
      "World leader in fan engagement technology. The white-labeled platform underneath every H30 creator.",
  },
  {
    name: "Arthouse Media Group",
    tag: "Distribution",
    description:
      "Rolling Stone, Billboard, NXNE. Combined 100M+ monthly footprint across sports, music, and entertainment.",
  },
  {
    name: "Notorious Productions",
    tag: "Production",
    description:
      "30 years of content production. UFC, Joe Rogan, Kill Tony, Louis CK, Kevin James.",
  },
  {
    name: "Meteor 17",
    tag: "Documentary",
    description:
      "Produces the world's most-watched music documentaries, streaming globally.",
  },
  {
    name: "Fogo.TV",
    tag: "Production",
    description: "Grammy, Emmy, Gemini, and Juno award-winning productions.",
  },
  {
    name: "Warner Music + CBS",
    tag: "MOU signed",
    description: "MOU signed for an immersive tech platform.",
  },
  {
    name: "Roq City / Tricon",
    tag: "Community",
    description:
      "Cultural ecosystem and community programming partnership.",
  },
];

function PartnershipsSection() {
  const reduce = useReducedMotion();
  return (
    <section
      id="partners"
      className="relative border-t border-cream/10 px-6 md:px-12 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          className="mb-16 md:mb-20 max-w-5xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-mute mb-6">
            <span className="font-mono text-fire mr-2">06</span>
            Partnerships
          </p>
          <h2 className="font-display font-extrabold text-[clamp(2.25rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.025em] text-cream mb-6">
            The network is{" "}
            <span className="text-fire">the moat.</span>
          </h2>
          <p className="text-base md:text-lg text-cream/75 leading-relaxed max-w-2xl">
            Seven partnerships. One direction. The infrastructure to build,
            distribute, produce, and capitalize what comes next.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-cream/10 border border-cream/10">
          {PARTNERSHIPS.map((partner, i) => (
            <PartnerCard
              key={partner.name}
              partner={partner}
              index={i}
              reduce={reduce}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerCard({
  partner,
  index,
  reduce,
}: {
  partner: (typeof PARTNERSHIPS)[number];
  index: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      className="bg-ground p-8 md:p-10 group hover:bg-deeper/80 transition-colors"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 2) * 0.08 }}
    >
      <div className="flex items-start justify-between gap-6 mb-4">
        <h3 className="font-display font-extrabold text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1.05] text-cream tracking-tight">
          {partner.name}
        </h3>
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-fire shrink-0 mt-2 whitespace-nowrap">
          {partner.tag}
        </span>
      </div>
      <p className="text-base text-cream/75 leading-relaxed">
        {partner.description}
      </p>
    </motion.div>
  );
}

function FinalCTA() {
  const reduce = useReducedMotion();
  return (
    <section
      id="cta"
      className="relative border-t border-cream/10 px-6 md:px-12 py-32 md:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] relative">
        <motion.div
          className="max-w-5xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <p className="text-[10px] tracking-[0.28em] uppercase font-medium text-mute mb-6">
            <span className="font-mono text-fire mr-2">07</span>
            The call
          </p>
          <h2 className="font-display font-extrabold text-[clamp(2.5rem,8vw,8rem)] leading-[0.92] tracking-[-0.025em] text-cream mb-10">
            Ready to own{" "}
            <span className="text-fire">what you built?</span>
          </h2>
          <p className="text-lg md:text-xl text-cream/80 leading-relaxed max-w-2xl mb-14">
            Book a discovery call. Tell us about your audience. We&apos;ll
            show you what the off-ramp looks like, how the platform gets
            built, and how H30 runs it.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 sm:items-center">
            <a
              href="mailto:jesse@h30.live?subject=H30%20discovery%20call"
              className="cta-double group relative inline-flex items-center gap-4 bg-cream text-ground px-8 py-5 text-sm font-semibold tracking-[0.16em] uppercase shrink-0 overflow-hidden transition-colors hover:bg-fire hover:text-cream"
            >
              <span className="cta-double__label relative">
                <span className="cta-double__primary">
                  Book a discovery call
                </span>
                <span aria-hidden="true" className="cta-double__ghost">
                  Book a discovery call
                </span>
              </span>
              <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>

            <div className="text-sm text-mute leading-relaxed">
              <span className="block mb-1 font-mono text-[10px] tracking-[0.28em] uppercase">
                Or send a note
              </span>
              <a
                href="mailto:jesse@h30.live"
                className="text-cream hover:text-fire transition-colors underline underline-offset-4 decoration-cream/30 hover:decoration-fire"
              >
                jesse@h30.live
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="relative border-t border-cream/10 px-6 md:px-12 py-16 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 mb-14 md:mb-16">
          <div className="md:col-span-5">
            <Image
              src="/brand/h30-logo-icon.png"
              alt="H30 Media Group"
              width={158}
              height={44}
              className="block h-10 w-auto mb-6"
            />
            <p className="text-base text-cream/80 leading-relaxed max-w-md mb-4">
              Acquiring the future of media IP. Building the direct-to-fan
              platforms creators should have owned all along.
            </p>
            <p className="text-sm text-mute leading-relaxed">
              HANGR3 Entertainment Corp. dba H30 Media Group.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-mute mb-5">
              Sections
            </p>
            <ul className="space-y-2">
              {NAV_SECTIONS.map((s) => (
                <li key={s.num}>
                  <a
                    href={s.href}
                    className="group flex items-baseline gap-2 text-sm text-cream/85 hover:text-cream transition-colors"
                  >
                    <span className="font-mono text-[10px] text-mute group-hover:text-fire transition-colors">
                      {s.num}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-mute mb-5">
              Contact
            </p>
            <ul className="space-y-3 mb-8">
              <li>
                <a
                  href="mailto:jesse@h30.live"
                  className="text-sm text-cream/85 hover:text-fire transition-colors"
                >
                  jesse@h30.live
                </a>
              </li>
              <li>
                <a
                  href="#cta"
                  className="text-sm text-cream/85 hover:text-fire transition-colors"
                >
                  Book a discovery call &rarr;
                </a>
              </li>
            </ul>

            <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-mute mb-5">
              Find us
            </p>
            <ul className="flex gap-6">
              <li>
                <a
                  href="#"
                  className="text-sm text-cream/85 hover:text-fire transition-colors"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-cream/85 hover:text-fire transition-colors"
                  aria-label="X"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-cream/85 hover:text-fire transition-colors"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cream/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-mute">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase">
            &copy; 2026 HANGR3 Entertainment Corp. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-mono text-[10px] tracking-[0.22em] uppercase hover:text-cream transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-mono text-[10px] tracking-[0.22em] uppercase hover:text-cream transition-colors"
            >
              Terms
            </a>
            <a
              href="#top"
              className="font-mono text-[10px] tracking-[0.22em] uppercase hover:text-cream transition-colors"
            >
              &uarr; Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
