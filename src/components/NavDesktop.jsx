// import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

/**
 * NavDesktop component displays the desktop navigation bar with internal links and social icons.
 *
 * Features:
 * - Navigation links to Services, Blog, and Contact sections (scrolls on homepage) o pages
 * - Social icons for email
 * - Only visible on medium screens and up (hidden on mobile)
 *
 * @component
 * @example
 * return (
 *   <NavDesktop />
 * )
 */
export default function NavDesktop() {
  const navigate = useNavigate();

  return (
    <nav className="hidden lg:flex justify-end w-full flex-2/3 mt-2">
      <div className="flex-1/2 space-x-6 flex-grow mx-auto text-center uppercase font-bold">
        <Link
          to="/"
          className="border-b-4 border-orange pb-1"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { scrollTo: "projects" } });
          }}
        >
          Tjenester
        </Link>
        <Link
          to="/"
          className="border-b-4 border-orange pb-1"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { scrollTo: "about" } });
          }}
        >
          Blogg
        </Link>
        <Link
          to="/"
          className="border-b-4 border-orange pb-1"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { scrollTo: "contact" } });
          }}
        >
          Kontakt
        </Link>
      </div>
      <div className="flex-1/2 space-x-4 text-right">
        <a href="mailto:" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEnvelope} className="text-xl hover:cursor-pointer" title="Email" />
        </a>
      </div>
    </nav>
  );
}
