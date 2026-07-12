import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/zh/terms")({
  head: () => getLegalHead("terms", "zh"),
  component: () => <LegalPage kind="terms" />,
});
