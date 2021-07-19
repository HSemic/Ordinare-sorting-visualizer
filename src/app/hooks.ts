import React, { useEffect, useState, useCallback } from 'react';

import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import { RootState, AppDispatch } from './store';

// Typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Intersection observer custom hook
export const useInView = (
  ref: React.RefObject<HTMLElement>,
  threshold: number,
  onlyOnce: boolean = false
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  // const elHeight = ref?.current?.getBoundingClientRect().height as number;

  useEffect(() => {
    let th = threshold;

    // if (elHeight > window.innerHeight * threshold) {
    //   th = ((window.innerHeight * threshold) / elHeight) * threshold;
    // }

    const onIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        setIntersecting(true);
      } else {
        if (onlyOnce === false) setIntersecting(false);
      }

      return;
    };

    const intersectionOptions = {
      root: null,
      threshold: th
    };

    const observer = new IntersectionObserver(
      onIntersection,
      intersectionOptions
    );

    observer.observe(ref.current as Element);

    if (onlyOnce === true) {
      return () => {
        observer.disconnect();
      };
    }
  }, [isIntersecting, ref, threshold, onlyOnce]);

  return isIntersecting;
};

export const useForceUpdate = () => {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
  return update;
};
