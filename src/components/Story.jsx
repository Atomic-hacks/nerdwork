import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";
import AnimatedText from "./AnimatedText";

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-[10px] uppercase">
          Step into a universe of African comics like never before.
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="Redefining African Storytelling"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 !text-5xl !md:text-7xl"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/comic4.jpg"
                  alt="entrance.webp"
                  className="object-contain"
                />
              </div>
            </div>

            {/* for the rounded corner */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-80 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              From Creators to Devoted Readers. There&apos;s a story for
              Everyone
            </p>

            <Button
              id="discover-btn"
              title="discover prologue"
              containerClass="mt-5 !bg-blue-600 !text-white"
            />
            <Button
              id="nerdowrk-btn"
              title="go to Nerdwork+"
              containerClass="mt-5 !bg-blue-600 !text-white"
            />
          </div>
        </div>
      </div>
      <div className="">
        <div className="mx-auto -mt-10 grid max-w-7xl grid-cols-1 items-center justify-center gap-4 px-3 pb-20 md:grid-cols-2">
          <div className="flex flex-col items-center md:items-start">
            <AnimatedTitle
              title="1"
              containerClass="!text-4xl !sm:text-5xl font-bold mb-3 sm:mb-4"
            />
            <AnimatedText
              text="Discover African Stories Immerse yourself in authentic African narratives, from folklore to futuristic adventures."
              containerClass="text-center md:text-left !text-xs !sm:text-sm md:text-lg"
            />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <AnimatedTitle
              title="2"
              containerClass="!text-4xl !sm:text-5xl font-bold mb-3 sm:mb-4"
            />
            <AnimatedText
              text="Better Reading Experience Seamless, immersive, and tailored for your comfort, enjoy comics like never before."
              containerClass="text-center md:text-left !text-xs !sm:text-sm md:text-lg"
            />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <AnimatedTitle
              title="3"
              containerClass="!text-4xl !sm:text-5xl font-bold mb-3 sm:mb-4"
            />
            <AnimatedText
              text="Excellent Creator Management Empowering African creators with the tools to bring stories to life."
              containerClass="text-center md:text-left !text-xs !sm:text-sm md:text-lg"
            />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <AnimatedTitle
              title="4"
              containerClass="!text-4xl !sm:text-5xl font-bold mb-3 sm:mb-4"
            />
            <AnimatedText
              text="African Focused Voice Bringing African culture, creativity, and perspectives to the world."
              containerClass="text-center md:text-left !text-xs !sm:text-sm md:text-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
