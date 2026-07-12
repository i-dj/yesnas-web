import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/zh/privacy")({
  head: () => getLegalHead("privacy", "zh"),
  component: () => <LegalPage kind="privacy" />,
});
