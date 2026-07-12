import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/pt/terms")({
  head: () => getLegalHead("terms", "pt"),
  component: () => <LegalPage kind="terms" />,
});
