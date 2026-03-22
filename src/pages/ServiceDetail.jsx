import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { BookingSection, ReviewsSection } from "../components";
import { useServiceDetail } from "../hooks/useServiceDetail";

export default function ServiceDetail() {
  const { slug } = useParams();
  const { service, error } = useServiceDetail(slug);

  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const slides = useMemo(() => {
    if (!service?.content) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(service.content, "text/html");

    const figures = Array.from(doc.querySelectorAll(".wp-block-gallery .wp-block-image"));

    return figures.map((figure) => {
      const img = figure.querySelector("img");
      const caption = figure.querySelector("figcaption");

      return {
        src: img?.getAttribute("src") || img?.src,
        alt: img?.getAttribute("alt") || "",
        caption: caption?.textContent || "",
      };
    });
  }, [service?.content]);

  const handleContentClick = (e) => {
    const figure = e.target.closest(".wp-block-gallery .wp-block-image");
    if (!figure) return;

    const allFigures = Array.from(e.currentTarget.querySelectorAll(".wp-block-gallery .wp-block-image"));

    const clickedIndex = allFigures.findIndex((item) => item === figure);

    if (clickedIndex >= 0) {
      e.preventDefault();
      setLightboxIndex(clickedIndex);
    }
  };

  if (error) return <div>Feil: {error}</div>;
  if (!service) return null;

  return (
    <main>
      <section id="top" className="bg-darkblue">
        <div className="max-w-4xl mx-auto md:px-6 md:py-12 lg:py-16 grid gap-5 lg:grid-cols-2 lg:items-center">
          <div className="max-w-4xl px-5 pt-8 pb-4 mx-auto md:px-14 lg:px-4 lg:pb-5 lg:pt-0">
            <p className="text-orange font-bold uppercase tracking-wide">Tjeneste</p>
            <h1 className="text-4xl md:text-[44px] font-headings font-bold text-neutral-100 mt-2">{service.title}</h1>
            <div className="mt-4 h-1 w-20 bg-orange rounded-sm" />

            {service?.acf?.tjeneste_short_description && <p className="mt-3 text-lg text-neutral-300">{service.acf.tjeneste_short_description}</p>}

            <a href="#content" className="mt-3 inline-block text-white font-bold cursor-pointer">
              Les mer →
            </a>

            <div className="mt-5 flex gap-2 md:gap-3">
              <Link
                to="/kontakt"
                className="flex-1 text-center bg-orange text-darkblue font-headings uppercase text-sm lg:text-lg font-bold py-3 px-6 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl hover:scale-[1.01]"
              >
                Få tilbud
              </Link>

              <Link
                to="/tjenester"
                className="flex-1 text-center border border-neutral-100 text-neutral-100 font-headings font-bold uppercase text-sm lg:text-lg px-6 py-3 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl hover:scale-[1.01]"
              >
                Alle tjenester
              </Link>
            </div>
          </div>

          {service.image_url && (
            <div className="overflow-hidden md:px-14 lg:px-4">
              <img src={service.image_url} alt={service.image_alt || ""} className="w-full aspect-[4/3] sm:aspect-[3/4] object-cover object-center max-h-[500px] md:rounded-md md:shadow-md" />
            </div>
          )}
        </div>
      </section>

      <section id="content" className="scroll-mt-[125px] lg:scroll-mt-[100px] w-full bg-neutral-100">
        <div className="max-w-4xl mx-auto px-6 pt-0 lg:pt-6 pb-6">
          <article className="wp-content max-w-4xl mx-auto md:px-14 my-10 lg:px-4" onClick={handleContentClick}>
            <div dangerouslySetInnerHTML={{ __html: service.content }} />
          </article>
        </div>
      </section>
      <BookingSection />
      <ReviewsSection />
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        render={{
          slide: ({ slide }) => (
            <div className="flex justify-center items-center h-full w-full">
              {/* Wrapper som styrer bredden */}
              <div className="flex flex-col items-center max-w-[90vw]">
                <img src={slide.src} alt={slide.alt} className="max-h-[80vh] w-auto object-contain rounded-t-sm" />

                {slide.caption && <div className="w-full bg-darkblue text-white text-sm px-4 py-2 text-center rounded-b-sm">{slide.caption}</div>}
              </div>
            </div>
          ),
        }}
      />
    </main>
  );
}

