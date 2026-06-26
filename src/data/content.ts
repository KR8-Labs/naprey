// All site copy lives here. Edit this file to update text without touching markup.

export const site = {
  title: "Naprey Almario — Disability Champion · Entrepreneur",
  description:
    "Naprey Almario is a PWD advocate, entrepreneur, and educator from Davao City, Philippines — turning disability into ability and championing accessibility and inclusion.",
  url: "https://napreyalmario.com",
  locale: "en_PH",
};

export const nav = {
  links: [
    { label: "Story", href: "#story" },
    { label: "Work", href: "#work" },
    { label: "Advocacy", href: "#advocacy" },
    { label: "Timeline", href: "#timeline" },
    { label: "Recognition", href: "#recognition" },
    { label: "Contact", href: "#contact" },
  ],
};

export const hero = {
  name: "Naprey Almario",
  title: "Disability Champion · Entrepreneur",
  location: "Davao City, Philippines",
  tagline: "Not limited but limitless. Not stuck but soaring.",
  intro:
    "Polio survivor. Wheelchair user. Advocate, educator, and entrepreneur — proving every day that disability is not inability, and helping others travel, study, speak, and lead.",
  cta: { label: "Work with me", href: "#contact" },
  secondaryCta: { label: "Read my story", href: "#story" },
};

// Credibility strip shown directly under the hero — quick trust signals.
// All drawn from verified achievements in `recognition` / `work` below.
export const proof = {
  lead: "Recognized nationally & internationally",
  items: [
    "Australia Awards Scholar — Curtin University",
    "RDC XI Representative — PWD & Senior Citizen sector",
    "Pinoy Big Brother Season 4 Housemate",
    "Air Asia Philippines Brand Ambassador",
    "Top 1 Cebuana Lhuillier — Davao Region",
  ],
};

// Client-facing framing for the Work/Services section.
export const services = {
  kicker: "Work with me",
  heading: "How we can work together",
  intro:
    "Accessible travel, studying and working abroad, speaking and training, and inclusive business — practical ways I help people and organizations move forward.",
  cta: { label: "Start a conversation", href: "#contact" },
};

// Mid-page conversion banner (drenched ink section).
export const ctaBanner = {
  heading: "Let's build something inclusive together.",
  body:
    "Travel, education abroad, a speaking engagement, or an advocacy partnership — tell me what you have in mind.",
  cta: { label: "Get in touch", href: "#contact" },
};

export const story = {
  heading: "My Story",
  paragraphs: [
    "At eight years old, polio paralyzed both my lower extremities. For nearly a year I was in hospitals, the active kid I once was replaced by someone who would never walk again. I questioned everything. But I decided the hard reality didn't have to define me.",
    "The answer was no. I graduated with a BS in IT, gave the graduation speech, became a college instructor, earned a master's degree, and won an Australia Awards scholarship to Curtin University. I founded Behind the Rolling Chair to champion accessibility, took a seat at the Regional Development Council XI, launched an accessible-tourism travel agency, and opened a top-ranked Cebuana Lhuillier center where I deliberately hire people with disabilities. Purpose found.",
  ],
  pullQuote:
    "My legs may not be able to walk, but I have hands that can reach out and make a difference, coupled with a determined heart.",
};

export type WorkItem = {
  name: string;
  role: string;
  period: string;
  description: string;
  highlight?: string;
};

export const work: WorkItem[] = [
  {
    name: "Almario Travel and Tours",
    role: "Founder & Travel Sales Consultant",
    period: "2015 – Present",
    description:
      "Accessible-tourism agency handling tickets, tours, and visa processing for destinations welcoming to persons with disability.",
    highlight: "Accessible tourism pioneer in Mindanao",
  },
  {
    name: "Hub International Education – Davao",
    role: "Managing Director",
    period: "2019 – Present",
    description:
      "Country office managing study and work placements in Australia and Canada for Filipino students and professionals.",
  },
  {
    name: "Cebuana Lhuillier Bills Payment Center",
    role: "Owner & Operator",
    period: "2020 – Present",
    description:
      "Opened during the pandemic and now top-ranked in the Davao Region — with a deliberate policy of employing people with disabilities.",
    highlight: "Top 1 in Davao Region, 2025 Q1",
  },
  {
    name: "Public Speaking & Education",
    role: "Speaker · Educator · Advocate",
    period: "2009 – Present",
    description:
      "A decade of college instruction, keynote speaking, and disability-inclusion training at local and international events.",
  },
];

