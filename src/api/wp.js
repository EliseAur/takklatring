const WP_BASE = "https://takklatring.no/innhold/wp-json/wp/v2";

function getFeaturedImage(item) {
  const media = item?._embedded?.["wp:featuredmedia"]?.[0];
  return {
    url: media?.media_details?.sizes?.medium_large?.source_url || media?.source_url || null,
    alt: media?.alt_text || "",
  };
}

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

// Henter alle tjenester (med featured image i _embed)
export async function getServices({ perPage = 100 } = {}) {
  const res = await fetch(`${WP_BASE}/tjenester?per_page=${perPage}&_embed=1`);
  if (!res.ok) throw new Error("Kunne ikke hente tjenester fra WP");

  const data = await res.json();

  return data.map((item) => {
    const image = getFeaturedImage(item);

    return {
      id: item.id,
      slug: item.slug,
      title: item.title.rendered,
      acf: item.acf,
      image_url: image.url,
      image_alt: image.alt,
    };
  });
}

// Henter bare "populære" tjenester (vi filtrerer i frontend for enkelhet)
export async function getPopularServices({ limit = 3 } = {}) {
  const services = await getServices({ perPage: 100 }); // evt øk ved behov
  return services.filter((s) => s?.acf?.is_popular).slice(0, limit);
}

// Henter én tjeneste basert på slug (til detaljside)
export async function getServiceBySlug(slug) {
  const res = await fetch(`${WP_BASE}/tjenester?slug=${slug}&_embed=1`);
  if (!res.ok) throw new Error("Kunne ikke hente tjeneste fra WP");

  const data = await res.json();
  const item = data?.[0];
  if (!item) return null;

  const image = getFeaturedImage(item);

  return {
    id: item.id,
    slug: item.slug,
    title: item.title.rendered,
    acf: item.acf,
    image_url: image.url,
    image_alt: image.alt,
  };
}