// import { Link, useParams } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// import { BookingSection, ReviewsSection } from "../components";
// import { useServiceDetail } from "../hooks/useServiceDetail";

// export default function ServiceDetail() {
//   const { slug } = useParams();
//   const { service, error } = useServiceDetail(slug);

//   const contentRef = useRef(null);
//   const [lightboxIndex, setLightboxIndex] = useState(-1);
//   const [slides, setSlides] = useState([]);

//   useEffect(() => {
//     if (!contentRef.current || !service?.content) return;

//     const galleryImages = Array.from(contentRef.current.querySelectorAll(".wp-block-gallery img"));

//     const imageSlides = galleryImages.map((img) => {
//       const parentLink = img.closest("a");

//       return {
//         src: parentLink?.href || img.src,
//         alt: img.alt || "",
//       };
//     });

//     setSlides(imageSlides);

//     const cleanupFns = galleryImages.map((img, index) => {
//       const handleClick = (e) => {
//         e.preventDefault();
//         setLightboxIndex(index);
//       };

//       const parentLink = img.closest("a");

//       img.style.cursor = "pointer";
//       img.addEventListener("click", handleClick);

//       if (parentLink) {
//         parentLink.addEventListener("click", handleClick);
//       }

//       return () => {
//         img.removeEventListener("click", handleClick);

//         if (parentLink) {
//           parentLink.removeEventListener("click", handleClick);
//         }
//       };
//     });

//     return () => {
//       cleanupFns.forEach((cleanup) => cleanup());
//     };
//   }, [service]);

//   if (error) return <div>Feil: {error}</div>;
//   if (!service) return null;

//   return (
//     <main>

//       <section id="top" className="bg-darkblue">
//         <div className="max-w-4xl mx-auto md:px-6 md:py-12 lg:py-16 grid gap-5 lg:grid-cols-2 lg:items-center">

//           <div className="max-w-4xl px-5 pt-8 pb-4 mx-auto md:px-14 lg:px-4 lg:pb-5 lg:pt-0">
//             <p className="text-orange font-bold uppercase tracking-wide">Tjeneste</p>
//             <h1 className="text-4xl md:text-[44px] font-headings font-bold text-neutral-100 mt-2">{service.title}</h1>
//             <div className="mt-4 h-1 w-20 bg-orange rounded-sm" />

//             {service?.acf?.tjeneste_short_description && <p className="mt-3 text-lg text-neutral-300">{service.acf.tjeneste_short_description}</p>}

//             <a href="#content" className="mt-3 inline-block text-white font-bold hover:pointer-cursor">
//               Les mer →
//             </a>

//             <div className="mt-5 flex gap-2 md:gap-3">
//               <Link
//                 to="/kontakt"
//                 className="flex-1 text-center bg-orange text-darkblue font-headings uppercase text-sm lg:text-lg font-bold py-3 px-6 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl hover:scale-[1.01]"
//               >
//                 Få tilbud
//               </Link>

//               <Link
//                 to="/tjenester"
//                 className="flex-1 text-center border border-neutral-100 text-neutral-100 font-headings font-bold uppercase text-sm lg:text-lg px-6 py-3 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl hover:scale-[1.01]"
//               >
//                 Alle tjenester
//               </Link>
//             </div>
//           </div>

//           {service.image_url && (
//             <div className="overflow-hidden md:px-14 lg:px-4">
//               <img src={service.image_url} alt={service.image_alt || ""} className="w-full aspect-[4/3] sm:aspect-[3/4] object-cover object-center max-h-[500px] md:rounded-md md:shadow-md" />
//             </div>
//           )}
//         </div>
//       </section>

