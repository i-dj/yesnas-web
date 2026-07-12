import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/pt/privacy")({
  head: () => getLegalHead("privacy", "pt"),
  component: () => <LegalPage kind="privacy" />,
});
