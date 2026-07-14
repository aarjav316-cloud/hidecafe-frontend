import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";

const MobileMenu = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const menuItemsRef = useRef([]);
  const footerItemsRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      const ctx = gsap.context(() => {
        // Fade in overlay
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
        );

        // Stagger menu items
        gsap.fromTo(
          menuItemsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.2,
          },
        );

        // Footer items
        gsap.fromTo(
          footerItemsRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.6,
          },
        );
      });

      return () => ctx.revert();
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const mainLinks = [
    "Home",
    "Menu",
    "Gallery",
    "About",
    "Reservations",
    "Contact",
  ];
  const footerLinks = [
    { label: "Instagram", href: "#" },
    { label: "Working Hours", href: "#" },
    { label: "Email", href: "#" },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-[#121212] flex flex-col"
      style={{ opacity: 0 }}
    >
      {/* Close Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={onClose}
          className="text-white/90 hover:text-white transition-colors duration-300"
          aria-label="Close menu"
        >
          <X size={28} strokeWidth={1.5} />
        </button>
      </div>

      {/* Menu Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-8">
        <nav>
          <ul className="space-y-8">
            {mainLinks.map((link, index) => (
              <li
                key={link}
                ref={(el) => (menuItemsRef.current[index] = el)}
                className="text-center"
              >
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-white text-4xl font-light tracking-wider hover:opacity-70 transition-opacity duration-300"
                  onClick={onClose}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Footer Links */}
      <div className="pb-12 px-8">
        <div className="flex flex-col items-center space-y-4">
          {footerLinks.map((link, index) => (
            <a
              key={link.label}
              ref={(el) => (footerItemsRef.current[index] = el)}
              href={link.href}
              className="text-white/60 text-sm tracking-wide hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
