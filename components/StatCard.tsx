const TICK_COLORS: Record<string, string> = {
  neutral: "bg-ink/70",
  new: "bg-new",
  elite: "bg-elite",
  potential: "bg-potential",
  rejected: "bg-rejected",
};

export default function StatCard({
  label,
  value,
  tone = "neutral",
  active,
  onClick,
}: {
  label: string;
  value: number;
  tone?: keyof typeof TICK_COLORS;
  active?: boolean;
  onClick?: () => void;
}) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={`relative flex-1 min-w-[128px] overflow-hidden rounded-xl border bg-surface px-4 py-3 text-left transition-shadow ${
        active ? "border-brand shadow-sm" : "border-line hover:shadow-sm"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-1 ${TICK_COLORS[tone]}`}
      />
      <div className="pl-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {label}
        </p>
        <p className="mt-1 font-mono text-2xl font-medium tabular-nums text-ink">
          {value}
        </p>
      </div>
    </Tag>
  );
}
