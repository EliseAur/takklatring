import { Link } from "react-router-dom";
import { contactNavigationItem, headerNavigationItems } from "./navigation";

/**
 * NavDesktop component displays the desktop navigation bar with internal links and social icons.
 *
 * Features:
 * - Navigation links to Services, Projects, Contact and About us pages.
 * - Only visible on desktop screens (hidden on tablet and mobile).
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
        {headerNavigationItems.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4"
          >
            {item.label}
          </Link>
        ))}
        <Link to={contactNavigationItem.to} className="btn-primary ml-4 px-4 py-1.5">
          {contactNavigationItem.label}
        </Link>
      </div>
    </nav>
  );
}
