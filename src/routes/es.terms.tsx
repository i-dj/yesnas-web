import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/es/terms")({
  head: () => getLegalHead("terms", "es"),
  component: () => <LegalPage kind="terms" />,
});
