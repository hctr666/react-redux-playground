import { useState, useEffect } from 'react';

export const useCounter = (initialValue = {}) => {
  const [count, setCount] = useState(initialValue.count);
  const [isCounting, setIsCounting] = useState(initialValue.isCounting);

  const startCount = () => setIsCounting(true);
  const stopCount = () => setIsCounting(false);
  const resetCount = () => setCount(initialValue.count);

  useEffect(() => {
    let counter;

    if (isCounting) {
      counter = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, initialValue.delay || 1000);
    }

    return () => clearInterval(counter);
  });

  return {
    count,
    isCounting,
    startCount,
    stopCount,
    resetCount
  };
};

export const useFocus = ({ ref }) => {
  useEffect(() => {
    ref.current.focus()
  }, [])

  return () => ref.current.focus();
};
