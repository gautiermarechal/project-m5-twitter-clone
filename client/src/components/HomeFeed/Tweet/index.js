import React from "react";
import styled from "styled-components";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { RiHeart3Line } from "react-icons/ri";
import { BsDownload } from "react-icons/bs";
import { COLORS } from "../../../constants/constants";
import moment from "moment";

const Tweet = ({ avatarSrc, userTag, userName, date, content, media }) => {
  let m = moment(date).format("MMM Do");
  return (
    <>
      <MainContainer>
        <UserInfo>
          <UserPhoto src={avatarSrc} />
          <UserTagName>{userTag}</UserTagName>
          <UserName>@{userName}</UserName>
          <Point>·</Point>
          <Date>{m}</Date>
        </UserInfo>
        <Content>
          {content}

          {media.map((media) => (
            <MediaImage src={media.url}></MediaImage>
          ))}
        </Content>
        <ActionBar>
          <Action color={"commentColor"} colorHover={"commentColorHover"}>
            <FaRegComment />
          </Action>
          <Action color={"retweetColor"} colorHover={"retweetColorHover"}>
            <AiOutlineRetweet />
          </Action>
          <Action color={"likeColor"} colorHover={"likeColorHover"}>
            <RiHeart3Line />
          </Action>
          <Action color={"bookmarkColor"} colorHover={"bookmarkColorHover"}>
            <BsDownload />
          </Action>
        </ActionBar>
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  max-width: 568px;
  //   border-style: solid;
  //   border-color: grey;
  //   border-width: 2px;
`;

const UserInfo = styled.div`
  display: flex;
`;

const UserPhoto = styled.img`
  border-radius: 100px;
  height: 49px;
  width: 49px;
  margin-right: 20px;
`;

const UserTagName = styled.div`
  font-weight: 800;
  margin-right: 10px;
`;

const UserName = styled.div`
  color: grey;
  font-weight: 500;
`;

const Point = styled.span`
  color: grey;
  margin-left: 10px;
  margin-right: 10px;
`;

const Date = styled.div`
  color: grey;
  font-weight: 500;
`;

const Content = styled.div`
  margin-left: 69px;
`;

const ActionBar = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 69px;
`;

const Action = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-style: none;
  height: 37.5px;
  width: 37.5px;
  background: transparent;

  svg {
    height: 18.75px;
    width: 18.75px;
    z-index: 1000;
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => COLORS[props.colorHover]};

    svg {
      color: ${(props) => COLORS[props.color]};
    }
  }
`;

const MediaImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
`;

export default Tweet;
