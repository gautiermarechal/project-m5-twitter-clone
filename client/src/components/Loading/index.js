import React from "react";
import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants/constants";

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

  const LoadSymbol = styled.div`
    border: 7px solid #f3f3f3;
    border-radius: 50%;
    border-top: 7px solid ${COLORS.primary};
    width: 120px;
    height: 120px;
    animation: ${SpinAnimation} 0.5s linear infinite;
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
