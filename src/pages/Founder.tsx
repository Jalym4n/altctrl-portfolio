import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LabsProducts from "@/components/LabsProducts";
import { applySEO } from "@/lib/seo";

const timeline = [
  {
    when: "Jun 2026 – Present",
    role: "Medical Laboratory Technician",
    org: "Community diagnostic laboratory, Ontario",
    note: "High-volume hematology, chemistry, and urinalysis on automated analyzers; quality control and data integrity in a regulated, accredited lab.",
  },
  {
    when: "Dec 2023 – Present",
    role: "Founder & Principal Consultant",
    org: "ALTCTRL Solutions, Mississauga",
    note: "Founded an IT services company for households, clinics, and small businesses. Leads AI Labs, building privacy-first AI and security tools for healthcare.",
  },
  {
    when: "Feb 2024 – Dec 2025",
    role: "Medical Device & Ophthalmic Sales Representative",
    org: "Prism Eye Institute, Southern Ontario",
    note: "Onboarded and trained multi-site eye-care clinics on diagnostic equipment and treatment technologies; 15+ clinical training sessions.",
  },
  {
    when: "Dec 2022 – Sep 2023",
    role: "Clinical Ophthalmic Technician",
    org: "Prism Eye Institute, Mississauga and Brampton",
    note: "OCT, retinal imaging, and visual fields in high-volume specialty clinics; patient intake and clinical documentation.",
  },
  {
    when: "Dec 2021 – Sep 2022",
    role: "Medical Laboratory Technician",
    org: "Community diagnostic laboratory, Ontario",
    note: "Chemistry and hematology testing with strict quality control and documentation.",
  },
];

const skills = [
  {
    title: "Security & Privacy",
    items: ["Privacy engineering and de-identification", "LLM security and prompt injection", "Threat modelling (STRIDE)", "Cryptographic integrity (HMAC, hash chains)", "API security and OAuth / SMART on FHIR"],
  },
  {
    title: "AI & Data",
    items: ["Retrieval-augmented generation (RAG)", "Fine-tuning open-weight LLMs", "Python, SQL", "Detection evaluation (precision, recall)", "Dashboards and reporting"],
  },
  {
    title: "Healthcare",
    items: ["Clinical laboratory operations and QC", "Ophthalmic diagnostics", "Clinic workflows and EMR documentation", "Ontario health privacy context (PHIPA)"],
  },
  {
    title: "Infrastructure",
    items: ["Networks and workstation fleets", "Microsoft 365 and Google Workspace", "Cloud: Azure, AWS, GCP", "Data recovery and BitLocker remediation", "Hardware and board-level repair"],
  },
];

const interests = [
  "Privacy-preserving AI for clinical settings",
  "Detecting insider threats and inappropriate access to health records",
  "Security of health-data APIs and interoperability standards",
  "Making security practical for small organizations without IT staff",
];

