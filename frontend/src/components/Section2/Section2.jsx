import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import PremiumCarousel from "./PremiumCarousel";
import MobileCarousel from "./MobileCarousel";

// Import all cafe images
import img2031 from "../../assets/cafe/IMG_2031.JPG.jpg";
import img2040 from "../../assets/cafe/IMG_2040.JPG.jpg";
import img2062 from "../../assets/cafe/IMG_2062.png";
import img2064 from "../../assets/cafe/IMG_2064.png";
import section2 from "../../assets/cafe/section2.png";

gsap.registerPlugin(ScrollTrigger);

const cafeImages = [section2, img2031, img2040, img2062, img2064];

const Section2 = () => {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Carousel animation
      gsap.fromTo(
        carouselRef.current,
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );

      // Text animations timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      // Label appears first
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      );

      // Heading fades upward
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.4",
      );

      // Body fades upward
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.5",
      );

      // CTA appears last
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      );
    });

    return () => ctx.revert();
  }, []);

  const handleCTAHover = (isHovering) => {
    gsap.to(arrowRef.current, {
      x: isHovering ? 6 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#E8E7E5] py-20 lg:py-0 lg:flex lg:items-center"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-32 xl:px-40 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Left - Carousel (45% width on desktop) */}
          <div
            className="order-2 lg:order-1 lg:col-span-5"
            ref={carouselRef}
            style={{ opacity: 0 }}
          >
            {/* Desktop Carousel */}
            <div className="hidden md:block">
              <PremiumCarousel images={cafeImages} />
            </div>

            {/* Mobile Carousel */}
            <div className="block md:hidden">
              <MobileCarousel images={cafeImages} />
            </div>
          </div>

          {/* Right - Text Content (55% width on desktop) */}
          <div className="order-1 lg:order-2 lg:col-span-7 space-y-8 lg:space-y-10">
            {/* Label */}
            <div
              ref={labelRef}
              style={{
                opacity: 0,
                fontFamily: "var(--font-family-geist)",
              }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "#5B5550" }}
              >
                OUR PHILOSOPHY
              </p>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-[42px] sm:text-[48px] lg:text-[54px] xl:text-[60px] leading-[105%]"
              style={{
                opacity: 0,
                fontFamily: "var(--font-family-cormorant)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "#2E2925",
              }}
            >
              More than coffee.
              <br />A place to pause.
            </h2>

            {/* Body */}
            <p
              ref={bodyRef}
              className="text-[17px] lg:text-[18px] leading-[180%] max-w-[480px]"
              style={{
                opacity: 0,
                fontFamily: "var(--font-family-geist)",
                fontWeight: 400,
                color: "#5B5550",
              }}
            >
              We created HIDE for people seeking slower mornings, meaningful
              conversations, and coffee worth staying for.
            </p>

            {/* CTA */}
            <div ref={ctaRef} style={{ opacity: 0 }} className="pt-2">
              <a
                href="#story"
                className="group inline-flex items-center gap-2 text-sm tracking-wide"
                style={{
                  fontFamily: "var(--font-family-geist)",
                  fontWeight: 600,
                  color: "#2E2925",
                }}
                onMouseEnter={() => handleCTAHover(true)}
                onMouseLeave={() => handleCTAHover(false)}
              >
                <span className="relative">
                  DISCOVER OUR STORY
                  <span
                    className="absolute bottom-0 left-0 w-full h-px origin-left group-hover:scale-x-110 transition-transform duration-300"
                    style={{ backgroundColor: "#2E2925" }}
                  />
                </span>
                <ArrowRight
                  ref={arrowRef}
                  size={18}
                  strokeWidth={2}
                  className="mt-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
