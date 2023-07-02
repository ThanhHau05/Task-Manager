import { useEffect, useRef } from 'react';

export const useClickOutSide = (handle: () => void) => {
  const menuref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const _handle = (e: any) => {
      const mouse = e || window.event;
      if (mouse.button === 0) {
        const node = menuref.current;
        if (!node?.contains(e.target)) handle();
      }
    };
    document.addEventListener('mousedown', _handle);
    return () => document.addEventListener('mousedown', _handle);
  });
  return menuref;
};
