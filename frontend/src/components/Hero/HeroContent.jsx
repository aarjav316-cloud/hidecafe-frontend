import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

const HeroContent = () => {
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });

      // 1. Heading fades upward
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      );

      // 2. Body fades upward
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5",
      );

      // 3. CTA fades upward
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5",
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
    <div className="absolute inset-0 flex items-center pointer-events-none">
      <div className="w-full max-w-[520px] lg:max-w-[700px] ml-[15%] px-6 lg:px-0 space-y-8 md:space-y-10 lg:space-y-12">
        {/* Heading - Editorial Magazine Style */}
        <h1
          ref={headingRef}
          className="text-white text-[52px] sm:text-[64px] lg:text-[78px] xl:text-[88px] leading-[88%] md:leading-[90%] lg:whitespace-nowrap"
          style={{
            opacity: 0,
            fontFamily: "var(--font-family-cormorant)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            textShadow: "0 2px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          Hide from the Noise.
        </h1>

        {/* Body - Hidden on Mobile, Visible on Desktop */}
        <p
          ref={bodyRef}
          className="hidden md:block text-[18px] leading-[180%] max-w-[480px]"
          style={{
            opacity: 0,
            fontFamily: "var(--font-family-geist)",
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.90)",
            textShadow: "0 1px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Thoughtfully brewed coffee, warm interiors, and moments worth staying
          for.
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          style={{ opacity: 0 }}
          className="pointer-events-auto pt-0 md:pt-2"
        >
          <a
            href="#order"
            className="group inline-flex items-center gap-2 text-white text-sm tracking-wide"
            style={{
              fontFamily: "var(--font-family-geist)",
              fontWeight: 600,
            }}
            onMouseEnter={() => handleCTAHover(true)}
            onMouseLeave={() => handleCTAHover(false)}
          >
            <span className="relative">
              ORDER NOW
              <span className="absolute bottom-0 left-0 w-full h-px bg-white origin-left group-hover:scale-x-110 transition-transform duration-300" />
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
  );
};

export default HeroContent;
