// All site copy lives here. Edit this file to update text without touching markup.

export const site = {
  title: "Naprey Almario · Disability Champion · Entrepreneur",
  description:
    "Naprey Almario is a PWD advocate, entrepreneur, and educator from Davao City, Philippines, turning disability into ability and championing accessibility and inclusion.",
  url: "https://napreyalmario.online",
  locale: "en_PH",
};

export const nav = {
  links: [
    { label: "Story", href: "#story" },
    { label: "Work", href: "#work" },
    { label: "Advocacy", href: "#advocacy" },
    { label: "Gallery", href: "#gallery" },
    { label: "Recognition", href: "#recognition" },
  ],
};

export const hero = {
  name: "Naprey Almario",
  brand: "Behind the Rolling Chair",
  title: "Disability Inclusion Champion · Accessible Travel Advocate · Entrepreneur",
  location: "Davao City, Philippines",
  tagline: "Beyond every wheelchair is a person with dreams, purpose and limitless potential.",
  intro:
    "I am Naprey Almario, a Filipino disability champion committed to proving that disability is never a barrier to making an impact. Through accessible travel, community empowerment and business, I strive to create opportunities, inspire resilience and help build a more inclusive society.",
  secondary:
    "This page shares my journey — from overcoming challenges to building businesses, promoting accessible tourism, supporting persons with disabilities and encouraging others to pursue their dreams regardless of life's obstacles.",
  cta: { label: "Work with me", href: "#contact" },
  secondaryCta: { label: "Read my story", href: "#story" },
};

// Credibility strip shown directly under the hero — quick trust signals.
// All drawn from verified achievements in `recognition` / `work` below.
export const proof = {
  lead: "Recognized nationally & internationally",
  items: [
    "Australia Awards Scholar, Curtin University",
    "RDC XI Representative, PWD & Senior Citizen sector",
    "Pinoy Big Brother Season 4 Housemate",
    "Air Asia Philippines Brand Ambassador",
    "Top 1 Cebuana Lhuillier, Davao Region",
  ],
};

// Client-facing framing for the Work/Services section.
export const services = {
  kicker: "Work with me",
  heading: "How we can work together",
  intro:
    "Accessible travel, studying and working abroad, speaking and training, and inclusive business. Practical ways I help people and organizations move forward.",
  cta: { label: "Start a conversation", href: "#contact" },
};

// Mid-page conversion banner (drenched ink section).
export const ctaBanner = {
  heading: "Let's build something inclusive together.",
  body:
    "Travel, education abroad, a speaking engagement, or an advocacy partnership. Tell me what you have in mind.",
  cta: { label: "Get in touch", href: "#contact" },
};

export const story = {
  heading: "My Story",
  paragraphs: [
    "At eight years old, polio paralyzed both my lower extremities. For nearly a year, I was in hospitals. The active kid I once was was replaced by someone who would never walk again. I questioned everything. But eventually, I made a decision: my disability would shape my life, but it would not define my future.",
    "That decision changed the direction of my life. I pursued a BS in IT, delivered the graduation speech, became a college instructor, and later an Associate Professor teaching Information Technology at the University of Mindanao. I earned a master's degree and an Australia Awards Scholarship to Curtin University in Perth. In 2011, I joined Pinoy Big Brother Season 4, where audiences came to know me as the \"Strong Wheeled Teacher ng Davao\" — a nickname that carried the disability-inclusion message to millions of Filipinos. Along the way, I realized my purpose wasn't just to succeed. It was to create opportunities for others.",
    "I founded Behind the Rolling Chair to champion accessibility, launched an accessible-tourism travel agency, opened a top-performing Cebuana Lhuillier branch where I intentionally hire people with disabilities, and built businesses including Hub International Education and Laundry Vuitton. I also lead the Association of Differently-abled Persons (ADAP) and serve as GEDSI Convenor for the Australia Alumni Communities Philippines, and I was appointed Private Sector Representative for the PWD and Senior Citizen sector on the Regional Development Council XI for the 2025–2028 term. In 2025, I was named a Top 10 finalist for Cebuana Lhuillier's \"Happiest Pinoy\" award for creating inclusive livelihood opportunities for persons with disabilities. Today, everything I do is driven by one belief: disability should never limit someone's opportunity to live, work, or thrive.",
  ],
  pullQuote:
    "Purpose is greater than circumstance.",
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
      "Opened during the pandemic and now top-ranked in the Davao Region, with a deliberate policy of employing people with disabilities.",
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
  title: string;
  description: string;
  image?: string; /* path in /public, e.g. "advocacy/accessibility.webp" — omit for placeholder */
};