export type AdvocacyItem = {
  name: string;
  role: string;
  description: string;
  since?: string;
};

export const advocacy: AdvocacyItem[] = [
  {
    name: "Behind the Rolling Chair",
    role: "Founder",
    since: "2010",
    description:
      "Platform and foundation promoting accessibility and running the Back to School Gift Giving Project across Mindanao.",
  },
  {
    name: "Regional Development Council XI",
    role: "Private Sector Representative (PWD / Senior Citizens)",
    since: "2022",
    description:
      "Ensures PWD and Senior Citizen sectors are represented in Region XI's development plans and policy.",
  },
  {
    name: "GEDSI Convenor — Australia Alumni Communities Philippines",
    role: "Lead Convenor",
    since: "2022",
    description:
      "Leads the Australia Alumni community championing Gender Equality, Disability, and Social Inclusion in the Philippines.",
  },
  {
    name: "Association of Differently-abled Persons, Inc.",
    role: "President",
    description:
      "Former president championing the rights and welfare of persons with disability.",
  },
];

export type TimelineEntry = {
  period: string;
  role: string;
  organisation: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2022 – Present",
    role: "Private Sector Representative (PWD/SC)",
    organisation: "Regional Development Council XI",
  },
  {
    period: "2022 – Present",
    role: "GEDSI Convenor",
    organisation: "Australia Alumni Communities Philippines",
  },
  {
    period: "2019 – Present",
    role: "Managing Director",
    organisation: "Hub International Education – Davao",
  },
  {
    period: "2015 – Present",
    role: "Travel Sales Consultant",
    organisation: "Almario Travel and Tours",
  },
  {
    period: "2019 – 2022",
    role: "College IT Instructor",
    organisation: "University of Mindanao",
  },
  {
    period: "2017 – 2018",
    role: "Australia Awards Scholar",
    organisation: "Curtin University, Perth WA",
  },
  {
    period: "2012 – 2014",
    role: "Operations Manager",
    organisation: "Aaron IT Business International",
  },
  {
    period: "2009 – 2012",
    role: "College IT Instructor",
    organisation: "Holy Child College of Davao",
  },
];

export type RecognitionItem = {
  title: string;
  body: string;
  year?: string;
  image?: string; /* path in /public, e.g. "/recognition/australia-awards.jpg" */
};

export const recognition: RecognitionItem[] = [
  {
    title: "Australia Awards Scholar",
    body: "Full Australian Government scholarship to Curtin University, Perth.",
    year: "2017–2018",
  },
  {
    title: "Pinoy Big Brother Season 4 Housemate",
    body: "Amplified the disability-inclusion message to millions of Filipinos.",
    year: "2011–2012",
  },
  {
    title: "Air Asia Philippines Brand Ambassador",
    body: "National airline commercial promoting accessible and inclusive travel.",
    year: "2018–2019",
  },
  {
    title: "Cebuana Lhuillier Happiest Pinoy Ambassador",
    body: "Named ambassador and Happiest Pinoy Finalist for resilience and impact.",
    year: "2016–2017",
  },
  {
    title: "The Good Story Award",
    body: "Our Better World, Singapore — turning adversity into purpose.",
    year: "2014",
  },
  {
    title: "Blogger of the Year & Best Advocacy Blogger",
    body: "Davao Bloggers Society and Mindanao Blog Awards.",
    year: "2013",
  },
  {
    title: "Rappler Do More Awards — Luminary Finalist",
    body: "Recognised by Rappler as a community changemaker.",
    year: "2013",
  },
];

export const contact = {
  heading: "Get in Touch",
  intro:
    "Whether you want to inquire about travel, study abroad, speaking engagements, or disability advocacy — Naprey would love to hear from you.",
  emails: [
    { label: "General enquiries", address: "almario1988@gmail.com" },
    { label: "Advocacy / Behind the Rolling Chair", address: "behindrollingchair@gmail.com" },
  ],
  phone: { display: "0995 014 2300", tel: "+639950142300" },
  location: "Davao City, Philippines",
  social: [
    {
      platform: "Facebook",
      label: "napzalmario",
      url: "https://www.facebook.com/napzalmario",
    },
  ],
};

export const footer = {
  name: "Naprey Almario",
  tagline: "Disability Champion · Entrepreneur",
  copy: `© ${new Date().getFullYear()} Naprey Almario. All rights reserved.`,
};
