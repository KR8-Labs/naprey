# Go High Level Integration Guide

This guide is for whoever manages Naprey's GoHighLevel account. No code editing is required — just copy three values from the GHL dashboard into a `.env` file and rebuild the site.

---

## Overview

Three parts of the website talk to GoHighLevel:

| Feature | Where it appears | What it does |
|---|---|---|
| **Contact form** | Contact section | Captures leads directly into GHL CRM |
| **Booking calendar** | Contact section | Lets visitors book consultations |
| **Chat widget** | Every page (bottom corner) | Live chat / messaging via GHL conversations |

---

## Step 1 — What you need from GHL

### A. Contact form embed URL

1. Log in to GoHighLevel.
2. Go to **Sites → Forms**.
3. Open the form you want to embed (create one if needed — e.g. "Naprey Portfolio Contact").
4. Click **Integrate** (or the embed/share icon).
5. Select **Embed** → **iFrame**.
6. Copy the `src` URL from the iframe code. It looks like:
   ```
   https://api.leadconnectorhq.com/widget/form/AbCdEf1234567890
   ```
7. That full URL is your `PUBLIC_GHL_FORM_URL`.

---

### B. Calendar booking embed URL

1. In GHL, go to **Calendars**.
2. Open the calendar you want visitors to book (create one if needed).
3. Click **Embed** (or **Share**) → **Embed Widget**.
4. Copy the `src` URL from the iframe code. It looks like:
   ```
   https://api.leadconnectorhq.com/widget/booking/AbCdEf1234567890
   ```
5. That full URL is your `PUBLIC_GHL_CALENDAR_URL`.

---

### C. Chat widget location ID

1. In GHL, go to **Sites → Chat Widget**.
2. Click **Get Code** or **Install**.
3. In the install snippet, find the `data-widget-id` or `data-location-id` attribute. It looks like:
   ```
   data-widget-id="AbCdEf1234567890"
   ```
4. Copy just the ID value (not the whole attribute) — that is your `PUBLIC_GHL_LOCATION_ID`.

---

## Step 2 — Where to paste the values

In the project root, open the file named `.env` (create it by copying `.env.example` if it doesn't exist):

```bash
cp .env.example .env
```

Then fill in your three values:

```env
PUBLIC_GHL_FORM_URL=https://api.leadconnectorhq.com/widget/form/YOUR_FORM_ID
PUBLIC_GHL_CALENDAR_URL=https://api.leadconnectorhq.com/widget/booking/YOUR_CALENDAR_ID
PUBLIC_GHL_LOCATION_ID=YOUR_LOCATION_ID
```

Save the file. That's it — no code editing needed.

---

## Step 3 — Rebuild and deploy

After saving `.env`, rebuild the site:

```bash
npm run build
```

Then upload the contents of the `dist/` folder to your hosting provider:

- **Netlify** — drag and drop `dist/` into the Netlify dashboard, or connect via git for automatic deploys.
- **Cloudflare Pages** — connect your git repo; set the build command to `npm run build` and the output directory to `dist`.
- **GitHub Pages** — use the `gh-pages` package or a GitHub Actions workflow to deploy `dist/`.

---

## Step 4 — Testing

Once deployed:

1. **Contact form** — Submit a test enquiry. Confirm it appears in **GHL → Contacts** (or the pipeline you configured).
2. **Booking calendar** — Book a test appointment. Confirm it appears in **GHL → Calendars → Appointments**.
3. **Chat widget** — Open the live site. A chat bubble should appear in the bottom corner. Send a test message. Confirm it appears in **GHL → Conversations**.

---

## Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| Form/calendar iframe is blank or shows an error | Wrong URL, or GHL hasn't allowed this domain | In GHL, check **Settings → Integrations → Allowed Domains** and add your site's domain |
| Chat widget doesn't appear | Wrong location ID, or the script was blocked | Double-check `PUBLIC_GHL_LOCATION_ID`; check browser console for errors |
| Changes aren't live after editing `.env` | Site not rebuilt | Run `npm run build` and redeploy `dist/` |
| Leads aren't showing in GHL | Form not connected to a pipeline | In GHL, edit the form and connect it to a pipeline under the **Actions** tab |

---

## Accessibility note

The GHL form and calendar are embedded as iframes. They are given accessible `title` attributes in the code so screen readers can describe them. However, the content *inside* the iframes is controlled by GHL. If GHL updates their widget markup, re-test with a screen reader (VoiceOver on macOS: `Cmd + F5`) and with keyboard-only navigation to confirm the embeds remain usable.

---

## Environment variable reference

| Variable | Description |
|---|---|
| `PUBLIC_GHL_FORM_URL` | Full iframe `src` URL of the GHL contact form |
| `PUBLIC_GHL_CALENDAR_URL` | Full iframe `src` URL of the GHL booking calendar |
| `PUBLIC_GHL_LOCATION_ID` | Location/widget ID for the GHL chat widget script |
