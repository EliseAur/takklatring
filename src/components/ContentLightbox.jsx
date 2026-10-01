import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function ContentLightbox({ index, slides, onClose }) {
  return (
    <Lightbox
      open={index >= 0}
      close={onClose}
      index={index}
      slides={slides}
      controller={{ closeOnBackdropClick: true }}
      render={{
        slide: ({ slide }) => (
          <div
            className="flex justify-center items-center h-full w-full"
            onClick={(event) => {
              if (event.target === event.currentTarget) onClose();
            }}
          >
            <div className="flex flex-col items-center max-w-[90vw]">
              <img
                src={slide.src}
                alt={slide.alt}
                className="max-h-[80vh] w-auto object-contain rounded-t-sm"
              />

              {slide.caption && (
                <div className="w-full bg-darkblue text-white text-sm px-4 py-2 text-center rounded-b-sm">
                  {slide.caption}
                </div>
              )}
            </div>
          </div>
        ),
      }}
    />
  );
}
