import React, { useRef } from "react";
import styled from "styled-components";
import { COLORS } from "../../../constants/constants";
import moment from "moment";
import history from "../../../history";
import { useTweetsContext } from "../../../context/TweetsContext";
import ActionBarComponent from "./ActionBar";
import { AiOutlineRetweet } from "react-icons/ai";

const Tweet = ({
  id,
  avatarSrc,
  userTag,
  userName,
  profileObj,
  date,
  content,
  media,
  numLikes,
  numRetweets,
  retweetFrom,
  isLiked,
  isRetweeted,
}) => {
  let m = moment(date).format("MMM Do");
  const isRemoteSrcAvatar = avatarSrc.substring(0, 5) === "https";
  const {
    handleSingleTweetLocalStorage,
    handleSingleTweetState,
    handleCurrentProfileState,
    handleCurrentProfilLocalStorage,
  } = useTweetsContext();

  const handleSingletweet = () => {
    handleSingleTweetLocalStorage({
      id,
      avatarSrc,
      userTag,
      userName,
      date,
      content,
      media,
      numLikes,
      numRetweets,
      isLiked,
      isRetweeted,
    });
    handleSingleTweetState({
      id,
      avatarSrc,
      userTag,
      userName,
      date,
      content,
      media,
    });
    history.push(`/tweet/${id}`);
  };

  const handleProfile = (e) => {
    e.stopPropagation();
    handleCurrentProfilLocalStorage(profileObj);
    handleCurrentProfileState(profileObj.handle);
    history.push(`/${profileObj.handle}`);
    window.location.reload();
  };

  return (
    <>
      <MainContainer onClick={handleSingletweet}>
        {retweetFrom && (
          <RetweetFrom>
            <AiOutlineRetweet style={{ marginRight: "10px" }} />
            {retweetFrom.displayName} Remeowed
          </RetweetFrom>
        )}
        <UserInfo>
          <UserPhoto
            src={
              isRemoteSrcAvatar
                ? avatarSrc
                : `http://localhost:31415${avatarSrc}`
            }
          />
          <UserTagName onClick={(e) => handleProfile(e)}>{userTag}</UserTagName>
          <UserName onClick={(e) => handleProfile(e)}>@{userName}</UserName>
          <Point>·</Point>
          <Date>{m}</Date>
        </UserInfo>
        <Content onClick={(e) => e.stopPropagation()}>
          {content}

          {media.map((media, index) => {
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
        <ActionBarComponent
          numLikes={numLikes}
          numRetweets={numRetweets}
          id={id}
          isLiked={isLiked}
          isRetweeted={isRetweeted}
        />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  padding: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
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
  &:hover {
    text-decoration: underline;
  }
`;

const UserName = styled.div`
  color: grey;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
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
  max-width: 550px;
  word-wrap: break-word;
`;

const MediaImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
`;

const RetweetFrom = styled.div`
  display: flex;
  align-items: center;
  color: grey;
  margin-bottom: 15px;
  margin-left: 69px;
`;

export default Tweet;
