import { Link } from "react-router-dom";

/**
 * NavMobile component displays the mobile navigation menu with internal links.
 *
 * Features:
 * - Navigation links to Services, Projects, Contact and About us pages
 * - Only visible on small screens (hidden on desktop)
 *
 * @component
 * @example
 * return (
 *   <NavMobile />
 * )
 */
export default function NavMobile() {
  return (
    <nav className="lg:hidden fixed top-0 left-0 w-full h-screen mt-[88px] flex flex-col items-center p-4 bg-neutral-100 font-headings font-bold text-2xl pt-30 ">
      <div className="flex flex-col space-y-5 text-center">
        <Link to="/tjenester" className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4">
          Tjenester
        </Link>
        <Link to="/kontakt" className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4">
          Få tilbud
        </Link>
        <Link to="/prosjekter" className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4">
          Prosjekter
        </Link>
        <Link to="/om-oss" className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4">
          Om oss
        </Link>
      </div>
    </nav>
  );
}
