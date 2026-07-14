import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import logo from "../../assets/logo/logoHIDE.png";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const leftColRef = useRef(null);
  const centerColRef = useRef(null);
  const rightColRef = useRef(null);
  const bottomBarRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Stagger columns
      tl.fromTo(
        [leftColRef.current, centerColRef.current, rightColRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
        },
      );

      // Bottom bar
      tl.fromTo(
        bottomBarRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.3",
      );
    });

    return () => ctx.revert();
  }, []);

  const exploreLinks = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Our Story", href: "#story" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  const visitLinks = [
    { name: "Reserve a Table", href: "#reserve" },
    { name: "Order Online", href: "#order" },
    { name: "Private Events", href: "#events" },
    { name: "Gift Cards", href: "#gift-cards" },
    { name: "FAQs", href: "#faqs" },
    { name: "Privacy Policy", href: "#privacy" },
  ];

  const socialLinks = [
    { icon: Mail, href: "mailto:hello@hidecafe.com", label: "Email" },
    { icon: Phone, href: "tel:+15551234567", label: "Phone" },
    { icon: MapPin, href: "#location", label: "Location" },
    { icon: Clock, href: "#hours", label: "Hours" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#2E2925] text-[#E8E7E5] pt-20 pb-8 lg:pt-28 lg:pb-10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16 lg:mb-20">
          {/* Left Column */}
          <div
            ref={leftColRef}
            className="space-y-8 text-center lg:text-left"
            style={{ opacity: 0 }}
          >
            {/* Logo */}
            <div>
              <img
                src={logo}
                alt="HIDE"
                className="h-auto w-[120px] lg:w-[140px] mx-auto lg:mx-0"
              />
            </div>

            {/* Brand Statement */}
            <p
              className="text-[17px] lg:text-[18px] leading-[160%] max-w-[320px] mx-auto lg:mx-0"
              style={{
                fontFamily: "var(--font-family-cormorant)",
                fontStyle: "italic",
                color: "#E8E7E5",
              }}
            >
              Crafted for slower mornings, meaningful conversations, and moments
              worth staying for.
            </p>

            {/* Contact Info */}
            <div
              className="space-y-3 text-[14px] leading-[170%]"
              style={{
                fontFamily: "var(--font-family-geist)",
                color: "#B8B2AB",
              }}
            >
              <p>
                <span className="block text-[#E8E7E5] font-medium mb-1">
                  Address
                </span>
                123 Serenity Lane, Downtown District
              </p>
              <p>
                <span className="block text-[#E8E7E5] font-medium mb-1">
                  Hours
                </span>
                Mon–Fri: 7:00 AM – 9:00 PM
                <br />
                Sat–Sun: 8:00 AM – 10:00 PM
              </p>
              <p>
                <span className="block text-[#E8E7E5] font-medium mb-1">
                  Contact
                </span>
                +1 (555) 123-4567
                <br />
                hello@hidecafe.com
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#E8E7E5]/10"
                  style={{ color: "#B8B2AB" }}
                >
                  <social.icon
                    size={20}
                    strokeWidth={1.5}
                    className="transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5"
                    style={{ color: "#B8B2AB" }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Center Column */}
          <div
            ref={centerColRef}
            className="space-y-6 text-center lg:text-left"
            style={{ opacity: 0 }}
          >
            <h3
              className="text-xs tracking-[0.2em] uppercase font-semibold"
              style={{
                fontFamily: "var(--font-family-geist)",
                color: "#E8E7E5",
              }}
            >
              EXPLORE
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group relative inline-block text-[15px] transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-family-geist)",
                      color: "#B8B2AB",
                    }}
                  >
                    <span className="group-hover:text-[#E8E7E5] transition-colors duration-300">
                      {link.name}
                    </span>
                    <span
                      className="absolute bottom-0 left-0 w-0 h-px bg-[#E8E7E5] group-hover:w-full transition-all duration-300"
                      style={{ transformOrigin: "left" }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div
            ref={rightColRef}
            className="space-y-6 text-center lg:text-left"
            style={{ opacity: 0 }}
          >
            <h3
              className="text-xs tracking-[0.2em] uppercase font-semibold"
              style={{
                fontFamily: "var(--font-family-geist)",
                color: "#E8E7E5",
              }}
            >
              VISIT HIDE
            </h3>
            <ul className="space-y-3">
              {visitLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group relative inline-block text-[15px] transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-family-geist)",
                      color: "#B8B2AB",
                    }}
                  >
                    <span className="group-hover:text-[#E8E7E5] transition-colors duration-300">
                      {link.name}
                    </span>
                    <span
                      className="absolute bottom-0 left-0 w-0 h-px bg-[#E8E7E5] group-hover:w-full transition-all duration-300"
                      style={{ transformOrigin: "left" }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ backgroundColor: "rgba(232, 231, 229, 0.15)" }}
        />

        {/* Bottom Bar */}
        <div
          ref={bottomBarRef}
          className="flex flex-col lg:flex-row justify-between items-center gap-4 text-[13px]"
          style={{
            fontFamily: "var(--font-family-geist)",
            color: "#B8B2AB",
            opacity: 0,
          }}
        >
          <p className="text-center lg:text-left">
            © 2026 HIDE. Crafted with intention.
          </p>
          <p className="text-center lg:text-right">
            Designed for moments worth slowing down.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
