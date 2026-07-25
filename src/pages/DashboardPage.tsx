import { FiGithub, FiSearch, FiClock, FiShield } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";

interface DashboardPageProps {
  onConnectRepo?: () => void;
}

export default function DashboardPage({ onConnectRepo }: DashboardPageProps) {
  const { user } = useAuth();

  // Resolve user display name across different OAuth provider payloads
  const displayName =
    user?.user_metadata?.user_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Developer";

  const stats = [
    {
      label: "Connected Repos",
      value: "0",
      icon: FiGithub,
      color: "text-accent",
    },
    {
      label: "Reviews This Week",
      value: "0",
      icon: FiSearch,
      color: "text-blue-400",
    },
    {
      label: "Issues Found",
      value: "0",
      icon: FiShield,
      color: "text-amber-400",
    },
    {
      label: "Avg. Review Time",
      value: "—",
      icon: FiClock,
      color: "text-green-400",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          Welcome back, <span className="text-accent">{displayName}</span>
        </h1>
        <p className="mt-1 text-sm text-foreground/60">
          Here's your code review overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-muted/30 p-5 transition-all hover:border-border/80 hover:bg-muted/50"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground/60">{stat.label}</p>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <p className="mt-2 text-2xl font-heading font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <FiGithub className="h-8 w-8 text-accent" />
        </div>
        <h2 className="text-lg font-heading font-semibold text-foreground">
          No repositories connected yet
        </h2>
        <p className="mt-1 max-w-sm text-sm text-foreground/50">
          Connect your GitHub repositories to start getting AI-powered code
          reviews on every pull request.
        </p>
        <button
          type="button"
          onClick={onConnectRepo}
          className="mt-6 flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 font-heading font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 active:scale-[0.98] cursor-pointer"
        >
          <FiGithub className="h-4 w-4" />
          <span>Connect a Repository</span>
        </button>
      </div>
    </div>
  );
}
