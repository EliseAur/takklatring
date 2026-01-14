import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

/**
 * NavMobile component displays the mobile navigation menu with internal links and social icons.
 *
 * Features:
 * - Navigation links to Services, Blog, and Contact sections (scrolls on homepage) or pages
 * - Social icons for email
 * - Only visible on small screens (hidden on desktop)
 * - Calls onLinkClick prop to close the menu after navigation
 *
 * @component
 * @param {function} onLinkClick - Optional callback to close the menu after a link is clicked
 * @example
 * return (
 *   <NavMobile onLinkClick={handleLinkClick} />
 * )
 */
export default function NavMobile({ onLinkClick }) {
  const navigate = useNavigate();

  // Handler for navigation links
  const handleNavClick = (section) => (e) => {
    e.preventDefault();
    navigate("/", { state: { scrollTo: section } });
    if (onLinkClick) onLinkClick();
  };

  return (
    <nav className="lg:hidden fixed top-0 left-0 w-full h-screen mt-[88px] flex flex-col items-center p-4 bg-neutral-100 font-headings font-bold text-2xl pt-30 ">
      <div className="flex flex-col space-y-5 text-center">
        <a href="#projects" onClick={handleNavClick("projects")} className="border-b-3 border-orange pb-1 px-2 mx-5 transition-all duration-200 hover:border-b-4 hover:cursor-pointer">
          Tjenester
        </a>

        <a href="#about" onClick={handleNavClick("about")} className="border-b-3 border-orange pb-1 px-2 mx-5 transition-all duration-200 hover:border-b-4 hover:cursor-pointer">
          Blogg
        </a>

        <a href="#contact" onClick={handleNavClick("contact")} className="border-b-3 border-orange pb-1 px-2 mx-5 transition-all duration-200 hover:border-b-4 hover:cursor-pointer">
          Kontakt
        </a>
      </div>
      <div className="mt-10 space-x-6">
        <a href="mailto:" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEnvelope} className="text-4xl hover:text-dark-purple hover:cursor-pointer" title="Email" />
        </a>
      </div>
    </nav>
  );
}
