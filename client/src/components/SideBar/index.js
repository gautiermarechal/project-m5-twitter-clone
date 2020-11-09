import React from "react";
import styled from "styled-components";
import { COLORS, SIZES } from "../../constants/constants.js";
import { BiHomeAlt } from "react-icons/bi";
import { BsPerson, BsBell, BsBookmark } from "react-icons/bs";
import { ReactComponent as CitterLogo } from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <MainContainer>
        <Menu>
          <Item to="/">
            <CitterLogo />
          </Item>
          <Item to="/">
            <Logo>
              <BiHomeAlt />
            </Logo>
            <ItemLabel>Home</ItemLabel>
          </Item>
          <Item to="/:profileId">
            <Logo>
              <BsPerson />
            </Logo>
            <ItemLabel>Profile</ItemLabel>
          </Item>
          <Item to="/notifications">
            <Logo>
              <BsBell />
            </Logo>
            <ItemLabel>Notifications</ItemLabel>
          </Item>
          <Item to="/bookmarks">
            <Logo>
              <BsBookmark />
            </Logo>
            <ItemLabel>Bookmarks</ItemLabel>
          </Item>
        </Menu>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  position: fixed;
  width: ${SIZES.desktop.sideBarWidth}px;
  height: ${SIZES.desktop.sideBarHeightVH}vh;
  left: 0;
  top: 0;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const Item = styled(NavLink)`
  display: flex;
  color: black;
  align-items: center;
  padding-bottom: 15px;
  padding-left: 15px;
  padding-top: 15px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-top: 10px;
  &:hover {
    color: ${COLORS.primary};
    background-color: ${COLORS.secondary};
    border-radius: 50px;
    cursor: pointer;
  }

  &:active {
    color: ${COLORS.primary};
    background-color: ${COLORS.secondary};
    border-radius: 50px;
    cursor: pointer;
  }
`;

const ItemLabel = styled.h3`
  font-weight: 600;
  margin-left: 20px;
`;

const Logo = styled.div`
  font-size: 30px;
  display: flex;
  align-items: center;
`;

export default SideBar;
