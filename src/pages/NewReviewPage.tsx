import { FiUpload, FiCode, FiAlertCircle } from "react-icons/fi";

export default function NewReviewPage() {
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

      {/* Coming soon placeholder */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-20">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <FiCode className="h-8 w-8 text-accent" />
        </div>
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Manual Code Review — Coming Soon
        </h2>
        <p className="mt-1 max-w-sm text-center text-sm text-foreground/50">
          This feature will let you paste code snippets and get instant AI
          reviews with bug detection, security analysis, and best practice
          suggestions.
        </p>
        <div className="mt-6 flex items-center gap-2 rounded-lg bg-amber-500/10 px-4 py-2 text-sm text-amber-400">
          <FiAlertCircle className="h-4 w-4" />
          <span>Under development — check back soon</span>
        </div>
      </div>
    </div>
  );
}