export const advocacy: AdvocacyItem[] = [
  {
    title: "Accessibility",
    description:
      "Accessibility audits, consultation and assessment. Training on accessible tours. Accessibility content creation. Social media campaigns and brand collaboration.",
  },
  {
    title: "Disability Inclusion",
    description:
      "Disability awareness seminars. Customer service training for serving guests with disabilities. Inclusive workplace training.",
  },
  {
    title: "Speaking Engagements",
    description:
      "Inspirational keynotes. Entrepreneurship and resilience. Livelihood and social entrepreneurship.",
  },
  {
    title: "Community Projects",
    description:
      "Community outreach programs. Fundraising events.",
  },
  {
    title: "Partnerships",
    description:
      "Brands and organizations Naprey has partnered with to advance accessibility and inclusion.",
  },
];

// Client-requested running text — not a bulleted/CV-style list.
export const recognition = {
  heading: "Recognition",
  body:
    "Private Sector Representative — Regional Development Council XI, Australia Awards Scholar, Biennial Recognition Award (Nominee) — National Council on Disability Affairs, Happiest Pinoy (Entrepreneur Category) — Cebuana Lhuillier, Air Asia Philippines Brand Ambassador, Pinoy Big Brother (Season 4) Housemate.",
};

export type MilestoneItem = {
  title: string;
  body: string;
  year?: string;
  image?: string; /* path in /public, e.g. "milestones/australia-awards.webp" */
};

// Preserved from the previous card-carousel Recognition section. Not currently
// rendered anywhere — kept as a candidate for a future Gallery/Updates feature.
export const milestones: MilestoneItem[] = [
  {
    title: "Australia Awards Scholar",
    body: "Full Australian Government scholarship to Curtin University, Perth.",
    year: "2017–2018",
    image: 'milestones/grad.webp',
  },
  {
    title: "Pinoy Big Brother Season 4 Housemate",
    body: "Amplified the disability-inclusion message to millions of Filipinos.",
    year: "2011–2012",
    image: 'milestones/bigbrother.webp',
  },
  {
    title: "Air Asia Philippines Brand Ambassador",
    body: "National airline commercial promoting accessible and inclusive travel.",
    year: "2018–2019",
    image: 'milestones/airasia.webp',
  },
  {
    title: "Cebuana Lhuillier Happiest Pinoy Ambassador",
    body: "Named ambassador and Happiest Pinoy Finalist for resilience and impact.",
    year: "2016–2017",
    image: 'milestones/cebuana.webp',
  },
  {
    title: "The Good Story Award",
    body: "Our Better World, Singapore. Turning adversity into purpose.",
    year: "2014",
    image: 'milestones/thegoodstoryaward.webp',
  },
  {
    title: "Blogger of the Year & Best Advocacy Blogger",
    body: "Davao Bloggers Society and Mindanao Blog Awards.",
    year: "2013",
    image: 'milestones/bloggeraward.webp',
  },
  {
    title: "Rappler Do More Awards, Luminary Finalist",
    body: "Recognised by Rappler as a community changemaker.",
    year: "2013",
    image: 'milestones/rappler.webp',
  },
];

export type GalleryItem = {
  src?: string;  /* omit until real photo is ready */
  alt: string;
  label: string;
};

