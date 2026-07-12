import { useLocation } from "@tanstack/react-router";

import { LegalPage } from "@/lib/legal-pages";
import { Landing } from "@/routes/index";

export function LocalizedRoutePage() {
  const location = useLocation();

  if (location.pathname.endsWith("/privacy")) {
    return <LegalPage kind="privacy" />;
  }

  if (location.pathname.endsWith("/terms")) {
    return <LegalPage kind="terms" />;
  }

  return <Landing />;
}
