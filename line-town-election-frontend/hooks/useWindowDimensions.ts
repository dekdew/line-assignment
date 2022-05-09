import { useEffect, useState } from "react";

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<any>({
    width: 0,
    height: 0,
  });

  useEffect(function mount() {
    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowDimensions({ width, height });
    }

    onResize();

    window.addEventListener("resize", onResize);

    return function unMount() {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return windowDimensions;
}
