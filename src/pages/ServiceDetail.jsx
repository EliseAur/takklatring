import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceBySlug } from "../api/wp";

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getServiceBySlug(slug);
        setService(data);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [slug]);

  if (error) return <div>Feil: {error}</div>;
  if (!service) return null;

  return (
    <main className="py-16">
      <div className="max-w-4xl mx-auto px-7 md:px-20">
        <h1 className="text-4xl font-headings font-bold text-darkblue mb-6">{service.title}</h1>

        {service.image_url && <img src={service.image_url} alt={service.image_alt || ""} className="w-full h-[320px] object-cover mb-8 rounded-sm" />}

        {/* WP editor innhold */}
        {/* <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: service.content }} /> */}
        <div
          className="
    max-w-none text-neutral-900
    [&_p]:my-3
    [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3
    [&_h3]:text-xl  [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2
    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3
    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3
    [&_li]:my-1
  "
          dangerouslySetInnerHTML={{ __html: service.content }}
        />
      </div>
    </main>
  );
}
