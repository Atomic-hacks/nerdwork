import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      // Slightly lower lerp on touch for stability
      lerp: isCoarsePointer ? 0.06 : 0.09,
      // Let Lenis drive both wheel and touch events
      wheelEventsTarget: window,
      touchEventsTarget: window,
      normalizeWheel: true,
      gestureOrientation: "vertical",
      smoothWheel: true,
      smoothTouch: true,
    });

    lenisRef.current = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis scroll
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    // Drive Lenis with GSAP's ticker for perfect sync
    gsap.ticker.add((time) => {
      // gsap time is in seconds; Lenis expects ms
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Pause Lenis on resize to avoid jank
    const handleResize = () => {
      if (!lenisRef.current) return;
      lenisRef.current.stop();
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        lenisRef.current?.start();
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Pause when tab is inactive, resume on return
    const handleVisibility = () => {
      const l = lenisRef.current;
      if (!l) return;
      if (document.hidden) {
        l.stop();
      } else {
        l.start();
        ScrollTrigger.refresh();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Initial refresh for any existing ScrollTriggers
    ScrollTrigger.refresh();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Provider does not alter layout; it simply enhances scroll behavior
  return children;
}

SmoothScrollProvider.propTypes = {
  children: PropTypes.node,
};
