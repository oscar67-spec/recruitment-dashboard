"use client";

import { useEffect, useMemo, useState } from "react";
import type { Candidate } from "@/lib/airtable";
import StatCard from "@/components/StatCard";
import FilterBar from "@/components/FilterBar";
import CandidateTable from "@/components/CandidateTable";
import CandidateDrawer from "@/components/CandidateDrawer";

export default function DashboardPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState<Candidate | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/candidates", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load candidates");
      setCandidates(data.candidates);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const roles = useMemo(
    () =>
      Array.from(new Set(candidates.map((c) => c.jobRole).filter(Boolean))).sort(),
    [candidates]
  );

  const categories = ["Elite Hire", "Potential Hire", "Rejected"];

  const filtered = useMemo(() => {
    return candidates.filter((c) => {
      if (role && c.jobRole !== role) return false;
      if (category && c.category !== category) return false;
      if (
        search &&
        !c.candidateName.toLowerCase().includes(search.toLowerCase()) &&
        !c.email.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [candidates, search, role, category]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {
      total: candidates.length,
      "Elite Hire": 0,
      "Potential Hire": 0,
      Rejected: 0,
    };
    for (const cand of candidates) {
      if (cand.category in c) c[cand.category]++;
    }
    return c;
  }, [candidates]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-medium text-ink">
            Recruitment Ops
          </h1>
          <p className="text-sm text-muted">
            Live triage view, synced from Airtable
          </p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="rounded-lg border border-line bg-surface px-3 py-2 text-sm font-medium text-ink hover:bg-base disabled:opacity-50"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-rejected/30 bg-rejected/5 px-4 py-3 text-sm text-rejected">
          Couldn't load candidates: {error}. Check your Airtable credentials in{" "}
          <code className="font-mono">.env.local</code>.
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <StatCard label="Total" value={counts.total} tone="neutral" />
        <StatCard
          label="Elite Hire"
          value={counts["Elite Hire"]}
          tone="elite"
          active={category === "Elite Hire"}
          onClick={() => setCategory(category === "Elite Hire" ? "" : "Elite Hire")}
        />
        <StatCard
          label="Potential Hire"
          value={counts["Potential Hire"]}
          tone="potential"
          active={category === "Potential Hire"}
          onClick={() =>
            setCategory(category === "Potential Hire" ? "" : "Potential Hire")
          }
        />
        <StatCard
          label="Rejected"
          value={counts["Rejected"]}
          tone="rejected"
          active={category === "Rejected"}
          onClick={() => setCategory(category === "Rejected" ? "" : "Rejected")}
        />
      </div>

      <div className="mt-6">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          roles={roles}
          role={role}
          onRoleChange={setRole}
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
        />
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="rounded-xl border border-line bg-surface py-16 text-center text-sm text-muted">
            Loading candidates…
          </div>
        ) : (
          <CandidateTable candidates={filtered} onSelect={setSelected} />
        )}
      </div>

      {selected && (
        <CandidateDrawer candidate={selected} onClose={() => setSelected(null)} />
      )}
    </main>
  );
}
