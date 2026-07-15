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
}) => {
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        videoRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" },
      );

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.8",
      );

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.5",
      );

      tl.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        "-=0.6",
      );

      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5",
      );
    });

    return () => ctx.revert();
  }, [shouldLoadVideo]);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    if (isHovered) {
      gsap.to(videoRef.current, {
        scale: 1.05,
        duration: 0.8,
        ease: "power2.out",
      });
      gsap.to(overlayRef.current, {
        background:
          "linear-gradient(to bottom, transparent, rgba(46, 41, 37, 0.65))",
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
          "linear-gradient(to bottom, transparent, rgba(46, 41, 37, 0.75))",
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
  }, [isHovered, shouldLoadVideo]);

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
      className="relative h-screen lg:h-auto overflow-hidden transition-all duration-700 ease-out"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        flex: isHovered ? "1 1 60%" : "1 1 50%",
      }}
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
            "linear-gradient(to bottom, transparent, rgba(46, 41, 37, 0.75))",
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 xl:p-16">
        <div className="max-w-[480px] space-y-6">
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
            className="text-white text-[44px] sm:text-[52px] lg:text-[56px] xl:text-[64px] leading-[95%]"
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
            className="text-white/90 text-[16px] lg:text-[17px] leading-[170%] max-w-[420px]"
            style={{
              opacity: 0,
              fontFamily: "var(--font-family-geist)",
              fontWeight: 400,
            }}
          >
            {description}
          </p>

          <div ref={ctaRef} style={{ opacity: 0 }} className="pt-4">
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
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen flex flex-col lg:flex-row bg-[#E8E7E5]"
    >
      <ExperiencePanel
        video={morningVideo}
        label="MORNING"
        heading="Begin Slowly."
        description="Fresh coffee, warm pastries and peaceful mornings designed to be savored."
        ctaText="EXPLORE MORNING"
        ctaLink="#morning"
        isHovered={hoveredPanel === "morning"}
        onHover={() => setHoveredPanel("morning")}
        onLeave={() => setHoveredPanel(null)}
        shouldLoadVideo={shouldLoadVideo}
      />

      <ExperiencePanel
        video={eveningVideo}
        label="EVENING"
        heading="Stay A Little Longer."
        description="Golden light, handcrafted drinks and meaningful conversations that deserve more time."
        ctaText="EXPLORE EVENING"
        ctaLink="#evening"
        isHovered={hoveredPanel === "evening"}
        onHover={() => setHoveredPanel("evening")}
        onLeave={() => setHoveredPanel(null)}
        shouldLoadVideo={shouldLoadVideo}
      />
    </section>
  );
};

export default ExperienceSection;
