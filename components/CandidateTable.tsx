import type { Candidate } from "@/lib/airtable";

const CATEGORY_TICK: Record<string, string> = {
  "Elite Hire": "bg-elite",
  "Potential Hire": "bg-potential",
  Rejected: "bg-rejected",
};

const CATEGORY_TEXT: Record<string, string> = {
  "Elite Hire": "text-elite",
  "Potential Hire": "text-potential",
  Rejected: "text-rejected",
};

function formatDate(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CandidateTable({
  candidates,
  onSelect,
}: {
  candidates: Candidate[];
  onSelect: (c: Candidate) => void;
}) {
  if (candidates.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line bg-surface py-16 text-center">
        <p className="font-display text-lg text-ink">No candidates match</p>
        <p className="mt-1 text-sm text-muted">
          Try clearing the search or filters above.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-muted">
            <th className="py-3 pl-4 pr-2 font-medium">Candidate</th>
            <th className="px-2 py-3 font-medium">Role</th>
            <th className="px-2 py-3 font-medium">Score</th>
            <th className="px-2 py-3 font-medium">Status</th>
            <th className="px-2 py-3 font-medium">Referral</th>
            <th className="px-2 py-3 pr-4 font-medium">Applied</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr
              key={c.id}
              onClick={() => onSelect(c)}
              className="cursor-pointer border-b border-line last:border-0 hover:bg-base"
            >
              <td className="relative py-3 pl-4 pr-2">
                <span
                  className={`absolute left-0 top-0 h-full w-1 ${
                    CATEGORY_TICK[c.category] ?? "bg-ink/20"
                  }`}
                />
                <p className="font-medium text-ink">{c.candidateName || "—"}</p>
                <p className="text-xs text-muted">{c.email}</p>
              </td>
              <td className="px-2 py-3 text-ink">{c.jobRole || "—"}</td>
              <td className="px-2 py-3 font-mono tabular-nums text-ink">
                {c.fitScore}
              </td>
              <td className="px-2 py-3">
                <span
                  className={`text-xs font-medium ${
                    CATEGORY_TEXT[c.category] ?? "text-muted"
                  }`}
                >
                  {c.category || "—"}
                </span>
              </td>
              <td className="px-2 py-3 text-muted">{c.referralSource || "—"}</td>
              <td className="px-2 py-3 pr-4 text-muted">
                {formatDate(c.applicationDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
