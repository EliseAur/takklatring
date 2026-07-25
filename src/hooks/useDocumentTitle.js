import { useEffect } from "react";

const SITE_TITLE = "Takklatring";

export function useDocumentTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle ? `${SITE_TITLE} | ${pageTitle}` : SITE_TITLE;
  }, [pageTitle]);
}
