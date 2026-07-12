import { createFileRoute } from "@tanstack/react-router";

import { LocalizedRoutePage } from "@/lib/localized-route-page";
import { localizedHomeHead } from "@/lib/seo";

export const Route = createFileRoute("/ja")({
  head: localizedHomeHead("ja"),
  component: LocalizedRoutePage,
});
