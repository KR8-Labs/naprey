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
  tagline: "Not limited but limitless. Not stuck but soaring.",
  intro:
    "Polio survivor. Wheelchair user. Advocate, educator, and entrepreneur from Davao City, Philippines — proving every day that disability is not inability.",
  cta: { label: "Get in touch", href: "#contact" },
  secondaryCta: { label: "My story", href: "#story" },
};

export const story = {
  heading: "My Story",
  paragraphs: [
    "I was born healthy — a kid who loved running, jumping, and dancing. But at eight years old, polio changed everything. Both of my lower extremities were paralyzed. For nearly a year I was in hospitals and therapy, my family anxious, my future uncertain. The active kid who once ran around became someone who would never walk again.",
    "I questioned myself, my parents, and God. But eventually I decided that the hard reality didn't have to define me. With my eyes closed, hands on my wheels, and heart hopeful, I slowly started overcoming every fear. I asked myself: will my disability hinder me from pursuing my dreams?",
    "The answer was no. I went to college, graduated with a BS in Information Technology, gave the graduation speech, and was hired by my school as an instructor. I took my master's while I taught. I had a career. But something was still missing — purpose.",
    "That purpose was found in serving the PWD sector. I founded Behind the Rolling Chair to champion accessibility and inspire others living with disability. Through it I have reached thousands — from school-supply drives in far-flung communities to national policy tables and international disability gatherings.",
    "Today I sit on the Regional Development Council XI as the private sector voice for Persons with Disability and Senior Citizens. I run a travel agency that promotes accessible tourism and a Cebuana Lhuillier bills-payment center — consistently top-ranked in the Davao region — where I deliberately hire people with disabilities. My life's purpose is clear: keep going, keep pushing, keep making a difference.",
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
      "A travel agency specialising in accessible tourism — ticket booking, tours, and visa processing with a focus on destinations and experiences that are welcoming to persons with disability.",
    highlight: "Accessible tourism pioneer in Mindanao",
  },
  {
    name: "Hub International Education – Davao",
    role: "Managing Director",
    period: "2019 – Present",
    description:
      "Manages the country office of an organisation that facilitates study and work opportunities in Australia and Canada. Guiding students and professionals toward life-changing international experiences.",
  },
  {
    name: "Cebuana Lhuillier Bills Payment Center",
    role: "Owner & Operator",
    period: "2020 – Present",
    description:
      "Opened during the pandemic when the travel business paused. Survived and thrived — consistently among the top Cebuana Lhuillier agents in the Davao Region. Deliberately employs people with disabilities.",
    highlight: "Top 1 in Davao Region, 2025 Q1",
  },
  {
    name: "Public Speaking & Education",
    role: "Speaker · Educator · Advocate",
    period: "2009 – Present",
    description:
      "Over a decade of college instruction (IT, data analytics, systems analysis), keynote speaking, and disability-inclusion training. Represented the Philippines at international disability gatherings.",
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
      "A platform to promote accessibility and share his story — rallying support for the cause that PWDs are not limited but limitless. Runs the Back to School Gift Giving Project, distributing supplies to underprivileged students and SPED schools across Mindanao.",
  },
  {
    name: "Regional Development Council XI",
    role: "Private Sector Representative (PWD / Senior Citizens)",
    since: "2022",
    description:
      "Represents the Persons with Disability and Senior Citizen sectors in the council, ensuring both sectors are part of Region XI's development plans and have a voice in policy and decision-making.",
  },
  {
    name: "GEDSI Convenor — Australia Alumni Communities Philippines",
    role: "Lead Convenor",
    since: "2022",
    description:
      "Leads one of the communities of Australia Alumni in the Philippines championing Gender Equality, Disability, and Social Inclusion across sectors.",
  },
  {
    name: "Association of Differently-abled Persons, Inc.",
    role: "President",
    description:
      "Former president of ADPI — championing the rights and welfare of persons living with disability, creating awareness and supporting PWDs who are struggling.",
  },
];

export type TimelineEntry = {
  period: string;
  role: string;
  organisation: string;
  description?: string;
};

