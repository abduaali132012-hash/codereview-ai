import { useState } from "react";
import { motion } from "framer-motion";
import { FiCode, FiGithub, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { signInWithGitHub, isLoading: isAuthLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      setIsSubmitting(true);
      await signInWithGitHub();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred during sign in.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isAuthLoading || isSubmitting;

  const features = [
    { title: "Auto Review PRs", desc: "AI reviews every pull request" },
    { title: "Find Bugs Fast", desc: "Detect issues before they ship" },
    { title: "Code Quality", desc: "Best practices & suggestions" },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex w-full max-w-md flex-col items-center"
      >
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent shadow-lg shadow-accent/25">
            <FiCode className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            CodeReview AI
          </h1>
        </div>

        {/* Card */}
        <div className="w-full rounded-2xl border border-border bg-muted/50 p-8 shadow-xl backdrop-blur-sm">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-heading font-semibold text-foreground">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-foreground/60">
              Sign in with your GitHub account to get started
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-center text-xs text-destructive">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-accent px-6 py-3.5 font-heading font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <FiGithub className="h-5 w-5" />
                <span>Sign in with GitHub</span>
                <FiArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <div className="mt-6 text-center text-xs text-foreground/40">
            By signing in, you authorize CodeReview AI to access your GitHub
            repositories
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="rounded-xl border border-border bg-muted/30 p-4 text-center"
            >
              <h3 className="text-sm font-heading font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1 text-xs text-foreground/50">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
