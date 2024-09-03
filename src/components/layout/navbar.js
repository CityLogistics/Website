import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./mobileMenu";

export const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about-us",
  },
  {
    name: "Our Vehicles",
    path: "/our-vehicles",
  },
  {
    name: "Request Order",
    path: "/request-order",
  },
  {
    name: "Enlist as a Driver",
    path: "/enlist-as-a-driver",
  },
  {
    name: "Contact Us",
    path: "/contact-us",
  },
  {
    name: "Testimonials",
    path: "/testimonials",
  },
];
const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  return (
    <nav className="w-full flex justify-center">
      <div className="w-full hidden md:block px-[5%] max-w-8xl">
        <div className="flex justify-center">
          <Image
            src="/images/logo.svg"
            alt="nav-logo"
            width={100}
            height={100}
          />
        </div>
        <div className="w-full ">
          <div className="w-full flex justify-between px-6 py-2 border-y-2 border-black">
            {routes.map((route) => (
              <div key={route.name}>
                <Link href={route.path}>
                  <p className="font-serif text-black text-base hover:text-primary">
                    {route.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full md:hidden px-6">
        <div className="flex items-center justify-between">
          <Image
            src="/images/logo.svg"
            alt="nav-logo"
            width={100}
            height={100}
          />
          <button type="button" onClick={toggleMobileMenu}>
            <Image
              src="/images/hamburger.svg"
              alt="hamburger"
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>
      <MobileMenu
        isMobileOpen={isMobileOpen}
        toggleMobileMenu={toggleMobileMenu}
        routes={routes}
      />
    </nav>
  );
};

export default Navbar;
