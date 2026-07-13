# Recruitment Ops Dashboard

A candidate triage dashboard that reads live from your Airtable "Candidates" table.

## What's built

- Stat cards (Total, Elite Hire, Potential Hire, Rejected) — click one to filter
- Search + role filter + status pills
- Candidate table with a detail drawer (strengths, gaps, summary, resume/LinkedIn links)
- A server-side API route (`/api/candidates`) that proxies Airtable — your token never reaches the browser

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy the env template and fill in your real values:
   ```
   cp .env.local.example .env.local
   ```
   You need:
   - `AIRTABLE_TOKEN` — a Personal Access Token from https://airtable.com/create/tokens, scoped to your base with `data.records:read` permission
   - `AIRTABLE_BASE_ID` — found in Airtable's API documentation for your base (Help → API documentation), starts with `app`
   - `AIRTABLE_TABLE_NAME` — should already be `Candidates`, change if yours differs

3. Run it locally:
   ```
   npm run dev
   ```
   Open http://localhost:3000

## Known gaps / things to hand to OpenCode next

This was built without live access to your Airtable base, so treat it as a strong starting point rather than a finished, tested product. Specifically ask OpenCode to:

1. **Run it and fix any field-mapping mismatches.** The field names in `lib/airtable.ts` are based on the schema discussed while building the n8n workflow (`Candidate_Name`, `Fit_Score`, `Category`, etc.) — if your actual Airtable columns differ even slightly (spacing, casing), the fetch will return empty values for those fields. Ask OpenCode to console.log a raw record and reconcile field names.
2. **Confirm `Key_Strengths` / `Key_Weaknesses` field types.** The code handles both array and string formats defensively, but Airtable's actual return shape depends on whether these are long-text fields (newline-separated) or multi-select — may need a small parsing tweak.
3. **Add the "New / Qualified / In Review / Interviewed / Offered" pipeline stages**, if wanted — these need a new Airtable field (`Pipeline_Status`) that doesn't exist yet; see the note in the original build spec.
4. **Add authentication** before deploying anywhere the whole org can reach — right now, anyone with the URL and network access can view all candidate data. A simple password gate or your org's SSO should go in front of this before it's shared beyond you.
5. **Deploy** — Vercel is the natural fit for a Next.js app like this (`vercel deploy`), with the same env vars added in the Vercel project settings.

## Design notes

Cool neutral palette (not the default warm-cream/terracotta AI look) with per-category color coding (emerald / amber / red) used sparingly as thin ticks rather than heavy badges. Space Grotesk for headings, Inter for body text, IBM Plex Mono for scores and counts — the monospace numerals are meant to read as precise/data-driven, fitting an ops-review tool.
