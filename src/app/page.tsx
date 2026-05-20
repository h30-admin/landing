"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
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
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}

function AmbientGradients() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // spotlight drifts diagonally across the page as you scroll
  // Range extended to ~10k px so it stays in motion through every section
  const spotTop = useTransform(scrollY, [0, 10000], ["18vh", "92vh"]);
  const spotLeft = useTransform(scrollY, [0, 10000], ["48vw", "10vw"]);
  const spotScale = useTransform(
    scrollY,
    [0, 3000, 6000, 10000],
    [1, 1.25, 1.15, 1.3]
  );

  return (
    <div className="ambient-stage" aria-hidden="true">
      <div className="ambient-glow ambient-glow--violet-top" />
      <div className="ambient-glow ambient-glow--navy-mid" />
      <div className="ambient-glow ambient-glow--fire-spark" />
      <div className="ambient-glow ambient-glow--ember-low" />
      <div className="ambient-glow ambient-glow--violet-deep" />
      <div className="ambient-glow ambient-glow--navy-shift" />
      <div className="ambient-glow ambient-glow--ember-section" />
      <div className="ambient-glow ambient-glow--violet-engine" />
      <div className="ambient-glow ambient-glow--fire-team" />
      <div className="ambient-glow ambient-glow--navy-partners" />
      <div className="ambient-glow ambient-glow--ember-cta" />
      <div className="ambient-glow ambient-glow--violet-footer" />
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
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-cream/5 backdrop-blur-md bg-ground/60">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 flex items-center justify-between py-4 md:py-5">
          <a href="#top" className="flex items-center" onClick={() => setOpen(false)}>
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

          <div className="flex items-center gap-4">
            <a
              href="#cta"
              className="hidden md:inline-flex text-[11px] font-semibold tracking-[0.18em] uppercase border border-cream/40 text-cream px-4 py-2 hover:bg-cream hover:text-ground transition-colors"
            >
              Book a call
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] group"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[7.5px]" : ""}`}
              />
              <span
                className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block w-6 h-[1.5px] bg-cream transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[7.5px]" : ""}`}
              />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 bg-ground/97 backdrop-blur-lg flex flex-col px-8 pt-28 pb-12 md:hidden"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col gap-8 flex-1">
              {NAV_SECTIONS.map((s, i) => (
                <motion.li
                  key={s.num}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                >
                  <a
                    href={s.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4"
                  >
                    <span className="font-mono text-[11px] text-fire tracking-[0.2em]">
                      {s.num}
                    </span>
                    <span className="font-display font-extrabold text-[clamp(2rem,8vw,3.5rem)] text-cream leading-none tracking-[-0.02em] group-hover:text-fire transition-colors">
                      {s.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="mt-auto w-full text-center text-[11px] font-semibold tracking-[0.18em] uppercase border border-cream/40 text-cream px-4 py-4 hover:bg-cream hover:text-ground transition-colors"
            >
              Book a call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
  { name: "Denver Broncos", src: "/partners/denver-broncos.png", width: 1280, height: 751 },
  { name: "Maroon 5", src: "/partners/maroon-5.png", width: 886, height: 169 },
  { name: "FOX", src: "/partners/fox.png", width: 1441, height: 600 },
  { name: "The Lumineers", src: "/partners/lumineers.png", width: 1299, height: 600 },
  { name: "WB", src: "/partners/wb.png", width: 569, height: 600 },
  { name: "NFL Players Association", src: "/partners/nfl-pa.png", width: 2000, height: 676 },
  { name: "MGM", src: "/partners/mgm.png", width: 3840, height: 2160 },
  { name: "Niner Entertainment", src: "/partners/9er.png", width: 610, height: 600 },
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
          <div className="md:col-span-12">
            <p className="font-display font-extrabold text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-cream max-w-4xl">
              The{" "}
              <span className="text-fire">#1</span>{" "}
              Direct to Fan Platform..{" "}
              Trusted by Leaders in Sports &amp; Entertainment
            </p>
          </div>
        </motion.div>
      </div>

      <div className="marquee-shell" aria-label="Topfan clients">
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
            You built it.{" "}
            <span className="text-fire">They own it.</span>
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
          className="grid md:grid-cols-12 gap-10 md:gap-14 mb-14 md:mb-20 pt-12 border-t border-cream/15"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
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
          H30&apos;s solution puts the power back in the creator&apos;s hands..{" "}
          <span className="text-fire">and equips them with the team to build on it.</span>
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
              Once a quarter, H30 sends the brief on creator ownership,
              consolidation moves, and the talent making the jump. No
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

const CREATOR_CARDS = [
  {
    type: "image",
    src: "/topfan/sienna-mobile.png",
    width: 1080,
    height: 1920,
    name: "Sienna Brooks",
    tag: "Wellness",
    gradient: "",
  },
  {
    type: "logo",
    logo: "/partners/maroon-5.png",
    logoW: 886,
    logoH: 169,
    name: "Maroon 5",
    tag: "Music",
    gradient: "from-violet/60 via-ground to-deeper",
  },
  {
    type: "logo",
    logo: "/partners/denver-broncos.png",
    logoW: 1280,
    logoH: 751,
    name: "Denver Broncos",
    tag: "Sports",
    gradient: "from-navy/70 via-ground to-deeper",
  },
  {
    type: "logo",
    logo: "/partners/lumineers.png",
    logoW: 1299,
    logoH: 600,
    name: "The Lumineers",
    tag: "Music",
    gradient: "from-ember/50 via-ground to-deeper",
  },
  {
    type: "logo",
    logo: "/partners/nfl-pa.png",
    logoW: 2000,
    logoH: 676,
    name: "NFL Players Assoc.",
    tag: "Sports",
    gradient: "from-navy/70 via-ground to-deeper",
  },
  {
    type: "logo",
    logo: "/partners/mgm.png",
    logoW: 3840,
    logoH: 2160,
    name: "MGM",
    tag: "Entertainment",
    gradient: "from-violet/50 via-ground to-deeper",
  },
  {
    type: "logo",
    logo: "/partners/wb.png",
    logoW: 569,
    logoH: 600,
    name: "Warner Bros.",
    tag: "Entertainment",
    gradient: "from-ember/50 via-ground to-deeper",
  },
  {
    type: "logo",
    logo: "/partners/9er.png",
    logoW: 610,
    logoH: 600,
    name: "Niner Entertainment",
    tag: "Sports",
    gradient: "from-navy/60 via-ground to-deeper",
  },
  {
    type: "logo",
    logo: "/partners/fox.png",
    logoW: 1441,
    logoH: 600,
    name: "FOX",
    tag: "Media",
    gradient: "from-ember/50 via-ground to-deeper",
  },
];

function SolutionSection() {
  const reduce = useReducedMotion();
  const loop = [...CREATOR_CARDS, ...CREATOR_CARDS];

  return (
    <section
      id="platform"
      className="relative border-t border-cream/10 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <motion.div
          className="mb-16 md:mb-20"
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
            Direct to fan monetization.{" "}
            <span className="text-fire">Built for every type of creator.</span>
          </h2>
          <p className="text-base md:text-lg text-cream/75 leading-relaxed max-w-2xl">
            Brands. Athletes. Musicians. Entertainers. One platform, built to
            their brand, owned by them. H30 builds it, runs it, and grows it.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="creator-carousel"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={reduce ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="creator-carousel__track py-2">
          {loop.map((card, i) => (
            <div key={i} className="creator-card">
              {card.type === "image" ? (
                <>
                  <Image
                    src={card.src!}
                    alt={card.name}
                    width={card.width!}
                    height={card.height!}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    sizes="240px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ground/80 via-transparent to-transparent" />
                </>
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} flex items-center justify-center p-6`}>
                  <Image
                    src={card.logo!}
                    alt={card.name}
                    width={card.logoW!}
                    height={card.logoH!}
                    className="w-full h-auto max-h-16 object-contain filter brightness-0 invert opacity-80"
                    sizes="180px"
                  />
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-fire mb-1">
                  {card.tag}
                </p>
                <p className="font-display font-bold text-sm text-cream leading-tight">
                  {card.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <motion.div
          className="grid md:grid-cols-2 gap-6 md:gap-8 mt-16 md:mt-20"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div>
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-fire mb-3">
              Finance podcast
            </p>
            <Image
              src="/topfan/bonded-wealth.png"
              alt="Bonded Wealth on Topfan"
              width={1070}
              height={637}
              sizes="(max-width: 768px) 90vw, 45vw"
              className="w-full h-auto"
            />
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-fire mb-3">
              Wellness coach
            </p>
            <Image
              src="/topfan/sienna-brooks.png"
              alt="Sienna Brooks on Topfan"
              width={1070}
              height={637}
              sizes="(max-width: 768px) 90vw, 45vw"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-cream font-medium leading-snug mt-14 md:mt-18 max-w-3xl"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          One platform. Every vertical.{" "}
          <span className="text-fire">Talent owns it all.</span>
        </motion.p>
      </div>
    </section>
  );
}

const ENGINE_SERVICES = [
  {
    title: "Onboarding & migration",
    body: "Move creators off legacy platforms onto their own ecosystem. Set up the Topfan stack, port the data, brand the surface, ship it live.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="8" height="18" rx="1.5"/>
        <path d="M14 8l6 4-6 4"/>
        <path d="M20 12H10"/>
      </svg>
    ),
  },
  {
    title: "Content strategy",
    body: "Editorial direction, format experiments, programming calendars. We figure out what to publish, when, and why it lands.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"/>
        <path d="M15 9l-4.5 4.5M9 15l1.5-1.5"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    title: "Monetization architecture",
    body: "Subscription tiers, merch, live drops, paid DMs, sponsor integration. The economy underneath the audience, designed deliberately.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l9 4.5L12 11 3 6.5z"/>
        <path d="M3 11.5l9 4.5 9-4.5"/>
        <path d="M3 17l9 4.5 9-4.5"/>
      </svg>
    ),
  },
  {
    title: "Audience growth",
    body: "Cross-platform funnel and partner amplification through Rolling Stone, Billboard, and the agency network. Volume meets ownership.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 17l5-6 4 3.5L17 8l4-2"/>
        <path d="M17 6h4v4"/>
      </svg>
    ),
  },
  {
    title: "Production",
    body: "Original content built with Notorious, Meteor 17, and Fogo.TV. Award-winning teams, on demand, with the IP staying with the talent.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="8" width="20" height="13" rx="1.5"/>
        <path d="M2 12h20"/>
        <path d="M7 8V4M12 8V4M17 8V4"/>
      </svg>
    ),
  },
  {
    title: "Capital and deals",
    body: "Investor introductions. M&A advisory. Built by people who took companies to Nasdaq, TSXV, and CSE.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"/>
        <path d="M8.5 14.5l2-2.5 2 1.5L15.5 9"/>
        <path d="M13.5 9h2v2"/>
      </svg>
    ),
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
              icon={service.icon}
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
  icon,
  reduce,
}: {
  index: number;
  title: string;
  body: string;
  icon: React.ReactNode;
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
      <div className="text-fire mb-5">{icon}</div>
      <h3 className="font-display font-bold text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.15] text-cream mb-4">
        {title}
      </h3>
      <p className="text-base text-cream/75 leading-relaxed">{body}</p>
    </motion.div>
  );
}

const TEAM_MEMBERS = [
  {
    name: "Jesse Dylan",
    role: "Chairman",
    credentials: "Nasdaq · TSXV · CSE · TSN · UFC Canada · Citytv · Stingray",
    bio: "Award-winning broadcaster and best-selling author. Built multiple companies listed on Nasdaq, TSXV & CSE. Multi-generational media innovator.",
  },
  {
    name: "Craig Conley",
    role: "President of Sports",
    credentials: "UFC · NHL · NFL · NBA · NASCAR · Niner Sports",
    bio: "Founder, Niner Sports. Produced every live televised UFC event for 24 years. Manages elite roster across NHL, NFL, NBA, NASCAR & UFC.",
  },
  {
    name: "Stephen Tapp",
    role: "Co-Chairman",
    credentials: "TSN · XM Satellite Radio Canada · Citytv · Stingray · UFC Canada",
    bio: "Launched TSN and XM Satellite Radio Canada. Led Citytv, Stingray, Viewers Choice. Brought UFC to Canada. Deep expertise in global content distribution.",
  },
  {
    name: "Mike Wekerle",
    role: "Capital Markets",
    credentials: "GMP Securities · GMPIM · Fiera Capital",
    bio: "Co-founded GMP Securities. Built GMPIM to nearly $1B AUM before sale to Fiera Capital. One of Canada's most celebrated capital markets veterans.",
  },
  {
    name: "Andy Barroway",
    role: "Senior Advisor, Sports Business",
    credentials: "NHL · Arizona Coyotes",
    bio: "Distinguished hedge fund magnate. Former owner of the Arizona Coyotes (NHL). Proven track record in sports investment and strategic deployment.",
  },
  {
    name: "Jeffrey Kohn",
    role: "Founder, Topfan",
    credentials: "Topfan · NASA · Oracle · Sun Microsystems · RH Donnelley",
    bio: "Founded Topfan in 2015 after two decades at NASA Mission Control, Sun Microsystems, and Oracle as a Distinguished Enterprise Architect. Built the Direct-to-Fan and Fan Relationship Management technology now powering H30's creators.",
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
            The architects of industry-defining platforms have re-united
            to build the one that puts power back where it belongs.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {TEAM_MEMBERS.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} reduce={reduce} />
          ))}
        </div>

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
      className="border-t border-cream/15 pt-6"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay: (index % 3) * 0.08 }}
    >
      <h3 className="font-display font-extrabold text-2xl leading-tight text-cream mb-1">
        {member.name}
      </h3>
      <p className="text-sm font-medium text-fire tracking-wide uppercase mb-4">
        {member.role}
      </p>
      <p className="text-sm text-cream/75 leading-relaxed mb-5">
        {member.bio}
      </p>
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute leading-relaxed">
        {member.credentials}
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
