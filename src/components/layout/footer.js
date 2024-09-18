import Image from "next/image";
import { useRouter } from "next/router";
import { Link as ScrollLink } from "react-scroll";
import InstallPWAButton from "../elements/pwaButton";
import { useEffect, useState } from "react";

const Footer = ({ isGradient }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Function to check screen width and set isMobile state
  const handleResize = () => {
    setIsMobile(window.innerWidth < 700);
  };

  useEffect(() => {
    // Set initial state
    handleResize();

    // Add event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const quickLinks = [
    { name: "Home", href: "hero" },
    { name: "About Us", href: "about-us" },
    { name: "Our Vehicles", href: "request-delivery" },
    { name: "Enlist as a Driver", href: "driver-recruitment" },
    { name: "Who We Are", href: "who-we-are" },
  ];

  const socialMediaLinks = [
    {
      name: "Facebook",
      icon: "/images/Facebook.svg",
      href: "https://www.facebook.com/share/6Af5QYTF3Vkwmuh8/?mibextid=qi2Omg",
    },
    {
      name: "Twitter",
      icon: "/images/twitter.svg",
      href: "https://www.twitter.com/mycitylogistics",
    },
    {
      name: "Instagram",
      icon: "/images/instagram.svg",
      href: "https://www.instagram.com/mycitylogistics",
    },
  ];
  const handleLinkClick = (path) => {
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
    <footer
      id="footer"
      className="relative flex justify-center w-full mt-[30px] lg:mt-[100px] bg-[url('/images/footer_bg.svg')]"
      style={{
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundOrigin: "content-box",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-[5%] max-w-8xl text-white py-10">
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-[-75px] mb-12">
          <div className="flex flex-col items-center justify-center bg-[#05CFDF] h-[150px] px-4 text-white text-center text-xl font-semibold rounded-[20px]">
            <p>THANK YOU FOR CHOOSING US.</p>
            <p>WE LOOK FORWARD TO SERVING YOU</p>
          </div>
        </div>
        <div className="font-serif w-full grid grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="flex flex-col mt-[25px]" id="company-info">
            <div className="cursor-pointer">
              <ScrollLink
                to="hero"
                smooth={true}
                duration={500}
                offset={-150} // Adjust this offset to match the height of your header
              >
                <Image
                  src="/images/logo_footer.svg"
                  alt="Company Logo"
                  width={120}
                  height={40}
                />
              </ScrollLink>
            </div>

            <p className="text-[10px] md:text-[12px]">
              Our company was founded with a singular goal: to make deliveries
              fast, reliable, and hassle-free for businesses and individuals
              alike.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-end mt-[75px]" id="quick-links">
            <p className="font-bold mb-4 text-left">Quick Links</p>
            {quickLinks.map((link, index) => (
              <p
                key={index}
                onClick={() => handleLinkClick(link.href)}
                className="text-[10px] md:text-[12px] cursor-pointer hover:text-gray-400"
              >
                {link.name}
              </p>
            ))}
          </div>

          {/* Contact Info */}
          <div
            className="flex flex-col items-left lg:items-end mt-[75px]"
            id="contact-info"
          >
            <p className="font-bold mb-4">Contact Us</p>
            <p className="text-[10px] md:text-[12px]">
              <a href="tel:+13062512688" className="hover:text-gray-400">
                (306) 251-2688
              </a>{" "}
              or{" "}
              <a href="tel:+13062513269" className="hover:text-gray-400">
                (306) 251-3269
              </a>
            </p>
            <p className="text-[10px] md:text-[12px]">
              <a
                href="mailto:citylogistics101@gmail.com"
                className="hover:text-gray-400"
              >
                citylogistics101@gmail.com
              </a>
            </p>
            <p className="text-[10px] md:text-[12px]">
              Saskatoon, Saskatchewan, Canada
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-end mt-[75px]" id="social-media">
            <p className="font-bold mb-4">Social Media</p>
            <div className="flex space-x-4 text-[10px] md:text-[12px]">
              {socialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400"
                >
                  <Image
                    src={link.icon}
                    alt={link.name}
                    width={24}
                    height={24}
                  />
                </a>
              ))}
            </div>
          </div>
          {isMobile && <InstallPWAButton />}
        </div>

        <div className="font-serif md:flex items-center justify-between mt-12 text-[12px] md:text-sm border-t-[0.5px] border-white py-6">
          <p>COPYRIGHT City Logistics 2024. ALL RIGHTS RESERVED</p>
          <p>Your trusted partner in delivery...</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
