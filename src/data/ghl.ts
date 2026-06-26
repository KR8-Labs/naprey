// Go High Level integration config.
// Values are read from environment variables defined in .env
// See GHL_INTEGRATION.md for where to find each value in the GHL dashboard.

export const ghl = {
  // Iframe URL for the embedded contact form
  // GHL: Sites → Forms → your form → Integrate → copy the iframe src URL
  formUrl: import.meta.env.PUBLIC_GHL_FORM_URL as string | undefined,

  // Iframe URL for the calendar/booking widget
  // GHL: Calendars → your calendar → Embed → copy the iframe src URL
  calendarUrl: import.meta.env.PUBLIC_GHL_CALENDAR_URL as string | undefined,

  // Location/widget ID for the chat widget script
  // GHL: Sites → Chat Widget → Install → copy the data-location-id value
  locationId: import.meta.env.PUBLIC_GHL_LOCATION_ID as string | undefined,
};

export const ghlReady = {
  form: Boolean(ghl.formUrl),
  calendar: Boolean(ghl.calendarUrl),
  chat: Boolean(ghl.locationId),
};
