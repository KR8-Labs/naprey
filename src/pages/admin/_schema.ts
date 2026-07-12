// Declarative description of what's editable in /admin and how to label/render
// it. Deliberately NOT a blind walk over content.json's keys — that would
// surface raw property names and let technical/structural fields (site meta,
// nav links, button hrefs) get edited into a broken state. Only sections and
// fields listed here show up in the admin UI.

export type FieldType = 'text' | 'textarea' | 'image';

export type FieldDef = {
  key: string; // property key on the item, dot-paths allowed (e.g. "phone.display")
  label: string;
  type: FieldType;
  required?: boolean; // defaults to true
};

export type SectionDef =
  | { key: string; label: string; kind: 'fields'; fields: FieldDef[] }
  | { key: string; label: string; kind: 'string-list'; itemLabel: string }
  | { key: string; label: string; kind: 'list'; itemLabel: string; fields: FieldDef[] }
  | { key: string; label: string; kind: 'gallery' };

export const adminSchema: SectionDef[] = [
  {
    key: 'hero',
    label: 'Hero',
    kind: 'fields',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'brand', label: 'Brand line', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'textarea' },
      { key: 'intro', label: 'Intro paragraph', type: 'textarea' },
      { key: 'secondary', label: 'Secondary paragraph', type: 'textarea' },
    ],
  },
  {
    key: 'proof',
    label: 'Recognition ticker — heading',
    kind: 'fields',
    fields: [{ key: 'lead', label: 'Heading', type: 'text' }],
  },
  {
    key: 'proof.items',
    label: 'Recognition ticker — entries',
    kind: 'string-list',
    itemLabel: 'Entry',
  },
  {
    key: 'services',
    label: 'Work with me',
    kind: 'fields',
    fields: [
      { key: 'kicker', label: 'Kicker', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'intro', label: 'Intro', type: 'textarea' },
    ],
  },
  {
    key: 'story',
    label: 'My Story — heading',
    kind: 'fields',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'pullQuote', label: 'Pull quote', type: 'text' },
    ],
  },
  {
    key: 'story.paragraphs',
    label: 'My Story — paragraphs',
    kind: 'string-list',
    itemLabel: 'Paragraph',
  },
  {
    key: 'work',
    label: 'Work / Services list',
    kind: 'list',
    itemLabel: 'Role',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'period', label: 'Period', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'highlight', label: 'Highlight (optional)', type: 'text', required: false },
    ],
  },
  {
    key: 'advocacy',
    label: 'Advocacy & causes',
    kind: 'list',
    itemLabel: 'Cause',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'image', label: 'Photo', type: 'image', required: false },
    ],
  },
  {
    key: 'partnerships',
    label: 'Partnerships — heading',
    kind: 'fields',
    fields: [
      { key: 'kicker', label: 'Kicker', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'intro', label: 'Intro', type: 'textarea' },
    ],
  },
  {
    key: 'partnerships.items',
    label: 'Partnerships — brands',
    kind: 'list',
    itemLabel: 'Brand',
    fields: [
      { key: 'name', label: 'Brand name', type: 'text' },
      { key: 'logo', label: 'Logo', type: 'image', required: false },
    ],
  },
  {
    key: 'gallery',
    label: 'Gallery',
    kind: 'gallery',
  },
  {
    key: 'ctaBanner',
    label: 'Mid-page banner',
    kind: 'fields',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'body', label: 'Body', type: 'textarea' },
    ],
  },
  {
    key: 'updates',
    label: 'Latest Updates — heading',
    kind: 'fields',
    fields: [
      { key: 'kicker', label: 'Kicker', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
    ],
  },
  {
    key: 'updates.items',
    label: 'Latest Updates — entries',
    kind: 'list',
    itemLabel: 'Update',
    fields: [
      { key: 'date', label: 'Date', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'body', label: 'Description', type: 'textarea' },
    ],
  },
  {
    key: 'contact',
    label: 'Get in Touch — heading',
    kind: 'fields',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'intro', label: 'Intro', type: 'textarea' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'phone.display', label: 'Phone (displayed)', type: 'text' },
      { key: 'phone.tel', label: 'Phone (tel: link, e.g. +639...)', type: 'text' },
    ],
  },
  {
    key: 'contact.emails',
    label: 'Contact — email addresses',
    kind: 'list',
    itemLabel: 'Email',
    fields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'address', label: 'Email address', type: 'text' },
    ],
  },
  {
    key: 'contact.social',
    label: 'Contact — social links',
    kind: 'list',
    itemLabel: 'Social link',
    fields: [
      { key: 'platform', label: 'Platform', type: 'text' },
      { key: 'label', label: 'Handle / label', type: 'text' },
      { key: 'url', label: 'URL', type: 'text' },
    ],
  },
  {
    key: 'footer',
    label: 'Footer',
    kind: 'fields',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'tagline', label: 'Tagline', type: 'text' },
    ],
  },
];
