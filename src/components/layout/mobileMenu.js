import Image from "next/image";
import { useRouter } from "next/router";
import { Link as ScrollLink } from "react-scroll";
import PropTypes from "prop-types";

export const socialMedia = [
  {
    icon: "/images/linkedin.svg",
    link: "",
  },
  {
    icon: "/images/twitter.svg",
    link: "",
  },
];

function MobileMenu({ isMobileOpen, toggleMobileMenu, routes, isGradient }) {
  const router = useRouter();

  const handleNavClick = (path) => {
    toggleMobileMenu();
    const offset = -120; // Adjust this value based on the height of your navbar or any other fixed element

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
    <div
      className={`fixed top-0 right-0 w-full h-[100vh] bg-white overflow-auto z-[10000] ease-in-out duration-300 ${
        isMobileOpen ? "translate-x-0 " : "translate-x-full"
      }`}
    >
      <div className="">
        <div className="w-full h-[81px] px-[5.5%] shadow">
          <div className="flex items-center justify-between h-full">
            <ScrollLink to="hero" smooth={true} duration={500} offset={-150}>
              <div className="relative w-32 h-20 cursor-pointer">
                <Image
                  src="/images/logo.svg"
                  alt="nav-logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </ScrollLink>
            <button type="button" onClick={toggleMobileMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-9 text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="px-[5.5%] mt-8">
        {routes.map((route) => (
          <div
            key={route.name}
            className="cursor-pointer mb-5 text-[18px] hover:text-primary font-semibold hover:underline underline-offset-8"
            onClick={() => handleNavClick(route.path)} // This triggers the navigation logic
          >
            {route.name}
          </div>
        ))}
      </div>
      {/* Uncomment and update the following block if you want to display address and social media links in the mobile menu */}
      {/* <div className="mt-[18vh] px-[5.5%]">
        <p className="text-[16px] text-[#1E293B] font-light">
          <span className="font-medium">Address:</span> 582 West Meadow Lane
          Brooklyn, NY 11218. New York, United States
        </p>
        <p className="mt-3 text-[16px] text-[#1E293B] font-light">
          <span className="font-medium">Work Hours:</span> Mon- Fri (9am EST to
          6pm EST)
        </p>
        <div className="w-[133px] mt-3 px-[5px] py-[10px] bg-slate-100 text-slate-900 text-[16px] rounded-[30px]">
          +141-293-423-00
        </div>
        <div className="flex items-center my-3">
          {socialMedia.map((medium) => (
            <div
              key={`${medium.icon}`}
              className="flex items-center justify-center w-[42px] h-[42px] mr-3 rounded-full border border-secondary-dark "
            >
              <Image src={medium.icon} alt="icons" width={18} height={14.5} />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default MobileMenu;

MobileMenu.propTypes = {
  isMobileOpen: PropTypes.bool.isRequired,
  toggleMobileMenu: PropTypes.func.isRequired,
  routes: PropTypes.array.isRequired,
  isGradient: PropTypes.bool.isRequired,
};
