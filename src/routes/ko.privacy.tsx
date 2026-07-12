import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/ko/privacy")({
  head: () => getLegalHead("privacy", "ko"),
  component: () => <LegalPage kind="privacy" />,
});
