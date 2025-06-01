import React, { useEffect, useState } from "react";
import "../styles/cursor-follower.css";

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Detect pointer elements
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        setIsPointer(window.getComputedStyle(el).cursor === "pointer");
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className={`cursor-circle ${isPointer ? "expand" : ""}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`
      }}
    />
  );
};

export default CursorFollower;