export const timeline: TimelineEntry[] = [
  {
    period: "2022 – Present",
    role: "Private Sector Representative (PWD/SC)",
    organisation: "Regional Development Council XI",
    description:
      "Voice of PWD and Senior Citizen sectors in regional policy and development planning.",
  },
  {
    period: "2022 – Present",
    role: "GEDSI Convenor",
    organisation: "Australia Alumni Communities Philippines",
    description:
      "Lead convenor promoting Gender Equality, Disability, and Social Inclusion.",
  },
  {
    period: "2019 – Present",
    role: "Managing Director",
    organisation: "Hub International Education – Davao",
    description:
      "Leads the country office handling study and work placements in Australia and Canada.",
  },
  {
    period: "2015 – Present",
    role: "Travel Sales Consultant",
    organisation: "Almario Travel and Tours",
    description:
      "Accessible-tourism-focused travel agency: tickets, tours, visa processing.",
  },
  {
    period: "2019 – 2022",
    role: "College IT Instructor",
    organisation: "University of Mindanao",
    description:
      "Taught Basic Data Analytics, System Analysis and Design, and Knowledge Management.",
  },
  {
    period: "2017 – 2018",
    role: "Australia Awards Scholar",
    organisation: "Curtin University, Perth WA",
    description:
      "Master of Information Systems and Technology on full Australian Government scholarship.",
  },
  {
    period: "2012 – 2014",
    role: "Operations Manager",
    organisation: "Aaron IT Business International",
    description:
      "Day-to-day operations of a Japanese-owned IT company; reported to the central office in Japan.",
  },
  {
    period: "2009 – 2012",
    role: "College IT Instructor",
    organisation: "Holy Child College of Davao",
    description:
      "Taught Introduction to Computer, System Analysis and Design, and Information Management.",
  },
];

export type RecognitionItem = {
  title: string;
  body: string;
  year?: string;
};

export const recognition: RecognitionItem[] = [
  {
    title: "Australia Awards Scholar",
    body: "Awarded a full Australian Government scholarship to complete a Master of Information Systems and Technology at Curtin University, Perth — one of the most prestigious international scholarships for Filipino advocates.",
    year: "2017–2018",
  },
  {
    title: "Pinoy Big Brother Season 4 Housemate",
    body: "Entered the national spotlight as a PBB housemate to show the Filipino public that PWDs can do — and be — more. A platform that amplified the disability-inclusion message to millions.",
    year: "2011–2012",
  },
  {
    title: "Air Asia Philippines Brand Ambassador",
    body: "Starred in an airline commercial promoting accessible travel — putting the message of inclusive tourism in front of a national audience.",
    year: "2018–2019",
  },
  {
    title: "Cebuana Lhuillier Happiest Pinoy Ambassador",
    body: "Named ambassador and Happiest Pinoy Finalist, recognising his positive impact and resilience as a person with disability.",
    year: "2016–2017",
  },
  {
    title: "The Good Story Award",
    body: "Our Better World Singapore — recognising his story and advocacy as an inspiring example of turning adversity into purpose.",
    year: "2014",
  },
  {
    title: "Blogger of the Year & Best Advocacy Blogger",
    body: "Multiple awards from the Davao Bloggers Society and Mindanao Blog Awards for advocacy blogging that championed the PWD cause.",
    year: "2013",
  },
  {
    title: "Rappler Do More Awards — Luminary Finalist",
    body: "Recognised by Rappler for being a changemaker who does more for community and country.",
    year: "2013",
  },
];

export const affiliations: string[] = [
  "Regional Development Council XI — Private Sector Representative, 2022–2025",
  "Australia Alumni Communities Philippines — 2022–2024",
  "Davao Digital Influencers — Vice President, 2022–2024",
  "Behind the Rolling Chair — Founder, 2010–present",
  "Australia Awards Scholarships — Scholar, 2017–2018",
  "Association of Differently-abled Persons, Inc. — President, 2016–2018",
  "Air Asia Philippines — Brand Ambassador, 2018–2019",
  "Cebuana Lhuillier Happiest Pinoy — Ambassador, 2016–2017",
  "Davao Bloggers Society — Vice President, 2016–2018",
  "Pinoy Big Brother Season 4 — Housemate, Oct 2011–Feb 2012",
  "Philippine Society of Information Technology Educators, 2009–2012",
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
