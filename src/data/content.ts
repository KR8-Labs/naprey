// All site copy lives in content.json. This file only adds types on top —
// edit content.json (by hand, or via /admin) to update text, not this file.
import raw from './content.json';

export const site = raw.site;
export const nav = raw.nav;
export const hero = raw.hero;
export const proof = raw.proof;
export const services = raw.services;
export const ctaBanner = raw.ctaBanner;
export const story = raw.story;

export type WorkItem = {
  name: string;
  role: string;
  period: string;
  description: string;
  highlight?: string;
};
export const work = raw.work as WorkItem[];

export type AdvocacyItem = {
  title: string;
  description: string;
  image?: string; /* path in /public, e.g. "advocacy/accessibility.webp", or a full Cloudinary URL — omit for placeholder */
};
export const advocacy = raw.advocacy as AdvocacyItem[];

export type MilestoneItem = {
  title: string;
  body: string;
  year?: string;
  image?: string; /* path in /public, e.g. "milestones/australia-awards.webp" */
};
// Preserved from the previous card-carousel Recognition section. Not currently
// rendered anywhere — kept as a candidate for a future Gallery/Updates feature.
export const milestones = raw.milestones as MilestoneItem[];

export type GalleryItem = {
  src?: string;  /* omit until real photo is ready */
  alt: string;
  label: string;
  w?: number;
  h?: number;
};

export type GalleryCategory = {
  name: string;
  items: GalleryItem[];
};

export const gallery = {
  ...raw.gallery,
  categories: raw.gallery.categories as GalleryCategory[],
};

export type PartnershipItem = {
  name: string;
  description?: string;
  logo?: string; /* path in /public, e.g. "partners/brand.webp", or a full Cloudinary URL */
};

export const partnerships = {
  ...raw.partnerships,
  items: raw.partnerships.items as PartnershipItem[],
};

export type UpdateItem = {
  date: string;
  title: string;
  body: string;
};

export const updates = {
  ...raw.updates,
  items: raw.updates.items as UpdateItem[],
};

export const contact = raw.contact;

export const footer = {
  ...raw.footer,
  copy: `© ${new Date().getFullYear()} ${raw.footer.name}. All rights reserved.`,
};
