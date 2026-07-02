import { useState, useEffect, useRef } from "react";

export function useScrollPosition() {
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef<number>(0);
  const scrollYRef = useRef(0);
  const vhRef = useRef(0);

  useEffect(() => {
    vhRef.current = window.innerHeight;

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = scrollYRef.current;
        const vh = vhRef.current;
        
        const newScrolled = scrollY > 20;
        if (newScrolled !== scrolled) {
          setScrolled(newScrolled);
        }

        const opacity = Math.min((scrollY / (vh * 0.6)) * 0.5, 0.5);
        document.documentElement.style.setProperty('--scroll-opacity', String(opacity));

        rafRef.current = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrolled]);

  return { scrolled };
}