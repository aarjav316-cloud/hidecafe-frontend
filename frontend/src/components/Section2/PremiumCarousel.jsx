import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PremiumCarousel = ({ images }) => {
  const originalLength = images.length;
  const extendedImages = [images[originalLength - 1], ...images, images[0]];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);

  const goToSlide = useCallback(
    (index, transition = true) => {
      if (isTransitioning) return;

      setIsTransitioning(transition);
      setCurrentIndex(index);

      if (transition) {
        setTimeout(() => {
          setIsTransitioning(false);

          // Handle infinite loop reset
          if (index === 0) {
            setCurrentIndex(originalLength);
          } else if (index === originalLength + 1) {
            setCurrentIndex(1);
          }
        }, 700);
      }
    },
    [isTransitioning, originalLength],
  );

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Drag handlers
  const handleDragStart = (e) => {
    if (isTransitioning) return;
    setIsDragging(true);
    dragStartX.current = e.type.includes("mouse")
      ? e.clientX
      : e.touches[0].clientX;
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    dragCurrentX.current = e.type.includes("mouse")
      ? e.clientX
      : e.touches[0].clientX;
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = dragStartX.current - dragCurrentX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
  };

  // Get display index for counter
  const displayIndex =
    currentIndex === 0
      ? originalLength
      : currentIndex === originalLength + 1
        ? 1
        : currentIndex;

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div
        className="relative overflow-hidden"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{
            transform: `translate3d(-${currentIndex * 100}%, 0, 0)`,
            transition: isTransitioning
              ? "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
            cursor: isDragging ? "grabbing" : "grab",
            willChange: "transform",
          }}
        >
          {extendedImages.map((image, index) => {
            const isActive = index === currentIndex;

            return (
              <div
                key={`slide-${index}`}
                className="min-w-full shrink-0 flex justify-center items-center px-3 lg:px-0"
              >
                <div
                  className="relative w-[88vw] max-w-[420px] lg:w-full h-[440px] sm:h-[460px] lg:h-[620px] overflow-hidden rounded-[22px] lg:rounded-3xl transition-all duration-700"
                  style={{
                    transform: isActive ? "scale(1.02)" : "scale(0.95)",
                    opacity: isActive ? 1 : 0.75,
                    boxShadow: isActive
                      ? "0 20px 60px rgba(46, 41, 37, 0.25)"
                      : "0 10px 30px rgba(46, 41, 37, 0.15)",
                  }}
                >
                  <img
                    src={image}
                    alt={`HIDE cafe ${index}`}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    style={{
                      willChange: "transform",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 lg:mt-10">
        {/* Arrows */}
        <div className="flex gap-3">
          <button
            onClick={goToPrev}
            disabled={isTransitioning}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#2E2925", color: "#E8E7E5" }}
            aria-label="Previous image"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#2E2925", color: "#E8E7E5" }}
            aria-label="Next image"
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Counter */}
        <div
          className="text-sm tracking-wider"
          style={{
            fontFamily: "var(--font-family-geist)",
            color: "#5B5550",
          }}
        >
          {String(displayIndex).padStart(2, "0")} /{" "}
          {String(originalLength).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default PremiumCarousel;
