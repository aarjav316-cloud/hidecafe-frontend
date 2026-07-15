import { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MobileCarousel = ({ images }) => {
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
        }, 550);
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

  // Get display index for dots
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
              ? "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)"
              : "none",
            cursor: isDragging ? "grabbing" : "grab",
            willChange: "transform",
          }}
        >
          {extendedImages.map((image, index) => (
            <div
              key={`mobile-slide-${index}`}
              className="min-w-full shrink-0 flex justify-center items-center"
            >
              <div
                className="relative w-[88vw] max-w-[360px] h-[450px] overflow-hidden rounded-[26px]"
                style={{
                  boxShadow: "0 20px 60px rgba(46, 41, 37, 0.2)",
                }}
              >
                <img
                  src={image}
                  alt={`HIDE cafe ${index}`}
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    willChange: "transform",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={goToPrev}
          disabled={isTransitioning}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#2E2925", color: "#E8E7E5" }}
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index + 1)}
              disabled={isTransitioning}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  index + 1 === displayIndex ? "#2E2925" : "#5B5550",
                opacity: index + 1 === displayIndex ? 1 : 0.3,
                transform:
                  index + 1 === displayIndex ? "scale(1.2)" : "scale(1)",
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#2E2925", color: "#E8E7E5" }}
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default MobileCarousel;
