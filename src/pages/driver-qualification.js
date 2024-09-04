import DriverHero from "@/components/driverQualification/hero";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

const DriverQualification = () => {
  return (
    <div>
      <div
        className="relative w-full bg-[url('/images/hero_bg.svg')] md:h-[800px]"
        style={{
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundOrigin: "content-box",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar isGradient />
        <DriverHero />
      </div>
      <div className="mt-3 md:mt-[80vh]">
        <Footer />
      </div>
    </div>
  );
};

export default DriverQualification;
