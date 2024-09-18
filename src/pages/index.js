import { useState, useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home/hero";
import WhatWeDo from "@/components/home/whatWeDo";
import RequestDelivery from "@/components/home/requestDelivery";
import DriverRecruitment from "@/components/home/driverRecruitment";
import AboutUs from "@/components/home/aboutUs";
import WhoWeAre from "@/components/home/whoWeAre";
import Footer from "@/components/layout/footer";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

      {/* Floating Scroll-to-Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 p-3 bg-primary text-white rounded-full shadow-lg transition-colors duration-300 z-[1000]"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-7"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
