import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import experienceImage from "../../assets/section4/section4.png";
import experienceImageMobile from "../../assets/section4/section4mob.png";

gsap.registerPlugin(ScrollTrigger);

const ExperienceHero = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      // Image scale animation
      gsap.fromTo(
        imageRef.current,
        { scale: 1.05 },
        {
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );

      // Text animations timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.3,
      );

      // Heading
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.4",
      );

      // Body
      tl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.5",
      );

      // CTA
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
      className="hidden lg:block relative w-screen h-screen lg:h-[75vh] overflow-hidden"
      style={{
        opacity: 0,
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        maxWidth: "100vw",
      }}
    >
      {/* Full-Width Background Image */}
      <div className="absolute inset-0">
        <div ref={imageRef} className="w-full h-full">
          {/* Mobile Image */}
          <img
            src={experienceImageMobile}
            alt="HIDE café interior experience"
            className="w-full h-full object-cover lg:hidden"
            loading="lazy"
            decoding="async"
          />
          {/* Desktop Image */}
          <img
            src={experienceImage}
            alt="HIDE café interior experience"
            className="hidden lg:block w-full h-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* Gradient Overlay - Desktop Only */}
      <div
        className="hidden lg:block absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to left,
              rgba(46, 41, 37, 0.80) 0%,
              rgba(46, 41, 37, 0.45) 50%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Content - Right Side on Desktop, Bottom Left on Mobile */}
      <div className="absolute inset-0 flex items-end lg:items-center justify-start lg:justify-end">
        <div className="w-full max-w-[520px] lg:max-w-none lg:w-[40%] py-12 px-6 pb-14 sm:px-8 sm:pb-16 lg:p-16 lg:pr-32 xl:pr-40 space-y-5 lg:space-y-8">
          {/* Eyebrow */}
          <div
            ref={eyebrowRef}
            style={{
              opacity: 0,
              fontFamily: "var(--font-family-geist)",
            }}
          >
            <p
              className="text-white/80 text-xs tracking-[0.25em] uppercase"
              style={{
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.4)",
              }}
            >
              EXPERIENCE HIDE
            </p>
          </div>

          {/* Heading */}
          <h2
            ref={headingRef}
            className="text-white text-[44px] sm:text-[52px] lg:text-[56px] xl:text-[64px] leading-[100%]"
            style={{
              opacity: 0,
              fontFamily: "var(--font-family-cormorant)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              textShadow: "0 2px 16px rgba(0, 0, 0, 0.5)",
            }}
          >
            Crafted for slow evenings.
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="text-white/90 text-[16px] lg:text-[17px] leading-[170%] max-w-[420px] lg:max-w-[480px]"
            style={{
              opacity: 0,
              fontFamily: "var(--font-family-geist)",
              fontWeight: 400,
              textShadow: "0 2px 12px rgba(0, 0, 0, 0.5)",
            }}
          >
            Step into a space where warm lighting, handcrafted interiors, and
            carefully brewed coffee create an atmosphere worth lingering in.
            Every detail at HIDE is designed to slow the pace, encourage
            conversation, and make every visit feel intentional.
          </p>

          {/* CTA */}
          <div ref={ctaRef} style={{ opacity: 0 }} className="pt-3 lg:pt-4">
            <a
              href="#visit"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300"
              style={{
                fontFamily: "var(--font-family-geist)",
                fontWeight: 600,
                backgroundColor: "#E8E7E5",
                color: "#2E2925",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
              }}
              onMouseEnter={() => handleCTAHover(true)}
              onMouseLeave={() => handleCTAHover(false)}
            >
              <span className="text-sm tracking-wide">VISIT HIDE</span>
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
    </section>
  );
};

export default ExperienceHero;
