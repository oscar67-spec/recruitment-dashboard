// Server-side only. Never import this from a client component.
// Reads credentials from environment variables set in .env.local

export type Category = "Elite Hire" | "Potential Hire" | "Rejected";

export type Candidate = {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  yearsExperience: number;
  referralSource: string;
  applicationDate: string;
  coverLetter: string;
  resumeLink: string;
  jobRole: string;
  fitScore: number;
  category: Category | string;
  keyStrengths: string[];
  keyWeaknesses: string[];
  executiveSummary: string;
  aiRecommendation: string;
  processedDate: string;
};

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "Candidates";
const TOKEN = process.env.AIRTABLE_TOKEN;

function assertConfigured() {
  if (!BASE_ID || !TOKEN) {
    throw new Error(
      "Airtable is not configured. Set AIRTABLE_BASE_ID and AIRTABLE_TOKEN in .env.local"
    );
  }
}

// Airtable's list endpoint paginates 100 records at a time.
// This walks every page and returns the full candidate list.
export async function fetchAllCandidates(): Promise<Candidate[]> {
  assertConfigured();

  const records: any[] = [];
  let offset: string | undefined;

  do {
    const url = new URL(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`
    );
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${TOKEN}` },
      // Always get fresh data — this is an internal ops tool, not a marketing page.
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Airtable request failed (${res.status}): ${body}`);
    }

    const data = await res.json();
    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return records.map((r) => {
    const f = r.fields ?? {};
    return {
      id: r.id,
      candidateName: f.Candidate_Name ?? "",
      email: f.Email ?? "",
      phone: f.Phone ?? "",
      linkedinUrl: f.LinkedIn_URL ?? "",
      yearsExperience: f.Years_Experience ?? 0,
      referralSource: f.Referral_Source ?? "",
      applicationDate: f.Application_Date ?? "",
      coverLetter: f.Cover_Letter ?? "",
      resumeLink: f.Resume_Link ?? "",
      jobRole: f.Job_Role ?? "",
      fitScore: f.Fit_Score ?? 0,
      category: f.Category ?? "",
      keyStrengths: Array.isArray(f.Key_Strengths)
        ? f.Key_Strengths
        : typeof f.Key_Strengths === "string"
        ? [f.Key_Strengths]
        : [],
      keyWeaknesses: Array.isArray(f.Key_Weaknesses)
        ? f.Key_Weaknesses
        : typeof f.Key_Weaknesses === "string"
        ? [f.Key_Weaknesses]
        : [],
      executiveSummary: f.Executive_Summary ?? "",
      aiRecommendation: f.AI_Recommendation ?? "",
      processedDate: f.Processed_Date ?? "",
    };
  });
}
