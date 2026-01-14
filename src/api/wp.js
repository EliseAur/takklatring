const WP_BASE = "https://takklatring.no/innhold/wp-json/wp/v2";

/**
 * Henter ACF fra siden /forside og gjør hero_image til URL (uansett om WP sender ID eller URL).
 */
export async function getFrontPageHero() {
  const pageRes = await fetch(`${WP_BASE}/pages?slug=forside&_fields=acf`);
  if (!pageRes.ok) throw new Error("Kunne ikke hente Forside fra WP");

  const pageData = await pageRes.json();
  const acf = pageData?.[0]?.acf;
  if (!acf) throw new Error("Fant ikke ACF-data på Forside");

  // hero_image kan være ID (number) eller URL (string)
  let heroImageUrl = null;

  if (typeof acf.hero_image === "number") {
    const mediaRes = await fetch(`${WP_BASE}/media/${acf.hero_image}?_fields=source_url,media_details,alt_text`);
    if (mediaRes.ok) {
      const media = await mediaRes.json();
      heroImageUrl = media?.media_details?.sizes?.large?.source_url || media?.source_url;
      acf.hero_image_alt = media?.alt_text || "";
    }
  } else if (typeof acf.hero_image === "string") {
    heroImageUrl = acf.hero_image;
  }

  return {
    hero_title: acf.hero_title ?? "",
    hero_subtitle: acf.hero_subtitle ?? "",
    hero_description_desktop: acf.hero_description_desktop ?? "",
    hero_description_mobile: acf.hero_description_mobile ?? "",
    hero_image_url: heroImageUrl, // <-- alltid URL eller null
    hero_image_alt: acf.hero_image_alt ?? "",
    hero_usps: [acf.hero_usp_1, acf.hero_usp_2, acf.hero_usp_3].filter(Boolean),
  };
}
