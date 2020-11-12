import React, { useEffect } from "react";
import styled from "styled-components";
import { useTweetsContext } from "../../context/TweetsContext";
import moment from "moment";
import ActionBarComponent from "../HomeFeed/Tweet/ActionBar";

const TweetDetails = () => {
  const { handleSingleTweetState, handleHomeFeedTweets } = useTweetsContext();
  useEffect(() => {
    handleSingleTweetState(JSON.parse(localStorage.getItem("single-tweet")));
    handleHomeFeedTweets();
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
          <ActionBarComponent
            numLikes={singleTweet.numLikes}
            numRetweets={singleTweet.numRetweets}
            id={singleTweet.id}
          />
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

const MediaImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-top: 20px;
`;

export default TweetDetails;
