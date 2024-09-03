import Image from "next/image";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Our Vehicles", href: "#" },
    { name: "Request Order", href: "#" },
    { name: "Enlist as a driver", href: "#" },
  ];

  const socialMediaLinks = [
    { name: "Facebook", icon: "/images/facebook.svg", href: "#" },
    { name: "Twitter", icon: "/images/twitter.svg", href: "#" },
    { name: "Instagram", icon: "/images/instagram.svg", href: "#" },
  ];

  return (
    <footer
      className="relative flex justify-center w-full mt-[30px] lg:mt-[100px] bg-[url('/images/footer_bg.svg')]"
      style={{
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundOrigin: "content-box",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-[5%] max-w-8xl text-white py-10">
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-[-75px]  mb-12">
          <div className="flex flex-col items-center justify-center bg-[#05CFDF] h-[150px] px-4 text-white text-center text-xl font-semibold rounded-[20px]">
            <p>THANK YOU FOR CHOOSING US.</p>
            <p>WE LOOK FORWARD TO SERVING YOU</p>
          </div>
        </div>
        <div className="font-serif w-full grid grid-cols-2 lg:grid-cols-4 ">
          {/* Company Info */}
          <div className="flex flex-col mt-[25px] ">
            <Image
              src="/images/logo_footer.svg"
              alt="Company Logo"
              width={120}
              height={40}
            />
            <p className="text-[10px] md:text-[12px]">
              Our company was founded with a singular goal: to make deliveries
              fast, reliable, and hassle-free for businesses and individuals
              alike.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-end mt-[75px] ">
            <p className="font-bold mb-4 text-left">Quick Links</p>
            {quickLinks.map((link, index) => (
              <p key={index} className=" text-[10px] md:text-[12px]">
                {link.name}
              </p>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-left lg:items-end mt-[75px] ">
            <p className="font-bold mb-4">Contact Us</p>
            <p className="text-[10px] md:text-[12px]">
              (306) 251-2688 or (306) 251-3269
            </p>
            <p className="text-[10px] md:text-[12px]">
              CityLogistics@gmail.com
            </p>
            <p className="text-[10px] md:text-[12px]">
              Saskatoon, Saskatchewan, Canada
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-end mt-[75px] ">
            <p className="font-bold mb-4">Social Media</p>
            <div className="flex space-x-4  text-[10px] md:text-[12px]">
              {socialMediaLinks.map((link, index) => (
                <a key={index} href={link.href} className="hover:text-gray-400">
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
        </div>

        <div className="font-serif md:flex items-center justify-between mt-12 text-[12px] md:text-sm border-t-[0.5px] border-white py-6 ">
          <p>COPYRIGHT City Logistics 2024. ALL RIGHTS RESERVED</p>
          <p>Your trusted partner in delivery...</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
