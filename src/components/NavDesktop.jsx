import { Link } from "react-router-dom";
import { headerNavigationItems } from "./navigation";

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
        {headerNavigationItems.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className="border-b-3 border-orange px-2 mx-5 transition-all duration-200 hover:border-b-4"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
