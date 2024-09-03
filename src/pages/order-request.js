import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import OrderHero from "@/components/orders/hero";

const OrderRequest = () => {
  return (
    <div>
      <div
        className="relative w-full bg-[url('/images/hero_bg.svg')] h-[800px]"
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
      <div className="mt-[100vh]">
        <Footer />
      </div>
    </div>
  );
};

export default OrderRequest;
