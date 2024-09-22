import DriverHero from "@/components/driverQualification/hero";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Toaster } from "sonner";

const DriverQualification = () => {
  return (
    <div>
      <Toaster richColors position="top-center" />

      <div
        className="relative w-full bg-[url('/images/hero_bg.svg')] md:h-[800px] pb-6"
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
      <div className="mt-3 md:mt-[120vh]">
        <Footer />
      </div>
    </div>
  );
};

export default DriverQualification;
