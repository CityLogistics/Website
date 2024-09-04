import Image from "next/image";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import MobileMenu from "./mobileMenu";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

export const routes = [
  {
    name: "Home",
    path: "hero", // ID of the section
  },
  {
    name: "About Us",
    path: "about-us", // ID of the section
  },
  {
    name: "Our Vehicles",
    path: "who-we-are", // ID of the section
  },
  {
    name: "Request Order",
    path: "request-delivery", // ID of the section
  },
  {
    name: "Enlist as a Driver",
    path: "driver-recruitment", // ID of the section
  },
  {
    name: "Contact Us",
    path: "footer", // ID of the section
  },
  {
    name: "Testimonials",
    path: "testimonials", // ID of the section
  },
];

const Navbar = ({ isGradient }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  const router = useRouter();

  const handleNavClick = (path) => {
    const offset = -150; // Adjust this value based on the height of your navbar or any other fixed element

    if (isGradient) {
      router.push("/").then(() => {
        // Scroll to the target section after navigating to the homepage
        const scrollToSection = document.getElementById(path);
        if (scrollToSection) {
          const rect = scrollToSection.getBoundingClientRect();
          const scrollTop =
            window.scrollY || document.documentElement.scrollTop;
          const elementTop = rect.top + scrollTop;
          window.scrollTo({
            top: elementTop + offset,
            behavior: "smooth",
          });
        }
      });
    } else {
      // If already on the homepage, just scroll to the target section
      const scrollToSection = document.getElementById(path);
      if (scrollToSection) {
        const rect = scrollToSection.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        window.scrollTo({
          top: elementTop + offset,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <nav
      className={`w-full flex justify-center sticky top-0 left-0 z-[1000] transition-colors duration-300 ${
        isScrolled && !isGradient
          ? "bg-white"
          : isScrolled && isGradient
          ? "bg-[#2366d6]"
          : "bg-transparent"
      }`}
    >
      <div className="w-full hidden md:block px-[5%] max-w-8xl">
        <div className="flex justify-center">
          <div className="cursor-pointer">
            <ScrollLink to="hero" smooth={true} duration={500} offset={-150}>
              <Image
                src={` ${
                  isGradient ? "/images/logo_footer.svg" : "/images/logo.svg"
                }`}
                alt="nav-logo"
                width={100}
                height={100}
              />
            </ScrollLink>
          </div>
        </div>
        <div className="w-full ">
          <div
            className={`w-full flex justify-between px-6 py-2 border-y-2 ${
              isGradient ? "border-white" : "border-black"
            } `}
          >
            {routes.map((route) => (
              <div key={route.name}>
                <p
                  onClick={() => handleNavClick(route.path)}
                  className={`cursor-pointer font-serif text-base hover:text-primary ${
                    isGradient ? "text-white" : "text-black"
                  }`}
                >
                  {route.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full md:hidden px-6">
        <div className="flex items-center justify-between">
          <div className="cursor-pointer">
            <ScrollLink to="hero" smooth={true} duration={500} offset={-150}>
              <Image
                src={` ${
                  isGradient ? "/images/logo_footer.svg" : "/images/logo.svg"
                }`}
                alt="nav-logo"
                width={100}
                height={100}
              />
            </ScrollLink>
          </div>
          <button type="button" onClick={toggleMobileMenu}>
            {!isGradient ? (
              <Image
                src="/images/hamburger.svg"
                alt="hamburger"
                width={40}
                height={40}
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-8 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <MobileMenu
        isMobileOpen={isMobileOpen}
        toggleMobileMenu={toggleMobileMenu}
        routes={routes}
        isGradient={isGradient}
      />
    </nav>
  );
};

export default Navbar;

Navbar.propTypes = {
  isGradient: PropTypes.bool.isRequired,
};
