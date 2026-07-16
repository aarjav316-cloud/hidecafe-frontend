import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import morningVideo from "../../assets/videos/vid3.MOV";
import eveningVideo from "../../assets/videos/vid2.MP4";

gsap.registerPlugin(ScrollTrigger);

const ExperiencePanel = ({
  video,
  label,
  heading,
  description,
  ctaText,
  ctaLink,
  isHovered,
  onHover,
  onLeave,
  shouldLoadVideo,
  isInteractive,
}) => {
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const arrowRef = useRef(null);
  const panelIsFocused = isInteractive && isHovered;

  useEffect(() => {
    if (!shouldLoadVideo) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.fromTo(
        panelRef.current,
        { opacity: 0, y: 42, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 1.05, ease: "power3.out" },
      );

      tl.fromTo(
        videoRef.current,
        { scale: 1.04, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.3, ease: "power3.out" },
        "-=0.85",
      );

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
        "-=0.7",
      );

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
        "-=0.45",
      );

      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
        "-=0.55",
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 18 },
        { opacity: 0.95, y: 0, duration: 0.75, ease: "power3.out" },
        "-=0.45",
      );
    });

    return () => ctx.revert();
  }, [shouldLoadVideo]);

  useEffect(() => {
    if (!shouldLoadVideo || !isInteractive) return;

    if (panelIsFocused) {
      gsap.to(videoRef.current, {
        scale: 1.045,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(overlayRef.current, {
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.06), rgba(46, 41, 37, 0.62))",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(headingRef.current, {
        y: -8,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(ctaRef.current, {
        y: -6,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(videoRef.current, {
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(overlayRef.current, {
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(46, 41, 37, 0.72))",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(headingRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(ctaRef.current, {
        y: 0,
        opacity: 0.95,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [panelIsFocused, shouldLoadVideo, isInteractive]);

  const handleCTAHover = (isHovering) => {
    gsap.to(arrowRef.current, {
      x: isHovering ? 6 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={panelRef}
      className="relative h-[68vh] min-h-[500px] sm:min-h-[560px] lg:h-[72vh] lg:min-h-[620px] lg:max-h-[760px] overflow-hidden rounded-[28px] lg:rounded-[34px] transition-[flex,transform] duration-700 ease-out opacity-0 bg-[#2E2925]"
      onMouseEnter={isInteractive ? onHover : undefined}
      onMouseLeave={isInteractive ? onLeave : undefined}
      style={
        isInteractive
          ? { flex: panelIsFocused ? "1 1 58%" : "1 1 50%" }
          : undefined
      }
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ opacity: 0 }}
      >
        {shouldLoadVideo ? <source src={video} type="video/mp4" /> : null}
      </video>

      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(46, 41, 37, 0.72))",
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-9 lg:p-12 xl:p-14">
        <div className="max-w-[460px] space-y-5 lg:space-y-6">
          <div
            ref={labelRef}
            style={{
              opacity: 0,
              fontFamily: "var(--font-family-geist)",
            }}
          >
            <p className="text-white/80 text-xs tracking-[0.2em] uppercase">
              {label}
            </p>
          </div>

          <h3
            ref={headingRef}
            className="text-white text-[42px] sm:text-[52px] lg:text-[56px] xl:text-[64px] leading-[95%]"
            style={{
              opacity: 0,
              fontFamily: "var(--font-family-cormorant)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {heading}
          </h3>

          <p
            ref={descriptionRef}
            className="text-white/90 text-[15px] lg:text-[17px] leading-[170%] max-w-[400px]"
            style={{
              opacity: 0,
              fontFamily: "var(--font-family-geist)",
              fontWeight: 400,
            }}
          >
            {description}
          </p>

          <div
            ref={ctaRef}
            style={{ opacity: 0 }}
            className="hidden lg:block pt-4"
          >
            <a
              href={ctaLink}
              className="group inline-flex items-center gap-2 text-white text-sm tracking-wide"
              style={{
                fontFamily: "var(--font-family-geist)",
                fontWeight: 600,
              }}
              onMouseEnter={() => handleCTAHover(true)}
              onMouseLeave={() => handleCTAHover(false)}
            >
              <span className="relative">
                {ctaText}
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
    </div>
  );
};

const ExperienceSection = () => {
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const [canFocusPanels, setCanFocusPanels] = useState(() =>
    window.matchMedia("(min-width: 1024px)").matches,
  );
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleChange = (event) => {
      setCanFocusPanels(event.matches);

      if (!event.matches) {
        setHoveredPanel(null);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.1,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      tl.fromTo(
        introRef.current,
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
      );

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
        "-=0.45",
      );

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.35",
      );

      tl.fromTo(
        copyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.45",
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#E8E7E5] py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div
          ref={introRef}
          className="mb-10 sm:mb-12 lg:mb-14 max-w-[760px] opacity-0"
        >
          <p
            ref={eyebrowRef}
            className="text-[11px] sm:text-xs tracking-[0.25em] uppercase mb-5"
            style={{ color: "#5B5550", fontFamily: "var(--font-family-geist)" }}
          >
            EXPERIENCE HIDE
          </p>

          <h2
            ref={titleRef}
            className="text-[42px] sm:text-[56px] lg:text-[72px] leading-[94%]"
            style={{
              color: "#2E2925",
              fontFamily: "var(--font-family-cormorant)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Two moods.
            <br />
            One place to hide.
          </h2>

          <p
            ref={copyRef}
            className="mt-6 max-w-[560px] text-[15px] sm:text-[17px] leading-[175%]"
            style={{ color: "#5B5550", fontFamily: "var(--font-family-geist)" }}
          >
            From slow first cups to warm evening pauses, HIDE changes pace with
            the day while keeping the same quiet sense of escape.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 sm:gap-7 lg:gap-8 xl:gap-10">
          <ExperiencePanel
            video={morningVideo}
            label="MORNING"
            heading="Begin Slowly."
            description="Soft light, fresh coffee, and an easy start to the day."
            ctaText="EXPLORE MORNING"
            ctaLink="#morning"
            isHovered={canFocusPanels && hoveredPanel === "morning"}
            onHover={() => setHoveredPanel("morning")}
            onLeave={() => setHoveredPanel(null)}
            shouldLoadVideo={shouldLoadVideo}
            isInteractive={canFocusPanels}
          />

          <ExperiencePanel
            video={eveningVideo}
            label="EVENING"
            heading="Stay A Little Longer."
            description="Crafted drinks, warmer shadows, and a room that invites lingering."
            ctaText="EXPLORE EVENING"
            ctaLink="#evening"
            isHovered={canFocusPanels && hoveredPanel === "evening"}
            onHover={() => setHoveredPanel("evening")}
            onLeave={() => setHoveredPanel(null)}
            shouldLoadVideo={shouldLoadVideo}
            isInteractive={canFocusPanels}
          />
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;