//       <section id="content" className="scroll-mt-[125px] lg:scroll-mt-[100px] w-full bg-neutral-100">
//         <div className="max-w-4xl mx-auto px-6 pt-0 lg:pt-6 pb-6">
//           <article ref={contentRef} className="wp-content max-w-4xl mx-auto md:px-14 my-10 lg:px-4">
//             <div dangerouslySetInnerHTML={{ __html: service.content }} />
//           </article>
//         </div>
//       </section>

//       <BookingSection />
//       <ReviewsSection />

//       <Lightbox open={lightboxIndex >= 0} close={() => setLightboxIndex(-1)} index={lightboxIndex} slides={slides} />
//     </main>
//   );
// }

// import { Link } from "react-router-dom";
// import { BookingSection, ReviewsSection } from "../components";
// import { useParams } from "react-router-dom";
// import { useServiceDetail } from "../hooks/useServiceDetail";

// export default function ServiceDetail() {
//   const { slug } = useParams();
//   const { service, error } = useServiceDetail(slug);

//   if (error) return <div>Feil: {error}</div>;
//   if (!service) return null;

//   return (
//     <main>

//       <section id="top" className="bg-darkblue">
//         <div className="max-w-4xl mx-auto md:px-6 md:py-12 lg:py-16 grid gap-5 lg:grid-cols-2 lg:items-center">

//           <div className="max-w-4xl px-5 pt-8 pb-4 mx-auto md:px-14 lg:px-4 lg:pb-5 lg:pt-0">
//             <p className="text-orange font-bold uppercase tracking-wide">Tjeneste</p>
//             <h1 className="text-4xl md:text-[44px] font-headings font-bold text-neutral-100 mt-2">{service.title}</h1>
//             <div className="mt-4 h-1 w-20 bg-orange rounded-sm" />

//             {service?.acf?.tjeneste_short_description && <p className="mt-3 text-lg text-neutral-300">{service.acf.tjeneste_short_description}</p>}

//             <a href="#content" className="mt-3 inline-block text-white font-bold hover:pointer-cursor">
//               Les mer →
//             </a>

//             <div className="mt-5 flex gap-2 md:gap-3">
//               <Link
//                 to="/kontakt"
//                 className="flex-1 text-center bg-orange text-darkblue font-headings uppercase text-sm lg:text-lg font-bold py-3 px-6 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl hover:scale-[1.01]"
//               >
//                 Få tilbud
//               </Link>

//               <Link
//                 to="/tjenester"
//                 className="flex-1 text-center border border-neutral-100 text-neutral-100 font-headings font-bold uppercase text-sm lg:text-lg px-6 py-3 rounded-sm hover:cursor-pointer drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:shadow-xl hover:scale-[1.01]"
//               >
//                 Alle tjenester
//               </Link>
//             </div>
//           </div>

//           {service.image_url && (
//             <div className="overflow-hidden md:px-14 lg:px-4">
//               <img src={service.image_url} alt={service.image_alt || ""} className="w-full aspect-[4/3] sm:aspect-[3/4] object-cover object-center max-h-[500px] md:rounded-md md:shadow-md" />
//             </div>
//           )}
//         </div>
//       </section>

//       <section id="content" className="scroll-mt-[125px] lg:scroll-mt-[100px] w-full bg-neutral-100">
//         <div className="max-w-4xl mx-auto px-6 pt-0 lg:pt-6 pb-6">
//           <article className="wp-content max-w-4xl mx-auto md:px-14 my-10 lg:px-4">
//             <div dangerouslySetInnerHTML={{ __html: service.content }} />
//           </article>
//         </div>
//       </section>
//       <BookingSection />
//       <ReviewsSection />
//     </main>
//   );
// }
