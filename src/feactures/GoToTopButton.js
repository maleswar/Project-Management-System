import React, { useEffect, useState } from "react";
import { PiArrowLineUpBold } from "react-icons/pi";
import styled from "styled-components";

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  };

  const listenToScroll = () => {
    let heightTohidden = 250;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightTohidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    // console.log(winScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
  }, []);

  return (
    <Wrapper>
      {isVisible && (
        <div className="top-btn" onClick={goToTop}>
          <PiArrowLineUpBold className="top-btn--icon" />
        </div>
      )}
    </Wrapper>
  );
};

export default GoToTopButton;
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  .top-btn {
    font-size: 2rem;
    width: 3.5rem;
    height: 3.5rem;
    color: white;
    background-color: blue;
    border-radius: 100%;
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  &--icon {
    animation: gototop 1.2s linear infinite alternate-reverse;
  }

  @keyframes gototop {
    0% {
      transform: translateY(-0.5rem);
    }
    100% {
      transform: translateY(1rem);
    }
  }
`;
