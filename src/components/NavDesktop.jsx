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
    <nav className="hidden lg:flex justify-end w-full mt-2 font-headings text-lg">
      <div className="flex-1/2 space-x-6 flex-grow mx-auto text-right font-bold">
        <Link
          to="/"
          className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { scrollTo: "projects" } });
          }}
        >
          Tjenester
        </Link>
        <Link
          to="/"
          className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { scrollTo: "booking" } });
          }}
        >
          Bestilling
        </Link>
        <Link
          to="/"
          className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { scrollTo: "contact" } });
          }}
        >
          Prosjekter
        </Link>
        <Link
          to="/"
          className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4"
          onClick={(e) => {
            e.preventDefault();
            navigate("/", { state: { scrollTo: "contact" } });
          }}
        >
          Om oss
        </Link>
      </div>
      {/* <div className="flex-1/2 space-x-4 text-right">
        <a href="mailto:" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEnvelope} className="text-xl hover:cursor-pointer" title="Email" />
        </a>
      </div> */}
    </nav>
  );
}
