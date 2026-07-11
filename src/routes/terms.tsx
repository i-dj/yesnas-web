import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — YesNAS" },
      { name: "description", content: "The terms and conditions governing your use of YesNAS." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8">
          <ArrowLeft className="size-4" /> Back to home
        </Link>
        <h1 className="text-4xl font-semibold tracking-tight">Terms of Use</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="prose prose-invert max-w-none mt-10 space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using YesNAS (the "Services"), you agree to be bound by these
              Terms of Use. If you do not agree, do not use the Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">2. License</h2>
            <p>
              We grant you a limited, non-exclusive, non-transferable, revocable license to use the Services
              for personal, non-commercial purposes, subject to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">3. Acceptable Use</h2>
            <p>
              You agree not to (a) use the Services for any unlawful purpose; (b) reverse engineer, decompile,
              or attempt to extract the source code of the Services, except to the extent permitted by law;
              (c) interfere with or disrupt the integrity or performance of the Services; or (d) attempt to
              gain unauthorized access to the Services or related systems.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">4. User Content</h2>
            <p>
              You retain all rights to the files, data, and content you process through the Services. You are
              solely responsible for your content and for ensuring you have all rights necessary to use it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">5. Intellectual Property</h2>
            <p>
              The Services, including all software, design, and trademarks, are owned by us or our licensors
              and are protected by intellectual property laws. Nothing in these Terms transfers any ownership
              rights to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">6. Disclaimers</h2>
            <p>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS
              OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">7. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR DATA, ARISING OUT OF OR
              RELATED TO YOUR USE OF THE SERVICES.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">8. Termination</h2>
            <p>
              We may suspend or terminate your access to the Services at any time, with or without notice, for
              any reason, including if you breach these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">9. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. Continued use of the Services after changes take effect
              constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">10. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{" "}
              <a href="mailto:admin@yesnas.com" className="text-brand hover:underline">admin@yesnas.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
