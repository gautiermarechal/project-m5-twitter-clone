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
        <Content>
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
        />
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
