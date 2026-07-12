import { createFileRoute } from "@tanstack/react-router";

import { getLegalHead, LegalPage } from "@/lib/legal-pages";

export const Route = createFileRoute("/ko/terms")({
  head: () => getLegalHead("terms", "ko"),
  component: () => <LegalPage kind="terms" />,
});
