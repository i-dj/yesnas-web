import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/ja/privacy")({
  head: () => getLegalHead("privacy", "ja"),
  component: () => <LegalPage kind="privacy" />,
});
