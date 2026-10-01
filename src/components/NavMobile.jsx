import { Link } from "react-router-dom";
import { headerNavigationItems } from "./navigation";

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
export default function NavMobile({ onLinkClick }) {
  return (
    <nav className="lg:hidden fixed top-0 left-0 w-full h-screen mt-[88px] flex flex-col items-center p-4 bg-neutral-100 font-headings font-bold text-2xl pt-30 ">
      <div className="flex flex-col space-y-5 text-center">
        {headerNavigationItems.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            onClick={onLinkClick}
            className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
