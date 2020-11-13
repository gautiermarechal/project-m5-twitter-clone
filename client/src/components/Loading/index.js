import React from "react";
import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants/constants";
import { BiLoaderCircle } from "react-icons/bi";

const Loading = ({ width, height }) => {
  const MainContainer = styled.div`
    position: absolute;
    width: ${width};
    height: ${height};
    top: 50%;
    left: 50%;
  `;

  const SpinAnimation = keyframes`
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
`;

  const LoadSymbol = styled(BiLoaderCircle)`
    border-radius: 50%;
    border: 7px solid ${COLORS.primary};
    // border-bottom: 7px solid ${COLORS.primary};
    width: 120px;
    height: 120px;
    color: ${COLORS.primary};
    animation: ${SpinAnimation} 0.7s cubic-bezier(0.8, 0.7, 0.1, 0.5) infinite;
  `;
  return (
    <>
      <MainContainer>
        <LoadSymbol />
      </MainContainer>
    </>
  );
};

export default Loading;
