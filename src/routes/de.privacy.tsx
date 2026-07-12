import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/de/privacy")({
  head: () => getLegalHead("privacy", "de"),
  component: () => <LegalPage kind="privacy" />,
});
