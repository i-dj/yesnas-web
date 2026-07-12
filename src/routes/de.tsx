import { createFileRoute } from "@tanstack/react-router";

import { LocalizedRoutePage } from "@/lib/localized-route-page";
import { localizedHomeHead } from "@/lib/seo";

export const Route = createFileRoute("/de")({
  head: localizedHomeHead("de"),
  component: LocalizedRoutePage,
});
