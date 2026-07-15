import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import heroVideo from "../../assets/videos/hero.mp4";
import heroVideo2 from "../../assets/videos/hero2.MP4";
import HeroContent from "./HeroContent";

const Hero = () => {
  const videoMobileRef = useRef(null);
  const videoDesktopRef = useRef(null);
  const overlayRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create master timeline
      const tl = gsap.timeline({ defaults: { ease: "none" } });
      timelineRef.current = tl;

      // 1. Video fade in - 2 seconds (both mobile and desktop)
      tl.fromTo(videoMobileRef.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.out" });

      // 2. Overlay fade in - 1.5 seconds (starts after video begins)
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5 },
        "-=1",
      );

      // 3. Cinematic zoom - extremely slow, almost invisible (both videos)
      gsap.to(videoMobileRef.current, {
        scale: 1.08,
        duration: 30,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });
    });

    return () => {
      ctx.revert();
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Single responsive video source prevents loading both variants up front */}
      <video
        ref={videoMobileRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ opacity: 0 }}
      >
        <source media="(max-width: 1023px)" src={heroVideo} type="video/mp4" />
        <source media="(min-width: 1024px)" src={heroVideo2} type="video/mp4" />
      </video>

      {/* Premium Dark Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.60))",
        }}
      />

      {/* Hero Content */}
      <HeroContent />
    </section>
  );
};

export default Hero;
