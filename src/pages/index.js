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
      <Navbar />
      <div className="h-fit bg-white">
        <section id="hero">
          <Hero />
        </section>
        <section id="what-we-do">
          <WhatWeDo />
        </section>
        <section id="request-delivery">
          <RequestDelivery />
        </section>
        <section id="driver-recruitment">
          <DriverRecruitment />
        </section>
      </div>
      <section id="about-us">
        <AboutUs />
      </section>
      <section id="who-we-are">
        <WhoWeAre />
      </section>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}
