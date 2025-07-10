import React, { useState, useEffect } from 'react';

const TypingText = ({ text, speed = 50 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < text.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{text.slice(0, index)}</span>;
};

export default TypingText;
