export default function FilterBar({
  search,
  onSearchChange,
  roles,
  role,
  onRoleChange,
  categories,
  category,
  onCategoryChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  roles: string[];
  role: string;
  onRoleChange: (v: string) => void;
  categories: string[];
  category: string;
  onCategoryChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[200px]">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search candidates"
          className="w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-brand"
        />
      </div>

      <select
        value={role}
        onChange={(e) => onRoleChange(e.target.value)}
        className="rounded-lg border border-line bg-surface py-2 px-3 text-sm text-ink focus:border-brand"
      >
        <option value="">All Roles</option>
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap gap-1 rounded-lg border border-line bg-surface p-1">
        <button
          onClick={() => onCategoryChange("")}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            category === ""
              ? "bg-ink text-white"
              : "text-muted hover:text-ink"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onCategoryChange(c)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              category === c
                ? "bg-ink text-white"
                : "text-muted hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
