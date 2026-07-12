import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/de/terms")({
  head: () => getLegalHead("terms", "de"),
  component: () => <LegalPage kind="terms" />,
});
