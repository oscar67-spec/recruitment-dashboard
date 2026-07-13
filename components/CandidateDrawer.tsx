import type { Candidate } from "@/lib/airtable";

const CATEGORY_TEXT: Record<string, string> = {
  "Elite Hire": "text-elite",
  "Potential Hire": "text-potential",
  Rejected: "text-rejected",
};

export default function CandidateDrawer({
  candidate,
  onClose,
}: {
  candidate: Candidate;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/30" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-md overflow-y-auto bg-surface p-6 shadow-xl"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-xl font-medium text-ink">
              {candidate.candidateName}
            </h2>
            <p
              className={`mt-0.5 text-sm font-medium ${
                CATEGORY_TEXT[candidate.category] ?? "text-muted"
              }`}
            >
              {candidate.category} · {candidate.jobRole}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-muted hover:bg-base hover:text-ink"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Fit score</p>
            <p className="font-mono text-lg tabular-nums text-ink">{candidate.fitScore}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Experience</p>
            <p className="text-ink">{candidate.yearsExperience} yrs</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Email</p>
            <p className="truncate text-ink">{candidate.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Phone</p>
            <p className="text-ink">{candidate.phone || "—"}</p>
          </div>
        </div>

        {candidate.executiveSummary && (
          <div className="mt-6">
            <p className="text-xs uppercase tracking-wide text-muted">Summary</p>
            <p className="mt-1 text-sm leading-relaxed text-ink">
              {candidate.executiveSummary}
            </p>
          </div>
        )}

        {candidate.keyStrengths.length > 0 && (
          <div className="mt-6">
            <p className="text-xs uppercase tracking-wide text-muted">Strengths</p>
            <ul className="mt-1 space-y-1">
              {candidate.keyStrengths.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-elite" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {candidate.keyWeaknesses.length > 0 && (
          <div className="mt-6">
            <p className="text-xs uppercase tracking-wide text-muted">Gaps</p>
            <ul className="mt-1 space-y-1">
              {candidate.keyWeaknesses.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-potential" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex gap-2">
          {candidate.resumeLink && (
            <a
              href={candidate.resumeLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-ink px-3 py-2 text-sm font-medium text-white hover:bg-ink/90"
            >
              View resume
            </a>
          )}
          {candidate.linkedinUrl && (
            <a
              href={candidate.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink hover:bg-base"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
