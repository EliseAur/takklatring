import { useEffect, useState } from "react";

function Home() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch("https://takklatring.no/wp-json/wp/v2/posts?per_page=1")
      .then((res) => res.json())
      .then((data) => {
        setPost(data[0]);
      })
      .catch((err) => console.error("API-feil:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">Nettsiden er under utvikling</h1>
        <p className="mb-6 text-gray-600">
          Takk for at du titter innom <span className="font-bold">takklatring.no</span>. Her kommer etterhvert kontaktinformasjon og utfyllende informasjon om hva Takklatring kan tilby av tjenester
          for deg.
        </p>

        {post ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{post.title.rendered}</h2>
            <div className="text-gray-700 prose" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic text-center">Laster inn eksempelinnlegg ...</p>
        )}
      </div>
    </div>
  );
}

export default Home;
