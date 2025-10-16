import { useEffect, useRef } from "react";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const quickLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "#" },
      { label: "Nerdwork+", href: "#" },
      { label: "Events", href: "#" },
      { label: "Company", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

const Footer = () => {
  const footerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;

    // Create a unique ScrollTrigger only for this image
    const trigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        // Move image smoothly upward as you scroll
        const progress = self.progress;
        gsap.to(image, {
          y: -350 * progress,
          ease: "power2.out", // gives a subtle floaty catch-up feel
          duration: 0.75,
          overwrite: "auto",
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative mx-auto max-w-5xl overflow-hidden text-black"
    >
      {/* Animated Image */}
      <div
        ref={imageRef}
        className="pointer-events-none absolute z-50 hidden -translate-x-1/2 md:-bottom-40 md:left-96 md:block"
      >
        <img
          src="/img/comicon9.png"
          alt="Footer animation"
          className="size-[500px] object-contain"
        />
      </div>

      <div className="container mx-auto mt-40 px-6 py-4">
        {/* Top Section */}
        <div className="relative mb-16 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <img
                src="/img/logo.png"
                alt="Nerdwork logo"
                className="size-10"
              />
              <h1 className="text-2xl font-normal">nerdwork</h1>
            </div>

            <p className="mb-6 max-w-[250px] text-neutral-950">
              We are inviting you into the ultimate nerd universe
            </p>

            <Button title="Join Us" containerClass="!bg-blue-500 text-white" />
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-8 md:flex-row md:gap-24">
            {quickLinks.map((section, idx) => (
              <div key={idx}>
                <h3 className="mb-6 font-normal text-black">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-neutral-950 transition-colors hover:text-blue-700"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Image - Static at bottom */}
        <div className="absolute bottom-0 left-1/3 md:hidden">
          <img
            src="/img/comicon9.png"
            alt="Footer animation"
            className="size-96 object-contain"
          />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-6 border-t border-gray-800 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-xl text-neutral-950 transition-colors hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
