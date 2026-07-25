import { useState } from "react";
import { FiCode, FiSend, FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";

const LANGUAGES = [
  "typescript",
  "javascript",
  "python",
  "go",
  "rust",
  "java",
  "cpp",
  "html",
  "css",
];

export default function NewReviewPage() {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !user) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const { error: insertError } = await supabase.from("reviews").insert({
        user_id: user.id,
        code_snippet: code,
        language,
        review_type: "manual",
        status: "pending",
      });

      if (insertError) throw insertError;

      setSuccess(true);
      setCode("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to submit code snippet for review.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pt-24 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold text-foreground">
          New Code Review
        </h1>
        <p className="mt-1 text-sm text-foreground/60">
          Paste a code snippet to get an instant AI-powered review
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-4 text-sm text-destructive">
            <FiAlertCircle className="h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="rounded-xl bg-green-500/10 p-4 text-sm text-green-400">
            Code snippet submitted successfully! Processing review...
          </div>
        )}

        <div className="flex items-center justify-between">
          <label
            htmlFor="language-select"
            className="text-sm font-medium text-foreground"
          >
            Select Language
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="relative rounded-2xl border border-border bg-muted/30 p-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Paste your code snippet here..."
            rows={12}
            required
            className="w-full resize-none bg-transparent font-mono text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !code.trim()}
            className="flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-heading font-semibold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <FiSend className="h-4 w-4" />
                <span>Submit for Review</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
