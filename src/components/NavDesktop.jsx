import { Link } from "react-router-dom";

/**
 * NavDesktop component displays the desktop navigation bar with internal links and social icons.
 *
 * Features:
 * - Navigation links to Services, Projects, Contact and About us pages.
 * - Only visible on medium screens and up (hidden on mobile)
 *
 * @component
 * @example
 * return (
 *   <NavDesktop />
 * )
 */
export default function NavDesktop() {
  return (
    <nav className="hidden lg:flex justify-end w-full mt-2 font-headings text-lg">
      <div className="flex-1/2 space-x-6 flex-grow mx-auto text-right font-bold">
        <Link
          to="/tjenester"
          className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4"
        >
          Tjenester
        </Link>
        <Link
          to="/kontakt"
          className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4"
        >
          Få tilbud
        </Link>
        <Link
          to="/prosjekter"
          className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4"
        >
          Prosjekter
        </Link>
        <Link
          to="/om-oss"
          className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4"
        >
          Om oss
        </Link>
      </div>
    </nav>
  );
}
