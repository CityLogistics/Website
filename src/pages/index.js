import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";
import WhatWeDo from "@/components/home/whatWeDo";
import RequestDelivery from "@/components/home/requestDelivery";
import DriverRecruitment from "@/components/home/driverRecruitment";
import AboutUs from "@/components/home/aboutUs";
import WhoWeAre from "@/components/home/whoWeAre";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div>
      <div className="h-fit back-grad">
        <Navbar />
        <Hero />
        <WhatWeDo />
        <RequestDelivery />
        <DriverRecruitment />
      </div>
      <AboutUs />
      <WhoWeAre />
      <Footer />
    </div>
  );
}