export type GalleryCategory = {
  name: string;
  items: GalleryItem[];
};

export const gallery = {
  kicker: "In the field",
  heading: "Gallery",
  intro:
    "Photos from community outreach, accessible travel, and speaking engagements.",
  categories: [
    {
      name: "Community Outreach",
      items: [
        { src: "/community-outreach/back-to-school-2.jpg", alt: "Back to School project", label: "Back to School" },
        { src: "/community-outreach/back-to-school-3.jpg", alt: "Back 2 School project", label: "Back to School" },
        { src: "/community-outreach/back-to-school-4.jpg", alt: "Back to School project event", label: "Back to School" },
        { src: "/community-outreach/back-to-school-5.jpg", alt: "Back to School project photo", label: "Back to School" },
        { src: "/community-outreach/pwd-group.jpg", alt: "Leading a PWD group", label: "PWD Group" },
        { src: "/community-outreach/pwd-campaign.jpg", alt: "PWD campaign", label: "PWD Campaign" },
        { src: "/community-outreach/pwd-gift-giving.jpg", alt: "PWD gift giving event", label: "PWD Gift Giving" },
        { src: "/community-outreach/pandemic-gift-giving.png", alt: "Pandemic gift giving outreach", label: "Pandemic Relief" },
        { src: "/community-outreach/community-1.jpg", alt: "Community outreach event", label: "Outreach" },
        { src: "/community-outreach/community-2.jpg", alt: "Community outreach event", label: "Outreach" },
        { src: "/community-outreach/community-3.jpg", alt: "Community outreach event", label: "Outreach" },
        { src: "/community-outreach/community-4.jpg", alt: "Community outreach event", label: "Outreach" },
        { src: "/community-outreach/community-5.jpg", alt: "Community outreach event", label: "Outreach" },
        { src: "/community-outreach/community-6.jpg", alt: "Community outreach event", label: "Outreach" },
      ],
    },
    {
      name: "Travel Photos",
      items: [
        { alt: "Travel photo 1", label: "01" },
        { alt: "Travel photo 2", label: "02" },
        { alt: "Travel photo 3", label: "03" },
        { alt: "Travel photo 4", label: "04" },
      ],
    },
    {
      name: "Events",
      items: [
        { alt: "Event photo 1", label: "01" },
        { alt: "Event photo 2", label: "02" },
        { alt: "Event photo 3", label: "03" },
        { alt: "Event photo 4", label: "04" },
      ],
    },
  ] as GalleryCategory[],
};

export type PartnershipItem = {
  name: string;
  description: string;
  logo?: string; /* path in /public, e.g. "partners/brand.webp" */
};

export const partnerships = {
  kicker: "Partnerships",
  heading: "Brands I've partnered with",
  intro: "Brands and organizations Naprey has partnered with — logos to be added.",
  items: [
    { name: "Partner brand", description: "Placeholder — replace with a real partner name and logo." },
    { name: "Partner brand", description: "Placeholder — replace with a real partner name and logo." },
    { name: "Partner brand", description: "Placeholder — replace with a real partner name and logo." },
  ] as PartnershipItem[],
};

export type UpdateItem = {
  date: string;
  title: string;
  body: string;
};

export const updates = {
  kicker: "News",
  heading: "Latest updates",
  items: [
    { date: "Placeholder date", title: "Update title goes here", body: "Placeholder — replace with a real announcement." },
    { date: "Placeholder date", title: "Update title goes here", body: "Placeholder — replace with a real announcement." },
  ] as UpdateItem[],
};

export const contact = {
  heading: "Get in Touch",
  intro:
    "Whether you want to inquire about travel, study abroad, speaking engagements, or disability advocacy, I would love to hear from you.",
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
  tagline: "Disability Inclusion Champion · Accessible Travel Advocate · Entrepreneur",
  copy: `© ${new Date().getFullYear()} Naprey Almario. All rights reserved.`,
};
