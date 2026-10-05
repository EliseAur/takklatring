import { useMemo, useState } from "react";

const EMPTY_SLIDES = [];

function parseGallerySlides(content) {
  if (!content) return EMPTY_SLIDES;

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const figures = Array.from(doc.querySelectorAll(".wp-block-gallery .wp-block-image"));

  return figures.map((figure) => {
    const image = figure.querySelector("img");
    const caption = figure.querySelector("figcaption");

    return {
      src: image?.getAttribute("src") || image?.src,
      alt: image?.getAttribute("alt") || "",
      caption: caption?.textContent || "",
    };
  });
}

export function useGalleryLightbox(content, extraSlides = EMPTY_SLIDES) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const contentSlides = useMemo(() => parseGallerySlides(content), [content]);
  const slides = useMemo(() => [...contentSlides, ...extraSlides], [contentSlides, extraSlides]);

  const handleContentClick = (event) => {
    const figure = event.target.closest(".wp-block-gallery .wp-block-image");
    if (!figure) return;

    const allFigures = Array.from(
      event.currentTarget.querySelectorAll(".wp-block-gallery .wp-block-image"),
    );
    const clickedIndex = allFigures.findIndex((item) => item === figure);

    if (clickedIndex >= 0) {
      event.preventDefault();
      setLightboxIndex(clickedIndex);
    }
  };

  return {
    contentSlides,
    slides,
    lightboxIndex,
    setLightboxIndex,
    handleContentClick,
    closeLightbox: () => setLightboxIndex(-1),
  };
}
