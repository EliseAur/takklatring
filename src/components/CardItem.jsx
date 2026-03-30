import { Link } from "react-router-dom";

export default function CardItem({
  to = "#",
  imageUrl,
  imageAlt = "",
  title,
  description,
  ctaText = "Les mer →",
  onClick,
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="group bg-white rounded-sm shadow-md overflow-hidden hover:shadow-lg transition flex flex-col h-full"
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-48 w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-xl text-darkblue mb-2">{title}</h3>

        {description && (
          <p className="text-neutral-800 break-words mb-2 line-clamp-2">{description}</p>
        )}

        <p className="font-bold text-darkblue mt-auto pt-2">{ctaText}</p>
      </div>
    </Link>
  );
}
