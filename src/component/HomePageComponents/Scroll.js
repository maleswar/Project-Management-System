// src/utils/scroll.js
import { animateScroll as scroll } from 'react-scroll';

export const scrollToSection = (id) => {
  scroll.scrollTo(id, {
    duration: 800,
    smooth: 'easeInOutQuart',
  });
};
