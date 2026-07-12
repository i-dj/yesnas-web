import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/fr/terms")({
  head: () => getLegalHead("terms", "fr"),
  component: () => <LegalPage kind="terms" />,
});
