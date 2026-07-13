import { createFileRoute } from "@tanstack/react-router";

import { Landing } from "@/features/landing/LandingPage";
import { homeHead } from "@/lib/seo";

export { Landing } from "@/features/landing/LandingPage";

export const Route = createFileRoute("/")({
  head: () => homeHead("en"),
  component: Landing,
});
