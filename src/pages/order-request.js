import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import OrderHero from "@/components/orders/hero";
import { Toaster } from "sonner";
// import { useJsApiLoader } from "@react-google-maps/api";

const OrderRequest = () => {
  // const { isLoaded, loadError } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY,
  // });

  // console.info({ loadError });

  // if (!isLoaded) return;

  return (
    <div>
      <Toaster richColors position="top-center" />

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
        <OrderHero />
      </div>
      <div className="mt-3 md:mt-[80vh]">
        <Footer />
      </div>
    </div>
  );
};

export default OrderRequest;
