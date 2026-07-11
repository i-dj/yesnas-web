import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — YesNAS" },
      { name: "description", content: "How YesNAS collects, uses, and protects your information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8">
          <ArrowLeft className="size-4" /> Back to home
        </Link>
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-invert max-w-none mt-10 space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
            <p>
              This Privacy Policy describes how YesNAS ("we", "us", or "our") collects, uses, and shares
              information about you when you use our software, website, and related services (the "Services").
              By using the Services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
            <p>
              YesNAS is designed to run locally on your device. Files, photos, videos, and AI-generated
              indexes remain on your hardware and are not transmitted to us. We may collect limited
              non-personal information such as anonymous usage statistics, crash reports, and version data
              solely to improve product quality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. How We Use Information</h2>
            <p>
              Any information collected is used to operate, maintain, and improve the Services, diagnose
              technical issues, and communicate with you when you contact support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share limited information with service
              providers who assist us in operating the Services, or when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect information under our
              control. However, no method of transmission or storage is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have rights to access, correct, or delete personal
              information we hold about you. Contact us to exercise these rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Children's Privacy</h2>
            <p>
              The Services are not directed to children under 13, and we do not knowingly collect personal
              information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with a
              revised effective date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at{" "}
              <a href="mailto:admin@yesnas.com" className="text-brand hover:underline">admin@yesnas.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
