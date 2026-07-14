import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import section2Image from "../../assets/cafe/section2.png";

gsap.registerPlugin(ScrollTrigger);

const Section2 = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation - fade in, move up, scale
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          y: 40,
          scale: 1.05,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 xl:gap-32 items-center">
          {/* Left - Image */}
          <div className="order-2 lg:order-1">
            <div
              ref={imageRef}
              className="w-full lg:h-[620px] overflow-hidden rounded-sm lg:rounded-3xl"
              style={{ opacity: 0 }}
            >
              <img
                src={section2Image}
                alt="HIDE cafe interior"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center center" }}
              />
            </div>
          </div>

          {/* Right - Text Content */}
          <div className="order-1 lg:order-2 space-y-8 lg:space-y-10">
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