const Founder = () => {
  useEffect(() => {
    applySEO({
      title: "Jaleed Ahmad — Founder, ALTCTRL Solutions",
      description:
        "Jaleed Ahmad builds security and privacy tools for healthcare. Founder of ALTCTRL Solutions, with a background in clinical laboratory work, ophthalmic diagnostics, and clinic IT.",
      canonical: "https://altctrl.run/founder",
      ogType: "profile",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Jaleed Ahmad",
        url: "https://altctrl.run/founder",
        image: "https://altctrl.run/jaleed-ahmad.jpg",
        jobTitle: "Founder",
        worksFor: { "@type": "Organization", name: "ALTCTRL Solutions", url: "https://altctrl.run" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "McMaster University" },
        sameAs: ["https://github.com/Jalym4n"],
      },
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Navbar />
      <main className="pt-14">
        {/* Hero */}
        <section className="px-6 md:px-20 pt-16 md:pt-24 pb-16 relative overflow-hidden bg-noise">
          <div className="absolute inset-0 glow-green pointer-events-none" />
          <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[auto,1fr] gap-10 md:gap-14 items-center">
            <img
              src="/jaleed-ahmad.jpg"
              alt="Jaleed Ahmad"
              width={240}
              height={240}
              className="w-40 h-40 md:w-60 md:h-60 rounded-full object-cover border border-border"
            />
            <div>
              <div className="text-[13px] tracking-[4px] text-faint uppercase mb-4">// founder</div>
              <h1 className="font-display text-[clamp(48px,7vw,84px)] leading-[0.95] text-foreground mb-5">
                Jaleed <span className="text-accent">Ahmad</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground leading-snug max-w-3xl mb-5">
                Security and privacy for healthcare. I build tools that protect patient data in the places I&apos;ve seen it put at risk.
              </p>
              <p className="text-base text-dim leading-relaxed max-w-3xl mb-8">
                Five years inside Ontario healthcare, across diagnostic laboratories and specialty eye clinics, and the founder of ALTCTRL Solutions, an IT services
                company and AI Labs research division. BSc, McMaster University.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="font-mono text-[13px] tracking-[3px] text-primary-foreground bg-accent border border-accent px-6 py-3.5 uppercase hover:bg-transparent hover:text-accent transition-colors rounded-md"
                >
                  → See my projects
                </a>
                <a
                  href="https://github.com/Jalym4n"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[13px] tracking-[3px] text-foreground border border-border px-6 py-3.5 uppercase hover:border-accent hover:text-accent transition-colors rounded-md"
                >
                  GitHub
                </a>
                <a
                  href="mailto:jaleed01@altctrl.run"
                  className="font-mono text-[13px] tracking-[3px] text-foreground border border-border px-6 py-3.5 uppercase hover:border-accent hover:text-accent transition-colors rounded-md"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="px-6 md:px-20 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="text-[13px] tracking-[4px] text-faint uppercase mb-3">// why i build this</div>
            <h2 className="font-display text-[clamp(32px,4vw,46px)] text-foreground mb-8">From the bench to security</h2>
            <div className="space-y-5 text-base text-dim leading-relaxed">
              <p>
                In the lab, I learned that data can pass every check and still be wrong. We caught drifting analyzers by watching trends, not thresholds, because a
                patient&apos;s result depended on it. That habit of looking for the problem before it becomes a failure is the core of how I approach security.
              </p>
              <p>
                In clinics, I saw how much sensitive information moves through a normal day: intake forms, imaging, referral letters, and now AI tools that staff
                want to use but aren&apos;t sure are safe. Running ALTCTRL, I set up networks and cloud systems for clinics that have no IT staff of their own,
                and saw how much depends on getting the basics right.
              </p>
              <p>
                AI Labs is where those experiences meet. Each project below tackles a specific way patient data is put at risk, and each one ships with a threat
                model, automated tests, and an honest account of its limitations.
              </p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <LabsProducts
          id="projects"
          eyebrow="// security projects"
          title={
            <>
              What I&apos;m <span className="text-accent">Building</span>
            </>
          }
          intro="Four projects on one theme: protecting patient data in AI prompts, health-record access, health-data APIs, and small-clinic IT."
        />

        {/* Background */}
        <section className="px-6 md:px-20 py-16 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-[13px] tracking-[4px] text-faint uppercase mb-3">// background</div>
            <h2 className="font-display text-[clamp(32px,4vw,46px)] text-foreground mb-10">Experience</h2>
            <ol className="border-l border-border ml-2 space-y-10">
              {timeline.map((t) => (
                <li key={`${t.role}-${t.when}`} className="pl-8 relative">
                  <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent" aria-hidden="true" />
                  <div className="text-[12px] tracking-[2px] uppercase text-faint mb-1">{t.when}</div>
                  <div className="font-display text-[26px] text-foreground leading-tight">{t.role}</div>
                  <div className="text-sm text-dim mb-2">{t.org}</div>
                  <p className="text-sm text-dim leading-relaxed max-w-3xl">{t.note}</p>
                </li>
              ))}
              <li className="pl-8 relative">
                <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary" aria-hidden="true" />
                <div className="text-[12px] tracking-[2px] uppercase text-faint mb-1">2021 – 2026</div>
                <div className="font-display text-[26px] text-foreground leading-tight">Bachelor of Science</div>
                <div className="text-sm text-dim">McMaster University, Hamilton, Ontario</div>
              </li>
            </ol>
          </div>
        </section>

        {/* Skills + interests */}
        <section className="px-6 md:px-20 py-16 border-t border-border bg-noise bg-circuit relative">
          <div className="relative max-w-6xl mx-auto">
            <div className="text-[13px] tracking-[4px] text-faint uppercase mb-3">// skills</div>
            <h2 className="font-display text-[clamp(32px,4vw,46px)] text-foreground mb-10">What I work with</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border mb-14">
              {skills.map((s) => (
                <div key={s.title} className="bg-surface p-7">
                  <div className="font-display text-[24px] text-foreground mb-4">{s.title}</div>
                  <ul className="space-y-2">
                    {s.items.map((i) => (
                      <li key={i} className="text-sm text-dim leading-relaxed">{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="text-[13px] tracking-[4px] text-faint uppercase mb-3">// research interests</div>
                <ul className="space-y-3">
                  {interests.map((i) => (
                    <li key={i} className="flex gap-3 text-base text-dim leading-relaxed">
                      <span className="text-accent" aria-hidden="true">▸</span>
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[13px] tracking-[4px] text-faint uppercase mb-3">// community</div>
                <p className="text-base text-dim leading-relaxed">
                  Volunteer with <span className="text-foreground">Humanity First Canada</span>, including the Shelter Bus, Toronto&apos;s mobile overnight
                  shelter for people experiencing homelessness, and the Feed a Family food bank.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="px-6 md:px-20 py-16 border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-[clamp(32px,4vw,46px)] text-foreground mb-4">Get in touch</h2>
            <p className="text-base text-dim mb-8">
              For research, collaboration, or questions about any project, email{" "}
              <a href="mailto:jaleed01@altctrl.run" className="text-accent hover:underline">jaleed01@altctrl.run</a>.
            </p>
            <Link to="/ai-labs" className="text-[12px] tracking-[3px] uppercase text-dim hover:text-accent">
              ← Back to AI Labs
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Founder;
