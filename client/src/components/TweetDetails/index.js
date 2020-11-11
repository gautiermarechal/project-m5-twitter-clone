import React, { useEffect } from "react";
import styled from "styled-components";
import { useTweetsContext } from "../../context/TweetsContext";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { RiHeart3Line } from "react-icons/ri";
import { BsDownload } from "react-icons/bs";
import { COLORS } from "../../constants/constants";
import moment from "moment";

const TweetDetails = () => {
  const { handleSingleTweetState } = useTweetsContext();

  useEffect(() => {
    handleSingleTweetState(JSON.parse(localStorage.getItem("single-tweet")));
  }, []);
  const singleTweet = JSON.parse(localStorage.getItem("single-tweet"));
  let mHours = moment(singleTweet.date).format("HH:MM A");
  let mDate = moment(singleTweet.date).format("MMM D YYYY");
  const isRemoteSrcAvatar = singleTweet.avatarSrc.substring(0, 5) === "https";

  return (
    <>
      {singleTweet !== {} && (
        <MainContainer>
          <UserInfo>
            <UserPhoto
              src={
                isRemoteSrcAvatar
                  ? singleTweet.avatarSrc
                  : `http://localhost:31415${singleTweet.avatarSrc}`
              }
            />
            <UserTags>
              <UserTagName>{singleTweet.userTag}</UserTagName>
              <UserName>@{singleTweet.userName}</UserName>
            </UserTags>
          </UserInfo>
          <Content>
            {singleTweet.content}

            {singleTweet.media.map((media, index) => {
              const isRemoteMedia = media.url.substring(0, 5) === "https";
              return (
                <MediaImage
                  key={index}
                  src={
                    isRemoteMedia
                      ? media.url
                      : `http://localhost:31415${media.url}`
                  }
                ></MediaImage>
              );
            })}
          </Content>
          <DateContainer>
            <Date>{mHours}</Date>
            <Point>·</Point>
            <Date>{mDate}</Date>
            <Point>·</Point>
            <Date>Critter Web App</Date>
          </DateContainer>
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
      )}
    </>
  );
};

const MainContainer = styled.div`
  margin: 50px;
  display: flex;
  flex-direction: column;
  max-width: 768px;
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

const UserTags = styled.div`
  display: flex;
  flex-direction: column;
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

const DateContainer = styled.div`
  display: flex;
  margin-left: 69px;
  margin-top: 20px;
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

export default TweetDetails;
