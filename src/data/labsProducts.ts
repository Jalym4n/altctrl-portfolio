// Product catalogue for ALTCTRL / AI Labs.
// Each entry drives a card on /ai-labs and /founder and a full page at /ai-labs/:slug.
// Keep claims honest: status must reflect what actually exists today.

export type ProductStatus = "open-source" | "in-development" | "planned";

export type LabsProduct = {
  slug: string;
  name: string;
  icon: string;
  status: ProductStatus;
  statusLabel: string;
  tagline: string;
  summary: string;
  audience: string;
  problem: string[];
  features: { title: string; desc: string }[];
  howItWorks: string[];
  security: string[];
  limitations: string[];
  tags: string[];
  github?: string;
  codeSample?: string;
  cta: { label: string; href: string };
  seoDescription: string;
};

export const STATUS_STYLE: Record<ProductStatus, { color: string; dot: string }> = {
  "open-source": { color: "hsl(var(--green))", dot: "hsl(var(--green))" },
  "in-development": { color: "hsl(var(--accent))", dot: "hsl(var(--accent))" },
  planned: { color: "hsl(var(--text-dim))", dot: "hsl(var(--text-faint))" },
};

export const labsProducts: LabsProduct[] = [
  {
    slug: "phi-guard",
    name: "phi-guard",
    icon: "🛡️",
    status: "open-source",
    statusLabel: "Open source · v0.1 · Studio in development",
    tagline: "Use AI in your clinic without putting patient details at risk.",
    summary:
      "A privacy and security layer that sits between clinical text and AI tools. It finds and replaces patient details, screens documents for prompt-injection attacks, and keeps a tamper-evident record of what it did. It runs entirely on your own computer.",
    audience: "Clinics, clinicians, and healthcare teams that want to use AI tools safely.",
    problem: [
      "Clinicians want AI help with summaries, letters, and paperwork, but pasting a note into an AI tool can expose names, health card numbers, and dates of birth.",
      "In AI systems that read from a document library, a tampered document can carry hidden instructions that hijack the AI. This is called prompt injection, and it is the top risk in the OWASP Top 10 for LLM Applications.",
      "Privacy officers need proof of what was shared, and a log that nobody quietly edited.",
    ],
    features: [
      {
        title: "Removes patient details",
        desc: "Finds names, Ontario health card (OHIP) numbers, SINs, dates of birth, chart numbers, phone numbers, emails, and postal codes. Health card numbers and SINs are checksum-validated, so ordinary numbers like lab values are left alone.",
      },
      {
        title: "Reversible codes",
        desc: "Each detail becomes a stable code such as [SIN_2311c0d1]. The AI keeps the context it needs, and you can restore the real values afterwards on your own computer.",
      },
      {
        title: "Blocks prompt injection",
        desc: "Scores documents for attacks before they reach the AI, including ones hidden with invisible characters, look-alike letters, or encoded text. Risky documents are blocked, not just flagged.",
      },
      {
        title: "Tamper-evident activity log",
        desc: "Every check is recorded in a hash-chained log. Editing or deleting any past entry is detectable. The log stores counts, never patient details.",
      },
      {
        title: "Runs only on your computer",
        desc: "No cloud, no uploads, no tracking. ALTCTRL never sees your patients' data.",
      },
      {
        title: "phi-guard Studio (in development)",
        desc: "A point-and-click app for clinic staff: paste or drop a file, review what was found, and copy a safe version. No technical knowledge needed.",
      },
    ],
    howItWorks: [
      "Paste a note or open a document.",
      "phi-guard highlights every patient detail it finds.",
      "Review the list, keep or remove each item, and add anything it missed.",
      "Copy the safe version into any AI tool.",
      "Restore the real details in the AI's answer, on your computer only.",
    ],
    security: [
      "Keyed pseudonymization with HMAC-SHA256: codes cannot be reversed without your clinic's secret key.",
      "Unicode normalization, invisible-character detection, and Base64 decoding before injection screening.",
      "SHA-256 hash-chained audit log with a one-click integrity check.",
      "Fails closed: a document judged high-risk is removed from the AI's input, not passed through with a warning.",
      "Zero runtime dependencies in the core library; 29 automated tests.",
    ],
    limitations: [
      "Pattern-based detection can miss some names and addresses written without context. Always review the results.",
      "Prompt-injection screening is heuristic. It is one layer of protection, not a guarantee.",
      "phi-guard supports good privacy practice. It does not by itself make any organization compliant with PHIPA, HIPAA, or other laws.",
    ],
    tags: ["Privacy engineering", "AI security", "Python", "Open source"],
    github: "https://github.com/Jalym4n/phi-guard",
    codeSample:
      "$ phi-guard redact visit-note.txt\nPatient: [PATIENT_NAME_a2b63bcd]\nDOB: [DATE_OF_BIRTH_18dceb35]\nHealth card: [OHIP_NUMBER_981fa471]\nAssessment: HbA1c 7.2%, up from 6.8%.\n\n$ phi-guard inject policy.txt\nverdict: block (score 1.0)\n  - instruction_override\n  - data_exfiltration\n  - markdown_image_exfil",
    cta: { label: "Join the clinic pilot", href: "/contact" },
    seoDescription:
      "phi-guard removes patient details before text reaches AI, blocks prompt-injection attacks, and keeps a tamper-evident log. Runs locally. Open source.",
  },
  {
    slug: "ehr-access-watch",
    name: "ehr-access-watch",
    icon: "👁️",
    status: "in-development",
    statusLabel: "In development",
    tagline: "Catch staff snooping in health records before it becomes a breach.",
    summary:
      "A detection system that reads electronic health record access logs and flags suspicious access, such as staff opening the charts of celebrities, co-workers, neighbours, or family members with no care relationship. Every alert explains in plain language why it fired.",
    audience: "Privacy officers and compliance teams at hospitals and multi-site clinics.",
    problem: [
      "Staff viewing records they have no work reason to see is one of the most common causes of health privacy breaches reported in Ontario.",
      "Hospitals are expected to audit access logs, but there are far too many entries for people to review by hand.",
    ],
    features: [
      {
        title: "Care-relationship checks",
        desc: "Flags access to a patient when the user is not on the care team, has no related order, and has no emergency context.",
      },
      {
        title: "Explainable rules",
        desc: "VIP and co-worker charts, same surname, same neighbourhood, repeated targets, off-hours access, bulk printing, and accounts used after an employee has left.",
      },
      {
        title: "Behavioural anomaly detection",
        desc: "Compares each user with their own history and their peers, and explains the top reasons a day looked unusual.",
      },
      {
        title: "Case-based review dashboard",
        desc: "Groups related alerts into cases with a timeline, a status workflow, and notes, so privacy officers review cases instead of thousands of rows.",
      },
    ],
    howItWorks: [
      "Load access logs and care-team data.",
      "Rules and anomaly models score every access.",
      "Related alerts are grouped into cases and ranked by risk.",
      "A privacy officer reviews each case with a plain-language explanation.",
    ],
    security: [
      "The dashboard logs its own users in a hash-chained audit trail: watching the watchers.",
      "Role-based access, password hashing with Argon2, and CSRF protection.",
      "Data minimization: patient names appear only inside a case, and viewing them is logged.",
    ],
    limitations: [
      "Built and evaluated on a fully synthetic hospital dataset. Real deployments need tuning on each organization's own patterns.",
      "Supports privacy auditing; it does not replace an organization's investigation process.",
    ],
    tags: ["Insider threat", "Anomaly detection", "Privacy auditing"],
    cta: { label: "Ask about early access", href: "/contact" },
    seoDescription:
      "ehr-access-watch detects inappropriate access to electronic health records with explainable rules and anomaly detection. In development at ALTCTRL AI Labs.",
  },
  {
    slug: "fhir-sentry",
    name: "fhir-sentry",
    icon: "🔐",
    status: "in-development",
    statusLabel: "In development",
    tagline: "Find security misconfigurations in health-data APIs before attackers do.",
    summary:
      "A read-only auditing tool for FHIR servers, the standard API for exchanging health records. It checks authentication, OAuth scopes, CORS, TLS, error handling, rate limits, and more, then produces a clear report with fixes.",
    audience: "Health IT teams and developers who run or build on FHIR APIs.",
    problem: [
      "More health systems and apps now expose FHIR APIs, and a single misconfiguration can expose patient records.",
      "Security checklists exist, but checking a live API against them by hand is slow and inconsistent.",
    ],
    features: [
      {
        title: "17 security checks",
        desc: "Authentication, SMART on FHIR discovery, over-broad scopes, bulk export exposure, CORS, TLS and HSTS, security headers, verbose errors, rate limiting, unbounded search, and more.",
      },
      {
        title: "Mapped to OWASP API Security Top 10",
        desc: "Each finding explains the risk in plain language and how to fix it.",
      },
      {
        title: "Reports for every audience",
        desc: "An HTML report for managers, plus JSON, SARIF for GitHub code scanning, and Markdown for tickets.",
      },
    ],
    howItWorks: [
      "Confirm you own or are authorized to test the server.",
      "fhir-sentry sends a small number of safe, read-only requests.",
      "Each check reports pass or fail with evidence.",
      "Review the report and apply the suggested fixes.",
    ],
    security: [
      "Read-only by design: the tool refuses to send anything except safe HTTP methods.",
      "Authorization gate: public targets require an explicit allow-list and confirmation.",
      "Built-in rate limits and a hard request budget.",
      "Never stores or prints patient data values.",
    ],
    limitations: [
      "A configuration auditor, not a penetration test. It does not attempt exploits.",
      "Only for systems you own or have written permission to test.",
    ],
    tags: ["API security", "OAuth / SMART on FHIR", "Healthcare interoperability"],
    cta: { label: "Ask about early access", href: "/contact" },
    seoDescription:
      "fhir-sentry is a read-only security configuration auditor for FHIR health-data APIs, mapped to the OWASP API Security Top 10. In development at ALTCTRL AI Labs.",
  },
  {
    slug: "clinic-shield",
    name: "clinic-shield",
    icon: "🏥",
    status: "planned",
    statusLabel: "Planned · free tool",
    tagline: "A 15-minute security check-up for small clinics, in plain language.",
    summary:
      "A free, browser-based self-assessment that turns the CIS Critical Security Controls into simple questions for clinic owners and managers. It produces a score, the top five things to do this month, and a printable action plan. Your answers never leave your device.",
    audience: "Small clinics without in-house IT: family practice, physiotherapy, dental, eye care, and pharmacy.",
    problem: [
      "Small clinics hold sensitive health data but rarely have security staff.",
      "Security frameworks are written for large organizations and are hard for a clinic manager to apply.",
    ],
    features: [
      {
        title: "Plain-language questionnaire",
        desc: "Around 50 questions on devices, passwords, backups, email safety, updates, staff awareness, incidents, and vendors, each with a short explanation of why it matters.",
      },
      {
        title: "Prioritized action plan",
        desc: "Ranks fixes by risk reduction and effort, with who should do each one and a rough cost range.",
      },
      {
        title: "Questions for your IT provider",
        desc: "Every \"Not sure\" answer becomes a question to ask whoever manages your IT.",
      },
      {
        title: "Private by design",
        desc: "Runs entirely in your browser. No accounts, no tracking, no data collection.",
      },
    ],
    howItWorks: [
      "Describe your clinic: size, systems, and how patients book.",
      "Answer the questionnaire.",
      "Get your score, top five actions, and a full plan.",
      "Print the report or save your answers to track progress.",
    ],
    security: [
      "Questions mapped to CIS Critical Security Controls v8, Implementation Group 1.",
      "Static site with a strict content security policy and no network requests after loading.",
    ],
    limitations: [
      "A starting point, not a full audit or legal advice.",
    ],
    tags: ["Security governance", "Risk assessment", "CIS Controls"],
    cta: { label: "Get notified at launch", href: "/contact" },
    seoDescription:
      "clinic-shield is a free, private security self-assessment for small clinics, based on the CIS Critical Security Controls. Planned at ALTCTRL AI Labs.",
  },
];

export const getLabsProduct = (slug: string | undefined) => labsProducts.find((p) => p.slug === slug);
