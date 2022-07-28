import { useEffect, useRef } from 'react';

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // returns value before updating it to new value above;
  return ref.current;
};

export default usePrevious;