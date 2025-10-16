import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll, useWindowSize } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { HiMenuAlt3, HiX } from "react-icons/hi";

import Button from "./Button";

const navItems = ["Nerdwork+", "communities", "events", "company"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const { width } = useWindowSize();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) audioElementRef.current.play();
    else audioElementRef.current.pause();
  }, [isAudioPlaying]);

  // Navbar visibility
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isNavVisible]);

  // Close mobile menu on resize
  useEffect(() => {
    if (width >= 768 && isMenuOpen) setIsMenuOpen(false);
  }, [width, isMenuOpen]);

  // Smooth fade + slide for mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          pointerEvents: "auto",
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.25,
        ease: "power2.inOut",
        pointerEvents: "none",
      });
    }
  }, [isMenuOpen]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo + Product button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="join-button"
              title="Join Us"
              rightIcon={<TiLocationArrow />}
              containerClass="!bg-blue-600 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Desktop Nav + Audio */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="ml-4 block text-3xl text-blue-100 md:hidden"
              aria-label="toggle mobile menu"
            >
              {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={clsx(
          "relative inset-0 top-16 z-[9999] flex flex-col items-center justify-center bg-black/95 py-8 text-white backdrop-blur-md transition-all md:hidden",
          !isMenuOpen && "pointer-events-none opacity-0"
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsMenuOpen(false);
        }}
      >
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href={`#${item.toLowerCase()}`}
            onClick={() => setIsMenuOpen(false)}
            className="my-3 text-3xl font-semibold tracking-wide transition-colors hover:text-blue-400"
          >
            {item}
          </a>
        ))}

        <div className="mt-10 flex gap-4">
          <Button
            title="Join Us"
            containerClass="!bg-blue-500 text-white text-lg px-6 py-3"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
