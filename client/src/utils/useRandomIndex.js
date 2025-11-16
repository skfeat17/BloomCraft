import { useState, useEffect } from "react";

export default function useRandomIndex(size, interval = 3000) {
  const [index, setIndex] = useState(() => {
    // Initialize random index immediately
    return size > 0 ? Math.floor(Math.random() * size) : 0;
  });

  useEffect(() => {
    if (size <= 1) return; // no need to randomize if size < 2

    const changeIndex = () => {
      setIndex((prev) => {
        let next = prev;
        // ensure a different index
        while (next === prev && size > 1) {
          next = Math.floor(Math.random() * size);
        }
        return next;
      });
    };

    const timer = setInterval(changeIndex, interval);

    return () => clearInterval(timer);
  }, [size, interval]);

  return index;
}
