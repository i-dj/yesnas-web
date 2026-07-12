import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/ja/terms")({
  head: () => getLegalHead("terms", "ja"),
  component: () => <LegalPage kind="terms" />,
});
