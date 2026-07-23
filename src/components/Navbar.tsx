import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FiCode, FiLogOut, FiGithub } from "react-icons/fi";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-heading font-semibold text-foreground"
        >
          <FiCode className="h-5 w-5 text-accent" />
          <span>CodeReview AI</span>
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FiGithub className="h-4 w-4" />
              <span className="hidden sm:inline">
                {user.user_metadata?.user_name ?? user.email}
              </span>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-foreground/70 hover:bg-muted hover:text-foreground cursor-pointer"
            >
              <FiLogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}