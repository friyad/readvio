import { useEffect, useState } from "react";

const useScrollPinned = (threshold = 120) => {
  const [scroll, setScroll] = useState({ y: 0 });
  const [pinned, setPinned] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScroll({ y: currentScrollY });
      if (currentScrollY > threshold) {
        setPinned(currentScrollY < lastScrollY);
      } else {
        setPinned(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return { scroll, pinned };
};

export default useScrollPinned;
