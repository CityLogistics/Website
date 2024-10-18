import DriverHero from "@/components/driverQualification/hero";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
          <DriverHero />
        </QueryClientProvider>
      </div>
      <div className="mt-3 md:mt-[170vh]">
        <Footer />
      </div>
    </div>
  );
};

export default DriverQualification;
