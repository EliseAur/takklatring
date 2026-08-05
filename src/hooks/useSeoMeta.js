import { useEffect } from "react";

const SITE_NAME = "Tak og Fasadeklatring AS";
const SITE_URL = "https://takklatring.no";
const DEFAULT_DESCRIPTION =
  "Tak- og Fasadeklatring tilbyr taktekking, tilkomstteknikk og håndverk i høyden med fokus på trygghet og kvalitet. Vi utfører inspeksjon, vedlikehold og spesialoppdrag på tak og fasader.";

function setMetaTag(key, content, isProperty = false) {
  const selector = isProperty ? `meta[property="${key}"]` : `meta[name="${key}"]`;
  let element = document.head.querySelector(selector);

  if (!content) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(isProperty ? "property" : "name", key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setLinkTag(rel, href) {
  const selector = `link[rel="${rel}"]`;
  let element = document.head.querySelector(selector);

  if (!href) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function setStructuredData(schema) {
  const selector = 'script[data-seo="jsonld"]';
  let element = document.head.querySelector(selector);

  if (!schema || (Array.isArray(schema) && schema.length === 0)) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.setAttribute("data-seo", "jsonld");
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(schema);
}

function toAbsoluteUrl(pathname) {
  return new URL(pathname || "/", SITE_URL).toString();
}

export function useSeoMeta({ title, description, canonicalPath, image, schema } = {}) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const pageDescription = description || DEFAULT_DESCRIPTION;
    const canonicalUrl = toAbsoluteUrl(canonicalPath);

    document.title = pageTitle;

    setMetaTag("description", pageDescription);
    setMetaTag("robots", "index,follow");
    setMetaTag("og:title", pageTitle, true);
    setMetaTag("og:description", pageDescription, true);
    setMetaTag("og:type", "website", true);
    setMetaTag("og:site_name", SITE_NAME, true);
    setMetaTag("og:url", canonicalUrl, true);
    setMetaTag("twitter:card", image ? "summary_large_image" : "summary");
    setMetaTag("twitter:title", pageTitle);
    setMetaTag("twitter:description", pageDescription);
    setMetaTag("twitter:image", image || "");
    setLinkTag("canonical", canonicalUrl);
    setStructuredData(schema);
  }, [canonicalPath, description, image, schema, title]);
}
