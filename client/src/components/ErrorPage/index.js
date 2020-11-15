import React from "react";
import styled from "styled-components";
import { FaBomb } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <>
      <MainContainer>
        <BombIcon />
        <ErrorTitle>An unknown error has occured</ErrorTitle>
        <ErrorParagraph>Try refreshing the page.</ErrorParagraph>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  width: 668px;
  flex-direction: column;
  align-items: center;
  margin-top: 40%;
  height: 50vh;
`;

const BombIcon = styled(FaBomb)`
  font-size: 60px;
`;

const ErrorTitle = styled.h1`
  margin-top: 20px;
`;

const ErrorParagraph = styled.h5`
  margin-top: 20px;
`;

export default ErrorPage;
