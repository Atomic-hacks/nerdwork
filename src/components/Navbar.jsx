import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

import Button from "./Button";

const navItems = ["Nerdwork+", "communities", "events", "company"];

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

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
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        {/* === NAV CONTAINER === */}
        <nav
          className={clsx(
            "flex size-full items-center justify-between px-4 py-2"
          )}
        >
          {/* Left: Logo + Button */}
          <div className="flex items-center gap-5 rounded-full bg-blue-300 px-4 py-2">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <h1 className="uppercase text-blue-50">Nerdwork</h1>
          </div>

          {/* === Desktop Links === */}
          <div className="hidden items-center gap-6 rounded-full bg-blue-300 p-4 md:flex">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="nav-hover-btn relative m-0 text-sm font-semibold uppercase tracking-wide text-white/90 transition-all duration-200 hover:text-yellow-300"
              >
                {item}
              </a>
            ))}

            {/* Audio Visualizer */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-3 flex items-center space-x-0.5"
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
                  className={clsx("indicator-line bg-yellow-300", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
          <Button
            id="product-button"
            title="Join Us"
            rightIcon={<TiLocationArrow />}
            containerClass="hidden md:flex text-black font-semibold rounded-full px-4 py-2 hover:bg-blue-100 !bg-blue-300 transition"
          />

          {/* === Mobile Menu Button === */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="block text-2xl text-white transition-all duration-300 md:hidden"
          >
            {isMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </nav>

        {/* === Mobile Drawer === */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-4 w-64 rounded-3xl bg-black/75 p-4 transition-all duration-300">
            <ul className="flex flex-col gap-4 text-sm font-bold uppercase tracking-wider text-white ">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-xl bg-white/10 px-4 py-2 transition-all duration-300 hover:bg-yellow-300 hover:text-black"
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  id="product-button-mobile"
                  title="Join Us"
                  rightIcon={<TiLocationArrow />}
                  containerClass="!bg-blue-300 text-black font-semibold rounded-full flex"
                />
              </li>
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default NavBar;
