import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/es/privacy")({
  head: () => getLegalHead("privacy", "es"),
  component: () => <LegalPage kind="privacy" />,
});
