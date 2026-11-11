# Harshit & Aanchal — Wedding Invitation

A responsive wedding invitation for Harshit and Aanchal, with a heritage-contemporary visual direction, English and Hindi copy, family invitation, celebration schedule, venue and travel links, calendar download, music, and sharing.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, or preview it with `npm run preview`.

## Invitation content

Confirmed names, family acknowledgements, ceremony dates, venue, and dress guidance are maintained near the top of `src/App.jsx`. Verify family spellings and event details before changing them. Do not add rituals or timings that the families have not confirmed.

The wedding calendar download is an all-day calendar entry for 26 November 2026; its description notes the confirmed 8 PM start. This avoids inventing an end time.

## Motion, media, and accessibility

The invitation uses Motion for React for the timed envelope, wax-seal, letter, and cover transitions. The opening now blends the envelope into a soft, focused hero reveal. The animation respects the visitor's reduced-motion preference and opens directly to the invitation when reduced motion is enabled.

The invitation uses locally available Ganesh artwork and local music. Confirm permission to publish both assets. Music starts when the visitor opens the envelope, subject to browser playback support, and can be muted or resumed from the bottom navigation. The Save the date card can be scratched with touch or mouse, or revealed with the keyboard; the calendar action appears after the reveal, followed by a full-screen shower of flower petals. Keep the sound user-initiated, preserve keyboard access and browser zoom, and test the reduced-motion presentation when changing animation. English and Hindi text are maintained locally in `src/App.jsx`; Hindi copy uses the Noto Serif Devanagari font loaded from Google Fonts.
