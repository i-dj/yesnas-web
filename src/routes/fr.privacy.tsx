import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/fr/privacy")({
  head: () => getLegalHead("privacy", "fr"),
  component: () => <LegalPage kind="privacy" />,
});
