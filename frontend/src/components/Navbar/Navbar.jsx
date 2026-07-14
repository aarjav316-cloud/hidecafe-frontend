import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Menu, ShoppingBag, UserRound } from "lucide-react";
import MobileMenu from "./MobileMenu";
import logo from "../../assets/logo/logoHIDE.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const scrollY = window.scrollY;

        if (scrollY > 60 && !isScrolled) {
          setIsScrolled(true);

          gsap.to(navRef.current, {
            height: "72px",
            backgroundColor: "rgba(18, 18, 18, 0.65)",
            backdropFilter: "blur(18px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            duration: 0.5,
            ease: "power2.out",
          });
        } else if (scrollY <= 60 && isScrolled) {
          setIsScrolled(false);

          gsap.to(navRef.current, {
            height: "88px",
            backgroundColor: "rgba(18, 18, 18, 0)",
            backdropFilter: "blur(0px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0)",
            duration: 0.5,
            ease: "power2.out",
          });
        }
      }, 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolled]);

  const navLinks = ["Home", "Menu", "Gallery", "About", "Contact"];

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 transition-all"
        style={{ height: "88px" }}
      >
        <div className="h-full max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="h-full flex items-center justify-between">
            {/* Left - Logo (Desktop) / Hamburger (Mobile) */}
            <div className="flex items-center">
              {/* Desktop Logo */}
              <a href="#home" className="hidden lg:block">
                <img
                  src={logo}
                  alt="HIDE"
                  className="h-auto w-[150px] xl:w-[170px]"
                />
              </a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden text-white hover:opacity-70 transition-opacity duration-300"
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Center - Navigation Links (Desktop) / Logo (Mobile) */}
            <div className="absolute left-1/2 -translate-x-1/2">
              {/* Desktop Navigation */}
              <ul className="hidden lg:flex items-center space-x-10 xl:space-x-12">
                {navLinks.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="group relative text-white text-sm font-medium tracking-wider hover:opacity-70 transition-opacity duration-300"
                    >
                      {link}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Mobile Logo */}
              <a href="#home" className="lg:hidden block">
                <img
                  src={logo}
                  alt="HIDE"
                  className="h-auto w-[110px] sm:w-[130px]"
                />
              </a>
            </div>

            {/* Right - Icons */}
            <div className="flex items-center space-x-5 xl:space-x-6">
              <button
                className="text-white hover:opacity-70 transition-opacity duration-300"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
              </button>
              <button
                className="text-white hover:opacity-70 transition-opacity duration-300"
                aria-label="User account"
              >
                <UserRound size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navbar;
